// TODO: Add optional progress calback for search/record operations
// TODO: Implement column exclusions


export type KBOption = { code: string, text?: string } // TODO: Should only allow a single property.
export type KBValue = string | number | boolean | Date
export type KBContentsFrom =
    {
        from: {
            type?: 'Record'
            label: string
            resultValue: "TargetSerial" | "TargetParentSerial" | "TargetAccessKey" // "NewLocationSerial" | "OldAfterSerial"
        } | {
            type: 'Field'
            label: string
            resultValue: "Contents" | "OldContents"
        } | {
            type: 'PostingStatus'
            label: string
            resultValue: "TargetSerial" | "TargetAccessKey" | "RecipientSerial" | "RecipientAccessKey"
        }
    }

export type KBColumnOp =
    { columnName: string, operation: 'S', label?: string, newContents: KBValue | KBOption | KBContentsFrom, oldContents?: string } |
    { columnName: string, operation: 'A', label?: string, addContents: KBValue, oldContents?: string } |
    { columnName: string, operation: 'G', label?: string }

export type KBRecordArgs =
    ({
        op: 'V' | 'D' | 'U'
        serial: Keystone.Serial
    } | {
        op: 'I'
        parentSerial?: Keystone.Serial
    }) & {
        label?: string
        includeTableMetadata?: boolean
        includeColumnMetadata?: boolean
        includeRowDescriptions?: boolean
    }

export type UserLoginInfo = {
    success: boolean
    activeDirectoryLogonEnabled: boolean
    userName: string
    userSerial: string
    deviceName: string
    deviceSerial: string
    defaultTimeZone: { option: string, text: string }
    databaseName: string
    sessionID: string
    JSESSIONID: string
    postingDate: string // Short ISO format
    jaspersoftHTTPPort: string
    jaspersoftHTTPSPort: string
    globalHTTPPort: string
    globalHTTPSPort: string
    shareSavingsText: string
    sharesSavingsText: string
    draftCheckingText: string
    draftCheckText: string
    draftsChecksText: string
    dividendInterestText: string
    dividendsInterestText: string
    impoundText: string
}

export class RecordQuery<T extends Keyscript.TableName> {

    static #isFrom(value: KBValue | KBOption | KBContentsFrom): value is KBContentsFrom {
        return typeof value === 'object' && 'from' in value;
    }
    static #isOption(value: KBValue | KBOption): value is KBOption {
        return typeof value === 'object' && 'code' in value;
    }

    #tableName: T;
    #args: KBRecordArgs;
    #columns: Array<KBColumnOp> = [];

    constructor(tableName: T, args: KBRecordArgs) {
        this.#tableName = tableName;
        this.#args = args;
    }

    getColumn(column: Keyscript.ColumnName<T>): RecordQuery<T> {
        if (!"UV".includes(this.#args.op)) throw Error("Invalid operation");
        this.#columns.push({ columnName: column as string, operation: 'G' });
        return this;
    }
    setColumn<Q extends Keyscript.ColumnName<T>>(
        column: Q,
        value: KBValue | KBContentsFrom | Keystone.TableInfo[T][Q],
        existingValue?: KBValue): RecordQuery<T> {

        if (!"UI".includes(this.#args.op)) throw Error("Invalid operation");
        const colOp: KBColumnOp = {
            columnName: column as string,
            operation: 'S',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newContents: value as any
        };
        if (existingValue)
            colOp.oldContents = this.#valueStr(existingValue);
        this.#columns.push(colOp);

        return this;
    }
    incColumn(column: Keyscript.ColumnName<T>, value: number, existingValue?: KBValue): RecordQuery<T> {
        if (this.#args.op != 'U') throw Error("Invalid operation");
        const colOp: KBColumnOp = {
            columnName: column as string,
            operation: 'A',
            addContents: value
        };
        if (existingValue)
            colOp.oldContents = this.#valueStr(existingValue);
        this.#columns.push(colOp);
        return this;
    }
    #valueStr(value: KBValue): string {
        if (value instanceof Date)
            return value.toISOString().substring(0, 10);
        if (typeof value === "boolean")
            return value ? 'Y' : 'N';
        return value.toString();
    }

    #field(col: KBColumnOp): Keyscript.FieldRequest {
        switch (col.operation) {
            case 'A':
                return {
                    columnName: col.columnName,
                    $operation: col.operation,
                    addContents: this.#valueStr(col.addContents),
                    oldContents: col.oldContents ? this.#valueStr(col.oldContents) : undefined,
                    $verifyOldContents: col.oldContents ? 'Y' : undefined
                };
            case 'S':
                if (RecordQuery.#isFrom(col.newContents)) {
                    return {
                        columnName: col.columnName,
                        $operation: col.operation,
                        newContentsFrom: {
                            label: col.newContents.from.label,
                            $resultValue: col.newContents.from.resultValue
                        },
                        oldContents: col.oldContents ? this.#valueStr(col.oldContents) : undefined,
                        $verifyOldContents: col.oldContents ? 'Y' : undefined
                    };
                }
                return {
                    columnName: col.columnName,
                    $operation: col.operation,
                    newContents: RecordQuery.#isOption(col.newContents) ? this.#valueStr(col.newContents.code) : this.#valueStr(col.newContents),
                    oldContents: col.oldContents ? this.#valueStr(col.oldContents) : undefined,
                    $verifyOldContents: col.oldContents ? 'Y' : undefined
                };
            case 'G':
            default:
                return {
                    columnName: col.columnName,
                    $operation: col.operation,
                };
        }
    }

    toRequest(): Keyscript.RecordRequest {

        function yn(v: boolean | undefined): 'Y' | 'N' | undefined { return v === undefined ? undefined : (v ? 'Y' : 'N'); }

        const allColumns = this.#args.op === 'V' ? yn(!this.#columns.length) : undefined;
        const req: Keyscript.RecordRequest = {
            tableName: this.#tableName,
            $operation: this.#args.op,
            '.label': this.#args.label,
            //     exceptionDescriptionPrefix?: string
            $includeTableMetaData: yn(this.#args.includeTableMetadata),
            $includeColumnMetaData: yn(this.#args.includeColumnMetadata),
            $includeRowDescriptions: yn(this.#args.includeRowDescriptions),
            targetSerial: this.#args.op !== 'I' ? this.#args.serial : undefined,
            targetParentSerial: this.#args.op === 'I' ? this.#args.parentSerial : undefined,
            $includeAllColumns: allColumns,
            field: allColumns !== 'Y' ? this.#columns.map(c => this.#field(c)) : undefined
        };
        return req;
    }

    putStep(xml: CR.XML, transaction: CR.XML_Container) {

        const step = xml.addContainer(transaction, "step");
        const record = xml.addContainer(step, "record");
        if (this.#args.label) xml.setAttribute(record, "label", this.#args.label);
        xml.addText(record, "tableName", this.#tableName);
        xml.addOption(record, "operation", this.#args.op);
        if (this.#args.op === 'I') {
            if (this.#args.parentSerial) {
                xml.addText(record, "targetParentSerial", this.#args.parentSerial);
            }
        } else {
            xml.addText(record, "targetSerial", this.#args.serial);
        }
        if (this.#args.includeTableMetadata) xml.addOption(record, "includeTableMetadata", "Y");
        if (this.#args.includeColumnMetadata) xml.addOption(record, "includeColumnMetadata", "Y");
        if (this.#args.includeRowDescriptions) xml.addOption(record, "includeRowDescriptions", "Y");
        for (let i = 0; i < this.#columns.length; i++) {
            const field = xml.addContainer(record, "field");
            const col = this.#columns[i];
            xml.addText(field, "columnName", col.columnName);
            xml.addOption(field, "operation", col.operation);
            if (col.operation === 'A') {
                xml.addText(field, "addContents", this.#valueStr(col.addContents));
            } else if (col.operation === 'S') {
                if (RecordQuery.#isFrom(col.newContents)) {
                    const tag = xml.addContainer(field, "newContentsFrom");
                    xml.addText(tag, "label", col.newContents.from.label);
                    xml.addOption(tag, "resultValue", col.newContents.from.resultValue);
                } else if (RecordQuery.#isOption(col.newContents)) {
                    //const key = Object.keys(col.newContents)[0]
                    xml.addText(field, "newContents", col.newContents.code); //[key]);
                } else {
                    xml.addText(field, "newContents", this.#valueStr(col.newContents));
                }
            }
            if (col.operation === 'S' || col.operation === 'A') {
                if (col.oldContents !== undefined) {
                    xml.addOption(field, "verifyOldContents", 'Y');
                    xml.addText(field, "oldContents", this.#valueStr(col.oldContents));
                }
            }
        }
    }
}

//export type SearchChunkFn<T> = (rows: Keyscript.SearchResultRow[]) => Promise<T>
type Project1<T extends Keyscript.TableName> = { [K in Keyscript.ColumnName<T>]?: 1 }
//type Project0<T extends Keyscript.TableName> = { [K in Keyscript.ColumnName<T>]?: 0 }
export type Project<T extends Keyscript.TableName> = Project1<T> // | Project0<T>
export type RecordResponseEx<Q extends object> = Keyscript.RecordResponse & {
    //TODO: Decode DataType info and properly type/convert the field values. 
    //fields: { [K in (Q extends '*' ? Keyscript.ColumnName<T> : Q extends ReadonlyArray<infer U> ? U : never)]: Keyscript.FieldResponse }
    fields: { [K in keyof Q]: Keyscript.FieldResponse }
    //fields: { [K in (Q extends '*' ? string : keyof Q)]: Keyscript.FieldResponse }
}

export interface IKeybridge { //Static {
    //new(): any //IKeybridge // (...args: unknown[])

    withDb(db: string): IKeybridge
    decodeExceptions(error: unknown): string[];

    logon(username: string, password: string, device: string): Promise<Keyscript.LogonResponse>;
    getUserLoginInfo(): Promise<UserLoginInfo>;
    getTableBrowserInfo(): Promise<Keyscript.TableListRecord<true>[]>;
    getTableList<CM extends boolean>(tableMetadata: boolean, columnMetadata: CM): Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<CM>>>;

    //mapFields<T extends Keyscript.TableName>(rr: Keyscript.RecordResponse): Record<Keyscript.ColumnName<T>, Keyscript.FieldResponse>
    //TODO: objFromFields<T extends Keyscript.TableName>(table: T, rr: Keyscript.RecordResponse): Record<string, number | string>

    postStep<K extends keyof Omit<Keyscript.RequestTypes, 'recordTree'>>(type: K, request: Keyscript.RequestTypes[K], suppressMask?: boolean): Promise<Keyscript.ResponseTypes[K]>;
    postSteps<K extends keyof Keyscript.RequestTypes>(type: K, requests: Keyscript.RequestTypes[K][], suppressMask?: boolean): Promise<Keyscript.ResponseTypes[K][]>;
    postQuery(request: CR.XML | Keyscript.Request | Keyscript.RequestStep[], suppressMask?: boolean): Promise<Keyscript.StepResponse[]>;

    search<T extends Keyscript.TableName>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, suppressMask?: boolean): Promise<Keyscript.SearchResultRow[]>
    recordSearch<T extends Keyscript.TableName>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, columns: '*', suppressMask?: boolean): Promise<RecordResponseEx<Keystone.TableInfo[T]>[]>;
    recordSearch<T extends Keyscript.TableName, Q extends Project<T>>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, columns: Q, suppressMask?: boolean): Promise<RecordResponseEx<Q>[]>;


    //record<Q extends Keyscript.SearchResultRow>(request: Q): Promise<Keyscript.RecordResponse>;
    //record<Q extends Keyscript.SearchResultRow[]>(request: Q): Promise<Keyscript.RecordResponse[]>;
    recordRead<T extends Keyscript.TableName>(table: T, searchRows: Keyscript.SearchResultRow[], columns: '*'): Promise<RecordResponseEx<Keystone.TableInfo[T]>[]>;
    recordRead<T extends Keyscript.TableName>(table: T, serials: Keystone.Serial[], columns: '*'): Promise<RecordResponseEx<Keystone.TableInfo[T]>[]>;
    recordRead<T extends Keyscript.TableName, Q extends Project<T>>(table: T, searchRows: Keyscript.SearchResultRow[], columns: Q): Promise<RecordResponseEx<Q>[]>;
    recordRead<T extends Keyscript.TableName, Q extends Project<T>>(table: T, serials: Keystone.Serial[], columns: Q): Promise<RecordResponseEx<Q>[]>;

    // record(request: Keyscript.RecordRequest): Keyscript.RecordResponse
    // record(request: Keyscript.RecordRequest[]): Keyscript.RecordResponse[]

    //recordTree(request: Keyscript.RecordTreeRequest): Keyscript.RecordTreeResponse
    //recordTree(request: Keyscript.RecordTreeRequest[]): Keyscript.RecordTreeResponse[]
    //recordReference<T extends Keyscript.TableName>(request: Keyscript.RecordReferenceRequest<T>): Keyscript.RecordReferenceResponse
}

const MAX_RECORD_FETCH = 500;

//@staticImplements<IKeybridgeStatic>()
export class Keybridge implements IKeybridge {

    #dbOverride?: string;

    constructor() { }

    withDb(db: string): IKeybridge {
        const result = new Keybridge();
        result.#dbOverride = db;
        return result;
    }

    decodeExceptions(error: unknown) {
        return Keybridge.decodeExceptions(error);
    }

    static decodeExceptions(error: unknown) {
        const items: string[] = [];
        if (!error) {
            items.push('Undefined error');
        } else {
            if (Array.isArray(error)) {
                items.push(...error);
            } else if (error instanceof Error) {
                items.push(error.message);
            } else if (typeof error === 'object') {
                items.push((error as { statusText?: string }).statusText ?? (error as { message?: string }).message ?? 'Unspecified error');
            } else {
                items.push(error.toString());
            }
        }
        return items;
    }

    logon(username: string, password: string, device: string): Promise<Keyscript.LogonResponse> {

        const xml = new CR.XML();
        const logon = xml.addContainer(xml.getRootElement(), 'logon');
        xml.addText(logon, 'userName', username);
        xml.addText(logon, 'deviceName', device);
        xml.addText(logon, 'password', password);
        return new Promise((resolve, reject) => {
            CR.Core.ajaxRequest({
                url: this.#buildUrl('DirectXMLPostJSON'),
                xmlData: xml.getXMLDocument(),
                success: function (response: { responseText: string, status: number, statusText: string }) {
                    const responseJson = CR.JSON.parse(response.responseText) as Keyscript.QueryResponse;
                    const logon = responseJson.query?.logon;
                    const errors = logon?.exception?.filter(e => e.message !== 'Session is already logged on') ?? [];
                    if (!logon) {
                        reject('Logon request failed.');
                    } else if (errors.length)
                        reject(errors.map(e => e.message));
                    else {
                        resolve(logon);
                    }
                }
            });
        });
        //         const response = await fetch(altAppUrl + 'DirectXMLPostJSON', {
        //             method: 'POST',
        //             mode: 'same-origin',
        //             credentials: 'include',
        //             headers: {
        //                 "Content-Type": "text/xml",
        //                 "X-Requested-With": "XMLHttpRequest",
        //                 // 'Content-Type': 'application/x-www-form-urlencoded',
        //             },
        //             body: qlogon
        //         });
        //         const qr = await response.json();
        //         console.log(qr);
        //         return Promise.resolve();
        //     }
    }

    async search<T extends Keyscript.TableName>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, suppressMask?: boolean): Promise<Keyscript.SearchResultRow[]> {

        (request as Keyscript.SearchRequest<T>).tableName = table;

        const all = request.returnLimit === undefined;
        if (all) {
            request.returnLimit = MAX_RECORD_FETCH;
            request.$includeTotalHitCount = 'Y'; // Must request total hit count if we're retrieving all records.
        }

        const result = await this.postStep('search', request as Keyscript.SearchRequest<T>, suppressMask);

        const rows: Keyscript.SearchResultRow[] = result.resultRow ?? [];
        if (all && rows.length && result.totalHitCount) {
            const step = 100; //result.returnLimitMaximum ? Number(result.returnLimitMaximum) : rows.length;
            const totalHitCount = Number(result.totalHitCount ?? '0');
            const chunks: Promise<Keyscript.SearchResponse>[] = [];
            for (let n = rows.length; n < totalHitCount; n += step) {
                const req: Keyscript.SearchRequest<T> = { ...request, returnLimit: step, tableName: table, resumeCounter: n };
                chunks.push(this.postStep('search', req, suppressMask));
            }
            const results = await Promise.all(chunks);
            rows.push(...results.flatMap(s => s.resultRow ?? []));
        }
        return rows;
    }

    async recordSearch<T extends Keyscript.TableName>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, columns: '*', suppressMask?: boolean): Promise<RecordResponseEx<Keystone.TableInfo[T]>[]>;
    async recordSearch<T extends Keyscript.TableName, Q extends Project<T>>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, columns: Q, suppressMask?: boolean): Promise<RecordResponseEx<Q>[]>;
    async recordSearch<T extends Keyscript.TableName, Q extends '*' | Project<T>>(table: T, request: Omit<Keyscript.SearchRequest<T>, 'tableName'>, columns: Q, suppressMask?: boolean): Promise<RecordResponseEx<Q extends '*' ? Keystone.TableInfo[T] : Q>[]> {

        // function buildRecordRequests(kb: IKeybridge, rows: Keyscript.SearchResultRow[], fields?: Keyscript.FieldRequest[]): Promise<Keyscript.RecordResponse[]> {
        //     if (!rows.length) return Promise.resolve([]);
        //     const requests: Keyscript.RecordRequest[] = rows.map(row => fields
        //         ? { tableName: table, $operation: 'V', targetSerial: row.serial, $includeAllColumns: 'N', field: fields }
        //         : { tableName: table, $operation: 'V', targetSerial: row.serial, $includeAllColumns: 'Y' });
        //     return kb.postSteps('record', requests);
        // }

        (request as Keyscript.SearchRequest<T>).tableName = table;

        const all = request.returnLimit === undefined;
        if (all) {
            request.returnLimit = 500;
            request.$includeTotalHitCount = 'Y'; // Must request total hit count if we're retrieving all records.
        }
        const result = await this.postStep('search', request as Keyscript.SearchRequest<T>);

        const allFields = columns === '*'; // || (typeof columns === 'object' && !Object.keys(columns).length);
        const fields: Keyscript.FieldRequest[] | undefined = allFields ? undefined : Object.keys(columns).map(f => ({ columnName: f as string, $operation: 'G' }));
        const rows: Keyscript.SearchResultRow[] = result.resultRow ?? [];
        const recs: Promise<Keyscript.RecordResponse[]>[] = [this.#postRecordViewRequests(table, rows.map(r => r.serial), fields, suppressMask)];

        if (all && rows.length && result.totalHitCount) {
            const step = Math.min(MAX_RECORD_FETCH, Number(result.returnLimitMaximum ?? `${MAX_RECORD_FETCH}`));
            const totalHitCount = Number(result.totalHitCount ?? '0');
            for (let n = rows.length; n < totalHitCount; n += step) {
                const req: Keyscript.SearchRequest<T> = { ...request, returnLimit: step, tableName: table, resumeCounter: n };
                recs.push(this.postStep('search', req, suppressMask).then(s => this.#postRecordViewRequests(table, s.resultRow?.map(rr => rr.serial) ?? [], fields, suppressMask)));
            }
        }
        const mask = new Ext.LoadMask(Ext.getBody(), { msg: '', msgCls: 'cr-ajax-loaderNoText' });
        if (!suppressMask) mask.show();
        try {
            const results = await Promise.all(recs);
            //return results.flatMap(r => r.map(rr => ({ ...rr, fields: this.mapFields(rr) }))) as unknown as RecordResponseEx<Q extends '*' ? Keystone.TableInfo[T] : Q>[];
            return results.flatMap(r => r.map(rr => ({ ...rr, fields: Keybridge.mapFields<T>(rr) as { [K in keyof (Q extends '*' ? Keystone.TableInfo[T] : Q)]: Keyscript.FieldResponse } })));
        } finally {
            if (!suppressMask) mask.hide();
        }
    }

    static #buildRecordViewRequests(table: Keyscript.TableName, serials: Keystone.Serial[], fields?: Keyscript.FieldRequest[]): Keyscript.RecordRequest[] {
        return serials.map(serial => fields
            ? { tableName: table, $operation: 'V', targetSerial: serial, $includeAllColumns: 'N', field: fields }
            : { tableName: table, $operation: 'V', targetSerial: serial, $includeAllColumns: 'Y' });
    }

    #postRecordViewRequests(table: Keyscript.TableName, serials: Keystone.Serial[], fields?: Keyscript.FieldRequest[], suppressMask?: boolean): Promise<Keyscript.RecordResponse[]> {
        if (!serials.length) return Promise.resolve([]);
        return this.postSteps('record', Keybridge.#buildRecordViewRequests(table, serials, fields), suppressMask);
    }

    recordRead<T extends Keyscript.TableName>(table: T, searchRows: Keyscript.SearchResultRow[], columns: '*'): Promise<RecordResponseEx<Keystone.TableInfo[T]>[]>;
    recordRead<T extends Keyscript.TableName>(table: T, serials: Keystone.Serial[], columns: '*'): Promise<RecordResponseEx<Keystone.TableInfo[T]>[]>;
    recordRead<T extends Keyscript.TableName, Q extends Project<T>>(table: T, searchRows: Keyscript.SearchResultRow[], columns: Q): Promise<RecordResponseEx<Q>[]>;
    recordRead<T extends Keyscript.TableName, Q extends Project<T>>(table: T, serials: Keystone.Serial[], columns: Q): Promise<RecordResponseEx<Q>[]>;
    async recordRead<T extends Keyscript.TableName, Q extends '*' | Project<T>>(table: T, request: Keystone.Serial[] | Keyscript.SearchResultRow[], columns: Q): Promise<RecordResponseEx<Q extends '*' ? Keystone.TableInfo[T] : Q>[]> {

        if (!request.length) return [];

        function isSearchResultRows(r: Keystone.Serial[] | Keyscript.SearchResultRow[]): r is Keyscript.SearchResultRow[] {
            return typeof r[0] === 'object' && 'serial' in r[0];
        }

        const allFields = columns === '*';
        const fields: Keyscript.FieldRequest[] | undefined = allFields ? undefined : Object.keys(columns).map(f => ({ columnName: f as string, $operation: 'G' }));
        const serials: Keystone.Serial[] = isSearchResultRows(request) ? request.map(q => q.serial) : request;

        const recs: Promise<Keyscript.RecordResponse[]>[] = [];
        for (let n = 0; n < request.length; n += MAX_RECORD_FETCH) {
            recs.push(this.#postRecordViewRequests(table, serials.slice(n, n + MAX_RECORD_FETCH), fields));
        }

        const results = await Promise.all(recs);
        return results.flatMap(r => r.map(rr => ({ ...rr, fields: Keybridge.mapFields<T>(rr) as { [K in keyof (Q extends '*' ? Keystone.TableInfo[T] : Q)]: Keyscript.FieldResponse } })));
    }


    /*
        async #searchAllByChunk<T extends Keyscript.TableName, R>(request: Keyscript.SearchRequest<T>, chunk: SearchChunkFn<R>) {
            let count = 0;
            let totalCount = 0;
            const all = request.returnLimit === undefined;
            if (all) {
                request.returnLimit = 500;
                request.$includeTotalHitCount = 'Y'; // Must request total hit count if we're retrieving all records.
            }
            
            do {
                request.resumeCounter = count;
                const results = await this.postStep('search', request as Keyscript.SearchRequest<T>);
                if (!results.resultRow?.length)
                    break;
                count += results.resultRow.length;
                totalCount = Number(results.totalHitCount);
                if (!chunk(results.resultRow))
                    break;
            } while (all && count < totalCount)
        }
    */

    static mapFields<T extends Keyscript.TableName>(rr: Keyscript.RecordResponse): Record<Keyscript.ColumnName<T>, Keyscript.FieldResponse> {
        const mapped: Record<Keyscript.ColumnName<T>, Keyscript.FieldResponse> = {} as Record<Keyscript.ColumnName<T>, Keyscript.FieldResponse>;
        rr.field.reduce((p, c) => { p[c.columnName as Keyscript.ColumnName<T>] = c; return p; }, mapped);
        return mapped;
    }

    getUserLoginInfo(): Promise<UserLoginInfo> {
        // Using fetch() here rather than CR.Core.ajaxRequest() in order to avoid triggering the login dialog.
        const response = fetch(this.#buildUrl('UserLogin'), {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'include',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: 'JSESSION=&loginStatus=Y'
        });
        const qr = response.then(r => r.json().then(j => j as UserLoginInfo));
        return qr;
        /*
        return new Promise((resolve, reject) => {
            CR.Core.ajaxRequest({
                url: this.#buildUrl('UserLogin'),
                jsonData: 'JSESSION=&loginStatus=Y',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
                success: (r) => {
                    resolve(CR.JSON.parse(r.responseText) as unknown as UserLoginInfo);
                },
                failure: (error) => reject(error)
            });
        });
        */
    }

    getTableBrowserInfo(): Promise<Keyscript.TableListRecord<true>[]> {
        return new Promise((resolve, reject) => {
            CR.Core.ajaxRequest({
                url: this.#buildUrl('TableBrowser'),
                jsonData: 'JSESSION=',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "X-Requested-With": "XMLHttpRequest",
                },
                success: (r) => {
                    resolve(CR.JSON.parse(r.responseText) as unknown as Keyscript.TableListRecord<true>[]);
                },
                failure: (error) => reject(error)
            });
        });
        // const response = await fetch('TableBrowser', {
        //     method: 'POST',
        //     mode: 'same-origin',
        //     credentials: 'include',
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        //         "X-Requested-With": "XMLHttpRequest",
        //     },
        //     body: 'JSESSION='
        // });
        // const qr = await response.json() as TableInfo[];
        // return qr;
    }

    #tableMetaData: {
        TC?: Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<boolean>>>
        tC?: Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<boolean>>>
        Tc?: Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<boolean>>>
        tc?: Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<boolean>>>
    } = {};

    getTableList<CM extends boolean>(tableMetadata: boolean, columnMetadata: CM): Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<CM>>> {

        function makeKey() {
            if (tableMetadata) return columnMetadata ? 'TC' : 'Tc';
            return columnMetadata ? 'tC' : 'tc';
        }

        function postQuery<C extends boolean>(url: CR.KeybridgeQuery['url']): Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<C>>> {
            return new Promise((resolve, reject) => {
                const xml = new CR.XML();
                const seq = xml.addContainer(xml.getRootElement(), 'sequence');
                const tx = xml.addContainer(seq, 'transaction');
                const step = xml.addContainer(tx, 'step');
                const tl = xml.addContainer(step, 'tableList');
                xml.addOption(tl, 'includeAllColumns', columnMetadata ? 'Y' : 'N');
                xml.addOption(tl, 'includeColumnMetadata', columnMetadata ? 'Y' : 'N');
                xml.addOption(tl, 'includeTableMetadata', tableMetadata ? 'Y' : 'N');
                //console.log(new XMLSerializer().serializeToString(xml.getXMLDocument()));
                CR.Core.ajaxRequest({
                    url,
                    xmlData: xml.getXMLDocument(),
                    //crMask: { suppress: true },
                    success: (r) => {
                        const response = CR.JSON.parse(r.responseText) as Keyscript.QueryResponse;
                        const records = response.query.sequence[0].transaction[0].step.filter(s => s.record).map(r => r.record as unknown as Keyscript.TableListRecord<C>);
                        const tableXref: Record<string, Keyscript.TableListRecord<C>> = {};
                        records.forEach(r => tableXref[r.tableName] = r);
                        resolve(tableXref);
                    },
                    failure: (error) => reject(error)
                });
            });
        }

        const key = makeKey();
        let result = this.#tableMetaData[key];
        if (!result) {
            result = this.#tableMetaData[key] = postQuery<CM>(this.#buildUrl('DirectXMLPostJSON'));
        }
        return result as Promise<Record<Keyscript.TableName, Keyscript.TableListRecord<CM>>>;
    }

    // private static isTranResult(step: Keyscript.StepResponse): step is { tranResult: Keyscript.TranResultResponse } {
    //     return "tranResult" in step;
    // }

    async postStep<K extends keyof Omit<Keyscript.RequestTypes, 'recordTree'>>(type: K, request: Keyscript.RequestTypes[K], suppressMask?: boolean)
        : Promise<Keyscript.ResponseTypes[K]> {
        const result = await this.postSteps(type, [request], suppressMask);
        //TODO: Handle possible errors and/or tranResult steps?
        return result[0];
    }

    async postSteps<K extends keyof Keyscript.RequestTypes>(type: K, requests: Keyscript.RequestTypes[K][], suppressMask?: boolean)
        : Promise<Keyscript.ResponseTypes[K][]> {
        const req: Keyscript.RequestStep[] = requests.map(x => {
            const r: Record<string, Keyscript.RequestTypes[K]> = {}
            r[type] = x;
            return r as unknown as Keyscript.RequestStep;
        });
        const result = await this.postQuery(req, suppressMask);
        const deref = (type === 'recordTree') ? 'record' : type;
        return (result as unknown as Record<string, Keyscript.ResponseTypes[K]>[])
            .map(x => x[deref])
            .filter(x => x !== undefined);
    }

    postQuery(request: CR.XML | Keyscript.Request | Keyscript.RequestStep[], suppressMask?: boolean): Promise<Keyscript.StepResponse[]> {

        const xml = Keybridge.#isCrXml(request) ? request : Keybridge.#xmlFromRequest(request);

        return new Promise((resolve, reject) => {
            CR.Core.ajaxRequest({
                url: this.#buildUrl('DirectXMLPostJSON'),
                crMask: { suppress: suppressMask ?? false },
                xmlData: xml.getXMLDocument(),
                failure: (error) => reject(error),
                success: function (response: { responseText: string, status: number, statusText: string }) {
                    const responseSteps: Keyscript.StepResponse[] = [];
                    const txResults: Keyscript.TxResult[] = [];
                    const errorArray: string[] = [];
                    const responseJson = CR.JSON.parse(response.responseText) as Keyscript.QueryResponse;
                    const query = responseJson.query;
                    if (!query) {
                        reject('Keybridge query error: No response');
                    }
                    //TODO: In the case of multiple transactions, return success/errors per transaction as some tx's may succeed even when others don't.
                    const tx = query.sequence.flatMap(seq => seq.transaction);
                    tx.forEach(transaction => {
                        txResults.push(transaction.$attr.result);
                        if (transaction.$attr.result === 'failed') {
                            errorArray.push(...(transaction.exception ?? []).map(e => e.message));
                        }

                        transaction.step.forEach(step => {
                            if (step.tranResult?.category?.option === "E") {
                                errorArray.push(step.tranResult.description);
                            } else {
                                // TODO: Exclude system generated steps? 
                                responseSteps.push(step);
                            }
                        });
                    });

                    if (errorArray.length > 0 || txResults.find(r => r !== "posted" && r !== 'verified')) {
                        //CR.Core.displayExceptions({ items: errorArray });
                        reject(errorArray);
                    } else if (!responseSteps.length) {
                        const msg = 'Keybridge query error: No steps returned';
                        //CR.Core.displayExceptions({ items: [msg] });
                        reject(msg);
                    } else {
                        resolve(responseSteps);
                    }
                },
            });
        });
    }

    static #objectIntoXml(obj: Record<string, unknown>, xml: CR.XML, parent?: CR.XML_Container): void {

        function addElement(key: string, value: string | number) {
            if (key.startsWith('.')) {
                xml.setAttribute(parent ?? xml.getRootElement(), key.substring(1), value.toString());
            } else if (key.startsWith('$')) {
                xml.addOption(parent ?? xml.getRootElement(), key.substring(1), value.toString());
            } else {
                xml.addText(parent ?? xml.getRootElement(), key, value);
            }
        }

        Object.keys(obj).filter(k => !k.startsWith('__')).forEach(k => {
            const v = obj[k];
            switch (typeof v) {
                case 'object':
                    if (Array.isArray(v)) {
                        v.forEach(i => {
                            const p = xml.addContainer(parent ?? xml.getRootElement(), k);
                            Keybridge.#objectIntoXml(i as Record<string, unknown>, xml, p);
                        });
                    } else if (v instanceof Date) {
                        addElement(k, v.toISOString().substring(0, 10));
                    } else if (v !== null) {
                        const p = xml.addContainer(parent ?? xml.getRootElement(), k);
                        Keybridge.#objectIntoXml(v as Record<string, unknown>, xml, p);
                    }
                    break;
                case 'number':
                case 'string':
                    addElement(k, v);
                    break;
                case 'symbol':
                    addElement(k, v.toString());
                    break;
                case 'undefined':
                    break;
                case 'boolean':
                case 'bigint':
                case 'function':
                default:
                    throw Error(`XML conversion error: invalid data type: ${typeof v} `);
            }
        });
    }

    static #xmlFromRequest(req: Keyscript.Request | Keyscript.RequestStep[]): CR.XML {
        const xml = new CR.XML();
        if (Array.isArray(req))
            Keybridge.#objectIntoXml({ sequence: { transaction: { step: req } } }, xml);
        else
            Keybridge.#objectIntoXml(req, xml);
        return xml;
    }

    static #isCrXml(request: CR.XML | Keyscript.Request | Keyscript.RequestStep[]): request is CR.XML {
        return "getXMLDocument" in request;
    }

    #buildUrl(endpoint: CR.KeybridgeEndpoint): CR.KeybridgeQuery['url'] {
        return this.#dbOverride ? `/${this.#dbOverride}/${endpoint}` : endpoint;
    }
}
