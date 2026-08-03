declare namespace Keyscript {

    export type YesNo = 'Y' | 'N'
    export type YesNoOption = { option: 'Y', text: 'Yes' } | { option: 'N', text: 'No' }

    export type DataType =
        { option: 'N', text: 'None' }
        | { option: 'E', text: 'Serial' }
        | { option: 'S', text: 'Text' }
        | { option: 'C', text: 'Count' }
        | { option: 'O', text: 'Option' }
        | { option: 'D', text: 'Date' }
        | { option: 'T', text: 'Time' }
        | { option: 'M', text: 'Money' }
        | { option: 'R', text: 'Rate' }
        | { option: 'L', text: 'Document' }
        | { option: 'B', text: 'Binary' }

    export type TableName = keyof Keystone.FilterInfo | keyof Keystone.TableInfo
    export type ColumnName<T extends TableName> = keyof Keystone.TableInfo[T]
    export type StatusTableName = keyof Pick<Keystone.FilterInfo, 'ACCOUNT' | 'LOAN' | 'PERSON' | 'SHARE' | 'LOGIN'>
    //Account, Account Defaults, Share, Share Defaults, Loan, Loan Defaults, Loan Request, Person, Posting Policy, and Login 

    export interface RequestTypes {
        record: RecordRequest
        recordTree: RecordTreeRequest
        recordReference: RecordReferenceRequest<TableName>
        search: SearchRequestBase<TableName>
        postingStatus: StatusRequest
        securityCheck: SecurityCheckRequest
    }

    export type RequestStep = Split<RequestTypes>

    export type Request = {
        sequence: Array<{
            //'.onException'?: 'abort' | 'continue'
            transaction: Array<{
                postingMode?: 'V' | 'P'
                step: RequestStep[]
            }>
        }>
    }

    type SearchRequestBase<T extends TableName> = RequestLabel
        & {
            tableName: T
            returnLimit?: number
            $returnFullRowDescription?: YesNo
            $includeSelectColumns?: YesNo
            $includeTotalHitCount?: YesNo
            resumeCounter?: number
        }

    export type SearchRequest<T extends TableName> = SearchRequestBase<T>
        & {
            filterName: keyof Keystone.FilterInfo[T]
            parameter?: { columnName: string, contents: string }[]
        }

    type SecurityCheckParams = {
        $operation?: 'VIEW' | 'CHECK' | 'SESSION_VALIDATE'
        securityEventSerial?: Keystone.Serial
        $securityEvent?: string
        tableName?: string
        columnName?: string
    }
    export type SecurityCheckRequest = RequestLabel & SecurityCheckParams

    export type RecordReferenceRequest<T extends TableName> = RequestLabel
        & {
            tableName: T
            targetSerial: Keystone.Serial
            $includeTotalHitCount?: YesNo
            resumeCounter?: number
        }

    export type RecordRequest = RequestLabel
        & {
            $operation: RecordOperation
            exceptionDescriptionPrefix?: string
            $includeTableMetaData?: YesNo
            $includeColumnMetaData?: YesNo
            $includeRowDescriptions?: YesNo
            tableName: TableName
            targetSerial?: Keystone.Serial        // Must be left undefined for inserts.
            targetParentSerial?: Keystone.Serial  // Must be specified for inserts for tables that have a parent.
            //targetSerialFrom?:
            //targetParentSerialFrom?:
            $includeAllColumns: 'Y' | 'N' | undefined
            field?: FieldRequest[]
        }
    //  & ({
    //     $includeAllColumns: 'Y'
    //     field?: never
    // } | {
    //     $includeAllColumns: 'N' | undefined
    //     field: FieldRequest[]
    // })

    export type RecordTreeRequest = RequestLabel
        & {
            exceptionDescriptionPrefix?: string
            tableName: TableName
            viewName: 'STANDARD' | 'REFERENCE' | 'ANCESTOR'
            targetSerial: Keystone.Serial
            $includeRecordDetail: YesNo
            recordDetail?: Array<{ tableName: TableName }>
        }

    export type StatusRequest = RequestLabel
        & {
            tableName: StatusTableName
            targetSerial: Keystone.Serial
            $includeMonetaryAccess: YesNo
            $includeAllNotes?: YesNo
            $includeClosedAccounts?: YesNo
            $includeChargedOfAccounts?: YesNo
            $includeShareNegativeSinceDate?: YesNo
            //$includeLoginAccessAccounts?: YesNo
            //$includePersonRelated?: YesNo
            $includeAllPersonLinks?: YesNo
        }

    export type ExceptionCategory =
        '-'  // General exception
        | 'E' // Privilege exception
        | 'e' // Overridden privilege exception
        | 'O' // Warning requiring override
        | 'W' // Warning
    // The value “E” indicates a privilege exception requiring a supervisory override by another user,
    // and “O” indicates a warning requiring a manual override by the current user.The default is “-”.

    export type Exception = {
        message: string // A description of the exception or warning.
        accessKey?: string // An optional access key which is a unique identifier of a record in the system. The exception or warning pertains to that record.
        reason: string
        amount?: Keystone.Money // An optional monetary amount for the exception or warning.
        category: ExceptionCategory
        event: string // Returns an option specifying the security event.There are many possible values.The default is “-“ for “None”.
        securityEventSerial?: Keystone.Serial // The serial number of the security event that caused this exception, if any.It can be used to uniquely identify the action that caused this exception.
        securitySeverity?: number // (Count) //This data element contains a number indicating the “severity” of the privileged action.Higher numbers indicate a more severe security restriction.The numbers are user - defined and settable in the database.
        restrictedAccessKey?: string // An optional access key which is a unique identifier of a record in the system that is restricted from use.
    }

    export type RecordOperation = 'V' | 'U' | 'I' | 'D' | 'M'

    export type FieldRequest = {
        $operation: 'G' // Get
        columnName: string
    } | {
        $operation: 'S' // Set
        columnName: string
        newContents?: string
        newContentsFrom?: { label: string, $resultValue: "TargetSerial" | "TargetParentSerial" | "TargetAccessKey" | "Contents" | "OldContents" | "RecipientSerial" | "RecipientAccessKey" } // "NewLocationSerial" | "OldAfterSerial"
        $verifyOldContents?: 'Y'
        oldContents?: string
    } | {
        $operation: 'A' // Add
        columnName: string
        addContents: string
        $verifyOldContents?: 'Y'
        oldContents?: string
    }

    export type RequestLabel = {
        '.label'?: string
    }

    export type TxResult = 'posted' | 'verified' | 'failed' | 'skipped'

    export type QueryResponse = {
        query: {
            '$attr': {
                sessionId: string
            }
            sequence: SequenceResponse[]
            logon?: LogonResponse
        }
    }

    export type LogonResponse = {
        userName: string
        userSerial: string
        deviceName: string
        deviceSerial: string
        deviceIdentifier: string
        defaultTimeZone: { option: string, text: string }
        databaseName: string
        sessionID: string
        sessionTimeoutSeconds: string;
        exception?: Exception[]
    }

    export type SequenceResponse = {
        transaction: TransactionResponse[]
    }

    export type TransactionResponse = {
        '$attr': {
            result: TxResult
        }
        serial?: Keystone.Serial // The transaction serial (if a transaction record was generated). 
        systemGenerated?: { option: string, text: string }
        exception?: Exception[]
        branchSerial: string
        postingDate?: Keystone.ISODate
        postingTime: string
        step: StepResponse[]
    }

    export interface ResponseTypes {
        record: RecordResponse
        recordTree: RecordTreeResponse
        search: SearchResponse
        postingStatus: StatusResponse
        securityCheck: SecurityCheckResponse
        recordReference: RecordReferenceResponse
        tranHistory: TranHistoryResponse
        tranResult: TranResultResponse
    }

    export type StepResponse = Partial<ResponseTypes>

    export type ResponseBase = {
        '$attr'?: {
            label?: string
        }
        //warning?: Warning[]
        exception?: Exception[]
    }

    export type TranResultCategory =
        "I" // Information (default)
        | "E" // Exception
        | "W" // Warning
        | "D" // Security log, privilege denied
        | "G"; // Security log, privilege granted

    export type TranResultResponse = { //TODO: & ResponseBase ???
        description: string
        category?: { option: TranResultCategory, text: string } // 'E' | ...
        sourceLabel?: string
        systemGenerated?: { option: string, text: string }
    }

    type SecurityAccessOption = { option: 'G', text: 'Grant' } | { option: 'W', text: 'Grant with warning' } | { option: 'D', text: 'Deny' }
    export type SecurityCheckResponse = {
        operation?: 'VIEW' | 'CHECK' | 'SESSION_VALIDATE'
        securityEventSerial?: Keystone.Serial
        securityEvent?: string
        tableName?: string
        columnName?: string
        amountResult?: Keystone.Money // Returns the amount limit for the user for the specified security event, if any.
        accessResult?: SecurityAccessOption // The default is 'G'. Only returned if the user's access is 'W' or 'D'.
        overrideAmountResult?: Keystone.Money // Returns the amount limit for the user when the user attempts to grant a security override to another user for the specified security event, if any.
        overrideAccessResult?: SecurityAccessOption // The default is 'D'. Only returned if the user's access is 'G' or 'W'.
    }

    export type RecordRefRowStatus = {
        '-': 'Normal',
        C: 'Closed',
        O: 'Charged off',
        V: 'Voided',
        E: 'Expired',
        F: 'Effective in future',
    }
    export type RecordRefResultRow = {
        serial: string
        tableName: string
        tableDescription: string
        rowDescription: string
        columnName: string
        columnDescription: string
        rowStatus?: keyof RecordRefRowStatus
    }
    export type RecordReferenceResponse = ResponseBase & {
        rowDescription: string
        rowStatus?: keyof RecordRefRowStatus
        returnLimit: number
        returnLimitMaximum?: number
        resultRow: RecordRefResultRow[]
        totalHitCount?: string
    }

    export type SearchResultRow = {
        serial: Keystone.Serial
        rowStatus?: '-' // Normal
        | 'C' // Closed
        | 'O' // Charged off
        | 'V' // Voided
        | 'E' // Expired
        | 'F' // Effective in future
        //Only returned if “includeSelectColumns” is set to “Y”. Returns the status of the record, if any. The default is “-“. 
        selectColumn?: { contents: string }[]
        //Only returned if “includeSelectColumns” is “Y”. Returns selected columns for this result record.The metadata for each column is returned within this container if “includeSelectMetadataWithEachResultRow” is “Y”.Otherwise, the metadata is only returned in the “selectColumn” elements that precede the “resultRow” containers.The order and number of selectColumn container elements here matches the selectColumn metadata elements that precede the resultRow containers.You can think of the ones preceding the resultRow containers as “headers” for the result rows.
    }

    export type TranHistoryResponse = ResponseBase & {
        //targetSerial: Keystone.Serial
        targetSerialResult: Keystone.Serial
        rowDescription: string
        //resumeBookmark: string
        resumeBookmarkNext?: string
        //returnLimit: string
        returnLimitMaximum: string
        transaction?: TranHistoryTransaction[]
    }
    export type TranHistoryTransaction = {
        serial: Keystone.Serial
        status?: keyof { P: 'Posted', V: 'Voided' }
        category: string
        // personSerial
        // personRowDescription
        userSerial: Keystone.Serial
        userName: string
        postingDate: string
        postingTime: string
        step: Array<{
            postingRequest?: {
                serial: Keystone.Serial
                systemGenerated?: { option: string, text: string }
                postingItemSerial: Keystone.Serial
                networkLogSerial?: Keystone.Serial
                status: string
                reason: string
            }
            monetary?: {
                serial: Keystone.Serial
                systemGenerated?: { option: string, text: string }
                status: string
                targetCategory: string
                targetSerial: string
                targetAccessKey: string
                targetAccessKeyDescription: string
                privilegeToView: keyof YesNoOption
                effectiveDate: Keystone.ISODate
                category: string
                source: string
                // transferOption
                // adjustmentOption
                // regEOption
                // regDOption
                // subCategory
                // taxDetailCategory
                description: string
                principal: Keystone.Money
                interest: Keystone.Money
                //impound
                lateFee: Keystone.Money
                otherCharges: Keystone.Money
                newBalance: Keystone.Money
                lastMonetaryDate: Keystone.ISODate
                lastActivityDate: Keystone.ISODate
                monetaryDetail: Array<{
                    serial: Keystone.Serial
                    systemGenerated?: { option: string, text: string }
                    category: { option: string, text: string }
                    field: Array<{
                        columnDescription: string
                        dataType: DataType
                        contents: string
                        contentsDescription: string
                    }>
                }>
            }
            record?: unknown
            gl?: unknown
            currencyTransaction?: unknown
            tranResult?: TranResultResponse & {
                reason: string
                systemGenerated?: { option: string, text: string }
                // securityEventSerial
                // securityEventDescription
                // securitySeverity
                identifier: string
                description: string
                dataType: DataType
                contents: string
            }
        }>
    }

    export type SearchResponse = ResponseBase & {
        tableName: TableName
        tableDescription: string
        filterDescription: string
        filterName: string
        parameter?: { columnName: string, contents: string }[]
        resultRow?: SearchResultRow[]
        returnLimit: string
        returnLimitMaximum?: string
        //person Container, Returned
        totalHitCount?: string
        selectColumn?: {
            tableName: string
            columnName: string
            columnDescription: string
        }[]
    }

    export type FieldResponse = {
        systemGenerated?: { option: string, text: string }
        columnName: string
        columnDescription?: string
        dataType?: DataType
        //nullAllowed?: YesNo
        oldContents?: string
        newContents?: string
        newContentsDescription?: string //Only for Option fields or if includeRowDesriptions = 'Y' in the request.
        contentsSuppressed?: YesNoOption
    }

    export type RecordResponseBase = ResponseBase & {
        systemGenerated?: { option: string, text: string }
        operation: {
            option: RecordOperation
            text: string //'View' | 'Update' | 'Insert' | 'Delete' | 'Move'
        }
        tableName: TableName,
        tableDescription?: string       //Only present if includeTableMetaData is 'Y'? 
    }

    //    export type TableListEntry = { tableName: string, tableDescription: string, parentTableName?: string }
    export type ColumnMetaData = {
        columnName: string
        columnDescription: string
        // columnOrdinal?: number //Prsent for browser info but not table list
        dataType: Keyscript.DataType
        referenceTableName?: Keyscript.TableName
        nullAllowed?: Keyscript.YesNoOption
        futureAllowed?: YesNoOption // Present for date data type
        defaultContents?: string // Present for option data type
        options?: { option: string, text: string }[]     // Present for option data type
    }
    //export type TableInfo = TableListEntry & { field: ColumnInfo[] }

    export type TableListRecord<ColumnMeta extends boolean> = RecordResponseBase & {
        // includeRowDescriptions?: YesNoOption,
        // includeAllColumns?: YesNoOption
        parentTableName?: TableName     //Only present if includeTableMetaData is 'Y'? 
        parentTableDescription?: string //Only present if includeTableMetaData is 'Y'? 
        defaultsTableName?: string      //Only present if includeTableMetaData is 'Y'? 
        field: ColumnMeta extends true ? ColumnMetaData[] : undefined
        childTable?: { tableName: string }[]
        reference?: { columnName: string, tableName: string }[]
        //viewGroup: TableMeta extends true ? string : undefined
    }

    export type RecordResponse = RecordResponseBase & {
        includeRowDescriptions?: YesNoOption,
        includeAllColumns?: YesNoOption
        parentTableName?: TableName     //Only present if includeTableMetaData is 'Y'? 
        parentTableDescription?: string //Only present if includeTableMetaData is 'Y'? 
        defaultsTableName?: string      //Only present if includeTableMetaData is 'Y'? 
        targetSerial: Keystone.Serial
        targetSerialResult: Keystone.Serial
        targetAccessKeyResult: string
        rowDescription?: string
        serial?: Keystone.Serial
        field: FieldResponse[]
    }

    export type RecordTreeResponse = Omit<RecordResponse, 'includeRowDescriptions' | 'serial'> & {
        parentTableName?: TableName
        targetParentSerialResult?: Keystone.Serial
    }

    export type StatusResponse = ResponseBase & {
        tableName: string
        targetSerial: Keystone.Serial
        targetSerialResult: Keystone.Serial
        targetAccessKeyResult: string
        rowDescription: string
        effectiveDateResult?: Keystone.ISODate
        person?: PersonRec
        account?: AccountRec[]
        collectionItem?: unknown
        workTask?: unknown
        rentalData?: unknown
        posin6Policy?: unknown
    }

    export type PersonRec = {
        serial: Keystone.Serial
        rowDescription: string
        firstName?: string
        middleName?: string
        lastName?: string
        tinSuffix?: string
        birthDate?: Keystone.ISODate
        deathDate?: Keystone.ISODate
        taxStateSerial?: Keystone.Serial
        alertEligibilityDate?: Keystone.ISODate
        alert?: AlertRec[]
        category?:
        { option: 'I', text: 'Individual' } // Default
        | { option: 'B', text: 'Sole Proprietorship' }
        | { option: 'C', text: 'Corporation' }
        | { option: 'S', text: 'S Corporation' }
        | { option: 'P', text: 'Partnership' }
        | { option: 'p', text: 'Limited Partnership' }
        | { option: 'l', text: '(lower case “L”) LLP ' }
        | { option: 'L', text: 'LLC' }
        | { option: 'N', text: 'NPO' }
        | { option: 'T', text: 'Trust' }
        | { option: 'E', text: 'Estate' }
        | { option: 'O', text: 'Other entity' }
    }

    export type PersonLinkCategory =
        { option: '-', text: 'None' }
        | { option: 'PR', text: ' Primary owner' }
        | { option: 'TP', text: ' Tax Plan owner' }
        | { option: 'JT', text: ' Joint owner' }
        | { option: 'CB', text: ' Co-borrower' }
        | { option: 'AS', text: ' Authorized signer' }
        | { option: 'PA', text: ' Power of attorney' }
        | { option: 'TR', text: ' Trustee' }
        | { option: 'ST', text: ' Successor trustee' }
        | { option: 'CU', text: ' Custodian' }
        | { option: 'SC', text: ' Successor custodian' }
        | { option: 'GD', text: ' Guardian' }
        | { option: 'CV', text: ' Conservator' }
        | { option: 'RP', text: ' Representative payee' }
        | { option: 'VF', text: ' VA fiduciary' }
        | { option: 'AD', text: ' Administrator' }
        | { option: 'EX', text: ' Executor' }
        | { option: 'BE', text: ' Beneficiary' }
        | { option: 'BC', text: ' Contingent beneficiary' }
        | { option: 'RB', text: ' Revocable trust beneficiary' }
        | { option: 'RC', text: ' Contingent revocable trust beneficiary' }
        | { option: 'IB', text: ' Irrevocable trust beneficiary' }
        | { option: 'IC', text: ' Contingent irrevocable trust beneficiary' }
        | { option: 'CS', text: ' Cosigner' }
        | { option: 'GU', text: ' Guarantor' }
        | { option: 'AU', text: ' Authorized user' }
        | { option: 'BO', text: ' Beneficial owner' }
        | { option: 'CO', text: ' Collateral owner' }
        | { option: 'SA', text: ' Statement addressee' }
        | { option: 'AA', text: ' Additional mailing addressee' }
        | { option: 'OT', text: ' Other related party' };

    export type PersonLinkRec = PersonRec & {
        personLinkCategory?: PersonLinkCategory
    }

    export type ShareCategoryOption =
        | "S" // Share (default)
        | "D" // Draft
        | "C" // Certificate
        | "B" // Club

    export type ShareRec = {
        serial: Keystone.Serial
        id: string
        accessKey: string
        description: string
        typeSerial: Keystone.Serial,
        category: { option: ShareCategoryOption, text: string }
        minimumBalance?: `${number}`,
        regCCOption?: { option: string, text: string }
        regDPay: { option: string, text: string }
        openDate?: Keystone.ISODate
        closeDate?: Keystone.ISODate
        chargeOffDate?: Keystone.ISODate
        branchSerial: Keystone.Serial
        depositRestriction?: { option: 'R' | 'U', text: string }
        withdrawalRestriction?: { option: 'R' | 'U', text: string }
        dormancyStatus?: YesNo
        lastMonetaryDate?: Keystone.ISODate
        lastActivityDate?: Keystone.ISODate
        lastActivityDays: Keystone.NumberString
        dormancyRestrictionDays?: Keystone.NumberString
        monetaryPurgeDate?: Keystone.ISODate
        balance: Keystone.Money,
        courtesyPayLimit?: Keystone.Money
        courtesyPayRestrictionSerial: Keystone.Serial,
        positivePayOption?: '-' | 'D' | 'A' | 'B'
        originalDate?: Keystone.ISODate
        statementRegECount?: Keystone.Serial,
        statementCutoffGroupSerial: Keystone.Serial
        statementLastCutoffDate?: Keystone.ISODate
        dividendCalculationSerial: Keystone.Serial
        dividendAccruedDate?: Keystone.ISODate
        dividendAPYEStartDate?: Keystone.ISODate
        taxPerson?: PersonRec
        ownerPerson: PersonLinkRec[]
        alertEligibilityDate?: Keystone.ISODate
        availableCalculate?: {
            effectiveDate: Keystone.ISODate
            balance: Keystone.Money
            minimumBalance?: Keystone.Money
            availableAmount: Keystone.Money
        }
        maturityDate?: Keystone.ISODate
        maturityPeriod?: Keystone.NumberString
        certificatePenaltyCalculationSerial?: Keystone.Serial
        certificateDividendsAvailable?: Keystone.Money
        dividendCustomRate?: Keystone.NumberString
        holdEligibilityDate?: Keystone.ISODate
        holdEligibilityTime?: string // ISODateTime 2024-02-19 12:31:21 MST
        hold?: HoldRec[]
    }

    export type HoldRec = unknown
    export type AlertRec = {
        serial: Keystone.Serial
        typeSerial: Keystone.Serial
        typeDescription: string
        displayColor: string
        explanation: string
        expirationDate?: Keystone.ISODate
    }
    export type LoanRec = {
        serial: Keystone.Serial
        id: string
        accessKey: string
        description: string
        openDate?: Keystone.ISODate
        closeDate?: Keystone.ISODate
        chargeOffDate?: Keystone.ISODate
        branchSerial: Keystone.Serial
        typeSerial: Keystone.Serial
        typeDescription: string
        ownerPerson: PersonLinkRec[]
        balance: Keystone.Money
        //effectiveDateResult?: Keystone.ISODate
        hold?: unknown[]
        availableCalculate: {
            effectiveDate: Keystone.ISODate
            balance: Keystone.Money
            creditLimit: Keystone.Money
            heldFunds: Keystone.Money
            uncollectedFunds: Keystone.Money
            availableAmount: Keystone.Money
        }
        category: keyof {
            CE: 'Closed end',
            OE: 'Open end',
            LC: 'Line of credit',
            CC: 'Credit card',
        }
        bankruptcyIndicator?: keyof {
            '-': 'None',
            '7': 'Chapter 7',
            '11': ' Chapter 11',
            '12': ' Chapter 12',
            '13': ' Chapter 13'
        }
    }

    export type SharedBranchOption =
        "S" //Standard (default)
        | "H" //No deposit holds
        | "D" //Access denied
    export type AccessRestriction =
        "U" // Unrestricted (default)
        | "R" // Restricted
        | "E" // Employee
        | "F" // Employee related

    export type AccountRec = {
        serial: Keystone.Serial,
        accountNumber: string
        accountTitle?: string
        openDate?: Keystone.ISODate
        closeDate?: Keystone.ISODate
        primaryPerson: PersonRec
        relationshipSerial: Keystone.Serial
        relationshipDescription: string
        alertEligibilityDate?: Keystone.ISODate
        sharedBranchOption?: SharedBranchOption
        accessRestriction?: AccessRestriction
        correspondenceDate?: Keystone.ISODate
        share?: ShareRec[]
        loan?: LoanRec[]
        // payroll?: PayrollRec[]
        // distribution?: DistributionRec[]
        alert?: AlertRec[]
    }
}
