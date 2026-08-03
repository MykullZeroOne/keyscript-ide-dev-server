/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace CR {

  export function mainPage(): void

  type KeybridgeEndpoint = 'DirectXMLPostJSON' | 'TableBrowser' | 'TableListJSON' | 'UserLogin' | 'PersonVerificationSearch'

  export type KeybridgeQuery = {
    url: KeybridgeEndpoint | `/${string}/${KeybridgeEndpoint}`
    headers?: Record<string, string>
    params?: Record<string, string>
    method?: 'GET' | 'POST'
    //crOverride?: { suppress?: boolean, disableContainer?: boolean, successIfNotApproved?: boolean}
    crMask?: { suppress: boolean },
    success: (response: any) => void
    failure?: (error: any) => void
  } & ({ xmlData: XMLDocument, jsonData?: never } | { xmlData?: never, jsonData: object | string })

  export class KeyStoneService {
    static SERVICE_BASE_URL: string
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  export type XML_Container = {
  }

  export class MainMenu {
    static defaultPanel: Ext.TabPanel
  }

  export type KeystoneMessage = {
    /**
     * Post a message to the main KeyStone window
     * @param {Object} message
     * The message object to pass to the main window. Currently the following
     * object key values are supported:
     * @message {boolean} setVisible Set to true or false to hide or show the
     * script.
     * @message {boolean} closeScriptPanel Set to true to terminate and close the
     * script.
     * @message {boolean} updateApplicationContinue Set to true to notify the
     * current Application workflow to continue to the next workflow step.
     * @message {boolean} refreshComponents Set to true to ask the main User
     * Interface to update all its visible components. This is useful when you want
     * the main UI to reflect a change that was done on your script, for example
     * after doing File Maintenance transactions that would need to reflect a change
     * on the screen outside your script in the main KeyStone user interface.
     * @message {boolean} refreshWorkflow Identical to @refreshComponents.
     * @message {boolean} getCoreParams Set to true to ask the main KeyStone user
     * interface for any additional core parameterss that can be passed to your
     * script. Currently this is used for scripts that run after posting a Teller
     * Transaction. The script can ask for the JSON object that contains the Query
     * Server response for the posted transaction.
     * @message {boolean} scriptSerial Provides the means to run another script.
     * Pass the serial value of the script you want to run. A better way to do this
     * is with the utility function @CR.Script.runScript.
     */
    setVisible?: boolean
    closeScriptPanel?: boolean
    refreshComponents?: boolean
    refreshWorkflow?: boolean
    getCoreParams?: boolean
    scriptSerial?: Keystone.Serial;

    //Worflow message params...
    updateApplicationContinue?: boolean
    workflowStepStatus?: 'C' | 'I' // C=Complete, I=Incomplete or omit to leave unchanged
  }

  export type KeystoneWorkflowStepMessage = {
    event: 'refresh'
    messageType: 'workflow'
    refreshComponent: boolean
  } | {
    event: 'update'
    messageType: 'workflow'
    stepScript?: boolean
    updateApplication: boolean
    nextButtonClick: boolean
    previousButtonClick: boolean
  }

  export type WorkflowMessage = {
    messageType: string //Will always be 'workflow' for workflow validation scripts.
    requestType: string	// Contains the type of Workflow transaction the user is trying to attempt. It will be always be 'update'.
    step: 'APPLICANT' | 'CREDIT_PULL' | 'FINANCE' | 'LN_PROJECT' | 'FINANCIALS' | 'DECISION' | 'FUNDING' // etc. As defined in the Work Task Step table for the Step option field.
    applicationSerial: string  // This contains the current Application record serial.All
    workflowSerial: string     // This contains the current Work Flow record serial.All
    workTaskSerial: string     // This contains the current Work Task record serial.All
    workTaskStepSerial: string // This contains the current Work Task Step record serial.All
  }

  export type WorkflowPostMessage = WorkflowMessage & {
    /*
    This is the JavaScript object representation to the Query Language XML that will be posted to perform the Workflow transaction.That is in JSON format.
    For a 'beforepost' event this contains the Query transaction that is about to be posted.The script can reject or modify the transaction if needed.
    For an 'afterpost' event this contains the Query transaction that was posted.The script can review the results of the transaction and take any extra needed action.If the script is not visible to the user it must call CR.Script.closeScript() once it is done processing.
    */
    query: Keyscript.Request
  }

  // Work Step Validation handler. The documentation says you can specify a work flow validation script but I do not see anyplace to do that. 
  export type WorkflowMessageHandler = {
    afterrender?: (workflowMessage: WorkflowMessage) => void
    beforepost?: (workflowMessage: WorkflowPostMessage) => void   // to let transaction post we echo back the query as-is: CR.Script.workflowPost({query: workflowMessage.query});
    afterpost?: (workflowMessage: WorkflowPostMessage) => void
    close?: (workflowMessage: WorkflowPostMessage) => void
  }

  export type FileMaintenanceMessage = {
    event: 'afterrender' | 'fieldchange' | 'fieldblur' | 'beforepost' | 'afterpost' | 'close'
    requestType: 'insert' | 'update' | 'delete'
    tableName: string
    tableDescription: string
    targetSerial?: string
    rowDescription?: string
    parentSerial?: string
    defaultsSerial?: string
    fields: Record<string, {
      contents: string
      rowDescription?: string
      text?: string
    }>
  }
  
  export type FileMaintenanceFieldChangeMessage = FileMaintenanceMessage & {
    columnName: string
    oldContents: string
    newContents: string
  }
  
  export type FileMaintenancePostMessage = FileMaintenanceMessage & {
    query: Keyscript.Request
  }

  export type FileMaintenanceMessageHandler = {
    afterrender?: (fmMessage: FileMaintenanceMessage) => void
    fieldchange?: (fmMessage: FileMaintenanceFieldChangeMessage) => void
    fieldblur?: (fmMessage: FileMaintenanceFieldChangeMessage) => void
    beforepost?: (fmMessage: FileMaintenancePostMessage) => void
    afterpost?: (fmMessage: FileMaintenancePostMessage) => void
    close?: (fmMessage: FileMaintenanceMessage) => void
  }

  export type FormField = {
    fieldName: string
    contents: string
    dataType?: Exclude<Keyscript.DataType['option'], 'N' | 'E' | 'L' | 'B' | 'O'>
  }

  export type FormPrompt = {
    fieldNameSuffix: string // The prompt name (do not include the 'PROMPT__' prefix).
    crContents: string      // The value you want to default for the prompt.
  } & Ext.form.ITextField

  export type FormOptions = {
    crFormTypeSerial: Keystone.Serial // The Form Type serial value of the Form to run.
    crFormTypeRowDescription: string
    crPrimaryTable: 'APP' | 'ACCOUNT'
    crPrimaryRecordSerial: Keystone.Serial //  The Application or Account serial to use for storing the Form.
    crPrimaryRecordRowDescription?: string //  The Application or Account row description.
    crDisputeSerial?: Keystone.Serial // The Dispute serial
    crSkipPrompts?: boolean // Flag to indicate that prompts should not be used.
    crSkipRecordSelection?: boolean // Flag to indicate that no database data is needed on the form.
    crRecordSelection?: Record<Keyscript.TableName, Keystone.Serial[]>
    crCustomValues?: FormField[]
    cPromptsConfig?: FormPrompt[]
  }

  export class Script {
    static scriptDescription: string
    static runForm(options: FormOptions): void
    static closeScript(): void
    static includeJSCSS(options: { url: string, callbackFunction: (args: any) => void }): void
    static messageKeyStone(message: KeystoneMessage): void
    static keyStoneMessageHandler?: (message: KeystoneWorkflowStepMessage) => void
    /**
     * Set popup position and/or size for scripts running as a popup. If the script
     * is not running as a popup the call is ignored.
     * If a property is ommited, that dimension is not changed. Use the center
     * property to center the popup window on the screen. Dimensions are adjusted
     * automatically to prevent the popup for being too big or moving outside the
     * available space.
     */
    static setBounds(bounds: { center?: boolean, x?: number, y?: number, width?: number; height?: number }): void
    
    //showWorkTask(args);
    //showWorkArea(args);
    //showFMPopup(args)

    static workflowMessageHandler: WorkflowMessageHandler
    /**
     * Set or modify the Workflow transaction from a validation script when
     * responding to a 'beforepost' event.
     * @param {Object} args The arguments object
     * @args {Object} query Required. The query object to post. This is the
     * JavaScript object representation to the Query Language XML that will be
     * posted to perform the Workflow transaction. The validation script can
     * modify the existing steps, add additional steps, etc. The beforepost handler
     * receives a copy of the query object in the workflowMessage.query variable. The
     * script can copy or modify this query object and pass it to this function.
     */
    static workflowPost(args: { query: Keyscript.Request }): void
    static workflowAfterPost(): void

    static accountSerial?: string

    static personSerial?: string             // For Transaction Scripts this is the current Person Serial number
    static scriptDefaultPanelId?: string     // The component Id for the Panel that initiated the Script
    static scriptCallbackArgs?: string       // Any optional callback arguments passed from another script
    static workTaskSerial?: string           // For Workflow Scripts this is the current Work Task Serial number
    static applicationSerial?: string        // For Workflow Scripts this is the current Application Serial number
    static workflowSerial?: string           // For Workflow Scripts this is the current Workflow Serial number
    static formTypeSerial?: string           // For Form Scripting passed as the Form Type Serial number
    static interactionSerial?: string        // 
    static formPrimaryTableName?: string     // For Form Scripting passed as the primary table ACCOUNT or APP
    static formPrimaryTargetSerial?: string  // For Form Scripting passed as the ACCOUNT or APP Serial number
    static formRecordSelections?: string     // For Form Scripting passed as the user-selected subrecords
    //static formPacketInfo?: string         // Information about Form Packets related to an Application
    static disputeSerial?: string            // For Form Scripting passed as the Dispute Serial number
    static fmMessageHandler: FileMaintenanceMessageHandler
    
    /**
    * Update a File Maintenance screen field when running from a validation script.
    * Can change the field contents, set an error message, hide or disable, etc.
    * @param {Object} args The arguments object
    * @args {String} columnName Required. The name of the field column to update.
    * @args {String} contents Optional. The new contents to set on the field.
    * @args {String} rowDescription Optional. The row description for Serial fields.
    * @args {String} error Optional. Error message to display under the field.
    * @args {Boolean} disabled Optional. Flag to enable or disable the field.
    * @args {Boolean} hidden Optional. Flag to hide or show the field.
    * @args {String} placeholder Optional. Hint to display on the field when empty.
    * @args {Boolean} required Optional. Flag to mark field required or not required. 
    */
    static fmSetField(args: {
      columnName: string
      contents?: string
      rowDescription?: string
      error?: string | string[]
      disabled?: boolean
      hidden?: boolean
      placeholder?: string
      required?: boolean
    }): void
    
    /**
    * Show an error popup when running from a validation script.
    * @param {Object} args The arguments object
    * @args {String} error Required. The error to show as a popup. Optionally this
    * can be an array of strings to show multiple errors in the popup window.
    * @args {String} title Optional. Title for the popup window.
    * @args {String} focusField. Optional. Set the keyboard focus to a field by
    * column name. If set the specified field will be focused after the user
    * dismisses the error popup.
    */
    static fmPopupError(args: {
      error: string | string[]
      title?: string
      focusField?: string
    }): void
    
    /**
    * Set or modify the File Maintenance transaction from a validation script when
    * responding to a 'beforepost' event.
    * @param {Object} args The arguments object
    * @args {Object} query Required. The query object to post. This is the
    * JavaScript object representation to the Query Language XML that will be
    * posted to perform the File Maintenance transaction. The validation script can
    * modify the record step, add additional steps, etc. The beforepost handler
    * receives a copy of the query object in the fmMessage.query variable. The
    * script can copy or modify this query object and pass it to this function.
    */
    static fmPost(args: { query: Keyscript.Request }): void
    
    /**
    * Hide or disable a group of fields when running from a validation script.
    * This function applies to File Maintenance field groups known as 'View Groups'
    * usually shown in the UI as sub sections on the File Maintenance screen.
    * For example for a Vehicle Collateral they are: 'Identification', 'Vehicle',
    * 'Title' and 'General'. They will be different for each table.
    * @param {Object} args The arguments object
    * @args {String} viewGroup Required. The name of view group to update.
    * @args {Boolean} disabled Optional. Flag to enable or disable the group.
    * @args {Boolean} hidden Optional. Flag to hide or show the group.
    */
    static fmSetViewGroup(args: {
      viewGroup: string
      disabled?: boolean
      hidden?: boolean
    }): void
    
    /**
    * Send the FM response to modify the File Maintenance screen. This function
    * can be used to send multiple updates to the File Maintenance screen in one
    * single message. For example one fmMessage could set multiple field values at
    * once while at the same time setting any of the other options. You could use
    * this function to combine multiple {@link CR.Script.fmSetField},
    * {@link CR.Script.fmSetViewGroup} and {@link CR.Script.fmPopupError} function
    * calls into one message.
    * @param {Object} fmMessage The response object
    * @fmMessage {Object} fields Optional. A map to update multiple fields in the
    * File Maintenance panel. The keys for the map are the column names and the
    * values are either the new contents as a string or an object with optional
    * contents, error, hidden or disabled properties. For more information about
    * the available options see {@link CR.Script.fmSetField}.
    * @fmMessage {String} error Optional. An error to show as a popup. Optionally
    * this can be an array of strings to show multiple errors in the popup window.
    * See {@link CR.Script.fmPopupError} for more options.
    * @fmMessage {String} focusField. Optional. Set the keyboard focus to a field
    * by column name.
    * @fmMessage {Object} viewGroups Optional. A map to update multiple viewGroups
    * in the File Maintenance panel. The keys for the map are the viewGroup names
    * and the values are an object with optional hidden or disabled properties.
    * For more information about the options see {@link CR.Script.fmSetViewGroup}.
    */
    static sendFMResponse(fmMessage: {
      fields?: Record<string, string | { 
        contents?: string
        error?: string
        hidden?: boolean
        disabled?: boolean
      }>
      error?: string | string[]
      focusField?: string
      viewGroups?: Record<string, {
        hidden?: boolean
        disabled?: boolean
      }>
    }): void
  
    /**
     * Displays an image to the signature pad
     * @param {Object} args The config object
     * @args {String} image The image URL, base64 image data or canvas.
     * @args {boolean} clear Optional flag to clear the signature pad LCD before
     * displaying the image. The default is true.
     * @args {boolean} center Optional flag to center the image.
     * @args {int} x Optional x axis location for the image. The default is 0.
     * @args {int} y Optional y axis location for the image. The default is 0.
     */
    static sigPadDisplay(args: {
      image: string | HTMLCanvasElement
      clear?: boolean
      center?: boolean
      x?: number
      y?: number
    }): void
  
    /**
     * Show or hide the script panel or window.
     * @param {boolean} visible Flag to show or hide the script panel or window.
     */
    static setVisible(visible: boolean): void

    /**
     * Convenience function to ask the main KeyStone user interface to refresh its 
     * visible components. This is useful when you want the main UI to reflect a 
     * change that was done on your script, for example after doing File Maintenance 
     * transactions that would need to reflect a change on the screen outside your 
     * script in the main KeyStone user interface.
     */
    static refreshComponents(): void

    /**
     * Convenience function to ask the main KeyStone user interface to refresh its 
     * visible components. Identical to refreshComponents().
     */
    static refreshWorkflow(): void

    /**
     * Convenience function to ask the current Application Workflow to continue
     * to the next Workflow step. This is used for Workflow scripts.
     */
    static updateApplicationContinue(): void

    /**
    * Get additional core parameters from the main KeyStone user interface.
    * Currently this is used for scripts that run after posting a Teller
    * Transaction. The script can ask for the JSON object that contains the Query
    * Server response for the posted transaction.
    * @param {Object} args Configuration arguments.
    * @args {Function} callbackFunction Function to be called with the core parameters.
    */
    static getCoreParams(args: {
      callbackFunction: (coreParams: any) => void
    }): void
    
    /**
     * Run another script from your current script. This function allows the 
     * developer to initiate a new script to run. Different options can be specified 
     * to determine how the new script will run.
     * @param {Object} args Configuration arguments to run the script.
     * @args {String} scriptSerial The serial value of the script to run. 
     * @args {String} scriptDescription The script record description. You can use
     * this instead of specifying the scriptSerial. Note that this will cause the 
     * core to do a search by description to find the scriptSerial. 
     * @args {Object} scriptArgs Used to pass additional arguments to the script. 
     * Any valid JSON object is valid and will be available to the script in the 
     * CR.Script.scriptCallbackArgs variable.
     * @args {String} scriptTitle  The new window or panel title for the script.
     * @args {boolean} scriptRunInNewPanel Flag used to open the script in a new 
     * panel or window and leave the current script running. If not set or set to 
     * false, the current script view will be replaced with the new script. 
     * @args {String} scriptDisplayLocation The location of the script to run
     * if it will run in an new panel @scriptRunInNewPanel. Valid values are
     * P=Pop-up, D=Default panel, W=New window.  
     */
    static runScript(args: {
      scriptSerial?: Keystone.Serial
      scriptDescription?: string
      scriptArgs?: object
      scriptTitle?: string
      scriptRunInNewPanel?: boolean
      scriptDisplayLocation?: 'P' | 'D' | 'W'
    }): void
    
    /**
     * Opens a File Maintenance panel for a inserting or updating a record
     * @param {Object} args The config object
     * @args {String} tableName The table name to insert or update. 
     * @args {String} operation Set it to 'insert' or 'update'. The default is 
     * 'insert'. For 'update' to take effect the targetSerial parameter must be set.
     * @args {String} targetSerial The record serial required for 'update' operations.
     * @args {String} parentSerial For 'insert operations this is the serial of the
     * parent table if required by the tableName used. For example if inserting a
     * new 'SHARE' record, the parentSerial would be the parent Account serial.
     * @args {String} columnName Optional column name of the field that will have 
     * the keyboard focus. Useful in 'update' operations where you want to guide the 
     * user to a specific field.
     * @args {Array} defaultValues Optional, an array of objects where each object 
     * can specify the default value for a field by setting columnName and contents.
     * 
     * Alternatively you can hide a field if you don't want the user to see it.
     * 
     * You must be careful when disabling or hiding fields since that could prevent
     * the transaction from posting if the field generated an error. Especially
     * avoid the error of disabling or hiding a field that is required without
     * setting a default value.
     * @args {String} fmScriptSerial Optional used to set (or override) the FM
     * validation script. Use an empty string ('') to disable any validation script
     * if configured in the Table Dictionary.
     * @args {Function} callbackFunction Optional function to be called after the
     * user inserts or updates the record. The function will receive the following
     * object as a parameter if the transaction posted.
     *  {
     *    serial: '243398',
     *    rowDescription: '0000210209 S 0022 Primary Savings'
     *  }
     * If the user closes the window then the function will receive the following
     * object to indicate that the user canceled.
     *  {
     *    canceled: true
     *  }
     */
    static showFMPopup(args: {
      tableName: string
      operation?: 'insert' | 'update'
      targetSerial?: string
      parentSerial?: string
      columnName?: string
      defaultValues?: Array<{
        columnName: string
        contents: string
        rowDescription?: string
        disabled?: boolean
        hidden?: boolean
      }>
      fmScriptSerial?: string
      callbackFunction?: (result: {
        serial?: string
        rowDescription?: string
        canceled?: boolean
      }) => void
    }): void
    
    /**
     * Allows the script to command the main UI to display a target workflow
     * by serial with the option to specify a step serial and a person serial * 
     * @param {Object} args
     * @args {String} workTaskSerial The target work task to open.
     * @args {String} workTaskStepDescription (optional) The specific step to open
     *    by description. If the description is not found then no step will be 
     *    opened. If neither the serial nor the description is passed the first step
     *    in the workflow will be opened.
     * @args {String} workTaskStepSerial (optional) The specific step to open by
     *    serial. If the serial is incorrect then no step will be opened. If neither
     *    the serial nor the description is passed the first step in the workflow 
     *    will be opened.
     * @args {String} personSerial (optional) Specifies a person to look up work
     *    tasks for. This is useful if an application has multiple applicants and 
     *    the user wants to show a specific applicant. If this argument is omitted,
     *    the first applicant will be opened.
     * @args {Boolean} reuseWorkArea flag to reuse or open a new Transaction
     *    work area.
     */
    static showWorkTask(args: {
      workTaskSerial: string
      workTaskStepDescription?: string
      workTaskStepSerial?: string
      personSerial?: string
      reuseWorkArea?: boolean
    }): void
    
    /**
     * Opens a Work Area on the main KeyStone UI
     * @param {Object} args The config object
     * @args {String} workArea The name of the work area as it appears in the main
     * KeyStone UI Menu. For sub menus you need to specify the full menu path, for
     * example 'Task Manager/Queues' or 'Options/Configuration'
     * @args {Object} parameters Optional open parameters for the specified work
     * area. These are different depending on the work area.
     * For the 'Transaction' work area you can specify the following to open the
     * work area on a specific member profile:
     *     personSerial: to open the specified person
     *     accountSerial: to open the specified account
     *     accountNumber: to start a search by account number
     *     phoneNumber: to start a search by phone number
     *     reuseWorkArea: flag to reuse or open a new Transaction work area
     * For the 'File Maintenance' work area you can open a specific record by
     * specifying the following:
     *     tableName: the name of the table to open
     *     targetSerial: the record target serial to open
     */
    static showWorkArea(args: {
      workArea: string
      parameters?: {
        personSerial?: string
        accountSerial?: string
        accountNumber?: string
        phoneNumber?: string
        reuseWorkArea?: boolean
        tableName?: string
        targetSerial?: string
      }
    }): void
    
    /**
     * Submits Form(s) to DocuSign
     * @param {Object} args The config object
     * @args {Array} formSerials The serials of the forms to be sent to DocuSign
     * @args {Object} container The container in which messages / prompts will be displayed
     * @args {Function} callbackFunction The function that will be called after completion
     * @args {Object} callbackScope The scope for the callback function
     * @args {Object} callbackArgs The args for the callback function
     */
    static submitFormToDocuSign(args: {
      formSerials: string[]
      container?: any
      callbackFunction?: Function
      callbackScope?: any
      callbackArgs?: any
    }): void
    
    /**
     * Gets the status of a form from DocuSign
     * @param {Object} args The config object
     * @args {Array} formSerial The serial of the form to get the status of from DocuSign
     * @args {Object} container The container in which messages / prompts will be displayed
     * @args {Function} callbackFunction The function that will be called after completion
     * @args {Object} callbackScope The scope for the callback function
     * @args {Object} callbackArgs The args for the callback function
     */
    static getStatusDocuSign(args: {
      formSerial: string
      container?: any
      callbackFunction?: Function
      callbackScope?: any
      callbackArgs?: any
    }): void
  }
  export class Core {
    static keyStoneWebAppURL: string
    static recordSearch(spec: {
      search: {
        tableName: string;
        filterName: string;
        includeSelectColumns: { option: 'Y' | 'N' };
        includeTotalHitCount: { option: 'Y' | 'N' };
        returnLimit: string
        parameter?: { columnName: string; contents: string }
      }
      callbackFunction: (result: { searchResults: Keyscript.SearchResponse } & { errorArray?: string[], tranResult: string, records: Record<string, string>[] }) => void;
      failure: (error: any) => void
    }): void
    static viewPort: Ext.Viewport
    static displayExceptions(arg0: { items: any[] }): void
    static getPostingDate(arg0: { callbackFunction: (result: { postingDate: string }) => void }): void
    static ajaxRequest(request: KeybridgeQuery): void
    static addComponentAndShow(container: Ext.Container | Ext.IContainer, component: Ext.Component | Ext.IComponent): void
    static jsLiteral(text: string): string
    static htmlText(text: string): string
    static stringToIntCents(str: string): number
    static intCentsToString(intCents: number): string
    static addMoneyValues(str1: string, str2: string): string
    static subtractMoneyValues(str1: string, str2: string): string
    static getRowDescription(args: {
      tableName: string
      targetSerial: string
      callbackFunction: (result: { rowDescription: string }) => void
      callbackScope?: any
      callbackArgs?: any
    }): void
    static defer(fn: Function, scope: any, argArray?: any[], milliseconds?: number): void
    static safeGet(object: any, path: string | string[], defaultValue?: any): any
    static addToContainerAndShow(container: Ext.Container, component: Ext.Component): void
  }
  export class XML {
    getRootElement(): XML_Container
    addCount(search: XML_Container, name: string, value: string): void
    getXMLDocument(): XMLDocument
    addOption(container: XML_Container, arg1: string, op: string): void
    addText(container: XML_Container, name: string, value: string | number): void
    setAttribute(container: XML_Container, arg1: string, label: string): void
    addContainer(container: XML_Container, name: string): XML_Container
  }
  export class Login {
    static performLogoff(): void
    static performLogin(): void
    static mainPageLogin(fn?: () => void): void
    static refreshSessionID(args: { callbackFunction?: () => void, callbackScope?: object, callbackArgs?: Record<string, unknown> }): void
    static deviceName?: string     // The current User Device Name	
    static deviceSerial?: string   // The current User Device Serial number	
    static locationName?: string   // The current User Location name	
    static postingDate?: string    // The current System Posting date	
    static sessionID?: string      // The current User Session ID	
    static userName?: string       // The current User name	
    static userSerial?: string     // The current User Serial number	
    static branchName?: string     // The current User Branch name	
    static branchSerial?: string   // The current User Branch Serial number	
  }
  export class JSON {
    static parse(text: string): Record<string, unknown>
  }

  export class Panel extends Ext.Panel { }
  export class FormPanel extends Ext.form.FormPanel { }

  export type CrFieldConfig = {
    xtype?: "crTextField" | "crDateField" | "crSerialField" | "crMoneyField" | "crOptionField"
    crColumnName?: string
    crColumnDescription?: string
    crContents?: string
    crNullAllowed?: boolean
    crEnterKeyHandler?: () => void
    listeners?: {
      valid?: (sender: Ext.form.Field & { crContents: string }) => void
    }
  }

  export class OptionField extends Ext.form.ComboBox {
    constructor(config: Ext.form.IComboBox & CrFieldConfig & {
      crOptions?: Array<[string, string]>
      crMonthPrompt?: boolean
      crMonthPromptAllowBlank?: boolean
      crOnContentsChange?: () => void
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crGetOptionDescription(option: string): string
    crSetComtents(option: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crGetNewDisplayContents(): string
    crIsDestroyed(): boolean
    crIsModified(): boolean
    crCollapse(): void
    crExpandList(): void
    crShow(): void
    crHide(): void
    crAddOptions(newOptions: Array<[string, string]>): void
    crReplaceOptions(newOptions: Array<[string, string]>): void
    crClearAllOptions(): void
  }

  export class SerialField extends Ext.form.TriggerField {
    constructor(cfg?: Ext.form.ITriggerField & CrFieldConfig & {
      crTableName: string
      crRowDescription?: string
      crRefTableName?: string
      crRefColumnName?: string
      crRefParentSerial?: string
      crSearchFilterName?: string
      crSearchParameters?: Array<{ columnName: string, contents: string }>
      crOnContentsChange?: () => void
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetSerial(targetSerial: string, targetRowDescription: string): void
    crGetTableName(): string
    crSetTableName(tableName: string): void
    crGetNewRowDescription(): string
    crGetOldRowDescription(): string
    crGetNewContents(): string //????
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crIsModified(): boolean
    crCollapse(): void
    crExpand(): void
    crShow(): void
    crHide(): void
  }

  export class MoneyField extends Ext.form.TextField {
    constructor(cfg?: Ext.form.ITextField & CrFieldConfig & {
      crNegativeAllowed?: boolean
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    convertToDisplay(oldText: string, allowNegative?: boolean): string
    convertFromDisplay(text: string): string
  }

  export class DateField extends Ext.form.DateField {
    constructor(cfg?: Ext.form.IDateField & CrFieldConfig & {
      crFutureAllowed?: boolean
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    convertToJavaScript(dateText: string): Date
    convertFromJavaScript(date: Date): string
    convertToDisplay(date: string | Date): string
    convertFromDisplay(date: string | Date): string
  }

  export class TextField extends Ext.form.TextField {
    constructor(cfg?: Ext.form.ITextField & CrFieldConfig & {
      crTextNumericOnly?: boolean
      crTextBlankAllowed?: boolean
      crMaximumLength?: number
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
  }

  export class ToolbarButton implements Ext.IBoxComponent {
    disable(): void
    enable(): void
    constructor(config: {
      text: string
      disabled?: boolean
      handler?: () => void | Promise<void>
    })
    anchor?: string
    autoHeight?: boolean
    autoScroll?: boolean
    autoWidth?: boolean
    boxMaxHeight?: number
    boxMaxWidth?: number
    boxMinHeight?: number
    boxMinWidth?: number
    flex?: number
    height?: number | string
    margins?: Ext.Margins | string
    pageX?: number
    pageY?: number
    region?: string
    tabTip?: string
    width?: number | string
    x?: number
    y?: number
  }

  export class TextAreaField extends Ext.form.TextArea {
    constructor(cfg?: Ext.form.ITextArea & CrFieldConfig & {
      crTextNumericOnly?: boolean
      crTextBlankAllowed?: boolean
      crTextNewLineAllowed?: boolean
      crMaximumLength?: number
      crSuppressTooltip?: boolean
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
  }
  
  export class RateField extends Ext.form.TextField {
    constructor(cfg?: Ext.form.ITextField & CrFieldConfig & {
      crNegativeAllowed?: boolean
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
  }
  
  export class CountField extends Ext.form.NumberField {
    constructor(cfg?: Ext.form.NumberField & CrFieldConfig & {
      crNegativeAllowed?: boolean
      crMaximumAbsoluteValue?: number
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
  }
  
  export class TimeField extends Ext.form.TriggerField {
    constructor(cfg?: Ext.form.ITriggerField & CrFieldConfig & {
      crAfterTimeUpdateFunction?: Function
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
  }
  
  export class DocumentField extends TextAreaField {
    // Same as TextAreaField but with crTextNewLineAllowed default to true
  }
  
  export class Checkbox extends Ext.form.Checkbox {
    constructor(cfg?: Ext.form.ICheckbox & CrFieldConfig & {
      crCheckedValue?: string
      crCheckedValueText?: string
      crUncheckedValue?: string
      crUncheckedValueText?: string
    })
    crGetColumnName(): string
    crGetColumnDescription(): string
    crGetDataType(): string
    crSetContents(text: string): void
    crGetNewContents(): string
    crGetOldContents(): string
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
  }
  
  export class Button extends Ext.Button {
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    crClose(): void
  }
  
  export class Window extends Ext.Window {
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    crClose(): void
  }
  
  export class FieldSet extends Ext.form.FieldSet {
    constructor(cfg?: Ext.form.FieldSet & {
      crViewGroup?: string
    })
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    crClose(): void
    crGetViewGroup(): string
    crFocusFirstField(): void
  }
  
  export class TabPanel extends Ext.TabPanel {
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    crClose(): void
  }
  
  export class Tooltip extends Ext.ToolTip {
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    crClose(): void
  }
  
  export class BinaryField extends Panel {
    constructor(cfg?: Ext.IPanel & CrFieldConfig & {
      crTextNumericOnly?: boolean
      crTextBlankAllowed?: boolean
      crMaximumLength?: number
    })
    crIsDestroyed(): boolean
    crShow(): void
    crHide(): void
    crClose(): void
    crFocusFirstField(): void
  }
}