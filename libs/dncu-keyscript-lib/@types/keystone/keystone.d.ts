declare namespace Keystone {

  type ZeroToNine = '0' | OneToNine
  type OneToNine = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  type YYYY = `19${ZeroToNine}${ZeroToNine}` | `20${ZeroToNine}${ZeroToNine}`
  type MM = `0${OneToNine}` | `1${0 | 1 | 2}`
  type DD = `0${OneToNine}` | `1${ZeroToNine}` | `2${ZeroToNine}` | `3${0 | 1}`
  export type ISODate = `${YYYY}-${MM}-${DD}`

  export type NumberString = `${number}`
  export type Money = NumberString
  export type Serial = NumberString | number
  export type Rate = number
  export type Count = number
  export type Binary = string
  export type Document = string
  export type Time = string

  export type TableInfo = {
    ACCESS_LOG: {
      SERIAL: Serial
      CATEGORY: { A: "Approved" } | { D: "Declined" }
      USER_SERIAL: Serial
      DEVICE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      POSTING_TIME: Time
      TABLE_NAME: string
      TARGET_SERIAL: Serial
      TARGET_ROW_DESCRIPTION: string
    }
    ACCOUNT: {
      SERIAL: Serial
      ACCESS_KEY: string
      STORED_ACCESS_KEY: string
      ROW_CHANGE_TIMESTAMP: Time
      ACCOUNT_NUMBER: string
      ACCOUNT_TITLE: string
      PRIMARY_PERSON_SERIAL: Serial
      CHECK_HOLD_LEVEL_SERIAL: Serial
      CK_HLD_NEW_ACT_EXPIRATION_DATE: Date
      CK_HLD_REP_OVR_EXPIRATION_DATE: Date
      CK_HLD_SPC_CSE_OPTION: { '-': "None" } | { D: "Do not hold" } | { H: "Case by case hold" } | { C: "Reasonable cause to doubt collectibility" }
      CK_HLD_SPC_CSE_REASON: string
      CK_HLD_SPC_CSE_EXPIRATION_DATE: Date
      TAXABLE_DIVIDEND_YTD: Money
      TAXABLE_DIVIDEND_LAST_YEAR: Money
      TAX_DEFER_DIVIDEND_YTD: Money
      TAX_DEFER_DIVIDEND_LAST_YEAR: Money
      INTEREST_CHARGED_YTD: Money
      INTEREST_CHARGED_LAST_YEAR: Money
      INTEREST_YTD: Money
      INTEREST_LAST_YEAR: Money
      SHARE_BALANCE: Money
      LOAN_BALANCE: Money
      LAST_MONETARY_DATE: Date
      LAST_ACTIVITY_DATE: Date
      OPEN_DATE: Date
      OPENED_BY_USER_SERIAL: Serial
      CLOSE_DATE: Date
      CLOSE_REASON_SERIAL: Serial
      CORRESPONDENCE_DATE: Date
      TYPE_SERIAL: Serial
      MAIL_PERSON_ADDR_LINK_SERIAL: Serial
      E_NOTICE_OPTION: { M: "Mail notice only" } | { E: "E-notice only" } | { B: "E-notice and mail notice" }
      E_STMT_OPTION: { M: "Mail statement only" } | { E: "E-statement only" } | { B: "E-statement and mail statement" }
      E_STMT_NOTIFICATION: { N: "No" } | { Y: "Yes" }
      E_STMT_PERSON_CONTACT_SERIAL: Serial
      STMT_CUTOFF_CYCLE_SERIAL: Serial
      STMT_CUTOFF_CYCLE_OPTION: { '-': "Standard" } | { L: "Include loans" }
      RELATIONSHIP_SERIAL: Serial
      RELATIONSHIP_OVR_SERIAL: Serial
      RELATIONSHIP_OVR_EFF_DATE: Date
      RELATIONSHIP_OVR_EXP_DATE: Date
      ELIGIBILITY_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { H: "No deposit holds" } | { D: "Access denied" }
      BILL_PAYMENT_OPTION: { S: "Standard" } | { D: "Disabled" }
      ACCESS_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" } | { E: "Employee" } | { F: "Employee related" }
      NOTE_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      DELINQUENCY_RESTRICTION: { U: "Unrestricted" } | { D: "Delinquent" }
      DELINQUENCY_R_EXEMPT_EXP_DATE: Date
      NEW_ACT_ALERT_EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    ACCOUNT_CLOSE_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    ACCOUNT_DFLT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEFAULTS_NAME: string
      DEFAULTS_STATUS: { O: "Open" } | { C: "Closed" }
      CHECK_HOLD_LEVEL_SERIAL: Serial
      TYPE_SERIAL: Serial
      E_NOTICE_OPTION: { M: "Mail notice only" } | { E: "E-notice only" } | { B: "E-notice and mail notice" }
      E_STMT_OPTION: { M: "Mail statement only" } | { E: "E-statement only" } | { B: "E-statement and mail statement" }
      E_STMT_NOTIFICATION: { N: "No" } | { Y: "Yes" }
      STMT_CUTOFF_CYCLE_SERIAL: Serial
      STMT_CUTOFF_CYCLE_OPTION: { '-': "Standard" } | { L: "Include loans" }
      RELATIONSHIP_SERIAL: Serial
      RELATIONSHIP_OVR_SERIAL: Serial
      RELATIONSHIP_OVR_EFF_DATE: Date
      RELATIONSHIP_OVR_EXP_DATE: Date
      ELIGIBILITY_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { H: "No deposit holds" } | { D: "Access denied" }
      BILL_PAYMENT_OPTION: { S: "Standard" } | { D: "Disabled" }
      ACCESS_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" } | { E: "Employee" } | { F: "Employee related" }
      LAST_FM_DATE: Date
    }
    ACCOUNT_ELIGIBILITY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    ACCOUNT_FEE_COUNT_MTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      YEAR: Count
      MONTH: Count
      COUNT: Count
      LAST_FM_DATE: Date
    }
    AC_INDX: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      VALUE: string
      LAST_FM_DATE: Date
    }
    AC_INDX_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      ACCOUNT_REFERENCE_OPTION: { N: "No" } | { Y: "Yes" }
      SHARE_REFERENCE_OPTION: { N: "No" } | { Y: "Yes" }
      LOAN_REFERENCE_OPTION: { N: "No" } | { Y: "Yes" }
      UNIQUE_OPTION: { N: "No" } | { Y: "Yes" }
      NUMERIC_ONLY: { N: "No" } | { Y: "Yes" }
      UPPERCASE_ONLY: { N: "No" } | { Y: "Yes" }
      MINIMUM_LENGTH: Count
      MAXIMUM_LENGTH: Count
      LAST_FM_DATE: Date
    }
    AC_LIMIT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { s: "Shared branch withdrawal" } | { p: "Person to person withdrawal" } | { o: "ACH origination" }
      TYPE_LIMIT_OVERRIDE: { '-': "None" } | { L: "Override limiting" } | { B: "Override limiting and aggregating" }
      TYPE_LMT_OVR_EXPIRATION_DATE: Date
      LIMIT_AMOUNT: Money
      LIMIT_COUNT: Count
      MAXIMUM_AMOUNT: Money
      AGGREGATE_OPTION: { N: "None" } | { Y: "Primary Person" }
      AGGREGATE_PERIOD_DAYS: Count
      USAGE_DATE: Date
      USAGE_AMOUNT: Money
      USAGE_COUNT: Count
      LAST_FM_DATE: Date
    }
    AC_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    AC_PERSON_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PERSON_SERIAL: Serial
      PERSON_ADDRESS_LINK_SERIAL: Serial
      CATEGORY: { PA: "Power of attorney" } | { TR: "Trustee" } | { CU: "Custodian" } | { GD: "Guardian" } | { CV: "Conservator" } | { RP: "Representative payee" } | { VF: "VA fiduciary" } | { AD: "Administrator" } | { EX: "Executor" } | { ST: "Successor trustee" } | { SC: "Successor custodian" } | { SR: "Settlor" } | { BE: "Beneficiary" } | { BC: "Contingent beneficiary" } | { RB: "Revocable trust beneficiary" } | { RC: "Contingent revocable trust beneficiary" } | { IB: "Irrevocable trust beneficiary" } | { IC: "Contingent irrevocable trust beneficiary" } | { BO: "Beneficial owner" } | { CP: "Control person" } | { SA: "Statement addressee" } | { AA: "Additional mailing addressee" } | { OT: "Other related party" }
      TYPE_SERIAL: Serial
      PERCENTAGE: Rate
      ADDITIONAL_STATEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      ADDITIONAL_NOTICE_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    CU_CDD_APP_QUESTIONS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CDD_MONTH_WD: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      CDD_TRANS_ASSETS: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      CDD_FREQ_TRAVEL: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      CDD_NR_ALIEN: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      LAST_FM_DATE: Date
    }
    ACCOUNT_RELATIONSHIP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LEVEL: Count
      LAST_FM_DATE: Date
    }
    ACCOUNT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { N: "Normal" } | { C: "Commercial" } | { M: "UTMA or UGMA" } | { L: "IOLTA" } | { U: "Custodial" } | { R: "Revocable trust" } | { I: "Irrevocable trust" }
      CK_HLD_NEW_ACT_EXP_DAYS: Count
      CK_HLD_REP_OVR_PRD_MONTHS: Count
      CK_HLD_REP_OVR_NSF_DAYS: Count
      CK_HLD_REP_OVR_LARGE_NSF_DAYS: Count
      CK_HLD_REP_OVR_LARGE_NSF_AMT: Money
      CK_HLD_REP_OVR_EXP_MONTHS: Count
      NEW_ACT_ALERT_EXP_DAYS: Count
      MANDATORY_SH_TYPE_SERIAL: Serial
      APP_FORM_PACKET_SERIAL: Serial
      SH_PRODUCT_RESTRICTION: { N: "No" } | { Y: "Yes" }
      LN_PRODUCT_RESTRICTION: { N: "No" } | { Y: "Yes" }
      BILL_PAYMENT_MAX_COUNT: Count
      BILL_PAYMENT_MAX_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    AC_TYPE_LIMIT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { s: "Shared branch withdrawal" } | { p: "Person to person withdrawal" } | { o: "ACH origination" }
      LIMIT_AMOUNT: Money
      LIMIT_COUNT: Count
      MAXIMUM_AMOUNT: Money
      AGGREGATE_OPTION: { N: "None" } | { Y: "Primary Person" }
      AGGREGATE_PERIOD_DAYS: Count
      LAST_FM_DATE: Date
    }
    AC_TYPE_LIMIT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      RELATIONSHIP_SERIAL: Serial
      LIMIT_AMOUNT: Money
      LIMIT_COUNT: Count
      MAXIMUM_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    AC_TYPE_PRODUCT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { ST: "Savings Type" } | { LT: "Loan Type" }
      SH_TYPE_SERIAL: Serial
      LN_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    ACH_ADDENDA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDERING_SEQUENCE: Count
      ADDENDA_TYPE_CODE: string
      PAYMENT_RELATED_INFORMATION: string
      TRANSACTION_DESCRIPTION: string
      NETWORK_IDENTIFICATION_CODE: string
      TERMINAL_IDENTIFICATION_CODE: string
      TRANSACTION_SERIAL_NUMBER: string
      TRANSACTION_DATE_TEXT: string
      TRANSACTION_TIME_TEXT: string
      AUTH_CODE_CARD_EXPIRATION: string
      TERMINAL_LOCATION: string
      TERMINAL_CITY: string
      TERMINAL_STATE: string
      IAT_TRANSACTION_TYPE_CODE: string
      IAT_FOREIGN_PAYMENT_AMOUNT: string
      IAT_FOREIGN_TRACE_NUMBER: string
      IAT_NAME: string
      IAT_ADDRESS_1: string
      IAT_ADDRESS_2: string
      IAT_DFI_ID_QUALIFIER: string
      IAT_DFI_ID: string
      IAT_DFI_BRANCH_COUNTRY: string
      IAT_IDENTIFICATION_NUMBER: string
      RTN_REASON_CODE: string
      RTN_ORIG_ENTRY_TRACE_NUMBER: string
      RTN_DEATH_DATE_TEXT: string
      RTN_ORIG_RCV_DFI_ID: string
      RTN_ADDENDA_INFORMATION: string
      RTN_ORIG_FWD_PAYMENT_AMOUNT: string
      DHR_RTN_TRACE_NUMBER: string
      DHR_RTN_SETTLEMENT_DATE: Date
      DHR_RTN_SETTLEMENT_DATE_TEXT: string
      DHR_RTN_REASON_CODE: string
      CDR_ORIG_RETURN_DATE_TEXT: string
      CDR_ORIG_SETTLEMENT_DATE: Date
      CDR_ORIG_SETTLEMENT_DATE_TEXT: string
      CDR_DHR_TRACE_NUMBER: string
      CDR_DHR_SETTLEMENT_DATE: Date
      CDR_DHR_SETTLEMENT_DATE_TEXT: string
      CDR_DHR_REASON_CODE: string
      ADDENDA_SEQUENCE_NUMBER: string
      TRACE_NUMBER: string
      DATA_RECORD: string
      LAST_FM_DATE: Date
    }
    ACH_BATCH: {
      SERIAL: Serial
      ACCESS_KEY: string
      ACH_FILE_SERIAL: Serial
      ORDERING_SEQUENCE: Count
      SERVICE_CLASS_CODE: string
      COMPANY_NAME: string
      COMPANY_DISCRETIONARY_DATA: string
      COMPANY_ID: string
      STANDARD_ENTRY_CLASS_CODE: string
      COMPANY_ENTRY_DESCRIPTION: string
      COMPANY_DESCRIPTIVE_DATE_TEXT: string
      EFFECTIVE_ENTRY_DATE_TEXT: string
      SETTLEMENT_DATE: Date
      SETTLEMENT_DATE_TEXT: string
      ORIGINATOR_STATUS_CODE: string
      ORIGINATING_DFI_ID: string
      BATCH_NUMBER: string
      IAT_FRGN_EXCH_INDICATOR: string
      IAT_FRGN_EXCH_REFERENCE_IND: string
      IAT_FRGN_EXCH_REFERENCE: string
      IAT_ISO_DEST_COUNTRY_CODE: string
      IAT_ISO_ORIG_CURRENCY_CODE: string
      IAT_ISO_DEST_CURRENCY_CODE: string
      ENTRY_ADDENDA_COUNT: Count
      ENTRY_HASH: string
      TOTAL_DEBIT_ENTRY_AMOUNT: Money
      TOTAL_CREDIT_ENTRY_AMOUNT: Money
      MESSAGE_AUTHENTICATION_CODE: string
      HEADER_DATA_RECORD: string
      CONTROL_DATA_RECORD: string
      LAST_FM_DATE: Date
    }
    ACH_ENTRY: {
      SERIAL: Serial
      ACCESS_KEY: string
      ACH_BATCH_SERIAL: Serial
      ORDERING_SEQUENCE: Count
      TRANSACTION_CODE: string
      RECEIVING_DFI_ID: string
      CHECK_DIGIT: string
      DFI_ACCOUNT_NUMBER: string
      AMOUNT: Money
      IDENTIFICATION_NUMBER: string
      NAME: string
      DISCRETIONARY_DATA: string
      ADDENDA_RECORD_INDICATOR: string
      TRACE_NUMBER: string
      NUMBER_OF_ADDENDA_RECORDS: string
      CHECK_SERIAL_NUMBER: string
      TERMINAL_CITY: string
      TERMINAL_STATE: string
      CARD_EXPIRATION_DATE_TEXT: string
      CARD_TRANSACTION_TYPE_CODE: string
      PAYMENT_TYPE_CODE: string
      DOCUMENT_REFERENCE_NUMBER: string
      PROCESS_CONTROL_FIELD: string
      ITEM_RESEARCH_NUMBER: string
      ITEM_TYPE_INDICATOR: string
      IAT_GATEWAY_OFAC_SCREEN_IND: string
      IAT_SECONDARY_OFAC_SCREEN_IND: string
      DATA_RECORD: string
      LAST_FM_DATE: Date
    }
    ACH_FILE: {
      SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { I: "Incoming" } | { O: "Outgoing" }
      STATUS: { C: "Build completed" } | { I: "Build in progress" } | { F: "Build failed" }
      IMPORT_SET_SERIAL: Serial
      EXPORT_SET_SERIAL: Serial
      PRIORITY_CODE: string
      IMMEDIATE_DESTINATION: string
      IMMEDIATE_ORIGIN: string
      FILE_CREATION_DATE: Date
      FILE_CREATION_DATE_TEXT: string
      FILE_CREATION_TIME_TEXT: string
      FILE_ID_MODIFIER: string
      IMMEDIATE_DESTINATION_NAME: string
      IMMEDIATE_ORIGIN_NAME: string
      REFERENCE_CODE: string
      BATCH_COUNT: Count
      BLOCK_COUNT: Count
      ENTRY_ADDENDA_COUNT: Count
      ENTRY_HASH: string
      TOTAL_DEBIT_ENTRY_AMOUNT: Money
      TOTAL_CREDIT_ENTRY_AMOUNT: Money
      HEADER_DATA_RECORD: string
      CONTROL_DATA_RECORD: string
      LAST_FM_DATE: Date
    }
    ACH_LOOKUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      COMPANY_SERIAL: Serial
      DFI_ROUTING_NUMBER: string
      DFI_ROUTING_NUMBER_DESC: string
      DFI_ACCOUNT_NUMBER: string
      IDENTIFICATION_NUMBER: string
      NAME: string
      TRANSACTION_CODE: { '-': "None" } | { C: "Credits" } | { D: "Debits" } | { K: "Checking transactions" } | { S: "Savings transactions" } | { G: "GL transactions" } | { L: "Loan transactions" } | { '21': "'21' Checking credit return" } | { '22': "'22' Checking credit" } | { '23': "'23' Checking credit prenotification" } | { '24': "'24' Checking credit remittance data" } | { '26': "'26' Checking debit return" } | { '27': "'27' Checking debit" } | { '28': "'28' Checking debit prenotification" } | { '29': "'29' Checking debit remittance data" } | { '31': "'31' Savings credit return" } | { '32': "'32' Savings credit" } | { '33': "'33' Savings credit prenotification" } | { '34': "'34' Savings credit remittance data" } | { '36': "'36' Savings debit return" } | { '37': "'37' Savings debit" } | { '38': "'38' Savings debit prenotification" } | { '39': "'39' Savings debit remittance data" } | { '41': "'41' GL credit return" } | { '42': "'42' GL credit" } | { '43': "'43' GL credit prenotification" } | { '44': "'44' GL credit remittance data" } | { '46': "'46' GL debit return" } | { '47': "'47' GL debit" } | { '48': "'48' GL debit prenotification" } | { '49': "'49' GL debit remittance data" } | { '51': "'51' Loan credit return" } | { '52': "'52' Loan credit" } | { '53': "'53' Loan credit prenotification" } | { '54': "'54' Loan credit remittance data" } | { '55': "'55' Loan reversal" } | { '56': "'56' Loan reversal return" } | { '81': "'81' ADV Credit for ACH debits originated" } | { '82': "'82' ADV Debit for ACH credits originated" } | { '83': "'83' ADV Credit for ACH credits received" } | { '84': "'84' ADV Debit for ACH debits received" } | { '85': "'85' ADV Credit for ACH credits in rejected batches" } | { '86': "'86' ADV Debit for ACH debits in rejected batches" } | { '87': "'87' ADV Summary credit for ACH activity" } | { '88': "'88' ADV Summary debit for ACH activity" }
      REDIRECT_OPTION: { D: "Direct match" } | { R: "Redirect within account" }
      REDIRECT_MATCH_TARGET: { N: "No" } | { Y: "Yes" }
      REDIRECT_DISTRIBUTION_ONLY: { N: "No" } | { Y: "Yes" }
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      ACCOUNT_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      GL_SERIAL: Serial
      DISTRIBUTION_SERIAL: Serial
      LAST_MATCH_DATE: Date
      LAST_FM_DATE: Date
    }
    ACH_LOOKUP_COMPANY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      COMPANY_NAME: string
      COMPANY_ID: string
      COMPANY_DISCRETIONARY_DATA: string
      COMPANY_ENTRY_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    ACH_ORIGINATION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      COMPANY_SERIAL: Serial
      DFI_ROUTING_NUMBER: string
      DFI_ROUTING_NUMBER_DESC: string
      DFI_ACCOUNT_NUMBER: string
      DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      ENTRY_CLASS: { PPD: "PPD" } | { CCD: "CCD" } | { CIE: "CIE" } | { P2P: "P2P" } | { TEL: "TEL" } | { WEB: "WEB" }
      IDENTIFICATION_NUMBER: string
      NAME: string
      PAYMENT_RELATED_INFORMATION: string
      TRANSACTION_CATEGORY: { W: "Local withdrawal" } | { D: "Local deposit" } | { S: "Sweep" }
      AMOUNT: Money
      AMOUNT_OVERRIDE: { '-': "None" } | { P: "Loan payment" } | { p: "Loan payment if it exceeds amount" } | { Q: "25% of Loan payment" } | { H: "50% of Loan payment" } | { D: "Loan due amount" } | { d: "Loan due amount if it exceeds amount" } | { B: "Loan cycle balance" } | { b: "Loan cycle balance if it exceeds amount" } | { C: "Loan cycle balance less credits" } | { c: "Loan cycle balance less credits if it exceeds amount" }
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      DISTRIBUTION_SERIAL: Serial
      STATEMENT_DESCRIPTION: string
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      LAST_ATTEMPT_DATE: Date
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      EXPIRATION_DATE: Date
      SETTLEMENT_OPTION: { S: "Same day" } | { N: "Next day" }
      PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      PRENOTIFICATION_DATE: Date
      RETURN_COUNT: Count
      LAST_RETURN_DATE: Date
      LAST_FM_DATE: Date
    }
    ACH_ORIGINATION_COMPANY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      COMPANY_NAME: string
      COMPANY_ID: string
      COMPANY_DISCRETIONARY_DATA: string
      COMPANY_ENTRY_DESCRIPTION: string
      PPD_OPTION: { N: "No" } | { Y: "Yes" }
      PPD_PRENOTE_SND_OPTION: { '-': "None" } | { R: "Required" }
      PPD_PRENOTE_RTN_OPTION: { '-': "None" } | { P: "Post comment and disable" }
      CCD_OPTION: { N: "No" } | { Y: "Yes" }
      CCD_PRENOTE_SND_OPTION: { '-': "None" } | { R: "Required" }
      CCD_PRENOTE_RTN_OPTION: { '-': "None" } | { P: "Post comment and disable" }
      CIE_OPTION: { N: "No" } | { Y: "Yes" }
      CIE_PRENOTE_SND_OPTION: { '-': "None" } | { R: "Required" }
      CIE_PRENOTE_RTN_OPTION: { '-': "None" } | { P: "Post comment and disable" }
      P2P_OPTION: { N: "No" } | { Y: "Yes" }
      P2P_PRENOTE_SND_OPTION: { '-': "None" } | { R: "Required" }
      P2P_PRENOTE_RTN_OPTION: { '-': "None" } | { P: "Post comment and disable" }
      TEL_OPTION: { N: "No" } | { Y: "Yes" }
      TEL_PRENOTE_SND_OPTION: { '-': "None" } | { R: "Required" }
      TEL_PRENOTE_RTN_OPTION: { '-': "None" } | { P: "Post comment and disable" }
      WEB_OPTION: { N: "No" } | { Y: "Yes" }
      WEB_PRENOTE_SND_OPTION: { '-': "None" } | { R: "Required" }
      WEB_PRENOTE_RTN_OPTION: { '-': "None" } | { P: "Post comment and disable" }
      ITEM_GL_SERIAL: Serial
      ITEM_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    ACH_OUT_ADDENDA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ADDENDA_TYPE_CODE: { '-': "None" } | { '02': "'02' MTE or POS or SHR" } | { '05': "'05' Payment related information" } | { '10': "'10' IAT first" } | { '11': "'11' IAT second" } | { '12': "'12' IAT third" } | { '13': "'13' IAT fourth" } | { '14': "'14' IAT fifth" } | { '15': "'15' IAT sixth" } | { '16': "'16' IAT seventh" } | { '17': "'17' IAT remittance" } | { '18': "'18' IAT foreign correspondent bank" } | { '98': "'98' Notification of change" } | { '99': "'99' Return entry" }
      PAYMENT_RELATED_INFORMATION: string
      TRANSACTION_DESCRIPTION: string
      NETWORK_IDENTIFICATION_CODE: string
      TERMINAL_IDENTIFICATION_CODE: string
      TRANSACTION_SERIAL_NUMBER: string
      TRANSACTION_DATE_TEXT: string
      TRANSACTION_TIME_TEXT: string
      AUTH_CODE_CARD_EXPIRATION: string
      TERMINAL_LOCATION: string
      TERMINAL_CITY: string
      TERMINAL_STATE: string
      IAT_TRANSACTION_TYPE_CODE: { '-': "None" } | { ANN: "'ANN' Annuity" } | { BUS: "'BUS' Business or commercial" } | { DEP: "'DEP' Deposit" } | { LOA: "'LOA' Loan" } | { MIS: "'MIS' Miscellaneous" } | { MOR: "'MOR' Mortgage" } | { PEN: "'PEN' Pension" } | { RLS: "'RLS' Rent or lease" } | { SAL: "'SAL' Salary or payroll" } | { TAX: "'TAX' Tax" } | { ARC: "'ARC' Accounts receivable" } | { BOC: "'BOC' Back office conversion" } | { MTE: "'MTE' Machine transfer" } | { POP: "'POP' Point of purchase" } | { POS: "'POS' Point of sale" } | { RCK: "'RCK' Re-presented check" } | { SHR: "'SHR' Shared network transaction" } | { TEL: "'TEL' Telephone initiated" } | { WEB: "'WEB' Internet initiated" }
      IAT_FOREIGN_PAYMENT_AMOUNT: Money
      IAT_FOREIGN_TRACE_NUMBER: string
      IAT_NAME: string
      IAT_ADDRESS_1: string
      IAT_ADDRESS_2: string
      IAT_DFI_ID_QUALIFIER: { '-': "None" } | { '01': "'01' National clearing system number" } | { '02': "'02' BIC code" } | { '03': "'03' IBAN" }
      IAT_DFI_ID: string
      IAT_DFI_BRANCH_COUNTRY: string
      IAT_IDENTIFICATION_NUMBER: string
      RTN_REASON_CODE: { '-': "None" } | { R01: "'R01' Insufficient funds" } | { R02: "'R02' Account closed" } | { R03: "'R03' No account found" } | { R04: "'R04' Invalid account number structure" } | { R05: "'R05' Unauthorized debit to consumer account" } | { R06: "'R06' Returned per ODFI request" } | { R07: "'R07' Authorization revoked" } | { R08: "'R08' Payment stopped" } | { R09: "'R09' Uncollected funds" } | { R10: "'R10' Customer advises not known or not authorized" } | { R11: "'R11' Customer advises not in accordance with terms" } | { R12: "'R12' Account sold to another DFI" } | { R14: "'R14' Representative payee deceased" } | { R15: "'R15' Beneficiary or account holder deceased" } | { R16: "'R16' Account frozen" } | { R17: "'R17' File record edit criteria" } | { R20: "'R20' Non-transaction account" } | { R21: "'R21' Invalid company ID" } | { R22: "'R22' Invalid identification number" } | { R23: "'R23' Credit entry refused by receiver" } | { R24: "'R24' Duplicate entry" } | { R29: "'R29' Corporate customer advises not authorized" } | { R31: "'R31' Permissible return entry" } | { R33: "'R33' XCK Return entry" } | { R37: "'R37' Source document presented for payment" } | { R38: "'R38' Stop payment on source document" } | { R39: "'R39' Improper source document" } | { R50: "'R50' RCK State law affecting acceptance" } | { R51: "'R51' RCK Item is ineligible" } | { R52: "'R52' RCK Stop payment" } | { R53: "'R53' RCK Item and ACH entry presented for payment" } | { R61: "'R61' Dishonored Return - Misrouted return" } | { R62: "'R62' Dishonored Return - Return of erroneous debit" } | { R67: "'R67' Dishonored Return - Duplicate return" } | { R68: "'R68' Dishonored Return - Untimely return" } | { R69: "'R69' Dishonored Return - Field error in return" } | { R70: "'R70' Dishonored Return - Permissible return not accepted" } | { R71: "'R71' Contested Dishonored Return - Misrouted dishonored return" } | { R72: "'R72' Contested Dishonored Return - Untimely dishonored return" } | { R73: "'R73' Contested Dishonored Return - Timely original return" } | { R74: "'R74' Contested Dishonored Return - Field error in return corrected" } | { R75: "'R75' Contested Dishonored Return - Duplicate return is not a duplicate" } | { R76: "'R76' Contested Dishonored Return - Field error in return is not an error" } | { R77: "'R77' Contested Dishonored Return - Non-acceptance of R62 dishonored return" } | { C01: "'C01' Incorrect account number" } | { C02: "'C02' Incorrect routing number" } | { C03: "'C03' Incorrect routing number and account number" } | { C04: "'C04' Incorrect name" } | { C05: "'C05' Incorrect transaction code" } | { C06: "'C06' Incorrect account number and transaction code" } | { C07: "'C07' Incorrect routing and account number and transaction code" } | { C08: "'C08' Incorrect foreign receiving DFI ID" } | { C09: "'C09' Incorrect identification number" } | { C13: "'C13' Addenda format error" } | { C14: "'C14' IAT Operator - Incorrect SEC code for outbound payment" } | { C61: "'C61' Refused Notification Of Change - Misrouted notification of change" } | { C62: "'C62' Refused Notification Of Change - Incorrect trace number" } | { C63: "'C63' Refused Notification Of Change - Incorrect company ID" } | { C64: "'C64' Refused Notification Of Change - Incorrect identification number" } | { C65: "'C65' Refused Notification Of Change - Incorrectly formatted corrected data" } | { C66: "'C66' Refused Notification Of Change - Incorrect discretionary data" } | { C67: "'C67' Refused Notification Of Change - Routing number not from original entry detail" } | { C68: "'C68' Refused Notification Of Change - Account number not from original entry detail" } | { C69: "'C69' Refused Notification Of Change - Incorrect transaction code" } | { R13: "'R13' ACH Operator - Invalid routing number" } | { R18: "'R18' ACH Operator - Improper effective entry date" } | { R19: "'R19' ACH Operator - Amount field error" } | { R25: "'R25' ACH Operator - Addenda error" } | { R26: "'R26' ACH Operator - Mandatory field error" } | { R27: "'R27' ACH Operator - Trace number error" } | { R28: "'R28' ACH Operator - Routing number check digit error" } | { R30: "'R30' ACH Operator - RDFI not participant in check truncation program" } | { R32: "'R32' ACH Operator - RDFI non-settlement" } | { R34: "'R34' ACH Operator - RDFI limited participation" } | { R35: "'R35' ACH Operator - Return of improper debit entry" } | { R36: "'R36' ACH Operator - Return of improper credit entry" } | { R40: "'R40' ENR Return by federal government agency" } | { R41: "'R41' ENR Invalid transaction code" } | { R42: "'R42' ENR Invalid routing number" } | { R43: "'R43' ENR Invalid DFI account number" } | { R44: "'R44' ENR Invalid identification number" } | { R45: "'R45' ENR Invalid name" } | { R46: "'R46' ENR Invalid representative payee indicator" } | { R47: "'R47' ENR Duplicate enrollment" } | { R80: "'R80' IAT Operator - Entry coding error" } | { R81: "'R81' IAT Operator - Non-participant" } | { R82: "'R82' IAT Operator - Invalid foreign receiving DFI ID" } | { R83: "'R83' IAT Operator - Foreign receiving DFI cannot settle" } | { R84: "'R84' IAT Operator - Entry not processed" } | { R85: "'R85' IAT Operator - Incorrectly coded outbound payment" }
      RTN_ORIG_ENTRY_TRACE_NUMBER: string
      RTN_DEATH_DATE: Date
      RTN_ORIG_RCV_DFI_ID: string
      RTN_ADDENDA_INFORMATION: string
      RTN_ORIG_FWD_PAYMENT_AMOUNT: Money
      DHR_RTN_TRACE_NUMBER: string
      DHR_RTN_SETTLEMENT_DATE: Date
      DHR_RTN_REASON_CODE: { '-': "None" } | { R01: "'R01' Insufficient funds" } | { R02: "'R02' Account closed" } | { R03: "'R03' No account found" } | { R04: "'R04' Invalid account number structure" } | { R05: "'R05' Unauthorized debit to consumer account" } | { R06: "'R06' Returned per ODFI request" } | { R07: "'R07' Authorization revoked" } | { R08: "'R08' Payment stopped" } | { R09: "'R09' Uncollected funds" } | { R10: "'R10' Customer advises not known or not authorized" } | { R11: "'R11' Customer advises not in accordance with terms" } | { R12: "'R12' Account sold to another DFI" } | { R14: "'R14' Representative payee deceased" } | { R15: "'R15' Beneficiary or account holder deceased" } | { R16: "'R16' Account frozen" } | { R17: "'R17' File record edit criteria" } | { R20: "'R20' Non-transaction account" } | { R21: "'R21' Invalid company ID" } | { R22: "'R22' Invalid identification number" } | { R23: "'R23' Credit entry refused by receiver" } | { R24: "'R24' Duplicate entry" } | { R29: "'R29' Corporate customer advises not authorized" } | { R31: "'R31' Permissible return entry" } | { R33: "'R33' XCK Return entry" } | { R37: "'R37' Source document presented for payment" } | { R38: "'R38' Stop payment on source document" } | { R39: "'R39' Improper source document" } | { R50: "'R50' RCK State law affecting acceptance" } | { R51: "'R51' RCK Item is ineligible" } | { R52: "'R52' RCK Stop payment" } | { R53: "'R53' RCK Item and ACH entry presented for payment" } | { R61: "'R61' Dishonored Return - Misrouted return" } | { R62: "'R62' Dishonored Return - Return of erroneous debit" } | { R67: "'R67' Dishonored Return - Duplicate return" } | { R68: "'R68' Dishonored Return - Untimely return" } | { R69: "'R69' Dishonored Return - Field error in return" } | { R70: "'R70' Dishonored Return - Permissible return not accepted" } | { R71: "'R71' Contested Dishonored Return - Misrouted dishonored return" } | { R72: "'R72' Contested Dishonored Return - Untimely dishonored return" } | { R73: "'R73' Contested Dishonored Return - Timely original return" } | { R74: "'R74' Contested Dishonored Return - Field error in return corrected" } | { R75: "'R75' Contested Dishonored Return - Duplicate return is not a duplicate" } | { R76: "'R76' Contested Dishonored Return - Field error in return is not an error" } | { R77: "'R77' Contested Dishonored Return - Non-acceptance of R62 dishonored return" } | { C01: "'C01' Incorrect account number" } | { C02: "'C02' Incorrect routing number" } | { C03: "'C03' Incorrect routing number and account number" } | { C04: "'C04' Incorrect name" } | { C05: "'C05' Incorrect transaction code" } | { C06: "'C06' Incorrect account number and transaction code" } | { C07: "'C07' Incorrect routing and account number and transaction code" } | { C08: "'C08' Incorrect foreign receiving DFI ID" } | { C09: "'C09' Incorrect identification number" } | { C13: "'C13' Addenda format error" } | { C14: "'C14' IAT Operator - Incorrect SEC code for outbound payment" } | { C61: "'C61' Refused Notification Of Change - Misrouted notification of change" } | { C62: "'C62' Refused Notification Of Change - Incorrect trace number" } | { C63: "'C63' Refused Notification Of Change - Incorrect company ID" } | { C64: "'C64' Refused Notification Of Change - Incorrect identification number" } | { C65: "'C65' Refused Notification Of Change - Incorrectly formatted corrected data" } | { C66: "'C66' Refused Notification Of Change - Incorrect discretionary data" } | { C67: "'C67' Refused Notification Of Change - Routing number not from original entry detail" } | { C68: "'C68' Refused Notification Of Change - Account number not from original entry detail" } | { C69: "'C69' Refused Notification Of Change - Incorrect transaction code" } | { R13: "'R13' ACH Operator - Invalid routing number" } | { R18: "'R18' ACH Operator - Improper effective entry date" } | { R19: "'R19' ACH Operator - Amount field error" } | { R25: "'R25' ACH Operator - Addenda error" } | { R26: "'R26' ACH Operator - Mandatory field error" } | { R27: "'R27' ACH Operator - Trace number error" } | { R28: "'R28' ACH Operator - Routing number check digit error" } | { R30: "'R30' ACH Operator - RDFI not participant in check truncation program" } | { R32: "'R32' ACH Operator - RDFI non-settlement" } | { R34: "'R34' ACH Operator - RDFI limited participation" } | { R35: "'R35' ACH Operator - Return of improper debit entry" } | { R36: "'R36' ACH Operator - Return of improper credit entry" } | { R40: "'R40' ENR Return by federal government agency" } | { R41: "'R41' ENR Invalid transaction code" } | { R42: "'R42' ENR Invalid routing number" } | { R43: "'R43' ENR Invalid DFI account number" } | { R44: "'R44' ENR Invalid identification number" } | { R45: "'R45' ENR Invalid name" } | { R46: "'R46' ENR Invalid representative payee indicator" } | { R47: "'R47' ENR Duplicate enrollment" } | { R80: "'R80' IAT Operator - Entry coding error" } | { R81: "'R81' IAT Operator - Non-participant" } | { R82: "'R82' IAT Operator - Invalid foreign receiving DFI ID" } | { R83: "'R83' IAT Operator - Foreign receiving DFI cannot settle" } | { R84: "'R84' IAT Operator - Entry not processed" } | { R85: "'R85' IAT Operator - Incorrectly coded outbound payment" }
      CDR_ORIG_RETURN_DATE: Date
      CDR_ORIG_SETTLEMENT_DATE: Date
      CDR_DHR_TRACE_NUMBER: string
      CDR_DHR_SETTLEMENT_DATE: Date
      CDR_DHR_REASON_CODE: { '-': "None" } | { R01: "'R01' Insufficient funds" } | { R02: "'R02' Account closed" } | { R03: "'R03' No account found" } | { R04: "'R04' Invalid account number structure" } | { R05: "'R05' Unauthorized debit to consumer account" } | { R06: "'R06' Returned per ODFI request" } | { R07: "'R07' Authorization revoked" } | { R08: "'R08' Payment stopped" } | { R09: "'R09' Uncollected funds" } | { R10: "'R10' Customer advises not known or not authorized" } | { R11: "'R11' Customer advises not in accordance with terms" } | { R12: "'R12' Account sold to another DFI" } | { R14: "'R14' Representative payee deceased" } | { R15: "'R15' Beneficiary or account holder deceased" } | { R16: "'R16' Account frozen" } | { R17: "'R17' File record edit criteria" } | { R20: "'R20' Non-transaction account" } | { R21: "'R21' Invalid company ID" } | { R22: "'R22' Invalid identification number" } | { R23: "'R23' Credit entry refused by receiver" } | { R24: "'R24' Duplicate entry" } | { R29: "'R29' Corporate customer advises not authorized" } | { R31: "'R31' Permissible return entry" } | { R33: "'R33' XCK Return entry" } | { R37: "'R37' Source document presented for payment" } | { R38: "'R38' Stop payment on source document" } | { R39: "'R39' Improper source document" } | { R50: "'R50' RCK State law affecting acceptance" } | { R51: "'R51' RCK Item is ineligible" } | { R52: "'R52' RCK Stop payment" } | { R53: "'R53' RCK Item and ACH entry presented for payment" } | { R61: "'R61' Dishonored Return - Misrouted return" } | { R62: "'R62' Dishonored Return - Return of erroneous debit" } | { R67: "'R67' Dishonored Return - Duplicate return" } | { R68: "'R68' Dishonored Return - Untimely return" } | { R69: "'R69' Dishonored Return - Field error in return" } | { R70: "'R70' Dishonored Return - Permissible return not accepted" } | { R71: "'R71' Contested Dishonored Return - Misrouted dishonored return" } | { R72: "'R72' Contested Dishonored Return - Untimely dishonored return" } | { R73: "'R73' Contested Dishonored Return - Timely original return" } | { R74: "'R74' Contested Dishonored Return - Field error in return corrected" } | { R75: "'R75' Contested Dishonored Return - Duplicate return is not a duplicate" } | { R76: "'R76' Contested Dishonored Return - Field error in return is not an error" } | { R77: "'R77' Contested Dishonored Return - Non-acceptance of R62 dishonored return" } | { C01: "'C01' Incorrect account number" } | { C02: "'C02' Incorrect routing number" } | { C03: "'C03' Incorrect routing number and account number" } | { C04: "'C04' Incorrect name" } | { C05: "'C05' Incorrect transaction code" } | { C06: "'C06' Incorrect account number and transaction code" } | { C07: "'C07' Incorrect routing and account number and transaction code" } | { C08: "'C08' Incorrect foreign receiving DFI ID" } | { C09: "'C09' Incorrect identification number" } | { C13: "'C13' Addenda format error" } | { C14: "'C14' IAT Operator - Incorrect SEC code for outbound payment" } | { C61: "'C61' Refused Notification Of Change - Misrouted notification of change" } | { C62: "'C62' Refused Notification Of Change - Incorrect trace number" } | { C63: "'C63' Refused Notification Of Change - Incorrect company ID" } | { C64: "'C64' Refused Notification Of Change - Incorrect identification number" } | { C65: "'C65' Refused Notification Of Change - Incorrectly formatted corrected data" } | { C66: "'C66' Refused Notification Of Change - Incorrect discretionary data" } | { C67: "'C67' Refused Notification Of Change - Routing number not from original entry detail" } | { C68: "'C68' Refused Notification Of Change - Account number not from original entry detail" } | { C69: "'C69' Refused Notification Of Change - Incorrect transaction code" } | { R13: "'R13' ACH Operator - Invalid routing number" } | { R18: "'R18' ACH Operator - Improper effective entry date" } | { R19: "'R19' ACH Operator - Amount field error" } | { R25: "'R25' ACH Operator - Addenda error" } | { R26: "'R26' ACH Operator - Mandatory field error" } | { R27: "'R27' ACH Operator - Trace number error" } | { R28: "'R28' ACH Operator - Routing number check digit error" } | { R30: "'R30' ACH Operator - RDFI not participant in check truncation program" } | { R32: "'R32' ACH Operator - RDFI non-settlement" } | { R34: "'R34' ACH Operator - RDFI limited participation" } | { R35: "'R35' ACH Operator - Return of improper debit entry" } | { R36: "'R36' ACH Operator - Return of improper credit entry" } | { R40: "'R40' ENR Return by federal government agency" } | { R41: "'R41' ENR Invalid transaction code" } | { R42: "'R42' ENR Invalid routing number" } | { R43: "'R43' ENR Invalid DFI account number" } | { R44: "'R44' ENR Invalid identification number" } | { R45: "'R45' ENR Invalid name" } | { R46: "'R46' ENR Invalid representative payee indicator" } | { R47: "'R47' ENR Duplicate enrollment" } | { R80: "'R80' IAT Operator - Entry coding error" } | { R81: "'R81' IAT Operator - Non-participant" } | { R82: "'R82' IAT Operator - Invalid foreign receiving DFI ID" } | { R83: "'R83' IAT Operator - Foreign receiving DFI cannot settle" } | { R84: "'R84' IAT Operator - Entry not processed" } | { R85: "'R85' IAT Operator - Incorrectly coded outbound payment" }
      LAST_FM_DATE: Date
    }
    ACH_OUT_ENTRY: {
      SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { A: "ACH" } | { M: "MasterCard RPPS" }
      STATUS: { '-': "Normal" } | { R: "Rejected" }
      STATUS_EXPLANATION: string
      ACH_ORIGINATION_COMPANY_SERIAL: Serial
      ACH_ORIGINATION_SERIAL: Serial
      VENDOR_SERIAL: Serial
      BILL_PAYEE_SERIAL: Serial
      BILL_PAYMENT_SERIAL: Serial
      PARTICIPANT_SERIAL: Serial
      DEALER_SERIAL: Serial
      DRAW_REQUEST_SERIAL: Serial
      POSTING_ITEM_SERIAL: Serial
      ITEM_GL_SERIAL: Serial
      EXPORT_SET_SERIAL: Serial
      OUTGOING_ACH_ENTRY_SERIAL: Serial
      STANDARD_ENTRY_CLASS_CODE: { '-': "None" } | { ACK: "'ACK' Acknowledgement of CCD" } | { ADV: "'ADV' Automated accounting advice" } | { ARC: "'ARC' Accounts receivable" } | { ATX: "'ATX' Acknowledgement of CTX" } | { BOC: "'BOC' Back office conversion" } | { CCD: "'CCD' Corporate credit or debit" } | { CIE: "'CIE' Customer initiated" } | { COR: "'COR' Notification of change" } | { CTX: "'CTX' Corporate trade exchange" } | { DNE: "'DNE' Death notification" } | { ENR: "'ENR' Automated enrollment" } | { IAT: "'IAT' International ACH transaction" } | { MTE: "'MTE' Machine transfer" } | { POP: "'POP' Point of purchase" } | { POS: "'POS' Point of sale" } | { PPD: "'PPD' Prearranged payment and deposit" } | { RCK: "'RCK' Re-presented check" } | { SHR: "'SHR' Shared network transaction" } | { TEL: "'TEL' Telephone initiated" } | { TRC: "'TRC' Truncated check" } | { TRX: "'TRX' Truncated checks exchange" } | { WEB: "'WEB' Web initiated" } | { XCK: "'XCK' Destroyed check" }
      SERVICE_CLASS_CODE: { '-': "None" } | { '200': "'200' ACH mixed debits and credits" } | { '220': "'220' ACH credits only" } | { '225': "'225' ACH debits only" } | { '280': "'280' ACH automated accounting advices" }
      COMPANY_NAME: string
      COMPANY_ID: string
      COMPANY_ENTRY_DESCRIPTION: string
      COMPANY_DISCRETIONARY_DATA: string
      COMPANY_DESCRIPTIVE_DATE_TEXT: string
      EFFECTIVE_ENTRY_DATE: Date
      SETTLEMENT_OPTION: { S: "Same day" } | { N: "Next day" }
      ORIGINATING_DFI_ID: string
      IAT_FRGN_EXCH_INDICATOR: { '-': "None" } | { FV: "'FV' Fixed-to-variable" } | { VF: "'VF' Variable-to-fixed" } | { FF: "'FF' Fixed-to-fixed" }
      IAT_FRGN_EXCH_REFERENCE_IND: { '-': "None" } | { '1': "'1' Foreign exchange rate" } | { '2': "'2' Foreign exchange reference number" } | { '3': "'3' Space filled" }
      IAT_FRGN_EXCH_REFERENCE: string
      IAT_ISO_DEST_COUNTRY_CODE: string
      IAT_ISO_ORIG_CURRENCY_CODE: string
      IAT_ISO_DEST_CURRENCY_CODE: string
      TRANSACTION_CODE: { '-': "None" } | { '21': "'21' Checking credit return" } | { '22': "'22' Checking credit" } | { '23': "'23' Checking credit prenotification" } | { '24': "'24' Checking credit remittance data" } | { '26': "'26' Checking debit return" } | { '27': "'27' Checking debit" } | { '28': "'28' Checking debit prenotification" } | { '29': "'29' Checking debit remittance data" } | { '31': "'31' Savings credit return" } | { '32': "'32' Savings credit" } | { '33': "'33' Savings credit prenotification" } | { '34': "'34' Savings credit remittance data" } | { '36': "'36' Savings debit return" } | { '37': "'37' Savings debit" } | { '38': "'38' Savings debit prenotification" } | { '39': "'39' Savings debit remittance data" } | { '41': "'41' GL credit return" } | { '42': "'42' GL credit" } | { '43': "'43' GL credit prenotification" } | { '44': "'44' GL credit remittance data" } | { '46': "'46' GL debit return" } | { '47': "'47' GL debit" } | { '48': "'48' GL debit prenotification" } | { '49': "'49' GL debit remittance data" } | { '51': "'51' Loan credit return" } | { '52': "'52' Loan credit" } | { '53': "'53' Loan credit prenotification" } | { '54': "'54' Loan credit remittance data" } | { '55': "'55' Loan reversal" } | { '56': "'56' Loan reversal return" } | { '81': "'81' ADV Credit for ACH debits originated" } | { '82': "'82' ADV Debit for ACH credits originated" } | { '83': "'83' ADV Credit for ACH credits received" } | { '84': "'84' ADV Debit for ACH debits received" } | { '85': "'85' ADV Credit for ACH credits in rejected batches" } | { '86': "'86' ADV Debit for ACH debits in rejected batches" } | { '87': "'87' ADV Summary credit for ACH activity" } | { '88': "'88' ADV Summary debit for ACH activity" }
      DFI_ROUTING_NUMBER: string
      DFI_ACCOUNT_NUMBER: string
      AMOUNT: Money
      IDENTIFICATION_NUMBER: string
      NAME: string
      DISCRETIONARY_DATA: string
      TRACE_NUMBER: string
      CHECK_SERIAL_NUMBER: string
      TERMINAL_CITY: string
      TERMINAL_STATE: string
      CARD_EXPIRATION_DATE_TEXT: string
      CARD_TRANSACTION_TYPE_CODE: { '-': "None" } | { '01': "'01' Purchase of goods or services" } | { '02': "'02' Cash" } | { '03': "'03' Return reversal" } | { '11': "'11' Purchase reversal" } | { '12': "'12' Cash reversal" } | { '13': "'13' Return" } | { '21': "'21' Adjustment" } | { '99': "'99' Miscellaneous" }
      PAYMENT_TYPE_CODE: { '-': "None" } | { R: "'R ' Recurring entry" } | { S: "'S ' Single entry" }
      DOCUMENT_REFERENCE_NUMBER: string
      PROCESS_CONTROL_FIELD: string
      ITEM_RESEARCH_NUMBER: string
      ITEM_TYPE_INDICATOR: { '-': "None" } | { '01': "'01' NACS truncated items" }
      IAT_GATEWAY_OFAC_SCREEN_IND: { '-': "None" } | { '0': "'0' Potential blocked party not found" } | { '1': "'1' Potential blocked party found" }
      IAT_SECONDARY_OFAC_SCREEN_IND: { '-': "None" } | { '0': "'0' Potential blocked party not found" } | { '1': "'1' Potential blocked party found" }
      CREATION_DATE: Date
      LAST_FM_DATE: Date
    }
    ADDRESS: {
      SERIAL: Serial
      ACCESS_KEY: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      CARRIER_ROUTE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      TYPE_SERIAL: Serial
      ADDRESS_CHANGE_DATE: Date
      LATITUDE: string
      LONGITUDE: string
      ADDRESS_CONFIRMATION_DATE: Date
      ADDRESS_CONFIRMATION_OPTION: { '-': "None" } | { I: "Invalid" } | { N: "Invalid but do not correct" }
      LAST_FM_DATE: Date
    }
    ADDRESS_LINK_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    ADDRESS_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    ADVERSE_ACTION_REASON_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      MEMBERSHIP_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LOAN_APP_OPTION: { N: "No" } | { Y: "Yes" }
      HMDA_DENIAL_REASON: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      FORM_MAPPING_CODE: string
      LAST_FM_DATE: Date
    }
    ALERT_CHANNEL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      STATUS: { OFL: "Offline" } | { ONL: "Online" }
      QUEUE_DISPATCH_METHOD: { NONE: "None" } | { MS: "Message Server" } | { PUSH: "Push" } | { PULL: "Pull" }
      EMAIL_SUBJECT: string
      TESTING_MODE: { L: "Live only" } | { B: "Live and test" } | { T: "Test only" }
      LIVE_URL: string
      LIVE_CERTIFICATE_COMMON_NAME: string
      TEST_URL: string
      TEST_CERTIFICATE_COMMON_NAME: string
      CONNECT_TIMEOUT_SECONDS: Count
      RESPONSE_TIMEOUT_SECONDS: Count
      FAILURE_NOTIFICATION_ADDRESSES: string
      FAILURE_NOTIFICATION_MINUTES: Count
      FAILURE_FORCE_OFFLINE_MINUTES: Count
      FAILURE_TIME: Time
      EXCEPTION_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    ALERT_ENROLLMENT: {
      SERIAL: Serial
      ACCESS_KEY: string
      PERSON_SERIAL: Serial
      TYPE_SERIAL: Serial
      ACCOUNT_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      CARD_SERIAL: Serial
      LOGIN_SERIAL: Serial
      MINIMUM_AMOUNT: Money
      MAXIMUM_AMOUNT: Money
      DAYS_BEFORE_EVENT: Count
      CONTACT_METHOD: { S: "SMS" } | { E: "Email" } | { AD: "Audio" } | { AP: "App" }
      PERSON_CONTACT_SERIAL: Serial
      PERSON_EXT_IDENTIFIER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    ALERT_ENROLLMENT_CONTACT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CONTACT_METHOD: { S: "SMS" } | { E: "Email" } | { AD: "Audio" } | { AP: "App" }
      PERSON_CONTACT_SERIAL: Serial
      PERSON_EXT_IDENTIFIER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    ALERT_QUEUE: {
      SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { Q: "Queued" } | { F: "Failed" } | { S: "Successful" }
      CHANNEL_SERIAL: Serial
      ENROLLMENT_SERIAL: Serial
      CONTACT_METHOD: { S: "SMS" } | { E: "Email" } | { AD: "Audio" } | { AP: "App" }
      CONTACT_VALUE: string
      CREATION_TIME: Time
      ORIGINAL_TRAN_SERIAL: Serial
      ORIGINAL_NETWORK_LOG_SERIAL: Serial
      MESSAGE: string
      MESSAGE_DETAILS: Document
      EXCEPTION_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    ALERT_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { OFL: "Offline" } | { ONL: "Online" }
      SERVER_USER_SERIAL: Serial
      SERVER_DEVICE_SERIAL: Serial
      MAX_CON_TRAN_ANALYSIS_COUNT: Count
      LAST_TRANSACTION_SERIAL: Serial
      LAST_NETWORK_LOG_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    ALERT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { PMT: "Payment posted" } | { DEP: "Deposit posted (exclude same account transfer)" } | { PUR: "Card purchase posted" } | { CPH: "Card preauthorization hold" } | { DEC: "Card declined" } | { CTA: "Card token activated" } | { CTD: "Card token deactivated" } | { LBO: "Loan balance over amount" } | { SBU: "Savings balance under amount" } | { CCL: "Loan balance close to credit limit" } | { BPT: "Bill payment successfully generated" } | { OVD: "Overdraft fee" } | { RTN: "Returned item fee" } | { OTF: "Overdraft transfer fee" } | { ODT: "Overdraft transfer" } | { ATM: "ATM transaction" } | { APT: "ATM or POS transaction (exclude deposit)" } | { BPI: "Bill payment created" } | { ACC: "Alert contact changed" } | { CLC: "Card limit changed" } | { LGC: "Login changed" } | { LGF: "Login failed" } | { LGL: "Login locked" } | { LGU: "Login unlocked" } | { LPC: "Login password changed" } | { TIN: "TIN changed" } | { CTC: "Contact changed" } | { OSC: "Opportunity stage changed" } | { PMD: "Loan payment due" } | { PMF: "Loan payment not received" } | { PMP: "Loan payment pending" } | { BPD: "Bill payment due" } | { CLE: "Card limit expiration due" } | { CED: "Card expiration due" } | { CUS: "Custom event" }
      ACCOUNT_OPTION: { N: "No" } | { Y: "Yes" }
      SHARE_OPTION: { N: "No" } | { Y: "Yes" }
      LOAN_OPTION: { N: "No" } | { Y: "Yes" }
      CARD_OPTION: { N: "No" } | { Y: "Yes" }
      LOGIN_OPTION: { N: "No" } | { Y: "Yes" }
      MINIMUM_AMOUNT_OPTION: { N: "No" } | { Y: "Yes" }
      MAXIMUM_AMOUNT_OPTION: { N: "No" } | { Y: "Yes" }
      DAYS_BEFORE_EVENT_OPTION: { N: "No" } | { Y: "Yes" }
      EXCLUSIONS: string
      MESSAGE: string
      INSERT_MESSAGE: string
      DELETE_MESSAGE: string
      CHANNEL_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    ALERT_TYPE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      MESSAGE: string
      OPPORTUNITY_TYPE_SERIAL: Serial
      OPPORTUNITY_STAGE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APPLICANT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TITLE: string
      FIRST_NAME: string
      MIDDLE_NAME: string
      LAST_NAME: string
      SUFFIX: string
      NICKNAME: string
      BIRTH_DATE: Date
      GENDER: { U: "Unspecified" } | { M: "Male" } | { F: "Female" }
      DEMOGRAPHICS_FURNISHED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      ETHNICITY_HISPANIC_OR_LATINO: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_AMERICAN_INDIAN_OR_ALASKA: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_HAWAIIAN_OR_ISLANDER: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_ASIAN: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_BLACK_OR_AFRICAN_AMERICAN: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_WHITE: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      TIN: string
      TIN_TYPE: { S: "SSN" } | { E: "EIN" } | { I: "ITIN" } | { A: "ATIN" }
      TIN_CERTIFICATION: { C: "Certified" } | { N: "Not certified" } | { O: "One TIN notice from IRS" } | { T: "Two TIN notices from IRS within three years" }
      TIN_APPLICATION_DATE: Date
      BACKUP_WITHHOLD: { N: "No" } | { Y: "Yes" } | { E: "Exempt" }
      TAX_REPORTING: { '-': "Normal" } | { C: "Nonresident alien subject to 1042-S" } | { N: "No reporting" }
      TAX_STATE_SERIAL: Serial
      FOREIGN_TIN: string
      TAX_COUNTRY_CODE: string
      TAX_COUNTRY: string
      IRS_FORM_W8_EXPIRATION_DATE: Date
      IRS_FORM_W9_RECEIVED_DATE: Date
      TAX_PERSON_SERIAL: Serial
      MARITAL_STATUS: { U: "Unspecified" } | { M: "Married" } | { S: "Separated" } | { N: "Unmarried" } | { P: "Domestic partner" }
      CITIZENSHIP_STATUS: { U: "Unspecified" } | { C: "US citizen" } | { P: "Permanent resident alien" } | { O: "Other" }
      MLA_STATUS: { U: "Unknown" } | { N: "Not a covered borrower" } | { Y: "Covered borrower" }
      MLA_STATUS_DATE: Date
      MLA_STATUS_EXPLANATION: string
      MLA_STATUS_SOURCE: { C: "Credit reporting agency" } | { D: "DMDC database" } | { O: "Other" }
      YEARS_OF_SCHOOL: Count
      EMPLOYMENT_STATUS: { U: "Unspecified" } | { E: "Employed" } | { S: "Self-employed" } | { N: "Unemployed" } | { D: "Disabled" } | { R: "Retired" }
      OUTSTANDING_JUDGMENTS: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      BANKRUPTCY: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      FORECLOSED_OR_REPOSSESSED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      PARTY_TO_LAWSUIT: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      OBLIGATED_ON_LOAN: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      PRESENTLY_DELINQUENT: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      OBLIGATED_FOR_ALIMONY_SUPPORT: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      DOWN_PAYMENT_BORROWED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      COMAKER_OR_ENDORSER: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      INCOME_LIKELY_TO_DECLINE: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      OCCUPY_AS_PRIMARY_RESIDENCE: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RECENT_PROPERTY_OWNERSHIP: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RECENT_PROPERTY_TYPE: { U: "Unspecified" } | { P: "Principal residence" } | { S: "Second home" } | { I: "Investment property" }
      RECENT_PROPERTY_TITLE: { U: "Unspecified" } | { S: "Sole ownership" } | { J: "Jointly with spouse" } | { O: "Jointly with other" }
      RELATIONSHIP_SERIAL: Serial
      RELATIONSHIP_OVR_SERIAL: Serial
      RELATIONSHIP_OVR_EFF_DATE: Date
      RELATIONSHIP_OVR_EXP_DATE: Date
      DECEASED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      ACCOUNT_ACCEPTANCE: string
      CATEGORY: { I: "Individual" } | { B: "Sole Proprietorship" } | { C: "Corporation" } | { S: "S Corporation" } | { P: "Partnership" } | { p: "Limited Partnership" } | { l: "LLP" } | { L: "LLC" } | { N: "NPO" } | { T: "Trust" } | { E: "Estate" } | { O: "Other entity" }
      TYPE_SERIAL: Serial
      NAICS_SERIAL: Serial
      MARKETING_OPTION: { '-': "None" } | { AM: "Opt-out of all marketing" } | { CS: "Opt-out of cross-sell" }
      OFAC_RESTRICTION: { '-': "Not checked" } | { Y: "Yes" } | { N: "No" } | { M: "Maybe" }
      OFAC_LAST_CHECK_DATE: Date
      SOURCE_PERSON_SERIAL: Serial
      CREDIT_PULL_SERIAL: Serial
      SECONDARY_CREDIT_PULL_SERIAL: Serial
      DEPOSIT_CREDIT_PULL_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APPLICANT_ADDRESS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      CARRIER_ROUTE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      SOURCE_ADDRESS_SERIAL: Serial
      CATEGORY: { R: "Residence" } | { B: "Business" } | { M: "Mailing" } | { V: "Previous (Do not use)" }
      OWN_RENT: { U: "Unspecified" } | { O: "Own" } | { R: "Rent" } | { B: "Buying" } | { L: "Lives with parents" } | { Z: "Other" }
      FROM_DATE: Date
      TO_DATE: Date
      MONTHS_AT_ADDRESS: Count
      PURCHASE_DATE: Date
      PURCHASE_PRICE: Money
      CURRENT_VALUE: Money
      LOAN_BALANCE: Money
      LOAN_TERM: Count
      LOAN_INTEREST_RATE: Rate
      LOAN_PAYMENT_AMOUNT: Money
      LOAN_IMPOUND_OPTION: { N: "No" } | { Y: "Yes" }
      RENT_AMOUNT: Money
      TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APPLICANT_ALTERNATE_NAME: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ALTERNATE_NAME: string
      CREDITOR_NAME: string
      IDENTIFICATION_NUMBER: string
      LAST_FM_DATE: Date
    }
    APPLICANT_CONTACT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { HP: "Home phone" } | { BP: "Business phone" } | { HF: "Home fax" } | { BF: "Business fax" } | { PC: "Personal cell" } | { BC: "Business cell" } | { PP: "Personal pager" } | { Bp: "Business pager" } | { PE: "Personal email" } | { BE: "Business email" } | { PW: "Personal web page" } | { BW: "Business web page" } | { CU: "Custom" }
      DESCRIPTION: string
      VALUE: string
      MARKETING_OPTION: { Y: "Yes" } | { N: "No" } | { T: "Text only" } | { V: "Voice only" }
      CARD_FRAUD_ALERT_OPTION: { N: "No" } | { Y: "Yes" }
      ALERT_OPTION: { N: "Normal" } | { S: "Suppress" }
      BAD_CONTACT: { N: "No" } | { Y: "Yes" }
      EXPIRATION_DATE: Date
      LAST_VERIFICATION_DATE: Date
      SOURCE_PERSON_CONTACT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APPLICANT_DEPENDENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      AGE: Count
      RELATIONSHIP: string
      LAST_FM_DATE: Date
    }
    APPLICANT_EMPLOYMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      EMPLOYER_PERSON_SERIAL: Serial
      EMPLOYER_PERSON_ADDR_SERIAL: Serial
      EMPLOYER_NAME: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      PHONE_NUMBER: string
      FAX_NUMBER: string
      TYPE_SERIAL: Serial
      STATUS: { E: "Employed" } | { U: "Unemployed" } | { D: "Disabled" } | { R: "Retired" }
      SELF_EMPLOYED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      EMPLOYEE_ID: string
      OCCUPATION_SERIAL: Serial
      TITLE_OR_OCCUPATION: string
      SUPERVISOR_NAME: string
      FROM_DATE: Date
      TO_DATE: Date
      MONTHS_ON_JOB: Count
      MONTHS_IN_LINE_OF_WORK: Count
      HOURLY_INCOME: Money
      HOURS_PER_WEEK: Count
      MONTHLY_INCOME: Money
      SOURCE_PERSON_EMPLMNT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APPLICANT_ID: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { DL: "Driver license" } | { PN: "Passport" } | { MI: "Military ID" } | { SI: "State ID" } | { RI: "Resident ID" } | { PW: "Password" } | { MM: "Mother's maiden name" } | { SQ: "Security question" } | { CU: "Custom" }
      DESCRIPTION: string
      VALUE: string
      ISSUER: string
      ISSUE_DATE: Date
      EXPIRATION_DATE: Date
      IMAGE: Binary
      IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      IMAGE_MOD_TIME: Time
      BACK_IMAGE: Binary
      BACK_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      BACK_IMAGE_MOD_TIME: Time
      LAST_VERIFICATION_DATE: Date
      SOURCE_PERSON_ID_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APPLICANT_REFERENCE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      REFERENCE_NAME: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      PHONE_NUMBER: string
      RELATIONSHIP: string
      MONTHS_KNOWN: Count
      LAST_FM_DATE: Date
    }
    APPLICANT_SCORE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      SCORE: Count
      SCORE_PERCENTILE: Rate
      EXCLUSION_CODE: string
      EXCLUSION_DESCRIPTION: string
      SCORE_DATE: Date
      LAST_FM_DATE: Date
    }
    APPLICANT_SCORE_FACTOR: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CODE: string
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    APP: {
      SERIAL: Serial
      ACCESS_KEY: string
      APPLICATION_NUMBER: string
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      CHANNEL_SERIAL: Serial
      APPLICATION_DATE: Date
      CLOSE_DATE: Date
      WITHDRAWN_INDICATOR: { '-': "None" } | { D: "Duplicate" } | { A: "Withdrawn by applicant" }
      PROCESSOR_USER_SERIAL: Serial
      OPENED_BY_USER_SERIAL: Serial
      ACTIVE_USER_SERIAL: Serial
      ACTIVE_USER_CHECKOUT_TIME: Time
      PRIMARY_APPLICATION_SERIAL: Serial
      INDIRECT_STATUS: { '-': "None" } | { O: "OFAC check" } | { K: "File maintenance" } | { I: "Import credit pull" } | { P: "Risk based pricing" } | { C: "Projection" } | { R: "Debt ratios" } | { D: "Auto decision" } | { A: "Auto decision queued" } | { a: "Auto decision sent" } | { M: "Manual decision queued" } | { m: "Manual decision sent" } | { U: "Documents received queued" } | { u: "Documents received sent" } | { Y: "Funding delay queued" } | { y: "Funding delay sent" } | { F: "Manual funding queued" } | { f: "Manual funding sent" }
      INDIRECT_PROCESSING_STATUS: { U: "Up" } | { D: "Down" }
      INDIRECT_REQUEST: { '-': "None" } | { D: "Send decision" } | { F: "Send funding" }
      INDIRECT_LENDER_ID: string
      INDIRECT_DEALER_ID: string
      INDIRECT_APPLICATION_ID: string
      INDIRECT_VEHICLE_CLASS: { '-': "None" } | { N: "New" } | { U: "Used" } | { D: "Demo" }
      INDIRECT_VEHICLE_CATEGORY: { '-': "None" } | { A: "Automobile" } | { C: "Motorcycle" } | { R: "Recreational vehicle" } | { T: "All terrain vehicle" } | { B: "Boat" } | { P: "Motorboat" } | { S: "Sailboat" } | { W: "Personal watercraft" } | { J: "Jetski" } | { O: "Snowmobile" } | { F: "Farm vehicle" } | { I: "Industrial" } | { M: "Mobility vehicle" } | { G: "Aircraft" }
      INDIRECT_PRODUCT_CATEGORY: { '-': "None" } | { R: "Retail" } | { B: "Balloon" }
      INDIRECT_SEQUENCE_NUMBER: Count
      INDIRECT_DOCS_RCVD_DATE: Date
      INDIRECT_DOCS_RCVD_USER_SERIAL: Serial
      DEALER_SERIAL: Serial
      EXCEPTION_DESCRIPTION: string
      ACCESS_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" } | { E: "Employee" } | { F: "Employee related" }
      NOTE_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      LAST_FM_DATE: Date
    }
    APP_ADVERSE_ACTION_REASON: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      EXPLANATION: string
      DOCUMENTATION: string
      LAST_FM_DATE: Date
    }
    APP_AST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      APPLICANT_SERIAL: Serial
      DESCRIPTION: string
      HOLDER_NAME: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      SOURCE: { '-': "None" } | { O: "On-Us" } | { C: "Credit pull" } | { A: "Applicant address" }
      SOURCE_DOCUMENT_ENTRY: Document
      SOURCE_CREDIT_PULL_SERIAL: Serial
      SOURCE_CREDIT_PULL_ACCT_TYPE: string
      IDENTIFICATION_NUMBER: string
      CATEGORY: { CA: "Cash deposits" } | { CP: "Cash deposit toward purchase" } | { SB: "Stocks and bonds" } | { LI: "Life insurance" } | { RE: "Real estate owned" } | { VR: "Vested interest in retirement fund" } | { BU: "Net worth of business owned" } | { AU: "Automobile owned" } | { OT: "Other" }
      STATUS: { '-': "None" } | { S: "Sold" } | { P: "Pending sale" } | { R: "Rental held for income" }
      INTEREST_RATE: Rate
      CASH_VALUE: Money
      PURCHASE_PRICE: Money
      LIFE_INSURANCE_FACE_AMOUNT: Money
      PROPERTY_TYPE: { U: "Unspecified" } | { P: "Principal residence" } | { S: "Second home" } | { I: "Investment property" }
      PROPERTY_TITLE: { U: "Unspecified" } | { S: "Sole ownership" } | { J: "Jointly with spouse" } | { O: "Jointly with other" }
      MORTGAGES_AND_LIENS: Money
      GROSS_RENTAL_INCOME: Money
      MORTGAGE_PAYMENTS: Money
      MISCELLANEOUS_EXPENSE: Money
      NET_RENTAL_INCOME: Money
      LAST_FM_DATE: Date
    }
    APP_AST_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      APPLICANT_SERIAL: Serial
      CASH_VALUE: Money
      GROSS_RENTAL_INCOME: Money
      MISCELLANEOUS_EXPENSE: Money
      LAST_FM_DATE: Date
    }
    APP_AST_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    APP_CHANNEL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      INDIRECT_OPTION: { N: "No" } | { Y: "Online" } | { B: "Batch" }
      QUERY_SERVER_SERIAL: Serial
      APPLICATION_TYPE_SERIAL: Serial
      APPLICATION_INCOME_TYPE_SERIAL: Serial
      NEW_TRAILER_COLL_TYPE_SERIAL: Serial
      USED_TRAILER_COLL_TYPE_SERIAL: Serial
      NEW_MOTOR_COLL_TYPE_SERIAL: Serial
      USED_MOTOR_COLL_TYPE_SERIAL: Serial
      FORM_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APP_CHANNEL_PRODUCT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { V: "Vehicle" }
      VEHICLE_CLASS: { '-': "None" } | { N: "New" } | { U: "Used" } | { D: "Demo" }
      VEHICLE_CATEGORY: { '-': "None" } | { A: "Automobile" } | { C: "Motorcycle" } | { R: "Recreational vehicle" } | { T: "All terrain vehicle" } | { B: "Boat" } | { P: "Motorboat" } | { S: "Sailboat" } | { W: "Personal watercraft" } | { J: "Jetski" } | { O: "Snowmobile" } | { F: "Farm vehicle" } | { I: "Industrial" } | { M: "Mobility vehicle" } | { G: "Aircraft" }
      PRODUCT_CATEGORY: { '-': "None" } | { R: "Retail" } | { B: "Balloon" }
      VEH_PREF_VAL_OPTION: { '-': "None" } | { R: "Retail/MSRP" } | { W: "Wholesale/Invoice" } | { P: "Retail/MSRP within vehicle age}|{ then wholesale/invoice" }
      VEH_PREF_VAL_AGE: Count
      VEH_PREF_VAL_AGE_START_MONTH: Count
      LOAN_DEFAULTS_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APP_CHANNEL_PRODUCT_LIST_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { S: "Stipulation" } | { M: "Standard message" }
      DEC_STIP_TYPE_SERIAL: Serial
      DEC_STIP_EXPLANATION: string
      MESSAGE_BODY: string
      LAST_FM_DATE: Date
    }
    APP_CONFIG: {
      SERIAL: Serial
      ACCESS_KEY: string
      EXPERIAN_ON_US_IDENTIFIERS: string
      TRANSUNION_ON_US_IDENTIFIERS: string
      EQUIFAX_ON_US_IDENTIFIERS: string
      ON_US_HOLDER_NAME: string
      ON_US_AST_TYPE_SERIAL: Serial
      ON_US_LIA_TYPE_SERIAL: Serial
      CREDIT_PULL_LIA_TYPE_SERIAL: Serial
      RENT_EXP_TYPE_SERIAL: Serial
      RENT_EXP_OPTION: { S: "Single expense per address" } | { I: "Individual expense per applicant" }
      LIA_MTH_PMT_MIN: Money
      LIA_MTH_PMT_BAL_RATE: Rate
      LIA_MTH_PMT_CRED_LIM_RATE: Rate
      PMT_BAL_CRED_REP_GRP_SERIAL: Serial
      PROJ_PMT_CALCULATION_OPTION: { '-': "None" } | { C: "Use payment calculation if applicable" }
      SECURED_CRED_REP_GRP_SERIAL: Serial
      PEND_APP_TRADE_IMPORT_DAYS: Count
      LAST_FM_DATE: Date
    }
    APP_CONFIG_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      CRED_REP_GRP_SERIAL: Serial
      LIA_MTH_PMT_MIN: Money
      LIA_MTH_PMT_BAL_RATE: Rate
      LIA_MTH_PMT_CRED_LIM_RATE: Rate
      CATEGORY: { CRS: "Credit score" } | { LMT: "Liability monthly payment" }
      LAST_FM_DATE: Date
    }
    APP_DEBT_RATIO: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      RATIO: Rate
      LAST_FM_DATE: Date
    }
    APP_DECISION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DECISION_DATE: Date
      DECISION_MAKER_USER_SERIAL: Serial
      DECISION_MAKER_2_USER_SERIAL: Serial
      DECISION_MODEL_CRITERIA_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    APP_DECISION_EXCEPTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    APP_DECISION_STIPULATION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      EXPLANATION: string
      DOCUMENTATION: string
      SATISFIED: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    APP_EXP: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      APPLICANT_SERIAL: Serial
      DESCRIPTION: string
      HOLDER_NAME: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      SOURCE: { '-': "None" } | { O: "On-Us" } | { C: "Credit pull" } | { A: "Applicant address" }
      SOURCE_DOCUMENT_ENTRY: Document
      SOURCE_CREDIT_PULL_SERIAL: Serial
      SOURCE_CREDIT_PULL_ACCT_TYPE: string
      IDENTIFICATION_NUMBER: string
      CATEGORY: { RN: "Rent" } | { FM: "First mortgage" } | { OF: "Other home financing" } | { HI: "Hazard insurance" } | { RT: "Real estate taxes" } | { MI: "Mortgage insurance" } | { HA: "Homeowner association dues" } | { AL: "Alimony}|{ child support}|{ and separate maintenance" } | { JR: "Job-related expense" } | { OT: "Other" }
      STATUS: { '-': "None" } | { P: "Proposed with this transaction" }
      MONTHLY_EXPENSE: Money
      LAST_FM_DATE: Date
    }
    APP_EXP_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      APPLICANT_SERIAL: Serial
      MONTHLY_EXPENSE: Money
      LAST_FM_DATE: Date
    }
    APP_EXP_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    APP_INC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      APPLICANT_SERIAL: Serial
      DESCRIPTION: string
      HOLDER_NAME: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      SOURCE: { '-': "None" } | { O: "On-Us" } | { C: "Credit pull" } | { A: "Applicant address" }
      SOURCE_DOCUMENT_ENTRY: Document
      SOURCE_CREDIT_PULL_SERIAL: Serial
      SOURCE_CREDIT_PULL_ACCT_TYPE: string
      IDENTIFICATION_NUMBER: string
      CATEGORY: { BP: "Base employment income" } | { OV: "Overtime" } | { BO: "Bonuses" } | { CO: "Commissions" } | { DI: "Dividends and interest" } | { RI: "Net rental income" } | { OT: "Other" }
      STATUS: { '-': "None" }
      DEBT_RATIO_EXC_REASON_SERIAL: Serial
      MONTHLY_INCOME: Money
      LAST_FM_DATE: Date
    }
    APP_INC_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      APPLICANT_SERIAL: Serial
      MONTHLY_INCOME: Money
      LAST_FM_DATE: Date
    }
    APP_INC_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    APP_LIA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      APPLICANT_SERIAL: Serial
      DESCRIPTION: string
      HOLDER_NAME: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      SOURCE: { '-': "None" } | { O: "On-Us" } | { C: "Credit pull" } | { A: "Applicant address" }
      SOURCE_DOCUMENT_ENTRY: Document
      SOURCE_CREDIT_PULL_SERIAL: Serial
      SOURCE_CREDIT_PULL_ACCT_TYPE: string
      IDENTIFICATION_NUMBER: string
      CATEGORY: { LB: "Loan borrower" } | { LC: "Loan cosigner" } | { LG: "Loan guarantor" } | { OT: "Other" }
      STATUS: { '-': "None" } | { P: "Will be paid off with this transaction" } | { M: "Will be modified with this transaction" }
      COLLATERAL_OPTION: { '-': "Unknown" } | { S: "Secured" } | { U: "Unsecured" }
      CRED_REP_ACCOUNT_TYPE: { '-': "Do not report" } | { '00': "'00' Auto" } | { '01': "'01' Unsecured" } | { '02': "'02' Secured" } | { '03': "'03' Partially secured" } | { '04': "'04' Home improvement" } | { '05': "'05' FHA home improvement" } | { '06': "'06' Installment sales contract" } | { '07': "'07' Charge account" } | { '08': "'08' Real estate type unknown" } | { '10': "'10' Business loan" } | { '11': "'11' Recreational merchandise" } | { '12': "'12' Education" } | { '13': "'13' Lease" } | { '15': "'15' Line of credit" } | { '17': "'17' Manufactured housing" } | { '18': "'18' Credit card" } | { '19': "'19' FHA real estate mortgage" } | { '20': "'20' Note loan" } | { '25': "'25' VA real estate mortgage" } | { '26': "'26' Conventional real estate mortgage" } | { '29': "'29' Rental agreement" } | { '37': "'37' Combined credit plan" } | { '43': "'43' Debit card" } | { '47': "'47' Credit line secured" } | { '48': "'48' Collection agency or attorney" } | { '50': "'50' Family support" } | { '65': "'65' Government unsecured guaranteed loan" } | { '66': "'66' Government secured guaranteed loan" } | { '67': "'67' Government unsecured direct loan" } | { '68': "'68' Government secured direct loan" } | { '69': "'69' Government grant" } | { '70': "'70' Government overpayment" } | { '71': "'71' Government fine" } | { '72': "'72' Government fee for services" } | { '73': "'73' Government employee advance" } | { '74': "'74' Government miscellaneous debt" } | { '75': "'75' Government benefit" } | { '77': "'77' Returned check" } | { '89': "'89' Home equity line of credit" } | { '90': "'90' Medical debt" } | { '91': "'91' Debt consolidation" } | { '92': "'92' Utility company" } | { '93': "'93' Child support" } | { '95': "'95' Attorney fees" } | { '0A': "'0A' Time share loan" } | { '2A': "'2A' Secured credit card" } | { '3A': "'3A' Auto lease" } | { '5A': "'5A' Real estate junior liens" } | { '6A': "'6A' Commercial installment loan" } | { '7A': "'7A' Commercial line of credit" } | { '8A': "'8A' Business credit card" } | { '9A': "'9A' Secured home improvement" } | { '5B': "'5B' Second mortgage" } | { '6B': "'6B' Commercial mortgage loan" } | { '7B': "'7B' Agricultural" } | { '8B': "'8B' Deposit account with overdraft protection" } | { '9B': "'9B' Business line personally guaranteed" } | { '0C': "'0C' Debt buyer" } | { '2C': "'2C' USDA real estate mortgage" } | { '4D': "'4D' Telecommunications or cellular" } | { '6D': "'6D' Home equity" } | { '0F': "'0F' Construction loan" } | { '0G': "'0G' Flexible spending credit card" }
      DEBT_RATIO_EXC_REASON_SERIAL: Serial
      COSIGNER_FOR_NAME: string
      INTEREST_RATE: Rate
      MONTHLY_PAYMENT: Money
      MONTHLY_PAYMENT_SOURCE: { '-': "None" } | { O: "On-Us" } | { C: "Credit pull" } | { B: "Calculated from balance" } | { L: "Calculated from credit limit" }
      OPEN_DATE: Date
      MONTHS_REMAINING: Count
      ORIGINAL_AMOUNT: Money
      UNPAID_BALANCE: Money
      CREDIT_LIMIT: Money
      LAST_FM_DATE: Date
    }
    APP_LIA_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      APPLICANT_SERIAL: Serial
      MONTHLY_PAYMENT: Money
      LAST_FM_DATE: Date
    }
    APP_LIA_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    APP_MSG: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { I: "Incoming" } | { O: "Outgoing" }
      CREATION_TIME: Time
      CREATOR: string
      SUBJECT: string
      MESSAGE: string
      REQUEST: { '-': "None" } | { D: "Send documents received" } | { F: "Send funding delay" }
      TRANSMISSION_STATUS: { Q: "Queued" } | { S: "Sent" } | { R: "Received" } | { F: "Failed" }
      LAST_FM_DATE: Date
    }
    AP_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    APP_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { '-': "None" } | { M: "Membership" } | { L: "Loan" }
      SUB_CATEGORY: { '-': "None" } | { C: "Consolidation" }
      CREDIT_PULL_TYPE_SERIAL: Serial
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      WORK_FLOW_SERIAL: Serial
      LN_PRODUCT_RESTRICTION: { N: "No" } | { Y: "Yes" }
      SINGLE_ACTIVE_USER_OPTION: { D: "Disabled" } | { E: "Enabled" }
      LAST_FM_DATE: Date
    }
    APP_TYPE_PRODUCT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { LT: "Loan Type" }
      LN_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    AUTO_NUMBER: {
      SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { A: "Account number" } | { C: "Card number" } | { P: "Application number" } | { F: "FinCEN control number" } | { B: "Bill payee number" } | { D: "Dispute number" } | { V: "Shared covenant number" }
      DESCRIPTION: string
      NEXT_VALUE: Count
      STEP_VALUE: Count
      LAST_FM_DATE: Date
    }
    BATCH: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      BATCH_JOB_SERIAL: Serial
      BATCH_JOB_DESCRIPTION: string
      BATCH_PROGRAM_NAME: string
      BATCH_OPTIONS: Document
      BATCH_USER_SERIAL: Serial
      BATCH_DEVICE_SERIAL: Serial
      EXECUTION_ORDER_KEY: string
      STATUS: { Q: "Queued" } | { I: "In progress" } | { C: "Completed" }
      TERMINATION_STATUS: { '-': "None" } | { R: "Termination requested" } | { T: "Termination performed" }
      REVERSAL_STATUS: { '-': "None" } | { R: "Reversed" }
      PHASE: Document
      STARTED_TIME: Time
      FINISHED_TIME: Time
    }
    BATCH_JOB: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      CATEGORY: { S: "Sequential job list" } | { C: "Concurrent job list" } | { P: "Program" }
      BATCH_PROGRAM_NAME: string
      BATCH_OPTIONS: Document
      BATCH_USER_SERIAL: Serial
      BATCH_DEVICE_SERIAL: Serial
      SUBMIT_SECURITY_EVENT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    BATCH_JOB_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      BATCH_JOB_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    BATCH_PROGRAMS: {
      SERIAL: Serial
      ACCESS_KEY: string
      BATCH_PROGRAM_NAME: string
      CATEGORY: { R: "Reporting" } | { S: "Sequential posting" } | { C: "Concurrent posting" }
      LAST_FM_DATE: Date
    }
    BATCH_QUEUE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PROCESSING_STATUS: { U: "Up" } | { D: "Down" }
      MAX_CONCURRENT_PROGRAMS_PER_Q: Count
      LAST_FM_DATE: Date
    }
    BATCH_QUEUE_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      BATCH_JOB_SERIAL: Serial
      BATCH_RUN_SERIAL: Serial
      STATUS: { Q: "Queued" } | { H: "Held" } | { I: "In progress" } | { F: "Failed" }
      START_AFTER_TIME: Time
      MOVE_TO_BATCH_QUEUE_SERIAL: Serial
    }
    BATCH_RUN: {
      SERIAL: Serial
      ACCESS_KEY: string
      BATCH_JOB_SERIAL: Serial
      BATCH_JOB_DESCRIPTION: string
      QUEUED_TIME: Time
      STARTED_TIME: Time
      FINISHED_TIME: Time
    }
    BATCH_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      SERVER_USER_SERIAL: Serial
      SERVER_DEVICE_SERIAL: Serial
      MAX_CONCURRENT_QUEUES: Count
      MAX_CONCURRENT_PROGRAMS: Count
      LAST_FM_DATE: Date
    }
    BILL_PAYEE: {
      SERIAL: Serial
      ACCESS_KEY: string
      BILL_PAYEE_NUMBER: string
      NAME: string
      NAME_MATCH_VALUE: string
      NAME_MATCH_PRIORITY: Count
      TYPE_SERIAL: Serial
      INDUSTRY_TYPE_SERIAL: Serial
      DESCRIPTION: string
      OFAC_RESTRICTION: { '-': "Not checked" } | { Y: "Yes" } | { N: "No" } | { M: "Maybe" }
      OFAC_LAST_CHECK_DATE: Date
      STATUS: { '-': "Pending" } | { A: "Approved" } | { P: "Prohibited" }
      STATUS_EXPLANATION: string
      VISIBILITY: { '-': "Show" } | { H: "Hide" }
      COMMENT: string
      REMITTANCE_METHOD: { D: "Check" } | { M: "MasterCard RPPS" } | { A: "ACH origination" }
      BILLER_ID: string
      ACH_ORIGINATION_COMPANY_SERIAL: Serial
      ACH_DFI_ROUTING_NUMBER: string
      ACH_DFI_ROUTING_NUMBER_DESC: string
      ACH_DFI_ACCOUNT_NUMBER: string
      ACH_DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      ACH_ENTRY_CLASS: { CCD: "CCD" } | { CIE: "CIE" } | { P2P: "P2P" }
      ACH_IDENTIFICATION_NUMBER: string
      ACH_NAME: string
      ACH_PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      ACH_PRENOTIFICATION_DATE: Date
      CREATION_DATE: Date
      IMPORT_RECORD_KEY: string
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_FORMAT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      FORMAT: string
      CHECK_DIGIT_OPTION: { '-': "None" } | { C: "Card" }
      EXCLUDE_OPTION: { N: "No" } | { Y: "Yes" }
      IMPORT_RECORD_KEY: string
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_ADDRESS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      ADDRESS_MATCH_PRIORITY: Count
      STATUS: { A: "Active" } | { I: "Inactive" }
      IMPORT_RECORD_KEY: string
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_AKA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      NAME: string
      NAME_MATCH_VALUE: string
      NAME_MATCH_PRIORITY: Count
      NAME_CORRECTION: string
      STATUS: { A: "Active" } | { I: "Inactive" }
      IMPORT_RECORD_KEY: string
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_INDUSTRY_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_OFAC_CHECK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { N: "No match" } | { n: "No new potential match" } | { P: "Potential match" } | { C: "Match confirmed" } | { R: "Match rejected" }
      STATUS_DATE: Date
      STATUS_USER_SERIAL: Serial
      STATUS_EXPLANATION: string
      FILE_SOURCE: { '-': "None" } | { SDN: "SDN" } | { PLC: "PLC" } | { FSE: "FSE" } | { CON: "Consolidated" }
      FILE_UNIQUE_ID: string
      FILE_AKA_UNIQUE_ID: string
      FILE_ENTRY: Document
      FILE_DATE: Date
      MATCH_DATE: Date
      MATCH_SCORE: Count
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    BILL_PAYEE_YTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      YEAR: Count
      COUNT: Count
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    BILL_PAYMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      DESCRIPTION: string
      BILL_PAYEE_SERIAL: Serial
      BILL_PAYEE_AKA_SERIAL: Serial
      BILL_PAYEE_ADDRESS_SERIAL: Serial
      BILL_PAYEE_PHONE_NUMBER: string
      BILL_PAYEE_STATUS: { '-': "Pending" } | { A: "Approved" } | { P: "Prohibited" }
      BILL_PAYEE_REMITTANCE_METHOD: { D: "Check" } | { M: "MasterCard RPPS" } | { A: "ACH origination" }
      REMITTANCE_ACCOUNT_NUMBER: string
      MEMO: string
      MINIMUM_AMOUNT: Money
      MAXIMUM_AMOUNT: Money
      AMOUNT_RANGE_CHANGE_DATE: Date
      AMOUNT: Money
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      STATEMENT_DESCRIPTION: string
      CREATION_DATE: Date
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      NEXT_POSTING_DATE: Date
      EXPIRATION_DATE: Date
      SETTLEMENT_OPTION: { S: "Same day" } | { N: "Next day" }
      LAST_POSTING_DATE: Date
      LAST_POSTING_AMOUNT: Money
      LIFETIME_COUNT: Count
      LIFETIME_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    BILL_PAYMENT_YTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      YEAR: Count
      COUNT: Count
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    BOND_REDEMPTION_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      BOND_CATEGORY: { N: "Series EE" } | { I: "Series I" } | { E: "Series E" } | { S: "Savings Note" } | { O: "Other Savings Bond" }
      REDEMPTION_YEAR: Count
      REDEMPTION_MONTH: Count
      ISSUE_YEAR: Count
      ISSUE_MONTH: Count
      VALUE: Money
      DENOMINATION: Money
      PURCHASE_RATE: Rate
      LAST_FM_DATE: Date
    }
    BRANCH: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FIRST_ADDRESS_LINE: string
      PO_BOX: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      LATITUDE: string
      LONGITUDE: string
      SHARED_BRANCH_CUSO: { '-': "None" } | { '1': "'1' CUSC" } | { '2': "'2' FSCC" } | { '3': "'3' SCC" }
      SHARED_BRANCH_LEAGUE: string
      SHARED_BRANCH_INSTITUTION_ID: string
      SHARED_BRANCH_PSEUDO_TERMINAL: string
      GL_ACCOUNT_BRANCH_SUFFIX: string
      CK_HLD_ROUTING_SET_SERIAL: Serial
      CK_HLD_BANK_DAY_CUTOFF_HOUR: Count
      CK_HLD_BANK_DAY_CUTOFF_MINUTE: Count
      TIME_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      PHONE_NUMBER: string
      CHEX_SYSTEMS_CUSTOMER_ID: string
      CHEX_SYSTEMS_BIZ_CHEX_FI_ID: string
      FINCEN_LOCATION_CODE: string
      RSSD_ID: string
      SALES_OPPORTUNITY_OPTION: { E: "Enabled" } | { D: "Disabled" }
      LAST_FM_DATE: Date
    }
    BULK_DEPOSIT: {
      SERIAL: Serial
      CATEGORY: { KR: "Check received" } | { CR: "Cash received" }
      STATUS: { O: "Open" } | { V: "Verified" }
      SHARE_SERIAL: Serial
      RECEIVED_DATE: Date
      RECEIVED_TRANSACTION_SERIAL: Serial
      RECEIVED_USER_SERIAL: Serial
      RECEIVED_BRANCH_SERIAL: Serial
      RECEIVED_CASH_DRAWER_SERIAL: Serial
      RECEIVED_CHECK_COUNT: Count
      RECEIVED_AMOUNT: Money
      RECEIVED_GL_SERIAL: Serial
      VERIFIED_DATE: Date
      VERIFIED_TRANSACTION_SERIAL: Serial
      VERIFIED_USER_SERIAL: Serial
      VERIFIED_BRANCH_SERIAL: Serial
      VERIFIED_CASH_DRAWER_SERIAL: Serial
      VERIFIED_CHECK_COUNT: Count
      VERIFIED_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    CAMPAIGN: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      START_DATE: Date
      END_DATE: Date
      OFFER_OPTION: { '-': "None" } | { A: "All" } | { B: "Batch" } | { I: "Interactive" }
      OFFER_EXPIRATION_DATE: Date
      CAMPAIGN_LITERATURE: Document
      CAMPAIGN_LITERATURE_FORMAT: { T: "text" } | { H: "html" }
      CAMPAIGN_DOC_IMAGE: Binary
      CAMPAIGN_DOC_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      CAMPAIGN_DOC_IMAGE_MOD_TIME: Time
      MARKETING_LITERATURE: Document
      MARKETING_LITERATURE_FORMAT: { T: "text" } | { H: "html" }
      MARKETING_DOC_IMAGE: Binary
      MARKETING_DOC_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      MARKETING_DOC_IMAGE_MOD_TIME: Time
      RECEIPT_MESSAGE: string
      PRODUCT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CARD: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      CARD_NUMBER: string
      CARD_SEQUENCE_NUMBER: string
      DESCRIPTION: string
      PRIMARY_ACCOUNT_SERIAL: Serial
      COMPANY_PERSON_SERIAL: Serial
      STATUS: { '-': "Not issued" } | { I: "Issued" } | { H: "Hot" }
      REASON_SERIAL: Serial
      PIN_TRY_COUNT: Count
      CARD_ACTIVATION_TIME: Time
      CARD_EXPIRATION_DATE: Date
      CARD_PRIOR_ACTIVATION_TIME: Time
      CARD_PRIOR_EXPIRATION_DATE: Date
      CANCELLATION_DATE: Date
      NEW_ISSUE_MONTHS: Count
      REISSUE_MONTHS: Count
      PREVIOUS_CARD_NUMBER: string
      REPLACEMENT_CARD_NUMBER: string
      ACCOUNT_UPDATER: { Y: "Opt-in" } | { N: "Opt-out" }
      OPEN_ACCT_RELSHIP_OPTION: { PA: "Card primary account" } | { CA: "Card access" }
      NTWK_CONNECT_INTERFACE_ACTION: { '-': "None" } | { U: "Update" }
      LAST_FM_DATE: Date
    }
    CARD_ACCESS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { SV: "Savings" } | { CK: "Checking" } | { CL: "Credit line" }
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      WITHDRAWAL_ACCESS: { N: "No" } | { Y: "Yes" }
      DEPOSIT_ACCESS: { Y: "Yes" } | { N: "No" } | { C: "Cash only" }
      INQUIRY_ACCESS: { N: "No" } | { Y: "Yes" }
      PURCHASE_ACCESS: { N: "No" } | { Y: "Yes" }
      THIRD_PARTY_ACCESS: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    CARD_DESIGN: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      VALUE: string
      CARD_PRINTER_FORMAT: string
      FRONT_IMAGE_PATH_NAME: string
      BACK_IMAGE_PATH_NAME: string
      LAST_FM_DATE: Date
    }
    CARD_LIMIT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { A: "ATM withdrawal" } | { P: "PIN purchase" } | { U: "Signature purchase" } | { V: "Signature cash advance" } | { F: "Interbank transfer debit" } | { B: "Bill payment" } | { D: "Deposit available" }
      USE_TYPE_LIMIT_DEFAULTS: { Y: "Yes" } | { A: "Override limiting" } | { N: "Override limiting and aggregating" }
      TYPE_LMT_OVR_EXPIRATION_DATE: Date
      ON_LINE_LIMIT_AMOUNT: Money
      ON_LINE_LIMIT_COUNT: Count
      MAXIMUM_AMOUNT: Money
      OFF_LINE_LIMIT_AMOUNT: Money
      OFF_LINE_LIMIT_COUNT: Count
      AGGREGATE_OPTION: { N: "None" } | { Y: "Primary Account" }
      ATM_WITHDRAWAL_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      PIN_PURCHASE_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      SIG_PURCHASE_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      SIG_CASH_ADVANCE_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      INRBNK_TRAN_DBT_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      BILL_PAYMENT_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      USAGE_DATE: Date
      USAGE_AMOUNT: Money
      USAGE_COUNT: Count
      AGGREGATE_USAGE_AMOUNT: Money
      AGGREGATE_USAGE_COUNT: Count
      LAST_FM_DATE: Date
    }
    CD_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    CARD_PLASTIC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PERSON_SERIAL: Serial
      PERSON_ADDRESS_LINK_SERIAL: Serial
      EMBOSS_FIRST_NAME: string
      EMBOSS_MIDDLE_NAME: string
      EMBOSS_LAST_NAME: string
      EMBOSS_SUFFIX: string
      EXTRA_EMBOSS_LINE: string
      DESIGN_SERIAL: Serial
      FRONT_IMAGE_ID: string
      BACK_IMAGE_ID: string
      ORIGINAL_CARD_ISSUE_DATE: Date
      CARD_ISSUE_DATE: Date
      PIN_ISSUE_DATE: Date
      PIN_OFFSET: string
      ISSUE_OPTION: { S: "Standard" } | { B: "Card and PIN" } | { C: "Card only" } | { P: "PIN only" }
      SPECIAL_HANDLING_SERIAL: Serial
      REISSUE_OPTION: { '-': "None" } | { A: "Automatic" }
      INSTANT_ISSUE_STATUS: { '-': "None" } | { N: "New issue" } | { R: "Reissue" } | { D: "Digital issue" }
      PIN_TRANSFER_CARD_NUMBER: string
      PIN_TRANSFER_PIN_OFFSET: string
      LAST_FM_DATE: Date
    }
    CARD_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      KEYBRIDGE_REASON: { '-': "None" } | { L: "Lost" } | { S: "Stolen" }
      ISO8583_RESPONSE_CODE: { '-': "None" } | { '04': "'04' Pickup" } | { '05': "'05' Return" } | { '41': "'41' Lost pickup" } | { T3: "'T3' Lost return" } | { '43': "'43' Stolen pickup" } | { '34': "'34' Suspected fraud pickup" } | { '59': "'59' Suspected fraud return" } | { '36': "'36' Restricted card pickup" } | { '62': "'62' Restricted card return" } | { '33': "'33' Expired card pickup" } | { '54': "'54' Expired card return" } | { '35': "'35' Contact acquirer pickup" } | { '60': "'60' Contact acquirer return" } | { '37': "'37' Call acquirer security pickup" } | { '66': "'66' Call acquirer security return" } | { '38': "'38' Allowable PIN tries exceeded pickup" } | { '75': "'75' Allowable PIN tries exceeded return" } | { '07': "'07' Special conditions pickup" } | { T6: "'T6' Special conditions return" } | { '67': "'67' Hard capture pickup" } | { '46': "'46' Closed account pickup" }
      ISO8583_ACTION_CODE: { '-': "None" } | { '200': "'200' Pickup" } | { '100': "'100' Return" } | { '208': "'208' Lost card pickup" } | { '209': "'209' Stolen card pickup" } | { '202': "'202' Suspected fraud pickup" } | { '102': "'102' Suspected fraud return" } | { '204': "'204' Restricted card pickup" } | { '104': "'104' Restricted card return" } | { '201': "'201' Expired card pickup" } | { '101': "'101' Expired card return" } | { '203': "'203' Contact acquirer pickup" } | { '103': "'103' Contact acquirer return" } | { '205': "'205' Call acquirer's security department pickup" } | { '105': "'105' Call acquirer's security department return" } | { '206': "'206' Allowable PIN tries exceeded pickup" } | { '106': "'106' Allowable PIN tries exceeded return" } | { '207': "'207' Special conditions pickup" } | { '108': "'108' Special conditions return" } | { '210': "'210' Special conditions return" } | { '107': "'107' Refer to card issuer return" }
      FORMAT8_CODE: { '-': "None" } | { AD: "'AD' Lost/Stolen capture" } | { ND: "'ND' Lost/Stolen return" } | { AE: "'AE' Fraud capture" } | { NE: "'NE' Fraud return" } | { AK: "'AK' Permanent restraint capture" } | { NK: "'NK' Permanent restraint return" } | { AL: "'AL' Bad debt capture" } | { NL: "'NL' Bad debt return" }
      CERTEGY_STATUS_CODE: { '-': "None" } | { A: "'A' Invalid address approve" } | { B: "'B' Bankruptcy pickup" } | { C: "'C' One cycle delinquent decline" } | { D: "'D' Deceased pickup" } | { F: "'F' Fraud pickup" } | { G: "'G' Marital problems pickup" } | { H: "'H' High balance approve" } | { I: "'I' VIP approve" } | { J: "'J' Collection account pickup" } | { K: "'K' Closed per institution pickup" } | { L: "'L' Lost account pickup" } | { N: "'N' Closed annual fee not paid decline" } | { P: "'P' Past due 5 days approve" } | { Q: "'Q' Charge off pickup" } | { S: "'S' Stolen account pickup" } | { U: "'U' Credit counseling pickup" } | { V: "'V' Closed see file pickup" } | { W: "'W' Closed transfer balance pickup" } | { X: "'X' Closed per cardholder decline" } | { Y: "'Y' Closed legal pursuit pickup" } | { Z: "'Z' Cardholder dispute approve" }
      ELAN_STATUS_CODE: { '-': "None" } | { C: "'C' Lost" } | { D: "'D' Stolen" } | { F: "'F' Closed" } | { G: "'G' Lost do not capture" } | { H: "'H' Stolen do not capture" }
      FIRST_DATA_STATUS_CODE: { '-': "None" } | { A: "'A' Authorization prohibited" } | { B: "'B' Bankrupt" } | { C: "'C' Account closed" } | { E: "'E' Revoked" } | { F: "'F' Frozen" } | { I: "'I' Interest prohibited" } | { L: "'L' Lost card" } | { U: "'U' Stolen or fraudulent card" } | { Z: "'Z' Charged off" }
      FIS_BLOCK_RECLASS_CODE: { '-': "None" } | { B1: "'B/1' Pending charge off" } | { B2: "'B/2' Pending charge off due to legal action" } | { B3: "'B/3' Pending charge off in collections" } | { B4: "'B/4' Pending charge off in recovery" } | { B5: "'B/5' Pending charge off in bankruptcy chapter 13" } | { B6: "'B/6' Pending charge off in bankruptcy chapter 11" } | { B7: "'B/7' Pending charge off in bankruptcy chapter 7" } | { B8: "'B/8' Pending charge off in credit counseling" } | { B9: "'B/9' Pending charge off in collection payout plan" } | { B0: "'B/0' Charged off by system" } | { BB: "'B/B' Charged off due to bank request" } | { BD: "'B/D' Charged off due to death" } | { BF: "'B/F' Charged off due to fraud" } | { BL: "'B/L' Charged off settled for less" } | { BM: "'B/M' Charged off due to medical reasons" } | { BR: "'B/R' Charged off due to refusal to pay" } | { BZ: "'B/Z' Charged off due to miscellaneous reasons" } | { D0: "'D/0' Dead file account (subject to a charge off)" } | { D7: "'D/7' Dead file; Chapter 7 bankruptcy" } | { PX: "'P/X' Pick up card - Customer request" } | { SN: "'S/N' Lost/stolen cardholder did not receive card" } | { SS: "'S/S' Lost/stolen" } | { SF: "'S/F' Lost/stolen fraud" } | { '-S': "'-/S' Temporary lost/stolen" } | { XS: "'X/S' Temporary lost/stolen pending cardholder contact" } | { SP: "'S/P' Account blocked through Compromise Manager" } | { V_: "'V/_' Canceled Card" } | { VA: "'V/A' Canceled within 5 days from open" } | { VB: "'V/B' Canceled per cardholder request general decline" } | { VC: "'V/C' Canceled in collections" } | { VD: "'V/D' Canceled pick up deceased" } | { VG: "'V/G' Canceled marital request" } | { VH: "'V/H' Canceled due to high balance" } | { VI: "'V/I' Canceled per cardholder's death pickup" } | { VJ: "'V/J' Canceled per cardholder}|{ change in terms refused" } | { VO: "'V/O' Canceled per change in marital status pickup" } | { VP: "'V/P' Canceled by the institution general decline" } | { VT: "'V/T' Canceled by the institution pickup" } | { VU: "'V/U' Canceled due to account transfer" } | { VX: "'V/X' Canceled per cardholder request pickup" } | { VW: "'V/W' Canceled due to an ICS alert" } | { FX: "'F/X' Fixed payment account" } | { '-A': "'-/A' Address irregularity" } | { '-C': "'-/C' Account past due" } | { XH: "'X/H' Account overlimit" } | { ZQ: "'Z/Q' Monitoring account security" }
      FISERV_STATUS_CODE: { '-': "None" } | { '00': "'00' Restricted" } | { AB: "'AB' Abused capture" } | { ab: "'AB' Abused deactivated" } | { CL: "'CL' Account closed capture" } | { cl: "'CL' Account closed deactivated" } | { CR: "'CR' Customer request capture" } | { cr: "'CR' Customer request deactivated" } | { DM: "'DM' Card damaged capture" } | { dm: "'DM' Card damaged deactivated" } | { LS: "'LS' Card lost capture" } | { ls: "'LS' Card lost deactivated" } | { RV: "'RV' Card revoked capture" } | { rv: "'RV' Card revoked deactivated" } | { ST: "'ST' Card stolen capture" } | { st: "'ST' Card stolen deactivated" }
      SHAZAM_STATUS_CODE: { '-': "None" } | { B: "'B' Block" } | { '0': "'0' No fraud" } | { '1': "'1' Do not honor" } | { '2': "'2' Fraud" } | { '3': "'3' Lost" } | { '4': "'4' Stolen" } | { '5': "'5' No action" }
      STAR_STATUS_CODE: { '-': "None" } | { A: "'A' Active" } | { B: "'B' Blocked" } | { C: "'C' Closed" } | { D: "'D' To be deleted" } | { L: "'L' Lost" } | { M: "'M' Misuse" } | { S: "'S' Skeleton" } | { T: "'T' Stolen/Theft" } | { W: "'W' Warm" }
      VANTIV_BLOCK_CODE: { '-': "None" } | { '01': "'01' Stolen" } | { '02': "'02' Pick up lost plastic" } | { '03': "'03' Revoked}|{ return of plastic requested" } | { '04': "'04' Close}|{ stop card activity" } | { '21': "'21' Signature prohibited (debit only)" } | { '22': "'22' Card not activated (debit only)" } | { '30': "'30' Block ATM and audio transactions (ATM only)" } | { '31': "'31' Block ATM transactions (ATM only)" } | { '32': "'32' Block audio transactions (ATM only)" }
      UPDATE_OPTION: { S: "Standard" } | { R: "Primary and regional network(s)" } | { N: "Primary and national network" } | { B: "Primary and regional and national networks" }
      LAST_FM_DATE: Date
    }
    CARD_SPECIAL_HANDLING: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      FIRST_DATA_MAIL_REASON: { '-': "None" } | { B1: "'B1' Mail first class to you" } | { BA: "'BA' Mail Airborne class to you" } | { BC: "'BC' Mail certified to you" } | { BF: "'BF' Mail Federal Express to you" } | { BP: "'BP' Mail postal express to you" } | { BR: "'BR' Mail registered to you" } | { C1: "'C1' Mail first class to cardholder" } | { CA: "'CA' Mail Airborne class to cardholder" } | { CC: "'CC' Mail certified to cardholder" } | { CF: "'CF' Mail Federal Express to cardholder" } | { CP: "'CP' Mail postal express to cardholder" } | { CR: "'CR' Mail registered to cardholder" } | { DC: "'DC' Daily mass without mailers" } | { DM: "'DM' Daily mass" } | { DR: "'DR' Daily reissue" } | { DS: "'DS' Daily reissue without mailers" }
      FISERV_RUSH_DELIVERY_METHOD: { '-': "None" } | { O: "'O' Overnight" } | { R: "'R' Regular Mail" }
      LAST_FM_DATE: Date
    }
    CARD_TOKEN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TOKEN_NUMBER: string
      STATUS: { U: "Unknown" } | { D: "Deactivated" } | { A: "Activated" } | { I: "Inactivated" } | { S: "Suspended" }
      TOKEN_EXPIRATION_DATE: Date
      TOKEN_REQUESTER_ID: string
      WALLET_PROVIDER: { U: "Unknown" } | { A: "Apple Pay" } | { G: "Google Pay" } | { N: "Android Pay" } | { S: "Samsung Pay" } | { V: "Visa Checkout" } | { F: "Fitbit Pay" } | { R: "Garmin Pay" } | { M: "Merchant tokenization program" } | { m: "Microsoft Wallet" }
      DEVICE_NAME: string
      DEVICE_TYPE: { U: "Unknown" } | { M: "Mobile phone" } | { T: "Tablet" } | { W: "Watch" } | { WB: "Wristband" } | { KF: "Key fob" } | { C: "Card" } | { MW: "MNO (mobile network operators) wallet" } | { MT: "Mobile tag" } | { MC: "Mobile case" } | { PC: "Personal computer" } | { CL: "Cloud" } | { FA: "Fashion accessory" } | { HA: "Home appliance" } | { MG: "Media/Gaming device" } | { V: "Vehicle" } | { O: "Other" }
      DEVICE_ID: string
      LAST_STATUS_TIME: Time
      LAST_STATUS_LOCAL_DATE: Date
      LAST_STATUS_LOCAL_TIME_TEXT: string
      LAST_FM_DATE: Date
    }
    CARD_TRAVEL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TRAVEL_START_DATE: Date
      TRAVEL_END_DATE: Date
      CATEGORY: { I: "International" } | { D: "Domestic" }
      COUNTRY_CODE: string
      STATE_CODE: string
      DESCRIPTION: string
      COMMENT: string
      LAST_FM_DATE: Date
    }
    CARD_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { A: "ATM" } | { v: "Visa Debit" } | { V: "Visa Credit" } | { m: "MasterCard Debit" } | { M: "MasterCard Credit" } | { d: "Discover Debit" } | { D: "Discover Credit" } | { P: "Pseudo" }
      INTENDED_USE: { P: "Personal" } | { B: "Business" }
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      PLASTIC_OPTION: { C: "Single plastic per card number" } | { S: "Single plastic per card number and sequence number" } | { M: "Multiple plastics per card number" }
      BIN: string
      CARD_NUMBER_LENGTH: Count
      CARD_NUMBER_FORMAT: string
      CARD_NUMBER_RANGE_LENGTH: Count
      CARD_NUMBER_RANGES: string
      AUTOMATIC_NUMBERING_SERIAL: Serial
      CARD_NUMBER_ASSIGNMENT: { A: "Automatic" } | { M: "Manual" }
      INVENTORY_TYPE_SERIAL: Serial
      CARD_SEQUENCE_NUMBER_POSITION: Count
      CARD_SEQUENCE_NUMBER_LENGTH: Count
      CARD_NUMBER_HISTORY_MASK: string
      EMBOSS_LINE_LENGTH: Count
      ACTIVATION_REQUIRED: { N: "No" } | { Y: "Yes" }
      ACTIVATE_ON_CORRECT_PIN: { N: "No" } | { Y: "Yes" }
      EXPIRATION_MATCH_REQUIRED: { N: "No" } | { Y: "Yes" }
      MESSAGE_EXPIRATION_VALIDATION: { N: "No" } | { Y: "Yes" }
      CANCEL_PREVIOUS_CARD: { N: "No" } | { Y: "Yes" }
      ALLOWABLE_PIN_TRY_COUNT: Count
      FUNDING_CARD_ACCESS_CATEGORY: { '-': "None" } | { SV: "Savings" } | { CK: "Checking" } | { CS: "Checking then savings" } | { CL: "Credit line" }
      CARD_ACCESS_RESTRICTION: { '-': "None" } | { P: "Savings and loans under card primary account" }
      CARD_ISSUE_METHOD: { B: "Batch" } | { I: "Instant" } | { P: "Printer dependent" }
      DIGITAL_ISSUE_OPTION: { N: "Not allowed" } | { A: "Allowed" }
      CARD_PRINTER_FORMAT: string
      CARD_EXPIRATION_ASSIGNMENT: { A: "Automatic" } | { M: "Manual" } | { F: "Forced" }
      FORCED_EXPIRATION_DATE: Date
      NEW_ISSUE_MONTHS: Count
      REISSUE_MONTHS: Count
      REISSUE_ACTIVITY_MONTHS: Count
      REISSUE_DAYS_BEFORE_EXPIRATION: Count
      EXPIRATION_MONTH: Count
      SUPP_PLASTIC_ADDL_EXP_MONTHS: Count
      FORCED_RE_CARD_EXP_DATE_CALC: { S: "Card expiration date plus supplemental plastic additional expiration months" } | { R: "Posting date plus reissue months" }
      CANCEL_AFTER_DAYS: Count
      CARD_ACCESS_CLSD_REASON_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CARD_TYPE_ACCESS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { SV: "Savings" } | { CK: "Checking" } | { CL: "Credit line" }
      MAXIMUM_RECORD_COUNT: Count
      LAST_FM_DATE: Date
    }
    CARD_TYPE_ACCESS_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARE_TYPE_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CARD_TYPE_DESIGN_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESIGN_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CARD_TYPE_LIMIT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { A: "ATM withdrawal" } | { P: "PIN purchase" } | { U: "Signature purchase" } | { V: "Signature cash advance" } | { F: "Interbank transfer debit" } | { B: "Bill payment" } | { D: "Deposit available" }
      ON_LINE_LIMIT_AMOUNT: Money
      ON_LINE_LIMIT_COUNT: Count
      MAXIMUM_AMOUNT: Money
      OFF_LINE_LIMIT_AMOUNT: Money
      OFF_LINE_LIMIT_COUNT: Count
      AGGREGATE_OPTION: { N: "None" } | { Y: "Primary Account" }
      ATM_WITHDRAWAL_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      PIN_PURCHASE_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      SIG_PURCHASE_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      SIG_CASH_ADVANCE_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      INRBNK_TRAN_DBT_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      BILL_PAYMENT_AGGR_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    CARD_TYPE_LIMIT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      RELATIONSHIP_SERIAL: Serial
      ON_LINE_LIMIT_AMOUNT: Money
      ON_LINE_LIMIT_COUNT: Count
      MAXIMUM_AMOUNT: Money
      OFF_LINE_LIMIT_AMOUNT: Money
      OFF_LINE_LIMIT_COUNT: Count
      LAST_FM_DATE: Date
    }
    CARD_TYPE_SPEC_HANDLING_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SPECIAL_HANDLING_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CASH_DRAWER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { T: "Teller drawer" } | { V: "Vault" } | { C: "Cash transfer clearing" } | { X: "External cash source" }
      BRANCH_SERIAL: Serial
      COINS: Money
      PENNIES: Money
      NICKELS: Money
      DIMES: Money
      QUARTERS: Money
      HALF_DOLLARS: Money
      ONE_DOLLAR_COINS: Money
      ROLLED_PENNIES: Money
      ROLLED_NICKELS: Money
      ROLLED_DIMES: Money
      ROLLED_QUARTERS: Money
      ROLLED_HALF_DOLLARS: Money
      ROLLED_ONE_DOLLAR_COINS: Money
      BOXED_ROLLED_PENNIES: Money
      BOXED_ROLLED_NICKELS: Money
      BOXED_ROLLED_DIMES: Money
      BOXED_ROLLED_QUARTERS: Money
      BOXED_ROLLED_HALF_DOLLARS: Money
      BOXED_ROLLED_ONE_DOLLAR_COINS: Money
      ONE_DOLLAR_BILLS: Money
      TWO_DOLLAR_BILLS: Money
      FIVE_DOLLAR_BILLS: Money
      TEN_DOLLAR_BILLS: Money
      TWENTY_DOLLAR_BILLS: Money
      FIFTY_DOLLAR_BILLS: Money
      HUNDRED_DOLLAR_BILLS: Money
      MUTILATED_AMOUNT: Money
      BAIT_AMOUNT: Money
      CASH_AMOUNT: Money
      CASH_AMT_SYS: Money
      CASH_OVER_SHORT_AMT_POSTED: Money
      CASH_OVER_SHORT_CMT_POSTED: string
      CHECKS_RECEIVED_AMOUNT: Money
      CHECKS_RECEIVED_AMT_SYS: Money
      ON_US_CHECKS_RECEIVED_AMOUNT: Money
      ON_US_CHECKS_RECEIVED_AMT_SYS: Money
      BONDS_REDEEMED_AMOUNT: Money
      BONDS_REDEEMED_AMT_SYS: Money
      MONEY_ORDERS_SOLD_AMOUNT: Money
      MONEY_ORDERS_SOLD_AMT_SYS: Money
      TRAVELERS_CHECKS_SOLD_AMOUNT: Money
      TRAVELERS_CHECKS_SOLD_AMT_SYS: Money
      BALANCING_STATUS: { O: "Drawer open" } | { C: "Drawer closed" }
      BALANCING_DATE: Date
      BALANCING_TIME: Time
      CASH_GL_SERIAL: Serial
      CK_RCV_GL_SERIAL: Serial
      BK_CK_RCV_GL_SERIAL: Serial
      BK_CASH_RCV_GL_SERIAL: Serial
      BR_PRI_GL_SERIAL: Serial
      BR_INT_GL_SERIAL: Serial
      OVER_SHORT_GL_SERIAL: Serial
      CASH_TRANSFER_GL_SERIAL: Serial
      HOLDUP_GL_SERIAL: Serial
      HOLDUP_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    CASH_MACHINE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { D: "Note dispenser" } | { C: "Note and coin dispenser" } | { R: "Recycler" } | { r: "Recycler and coin dispenser" }
      BRANCH_SERIAL: Serial
      LEFT_CASH_DRAWER_SERIAL: Serial
      RIGHT_CASH_DRAWER_SERIAL: Serial
      MIDDLE_CASH_DRAWER_SERIAL: Serial
      IDENTIFIER: string
      LAST_FM_DATE: Date
    }
    CASH_TRANSFER_REQUEST: {
      SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { R: "Requested" } | { F: "Cash has been disbursed" } | { T: "Cash has been received" } | { B: "Both halves have been posted" } | { X: "External transfer has been posted" }
      REQUEST_USER_SERIAL: Serial
      REQUEST_TIME: Time
      FROM_CASH_DRAWER_SERIAL: Serial
      TO_CASH_DRAWER_SERIAL: Serial
      PENNIES: Money
      NICKELS: Money
      DIMES: Money
      QUARTERS: Money
      HALF_DOLLARS: Money
      ONE_DOLLAR_COINS: Money
      ROLLED_PENNIES: Money
      ROLLED_NICKELS: Money
      ROLLED_DIMES: Money
      ROLLED_QUARTERS: Money
      ROLLED_HALF_DOLLARS: Money
      ROLLED_ONE_DOLLAR_COINS: Money
      BOXED_ROLLED_PENNIES: Money
      BOXED_ROLLED_NICKELS: Money
      BOXED_ROLLED_DIMES: Money
      BOXED_ROLLED_QUARTERS: Money
      BOXED_ROLLED_HALF_DOLLARS: Money
      BOXED_ROLLED_ONE_DOLLAR_COINS: Money
      ONE_DOLLAR_BILLS: Money
      TWO_DOLLAR_BILLS: Money
      FIVE_DOLLAR_BILLS: Money
      TEN_DOLLAR_BILLS: Money
      TWENTY_DOLLAR_BILLS: Money
      FIFTY_DOLLAR_BILLS: Money
      HUNDRED_DOLLAR_BILLS: Money
      UNSPECIFIED_DENOMINATION: Money
      MUTILATED_AMOUNT: Money
      BAIT_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    CU_CDD_PERSONAL_ACC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DNCU_CDD_MONTH_DW: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      DNCU_CDD_TRANS_ASSETS: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      DNCU_CDD_FREQ_TRAV: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      CDD_NR_ALIEN: { YES: "CDD Personal Account Question Yes" } | { NOO: "CDD Personal Account Question No" } | { SEL: "CDD Personal Account Question Default" }
      LAST_FM_DATE: Date
    }
    CD_PEN_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FORMULA: { STD: "Dividend days" } | { REM: "Dividend remaining term" } | { WDP: "Withdrawal percentage" }
      PENALTY_DAY_COUNT: Count
      PENALTY_LIMITED_TO_DAYS_OPEN: { N: "No" } | { Y: "Yes" }
      OPEN_DATE_GRACE_DAYS: Count
      FACTOR: Rate
      PENALTY_RATE: Rate
      ADDITIONAL_AMOUNT: Money
      MINIMUM_PENALTY: Money
      MAXIMUM_PENALTY: Money
      DIVIDEND_WITHDRAWAL_OPTION: { N: "No penalty" } | { T: "No penalty if transferred when paid" }
      WAIVE_MAXIMUM_COUNT: Count
      WAIVE_MAXIMUM_PERCENT: Rate
      WAIVE_MINIMUM_OPEN_DAYS: Count
      LAST_FM_DATE: Date
    }
    CU_CHARGE_OFF_REQUEST: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CO_ACCOUNT_SERIAL: Serial
      CO_LOAN_SERIAL: Serial
      CO_SHARE_SERIAL: Serial
      CHARGE_OFF_TYPE: { '-': "default" } | { E: "External" } | { I: "Internal" } | { N: "Negative" }
      CO_LOAN_ID: string
      CO_CREATED_DATE: Date
      CO_STARTED_DATE: Date
      CO_COMPLETED_DATE: Date
      LAST_FM_DATE: Date
    }
    CHECK: {
      SERIAL: Serial
      ACCESS_KEY: string
      CHECK_ACCOUNT_SERIAL: Serial
      CHECK_NUMBER: string
      PAYEE: string
      PAYEE_PERSON_SERIAL: Serial
      PAYEE_SECOND_PERSON_SERIAL: Serial
      PAYEE_THIRD_PERSON_SERIAL: Serial
      PAYEE_FOURTH_PERSON_SERIAL: Serial
      MULTIPLE_PAYEE_OPTION: { O: "Or" } | { A: "And" }
      OFAC_CHECK_STATUS: { '-': "None" } | { U: "No person restriction" } | { N: "No match" } | { R: "Match rejected" }
      OFAC_CHECK_STATUS_EXPLANATION: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      CATEGORY: { '-': "Standard" } | { K: "Corporate check" } | { C: "Cashier's check" } | { O: "Money order" } | { SK: "Shared branch corporate check" } | { SC: "Shared branch cashier's check" } | { SO: "Shared branch money order" } | { P: "Accounts payable" } | { L: "Loan funding" } | { D: "Dividend" } | { M: "Maturity" } | { S: "Scheduled disbursement" } | { H: "Online banking" } | { A: "Audio response" }
      STATUS: { P: "Pending" } | { I: "Issued" } | { V: "Voided" } | { S: "Stop payment" } | { R: "Reconciled" } | { E: "Escheated" }
      AMOUNT: Money
      MEMO: string
      CREATION_DATE: Date
      ISSUE_DATE: Date
      VOID_DATE: Date
      STOP_PAYMENT_DATE: Date
      RECONCILE_DATE: Date
      ESCHEAT_DATE: Date
      TRACER: string
      REFERENCE: string
      TRANSACTION_SERIAL: Serial
      USER_SERIAL: Serial
      CHECK_STUB: string
      LAST_FM_DATE: Date
    }
    CHECK_HOLD_LEVEL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    CHECK_HOLD_POLICY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      HOLD_POLICY: { A: "All deposits" } | { C: "Case by case only" }
      AGGREGATE_OPTION: { A: "Account" } | { S: "Savings" }
      BUSINESS_DAY_OPTION: { B: "Federal Reserve business day" } | { C: "Calendar day" }
      ZERO_DAY_HOLD_OPTION: { I: "Immediate availability" } | { S: "Same banking day availability" }
      NEXT_DAY_AVAIL_OPTION: { O: "One day hold" } | { Z: "Zero day hold" }
      NEXT_DAY_AVAIL_AMOUNT: Money
      NEXT_DAY_AVAIL_AMOUNT_OPTION: { S: "Savings amount if larger than check hold policy amount" } | { C: "Check hold policy amount" }
      LARGE_DEPOSIT_AMOUNT: Money
      EXTRA_DAY_FOR_CASH_WD_AMOUNT: Money
      EXTRA_DAY_FOR_CASH_WD_TM_DAY: string
      EXTRA_DAY_FOR_CASH_WD_TM_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      NEXT_DAY_HOLD_DAYS: Count
      NEXT_DAY_LRG_DEP_HOLD_DAYS: Count
      NEXT_DAY_OTHER_EXCP_HOLD_DAYS: Count
      LOCAL_HOLD_DAYS: Count
      LOCAL_LRG_DEP_HOLD_DAYS: Count
      LOCAL_OTHER_EXCP_HOLD_DAYS: Count
      NON_LOCAL_HOLD_DAYS: Count
      NON_LOCAL_LRG_DEP_HOLD_DAYS: Count
      NON_LOCAL_OTHER_EXCP_HOLD_DAYS: Count
      P_ATM_HOLD_DAYS: Count
      P_ATM_LRG_DEP_HOLD_DAYS: Count
      P_ATM_OTHER_EXCP_HOLD_DAYS: Count
      P_ATM_NEXT_DAY_AVAIL_A_OPT: { S: "Savings amount if larger than check hold policy amount" } | { C: "Check hold policy amount" }
      NON_P_ATM_HOLD_DAYS: Count
      NON_P_ATM_LRG_DEP_HOLD_DAYS: Count
      NON_P_ATM_OTHER_EXCP_HOLD_DAYS: Count
      NON_P_ATM_NEXT_DAY_AVAIL_A_OPT: { S: "Savings amount if larger than check hold policy amount" } | { C: "Check hold policy amount" }
      NEW_ACCOUNT_HOLD_DAYS: Count
      MAX_CALENDAR_HOLD_DAYS: Count
      BASED_ON_RELATIONSHIP: { N: "No" } | { Y: "Yes" }
      BASED_ON_CHECK_HOLD_LEVEL: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    CHECK_HOLD_POLICY_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      RELATIONSHIP_SERIAL: Serial
      CHECK_HOLD_LEVEL_SERIAL: Serial
      CHECK_HOLD_POLICY_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CHECK_HOLD_ROUTING_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ROUTING_NUMBER: string
      ACCOUNT_NUMBER: string
      CATEGORY: { '-': "None" } | { D: "Next day" } | { L: "Local" } | { N: "Nonlocal" } | { P: "Proprietary ATM" } | { A: "Nonproprietary ATM" } | { O: "Other" }
      HOLD_DAYS_OPTION: { P: "Use policy hold days" } | { S: "Use specified hold days" }
      HOLD_DAYS: Count
      LAST_FM_DATE: Date
    }
    CHECK_HOLD_ROUTING_SET: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    CHECK_PRODUCTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      ROUTING_NUMBER: string
      ACCOUNT_NUMBER: string
      CHECK_NUMBER: string
      PAYEE: string
      PAYEE_PERSON_SERIAL: Serial
      PAYEE_ADDITIONAL_ADDRESS_LINE: string
      PAYEE_STREET: string
      PAYEE_CITY: string
      PAYEE_STATE: string
      PAYEE_POSTAL_CODE: string
      PAYEE_COUNTRY: string
      PAYEE_COUNTRY_CODE: string
      PAYEE_ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      PAYER: string
      PAYER_PERSON_SERIAL: Serial
      PAYER_ADDITIONAL_ADDRESS_LINE: string
      PAYER_STREET: string
      PAYER_CITY: string
      PAYER_STATE: string
      PAYER_POSTAL_CODE: string
      PAYER_COUNTRY: string
      PAYER_COUNTRY_CODE: string
      PAYER_ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      CATEGORY: { '-': "Member check" } | { B: "Blank member check" }
      STATUS: { P: "Pending" } | { I: "Issued" } | { R: "Cleared" } | { S: "Stopped" } | { C: "Closed account" } | { N: "NSF" } | { O: "Other return" }
      BILL_PAYMENT_SERIAL: Serial
      EXPORT_SET_SERIAL: Serial
      AMOUNT: Money
      REMITTANCE_ACCOUNT_NUMBER: string
      MEMO: string
      CREATION_DATE: Date
      ISSUE_DATE: Date
      STATUS_DATE: Date
      USE_BY_DAYS: Count
      USE_BY_GRACE_DAYS: Count
      CREDIT_CARD_BALANCE_CATEGORY: { C: "Cash advance" } | { P: "Purchase" } | { B: "Balance transfer" }
      SPLIT_INTEREST_TYPE_SERIAL: Serial
      CHANNEL: string
      CHECK_STUB: string
      LAST_FM_DATE: Date
    }
    DRAFT_RETURN_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      VALUE: string
      LAST_FM_DATE: Date
    }
    CHECK_ACCOUNT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      ROUTING_NUMBER: string
      ACCOUNT_NUMBER: string
      NEXT_CHECK_NUMBER: string
      CATEGORY: { '-': "Standard" } | { K: "Corporate check" } | { C: "Cashier's check" } | { O: "Money order" }
      CHECK_GL_SERIAL: Serial
      CHECK_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CHECK_FEE_SERIAL: Serial
      OFAC_CHECK_REQUIRED: { N: "No" } | { Y: "Yes" }
      ON_US_TRANSACTION: { A: "Allowed" } | { N: "Not allowed" }
      CK_DISBURSE_TRANSACTION: { A: "Allowed" } | { N: "Not allowed" }
      LAST_FM_DATE: Date
    }
    DRAFT_LOOKUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      ON_US_ROUTING_NUMBER_SERIAL: Serial
      ACCOUNT_NUMBER: string
      EXPIRATION_DATE: Date
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      CHECKING_ACCOUNT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    COLLATERAL_INSURANCE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { G: "GAP" } | { M: "MBP" } | { C: "Collision" } | { F: "Fire" } | { L: "Flood" } | { P: "PMI" } | { c: "CPI" } | { O: "Other" }
      COLLATERAL_CATEGORY: { G: "General" } | { V: "Vehicle" } | { R: "Real estate" } | { S: "Savings secured" } | { A: "Asset" } | { C: "Shared collateral" }
      VEHICLE_CATEGORY: { '-': "None" } | { A: "Automobile" } | { C: "Motorcycle" } | { B: "Boat" } | { M: "Motorhome" } | { T: "Trailer" } | { R: "Motor" }
      PROPERTY_CATEGORY: { '-': "None" } | { C: "Condo" } | { O: "Commercial" } | { M: "Mobile home" } | { R: "Residential" }
      COMPANY_PERSON_SERIAL: Serial
      AGENT: string
      AMOUNT: Money
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      FUNDING_DISCLOSURE_CATEGORY: { PC: "Paid to consumer" } | { CC: "Credited to consumer's account" } | { PI: "Property insurance" } | { LI: "Single premium life insurance" } | { DI: "Single premium disability insurance" } | { FF: "Filing fee" } | { FI: "Non-filing insurance" } | { PO: "Paid to other" }
      FUNDING_PORTION_RETAINED_OPT: { N: "No" } | { Y: "Yes" }
      FUNDING_PREPAID_FIN_CHG_OPT: { N: "No" } | { Y: "Yes" } | { M: "MAPR only" }
      FUNDING_STATEMENT_DESCRIPTION: string
      FUNDING_GL_COMMENT: string
      FUNDING_GL_REFERENCE: string
      CPI_CATEGORY: { '-': "None" } | { T: "Traditional" } | { S: "Single monthly premium" }
      PREMIUM_STMT_DESC: string
      PREMIUM_MAINT_OPTION: { '-': "None (Post premium only)" } | { L: "CPI loan" } | { P: "Increase payment amount to cover premium and interest" } | { O: "Increase payment amount to cover premium only" } | { M: "Recalculate maturity date" }
      LOAN_DEFAULTS_SERIAL: Serial
      MIN_PAYMENT_DUE_DATE_DAYS: Count
      MAX_PAYMENT_DUE_DATE_MONTHS: Count
      PREMIUM_AMORTIZATION_OPTION: { '-': "None" } | { N: "Specified number of months" } | { B: "Payoff on or before policy expiration" } | { A: "Payoff on or after policy expiration" } | { T: "Policy term and payment frequency" } | { M: "Recalculate maturity date" }
      PREMIUM_AMORTIZATION_MONTHS: Count
      FULL_REFUND_STMT_DESC: string
      FULL_REFUND_MAINT_OPTION: { '-': "None (Post refund only)" } | { LC: "Loan correction" } | { PM: "Post and recalculate maturity date" }
      PARTIAL_REFUND_STMT_DESC: string
      PARTIAL_REFUND_MAINT_OPTION: { '-': "None (Post refund only)" } | { LC: "Loan correction method payment amount" } | { CM: "Loan correction method maturity date" } | { PM: "Post and recalculate maturity date" }
      NOTE_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    COLLATERAL_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { G: "General" } | { V: "Vehicle" } | { R: "Real estate" } | { S: "Savings secured" } | { A: "Asset" } | { C: "Shared collateral" }
      VEH_TAXES_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_TITLE_LIC_REG_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_DOCUMENTATION_FEES_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_THEFT_DETERRENT_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_ENVIRONMENTAL_PKG_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_GAP_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_CREDIT_LIFE_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_CREDIT_DISABILITY_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_WARRANTY_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEH_OTH_BACK_END_FEES_LTV_OPT: { '-': "None" } | { F: "Front-End" } | { B: "Back-End" }
      VEHICLE_CATEGORY: { '-': "None" } | { A: "Automobile" } | { C: "Motorcycle" } | { B: "Boat" } | { M: "Motorhome" } | { T: "Trailer" } | { R: "Motor" }
      PROPERTY_CATEGORY: { '-': "None" } | { C: "Condo" } | { O: "Commercial" } | { M: "Mobile home" } | { R: "Residential" }
      ASSET_CATEGORY: { '-': "None" } | { I: "Invoice" } | { E: "Equipment" } | { Y: "Inventory" } | { S: "Security" }
      COLLATERAL_OPTION: { '-': "None" } | { R: "Collateral record required" }
      AIRES_CODE: string
      LAST_FM_DATE: Date
    }
    COLLATERAL_VALUATION_ITEM_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { I: "Ineligible item" }
      LAST_FM_DATE: Date
    }
    COLLECTION_ACTIVITY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      CATEGORY: { DQB: "Loan delinquency begun" } | { DQE: "Loan delinquency ended" } | { LOB: "Loan overlimit begun" } | { LOE: "Loan overlimit ended" } | { SNB: "Savings negative balance begun" } | { SNE: "Savings negative balance ended" } | { CRB: "Collection referral begun" } | { CRE: "Collection referral ended" } | { CPR: "Removed from collection" } | { PRM: "Promise made" } | { PRB: "Promise broken" } | { LPM: "Loan payment made" } | { SDM: "Savings deposit made" } | { CNG: "Collection notice generated" } | { LTG: "Letter generated" } | { OTH: "Other" }
      STATUS: { '-': "Normal" } | { V: "Voided" }
      EXPLANATION: string
      EFFECTIVE_DATE: Date
      BALANCE: Money
      CREDIT_LIMIT: Money
      OVER_LIMIT_AMOUNT: Money
      PAYMENT_DUE_DATE: Date
      PAYMENT_LAST_DATE: Date
      PAYMENT_AMOUNT: Money
      PAYMENT_PARTIAL_AMOUNT: Money
      PAYMENT_PAST_DUE_AMOUNT: Money
      PROMISE_DATE: Date
      PROMISE_AMOUNT: Money
      PROMISE_PAST_DUE_AMOUNT: Money
      TRANSACTION_SERIAL: Serial
      TRANSACTION_AMOUNT: Money
      TRANSACTION_INTEREST: Money
      TRANSACTION_IMPOUND: Money
      TRANSACTION_LATE_FEE: Money
      TRANSACTION_OTHER_CHARGES: Money
      COLLECTION_NOTICE_COUNT: Count
      LETTER_DESCRIPTION: string
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      VOIDED_DATE: Date
      VOIDED_TIME: Time
      VOIDED_USER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    COLLECTION_ACTIVITY_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { DQB: "Loan delinquency begun" } | { DQE: "Loan delinquency ended" } | { LOB: "Loan overlimit begun" } | { LOE: "Loan overlimit ended" } | { SNB: "Savings negative balance begun" } | { SNE: "Savings negative balance ended" } | { CRB: "Collection referral begun" } | { CRE: "Collection referral ended" } | { CPR: "Removed from collection" } | { PRM: "Promise made" } | { PRB: "Promise broken" } | { LPM: "Loan payment made" } | { SDM: "Savings deposit made" } | { CNG: "Collection notice generated" } | { LTG: "Letter generated" } | { OTH: "Other" }
      EXPLANATION: string
      LETTER_DESCRIPTION: string
      NEXT_WORK_DAYS: Count
      LAST_FM_DATE: Date
    }
    COLLECTION_ITEM: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      CATEGORY: { C: "System collection" } | { O: "Other" }
      ACCOUNT_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      STATUS: { A: "Active" } | { I: "Inactive" } | { C: "Closed" }
      STATUS_DATE: Date
      LAST_FM_DATE: Date
    }
    COLLECTION_ITEM_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      MIN_LOAN_DQ_DAYS: Count
      MIN_LOAN_DQ_AMOUNT: Money
      MIN_LOAN_FIRST_PMT_DQ_DAYS: Count
      MIN_LOAN_FIRST_PMT_DQ_AMOUNT: Money
      LOAN_CHARGE_OFF_OPTION: { N: "Do not track charge offs" } | { T: "Track charge offs" }
      MIN_LOAN_OVL_PERCENT: Rate
      MIN_LOAN_OVL_AMOUNT: Money
      MIN_SHARE_NEG_BAL_DAYS: Count
      MIN_SHARE_NEG_BAL_AMOUNT: Money
      MIN_SHARE_OVL_PERCENT: Rate
      MIN_SHARE_OVL_AMOUNT: Money
      SHARE_CHARGE_OFF_OPTION: { N: "Do not track charge offs" } | { T: "Track charge offs" }
      LN_DQ_BEG_AC_TY_SERIAL: Serial
      LN_DQ_END_AC_TY_SERIAL: Serial
      LN_OVL_BEG_AC_TY_SERIAL: Serial
      LN_OVL_END_AC_TY_SERIAL: Serial
      SH_NEG_BEG_AC_TY_SERIAL: Serial
      SH_NEG_END_AC_TY_SERIAL: Serial
      COLL_REF_BEG_AC_TY_SERIAL: Serial
      COLL_REF_END_AC_TY_SERIAL: Serial
      COLL_REMOVAL_AC_TY_SERIAL: Serial
      PROMISE_BROKEN_AC_TY_SERIAL: Serial
      LN_PMT_MADE_AC_TY_SERIAL: Serial
      SH_DEP_MADE_AC_TY_SERIAL: Serial
      COLL_NOT_AC_TY_SERIAL: Serial
      MAX_NEXT_WORK_DAYS_FUTURE: Count
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_PRIORITY: Count
      WORK_QUEUE_OPTION: { I: "Queue savings or loan" } | { A: "Queue account" }
      WORK_FLOW_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    COLLECTION_NOTICE_DEFINITION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      NOTICE_COUNT: Count
      DAYS_BETWEEN_NOTICES: Count
      FACT_ACT_OPTION: { '-': "None" } | { '1': "Notice B-1" } | { '2': "Notice B-2" }
      NOTICE_TEXT: string
      STATEMENT_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    COLLECTION_NOTICE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      MIN_LOAN_DQ_AMOUNT: Money
      MIN_SHARE_NEG_BAL_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    COLLECTION_QUEUE_CRITERIA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_PRIORITY: Count
      MIN_LOAN_DQ_DAYS: Count
      MAX_LOAN_DQ_DAYS: Count
      MIN_LOAN_BALANCE: Money
      MAX_LOAN_BALANCE: Money
      LOAN_FIRST_PAYMENT_OPTION: { I: "Ignore" } | { N: "No" } | { Y: "Yes" }
      LOAN_CHARGE_OFF_OPTION: { B: "Non-charge offs and charge offs" } | { N: "Non-charge offs only" } | { C: "Charge offs only" }
      MIN_SHARE_NEG_BAL_DAYS: Count
      MAX_SHARE_NEG_BAL_DAYS: Count
      MIN_SHARE_NEG_BAL_AMOUNT: Money
      MAX_SHARE_NEG_BAL_AMOUNT: Money
      SHARE_COURTESY_PAY_OPTION: { I: "Ignore" } | { N: "No" } | { Y: "Yes" }
      SHARE_CHARGE_OFF_OPTION: { B: "Non-charge offs and charge offs" } | { N: "Non-charge offs only" } | { C: "Charge offs only" }
      NOTE_TYPE_SERIAL: Serial
      COLL_REFERRAL_OPTION: { I: "Ignore" } | { N: "No" } | { Y: "Yes" }
      ACCT_ACCESS_RESTRICT_OPTION: { I: "Ignore" } | { N: "No" } | { Y: "Yes" }
      MIN_LAST_NAME_PREFIX: string
      MAX_LAST_NAME_PREFIX: string
      LAST_FM_DATE: Date
    }
    COLUMNS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      COLUMN_NAME: string
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      NULL_ALLOWED: { N: "No" } | { Y: "Yes" }
      CALCULATION: { '-': "None" } | { A: "Argument" } | { R: "Result" } | { C: "Action" }
      EXTRACT_FROM_DEFAULTS: { N: "No" } | { Y: "Yes" }
      DEFAULT_CONTENTS: string
      MAXIMUM_LENGTH: Count
      REFERENCE_TABLE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    COURTESY_PAY_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      FORMULA: { LAD: "Last ACH deposit" } | { AAD: "Average ACH deposit" } | { OFC: "Overdraft Fee Count" } | { PAC: "Courtesy Pay Limit plus pending ACH credits" } | { SNB: "Courtesy Pay Limit less negative savings balances" }
      MAXIMUM_AMOUNT: Money
      MAXIMUM_COUNT: Count
      TRANSACTION_PERIOD_DAYS: Count
      DQ_GRACE_DAYS: Count
      SHARE_TYPE_LIST_OPTION: { '-': "None" } | { I: "Include" } | { E: "Exclude" }
      NOTE_TYPE_LIST_OPTION: { '-': "None" } | { I: "Include" } | { E: "Exclude" }
      ACH_COMPANY_NAME_LIST_OPTION: { '-': "None" } | { I: "Include" } | { E: "Exclude" }
      LAST_FM_DATE: Date
    }
    COURTESY_PAY_CALC_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARE_TYPE_SERIAL: Serial
      NOTE_TYPE_SERIAL: Serial
      ACH_COMPANY_NAME: string
      LAST_FM_DATE: Date
    }
    COURTESY_PAY_RESTRICTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    COVENANT_ACTIVITY_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    COVENANT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      FREQUENCY: { '-': "None" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" }
      LAST_FM_DATE: Date
    }
    CC_CALCULATION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PURCHASE_BALANCE_COMP_METHOD: { AIN: "Average daily balance (including new transactions)" } | { AEN: "Average daily balance (excluding new transactions)" }
      CASH_ADV_BALANCE_COMP_METHOD: { AIN: "Average daily balance (including new transactions)" } | { AEN: "Average daily balance (excluding new transactions)" }
      BAL_XFR_BALANCE_COMP_METHOD: { AIN: "Average daily balance (including new transactions)" } | { AEN: "Average daily balance (excluding new transactions)" }
      INCLUDE_NEG_DAILY_BALANCES: { N: "No" } | { Y: "Yes" }
      INTEREST_RATE_PERIOD: { M: "Monthly" } | { D: "Daily with 365 factor" }
      PAYMENT_APPLICATION: { O: "Old balances then current balances" } | { C: "Current balances" }
      SAME_RATE_PAYMENT_ORDER: { CPB: "Cash advance}|{ purchase}|{ balance transfer" } | { CBP: "Cash advance}|{ balance transfer}|{ purchase" } | { PCB: "Purchase}|{ cash advance}|{ balance transfer" } | { PBC: "Purchase}|{ balance transfer}|{ cash advance" } | { BCP: "Balance transfer}|{ cash advance}|{ purchase" } | { BPC: "Balance transfer}|{ purchase}|{ cash advance" }
      PURCHASE_GRACE_OPTION: { '-': "None" } | { E: "Total old balance paid by due date" } | { S: "Total old balance paid by statement cutoff" }
      PURCHASE_GRACE_PMT_INTEREST: { P: "No interest on any portion of balance paid during grace" } | { F: "No interest on any portion of balance paid exiting grace" }
      CASH_ADV_GRACE_OPTION: { '-': "None" } | { E: "Total old balance paid by due date" } | { S: "Total old balance paid by statement cutoff" }
      CASH_ADV_GRACE_PMT_INTEREST: { P: "No interest on any portion of balance paid during grace" } | { F: "No interest on any portion of balance paid exiting grace" }
      BAL_XFR_GRACE_OPTION: { '-': "None" } | { E: "Total old balance paid by due date" } | { S: "Total old balance paid by statement cutoff" }
      BAL_XFR_GRACE_PMT_INTEREST: { P: "No interest on any portion of balance paid during grace" } | { F: "No interest on any portion of balance paid exiting grace" }
      CASH_ADVANCE_FEE_SERIAL: Serial
      BALANCE_TRANSFER_FEE_SERIAL: Serial
      MLA_REFUND_FEE_SERIAL: Serial
      DUE_DATE_ADJUSTMENT: { '-': "None" } | { R: "Advance due date if returns/credits cover old balance" }
      STMT_LATE_FEE_GRACE_DAYS: Count
      STMT_LATE_FEE_AMOUNT_MAXIMUM: Money
      STMT_PENALTY_INT_RATE_MAXIMUM: Rate
      LAST_FM_DATE: Date
    }
    CREDIT_PULL: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      BUREAU: { '-': "None" } | { X: "Experian" } | { T: "TransUnion" } | { Q: "Equifax" } | { C: "ChexSystems" }
      PRODUCT: { '-': "None" } | { XCP: "Experian Credit Profile" } | { XMS: "Experian MLA Standalone" } | { XFS: "Experian FastStart" } | { XAU: "Experian Address Update" } | { XBE: "Experian Bullseye" } | { XCR: "Experian Collection Report" } | { TCR: "TransUnion Credit Report" } | { TCC: "TransUnion Collection Credit Report" } | { TAR: "TransUnion Account Reporting Review" } | { TIP: "TransUnion Instant Prescreen" } | { THR: "TransUnion High Risk Fraud Search" } | { QCR: "Equifax Credit Report" } | { QMS: "Equifax MLA Standalone" } | { CCR: "ChexSystems Consumer Report" } | { CBR: "ChexSystems Business Report" } | { CBZ: "ChexSystems BizChex Report" }
      PRIMARY_PERSON_SERIAL: Serial
      PRIMARY_UNFREEZE_PIN: string
      PRIMARY_CREDIT_PULL_SERIAL: Serial
      SECONDARY_PERSON_SERIAL: Serial
      SECONDARY_UNFREEZE_PIN: string
      ADDITIONAL_PERSON_1_SERIAL: Serial
      ADDITIONAL_PERSON_1_CATEGORY: { '-': "None" } | { P: "Principal/Owner" } | { A: "Authorized signer" }
      ADDITIONAL_PERSON_2_SERIAL: Serial
      ADDITIONAL_PERSON_2_CATEGORY: { '-': "None" } | { P: "Principal/Owner" } | { A: "Authorized signer" }
      ADDITIONAL_PERSON_3_SERIAL: Serial
      ADDITIONAL_PERSON_3_CATEGORY: { '-': "None" } | { P: "Principal/Owner" } | { A: "Authorized signer" }
      ADDITIONAL_PERSON_4_SERIAL: Serial
      ADDITIONAL_PERSON_4_CATEGORY: { '-': "None" } | { P: "Principal/Owner" } | { A: "Authorized signer" }
      ADDITIONAL_PERSON_5_SERIAL: Serial
      ADDITIONAL_PERSON_5_CATEGORY: { '-': "None" } | { P: "Principal/Owner" } | { A: "Authorized signer" }
      X_BULLSEYE_ACCOUNT_NUMBER: string
      CREDIT_PULL_USER_SERIAL: Serial
      USER_SERIAL: Serial
      BRANCH_SERIAL: Serial
      STATUS: { Q: "Queued" } | { R: "Retry required" } | { C: "Cancelled" } | { F: "Failed" } | { P: "Pulled" } | { I: "Imported" }
      QUEUED_TIME: Time
      FINISHED_TIME: Time
      REQUEST_DOCUMENT: Document
      PRIMARY_RESPONSE_DOCUMENT: Document
      SECONDARY_RESPONSE_DOCUMENT: Document
      FOLLOWUP_ACTION: { '-': "None" } | { IO: "ChexSystems ID Verification Override" } | { IA: "ChexSystems ID Verification Actions" } | { IS: "ChexSystems ID Verification Account Status" } | { OO: "ChexSystems OFAC Override" }
      FOLLOWUP_VALUE: string
      FOLLOWUP_STATUS: { '-': "None" } | { Q: "Queued" } | { R: "Retry required" } | { C: "Cancelled" } | { F: "Failed" } | { P: "Completed" }
      FOLLOWUP_TIME: Time
      EXCEPTION_DESCRIPTION: string
      RETRY_COUNT: Count
      IMPORT_REQUEST_DOCUMENT: Document
      IMPORT_RESPONSE_DOCUMENT: Document
      LAST_FM_DATE: Date
    }
    CREDIT_PULL_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      PASSWORD_AUTO_RESET_OPTION: { N: "No" } | { Y: "Yes" }
      PASSWORD_AUTO_RESET_DAYS: Count
      PASSWORD_WARNING_DAYS: Count
      PASSWORD_EXPIRATION_DAYS: Count
      SERVER_USER_SERIAL: Serial
      SERVER_DEVICE_SERIAL: Serial
      RETRY_LIMIT: Count
      RETRY_WAIT_SECONDS: Count
      LAST_FM_DATE: Date
    }
    CREDIT_PULL_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      BUREAU: { '-': "None" } | { X: "Experian" } | { T: "TransUnion" } | { Q: "Equifax" } | { C: "ChexSystems" }
      PRODUCT: { '-': "None" } | { XCP: "Experian Credit Profile" } | { XMS: "Experian MLA Standalone" } | { XFS: "Experian FastStart" } | { XAU: "Experian Address Update" } | { XBE: "Experian Bullseye" } | { XCR: "Experian Collection Report" } | { TCR: "TransUnion Credit Report" } | { TCC: "TransUnion Collection Credit Report" } | { TAR: "TransUnion Account Reporting Review" } | { TIP: "TransUnion Instant Prescreen" } | { THR: "TransUnion High Risk Fraud Search" } | { QCR: "Equifax Credit Report" } | { QMS: "Equifax MLA Standalone" } | { CCR: "ChexSystems Consumer Report" } | { CBR: "ChexSystems Business Report" } | { CBZ: "ChexSystems BizChex Report" }
      HARD_PULL_OPTION: { N: "No" } | { Y: "Yes" }
      TESTING_MODE: { L: "Live" } | { T: "Test" }
      PERSON_SCORE_OPTION: { '-': "None" } | { I: "Import scores" }
      X_PREAMBLE: string
      X_SUBSCRIBER_CODE: string
      X_PRODUCT_USERNAME: string
      X_PRODUCT_PASSWORD: string
      X_ARF_VERSION: { '-': "None" } | { '06': "06" } | { '07': "07" }
      X_RM_FICO_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_BANK_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_FINANCE_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INSTALL_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_AUTO_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_BANK_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_FINANCE_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INSTALL_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_3_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_AUTO_3_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_BANK_3_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_FINANCE_3_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INSTALL_3_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_8_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_AUTO_8_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_BANK_8_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_9_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_AUTO_9_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_BANK_9_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_ADVANCED_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_ADVANCED_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_BANKRUPTCY_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INS_HO_F35_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INS_HO_F4_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INS_N_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INS_P_AUTO_G_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INS_S_AUTO_G_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FICO_INS_S_AUTO_M_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_BANKRUPTCY_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_BANKRUPTCY_PLUS_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_BANKRUPTCY_WATCH_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_COLLECT_SCORE_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_CREDIT_UNION_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_CROSS_VIEW_SCORE_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_FRAUD_SHIELD_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_INCOME_INSIGHT_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_NATIONAL_EQUIV_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_NATIONAL_RISK_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_OLD_NATIONAL_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_REC_SCORE_BANK_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_REC_SCORE_RTL_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_RETAIL_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_ROI_1_DIGIT_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_ROI_3_DIGIT_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_SURE_VIEW_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_SCOREX_PLUS_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_SCOREX_PLUS_2_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_TEC_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_TELE_RISK_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_VANTAGE_SCORE_OPTION: { N: "No" } | { Y: "Yes" }
      X_RM_VANTAGE_SCORE_40_OPTION: { N: "No" } | { Y: "Yes" }
      X_DEMO_ALL_OPTION: { N: "No" } | { Y: "Yes" }
      X_DEMO_PHONE_OPTION: { N: "No" } | { Y: "Yes" }
      X_DEMO_HO_CODE_OPTION: { N: "No" } | { Y: "Yes" }
      X_DEMO_DRV_LIC_OPTION: { N: "No" } | { Y: "Yes" }
      X_DEMO_GEO_CODE_OPTION: { N: "No" } | { Y: "Yes" }
      X_SCORE_PERCENTILE_OPTION: { N: "No" } | { Y: "Yes" }
      X_CROSS_VIEW_OPTION: { N: "No" } | { Y: "Yes" }
      X_NEW_CONSUMER_OPTION: { N: "No" } | { Y: "Yes" }
      X_DIRECT_CHECK_OPTION: { N: "No" } | { Y: "Yes" }
      X_PROFILE_SUMMARY_OPTION: { N: "No" } | { Y: "Yes" }
      X_FACS_PLUS_OPTION: { N: "No" } | { Y: "Yes" }
      X_FRAUD_SHIELD_OPTION: { N: "No" } | { Y: "Yes" }
      X_STAGG_SELECT_OPTION: { N: "No" } | { Y: "Yes" }
      X_HEALTHCARE_PROFILE_OPTION: { N: "No" } | { Y: "Yes" }
      X_AUTO_PROFILE_SUMMARY_OPTION: { N: "No" } | { Y: "Yes" }
      X_EMERGING_CRED_PROF_OPTION: { N: "No" } | { Y: "Yes" }
      X_MLA_OPTION: { N: "No" } | { Y: "Yes" }
      X_OFAC_OPTION: { N: "No" } | { Y: "Yes" }
      X_OFAC_MSG_OPTION: { N: "No" } | { Y: "Yes" }
      X_COLLECT_REP_STD_OPTION: { N: "No" } | { Y: "Yes" }
      X_COLLECT_REP_CRD_OPTION: { N: "No" } | { Y: "Yes" }
      X_COLLECT_REP_CUS_OPTION: { N: "No" } | { Y: "Yes" }
      X_CUSTOM_RISK_MODEL: string
      X_CUSTOM_RR_DASH_KEYWORD: string
      X_SOFT_PULL_ACCT_TYPE: string
      T_BUREAU_MARKET: string
      T_BUREAU_SUBMARKET: string
      T_INDUSTRY_CODE: string
      T_MEMBER_CODE: string
      T_SUBSCRIBER_PASSWORD: string
      T_SYSTEM_ID: string
      T_SYSTEM_PASSWORD: string
      T_VERSION: { '-': "None" } | { '4.0': "4.0" } | { '4.1': "4.1" }
      T_RM_FICO_95_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_AUTO_95_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANK_95_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_FINANCE_95_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_INSTALL_95_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_98_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_AUTO_98_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANK_98_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_FINANCE_98_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_INSTALL_98_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_04_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_AUTO_04_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANK_04_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_FINANCE_04_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_INSTALL_04_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_08_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_AUTO_08_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANK_08_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_09_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_AUTO_09_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANK_09_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_NEXT_GEN_00_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_NEXT_GEN_03_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANKRUPTCY_98_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_FICO_BANKRUPTCY_03_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_BANKRUPTCY_1_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_NEW_DELPHI_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_VANTAGE_SCORE_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_VANTAGE_SCORE_40_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_INC_EST_3_OPTION: { N: "No" } | { Y: "Yes" }
      T_RM_DEBT_INC_EST_3_OPTION: { N: "No" } | { Y: "Yes" }
      T_SCORE_PERCENTILE_OPTION: { N: "No" } | { Y: "Yes" }
      T_ARM_ALERT_OPTION: { N: "No" } | { Y: "Yes" }
      T_AUTH_USER_ALERT_OPTION: { N: "No" } | { Y: "Yes" }
      T_AUTO_SUMMARY_OPTION: { N: "No" } | { Y: "Yes" }
      T_CREDITOR_CONTACT_INFO_OPTION: { '-': "None" } | { P: "Phone search" } | { L: "Address and phone search" } | { N: "Do not perform search" }
      T_HIGH_RISK_FRAUD_ALERT_OPTION: { '-': "None" } | { B: "Codes and message text" } | { M: "Message text only" } | { Y: "Codes only" }
      T_ID_MGR_VERIFICATION_OPTION: { '-': "None" } | { B: "Codes and message text" } | { M: "Message text only" } | { Y: "Codes only" }
      T_INQUIRY_ANALYSIS_OPTION: { N: "No" } | { Y: "Yes" }
      T_LENDER_SCORE_DISC_OPTION: { N: "No" } | { Y: "Yes" }
      T_PHONE_APPEND_OPTION: { N: "No" } | { Y: "Yes" }
      T_SSN_ANALYSIS_OPTION: { N: "No" } | { Y: "Yes" }
      T_MLA_OPTION: { N: "No" } | { Y: "Yes" }
      Q_TRANSACTION_ID: string
      Q_CUSTOMER_NUMBER: string
      Q_SECURITY_CODE: string
      Q_CUSTOMER_CODE: string
      Q_MONTH_INQUIRY_LIMIT: { '-': "Default" } | { '3': "3 months" } | { '6': "6 months" } | { '9': "9 months" } | { '12': "12 months" }
      Q_VERSION: { '-': "None" } | { '5.0': "ISTS 5.0" } | { '6.0': "ISTS 6.0" } | { CCR_V1_0: "Consumer Credit Report 1.0" }
      Q_RM_BANKCARD_USAGE_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_05477_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_05478_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_05146_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_05147_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_02781_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_02782_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_02783_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_02784_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_02502_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BANKRUPT_NV_02503_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_09_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_09_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_09_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_09_MTG_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_09_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_09_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_09_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_09_MTG_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_50_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_50_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_50_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_50_FIN_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_BEACON_50_INST_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_50_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_50_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_50_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_50_FIN_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_BEACON_50_INST_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_CRED_CAP_INDEX_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_EN_DTI_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_EN_DTI_INST_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_EN_DTI_R_E_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_EN_DTI_OTH_REV_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_HOUSEHOLD_INCOME_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_INCOME_PREDICTOR_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_LOW_BAL_NV_SCORE_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_MULTI_SCREEN_20_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_PERSONAL_INCOME_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_PINNACLE_20_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_PINNACLE_20_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RECOVERY_INDEX_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RECOVERY_NV_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RECOVERY_LATE_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RISK_SCORE_30_O_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RISK_SCORE_30_P_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RISK_SCORE_98_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RISK_SCORE_98_ADJ_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RISK_SCORE_CR_99_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_RISK_SCORE_CR_99_A_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_SMART_SCORE_20_O_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_SMART_SCORE_20_P_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_STUDENT_LN_NV_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_SUBPRIME_RISK_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_VANTAGE_SCORE_20_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_VANTAGE_SCORE_40_AA_OPT: { N: "No" } | { Y: "Yes" }
      Q_RM_VANTAGE_SCORE_40_PR_OPT: { N: "No" } | { Y: "Yes" }
      Q_RM_FICO_V9_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_FICO_V9_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_FICO_V9_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_FICO_V9_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_FICO_V9_AUTO_OPTION: { N: "No" } | { Y: "Yes" }
      Q_RM_F_FICO_V9_BNKCRD_OPTION: { N: "No" } | { Y: "Yes" }
      Q_BEACON_OPTION: { N: "No" } | { Y: "Yes" }
      Q_DEFAULT_MODEL_OPTION: { N: "No" } | { Y: "Yes" }
      Q_ONLINE_DIRECTORY_OPTION: { N: "No" } | { Y: "Yes" }
      Q_CONSUMER_REF_LOC_OPTION: { N: "No" } | { Y: "Yes" }
      Q_ALERT_CONTACT_OPTION: { N: "No" } | { Y: "Yes" }
      Q_PMT_HIST_OPTION: { N: "No" } | { Y: "Yes" }
      Q_PMT_HIST_METRO2_OPTION: { N: "No" } | { Y: "Yes" }
      Q_R_B_P_ALL_OPTION: { N: "No" } | { Y: "Yes" }
      Q_R_B_P_BEACON_OPTION: { N: "No" } | { Y: "Yes" }
      Q_FRAUD_ADVISOR_OPTION: { N: "No" } | { Y: "Yes" }
      Q_ID_ADVISOR_PLUS_OPTION: { N: "No" } | { Y: "Yes" }
      Q_MARKET_MAX_OPTION: { N: "No" } | { Y: "Yes" }
      Q_MLA_OPTION: { N: "No" } | { Y: "Yes" }
      C_QUALIFILE_REPORT_OPTION: { N: "No" } | { Y: "Yes" }
      C_QUALIFILE_VERSION: { '-': "None" } | { N003: "N003" }
      C_STRATEGY_TYPE_INDICATOR: string
      C_IDV_REPORT_OPTION: { N: "No" } | { Y: "Yes" }
      C_OFAC_WATCH_REPORT_OPTION: { N: "No" } | { Y: "Yes" }
      C_BIZCHEX_REPORT_OPTION: { N: "No" } | { Y: "Yes" }
      C_BIZCHEX_VERSION: { '-': "None" } | { B001: "B001" }
      C_BIZCHEX_TRANSACTION_TYPE: { '-': "None" } | { B1: "BizChex with OFAC for business}|{ and IDV and OFAC for signers" } | { B2: "BizChex with OFAC for the business" } | { B3: "BizChex (no IDV and no OFAC)" }
      C_BIZCHEX_INDUSTRY_MARKET_TYPE: { '-': "None" } | { DPADDA: "Demand deposit accounts/demand deposit" } | { CRICAO: "Credit issuance/credit origination" }
      LAST_FM_DATE: Date
    }
    CREDIT_PULL_USER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      BUREAU: { '-': "None" } | { X: "Experian" } | { T: "TransUnion" } | { Q: "Equifax" } | { C: "ChexSystems" }
      USER_ID: string
      PASSWORD: string
      PASSWORD_CHANGE_TIME: Time
      PASSWORD_CHANGE_REQUIRED: { N: "No" } | { Y: "Yes" }
      X_OPERATOR_INITIALS: string
      LAST_FM_DATE: Date
    }
    CRED_REP_CODE_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { T: "Trade line account types" } | { C: "Trade line account types and industry codes" } | { S: "Trade line account types and industry codes and status codes" } | { I: "Industry codes" }
      CRED_REP_ACCOUNT_TYPES: string
      EXPERIAN_ACCOUNT_TYPES: string
      EXPERIAN_CONDITION_STATUS: string
      TRANSUNION_ACCOUNT_TYPES: string
      TRANSUNION_RATING_REMARK: string
      EQUIFAX_ACCOUNT_TYPES: string
      EQUIFAX_STATUS_NARRATIVE: string
      INDUSTRY_CODES: string
      LAST_FM_DATE: Date
    }
    CREDIT_REPORTING_CUTOFF: {
      SERIAL: Serial
      ACCESS_KEY: string
      REPORTER_IDENTIFICATION_NUMBER: string
      REPORTER_NAME: string
      REPORTER_ADDRESS: string
      REPORTER_PHONE_NUMBER: string
      EXPERIAN_PROGRAM_IDENTIFIER: string
      TRANSUNION_PROGRAM_IDENTIFIER: string
      EQUIFAX_PROGRAM_IDENTIFIER: string
      INNOVIS_PROGRAM_IDENTIFIER: string
      INCLUDE_ITINS: { N: "No" } | { Y: "Yes" }
      ACCOUNT_NUMBER_REORDER_FORMAT: { '-': "None" } | { T26T: "Tenth to second}|{ sixth to tenth" }
      SPC_CMT_AH_NOTE_TYPE_SERIAL: Serial
      REPORTING_DAY: Count
      LAST_REPORTING_DATE: Date
      NEXT_REPORTING_DATE: Date
      LAST_FM_DATE: Date
    }
    CREDIT_SCORING: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      LAST_FM_DATE: Date
    }
    CREDIT_SCORING_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CHARACTERISTIC: { CONST: "Constant" } | { CURRES: "Months at current residence" } | { CURJOB: "Months at current job" } | { HOUSNG: "Type of housing" } | { MTHINC: "Total gross monthly income" } | { CBTYPE: "Type of credit bureau report" } | { CBINQ6: "Number of inquiries 6 months or less" } | { FINQ: "Number of consumer finance inquiries in last 24 months" } | { CB36IR: "Number of 30 and 60 day ratings" } | { CB90DG: "Total number of 90 day trades and derogatory items" } | { PSTDUE: "Number of currently past due trades" } | { CFTRD: "Number of open consumer finance trades" } | { CBSAT: "Number of satisfactory ratings" } | { AGEOT: "Age of oldest trade in months" } | { TOTRAT: "Ratio of balance to high credit for revolving trades" }
      CLASSIFICATION: { CONST: "Constant" } | { MISSNG: "Missing" } | { OWNBUY: "Owns or buying" } | { ELSE: "All else" } | { NOREC: "No record" } | { INQ: "Inquiries only" } | { PUB: "Public records only" } | { INQPUB: "Inquiries and public records only" } | { TRADE: "Report with trades" } | { NOTRAD: "No trades of this type" } | { NOUSBL: "No usable revolving trades" } | { RATE: "Rate range" } | { COUNT: "Count range" } | { AMOUNT: "Amount range" } | { RETIRE: "Retired" }
      FROM_RATE: Rate
      FROM_COUNT: Count
      FROM_AMOUNT: Money
      POINTS: Count
      LAST_FM_DATE: Date
    }
    CURRENCY_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      DATE: Date
      PERSON_OPTION: { B: "On own behalf" } | { O: "Owner" } | { T: "Transactor" }
      PERSON_SERIAL: Serial
      PERSON_ID_SERIAL: Serial
      AMOUNT: Money
      AGGREGATE_AMOUNT: Money
    }
    CURRENCY_TRAN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      STATUS: { P: "Posted" } | { V: "Voided" }
      CATEGORY: { CR: "Cash received" } | { CD: "Cash disbursed" }
      AMOUNT: Money
      CTR_PRODUCED: { N: "No" } | { Y: "Yes" } | { D: "Deferred" }
    }
    CUSTOM_COLUMNS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      COLUMN_NAME: string
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      MAXIMUM_LENGTH: Count
      MAXIMUM_LENGTH_PENDING: Count
      MAXIMUM_LENGTH_ONLY: { N: "No" } | { Y: "Yes" }
      NUMERIC_ONLY: { N: "No" } | { Y: "Yes" }
      UPPERCASE_ONLY: { N: "No" } | { Y: "Yes" }
      NEGATIVE_ALLOWED: { N: "No" } | { Y: "Yes" }
      MAXIMUM_ABSOLUTE_VALUE: Count
      FUTURE_ALLOWED: { N: "No" } | { Y: "Yes" }
      CUSTOM_OPTION_DEF_SERIAL: Serial
      REFERENCE_TABLE_NAME: string
      FRGN_KEY_CONST_NAME_SUFFIX: string
      INCLUDE_IN_REL_RECORD_TREE: { N: "No" } | { Y: "Yes" }
      DFLT_CONTENTS: string
      DFLT_CONTENTS_PENDING: string
      DFLT_FRM_DFLTS_TABLE: { N: "No" } | { Y: "Yes" }
      DFLT_FRM_DFLTS_TABLE_PENDING: { N: "No" } | { Y: "Yes" }
      DFLT_FRM_TRN_DATE_TIME: { N: "No" } | { Y: "Yes" }
      DFLT_FRM_TRN_DATE_TIME_PENDING: { N: "No" } | { Y: "Yes" }
      NULL_ALLOWED: { N: "No" } | { Y: "Yes" }
      NULL_ALLOWED_PENDING: { N: "No" } | { Y: "Yes" }
      CHANGE_ON_INSERT_ONLY: { N: "No" } | { Y: "Yes" }
      INCLUDE_IN_ROW_DESCRIPTION: { N: "No" } | { Y: "Yes" }
      STATUS: { '-': "Normal" } | { PA: "Pending Add" } | { PD: "Pending Drop" } | { D: "Dropped" }
      LAST_FM_DATE: Date
    }
    CUSTOM_OPTIONS: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    CUSTOM_OPTION_VALUE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      VALUE: string
      STATUS: { '-': "Normal" } | { PA: "Pending Add" } | { PD: "Pending Drop" } | { D: "Dropped" }
      LAST_FM_DATE: Date
    }
    CUSTOM_TABLES: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      TABLE_NAME: string
      ACCESS_KEY_PREFIX: string
      PARENT_TABLE_NAME: string
      PARENT_TABLE_OPTION: { '-': "Normal" } | { S: "Maximum of one record per parent record" }
      STATUS: { '-': "Normal" } | { PA: "Pending Add" } | { PD: "Pending Drop" } | { D: "Dropped" }
      DEFAULTS_TABLE_NAME: string
      DEFAULTS_TABLE_STATUS: { '-': "Normal" } | { PA: "Pending Add" } | { PD: "Pending Drop" } | { D: "Dropped" }
      LAST_FM_DATE: Date
    }
    DEALER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEALER_NUMBER: string
      DEALER_PERSON_SERIAL: Serial
      ACTIVE_STATUS: { A: "Active" } | { I: "Inactive" }
      COMPENSATION_PLAN_SERIAL: Serial
      COMPENSATION_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" }
      ACH_ORIGINATION_COMPANY_SERIAL: Serial
      ACH_DFI_ROUTING_NUMBER: string
      ACH_DFI_ROUTING_NUMBER_DESC: string
      ACH_DFI_ACCOUNT_NUMBER: string
      ACH_DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      ACH_ENTRY_CLASS: { CCD: "CCD" } | { PPD: "PPD" }
      ACH_IDENTIFICATION_NUMBER: string
      ACH_NAME: string
      ACH_PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      ACH_PRENOTIFICATION_DATE: Date
      COMPENSATION_GL_SERIAL: Serial
      LOAN_FUND_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" } | { S: "Savings deposit" }
      LF_ACH_ORIG_COMPANY_SERIAL: Serial
      LF_ACH_DFI_ROUTING_NUMBER: string
      LF_ACH_DFI_ROUTING_NUMBER_DESC: string
      LF_ACH_DFI_ACCOUNT_NUMBER: string
      LF_ACH_DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      LF_ACH_ENTRY_CLASS: { CCD: "CCD" } | { PPD: "PPD" }
      LF_ACH_IDENTIFICATION_NUMBER: string
      LF_ACH_NAME: string
      LF_ACH_PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      LF_ACH_PRENOTIFICATION_DATE: Date
      LF_DEPOSIT_SHARE_SERIAL: Serial
      LF_GL_ACCOUNT_SERIAL: Serial
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      AUTOMATED_DECISIONING: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    DEALER_COMPENSATION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CALCULATION: { '-': "None" } | { F: "Flat" } | { M: "Markup" }
      EFFECTIVE_DATE: Date
      LN_FASB_91_TYPE_SERIAL: Serial
      BASED_ON_CREDIT_SCORE: { Y: "Credit Score" } | { P: "Paper Grade" } | { N: "No" }
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      BASED_ON_LTV: { N: "No" } | { Y: "Yes" }
      BASED_ON_LOAN_AMOUNT: { N: "No" } | { Y: "Yes" }
      BASED_ON_MARKET: { N: "No" } | { Y: "Yes" }
      MARKET_TYPE_SERIAL: Serial
      MAX_MARKUP: Rate
      COMPENSATION_RATE: Rate
      MIN_COMPENSATION: Money
      MAX_COMPENSATION: Money
      LAST_FM_DATE: Date
    }
    DEALER_COMPENSATION_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      MIN_SCORE: Count
      MAX_SCORE: Count
      PAPER_GRADE_SCALE_SERIAL: Serial
      MIN_LTV: Rate
      MAX_LTV: Rate
      MIN_LOAN_AMOUNT: Money
      MAX_LOAN_AMOUNT: Money
      MARKET_SERIAL: Serial
      COMPENSATION_RATE: Rate
      MIN_COMPENSATION: Money
      MAX_COMPENSATION: Money
      LAST_FM_DATE: Date
    }
    DEALER_COMP_PLAN: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    DEALER_COMP_PLAN_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      LOAN_TYPE_SERIAL: Serial
      COMPENSATION_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DEALER_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      DEALER_NUMBER_FORMAT: { N: "Numeric" } | { A: "Alphanumeric" }
      DEALER_NUMBER_MINIMUM_LENGTH: Count
      DEALER_NUMBER_MAXIMUM_LENGTH: Count
      LAST_FM_DATE: Date
    }
    DEBT_RATIO_EXCLUDE_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CRED_REP_CODE_GROUP_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DEBT_RATIO_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      NUMERATOR_OPTION: { P: "Payments" } | { B: "Balances" }
      DENOMINATOR_OPTION: { M: "Gross monthly income" } | { A: "Gross annual income" } | { L: "Credit limits" }
      INCLUDE_LOAN_REQUEST: { Y: "Yes" } | { N: "No" } | { O: "Only" }
      CRED_REP_CODE_GROUP_SERIAL: Serial
      RISK_POINT_HIGH: Rate
      RISK_POINT_MEDIUM: Rate
      LAST_FM_DATE: Date
    }
    DECISION_EXCEPTION_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { RL: "Rule" } | { RS: "Reason" }
      MEMBERSHIP_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LOAN_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    DECISION_MODEL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      DENIAL_DECISION_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DECISION_MODEL_CRITERIA: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      BASE_CRITERIA_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DECISION_MODEL_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CRITERIA_SERIAL: Serial
      APPROVAL_DECISION_TYPE_SERIAL: Serial
      SUBSEQUENT_STAGE_MODEL_SERIAL: Serial
      ADDITIONAL_APPROVAL_COUNT: Count
      APPROVAL_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    DECISION_MODEL_RULE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DATA_VALUE: { CRS: "Credit score" } | { PGD: "Paper grade" } | { AGE: "Applicant age" } | { MCA: "Months at current address" } | { MCE: "Months at current employer" } | { MEM: "Membership length in months" } | { OCC: "On-Us charge off count" } | { OCA: "On-Us charge off amount" } | { TRC: "Trade count" } | { TOC: "Trade open count" } | { TOM: "Trade opened in last X months count" } | { TOA: "Trade oldest age in months" } | { TSC: "Trade satisfactory count" } | { TSM: "Trade satisfactory and open for X months or more count" } | { TCC: "Trade collection count" } | { TCA: "Trade collection amount" } | { TDC: "Trade delinquent count" } | { TDA: "Trade delinquent amount" } | { TAC: "Trade delinquent $X or more count" } | { TXC: "Trade delinquent X days count" } | { TXM: "Trade delinquent X days or more count" } | { TMS: "Trade months since delinquent X days or more" } | { TXE: "Trade ever delinquent X days or more count" } | { THD: "Trade highest ever delinquent amount" } | { THC: "Trade highest high credit amount" } | { PRC: "Public record count" } | { TLC: "Tax lien count" } | { TLA: "Tax lien amount" } | { TTC: "Tax lien active count" } | { TTA: "Tax lien active amount" } | { JAC: "Judgment for $X or more count" } | { JTC: "Judgment for $X or more active count" } | { JDA: "Judgment amount" } | { JDT: "Judgment active amount" } | { BKC: "Bankruptcy count" } | { BUC: "Bankruptcy undismissed count" } | { BMD: "Bankruptcy months since discharge" } | { IQM: "Inquiry in last X months count" } | { CBM: "Credit bureau in-file-since months" } | { LOP: "Liability over X% of limit percentage" } | { LBL: "Liability balances to limits ratio" } | { LBA: "Liability balances" } | { LLA: "Liability limits" } | { LPA: "Liability payments" } | { INM: "Monthly income" } | { DBR: "Debt ratio" } | { LRA: "Loan request amount" } | { LTV: "Loan to value" } | { LXV: "Loan excluding collateral insurance to value" } | { LTI: "Loan to monthly income" } | { LTA: "Loan to annual income" } | { PTI: "Loan monthly payment to monthly income" } | { PTA: "Loan monthly payment to annual income" } | { TRM: "Term in months" } | { VAY: "Vehicle age in years" } | { VOM: "Vehicle odometer mileage" } | { VHR: "Vehicle hours" } | { PRG: "Product group" }
      DATA_VALUE_DESCRIPTION: string
      DATA_VALUE_REQUIRED: { N: "No" } | { Y: "Yes" }
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      APPLICANT_OPTION: { '-': "None" } | { A: "All applicants" } | { Y: "Any applicant" } | { P: "Primary applicant" } | { I: "Highest income applicant" } | { V: "Average of all applicants" }
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      DEBT_RATIO_TYPE_SERIAL: Serial
      CRED_REP_ECOA_OPTION: { '-': "None" } | { U: "Exclude authorized user" } | { T: "Exclude association terminated" } | { B: "Exclude authorized user and association terminated" }
      CRED_REP_CODE_FILTER_OPTION: { '-': "None" } | { I: "Include" } | { E: "Exclude" }
      CRED_REP_CODE_GROUP_SERIAL: Serial
      RATE_PARAMETER_1: Rate
      COUNT_PARAMETER_1: Count
      AMOUNT_PARAMETER_1: Money
      COMPARISON: { '-': "None" } | { EQ: "=" } | { NE: "!=" } | { GT: ">" } | { GE: ">=" } | { LT: "<" } | { LE: "<=" }
      RATE: Rate
      COUNT: Count
      AMOUNT: Money
      PAPER_GRADE_SERIAL: Serial
      PRODUCT_GROUP_SERIAL: Serial
      INCLUDE_LOAN_REQUEST: { Y: "Yes" } | { N: "No" } | { O: "Only" }
      LAST_FM_DATE: Date
    }
    DECISION_STIPULATION_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      MEMBERSHIP_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LOAN_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    DECISION_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { P: "Pending" } | { a: "Pending additional approval" } | { A: "Approved" } | { M: "Marked up" } | { D: "Denied" } | { C: "Countered" }
      DECISION_MAKER_USER_SERIAL: Serial
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      MEMBERSHIP_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LOAN_APP_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    DEPARTMENT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    DEVICE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEVICE_NAME: string
      CATEGORY: { L: "Login capable" } | { S: "System" } | { N: "System - no login tracking" }
      IDENTIFIER: string
      LAST_LOGIN_TIME: Time
      UNSUCCESSFUL_LOGIN_TIME: Time
      UNSUCCESSFUL_LOGIN_COUNT: Count
      LOGIN_LOCK: { N: "Not locked" } | { L: "Locked" }
      ROLE_SERIAL: Serial
      TEST_ROLE_SERIAL: Serial
      SHARED_BRANCH_DEVICE_ID: string
      BRANCH_SERIAL: Serial
      TIME_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      INTERACTION_CHANNEL_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DEVICE_CASH_MACHINE_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CASH_MACHINE_SERIAL: Serial
      CASH_MACHINE_SIDE: { L: "Left" } | { R: "Right" } | { M: "Middle" }
      CATEGORY: { L: "Local" } | { R: "Remote" }
      LAST_FM_DATE: Date
    }
    DEVICE_PRINTER_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PRINTER_SERIAL: Serial
      CATEGORY: { CHK: "Check" } | { REC: "Receipt" } | { CEN: "Check endorsement" } | { CPL: "Card plastic" } | { CSC: "Check scanner" } | { CAM: "Camera" } | { DCM: "Document manager" }
      LAST_FM_DATE: Date
    }
    DISPUTE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DISPUTE_NUMBER: string
      PERSON_SERIAL: Serial
      TYPE_SERIAL: Serial
      FRAUD_OPTION: { N: "No" } | { Y: "Yes" }
      BRANCH_SERIAL: Serial
      FRAUD_REPORT_DATE: Date
      OPEN_DATE: Date
      CLOSE_DATE: Date
      AGGREGATE_AMOUNT: Money
      REASON_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      CARD_SERIAL: Serial
      POSTING_ITEM_SERIAL: Serial
      OPENED_BY_USER_SERIAL: Serial
      LAST_WORKED_BY_USER_SERIAL: Serial
      BOND_CLAIM_NUMBER: string
      LAST_FM_DATE: Date
    }
    DISPUTE_ITEM: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      ORIGINAL_TRANSACTION_SERIAL: Serial
      ORIGINAL_MONETARY_SERIAL: Serial
      ORIGINAL_PROV_CRED_MON_SERIAL: Serial
      STAGE_SERIAL: Serial
      AMOUNT: Money
      NET_LOG_PAN: string
      NET_LOG_POSTING_DATE: Date
      NET_LOG_MERCHANT_NAME: string
      NET_LOG_MERCHANT_TYPE: string
      NET_LOG_POSTING_AMOUNT: Money
      NET_LOG_POS_CONDITION_CODE: string
      NET_LOG_CARDHOLDER_PRESENCE: { '-': "Unknown" } | { Y: "Present" } | { N: "Not present" } | { O: "Mail order/Telephone order" } | { R: "Recurring" }
      NET_LOG_ORIGINAL_DATE: Date
      PROVISIONAL_CREDIT_DATE: Date
      PROVISIONAL_CREDIT_EFF_DATE: Date
      PROVISIONAL_CREDIT_EXP_DATE: Date
      PROVISIONAL_CREDIT_AMOUNT: Money
      PROV_CRED_SHARE_SERIAL: Serial
      PROV_CRED_LOAN_SERIAL: Serial
      PROV_CRED_REASON_SERIAL: Serial
      REVER_PROV_CRED_DATE: Date
      REVER_PROV_CRED_EFF_DATE: Date
      REVER_PROV_CRED_AMOUNT: Money
      REVER_PROV_CRED_REASON_SERIAL: Serial
      MISC_DATE: Date
      MISC_AMOUNT: Money
      MISC_REASON_SERIAL: Serial
      WRITE_OFF_DATE: Date
      WRITE_OFF_AMOUNT: Money
      WRITE_OFF_REASON_SERIAL: Serial
      DIS_FILED_VCR_DATE: Date
      DIS_FILED_VCR_REASON_SERIAL: Serial
      DIS_RESP_VCR_DATE: Date
      DIS_RESP_VCR_AMOUNT: Money
      DIS_RESP_VCR_REASON_SERIAL: Serial
      CHARGEBACK_DATE: Date
      CHARGEBACK_AMOUNT: Money
      CHARGEBACK_REASON_SERIAL: Serial
      CHARGEBACK_EXPIRATION_DATE: Date
      CHARGEBACK_REJT_DATE: Date
      CHARGEBACK_REJT_AMOUNT: Money
      CHARGEBACK_REJT_REASON_SERIAL: Serial
      CHARGEBACK_REVER_DATE: Date
      CHARGEBACK_REVER_AMOUNT: Money
      CHARGEBACK_REVER_REASON_SERIAL: Serial
      REPRESENTMENT_DATE: Date
      REPRESENTMENT_AMOUNT: Money
      REPRESENTMENT_REASON_SERIAL: Serial
      INCOM_PRE_ARB_DATE: Date
      INCOM_PRE_ARB_REASON_SERIAL: Serial
      INCOM_PRE_ARB_RESP_DATE: Date
      INCOM_PRE_ARB_RESP_AMOUNT: Money
      INCOM_PRE_ARB_R_REASON_SERIAL: Serial
      PRE_ARB_DATE: Date
      PRE_ARB_REASON_SERIAL: Serial
      PRE_ARB_RESP_DATE: Date
      PRE_ARB_RESP_AMOUNT: Money
      PRE_ARB_RESP_REASON_SERIAL: Serial
      INCOM_ARB_DATE: Date
      INCOM_ARB_REASON_SERIAL: Serial
      INCOM_ARB_RESP_DATE: Date
      INCOM_ARB_RESP_AMOUNT: Money
      INCOM_ARB_R_REASON_SERIAL: Serial
      ARBITRATION_DATE: Date
      ARBITRATION_REASON_SERIAL: Serial
      ARBITRATION_RESP_DATE: Date
      ARBITRATION_RESP_AMOUNT: Money
      ARBITRATION_RESP_REASON_SERIAL: Serial
      GOOD_FAITH_DATE: Date
      GOOD_FAITH_REASON_SERIAL: Serial
      GOOD_FAITH_RESP_DATE: Date
      GOOD_FAITH_RESP_AMOUNT: Money
      GOOD_FAITH_RESP_REASON_SERIAL: Serial
      INCOM_PRE_COMP_DATE: Date
      INCOM_PRE_COMP_REASON_SERIAL: Serial
      INCOM_PRE_COMP_RESP_DATE: Date
      INCOM_PRE_COMP_RESP_AMOUNT: Money
      INCOM_PRE_COMP_R_REASON_SERIAL: Serial
      PRE_COMP_DATE: Date
      PRE_COMP_REASON_SERIAL: Serial
      PRE_COMP_RESP_DATE: Date
      PRE_COMP_RESP_AMOUNT: Money
      PRE_COMP_RESP_REASON_SERIAL: Serial
      INCOM_COMPLIANCE_DATE: Date
      INCOM_COMPLIANCE_REASON_SERIAL: Serial
      INCOM_COMP_RESP_DATE: Date
      INCOM_COMP_RESP_AMOUNT: Money
      INCOM_COMP_RESP_REASON_SERIAL: Serial
      COMPLIANCE_DATE: Date
      COMPLIANCE_REASON_SERIAL: Serial
      COMPLIANCE_RESP_DATE: Date
      COMPLIANCE_RESP_AMOUNT: Money
      COMPLIANCE_RESP_REASON_SERIAL: Serial
      SALES_DRFT_REQ_DATE: Date
      SALES_DRFT_REQ_REASON_SERIAL: Serial
      OPEN_DATE: Date
      OPEN_TIME: Time
      ESCALATION_TIME: Time
      CLOSE_DATE: Date
      WORK_TASK_SERIAL: Serial
      LAST_WORKED_BY_USER_SERIAL: Serial
      ACH_COMPANY_NAME: string
      ACH_COMPANY_ID: string
      EXTERNAL_CASE_NUMBER: string
      LAST_FM_DATE: Date
    }
    DP_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    DISPUTE_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      FORCE_ZERO_AMOUNT_ON_RESPONSE: { N: "No" } | { Y: "Yes" }
      OPEN_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      OPEN_FRAUD_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      PROV_CRED_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      RE_PROV_CRED_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      DIS_FILED_VCR_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      DIS_RESO_VCR_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      CGBK_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      CGBK_REJ_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      CGBK_REV_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      REPRESENTMENT_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_PRE_ARB_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_PRE_A_R_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      PRE_ARB_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      PRE_ARB_RESP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_ARB_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_ARB_R_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      ARB_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      ARB_RESP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      GD_FAITH_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      GD_FAITH_RESP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_PRE_COM_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_PRE_C_R_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      PRE_COM_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      PRE_COM_RESP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_COM_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INCOM_COM_R_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      COM_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      COM_RESP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      SALES_DRFT_RQ_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      MISC_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      WRITE_OFF_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      CLOSE_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    DISPUTE_RESPONSE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DISPUTE_TYPE_PROMPT_SERIAL: Serial
      RESPONSE: string
      TYPE_CHANGE_DATE: Date
      LAST_FM_DATE: Date
    }
    DISPUTE_STAGE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { O: "Open" } | { P: "In progress" } | { C: "Close" }
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      ESCALATION_POLICY_SERIAL: Serial
      BEGIN_SECURITY_EVENT_SERIAL: Serial
      UPDATE_SECURITY_EVENT_SERIAL: Serial
      END_SECURITY_EVENT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DIS_STAGE_ORDER_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      NEXT_DIS_STAGE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DISPUTE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { '-': "Standard" } | { C: "Card" }
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      ESCALATION_POLICY_SERIAL: Serial
      PROV_CREDIT_GL_ACCOUNT_SERIAL: Serial
      WRITE_OFF_GL_ACCOUNT_SERIAL: Serial
      GL_BRANCH_ACCOUNTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      POSTING_POLICY_SERIAL: Serial
      DEFAULT_REASON_SERIAL: Serial
      FRAUD_TYPE_OPTION: { B: "Both" } | { Y: "Yes" } | { N: "No" }
      INSERT_SCRIPT_SERIAL: Serial
      INS_FORM_TYPE_SERIAL: Serial
      FORM_PACKET_SERIAL: Serial
      INS_INTERACTION_TYPE_SERIAL: Serial
      INS_OPPORTUNITY_DFLT_SERIAL: Serial
      CLS_OPPORTUNITY_STAGE_SERIAL: Serial
      CLS_OPPORTUNITY_RES_TY_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DISPUTE_TYPE_GL_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CARD_TYPE_SERIAL: Serial
      GL_PURPOSE: { PC: "Provisional credit" } | { MI: "Miscellaneous" } | { WO: "Write off" } | { VCR: "Dispute response from VCR" } | { CB: "Chargeback" } | { CB_REJ: "Chargeback reject" } | { CB_REV: "Chargeback reversal" } | { R: "Representment" } | { IPA: "Incoming pre-arbitration response" } | { PA: "Pre-arbitration response" } | { IA: "Incoming arbitration response" } | { A: "Arbitration response" } | { GF: "Good faith response" } | { IPC: "Incoming pre-compliance response" } | { PCO: "Pre-compliance response" } | { IC: "Incoming compliance response" } | { CO: "Compliance response" }
      GL_ACCOUNT_SERIAL: Serial
      GL_BRANCH_ACCOUNTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    DISPUTE_TYPE_PROMPT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      STATUS: { O: "Open" } | { C: "Closed" }
      PROMPT_BODY: string
      RESPONSE_REQUIRED: { N: "No" } | { Y: "Yes" }
      STAGE_CATEGORY: { O: "Open" } | { P: "In progress" } | { C: "Close" }
      REASON_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DISPUTE_TYPE_SELECTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      MONETARY_SOURCE_SELECT: { N: "No" } | { Y: "Yes" }
      MONETARY_SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      POSTING_ITEM_SOURCE_SELECT: { N: "No" } | { Y: "Yes" }
      POSTING_ITEM_SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      CARDHOLDER_PRESENCE_SELECT: { N: "No" } | { Y: "Yes" }
      CARDHOLDER_PRESENCE: { '-': "Unknown" } | { Y: "Present" } | { N: "Not present" } | { O: "Mail order/Telephone order" } | { R: "Recurring" }
      DEVICE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DISPUTE_TYPE_STAGE_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DISPUTE_STAGE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DISTRIBUTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      METHOD: { T: "Deposit then transfer up to deposit amount" } | { U: "Deposit then transfer up to available amount" } | { D: "Distribute then deposit remainder" }
      PARTIAL_DEPOSIT_OPTION: { A: "Allowed" } | { F: "Full only" }
      PARTIAL_PAYMENT_OPTION: { A: "Allowed" } | { F: "Full only" }
      LAST_DISTRIBUTION_DATE: Date
      LAST_DISTRIBUTION_AMOUNT: Money
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    DI_TRANSFER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      METHOD: { S: "Savings transfer" } | { L: "Loan transfer" }
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      PERCENTAGE: Rate
      AMOUNT: Money
      AMOUNT_OVERRIDE: { '-': "None" } | { P: "Loan payment" } | { p: "Loan payment if it exceeds amount" } | { Q: "25% of Loan payment" } | { H: "50% of Loan payment" } | { D: "Loan due amount" } | { d: "Loan due amount if it exceeds amount" } | { B: "Loan cycle balance" } | { b: "Loan cycle balance if it exceeds amount" } | { C: "Loan cycle balance less credits" } | { c: "Loan cycle balance less credits if it exceeds amount" } | { A: "Available balance" } | { S: "Available balance in excess of amount" }
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      DONOR_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      RECIPIENT_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      SPECIFIED_WITHHOLDING_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_FEDERAL_WITHHOLD_AMT: Money
      SPECIFIED_FEDERAL_WITHHOLD_PCT: Rate
      SPECIFIED_STATE_WITHHOLD_AMT: Money
      SPECIFIED_STATE_WITHHOLD_PCT: Rate
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    DIV_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FORMULA: { D: "Daily balance method" } | { A: "Average daily balance method" }
      RATE_OPTION: { SFR: "Single fixed rate" } | { SCR: "Single custom rate" } | { PTR: "Plateau tiered-rate" } | { STR: "Split-rate tiered-rate" }
      SINGLE_FIXED_RATE: Rate
      COMPOUNDING: { '-': "None" } | { D: "Daily" }
      FREQUENCY: { MO: "Maturity Only" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" } | { SC: "Statement cutoff group" } | { U: "Unspecified" }
      WHEN_PAID: { E: "End of period" } | { B: "Beginning of period" } | { A: "On anniversary" }
      PAID_ON_CLOSE: { N: "No" } | { Y: "Yes" }
      MINIMUM_BALANCE: Money
      MAXIMUM_COLL_BAL_HOLD_DAYS: Count
      BASED_ON_RELATIONSHIP: { N: "No" } | { Y: "Yes" }
      BASED_ON_MARKET: { N: "No" } | { Y: "Yes" }
      MARKET_TYPE_SERIAL: Serial
      BASED_ON_EFFECTIVE_DATE: { N: "No" } | { Y: "Yes" }
      LAST_BATCH_EFFECTIVE_DATE: Date
      LAST_BATCH_POSTING_DATE: Date
      LAST_BATCH_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DIV_CALC_RANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      BALANCE: Money
      RELATIONSHIP_SERIAL: Serial
      MARKET_SERIAL: Serial
      EFFECTIVE_DATE: Date
      RATE: Rate
      LAST_FM_DATE: Date
    }
    DOCUMENT_INDEX_FIELD: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      SOURCE: { '-': "None" } | { PDT: "Posting date" } | { RPT: "Report title" } | { RPD: "Report date" } | { ACN: "Account number" } | { APS: "Account person serial" } | { SID: "Savings ID" } | { LID: "Loan ID" } | { STD: "Savings type description" } | { LTD: "Loan type description" } | { SLS: "Share or Loan serial" } | { COS: "Collateral serial" } | { PAN: "Card number" } | { CKN: "Checking account check number" } | { APN: "Application number" } | { NAM: "Person or applicant name" } | { UNM: "User name" } | { TIN: "Tax identification number" } | { TRN: "Transaction serial" } | { BRD: "Branch description" } | { NAI: "Shared branch account ID" } | { SBN: "Shared branch institution name" } | { FTD: "Form type description" } | { FTC: "Form type code" } | { FFN: "Form field name" } | { MTX: "Manually entered text" } | { MDT: "Manually entered date" } | { DTY: "Document type" } | { DTL: "Document type list" } | { DTG: "Document type group" } | { DGL: "Document type group list" } | { DCB: "Document cabinet" } | { DFR: "Document file room" } | { DCR: "Document creator" } | { DIN: "Document institution" } | { IVN: "Invoice number" } | { IVD: "Invoice date" } | { IVA: "Invoice amount" } | { VDM: "Vendor name" } | { VDN: "Vendor number" }
      INDEX_NAME: string
      DEFAULT_INDEX_VALUE: string
      DATE_FORMAT: { '-': "None" } | { 'YYYY-MM-DD': "YYYY-MM-DD" } | { 'YY-MM-DD': "YY-MM-DD" } | { 'MM/DD/YYYY': "MM/DD/YYYY" } | { 'MM/DD/YY': "MM/DD/YY" }
      ACCOUNT_NUMBER_FORMAT: { I: "Include leading zeros" } | { R: "Remove leading zeros" }
      NAME_FORMAT: { '-': "None" } | { FUL: "Full name" } | { LST: "Last name" } | { FST: "First name" }
      TIN_FORMAT: { '-': "None" } | { '9': "999999999" } | { S: "999-99-9999" }
      SERIAL_FORMAT: { '-': "None" } | { I: "Leading S/L indicator" }
      FORM_FIELD_NAME: string
      LAST_FM_DATE: Date
    }
    DOCUMENT_INDEX_FIELD_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      FIELD_SERIAL: Serial
      BLANK_ALLOWED: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    DOCUMENT_INDEX_VALUE_LIST: { SERIAL: Serial }
    DOCUMENT_INDEX_SCHEME: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CONFIRMATION_OPTION: { '-': "None" } | { S: "On submit" }
      LAST_FM_DATE: Date
    }
    DOCUMENT_RETRIEVAL_TABLE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      INTERFACE_SERIAL: Serial
      TABLE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    ENV: {
      SERIAL: Serial
      ACCESS_KEY: string
      DATABASE_VERSION: string
      REFRESH_COUNTER: Count
      POSTING_MODE: { '-': "Normal" } | { F: "Frozen" }
      INSTITUTION_ID: Count
      INSTITUTION_NAME: string
      POSTING_DATE: Date
      POSTING_DATE_CUTOFF_TIME: Time
      POSTING_DATE_CUTOFF_START_MIN: string
      POSTING_DATE_CUTOFF_START_MAX: string
      POSTING_DATE_CUTOFF_START_TZ: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      POSTING_DATE_LIVE_MAX_ADV_DAYS: Count
      POSTING_DATE_TEST_MAX_ADV_DAYS: Count
      GL_PERIOD_START_DATE: Date
      GL_PERIOD_END_DATE: Date
      GL_PERIOD_MONTHS_FUTURE: Count
      MONETARY_EFFECTIVE_DAYS_PAST: Count
      MONETARY_EFFECTIVE_DAYS_FUTURE: Count
      LN_PAYMENT_COUNT_DQ_GRACE_DAYS: Count
      USER_COUNTER: Count
      DEVICE_COUNTER: Count
      ROLE_COUNTER: Count
      SECURITY_EVENT_COUNTER: Count
      NOTE_TYPE_COUNTER: Count
      SHARE_TYPE_COUNTER: Count
      LOAN_TYPE_COUNTER: Count
      BRANCH_COUNTER: Count
      GENERAL_LEDGER_COUNTER: Count
      GL_POSTING_GROUP_COUNTER: Count
      LATE_FEE_CALC_COUNTER: Count
      PAYMENT_CALC_COUNTER: Count
      DIVIDEND_CALC_COUNTER: Count
      CREDIT_CARD_CALC_COUNTER: Count
      POSTING_POLICY_COUNTER: Count
      CK_HLD_POLICY_COUNTER: Count
      CUSTOM_TABLE_COUNTER: Count
      UND_EARNING_GL_SERIAL: Serial
      UND_EARNING_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      NET_INCOME_GL_SERIAL: Serial
      NET_INCOME_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      GL_CLOSE_IN_PROGRESS: { N: "No" } | { Y: "Yes" }
      REG_D_FEE_IS_REG_E_OD_FEE: { N: "No" } | { Y: "Yes" }
      REG_D_LIMITING_ON_OD_XFR: { W: "If triggering withdrawal is limited" } | { A: "Always" }
      REG_E_TRANSFER_OPTION: { F: "Force Reg E on transfer between accounts" } | { U: "Use Reg E option in Transfer record" }
      DEFAULT_ADDRESS_METHOD: { MRB: "Mailing}|{ then Residence}|{ then Business" } | { M: "Mailing}|{ then Residence or Business" } | { F: "Whichever is first" } | { LEG: "Whichever is first}|{ expired overrides allowed (Legacy)" }
      TERMINOLOGY: { C: "Credit Union" } | { B: "Bank" } | { S: "Savings and Checking" }
      HOME_BANKING_TERMINOLOGY: { H: "Home banking" } | { O: "Online banking" } | { I: "Internet banking" }
      IMPOUND_TERMINOLOGY: { E: "Escrow" } | { I: "Impound" }
      LOGON_LIVE_HTML: Document
      LOGON_TEST_HTML: Document
      LOGON_ACTIVE_DIRECTORY: { N: "No" } | { Y: "Yes" }
      KS_LAUNCHER_HOST_NAME: string
      KS_LAUNCHER_WEBAPP_NAME: string
      GL_DETAIL_POSTING_DATE_VALID: { N: "No" } | { Y: "Yes" }
      MON_DTL_PMT_DUE_VALID: { N: "No" } | { Y: "Yes" }
      MON_DTL_PMT_DUE_TRAN_SERIAL: Serial
    }
    CU_ESCHEAT_DATA_A: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TOTAL_BALANCE: string
      ACCOUNT_NUMBER: string
      LAST_FM_DATE: Date
    }
    LN_IMPOUND_ANALYSIS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { S: "Setup" } | { P: "Provisional" } | { F: "Finalized" }
      ANALYSIS_DATE: Date
      HISTORY_START_DATE: Date
      HISTORY_END_DATE: Date
      PROJECTION_END_DATE: Date
      PRIOR_P_AND_I_AMOUNT: Money
      PRIOR_DISCRETIONARY_AMOUNT: Money
      PRIOR_IMPOUND_AMOUNT: Money
      HISTORY_END_BALANCE: Money
      PROJECTION_START_BALANCE: Money
      CUSHION_CONTRACT_LAW_LIMIT: { S: "Silent" } | { '0': "No cushion" } | { '1': "One month" } | { '2': "Two months" }
      CUSHION_OPTION: { '0': "No cushion" } | { '1': "One month" } | { '2': "Two months" }
      CUSHION_AMOUNT: Money
      SURPLUS_HANDLING: { R: "Refund" } | { P: "Decrease payment" } | { D: "Retain due to delinquency" }
      REFUND_METHOD: { CPB: "Check to primary borrower" } | { CPO: "Check to primary borrower or co-borrower" } | { CPE: "Check to living primary else living co-borrower" } | { TTS: "Transfer to Savings" }
      REFUND_SHARE_SERIAL: Serial
      SHORTAGE_HANDLING: { N: "Do nothing" } | { D: "Collect within 30 days" } | { '12': "Collect over 12 months" }
      DEFICIENCY_HANDLING: { N: "Do nothing" } | { D: "Collect within 30 days" } | { '02': "Collect over 2 months" } | { '03': "Collect over 3 months" } | { '04': "Collect over 4 months" } | { '05': "Collect over 5 months" } | { '06': "Collect over 6 months" } | { '07': "Collect over 7 months" } | { '08': "Collect over 8 months" } | { '09': "Collect over 9 months" } | { '10': "Collect over 10 months" } | { '11': "Collect over 11 months" } | { '12': "Collect over 12 months" }
      NEXT_P_AND_I_AMOUNT: Money
      NEXT_DISCRETIONARY_AMOUNT: Money
      NEXT_IMPOUND_DUE_DATE: Date
      NEXT_IMPOUND_COUNT: Count
      NEXT_IMPOUND_AMOUNT: Money
      SUBSEQUENT_IMPOUND_DUE_DATE: Date
      SUBSEQUENT_IMPOUND_COUNT: Count
      SUBSEQUENT_IMPOUND_AMOUNT: Money
      HISTORY_START_BALANCE: Money
      PROJECTION_WITHDRAWALS: Money
      SURPLUS: Money
      SHORTAGE: Money
      DEFICIENCY: Money
      LAST_FM_DATE: Date
    }
    LN_IMPOUND_ANALYSIS_HISTORY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      DATE: Date
      CATEGORY: { D: "Deposit" } | { W: "Withdrawal" }
      SOURCE: { H: "History" } | { E: "History estimate" } | { P: "Projection" }
      DESCRIPTION: string
      AMOUNT: Money
      CUSHION_APPLICATION: { S: "Standard" } | { X: "Exclude from calculation" }
      LAST_FM_DATE: Date
    }
    EXPORT_SET: {
      SERIAL: Serial
      ACCESS_KEY: string
      INTERFACE_SERIAL: Serial
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" } | { I: "Build in progress" } | { F: "Build failed" }
      CREATION_TIME: Time
      CREATION_DATE: Date
      CREATION_DEBIT_COUNT: Count
      CREATION_DEBIT_AMOUNT: Money
      CREATION_CREDIT_COUNT: Count
      CREATION_CREDIT_AMOUNT: Money
      CREATION_OTHER_COUNT: Count
      FORMAT_DATA: string
      LAST_FM_DATE: Date
    }
    TAX_FED: {
      SERIAL: Serial
      ACCESS_KEY: string
      PAYER_TIN: string
      DEFAULT_TAX_STATE_SERIAL: Serial
      BKUP_WH_GL_SERIAL: Serial
      BKUP_WH_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      DIST_WH_GL_SERIAL: Serial
      DIST_WH_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    FEE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      MANUAL_ASSESS_OPTION: { N: "No" } | { Y: "Yes" }
      BATCH_ASSESS_OPTION: { N: "No" } | { Y: "Yes" }
      RTN_ITM_CHGBCK_OPTION: { N: "No" } | { Y: "Yes" }
      STATEMENT_DESCRIPTION: string
      WAIVED_STMT_DESCRIPTION: string
      CLASSIFICATION: { '-': "None" } | { OVD: "Overdraft" } | { RTN: "Returned item" } | { ODT: "Overdraft transfer" } | { RDD: "Reg D direct" } | { RDO: "Reg D overdraft transfer" } | { MAP: "MAPR charge" } | { FYL: "Credit card first year limitation" } | { MAC: "MAPR charge and credit card first year limitation" }
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      ANALYSIS_ASSESS_OPTION: { N: "No" } | { Y: "Yes" }
      ANALYSIS_STMT_DESCRIPTION: string
      ANALYSIS_DEFERRAL_DESCRIPTION: string
      ANALYSIS_SERVICE_CODE: string
      ANALYSIS_EARNINGS_CREDIT_ELIG: { N: "No" } | { Y: "Yes" }
      TIER_OPTION: { '-': "None" } | { I: "Tiered on item amount" } | { O: "Tiered on NSF/overdraft transfer amount" } | { L: "Tiered on lesser of item amount and NSF/overdraft transfer amount" }
      WAIVE_IF_NO_BASE_AMOUNT: { N: "No" } | { Y: "Yes" }
      WAIVE_COUNT: Count
      FEE_COUNT_TYPE_SERIAL: Serial
      FEE_COUNT_CATEGORY: { '-': "None" } | { A: "Account" } | { S: "Savings" }
      FEE_AMOUNT: Money
      FEE_RATE: Rate
      FEE_MINIMUM: Money
      FEE_MAXIMUM: Money
      FEE_COUNT_MINIMUM: Count
      FEE_COUNT_MAXIMUM: Count
      MINIMUM_ITEM_AMOUNT: Money
      WAIVED_ITEM_AMOUNT_STMT_DESC: string
      MINIMUM_NSF_AMOUNT: Money
      WAIVED_NSF_AMOUNT_STMT_DESC: string
      MAXIMUM_NSF_PERIOD_COUNT: Count
      WAIVED_NSF_PERIOD_STMT_DESC: string
      WAIVED_NSF_EXEMPT_STMT_DESC: string
      WAIVE_IF_AUTH_GOOD_OPTION: { N: "No" } | { Y: "Yes" }
      WAIVED_NSF_AUTH_GOOD_STMT_DESC: string
      FORMULA: { '-': "None" } | { F: "Flat charge" } | { UC: "Flat charge plus unit charge per count above free count" } | { IC: "Flat charge plus unit charge per count increment above free count" } | { FC: "Flat charge if count above free count" } | { RA: "Flat charge plus charge rate times amount above free amount" } | { DA: "Flat charge plus daily rate times amount above free amount" } | { IA: "Flat charge plus unit charge per amount increment above free amount" } | { FA: "Flat charge if amount above free amount" }
      FLAT_CHARGE: Money
      UNIT_CHARGE: Money
      CHARGE_RATE: Rate
      INCREMENT_ROUNDING: { U: "Up" } | { D: "Down" } | { N: "Nearest" }
      INCREMENT_COUNT: Count
      INCREMENT_AMOUNT: Money
      FREE_COUNT: Count
      FREE_AMOUNT: Money
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" } | { SC: "Statement cutoff group" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      PROCESS: { '--------------------': "None" } | { CUSTOM: "Custom" } | { AC: "Account" } | { AC_DORMANCY: "Account Dormancy" } | { AC_MAIL_STMT: "Account Mail Statement" } | { AC_NOTE_TYPE: "Account with Note Type" } | { AC_NETWORK_USAGE: "Account Network Usage" } | { SH: "Savings" } | { SH_BELOW_MIN_BAL: "Savings below Minimum Balance" } | { SH_NEG_BAL: "Savings Negative Balance" } | { SH_NOTE_TYPE: "Savings with Note Type" } | { SH_DORMANCY: "Savings Dormancy" } | { SH_TAX_PLAN: "Savings with Tax Plan" } | { SH_PER_TRAN: "Savings Per Transaction" } | { SH_BUS_TRAN: "Savings Business Transaction" } | { SH_EXCESSIVE_REG_D: "Savings Excessive Reg D" } | { CC_LATE: "Credit Card Late" } | { CC_ANNUAL: "Credit Card Annual" } | { CC_TRAN: "Credit Card Cash Advance and Balance Transfer" }
      ID: string
      FEE_COLLECTION: { PP: "Use Posting Policy" } | { PD: "Post partial up to balance}|{ discard any remainder" } | { FE: "Post if balance covers fee}|{ else exception" } | { MS: "Post up to minimum balance}|{ then alternate savings}|{ then remaining balance if no loans" } | { MD: "Post up to minimum balance}|{ then alternate savings}|{ discard any remainder" } | { BA: "Post up to balance}|{ then alternate savings up to balance" } | { SA: "Post entire amount to target savings}|{ or to alternate savings if not found" } | { LM: "Loan maintenance fee collected on payment" }
      POSTING_POLICY_SERIAL: Serial
      TARGET_SHARE_TYPE_SERIAL: Serial
      TARGET_LOAN_TYPE_SERIAL: Serial
      WAIVE_MINIMUM_DAILY_BALANCE: Money
      WAIVE_AVERAGE_DAILY_BALANCE: Money
      WAIVE_CURRENT_BALANCE: Money
      WAIVE_AGGREGATE_MIN_DLY_SH_BAL: Money
      WAIVE_AGGREGATE_MIN_DLY_LN_BAL: Money
      WAIVE_AGGREGATE_AVG_DLY_SH_BAL: Money
      WAIVE_AGGREGATE_AVG_DLY_LN_BAL: Money
      WAIVE_AGGREGATE_SHARE_BALANCE: Money
      WAIVE_AGGREGATE_LOAN_BALANCE: Money
      WAIVE_ACH_DEPOSIT_COUNT: Count
      WAIVE_ACH_DEPOSIT_DAYS: Count
      WAIVE_ACH_DEPOSIT_AGGREGATION: { A: "Account" } | { I: "Individual Savings/Loan" }
      WAIVE_NEW_ACCOUNT_MONTHS: Count
      WAIVE_NEW_SH_LN_MONTHS: Count
      MINIMUM_AGE: Count
      MAXIMUM_AGE: Count
      CONTROL_DESCRIPTION_1: string
      CONTROL_VALUE_1: string
      CONTROL_DESCRIPTION_2: string
      CONTROL_VALUE_2: string
      CONTROL_DESCRIPTION_3: string
      CONTROL_VALUE_3: string
      CONTROL_DESCRIPTION_4: string
      CONTROL_VALUE_4: string
      CONTROL_DESCRIPTION_5: string
      CONTROL_VALUE_5: string
      CONTROL_DESCRIPTION_6: string
      CONTROL_VALUE_6: string
      CONTROL_DESCRIPTION_7: string
      CONTROL_VALUE_7: string
      CONTROL_DESCRIPTION_8: string
      CONTROL_VALUE_8: string
      CONTROL_DESCRIPTION_9: string
      CONTROL_VALUE_9: string
      CONTROL_DESCRIPTION_10: string
      CONTROL_VALUE_10: string
      LAST_FM_DATE: Date
    }
    FEE_COUNT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    FEE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { CTL: "Control" } | { WAT: "Waive Account Type" } | { WST: "Waive Savings Type" } | { WLT: "Waive Loan Type" } | { WNT: "Waive Note Type" } | { WCV: "Waive Column Value" } | { AST: "Alternate Savings Type" }
      ACCOUNT_TYPE_SERIAL: Serial
      SHARE_TYPE_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      NOTE_TYPE_SERIAL: Serial
      COLUMN_SERIAL: Serial
      CONTROL_DESCRIPTION_1: string
      CONTROL_VALUE_1: string
      CONTROL_DESCRIPTION_2: string
      CONTROL_VALUE_2: string
      CONTROL_DESCRIPTION_3: string
      CONTROL_VALUE_3: string
      CONTROL_DESCRIPTION_4: string
      CONTROL_VALUE_4: string
      CONTROL_DESCRIPTION_5: string
      CONTROL_VALUE_5: string
      CONTROL_DESCRIPTION_6: string
      CONTROL_VALUE_6: string
      CONTROL_DESCRIPTION_7: string
      CONTROL_VALUE_7: string
      CONTROL_DESCRIPTION_8: string
      CONTROL_VALUE_8: string
      CONTROL_DESCRIPTION_9: string
      CONTROL_VALUE_9: string
      CONTROL_DESCRIPTION_10: string
      CONTROL_VALUE_10: string
      LAST_FM_DATE: Date
    }
    FEE_PRICING: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      RELATIONSHIP_SERIAL: Serial
      SHARE_TYPE_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      TIER_AMOUNT: Money
      WAIVE_COUNT: Count
      FEE_AMOUNT: Money
      FEE_RATE: Rate
      FEE_MINIMUM: Money
      FEE_MAXIMUM: Money
      MINIMUM_ITEM_AMOUNT: Money
      MINIMUM_NSF_AMOUNT: Money
      MAXIMUM_NSF_PERIOD_COUNT: Count
      FLAT_CHARGE: Money
      UNIT_CHARGE: Money
      CHARGE_RATE: Rate
      FREE_COUNT: Count
      FREE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    FILE_TRANSFER: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      RECEIPT_SERIAL: Serial
      FORM_SERIAL: Serial
      INVOICE_SERIAL: Serial
      REPORT_SERIAL: Serial
      DESTINATION_FILE_NAME: string
      STATUS: { Q: "Queued" } | { T: "Transferred" } | { H: "Held" } | { F: "Failed" } | { C: "Cancelled" }
      STATUS_TIME: Time
      EXCEPTION_DESCRIPTION: string
      RETRY_COUNT: Count
      INDEXING_DOCUMENT: string
      LAST_FM_DATE: Date
    }
    FILE_TRANSFER_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      SERVER_USER_SERIAL: Serial
      SERVER_DEVICE_SERIAL: Serial
      MAX_CONCURRENT_TRANSFER_COUNT: Count
      RETRY_LIMIT: Count
      RETRY_WAIT_SECONDS: Count
      LAST_FM_DATE: Date
    }
    FILE_TRANSFER_SITE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      HOST: string
      PROTOCOL: { FTP: "FTP" } | { FTPE: "FTP explicit over TLS" } | { SFTP: "SSH FTP" }
      PORT: Count
      SSH_LEGACY_KEX_ALGORITHM: { '-': "None" } | { DHG1SHA1: "Enable diffie-hellman-group1-sha1" }
      SSH_LEGACY_HOST_KEY_ALGORITHM: { '-': "None" } | { SSHDDS: "Enable ssh-dds" }
      USERNAME: string
      PASSWORD: string
      CERTIFICATE_AUTHORITIES: Document
      CLIENT_CERTIFICATE: Document
      MIN_EXPECTED_KB_PER_SECOND: Count
      PROCESSING_STATUS: { U: "Up" } | { D: "Down" }
      EXCEPTION_DESCRIPTION: string
      FAILURE_NOTIFICATION_ADDRESSES: string
      LAST_FM_DATE: Date
    }
    FILE_TRANSFER_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { '-': "None" } | { R: "Receipt" } | { F: "Form" } | { V: "Invoice" } | { r: "Report" } | { E: "Export" }
      SITE_SERIAL: Serial
      DOCUMENT_MANAGER_CATEGORY: { '-': "None" } | { P: "Bluepoint" } | { E: "EMC" } | { M: "MVi" } | { O: "OnBase" } | { S: "Synergy" } | { W: "WRG" } | { C: "CoWWW" }
      DOCUMENT_INDEX_SCHEME_SERIAL: Serial
      DOCUMENT_INDEX_FIELD_SEPARATOR: { T: "Tab" } | { P: "Pipe" } | { C: "Comma" }
      DOCUMENT_INDEX_FILE_DIRECTORY: string
      DOCUMENT_DATA_FILE_DIRECTORY: string
      DELETE_INDICATOR: { N: "No" } | { Y: "Yes" }
      ONBASE_INDEX_FILE_FORMAT: { O: "Ordered" } | { T: "Tagged" }
      SITE_DIRECTORY: string
      FILE_NAME_EXPRESSION: string
      INTERFACE_SERIAL: Serial
      REPORT_FILE_ID: string
      REVIEW_NOTIFICATION_ADDRESSES: string
      SKIP_REV_MIN_RPT_REC_COUNT: Count
      SKIP_REV_MAX_RPT_REC_COUNT: Count
      TRANSFER_DEPENDENCY: { N: "No" } | { Y: "Yes" }
      TRANSFER_INTERVAL_MINUTES: Count
      FILE_TRANSFER_STEPS: { '-': "None" } | { R: "Transfer data file}|{ index file}|{ rename index file" } | { F: "Transfer data file}|{ index file" } | { D: "Transfer data file" }
      DESTINATION_FILE_NAME_TEMPLATE: string
      OVERWRITE_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    FINCEN_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { T: "Transaction" } | { L: "CTR Location" } | { I: "CTR Foreign cash in" } | { O: "CTR Foreign cash out" } | { S: "SAR Institution" } | { B: "SAR Branch" } | { P: "SAR Asset Attribute" } | { A: "SAR IP address" } | { C: "SAR Cyber Event" } | { N: "SAR Narrative" }
      SEQUENCE_NUMBERS: string
      ERROR_CODES: string
      ERROR_DESCRIPTIONS: string
      TRANSACTION_SERIAL: Serial
      LOCATION_ROLE: { '-': "None" } | { S: "Selling location" } | { P: "Paying location" } | { B: "Both" }
      LOCATION_CODE: string
      LOCATION_RSSD_ID: string
      LOCATION_TIN: string
      LOCATION_REGULATOR: { N: "NCUA" } | { F: "FDIC" } | { B: "FRB" } | { O: "OCC" }
      LOCATION_NAME: string
      LOCATION_DBA: string
      LOCATION_STREET: string
      LOCATION_CITY: string
      LOCATION_STATE: string
      LOCATION_POSTAL_CODE: string
      LOCATION_COUNTRY_CODE: string
      LOCATION_CASH_IN_AMOUNT: Money
      LOCATION_CASH_OUT_AMOUNT: Money
      LOCATION_LOSS_AMOUNT: Money
      FOREIGN_CASH_AMOUNT: Money
      FOREIGN_CASH_COUNTRY_CODE: string
      PRODUCT_TYPE: { C: "Commodity type" } | { P: "Product/Instrument type" } | { M: "Market where traded" } | { N: "CUSIP number" }
      PRODUCT_DESCRIPTION: string
      IP_ADDRESS: string
      IP_ADDRESS_TIME: Time
      CYBER_EVENT_TYPE: { I: "Command and control IP address" } | { U: "Command and control URL/domain" } | { M: "Malware MD5}|{ Malware SHA-1}|{ or Malware SHA-256" } | { A: "Media Access Control (MAC) address" } | { P: "Port" } | { E: "Suspicious e-mail address" } | { F: "Suspicious file name" } | { S: "Suspicious IP address" } | { L: "Suspicious URL/domain" } | { T: "Targeted system" } | { O: "Other" }
      CYBER_EVENT_OTHER_DESCRIPTION: string
      CYBER_EVENT_VALUE: string
      CYBER_EVENT_TIME: Time
      NARRATIVE: string
      LAST_FM_DATE: Date
    }
    FINCEN_INSTITUTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      TRANSMITTER_CONTROL_CODE: string
      TRANSMITTER_TIN: string
      TRANSMITTER_NAME: string
      TRANSMITTER_STREET: string
      TRANSMITTER_CITY: string
      TRANSMITTER_STATE: string
      TRANSMITTER_POSTAL_CODE: string
      TRANSMITTER_CONTACT_NAME: string
      TRANSMITTER_PHONE_NUMBER: string
      INSTITUTION_CONTROL_CODE: string
      INSTITUTION_RSSD_ID: string
      INSTITUTION_TIN: string
      INSTITUTION_REGULATOR: { N: "NCUA" } | { F: "FDIC" } | { B: "FRB" } | { O: "OCC" }
      INSTITUTION_NAME: string
      INSTITUTION_DBA: string
      INSTITUTION_STREET: string
      INSTITUTION_CITY: string
      INSTITUTION_STATE: string
      INSTITUTION_POSTAL_CODE: string
      DEFAULT_CONTACT_OFFICE: string
      DEFAULT_CONTACT_PHONE_NUMBER: string
      DEFAULT_LOCATION_CODE: string
      LAST_CUTOFF_DATE: Date
      LAST_FM_DATE: Date
    }
    FINCEN_SUBJECT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { C: "CTR Person involved" } | { S: "SAR Subject" }
      SEQUENCE_NUMBERS: string
      ERROR_CODES: string
      ERROR_DESCRIPTIONS: string
      SOURCE_PERSON_SERIAL: Serial
      ENTITY: { N: "No" } | { Y: "Yes" }
      FIRST_NAME: string
      MIDDLE_NAME: string
      LAST_NAME: string
      SUFFIX: string
      GENDER: { U: "Unknown" } | { M: "Male" } | { F: "Female" }
      TIN: string
      TIN_TYPE: { U: "Unknown" } | { E: "EIN" } | { S: "SSN or ITIN" } | { F: "Foreign" }
      BIRTH_DATE: Date
      OCCUPATION: string
      NAICS_SERIAL: Serial
      ALTERNATE_NAME: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY_CODE: string
      PHONE_NUMBER: string
      EMAIL_ADDRESS: string
      ID_TYPE: { U: "Unknown" } | { D: "Driver license/State ID" } | { P: "Passport" } | { A: "Alien registration" } | { O: "Other" }
      ID_TYPE_OTHER_DESCRIPTION: string
      ID_ISSUING_STATE: string
      ID_ISSUING_COUNTRY_CODE: string
      ID_NUMBER: string
      INVOLVEMENT: { '-': "None" } | { O: "Person conducting transaction on own behalf" } | { A: "Person conducting transaction for another" } | { B: "Person on whose behalf transaction is conducted" } | { C: "Common carrier" }
      MULTIPLE_TRANSACTIONS: { N: "No" } | { Y: "Yes" }
      CASH_IN_AMOUNT: Money
      CASH_OUT_AMOUNT: Money
      SUBJECT_ROLE: { '-': "None" } | { S: "Purchaser/Sender" } | { R: "Payee/Receiver" } | { B: "Both" }
      CORROBORATIVE_STATEMENT: { N: "No" } | { Y: "Yes" }
      ALL_CRITICAL_UNAVAILABLE: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    FINCEN_SUBJECT_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '-': "None" } | { I: "CTR Account cash in" } | { O: "CTR Account cash out" } | { T: "SAR Affected TIN and account number" } | { A: "SAR Address" } | { D: "SAR Identification" } | { N: "SAR Alternate name" } | { P: "SAR Phone number" } | { E: "SAR Email address" } | { W: "SAR Website URL" } | { R: "SAR Relationship" }
      SEQUENCE_NUMBERS: string
      ERROR_CODES: string
      ERROR_DESCRIPTIONS: string
      INSTITUTION_TIN: string
      INSTITUTION_FOREIGN: { N: "No" } | { Y: "Yes" }
      ACCOUNT_NUMBER: string
      ACCOUNT_CLOSED: { N: "No" } | { Y: "Yes" }
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY_CODE: string
      ID_TYPE: { U: "Unknown" } | { D: "Driver license/State ID" } | { P: "Passport" } | { A: "Alien registration" } | { O: "Other" }
      ID_TYPE_OTHER_DESCRIPTION: string
      ID_ISSUING_STATE: string
      ID_ISSUING_COUNTRY_CODE: string
      ID_NUMBER: string
      ALTERNATE_NAME: string
      PHONE_NUMBER_TYPE: { U: "Unknown" } | { H: "Home" } | { W: "Work" } | { M: "Mobile" } | { F: "Fax" }
      PHONE_NUMBER: string
      EMAIL_ADDRESS: string
      WEBSITE_URL: string
      RELATIONSHIP_NONE: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_ACCOUNTANT: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_AGENT: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_APPRAISER: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_ATTORNEY: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_BORROWER: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_CUSTOMER: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_DIRECTOR: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_EMPLOYEE: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_OFFICER: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_OWNER: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_OTHER_DESCRIPTION: string
      RELATIONSHIP_STATUS: { '-': "None" } | { C: "Relationship continues" } | { T: "Terminated" } | { S: "Suspended/Barred" } | { R: "Resigned" }
      RELATIONSHIP_ACTION_DATE: Date
      LAST_FM_DATE: Date
    }
    FINCEN_SUMMARY: {
      SERIAL: Serial
      ACCESS_KEY: string
      CONTROL_NUMBER: string
      CATEGORY: { C: "CTR" } | { S: "SAR" }
      STATUS: { I: "In review" } | { A: "Approved" } | { R: "Rejected" } | { F: "Filed" } | { K: "Acknowledged" } | { E: "Acknowledged - correction required" } | { C: "Acknowledged - correction filed" }
      EXPORT_SET_SERIAL: Serial
      FILING_DATE: Date
      FILING_TYPE: { I: "Initial report" } | { C: "Correct/Amend prior report" } | { B: "FinCEN directed Backfiling" } | { A: "SAR continuing activity" } | { E: "SAR continuing activity correction" }
      PRIOR_BSA_IDENTIFIER: string
      JOINT_REPORT: { N: "No" } | { Y: "Yes" }
      FILING_NOTE: string
      ATTACHMENT_FILE_NAME: string
      CONTACT_OFFICE: string
      CONTACT_PHONE_NUMBER: string
      TRANSACTION_DATE: Date
      TRANSACTION_TO_DATE: Date
      BSA_IDENTIFIER: string
      SEQUENCE_NUMBERS: string
      ERROR_CODES: string
      ERROR_DESCRIPTIONS: string
      TT_ARMORED_CAR: { N: "No" } | { Y: "Yes" }
      TT_ATM: { N: "No" } | { Y: "Yes" }
      TT_MAIL_DEPOSIT: { N: "No" } | { Y: "Yes" }
      TT_NIGHT_DEPOSIT: { N: "No" } | { Y: "Yes" }
      TT_AGGREGATED: { N: "No" } | { Y: "Yes" }
      TT_SHARED_BRANCH: { N: "No" } | { Y: "Yes" }
      CASH_IN_DEPOSIT: Money
      CASH_IN_PAYMENT: Money
      CASH_IN_FOR_TRANSFER_OUT: Money
      CASH_IN_NEGOTIABLE_INSTRUMENT: Money
      CASH_IN_CURRENCY_EXCHANGE: Money
      CASH_IN_PREPAID_ACCESS: Money
      CASH_IN_GAMING_INSTRUMENT: Money
      CASH_IN_WAGER: Money
      CASH_IN_GAMING_DEVICE: Money
      CASH_IN_OTHER: Money
      CASH_IN_OTHER_DESCRIPTION: string
      CASH_IN_TOTAL: Money
      CASH_OUT_WITHDRAWAL: Money
      CASH_OUT_ADVANCE: Money
      CASH_OUT_FROM_TRANSFER_IN: Money
      CASH_OUT_NEGOTIABLE_INSTRUMENT: Money
      CASH_OUT_CURRENCY_EXCHANGE: Money
      CASH_OUT_PREPAID_ACCESS: Money
      CASH_OUT_GAMING_INSTRUMENT: Money
      CASH_OUT_WAGER: Money
      CASH_OUT_GAMING_INCENTIVE: Money
      CASH_OUT_PROMOTION: Money
      CASH_OUT_OTHER: Money
      CASH_OUT_OTHER_DESCRIPTION: string
      CASH_OUT_TOTAL: Money
      SAR_AMOUNT_CODE: { U: "Unknown" } | { N: "No amount" } | { A: "Amount" }
      SAR_AMOUNT: Money
      SAR_AMOUNT_CUMULATIVE: Money
      ST_ALTERS_TO_AVOID_BSA: { N: "No" } | { Y: "Yes" }
      ST_ALTERS_TO_AVOID_CTR: { N: "No" } | { Y: "Yes" }
      ST_CANCELS_TO_AVOID_BSA: { N: "No" } | { Y: "Yes" }
      ST_MULTIPLE_BELOW_BSA_THRESH: { N: "No" } | { Y: "Yes" }
      ST_MULTIPLE_BELOW_CTR_THRESH: { N: "No" } | { Y: "Yes" }
      ST_SUSPICIOUS_INQUIRY: { N: "No" } | { Y: "Yes" }
      ST_OTHER_DESCRIPTION: string
      TF_KNOWN_OR_SUSPECTED: { N: "No" } | { Y: "Yes" }
      TF_OTHER_DESCRIPTION: string
      FR_ACH: { N: "No" } | { Y: "Yes" }
      FR_ADVANCE_FEE: { N: "No" } | { Y: "Yes" }
      FR_BUSINESS_LOAN: { N: "No" } | { Y: "Yes" }
      FR_CHECK: { N: "No" } | { Y: "Yes" }
      FR_CONSUMER_LOAN: { N: "No" } | { Y: "Yes" }
      FR_CREDIT_DEBIT_CARD: { N: "No" } | { Y: "Yes" }
      FR_HEALTHCARE: { N: "No" } | { Y: "Yes" }
      FR_MAIL: { N: "No" } | { Y: "Yes" }
      FR_MASS_MARKETING: { N: "No" } | { Y: "Yes" }
      FR_PONZI_SCHEME: { N: "No" } | { Y: "Yes" }
      FR_PYRAMID_SCHEME: { N: "No" } | { Y: "Yes" }
      FR_SECURITIES: { N: "No" } | { Y: "Yes" }
      FR_WIRE: { N: "No" } | { Y: "Yes" }
      FR_OTHER_DESCRIPTION: string
      ML_EXCHANGES_BILLS: { N: "No" } | { Y: "Yes" }
      ML_FUNNEL_ACCOUNT: { N: "No" } | { Y: "Yes" }
      ML_PHYSICAL_CONDITION: { N: "No" } | { Y: "Yes" }
      ML_SOURCE_OF_FUNDS: { N: "No" } | { Y: "Yes" }
      ML_DESIGNATION: { N: "No" } | { Y: "Yes" }
      ML_EFT_WIRE_TRANSFER: { N: "No" } | { Y: "Yes" }
      ML_CURRENCY_EXCHANGE: { N: "No" } | { Y: "Yes" }
      ML_GOVERNMENT_PAYMENTS: { N: "No" } | { Y: "Yes" }
      ML_MULTIPLE_ACCOUNTS: { N: "No" } | { Y: "Yes" }
      ML_MONETARY_INSTRUMENTS: { N: "No" } | { Y: "Yes" }
      ML_TRANSACTORS: { N: "No" } | { Y: "Yes" }
      ML_TRADE_BASED_BLACK_MARKET: { N: "No" } | { Y: "Yes" }
      ML_OUT_OF_PATTERN: { N: "No" } | { Y: "Yes" }
      ML_OTHER_DESCRIPTION: string
      ID_CHANGES_NAME: { N: "No" } | { Y: "Yes" }
      ID_MULTIPLE_INDIVIDUALS: { N: "No" } | { Y: "Yes" }
      ID_QUESTIONABLE_OR_FALSE: { N: "No" } | { Y: "Yes" }
      ID_QUESTIONABLE_OR_FALSE_ID: { N: "No" } | { Y: "Yes" }
      ID_REFUSED_OR_AVOIDED: { N: "No" } | { Y: "Yes" }
      ID_MULTIPLE_IDENTITIES: { N: "No" } | { Y: "Yes" }
      ID_OTHER_DESCRIPTION: string
      OA_ACCOUNT_TAKEOVER: { N: "No" } | { Y: "Yes" }
      OA_BRIBERY_OR_GRATUITY: { N: "No" } | { Y: "Yes" }
      OA_COUNTERFEIT: { N: "No" } | { Y: "Yes" }
      OA_ELDER_EXPLOITATION: { N: "No" } | { Y: "Yes" }
      OA_EMBEZZLEMENT_THEFT: { N: "No" } | { Y: "Yes" }
      OA_FORGERY: { N: "No" } | { Y: "Yes" }
      OA_HUMAN_SMUGGLING: { N: "No" } | { Y: "Yes" }
      OA_HUMAN_TRAFFICKING: { N: "No" } | { Y: "Yes" }
      OA_IDENTITY_THEFT: { N: "No" } | { Y: "Yes" }
      OA_NO_CONCERN: { N: "No" } | { Y: "Yes" }
      OA_MISUSE_OF_RIGHT: { N: "No" } | { Y: "Yes" }
      OA_MISUSE_OF_POSITION: { N: "No" } | { Y: "Yes" }
      OA_DOMESTIC_CORRUPTION: { N: "No" } | { Y: "Yes" }
      OA_FOREIGN_CORRUPTION: { N: "No" } | { Y: "Yes" }
      OA_INFORMAL_VALUE_TRANSFER: { N: "No" } | { Y: "Yes" }
      OA_MULTIPLE_LOCATIONS: { N: "No" } | { Y: "Yes" }
      OA_NO_APPARENT_PURPOSE: { N: "No" } | { Y: "Yes" }
      OA_FOREIGN_HIGH_RISK: { N: "No" } | { Y: "Yes" }
      OA_WORKING_TOGETHER: { N: "No" } | { Y: "Yes" }
      OA_ELECTRONIC_INTRUSION: { N: "No" } | { Y: "Yes" }
      OA_UNLICENSED_MSB: { N: "No" } | { Y: "Yes" }
      OA_OTHER_DESCRIPTION: string
      MF_APPLICATION: { N: "No" } | { Y: "Yes" }
      MF_APPRAISAL: { N: "No" } | { Y: "Yes" }
      MF_FORECLOSURE: { N: "No" } | { Y: "Yes" }
      MF_MODIFICATION: { N: "No" } | { Y: "Yes" }
      MF_ORIGINATION: { N: "No" } | { Y: "Yes" }
      MF_REVERSE_MORTGAGE: { N: "No" } | { Y: "Yes" }
      MF_OTHER_DESCRIPTION: string
      CE_AGAINST_INSTITUTION: { N: "No" } | { Y: "Yes" }
      CE_AGAINST_CUSTOMER: { N: "No" } | { Y: "Yes" }
      CE_OTHER_DESCRIPTION: string
      PT_BONDS_NOTES: { N: "No" } | { Y: "Yes" }
      PT_COMMERCIAL_MORTGAGE: { N: "No" } | { Y: "Yes" }
      PT_COMMERCIAL_PAPER: { N: "No" } | { Y: "Yes" }
      PT_CREDIT_CARD: { N: "No" } | { Y: "Yes" }
      PT_DEBIT_CARD: { N: "No" } | { Y: "Yes" }
      PT_FOREX_TRANSACTIONS: { N: "No" } | { Y: "Yes" }
      PT_FUTURES: { N: "No" } | { Y: "Yes" }
      PT_HEDGE_FUND: { N: "No" } | { Y: "Yes" }
      PT_HOME_EQUITY_LOAN: { N: "No" } | { Y: "Yes" }
      PT_HOME_EQUITY_LOC: { N: "No" } | { Y: "Yes" }
      PT_INSURANCE_ANNUITY: { N: "No" } | { Y: "Yes" }
      PT_PENNY_STOCKS: { N: "No" } | { Y: "Yes" }
      PT_MUTUAL_FUND: { N: "No" } | { Y: "Yes" }
      PT_OPTIONS: { N: "No" } | { Y: "Yes" }
      PT_PREPAID_ACCESS: { N: "No" } | { Y: "Yes" }
      PT_RESIDENTIAL_MORTGAGE: { N: "No" } | { Y: "Yes" }
      PT_SECURITY_FUTURES: { N: "No" } | { Y: "Yes" }
      PT_STOCKS: { N: "No" } | { Y: "Yes" }
      PT_SWAP_HYBRID_DERIVATIVE: { N: "No" } | { Y: "Yes" }
      PT_OTHER_DESCRIPTION: string
      IT_BANK_CASHIERS_CHECK: { N: "No" } | { Y: "Yes" }
      IT_FOREIGN_CURRENCY: { N: "No" } | { Y: "Yes" }
      IT_FUNDS_TRANSFER: { N: "No" } | { Y: "Yes" }
      IT_GAMING_INSTRUMENTS: { N: "No" } | { Y: "Yes" }
      IT_GOVERNMENT_PAYMENT: { N: "No" } | { Y: "Yes" }
      IT_MONEY_ORDERS: { N: "No" } | { Y: "Yes" }
      IT_PERSONAL_BUSINESS_CHECK: { N: "No" } | { Y: "Yes" }
      IT_TRAVELERS_CHECK: { N: "No" } | { Y: "Yes" }
      IT_US_CURRENCY: { N: "No" } | { Y: "Yes" }
      IT_OTHER_DESCRIPTION: string
      LE_CONTACT_AGENCY: string
      LE_CONTACT_NAME: string
      LE_CONTACT_PHONE_NUMBER: string
      LE_CONTACT_DATE: Date
      LAST_FM_DATE: Date
    }
    FM_ACTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      POSTING_DATE: Date
      OPERATION: { V: "View" } | { I: "Insert" } | { U: "Update" } | { D: "Delete" } | { M: "Move" }
      TABLE_NAME: string
      TARGET_ACCESS_KEY: string
      TARGET_SERIAL: Serial
      TARGET_PARENT_SERIAL: Serial
      NEW_LOCATION_OPTION: { '-': "None" } | { F: "First" } | { L: "Last" } | { B: "Before" } | { A: "After" }
      NEW_LOCATION_SERIAL: Serial
      OLD_AFTER_SERIAL: Serial
      DEFAULTS_SERIAL: Serial
      OLD_LAST_FM_DATE: Date
      TABLE_DESCRIPTION: string
    }
    FM_FIELD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      COLUMN_NAME: string
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      OPERATION: { G: "Get" } | { S: "Set" } | { A: "Add" }
      OLD_CONTENTS: string
      NEW_CONTENTS: string
      OLD_DOCUMENT: Document
      NEW_DOCUMENT: Document
      COLUMN_DESCRIPTION: string
    }
    FORM: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      APPLICATION_SERIAL: Serial
      ACCOUNT_SERIAL: Serial
      TRANSACTION_SERIAL: Serial
      DISPUTE_SERIAL: Serial
      IMAGE: Binary
      IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      IMAGE_MOD_TIME: Time
      ESIGNATURE_STATUS: { '-': "None" } | { P: "In progress" } | { C: "Completed" } | { S: "Suspended" } | { X: "Cancelled" }
      DOCUMENT_MANAGER_ID: string
      DOCUMENT_MANAGER_ID_2: string
      METADATA_DOCUMENT: Document
      DOCUMENT_MANAGER_EX_IM_STATUS: { '-': "None" } | { Q: "Queued" } | { P: "Pulled" } | { F: "Failed" }
      DOCUMENT_MANAGER_ERROR_DESC: string
      DOCUMENT_MANAGER_RETRY_COUNT: Count
      LAST_FM_DATE: Date
    }
    FORM_PACKET: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    FORM_PACKET_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      FORM_TYPE_SERIAL: Serial
      DEFAULT_SELECTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    FORM_PROMPT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PROMPT: string
      FIELD_NAME_SUFFIX: string
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      LAST_FM_DATE: Date
    }
    FORM_SOURCE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TABLE_SERIAL: Serial
      MINIMUM_RECORD_COUNT: Count
      MAXIMUM_RECORD_COUNT: Count
      LAST_FM_DATE: Date
    }
    FORM_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { F: "Form" } | { L: "Letter" }
      PAPER_SIZE: { LTR: 'Letter 8.5" x 11"' } | { LGL: 'Legal 8.5" x 14"' }
      PRIMARY_TABLE_SERIAL: Serial
      LOAN_PROJECTION_OPTION: { '-': "None" } | { I: "Include" }
      PERSON_LINK_FIELD_NAME_OPTION: { S: "Standard" } | { C: "Include category" }
      FILE_TRANSFER_TYPE_SERIAL: Serial
      SCRIPT_SERIAL: Serial
      TEMPLATE_IMAGE: Binary
      TEMPLATE_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      TEMPLATE_IMAGE_MOD_TIME: Time
      LOGO_IMAGE: Binary
      LOGO_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      LOGO_IMAGE_MOD_TIME: Time
      LOGO_IMAGE_HEIGHT: Count
      LOGO_IMAGE_X_POSITION: Count
      LOGO_IMAGE_Y_POSITION: Count
      TOP_SNIPPET: Document
      TOP_LEFT_INDENT: Count
      BODY_SNIPPET: Document
      BODY_LEFT_INDENT: Count
      SIGNATURE_IMAGE_OPTION: { '-': "None" } | { U: "User signature image" } | { F: "Form Type signature image" }
      SIGNATURE_IMAGE: Binary
      SIGNATURE_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      SIGNATURE_IMAGE_MOD_TIME: Time
      SIGNATURE_IMAGE_HEIGHT: Count
      SIGNATURE_IMAGE_X_POSITION: Count
      SIGNATURE_IMAGE_Y_POSITION: Count
      SIGNATURE_SNIPPET: Document
      SIGNATURE_LEFT_INDENT: Count
      LAST_FM_DATE: Date
    }
    FUNDING: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { KD: "Check disburse" } | { SD: "Savings deposit" } | { LP: "Loan payment" } | { GL: "GL entry" } | { AN: "ACH origination next day" } | { AS: "ACH origination same day" }
      DISCLOSURE_CATEGORY: { PC: "Paid to consumer" } | { CC: "Credited to consumer's account" } | { PI: "Property insurance" } | { LI: "Single premium life insurance" } | { DI: "Single premium disability insurance" } | { FF: "Filing fee" } | { FI: "Non-filing insurance" } | { PO: "Paid to other" }
      PORTION_RETAINED_OPTION: { N: "No" } | { Y: "Yes" }
      PREPAID_FINANCE_CHARGE_OPTION: { N: "No" } | { Y: "Yes" } | { M: "MAPR only" }
      AMOUNT: Money
      STATEMENT_DESCRIPTION: string
      CHECKING_ACCOUNT_SERIAL: Serial
      MEMO: string
      PAYEE: string
      PAYEE_PERSON_SERIAL: Serial
      PAYEE_SECOND_PERSON_SERIAL: Serial
      PAYEE_THIRD_PERSON_SERIAL: Serial
      PAYEE_FOURTH_PERSON_SERIAL: Serial
      MULTIPLE_PAYEE_OPTION: { O: "Or" } | { A: "And" }
      OFAC_CHECK_STATUS: { '-': "None" } | { U: "No person restriction" } | { N: "No match" } | { R: "Match rejected" }
      OFAC_CHECK_STATUS_EXPLANATION: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      GL_SERIAL: Serial
      GL_COMMENT: string
      GL_REFERENCE: string
      LAST_FM_DATE: Date
    }
    GL: {
      SERIAL: Serial
      ACCESS_KEY: string
      ACCOUNT_NUMBER: string
      DESCRIPTION: string
      BALANCE_START_DATE: Date
      BALANCE_END_DATE: Date
      BALANCE: Money
      CATEGORY: { A: "Asset" } | { L: "Liability" } | { Q: "Equity" } | { I: "Income" } | { E: "Expense" } | { N: "Net" }
      STATUS: { A: "Available" } | { L: "Locked" } | { M: "Merge and delete" }
      ACCESS_RESTRICTION: { U: "Unrestricted" } | { '1': "Restricted 1" } | { '2': "Restricted 2" } | { '3': "Restricted 3" } | { '4': "Restricted 4" } | { '5': "Restricted 5" } | { '6': "Restricted 6" } | { '7': "Restricted 7" } | { '8': "Restricted 8" } | { '9': "Restricted 9" }
      ORIGINAL_ENTRY_SUMMARIZATION: { S: "Summary" } | { D: "Detail" }
      MERGE_GL_SERIAL: Serial
      ALLOCATION_SERIAL: Serial
      ALLOCATION_DATE: Date
      SWEEP_SHARE_SERIAL: Serial
      SWEEP_LAST_DATE: Date
      LAST_FM_DATE: Date
    }
    GL_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    GL_ACCRUAL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      TYPE_SERIAL: Serial
      METHOD: { S: "Straight line" } | { D: "Declining balance" } | { Y: "Sum of the years digits" } | { M: "Sum of the months digits" }
      BALANCE_GL_SERIAL: Serial
      ACCRUAL_GL_SERIAL: Serial
      ACCRUAL_AMOUNT: Money
      ACCRUAL_RATE: Rate
      ACCRUAL_RATE_FORMULA: { M: "Monthly" } | { D: "Daily" }
      USEFUL_LIFE_MONTHS: Count
      ORIGINAL_VALUE: Money
      LIMIT_VALUE: Money
      CURRENT_VALUE: Money
      ACCRUED_AMOUNT: Money
      ACCRUED_COUNT: Count
      ACCRUED_DATE: Date
      VALUE_ADJUSTMENT_AMOUNT: Money
      ACQUISITION_DATE: Date
      ACQUISITION_AMOUNT: Money
      ACQUISITION_DESCRIPTION: string
      DISPOSITION_DATE: Date
      DISPOSITION_AMOUNT: Money
      DISPOSITION_DESCRIPTION: string
      MATURITY_FREQUENCY: { M: "Months" } | { D: "Days" }
      MATURITY_PERIOD: Count
      MATURITY_DATE: Date
      SERIAL_NUMBER: string
      ASSET_NUMBER: string
      PURCHASE_ORDER_NUMBER: string
      WARRANTY_DATE: Date
      ADDITIONAL_INFORMATION: string
      BRANCH_SERIAL: Serial
      IMAGE: Binary
      IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      IMAGE_MOD_TIME: Time
      LAST_FM_DATE: Date
    }
    GL_ACCRUAL_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { I: "Income" } | { E: "Expense" }
      LAST_FM_DATE: Date
    }
    GL_ALLOCATION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    GL_ALLOCATION_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      METHOD: { G: "GL account" } | { B: "Apply branch suffix to source GL account" } | { S: "Apply source branch suffix to GL account" }
      GL_SERIAL: Serial
      GL_BRANCH_SUFFIX: string
      PERCENTAGE: Rate
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    GL_BUDGET: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      YEAR: Count
      MONTH: Count
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    GL_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      STATUS: { O: "Original entry" } | { P: "Original entry}|{ summarized" } | { o: "Original entry reversal" } | { p: "Original entry reversal}|{ summarized" } | { S: "Final entry}|{ summary" } | { F: "Final entry" }
      POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      DENOMINATION: { '-': "None" } | { c: "Coins" } | { p: "Pennies" } | { n: "Nickels" } | { d: "Dimes" } | { q: "Quarters" } | { h: "Half dollars" } | { o: "One dollar coins" } | { i: "Rolled pennies" } | { j: "Rolled nickels" } | { k: "Rolled dimes" } | { l: "Rolled quarters" } | { u: "Rolled half dollars" } | { v: "Rolled one dollar coins" } | { I: "Boxed rolled pennies" } | { J: "Boxed rolled nickels" } | { K: "Boxed rolled dimes" } | { L: "Boxed rolled quarters" } | { U: "Boxed rolled half dollars" } | { V: "Boxed rolled one dollar coins" } | { '1': "One dollar bills" } | { '2': "Two dollar bills" } | { '5': "Five dollar bills" } | { T: "Ten dollar bills" } | { W: "Twenty dollar bills" } | { F: "Fifty dollar bills" } | { H: "Hundred dollar bills" } | { M: "Mutilated" } | { B: "Bait" }
      GL_SERIAL: Serial
      ENTRY_TYPE: { E: "Default" } | { D: "Debit" } | { C: "Credit" }
      AMOUNT: Money
      COMMENT: string
      REFERENCE: string
    }
    GL_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      STATUS: { O: "Original entry" } | { P: "Original entry}|{ summarized" } | { o: "Original entry reversal" } | { p: "Original entry reversal}|{ summarized" } | { S: "Final entry}|{ summary" } | { F: "Final entry" }
      POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      ORIGINAL_TRANSACTION_SERIAL: Serial
      ORIGINAL_USER_SERIAL: Serial
      CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      DENOMINATION: { '-': "None" } | { c: "Coins" } | { p: "Pennies" } | { n: "Nickels" } | { d: "Dimes" } | { q: "Quarters" } | { h: "Half dollars" } | { o: "One dollar coins" } | { i: "Rolled pennies" } | { j: "Rolled nickels" } | { k: "Rolled dimes" } | { l: "Rolled quarters" } | { u: "Rolled half dollars" } | { v: "Rolled one dollar coins" } | { I: "Boxed rolled pennies" } | { J: "Boxed rolled nickels" } | { K: "Boxed rolled dimes" } | { L: "Boxed rolled quarters" } | { U: "Boxed rolled half dollars" } | { V: "Boxed rolled one dollar coins" } | { '1': "One dollar bills" } | { '2': "Two dollar bills" } | { '5': "Five dollar bills" } | { T: "Ten dollar bills" } | { W: "Twenty dollar bills" } | { F: "Fifty dollar bills" } | { H: "Hundred dollar bills" } | { M: "Mutilated" } | { B: "Bait" }
      GL_SERIAL: Serial
      ENTRY_TYPE: { E: "Default" } | { D: "Debit" } | { C: "Credit" }
      AMOUNT: Money
      COMMENT: string
      REFERENCE: string
    }
    GL_HEADER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      STATUS: { O: "Original entry" } | { P: "Original entry}|{ summarized" } | { o: "Original entry reversal" } | { p: "Original entry reversal}|{ summarized" } | { S: "Final entry}|{ summary" } | { F: "Final entry" }
      EFFECTIVE_DATE: Date
      GL_POSTING_GROUP_SERIAL: Serial
    }
    GL_POSTING_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    GL_RECURRING_ENTRY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      GL_POSTING_GROUP_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    GL_RECURRING_ENTRY_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CHECK_DISBURSE_OPTION: { N: "No" } | { Y: "Yes" }
      GL_SERIAL: Serial
      COMMENT: string
      REFERENCE: string
      ENTRY_TYPE: { D: "Debit" } | { C: "Credit" }
      AMOUNT: Money
      CHECKING_ACCOUNT_SERIAL: Serial
      CHECK_MEMO: string
      PAYEE_PERSON_ADDR_LINK_SERIAL: Serial
      PAYEE_SECOND_PERSON_SERIAL: Serial
      PAYEE_THIRD_PERSON_SERIAL: Serial
      PAYEE_FOURTH_PERSON_SERIAL: Serial
      MULTIPLE_PAYEE_OPTION: { O: "Or" } | { A: "And" }
      LAST_FM_DATE: Date
    }
    GL_REPORT_FORMAT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      REPORT_CATEGORY: { B: "Balance sheet" } | { I: "Income statement" }
      LAST_FM_DATE: Date
    }
    GL_REPORT_FORMAT_LINE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      LINE_CATEGORY: { H: "Header" } | { D: "Detail" } | { N: "Balance sheet net income" } | { T: "Total" } | { U1: "Single underline" } | { U2: "Double underline" } | { B1: "Single blank line" } | { B2: "Double blank line" } | { PB: "Page break" }
      DESCRIPTION: string
      GL_ACCOUNT_CATEGORY: { A: "Asset" } | { L: "Liability" } | { Q: "Equity" } | { I: "Income" } | { E: "Expense" } | { N: "Net" }
      GL_ACCOUNT_NUMBER_LOW: string
      GL_ACCOUNT_NUMBER_HIGH: string
      FONT_FAMILY: { COURIER: "Courier" } | { HELVETICA: "Helvetica" } | { TIMES_ROMAN: "Times Roman" }
      FONT_STYLE: { NORMAL: "Normal" } | { BOLD: "Bold" } | { ITALIC: "Italic" } | { BOLD_ITALIC: "Bold Italic" } | { STRIKE_THROUGH: "Strike Through" } | { UNDERLINE: "Underline" }
      FONT_SIZE: Count
      DESCRIPTION_INDENTATION: Count
      AMOUNT_INDENTATION: Count
      TOTAL_LEVEL: Count
      DETAIL_LEVEL: Count
      LAST_FM_DATE: Date
    }
    HOLD_PLACEMENT_POLICY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      HOLD_CATEGORY: { FH: "Funds hold" } | { CK: "Check deposit" } | { OD: "ACH origination deposit" } | { BK: "Bulk check deposit" } | { BC: "Bulk cash deposit" } | { CD: "Certified check" } | { BD: "Bill payment check" } | { PA: "Preauthorization" } | { MV: "Merchant verification" } | { RI: "Large dollar return item" } | { IL: "IRS tax levy" } | { CL: "Child support levy" } | { LV: "Levy" } | { GA: "Garnishment" } | { UF: "Uncollected fee" } | { CA: "Close fee" } | { CF: "Close fee GL only" } | { PR: "Pending return" } | { DP: "Check positive pay" } | { AP: "ACH positive pay" } | { DS: "Check stop" } | { AS: "ACH stop" } | { AE: "ACH stop all except" } | { AR: "ACH revocation" } | { AN: "ACH not authorized" } | { AD: "ACH death notification" }
      MERCHANT_CATEGORY_CODES: string
      EXPIRATION_SPECIFIED_OPTION: { '-': "Use specified" } | { S: "Use shortest of specified and policy" } | { L: "Use longest of specified and policy" } | { P: "Use policy" }
      EXPIRATION_FREQUENCY: { M: "Months" } | { D: "Days" } | { B: "Business days" } | { h: "Hours" } | { m: "Minutes" } | { N: "Never" }
      EXPIRATION_PERIOD: Count
      STATEMENT_DESCRIPTION: string
      PLACEMENT_FEE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    HOLD_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    IMPORT_SET: {
      SERIAL: Serial
      ACCESS_KEY: string
      INTERFACE_SERIAL: Serial
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" } | { I: "Build in progress" } | { F: "Build failed" }
      CREATION_TIME: Time
      CREATION_DATE: Date
      CREATION_DEBIT_COUNT: Count
      CREATION_DEBIT_AMOUNT: Money
      CREATION_CREDIT_COUNT: Count
      CREATION_CREDIT_AMOUNT: Money
      CREATION_OTHER_COUNT: Count
      MATCH_CRITERIA: string
      LAST_FM_DATE: Date
    }
    INTERACTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      PERSON_SERIAL: Serial
      ACCOUNT_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      APPLICATION_SERIAL: Serial
      OPPORTUNITY_SERIAL: Serial
      TYPE_SERIAL: Serial
      CHANNEL_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      PLACEMENT_BRANCH_SERIAL: Serial
      DESCRIPTION: string
      EXPLANATION: string
      RESPONSE_TYPE_SERIAL: Serial
      RESPONSE_EXPLANATION: string
      RATING_SERIAL: Serial
      FORM_SERIAL: Serial
      EXTERNAL_FORM_URL: string
      LAST_FM_DATE: Date
    }
    INTERACTION_CHANNEL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    INTERACTION_RATING: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    INTERACTION_RESPONSE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    INTERACTION_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      INT_VW_SECURITY_EVENT_SERIAL: Serial
      INT_VW_DENIED_DESCRIPTION: string
      INT_FM_SECURITY_EVENT_SERIAL: Serial
      INT_FM_O_U_SEC_EVENT_SERIAL: Serial
      EMP_FM_SEC_EVENT_SERIAL: Serial
      EMP_REL_FM_SEC_EVENT_SERIAL: Serial
      UA_EMP_FM_SEC_EVENT_SERIAL: Serial
      UA_EMP_REL_FM_SEC_EVENT_SERIAL: Serial
      DISPLAY_COLOR: string
      PE_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      AC_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      SH_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      LN_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      AP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      OP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      INSERT_OPPORTUNITY_DFLT_SERIAL: Serial
      OFFER_STATUS: { '-': "None" } | { I: "Prepared" } | { O: "Presented" } | { D: "Declined" } | { P: "Postponed" } | { R: "Referred" } | { A: "Accepted" } | { F: "Fulfilled" }
      LAST_FM_DATE: Date
    }
    INTERACTION_TYPE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      RESPONSE_TYPE_SERIAL: Serial
      ROLE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    INT_RATE_ADJUST_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    INTERFACE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PRODUCT: { '--------------------': "None" } | { ACH: "ACH" } | { ACHORIG: "ACH Origination" } | { BILLPMTORIG: "Bill Payment Origination" } | { DRAFT: "Check" } | { CARDS: "Cards" } | { PAYROLL: "Payroll" } | { FEDWIRE: "FedWire Import" } | { CUSTOM: "Custom" } | { OFAC_FILE: "OFAC File" } | { TREASURY_BOND: "Treasury Direct Bond Redemption" } | { NAICS_CODES: "NAICS Code File" } | { FINCEN_314A: "FinCEN 314(a) File" } | { FINCEN_CTRSARXML: "FinCEN CTR and SAR XML Files" } | { FINCEN_CTRSAR: "FinCEN CTR and SAR Files (Deprecated)" } | { FIDM_FILE: "FIDM File" } | { HMDA_REPORTING: "HMDA Reporting" } | { ACCULYNK_X: "AccuLynk Extract" } | { ALERT_FIRSTX: "Alert First Loan and Savings Extract" } | { AKCELERANT_ELEMENTS: "Akcelerant Elements Extract" } | { AKCELERANT_FRAMEWORK: "Akcelerant Framework Extract" } | { AKUVO_DAILY_X: "Akuvo Daily Extracts" } | { ARC_SYS_LN_X: "Arc Sys Loan Reporting" } | { ASSURANCEPLUS_EX: "Assurance Plus Extract" } | { BANKERS_DASHBOARD_X: "Banker's Dashboard Extract" } | { BTOOLBOX_HOST: "Banker's Toolbox Host BSA Extracts" } | { BTOOLBOX_TRAN: "Banker's Toolbox Transaction BSA Extracts" } | { BAZING_REWARDS_X: "BaZing Rewards Extract" } | { BILLINGTREE_PAYRAZR: "Billing Tree Payrazr Extract" } | { BIZFOCUSED_IMPORT: "Biz Focused File Import" } | { BUSAL_PAYMENT_X: "Business Alliance Payment Extract" } | { BUZZ_POINTS_X: "Buzz Points File" } | { CALLIPAY_PYMTFILE: "Callipay Phone Loan Payments" } | { CATALYST_ALM: "Catalyst ALM Extract" } | { CATALYSTCORP_CORPDR: "Catalyst Corp Corporate Draft Reconciliation" } | { CATALYSTCORP_RDC: "Catalyst Corp Remote Deposit Capture" } | { CENTRIX_DTS: "Centrix DTS Import" } | { CENTRIX_DTS_X: "CentrixDTS Extract" } | { CB_LOCKBOX_I: "Century Bank Loan Payment Lockbox Import" } | { COLONIAL_EXT_IMP: "Colonial External Loan Import" } | { COL_1502_SBA_X: "Colson 1502 SBA Extract" } | { COREPOINT_CRA_X: "Core Point Certificate Rate Analysis" } | { CUBUS_DAILYX: "CUBUS Daily Extracts" } | { CUREVEST_CO_X: "CU Revest Charge Off Collections Extract" } | { DATA_CONTRIB: "ChexSystems Data Contributions" } | { DH_MCIF: "D+H MCIF" } | { DIGITAL_INSIGHT: "Digital Insight Posting Import" } | { DMI_MORTGAGE_GL: "DMI Mortgage GL" } | { DMI_MORTGAGE_IMPORT: "DMI Mortgage Loan Import" } | { DMI_MORTGAGE_PAYMENT: "DMI Mortgage Payment" } | { DMI_MORTGAGE_UPDATE: "DMI Mortgage Update" } | { ESA_CPIINS: "Evans Simpson and Associates CPI" } | { CreditQuest_CM_X: "Finastra Fusion CreditQuest Credit Manager Extract" } | { FRB_MN_BIC_X: "FRB of Minneapolis Borrower in Custody Extract" } | { FUHR_LOBBY_CENTRAL: "Fuhr Software Lobby Central Extract" } | { FUSION_CRS: "Fusion CRS Extract" } | { GILA_TITANIUM: "Gila Corp Titanium Extract" } | { GVS_PATRIOTOFFICER: "Global Vision Systems Patriot Officer Extract" } | { GONET_SOLONISFI: "GoNet SolonisFI Extract" } | { GREATPLAINSGL_X: "Great Plains GL Extract" } | { HARLANDCLARKE_COUPON: "Harland Clarke Coupon Extract" } | { HARLANDCLARKE_LE: "Harland Clarke Loan Engine Extract" } | { HARLAND_MCIF: "Harland MCIF Extract" } | { HARLAND_SA_MCIF: "Harland Shopper Alert Extract" } | { HARLAND_SPEC_ACTION: "Harland Clarke Special Action File" } | { JMFA_FULLACCTSX: "John M. Floyd & Associates Full Accounts Extract" } | { JMFA_NEGACCTSX: "John M. Floyd & Associates Negative Accounts Extract" } | { LIVE_SURVEY_X: "Live Survey Extract" } | { MRCHNET_SRCHLTE_X: "March Networks Searchlight Extract" } | { MARQUIS_MCIF: "Marquis MCIF Extract" } | { MERIDIAN_XPRESSX: "MeridianLink Xpress Collect Extract" } | { MOODYS_REPO_DIRECT_X: "Moody's Analytics Repository Direct Extract" } | { MFM_MRTG_IMPORT: "Member First Mortgage Loan Import" } | { MFM_PAYMENT_X: "Member First Mortgage Payment Extract" } | { MEMBER_XP: "MemberXP Secret Shopper Extract" } | { MINITER_MORTGAGE_X: "Miniter Mortgage Insurance Extract" } | { NACM_BUSINESS_LOAN_X: "NACM Business Loan Report" } | { NCUA_AIRES: "NCUA AIRES Extract" } | { NCUA_UN: "NCUA Uninsured Shares Extract" } | { OWNERS_CHOICE_IMPORT: "Owners Choice Loan Import" } | { RADDON_CHKACT: "Raddon Checking Activity" } | { RADDON_MCIF: "Raddon MCIF Extract" } | { RATAASSOC_COMPLY_X: "RATA Associates Comply Extract" } | { SAGEWORKS_ALLLX: "Sageworks Allowance for Loan and Lease Losses Extract" } | { SATMETRIX_REL: "Satmetrix Relationship Extract" } | { SATMETRIX_TRAN: "Satmetrix Transaction Extract" } | { SHIELDBSA_CM_X: "Shield BSA Compliance Monitoring Extract" } | { SECURIAN_PMT_PRTXN_X: "Securian Payment Protection Plan Extract" } | { SERTECH_PROACT_X: "Ser Technology ProAct Extract" } | { SUNTELL_ALLOWANCE_X: "Suntell Allowance Losses Extract" } | { VERAFIN_DBX: "Verafin Extract" } | { VERAFIN_TRANS_X: "Verafin Card Transaction Extract" } | { VULCAN_DATAMART_X: "Vulcan DataMart Extract" } | { WKLUWER_ACCTTRANX: "Wolters Kluwer Account Transaction Extract" } | { WKLUWER_CASHBRIDGEX: "Wolters Kluwer Cash Bridge Extract" } | { ZELLE_ZOE_FILE: "Zelle Owner Elements File" } | { CAPITAL_TAX_SERVICE: "Capital Tax Service" } | { CETO_CASHEX: "CetoLogic Cash Extract" } | { CETOLOGIC_RECLASSX: "CetoLogic Deposit Reclassification" } | { CONNECT_FSS_ALERTS: "Connect FSS Alerts" } | { CUNA_LENDING: "CUNA Mutual Group Consumer Lending Extract" } | { CUNA_ROI: "CUNA Mutual Group ROI File" } | { CUNA_TRUSTAGEX: "CUNA Mutual Group TruStage Extract" } | { CUNA_GAPX: "CUNA GAP Extract" } | { CUNA_PA_URL: "CUNA Protection Advisor URL" } | { CUNAZIPCD_X: "CUNA Project Zip Code Extract" } | { CUSCNGN_NETREP: "CUSC NGN Network Reports" } | { DADE_LOAD_X: "Dade Daily Load Extract" } | { DADE_POST: "Dade Post File" } | { DARLING_BUDGETING: "Darling Consulting Budgeting Extract" } | { ABCORP_CARDISSUE: "ABCorp Card Issue File" } | { EFTSOURCE_CI: "EFT Source Card Issue File" } | { ELAN_CACM: "Elan Cardholder Account/Card Management File" } | { ELAN_CCMRKT: "Elan Credit Card Marketing File" } | { ELAN_CCREFRESH: "Elan Daily Credit Card Refresh" } | { ELANDIRECTMAIL_X: "Elan Direct Mail Extract" } | { ELAN_NETREP: "Elan Network Reports" } | { ELAN_PBF: "Elan Positive Balance File" } | { ESA_INSUR: "ESA Insurance Extract" } | { MARKETREVEAL_X: "Equifax MarketReveal" } | { FIRSTDATA_BALSTAT: "First Data Balance and Status" } | { FIRSTDATA_DEPFILE: "First Data Deposit File" } | { FIRSTDATA_NONMON: "First Data Non-Monetary File" } | { FIRSTDATA_SIGRECON: "First Data Signature Recon File" } | { FIRSTDATA_BALFILE: "First Data Balance File" } | { FIRSTDATA_ACCFILE: "First Data Account File" } | { FIRSTDATA_STARAUBL: "First Data Star Balance File" } | { FIRSTDATA_STARCMA: "First Data Star CMA File" } | { FIRSTDATA_NETREP: "First Data Network Reports" } | { FIRSTDATA_PAYPOINT_X: "First Data PayPoint Payment Extract" } | { FIRSTDATA_STARNETREP: "First Data Star Network Reports" } | { FIRSTDATA_STARUSER: "First Data Star User File" } | { FIS_NETREP: "FIS Network Reports" } | { FIS_AP: "FIS AP File" } | { FIS_EXP_AP: "FIS Expanded AP File" } | { FIS_APTRAN: "FIS AP Transaction File" } | { FIS_B2K_MONFILE: "FIS Base 2000 Monetary File" } | { FISCERTEGY_CI: "FIS Certegy Issue/Reissue File" } | { FISCERTEGY_OPT3MAINT: "FIS Certegy Option 3 Maintenance File" } | { FISCERTEGY_CTF: "FIS Certegy CTF" } | { FISCERTEGY_PBF: "FIS Certegy Positive Balance File" } | { FISCERTEGY_EPF: "FIS Certegy Enhancement Plus File" } | { FIS_DEPOSITFILE: "FIS Deposit File" } | { FIS_CARDHOLDERDATA: "FIS Cardholder Data 120/130" } | { FIS_CARDHOLDER250: "FIS Cardholder Data 250" } | { FIS_CARDHOLDER300: "FIS Cardholder Data 300" } | { FIS_CARDHOLDER_M: "FIS Cardholder Masterfile" } | { FIS_NAMEADDR: "FIS Name and Address File" } | { FISPMTS1_NONMON: "FIS Payments One Non Monetary File" } | { FISPMTS1_FINDET_X: "FIS Payments One Financial Detail Extract" } | { FIS_TBSACCTMAINT: "FIS TBS Account Maintenance" } | { FIS_SCORECARDMAINT: "FIS Score Card Maintenance File" } | { FIS_SCORECARDTRAN: "FIS Score Card Transaction File" } | { FIS_STMTDRAFTX: "FIS Statement Check Extract" } | { FISERV_DI258: "Fiserv Database Interface File 258" } | { FISERV_EPOCPDF: "Fiserv EPOC Processor Data File" } | { FISERV_EPOCNETREP: "Fiserv EPOC Network Reports" } | { FISERV_MVFE: "Fiserv MasterCard/Visa File Extended" } | { FISERV_NOWNAF: "Fiserv NOW Network Activity File" } | { FISERV_RCM: "Fiserv Remote Card Maintenance File" } | { FISERV_DAILYUPDATE: "Fiserv Daily Update File" } | { FISERV_MON: "Fiserv Monetary File" } | { FISERV_NONMON: "Fiserv Non-Monetary File" } | { FISERV_PROLOGUERC: "Fiserv Prologue Check Reconciliation" } | { FISERV_PROLOGUEDTF: "Fiserv Prologue Daily Transaction File" } | { FISERV_FCRM: "Fiserv Financial Crime Risk Management" } | { FISERV_UCHOOSE_CSHBK: "Fiserv uChoose Rewards Cash Back" } | { FISERVXROADS_RDC: "Fiserv XRoads Remote Deposit Capture" } | { FMSI_TMSX: "FMSI Teller Management System" } | { GEEZEO_FLAT: "Geezeo Flat File" } | { IBS_CARMPRO: "IBS CARMPro Extract" } | { IMAGECENTER_POST: "ImageCenter Post File" } | { INTERPRO_CAM: "InterPro Card Account and Member File" } | { INTERPRO_PBF: "InterPro Positive Balance File" } | { INTERPRO_RECON: "InterPro Recon File" } | { ISSACCCHANGE_FILE: "Issuer Account Change File" } | { CUSCNGN_SBINST: "CUSC NGN Shared Branch Institution File" } | { FSCC_SBINST: "FSCC Shared Branch Institution File" } | { FED_ACHWIREDIR: "FedACH or Fedwire Routing Number Directory File" } | { INTLPLASTIC_CI: "International Plastic Cards Card Issue" } | { JHA_BRU_AWARDS: "JHA BRU Awards File Interface" } | { JHAPP_NETREP: "JHA PassPort Network Reports" } | { JHAPPS_ARF: "JHA Payment Processing Solutions Auto Recon File" } | { JHAPPS_AMF: "JHA Payment Processing Solutions Awards Maintenance File" } | { JHAPPS_SAAF: "JHA Payment Processing Solutions Stand Alone Awards File" } | { JHAPPS_CDF: "JHA Payment Processing Solutions Cardholder Data File" } | { JHAPPS_CARDISSUE: "JHA Payment Processing Solutions Card Issue File" } | { JHAPPS_PBF: "JHA Payment Processing Solutions Positive Balance File" } | { HABERFELD_MEMBER_ACQ: "Haberfeld Member Acquisition" } | { HARLANDCLARKE_CI: "Harland Clarke Card Issue" } | { HARLANDCLARKE_OFFSET: "Harland Clarke Card PIN Offset" } | { KEANE_BANKING_X: "Keane Banking Extract" } | { LEEANDMASONINS_X: "Lee And Mason Insurance Placement Tracking" } | { LENDERSYSTEMS_X: "Lender Systems Extract" } | { LENDINGINSIGHTS_X: "Lending Insights Extract" } | { LEXNEX_ASSET_VER: "LexisNexis SSA and Medicare Verification Import" } | { LIFEHELP_X: "Life Help Extract" } | { LIGHTHOUSE_X: "Lighthouse Lockbox Extract" } | { LIGHTHOUSE_LOCKBOX_I: "Lighthouse Lockbox Posting Import" } | { ORCC_EA: "ORCC Easy Access File" } | { PERSONIX_CI: "Personix Card Issue" } | { PROFITMAGNIFIER_X: "Profit Magnifier Extract" } | { SECURIAN_PI: "Securian Payment Import" } | { SHORELINE_CI: "Shoreline Card Issue" } | { PULSE_WAREHOUSE_FILE: "Pulse Warehouse File" } | { PSCU_COLLECT_X: "PSCU Collections Extract" } | { PSCU_EXTBALSTAT: "PSCU Extended Balance and Status" } | { PSCU_PIFILE: "PSCU PI Extension/Plastics File" } | { SHAZAM_BALANCE_X: "Shazam Balance Extract" } | { SHAZAM_CAF_X: "Shazam CAF Extract" } | { SHAZAM_EN_RECON: "Shazam Enhanced Recon File" } | { TMG_BALSTAT: "The Members Group Balance and Status" } | { VANTIV_CE: "Vantiv Card Extract" } | { VANTIV_AFA: "Vantiv Activity File" } | { VANTIV_CARDEX: "Vantiv CardEX" } | { VANTIV_CARDQUE: "Vantiv CardQue" } | { VANTIV_DAILYTOT: "Vantiv Daily Totals Detail" } | { VANTIV_PBF: "Vantiv Positive Balance File" } | { VANTIV_NETREP: "Vantiv Network Report" } | { VISA_CONSAUTH: "Visa Consumer Authentication Service" } | { VISADPS_CMA: "Visa DPS CMA" } | { VDPS_FALCONRSKFACTOR: "Visa DPS Falcon Risk Factor File" } | { VISADPS_NETREP: "Visa DPS Network Report" } | { PINNACLE_ODP: "Pinnacle Overdraft Privilege" } | { MCRPPS_BILLER: "MasterCard RPPS Biller Import" } | { MCRPPS_PAYMENT: "MasterCard RPPS Payment" } | { MCTRANSACTIS_X: "MasterCard Transactis Extract" } | { MCTRANSACTIS_I: "MasterCard Transactis Posting Import" } | { OWNSCHOICE_PMNT_X: "Owners Choice Payment Extract" } | { PMSYSTEMS_BP: "PM Systems Bill Payment" } | { Q2_ACH_ORIG_IMPORT: "Q2 ACH Origination" } | { FISMETAVANTE_BP: "FIS Metavante Bill Payment" } | { IPAY_BP: "iPay Bill Payment" } | { TRANSFIRST_PYMTFILE: "TransFirst Payment File" } | { ALKAMI_ALERT: "Alkami Alert Posting Import" } | { ALKAMI_ON_US: "Alkami On Us Posting" } | { ALLOYA_ACH_POSTING: "Alloya Business Capture Import" } | { AVIDXCHANGE_INVOICE: "AvidXchange Invoice" } | { BLUEPT_CIF: "Bluepoint CIF" } | { BLUEPT_MOBDEP: "Bluepoint Solutions Mobile Deposit" } | { CACHET_MOBDEP: "Digiliti Mobile Deposit" } | { ENSENTA_MOBDEP: "Ensenta Mobile Deposit" } | { FUNDTECH_ORIGINET: "Fundtech OrigiNET Import" } | { MVI_MOBDEP: "MVi Mobile Deposit" } | { REMITPLUS_MOBDEP: "Remit Plus Mobile Deposit" } | { REMITPLUS_POST: "Remit Plus Post File" } | { VERTIFI_MOBDEP: "Vertifi Mobile Deposit" } | { VSOFT_MOBDEP: "VSoft Mobile Deposit" } | { MIS_ENROLL: "Merchants Information Services Enrollment" } | { EASCORP_CHECKS: "EasCorp Corporate Check File" } | { MIDATLANTIC_DAILY: "MidAtlantic Daily Check File Extract" } | { MONEYGRAM_ISSUE: "MoneyGram Issuance" } | { MONEYGRAM_CLEARED: "MoneyGram Cleared Items" } | { UNIONBANK_CHECKX: "UnionBank Check Reconciliation Extract" } | { CORE_CHKPRODEX: "KeyStone Check Production Extract" } | { WFPOSPAY_ISSUE: "Wells Fargo Positive Pay Issuance" } | { WFPOSPAY_CLEARED: "Wells Fargo Positive Pay Cleared Items" } | { ASCENSUS_IRADIRECT: "Ascensus IRAdirect Fully-Administered" } | { ASCENSUS_NAMEADDRESS: "Ascensus Name and Address Change" } | { ASCENSUS_NEWAPP: "Ascensus New Application Extract" } | { DLRTRK_TMS: "Dealer Track TMS File" } | { DLRTRK_VINTEK: "Dealer Track VINtek File" } | { DLRTRK_DEALERFILE: "Dealertrack Dealer File" } | { DDI_ETITLELIENX: "Decision Dynamics Premier eTitle Lien Extract" } | { ROUTEONE_DEALERFILE: "RouteOne Dealer File" } | { ROUTEONE_PAYOFF_X: "RouteOne Payoff Quote Extract" } | { FDI_VEHTTL: "FDI Vehicle Title New Record File" } | { FDI_VEHTTL_D: "FDI Vehicle Title Data Change File" } | { FDI_VEHTTL_R: "FDI Vehicle Title Release Interest File" } | { FDI_VEHTTL_A: "FDI Vehicle Title Account Number Change File" } | { AFFINION_INSMAIL: "Affinion Insurance Mailing" } | { AFFINION_MBRMAIL: "Affinion Membership Mailing" } | { AFFINION_MBRSSNMAIL: "Affinion Membership With SSN Mailing" } | { AFFINION_PKGMAIL: "Affinion Package Direct Mailing" } | { ANICO_INS_X: "ANICO Insurance Extract" } | { AUGEO_REWARDS: "Augeo Rewards Import" } | { AUGEO_TRANX: "Augeo Rewards Transaction Extract" } | { AUGEO_REWARDS_ACH: "Augeo Rewards ACH Import" } | { BANCVUE_REWARDSX: "BancVue Rewards Extract" } | { BANCVUE_CHATMFEE: "BancVue Choice Checking ATM Fees" } | { BANCVUE_RWRDFEERFND: "BancVue Reward Checking ATM Fee Refunds" } | { BV_KCSHATMRFND: "BancVue Kasasa Cash ATM Refunds" } | { BV_KCSHWSVRATMRNFD: "BancVue Kasasa Cash With Saver ATM Refunds" } | { BV_KTUNESRFND: "BancVue Kasasa Tunes Real Tunes Refunds" } | { BV_KTUNESATMFRND: "BancVue Kasasa Tunes ATM Refunds" } | { BV_KCASHBACK: "BancVue Kasasa Cash Back" } | { BV_KCASHBACKATMRND: "BancVue Kasasa Cash Back ATM Refund" } | { BV_KCASHBACKFEE: "BancVue Kasasa Cash Back Fee" } | { BANCVUE_RWRDDIV: "BancVue Reward Checking Dividends" } | { BV_KCSHCKDIV: "BancVue Kasasa Cash Checking Dividends" } | { BV_KCSHWSVRCKDIV: "BancVue Kasasa Cash With Saver Checking Dividends" } | { BV_KSVRSVDIV: "BancVue Kasasa Saver Savings Dividends" } | { BV_KCSHWSVRSWEEP: "BancVue Kasasa Cash With Saver Sweep" } | { BV_KASASA_PROTECTFEE: "BancVue Kasasa Protect Fee" } | { PSCU_MLR_CARD: "PSCU Member Loyalty Rewards Card File Maintenance" } | { PSCU_MLR_ACCT: "PSCU Member Loyalty Rewards Account File" } | { PSCU_MLR_DTRADE: "PSCU Member Loyalty Rewards Debit Trade File" } | { PSCU_MLR_CTRADE: "PSCU Member Loyalty Rewards Credit Trade File" } | { REWARDSNOW_TIPNBR: "RewardsNOW TIP Number" } | { REWARDSNOW_CAIF: "RewardsNOW Customer Account Information File" } | { PAYLYNXS_SIMPLI: "Pay Lynxs SimpliRisk Extract" } | { PAYVERIS_CHECK_FILE: "Payveris Check File" } | { PAYVERIS_TRAN: "Payveris Transaction File" } | { PCFS_CM_PAYMENT: "PCFS Commercial Payment Extract" } | { PCFS_X_IMPORT: "PCFS External Loan Import" } | { PCFS_GL_POSTING: "PCFS GL Posting Import" } | { SAVETOWIN_X: "Save To Win Extract" } | { TELEVOX_X: "TeleVox Extract" } | { ALLIEDSOL_INSX: "Allied Solutions Insurance Extract" } | { ALLIEDSOL_CPIINS: "Allied Solutions CPI Insurance" } | { ALLIEDSOL_ESCRW_X: "Allied Solutions Escrow Disbursement Extract" } | { ALLIEDSOL_POSITRAC_X: "Allied Solutions POSitrac Extract" } | { ALLIEDSOL_RELEST_X: "Allied Solutions RealEstate Collateral Extract" } | { ALLIEDSOL_RELEST_I: "Allied Solutions Real Estate Insurance Import" } | { AMERICAN_GENERAL_INS: "American General Insurance" } | { ASI_ESI: "American Share Insurance Excess Share Insurance" } | { BDI_BILLING_NOTICE_X: "BDI Billing Notice Extract" } | { COMBINSCOMAMER_GB: "Combined Insurance Company Of America Group Billing" } | { CSIWATCHDOG_X: "CSI WatchDOG Extract" } | { FHLB_DESMOINES_X: "FHLB of Des Moines Mortgage Extract" } | { FHLBI_MTGX: "FHLBI Mortgage Extract" } | { FHLBC_MPFX: "FHLBC Mortgage Partnership Finance Extract" } | { FHLBNY_MTG_X: "FHLB of New York Mortgage Extract" } | { INSURANCESOL_CPI_I: "Insurance Solutions CPI" } | { INSURITAS_AUTOX: "Insuritas Automobile Extract" } | { INSURITAS_MEMBERX: "Insuritas Member Extract" } | { INSURITAS_MORTGAGEX: "Insuritas Mortgage Extract" } | { Q2_CLOSEDACC_X: "Q2 EBanking Closed Account Extract" } | { Q2EBANKING_X: "Q2 EBanking Daily Account Extract" } | { Q2_TRANALERTS_X: "Q2 EBanking Transaction Alerts" } | { QUIETRACK_INSX: "QuieTrack Insurance Extract" } | { ETM_UPEXCHANGE: "ETM UPExchange" } | { HRS_PRO_X: "HRS Pro Unclaimed Property Extract" } | { RYAN_TRACKER_IUPD: "Ryan Tracker Import Update" } | { RYAN_TRACKER_IESC: "Ryan Tracker Import Escheat" } | { RYAN_TRACKER_X: "Ryan Tracker Export" } | { RYAN_TRACKER_CKX: "Ryan Tracker Check Export" } | { SECMUTLIFENY_GB: "Security Mutual Life of New York Group Billing" } | { STATENAT_INSX: "State National Insurance Extract" } | { STATENAT_CPIINS: "State National CPI Insurance" } | { STATENAT_INSPMTCHG: "State National Insurance Payment Change" } | { STATENAT_CPINOTICEX: "State National CPI 2.0 Notice Extract" } | { STIFELALM_X: "Stifel Asset Liability Management Extract" } | { STRUNK_CP_X: "Strunk and Associates Courtesy Pay Extract" } | { SUPINSSYS_POST: "Support Insurance Systems" } | { SUPINSSYS_INSX: "Support Insurance Systems Extract" } | { SWBC_CPIINS: "SWBC CPI Insurance" } | { SWBC_MRTGINS: "SWBC Mortgage Insurance" } | { SWBC_ECASHMGMT: "SWBC Electronic Cash Management" } | { SWBC_ECMW: "SWBC Electronic Cash Management Web" } | { SWBC_ECMCW: "SWBC Electronic Cash Management With Coborrower Web" } | { SWBC_COLLECTX: "SWBC Collections Extract" } | { SWBC_COLLECTPYMT: "SWBC Collections Payment Import" } | { SWBC_SHARECOLLECTX: "SWBC Savings Collections Extract" } | { TRUSTMARKSOL_GB: "Trustmark Solutions Group Billing" } | { UPGRADE_EXT_IMP: "UpGrade Financial External Loan Import" } | { VANWAG_CPITRACK_X: "Van Wagenen CPI Tracking Extract" } | { VANWAG_DEBIT_CREDIT: "Van Wagenen Debit Credit File Reader" } | { VISIBLEEQUITY_X: "Visible Equity Extract" } | { VISIBLEEQUITY_APPX: "Visible Equity Application Extract" } | { VISIBLEEQUITY_DEPX: "Visible Equity Deposit Data Extract" } | { CKFREE_SVCTRAN: "CheckFree Service and Transaction File" } | { BOTW_ISSCHECKSX: "Bank Of The West Issued Checks Extract" } | { BANKTEL_CHECK_IMPORT: "BankTEL Check Import" } | { BERKS_DECEDENT: "Berks County Decedent List Import" } | { EQUIFAX_QCS: "Equifax Credit Score" } | { EXPERIAN_CS: "Experian Credit Score" } | { GENERIC_CREDITSCORE: "Generic Credit Score" } | { BRICKASSOC_ALM: "Brick And Associates ALM" } | { CUPLAN_GLX: "CUPlan GL Extract" } | { CMYERS_GLX: "CMyers GL Extract" } | { CMYERS_SHX: "CMyers Savings Extract" } | { CMYERS_LNX: "CMyers Loan Extract" } | { CMYERS_CDX: "CMyers CD Extract" } | { CNBS_CDX: "CNBS CD Extract" } | { CNBS_LNX: "CNBS Loan Extract" } | { VELOCITY_ILS_X: "Velocity ILS Extract" } | { VELOCITY_ILS_KOX: "Velocity ILS KickOff Extract" } | { VELOCITY_ILS_IMP: "Velocity ILS Import" } | { VELOCITY_ODM_X: "Velocity ODM Extract" } | { FARINFORESIGHT_GLX: "FARIN Foresight GL Extract" } | { FARINFORESIGHT_LNX: "FARIN Foresight Loan Extract" } | { FARINFORESIGHT_DSX: "FARIN Foresight Demand/Savings Extract" } | { FARINFORESIGHT_TDX: "FARIN Foresight Time Deposit Extract" } | { FICAST_GLX: "FICast GL Extract" } | { FICAST_LOANX: "FICast Loan Extract" } | { FICAST_DEPX: "FICast Deposit Extract" } | { FIMAC_DEPOSITX: "FIMAC Solutions Deposit Extract" } | { FIMAC_LOANX: "FIMAC Solutions Loan Extract" } | { FIMAC_GLX: "FIMAC Solutions GL Extract" } | { MCPLANNING_GL: "MC Planning ALM General Ledger Extract" } | { MCPLANNING_ALM: "MC Planning ALM Share and Loan Extracts" } | { OBJADV_GLX: "Objective Advisors GL Extract" } | { OBJADV_CDX: "Objective Advisors CD Extract" } | { OBJADV_LOANX: "Objective Advisors Loan Extract" } | { PFP_INSURANCEX: "PFP Insurance Extract" } | { PROFITstar_GLX: "PROFITstar GL Extract" } | { PROFITstar_ShareX: "PROFITstar Savings Extract" } | { PROFITstar_LoanX: "PROFITstar Loan Extract" } | { PROFITstar_TimeDepX: "PROFITstar Time Deposit Extract" } | { PROFITSTAR_OPTX: "PROFITstar Optimizer Extract" } | { PROFITSTAR_TRANX: "PROFITstar Transaction Extract" } | { VALUAMERICA_IMPORT: "ValuAmerica File Import" } | { WISDOM_ALM: "Wisdom ALM" } | { WISDOM_CHECK: "Wisdom AP Check Import" } | { WISDOM_DAILY_IMPORT: "Wisdom GL Daily Import" } | { WISDOM_GLDAILYTRANX: "Wisdom GL Daily Transaction File" } | { ALOGENT_EDELIVERYX: "Alogent E-Delivery Export" } | { ALOGENT_EDELIVERYI: "Alogent E-Delivery Import" } | { AMEX_ESS: "American Express ESS" } | { BLUEPTSOL_AIS: "Bluepoint Solutions AIS" } | { BLUEPTSOL_CSV: "Bluepoint Solutions CSV" } | { BDI_ESTMT: "BDI E-Statement Accounts" } | { BIT_ESTMT: "Bit E-Statement Accounts" } | { BIT_CLOSEDX: "Bit E-Statement Closed Accounts" } | { BIT_EMAILX: "Bit E-Statement Email Addresses" } | { FIS_ESTMT: "FIS E-Statement Accounts" } | { OSI_ESTMT: "OSI E-Statement Accounts" } | { QUESTMARK_ESTMT: "QuestMark E-Statement Import" } | { QUESTMARK_ESTMTX: "QuestMark E-Statement Extract" } | { XDI_ESTMT: "XDI E-Statement Accounts" } | { EZSHIELD_IDTHEFTX: "EZShield Identity Theft Protection Extract" } | { NXGSTRAT_IDTHEFTX: "NXG Strategies Identity Theft Protection Extract" } | { OMI_MBRTRKR: "OMI Member Tracker" } | { AES_IMPORT: "AES Student Loan Import" } | { BANKTEL_GL_IMPORT: "BankTEL GL Import" } | { CENLAR_MRTGIMPORT: "Cenlar Mortgage Loan Import" } | { CENLAR_PYMNT_X: "Cenlar Payment Extract" } | { CENLAR_GL_POSTING: "Cenlar GL Import" } | { CENTENNIAL_LENDING: "Centennial Lending" } | { CORE_IQ_X: "Core IQ Extracts" } | { CORELOGIC_ADDS_X: "CoreLogic ADDS Export" } | { CORELOGIC_RTRNADDS_I: "CoreLogic Return ADDS Import" } | { CORELOGIC_AUDIT_I: "CoreLogic Audit Import" } | { CORELOGIC_TAX_IMP: "CoreLogic Tax Import" } | { CORTLAND_BUSLN: "Cortland Business Loan Import" } | { CORTLAND_PAYMENT: "Cortland Payment File" } | { CUALLIANCE_MTGIMP: "CU Alliance Mortgage Import" } | { CUDL_BATCH: "CU Direct Batch Import" } | { CUSTUDENTCH_IMPORT: "CU Student Choice Import" } | { CUSTUDENTCH_PYMT: "CU Student Choice Payment" } | { DH_LASERPRO_BASIC: "D+H LaserPro Basic Import" } | { DH_LASERPRO_PLUS: "D+H LaserPro Plus Import" } | { DILLS_IMPORT: "DILLS Import" } | { DUN_BRAD_COM_LOAN_X: "Dun & Bradstreet Commercial Loan Export" } | { FANNIEMAE_HOMELOAN: "Fannie Mae Residential Loan Import" } | { FANNIEMAE_HMLN_MISMO: "Fannie Mae Residential Loan Import MISMO" } | { FANNIEMAE_LAR_X: "Fannie Mae Loan Activity Export" } | { FICS_MRTGIMPORT: "FICS Mortgage Loan Import" } | { FICS_MRTGPYMT: "FICS Mortgage Loan Payment File" } | { FICS_CSIMPORT: "FICS Commercial Loan Import" } | { FICS_CSPYMT: "FICS Commercial Loan Payment File" } | { FICS_GLPOSTING: "FICS GL Posting" } | { FICS_RTA_ADDRESS: "FICS RTA Address Update" } | { FICS_RTA_PERSON: "FICS RTA Person Update" } | { FICS_RTA_PAYMENT: "FICS RTA Payment Extract" } | { FSD_LOANIMPORT: "Finastra Servicing Director Loan Import" } | { FSD_LOANPYMT: "Finastra Servicing Director Payment File" } | { LENDKEY_LOAN: "LendKey Loan Import" } | { LERETA_LN_X: "Lereta Loan Extract" } | { LERETA_AUDIT_IMP: "Lereta Audit Import" } | { LERETA_TAX_IMP: "Lereta Tax Import" } | { MBFS_LOANIMPORT: "Member Business Financial Services Loan Import" } | { MBFS_LOANPYMT: "Member Business Financial Services Loan Payments" } | { MMS_MRTGIMPORT: "Member Mortgage Services Import" } | { MWLNSVC_MRTGIMPORT: "Midwest Loan Services Mortgage Import" } | { MWLNSVC_MRTGPYMT: "Midwest Loan Services Mortgage Payment File" } | { MC_SERVICEFILE: "Mortgage Computer Servicing Status Import" } | { MC_BILLINGFILE: "Mortgage Computer Billing File" } | { MC_PAYMENT_X: "Mortgage Computer Payment Export" } | { MY_CU_MRTG_IMPORT: "My CU Mortgage Import" } | { PHHCORP_MRTG: "PHH Corporation Mortgage Loan Import" } | { PROLOGUE_CK_RGSTR: "Prologue AP Check Import" } | { STATEFINNET_MRTG: "State Financial Network Mortgage Loan Import" } | { TRUECARD_X: "TrueCard Debit Extract" } | { TRUHOME_IMPORT: "TruHome Import" } | { TRUHOME_PAYMENT: "TruHome Payment File" } | { VOLCORP_CORP_DRAFT: "VolCorp Corporate Draft Reconciliation" } | { CARD_ALERTS: "Card Alerts" } | { CARD_MASSISSUE: "Card Mass Issue" } | { WRG_ACHORIG: "WRG ACH Origination" } | { BATCH_SCRIPT: "Batch Script Posting" } | { EXTERN_LOAN_DELETE: "External Loan Delete" } | { USR_DEV_BRA_DELETE: "User/Device/Branch Delete" } | { WRG_TMPPWD_URL: "WRG Temp Password URL" } | { WRG_VIEWMBR_URL: "WRG View Member URL" } | { WRG_SKIPPMT_URL: "WRG Skip Payment URL" } | { ACUANT_SERVICE_URL: "Acuant Service URL" } | { ALLOYA_CK_IMAGE_URL: "Alloya Check Images URL" } | { ALOGENT_UNIFY_URL: "Alogent Unify URL" } | { ASCENSUS_SSO_URL: "Ascensus SSO URL" } | { CLCK_SWTCH_SSO_URL: "ClickSWITCH SSO URL" } | { CORP_ONE_CK_IMG_URL: "Corporate One Check Image URL" } | { CPS_CHKORD_URL: "CPS Check Order URL" } | { CUBUS_LNCHPD_SSO_URL: "CUBUS Launchpad SSO URL" } | { PSCU_QCK_AST_SSO_URL: "PSCU Quick Assist SSO URL" } | { HRTLND_LG_CK_IMG_URL: "Heartland League Check Images URL" } | { MEMBERPASS_URL: "MemberPass URL" } | { NW_BANK_CK_IMAGE_URL: "Northwest Bank Check Images URL" } | { PYLOGIC_CK_IMAGE_URL: "Paylogic Check Images URL" } | { SECUGEN_FNGR_PRT_URL: "SecuGen Fingerprint URL" } | { VERTIFI_CK_IMAGE_URL: "Vertifi Check Images URL" } | { ALLIED_IQQ_URL: "Allied iQQ URL" } | { ASG_URL: "American Service Group URL" } | { BLUEPT_I_P_F_A_URL: "Bluepoint ImagePoint Foundation Archive URL" } | { DELUXE_CHKORD_URL: "Deluxe Check Order URL" } | { HARLAND_CHKORD_URL: "Harland Clarke Check Order URL" } | { LEGACY_CHKORD_URL: "Main Street Check Order URL" } | { CARFAX_HISTORY_URL: "CarFax History URL" } | { CHEXSYSTEMS_INQ_URL: "Chex Systems Inquiry URL" } | { COWWW_INQ_URL: "COWWW Inquiry URL" } | { FROSTVISUALGAP_URL: "Frost VisualGAP URL" } | { CFM_SERVER_URL: "CFM Server URL" } | { DYNAMSOFT_TWAIN_URL: "Dynamsoft Web TWAIN URL" } | { EMC_APPXTENDER_URL: "EMC ApplicationXtender URL" } | { HYLAND_CHECK_URL: "Hyland Services Check URL" } | { HYLAND_DOC_RTVL_URL: "Hyland OnBase Document Retrieval URL" } | { HYLAND_MEMBER_X: "Hyland OnBase Member Extract" } | { IMM_ESIGN_URL: "IMM eSign URL" } | { IMM_ESIGN_REST_URL: "IMM eSign REST URL" } | { IMM_TOTALEATLAS_URL: "IMM TotaleAtlas URL" } | { DOCUSIGN_URL: "DocuSign URL" } | { EDOCLOGIC_URL: "eDocLogic URL" } | { SIGNIX_URL: "SIGNiX URL" } | { MVI_CHECK_URL: "MVi Check URL" } | { MVI_EVIEW_URL: "MVi eView URL" } | { NADA_GUIDE_URL: "NADA Guide URL" } | { VSOFT_CK_IMAGE_URL: "VSoft Check Images URL" } | { FICS_R_T_ACCESS_URL: "FICS Real Time Access URL" } | { PSCU_DATA_XCHNG_URL: "PSCU Data eXchange URL" } | { TMG_OPEN_SVC_URL: "TMG Open Services URL" } | { FIRSTDATA_RTCMA_URL: "First Data Real Time CMA URL" } | { FISERV_OPTIS_URL: "Fiserv Optis URL" } | { FISERV_WEB_SVC_URL: "Fiserv Web Service URL" } | { SHAZAM_WEB_URL: "Shazam Web URL" } | { VANTIV_EFTWEBSVC_URL: "Vantiv EFT Web Service URL" } | { ABCORP_INST_ISS_URL: "ABCorp Instant Issue URL" } | { OPEN_LENDING_LP_URL: "Open Lending Lender's Protection URL" } | { ADDRESS_VALID_URL: "Address Validation URL" } | { VEHICLE_VALUE_URL: "Vehicle Valuation URL" } | { CARD_AT_ONCE_URL: "Card@Once URL" } | { DATACARD_CARDWIZ: "Datacard CardWizard" } | { DSI_TRISM_URL: "DemoTeller Systems Inc TRISM URL" } | { PROBSOLV_COTS_URL: "Problem Solved Cards On The Spot URL" } | { BLUEPT_IPCAPTURE_URL: "Bluepoint IP Capture URL" } | { CATALYST_TLRCPTR_URL: "Catalyst Teller Capture URL" } | { IMM_TLRCAPTURE_URL: "IMM Teller Capture URL" } | { MVI_C21TELLER_URL: "MVi C21 Teller URL" } | { PRFTSTRS_IMGCNTR_URL: "ProfitStars ImageCenter ITC URL" } | { CAR_SOLUTIONS: "Car Solutions URL" } | { ROUTE66_EXTWRNTY_URL: "Route 66 Extended Warranty URL" } | { CUDL_URL: "CU Direct Lending URL" } | { DEALERTRACK_LEND_URL: "Dealertrack Lending URL" } | { ROUTEONE_LEND_URL: "RouteOne Lending URL" } | { SYNERGY_SYNSRCH_URL: "Synergy SynSearch URL" } | { LSC_PREPAID_URL: "League Service Corp Prepaid URL" } | { BANKACOUNT_CORP_URL: "Bank-A-Count Corp URL" } | { SWBC_UNITY_URL: "SWBC Unity Integration URL" }
      ID: string
      CONTROL_DESCRIPTION_1: string
      CONTROL_VALUE_1: string
      CONTROL_DESCRIPTION_2: string
      CONTROL_VALUE_2: string
      CONTROL_DESCRIPTION_3: string
      CONTROL_VALUE_3: string
      CONTROL_DESCRIPTION_4: string
      CONTROL_VALUE_4: string
      CONTROL_DESCRIPTION_5: string
      CONTROL_VALUE_5: string
      CONTROL_DESCRIPTION_6: string
      CONTROL_VALUE_6: string
      CONTROL_DESCRIPTION_7: string
      CONTROL_VALUE_7: string
      CONTROL_DESCRIPTION_8: string
      CONTROL_VALUE_8: string
      CONTROL_DESCRIPTION_9: string
      CONTROL_VALUE_9: string
      CONTROL_DESCRIPTION_10: string
      CONTROL_VALUE_10: string
      CONTROL_DESCRIPTION_11: string
      CONTROL_VALUE_11: string
      CONTROL_DESCRIPTION_12: string
      CONTROL_VALUE_12: string
      CONTROL_DESCRIPTION_13: string
      CONTROL_VALUE_13: string
      CONTROL_DESCRIPTION_14: string
      CONTROL_VALUE_14: string
      CONTROL_DESCRIPTION_15: string
      CONTROL_VALUE_15: string
      CONTROL_DESCRIPTION_16: string
      CONTROL_VALUE_16: string
      CONTROL_DESCRIPTION_17: string
      CONTROL_VALUE_17: string
      CONTROL_DESCRIPTION_18: string
      CONTROL_VALUE_18: string
      CONTROL_DESCRIPTION_19: string
      CONTROL_VALUE_19: string
      CONTROL_DESCRIPTION_20: string
      CONTROL_VALUE_20: string
      DEFAULT_POSTING_POLICY_SERIAL: Serial
      ALT_1_POSTING_POLICY_SERIAL: Serial
      PAYROLL_GROUP_SERIAL: Serial
      NETWORK_CONNECTION_SERIAL: Serial
      COMPANY_PERSON_SERIAL: Serial
      USAGE_1_SECURITY_EVENT_SERIAL: Serial
      USAGE_2_SECURITY_EVENT_SERIAL: Serial
      IN_BATCH_GL_SERIAL: Serial
      IN_BATCH_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      ITEM_GL_SERIAL: Serial
      ITEM_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      OUT_BATCH_GL_SERIAL: Serial
      OUT_BATCH_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      IMPORT_OPTION: { N: "No" } | { Y: "Yes" }
      EXPORT_OPTION: { N: "No" } | { Y: "Yes" }
      IMPORT_MAX_DAYS_FROM_FILE_DATE: Count
      LAST_FM_DATE: Date
    }
    INTERFACE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { '1': "Primary control" } | { '2': "Secondary control" } | { '3': "Tertiary control" } | { '4': "Quaternary control" } | { '5': "Quinary control" }
      CARD_TYPE_SERIAL: Serial
      CHECKING_ACCOUNT_SERIAL: Serial
      SHARE_TYPE_SERIAL: Serial
      LOAN_DEFAULTS_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      COLLATERAL_TYPE_SERIAL: Serial
      INVENTORY_TYPE_SERIAL: Serial
      NOTE_TYPE_SERIAL: Serial
      USER_SERIAL: Serial
      BRANCH_SERIAL: Serial
      CONTROL_DESCRIPTION_1: string
      CONTROL_VALUE_1: string
      CONTROL_DESCRIPTION_2: string
      CONTROL_VALUE_2: string
      CONTROL_DESCRIPTION_3: string
      CONTROL_VALUE_3: string
      CONTROL_DESCRIPTION_4: string
      CONTROL_VALUE_4: string
      CONTROL_DESCRIPTION_5: string
      CONTROL_VALUE_5: string
      CONTROL_DESCRIPTION_6: string
      CONTROL_VALUE_6: string
      CONTROL_DESCRIPTION_7: string
      CONTROL_VALUE_7: string
      CONTROL_DESCRIPTION_8: string
      CONTROL_VALUE_8: string
      CONTROL_DESCRIPTION_9: string
      CONTROL_VALUE_9: string
      CONTROL_DESCRIPTION_10: string
      CONTROL_VALUE_10: string
      CONTROL_DESCRIPTION_11: string
      CONTROL_VALUE_11: string
      CONTROL_DESCRIPTION_12: string
      CONTROL_VALUE_12: string
      CONTROL_DESCRIPTION_13: string
      CONTROL_VALUE_13: string
      CONTROL_DESCRIPTION_14: string
      CONTROL_VALUE_14: string
      CONTROL_DESCRIPTION_15: string
      CONTROL_VALUE_15: string
      CONTROL_DESCRIPTION_16: string
      CONTROL_VALUE_16: string
      CONTROL_DESCRIPTION_17: string
      CONTROL_VALUE_17: string
      CONTROL_DESCRIPTION_18: string
      CONTROL_VALUE_18: string
      CONTROL_DESCRIPTION_19: string
      CONTROL_VALUE_19: string
      CONTROL_DESCRIPTION_20: string
      CONTROL_VALUE_20: string
      LAST_FM_DATE: Date
    }
    INVENTORY: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      SERIAL_NUMBER: string
      DESCRIPTION: string
      STATUS: { A: "Available" } | { S: "Sold" } | { V: "Voided" } | { L: "Lost" } | { T: "Stolen" } | { D: "Destroyed" }
      STATUS_DATE: Date
      AVAILABLE_DATE: Date
      SOLD_DATE: Date
      SOLD_BY_USER_SERIAL: Serial
      EXPORT_SET_SERIAL: Serial
      EXPORT_DATE: Date
      COST: Money
      RETAIL_PRICE: Money
      ACTUAL_PRICE: Money
      SUMMARY_QUANTITY: Count
      ITEM_EXPIRATION_DATE: Date
      ORDER_REFERENCE_NUMBER: string
      ORDER_SEQUENCE_NUMBER: Count
      EXTERNAL_SERIAL_NUMBER: string
      LAST_FM_DATE: Date
    }
    INVENTORY_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      TRACKING_OPTION: { N: "Serial number" } | { D: "Branch detail" } | { S: "Branch summary" }
      SERIAL_NUMBER_PREFIX: string
      SERIAL_NUMBER_FORMAT: string
      CHECK_DIGIT_CALCULATION: { '-': "None" } | { C: "Card" }
      DENOMINATION: Money
      PACK_QUANTITY: Count
      COST: Money
      COST_VARIATION_ALLOWED: { N: "No" } | { Y: "Yes" }
      RETAIL_PRICE: Money
      RETAIL_PRICE_VARIATION_ALLOWED: { N: "No" } | { Y: "Yes" }
      ITEM_EXPIRATION_WARNING_DAYS: Count
      ITEM_EXPIRATION_PREVENT_DAYS: Count
      INVENTORY_GL_SERIAL: Serial
      INVENTORY_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      INCOME_GL_SERIAL: Serial
      INCOME_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      EXPENSE_GL_SERIAL: Serial
      EXPENSE_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      FEE_SERIAL: Serial
      RELOAD_FEE_SERIAL: Serial
      EXTERNAL_INTERFACE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    INVOICE: {
      SERIAL: Serial
      ACCESS_KEY: string
      VENDOR_SERIAL: Serial
      INVOICE_NUMBER: string
      PURCHASE_ORDER_NUMBER: string
      TYPE_SERIAL: Serial
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      DESCRIPTION: string
      INVOICE_DATE: Date
      INVOICE_AMOUNT: Money
      DUE_DATE: Date
      STATUS: { '-': "None" } | { R: "Refused" } | { e: "Expense hold" } | { E: "Expensed" } | { p: "Payment hold" } | { P: "Paid" }
      BALANCE: Money
      TOTAL_EXPENSES: Money
      TOTAL_PAYMENTS: Money
      PAYMENT_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" } | { S: "Savings deposit" }
      AP_GL_SERIAL: Serial
      DISCOUNT_GL_SERIAL: Serial
      DISCOUNT_DATE: Date
      DISCOUNT_AMOUNT: Money
      DISCOUNT_APPLIED: Money
      EXPENSE_POSTING_DATE: Date
      EXPENSE_EFFECTIVE_DATE: Date
      IMAGE: Binary
      IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      IMAGE_MOD_TIME: Time
      LAST_FM_DATE: Date
    }
    INVOICE_APPROVAL_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      WORK_GROUP_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    INVOICE_APPROVAL_GROUP_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      GL_ACCOUNT_NUMBER_LOW: string
      GL_ACCOUNT_NUMBER_HIGH: string
      GL_ACCOUNT_BRANCH_SUFFIX: string
      USER_SERIAL: Serial
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    INVOICE_EXPENSE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      GL_SERIAL: Serial
      GL_ALLOCATION_SERIAL: Serial
      GL_ACCRUAL_SERIAL: Serial
      IRS_FORM_1099_MISC_OPTION: { '-': "None" } | { '1': "Rents" } | { '2': "Royalties" } | { '3': "Other income" } | { '5': "Fishing boat proceeds" } | { '6': "Medical and health care payments" } | { '7': "Nonemployee compensation" } | { '8': "Substitute payments in lieu of dividends or interest" } | { A: "Crop insurance proceeds" } | { B: "Excess golden parachute payments" } | { C: "Gross proceeds paid to an attorney" } | { D: "Section 409A deferrals" } | { E: "Section 409A income" }
      AMOUNT: Money
      APPROVED_BY_USER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    INVOICE_INSTALLMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      DUE_DATE: Date
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    IV_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    INVOICE_PAYMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      PAYMENT_DATE: Date
      AMOUNT: Money
      PAYMENT_SOURCE: { C: "Check" } | { A: "ACH origination" } | { G: "General ledger" } | { S: "Savings deposit" } | { V: "Credit voucher" }
      CHECKING_ACCOUNT_SERIAL: Serial
      CHECK_NUMBER: string
      CREDIT_VOUCHER_NUMBER: string
      LAST_FM_DATE: Date
    }
    INVOICE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      EXPENSE_APPROVAL_REQUIRED: { N: "No" } | { Y: "Yes" }
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      WORK_FLOW_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    IRS_1187_FILE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PAYMENT_YEAR: Count
      TEST_FILE_INDICATOR: { N: "No" } | { Y: "Yes" }
      TRANSMITTER_TIN: string
      TRANSMITTER_CONTROL_CODE: string
      TRANSMITTER_NAME: string
      TRANSMITTER_ADDRESS: string
      TRANSMITTER_CITY: string
      TRANSMITTER_STATE: string
      TRANSMITTER_POSTAL_CODE: string
      CONTACT_NAME: string
      CONTACT_PHONE_NUMBER: string
      LAST_FM_DATE: Date
    }
    IRS_1187_PAYER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PAYER_TIN: string
      PAYER_NAME_LINE_1: string
      PAYER_NAME_LINE_2: string
      PAYER_NAME_LINE_3: string
      PAYER_STREET_LINE_1: string
      PAYER_STREET_LINE_2: string
      PAYER_CITY: string
      PAYER_STATE: string
      PAYER_POSTAL_CODE: string
      CONTACT_NAME: string
      CONTACT_DEPARTMENT_TITLE: string
      CONTACT_PHONE_NUMBER: string
      FINAL_RETURN_INDICATOR: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    IRS_1187_PAYER_STATE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      STATE_CODE: string
      STATE_ID_NUMBER: string
      STATE_ID_NUMBER_2: string
      LAST_FM_DATE: Date
    }
    IRS_1220_FILE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PAYMENT_YEAR: Count
      TEST_FILE_INDICATOR: { N: "No" } | { Y: "Yes" }
      TRANSMITTER_TIN: string
      TRANSMITTER_CONTROL_CODE: string
      TRANSMITTER_NAME_1: string
      TRANSMITTER_NAME_2: string
      COMPANY_NAME_1: string
      COMPANY_NAME_2: string
      COMPANY_MAILING_ADDRESS: string
      COMPANY_CITY: string
      COMPANY_STATE: string
      COMPANY_POSTAL_CODE: string
      CONTACT_NAME: string
      CONTACT_PHONE_NUMBER: string
      CONTACT_EMAIL_ADDRESS: string
      LAST_FM_DATE: Date
    }
    IRS_1220_PAYEE: {
      SERIAL: Serial
      ACCESS_KEY: string
      PAYER_SERIAL: Serial
      PAYEE_TIN: string
      TYPE_OF_TIN: { '1': "EIN" } | { '2': "SSN or ITIN or ATIN" } | { '-': "Not determinable" }
      SECOND_TIN_NOTICE: { N: "No" } | { Y: "Yes" }
      PAYEE_NAME_CONTROL: string
      PAYEE_NAME_LINE_1: string
      PAYEE_NAME_LINE_2: string
      PAYEE_MAILING_ADDRESS: string
      PAYEE_CITY: string
      PAYEE_STATE: string
      PAYEE_POSTAL_CODE: string
      FOREIGN_COUNTRY_INDICATOR: { N: "No" } | { Y: "Yes" }
      PAYEE_FOREIGN_ADDRESS: string
      SOURCE_PERSON_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    IRS_1220_PAYER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PAYER_TIN: string
      PAYER_NAME_CONTROL: string
      PAYER_NAME_LINE_1: string
      PAYER_NAME_LINE_2: string
      TRANSFER_AGENT_INDICATOR: { N: "No" } | { Y: "Yes" }
      PAYER_SHIPPING_ADDRESS: string
      PAYER_CITY: string
      PAYER_STATE: string
      PAYER_POSTAL_CODE: string
      PAYER_PHONE_NUMBER: string
      PAYER_RTN: string
      LAST_FILING_INDICATOR: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    IRS_1220_PAYER_STATE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      STATE_CODE: string
      STATE_ID_NUMBER: string
      STATE_ID_NUMBER_2: string
      LAST_FM_DATE: Date
    }
    IRS_1042S: {
      SERIAL: Serial
      ACCESS_KEY: string
      PAYER_SERIAL: Serial
      RECIPIENT_TIN: string
      RECIPIENT_TIN_TYPE: { '0': "No TIN required" } | { '1': "SSN or ITIN" } | { '2': "EIN" } | { '3': "QI-EIN or WP-EIN or WT-EIN" } | { '4': "TIN required but not provided" }
      RECIPIENT_FOREIGN_TIN: string
      RECIPIENT_TAX_COUNTRY_CODE: string
      RECIPIENT_TAX_COUNTRY: string
      RECIPIENT_BIRTH_DATE: Date
      RECIPIENT_NAME_LINE_1: string
      RECIPIENT_NAME_LINE_2: string
      RECIPIENT_NAME_LINE_3: string
      RECIPIENT_STREET_LINE_1: string
      RECIPIENT_STREET_LINE_2: string
      RECIPIENT_CITY: string
      RECIPIENT_STATE: string
      RECIPIENT_POSTAL_CODE: string
      RECIPIENT_COUNTRY: string
      RECIPIENT_COUNTRY_CODE: string
      RECIPIENT_ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      UNIQUE_FORM_IDENTIFIER: string
      AMENDMENT_NUMBER: string
      RECIPIENT_ACCOUNT_NUMBER: string
      GROSS_INCOME: Money
      US_TAX_WITHHELD: Money
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      SOURCE_PERSON_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    IRS_1098: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      MORTGAGE_INTEREST: Money
      POINTS_PAID: Money
      REFUND_OF_OVERPAID_INTEREST: Money
      MORTGAGE_INSURANCE_PREMIUMS: Money
      MORTGAGE_PRINCIPAL: Money
      MORTGAGE_ORIGINATION_DATE: Date
      MORTGAGE_ACQUISITION_DATE: Date
      PROPERTY_INDICATOR: { '-': "Not borrower's mailing address" } | { '1': "Borrower's mailing address" }
      PROPERTY_ADDRESS: string
      PROPERTY_DESCRIPTION: string
      OTHER: string
      NUMBER_OF_PROPERTIES: Count
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_1098E: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      STUDENT_LOAN_INTEREST: Money
      ORIGINATION_FEES_INDICATOR: { N: "No" } | { Y: "Yes" }
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_1099A: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      BALANCE_OUTSTANDING: Money
      FAIR_MARKET_VALUE: Money
      PERSONAL_LIABILITY_INDICATOR: { N: "No" } | { Y: "Yes" }
      ACQUISITION_DATE: Date
      PROPERTY_DESCRIPTION: string
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_1099C: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      AMOUNT_OF_DEBT_CANCELED: Money
      INTEREST_IF_INCLUDED_IN_AMOUNT: Money
      FAIR_MARKET_VALUE: Money
      IDENTIFIABLE_EVENT_CODE: { A: "Bankruptcy" } | { B: "Other judicial debt relief" } | { C: "Statute of limitations or expiration of deficiency period" } | { D: "Foreclosure election" } | { E: "Debt relief from probate or similar proceeding" } | { F: "By agreement" } | { G: "Creditor's debt collection policy" } | { h: "Expiration of non-payment testing period (through 2016)" } | { H: "Other actual discharge before identifiable event" }
      PERSONAL_LIABILITY_INDICATOR: { N: "No" } | { Y: "Yes" }
      CANCELED_DATE: Date
      DEBT_DESCRIPTION: string
      COMBINED_1099A_INDICATOR: { N: "No" } | { Y: "Yes" }
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_1099INT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      INTEREST_INCOME: Money
      EARLY_WITHDRAWAL_PENALTY: Money
      INTEREST_ON_US_SAVINGS_BONDS: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      INVESTMENT_EXPENSES: Money
      FOREIGN_TAX_PAID: Money
      TAX_EXEMPT_INTEREST: Money
      PRIVATE_ACTIVITY_BOND_INTEREST: Money
      FOREIGN_COUNTRY_NAME: string
      CUSIP_NUMBER: string
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      LOCALITY_NAME: string
      LOCAL_INCOME_TAX_WITHHELD: Money
      LAST_FM_DATE: Date
    }
    IRS_1099MISC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      RENTS: Money
      ROYALTIES: Money
      OTHER_INCOME: Money
      FISHING_BOAT_PROCEEDS: Money
      MEDICAL_HEALTH_CARE_PAYMENTS: Money
      NON_EMPLOYEE_COMPENSATION: Money
      SUBSTITUTE_PAYMENTS: Money
      CROP_INSURANCE_PROCEEDS: Money
      EXCESS_GOLDEN_PARACHUTE: Money
      GROSS_PROCEEDS_TO_ATTORNEY: Money
      SECTION_409A_DEFERRALS: Money
      SECTION_409A_INCOME: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      DIRECT_SALES_INDICATOR: { N: "No" } | { Y: "Yes" }
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      STATE_AMOUNT: Money
      LOCALITY_NAME: string
      LOCAL_INCOME_TAX_WITHHELD: Money
      LOCAL_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    IRS_1099NEC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      NON_EMPLOYEE_COMPENSATION: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      STATE_AMOUNT: Money
      LOCALITY_NAME: string
      LOCAL_INCOME_TAX_WITHHELD: Money
      LOCAL_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    IRS_1099OID: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      OID: Money
      OTHER_PERIODIC_INTEREST: Money
      EARLY_WITHDRAWAL_PENALTY: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      OID_ON_US_TREASURY_OBLIGATIONS: Money
      INVESTMENT_EXPENSES: Money
      DESCRIPTION: string
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      LOCALITY_NAME: string
      LOCAL_INCOME_TAX_WITHHELD: Money
      LAST_FM_DATE: Date
    }
    IRS_1099Q: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      GROSS_DISTRIBUTION: Money
      EARNINGS: Money
      BASIS: Money
      TRUSTEE_TRANSFER_INDICATOR: { N: "No" } | { Y: "Yes" }
      TYPE_OF_TUITION_PAYMENT: { '1': "Private program" } | { '2': "State program" } | { '3': "Coverdell ESA" }
      DESIGNATED_BENEF_INDICATOR: { N: "No" } | { Y: "Yes" }
      DISTRIBUTION_CODE: { '1': "'1 ' Distribution" } | { '2': "'2 ' Excess plus earnings taxable current year" } | { '3': "'3 ' Excess plus earnings taxable previous year" } | { '4': "'4 ' Disability" } | { '5': "'5 ' Death" } | { '6': "'6 ' Prohibited transaction" }
      DISCLOSE_FMV_INSTEAD_OF_BASIS: { N: "No" } | { Y: "Yes" }
      FAIR_MARKET_VALUE: Money
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_1099R: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      OVERRIDE_PAYEE_NAME_LINE_2: string
      GROSS_DISTRIBUTION: Money
      TAXABLE_AMOUNT: Money
      CAPITAL_GAIN: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      EMPLOYEE_CONTRIBUTIONS: Money
      NET_UNREALIZED_APPRECIATION: Money
      OTHER_AMOUNT: Money
      TOTAL_EMPLOYEE_CONTRIBUTIONS: Money
      TRADITIONAL_IRA_SEP_SIMPLE: Money
      AMOUNT_ALLOCABLE_IRR_5_YEARS: Money
      DISTRIBUTION_CODE: { J: "'J ' Roth IRA early distribution" } | { J8: "'J8' Roth IRA early distribution}|{ excess current year" } | { JP: "'JP' Roth IRA early distribution}|{ excess previous year" } | { T: "'T ' Roth IRA distribution exception applies" } | { Q: "'Q ' Roth IRA qualified distribution" } | { '1': "'1 ' Early distribution no exception" } | { '2': "'2 ' Early distribution exception applies" } | { '3': "'3 ' Disability" } | { '4': "'4 ' Death" } | { '4A': "'4A' Death}|{ may be eligible for 10-year tax option" } | { '7': "'7 ' Normal distribution" } | { '7A': "'7A' Normal}|{ may be eligible for 10-year tax option" } | { N: "'N ' Recharacterized IRA contribution for current year" } | { R: "'R ' Recharacterized IRA contribution for previous year" } | { G: "'G ' Direct rollover" } | { G4: "'G4' Direct rollover}|{ death" } | { '8': "'8 ' Excess plus earnings taxable in current year" } | { '81': "'81' Excess current year}|{ early no exception" } | { '82': "'82' Excess current year}|{ early exception applies" } | { '84': "'84' Excess current year}|{ death" } | { P: "'P ' Excess plus earnings taxable in previous year" } | { P1: "'P1' Excess previous year}|{ early no exception" } | { P2: "'P2' Excess previous year}|{ early exception applies" } | { P4: "'P4' Excess previous year}|{ death" } | { L: "'L ' Loans treated as deemed distributions" } | { L1: "'L1' Loans deemed distributions}|{ early no exception" } | { L4: "'L4' Loans deemed distributions}|{ death" } | { '5': "'5 ' Prohibited transaction" } | { '6': "'6 ' Section 1035 exchange" } | { '9': "'9 ' Cost of current life insurance protection" } | { E: "'E ' Distributions under EPCRS" } | { F: "'F ' Charitable gift annuity" } | { S: "'S ' Early distribution from SIMPLE IRA first two years" }
      TAXABLE_AMOUNT_DETERMINED: { N: "No" } | { Y: "Yes" }
      IRA_SEP_SIMPLE_INDICATOR: { N: "No" } | { Y: "Yes" }
      TOTAL_DISTRIBUTION_INDICATOR: { N: "No" } | { Y: "Yes" }
      PERCENTAGE_OF_TOTAL_DISTRIB: Count
      PERCENTAGE_OF_ANNUITY_CONTRACT: Count
      FIRST_YEAR_OF_DESIGNATED_ROTH: Count
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      STATE_AMOUNT: Money
      LOCALITY_NAME: string
      LOCAL_INCOME_TAX_WITHHELD: Money
      LOCAL_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    IRS_1099SA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      GROSS_DISTRIBUTION: Money
      EARNINGS_ON_EXCESS_CONTRIB: Money
      FAIR_MARKET_VALUE_ON_DEATH: Money
      DISTRIBUTION_CODE: { '1': "'1' Normal distribution" } | { '2': "'2' Excess contribution" } | { '3': "'3' Disability" } | { '4': "'4' Death distribution other than code 6" } | { '5': "'5' Prohibited transaction" } | { '6': "'6' Death distribution after death year to nonspouse" }
      TYPE_OF_ACCOUNT: { H: "HSA" } | { A: "Archer MSA" } | { M: "Medicare Advantage MSA" }
      STATE_CODE: string
      STATE_INCOME_TAX_WITHHELD: Money
      LOCALITY_NAME: string
      LOCAL_INCOME_TAX_WITHHELD: Money
      LAST_FM_DATE: Date
    }
    IRS_5498: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      OVERRIDE_PAYEE_NAME_LINE_2: string
      IRA_CONTRIBUTIONS: Money
      ROLLOVER_CONTRIBUTIONS: Money
      ROTH_CONVERSION_AMOUNT: Money
      RECHARACTERIZED_CONTRIBUTIONS: Money
      FAIR_MARKET_VALUE: Money
      LIFE_INSURANCE_COST: Money
      SEP_CONTRIBUTIONS: Money
      SIMPLE_CONTRIBUTIONS: Money
      ROTH_IRA_CONTRIBUTIONS: Money
      TYPE_OF_ACCOUNT: { I: "Traditional IRA" } | { E: "SEP IRA" } | { S: "SIMPLE IRA" } | { R: "Roth IRA" }
      RMD_INDICATOR: { N: "No" } | { Y: "Yes" }
      RMD_AMOUNT: Money
      RMD_DATE: Date
      DEATH_IN_TAX_YEAR_INDICATOR: { N: "No" } | { Y: "Yes" }
      SPECIAL_REPORTING_CODE: { '-': "None" } | { FD: "'FD' Federally designated disaster area" } | { QR: "'QR' Repayment of a qualified reservist distribution" } | { BA: "'BA' Repayment of a qualified birth or adoption distribution" } | { DD: "'DD' Repayment of a federally designated disaster distribution" } | { PO: "'PO' Rollover of qualified plan loan offset amount" } | { SC: "'SC' Late rollover certified by participant" } | { '39': "'EO13239' Afghanistan" } | { '44': "'EO12744' Arabian Peninsula" } | { '19': "'EO13119' Yugoslavia" } | { '97': "'PL115-97' Sinai Peninsula of Egypt" } | { AF: "'AF' Allied Force - No Longer Applicable" } | { EF: "'EF' Enduring Freedom - No Longer Applicable" } | { IF: "'IF' Iraqi Freedom - No Longer Applicable" }
      SPECIAL_REPORTING_YEAR: Count
      SPECIAL_REPORTING_AMOUNT: Money
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_5498ESA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      COVERDELL_ESA_CONTRIBUTIONS: Money
      ROLLOVER_CONTRIBUTIONS: Money
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    IRS_5498SA: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CORRECTED_RETURN_INDICATOR: { '-': "Original return" } | { G: "Single or first of two transaction correction" } | { C: "Second of two transaction correction" }
      PAYEE_ACCOUNT_NUMBER: string
      PAYER_OFFICE_CODE: string
      EMPLOYEE_ARCHER_FOR_CURR_YEAR: Money
      TOTAL_IN_CURR_YEAR: Money
      TOTAL_IN_NEXT_YEAR: Money
      ROLLOVER_CONTRIBUTIONS: Money
      FAIR_MARKET_VALUE: Money
      TYPE_OF_ACCOUNT: { H: "HSA" } | { A: "Archer MSA" } | { M: "Medicare Advantage MSA" }
      DEATH_IN_TAX_YEAR_INDICATOR: { N: "No" } | { Y: "Yes" }
      STATE_CODE: string
      LAST_FM_DATE: Date
    }
    LATE_FEE_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FORMULA: { D: "Delinquent amount since last late fee" } | { F: "Federal" } | { C: "California" } | { W: "Wisconsin" } | { P: "Single payment" }
      LATE_FEE_RATE: Rate
      GRACE_DAYS: Count
      BASE_FEE: Money
      MINIMUM_FEE: Money
      MAXIMUM_FEE: Money
      IMPOUND_OPTION: { N: "Do not include escrow amount in calculation" } | { I: "Include escrow amount in calculation" }
      AGGREGATE_OPTION: { I: "Individual payments on first payment" } | { E: "Individual payments on each payment" } | { A: "Aggregate delinquent amount" }
      BALLOON_DATE_OPTION: { I: "Include balloon due date" } | { N: "Do not include balloon due date" }
      BATCH_ASSESS_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    LOAN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STORED_ACCESS_KEY: string
      ORDINAL: Count
      ROW_CHANGE_TIMESTAMP: Time
      ID: string
      DESCRIPTION: string
      BALANCE: Money
      UNAPPLIED_FUNDS_BALANCE: Money
      MINIMUM_BALANCE: Money
      MINIMUM_ADVANCE: Money
      DOWN_PAYMENT: Money
      MASTER_LINE_SERIAL: Serial
      CREDIT_LIMIT: Money
      CREDIT_LIMIT_EXPIRATION_DATE: Date
      CREDIT_LIMIT_SHARED_GRP_SERIAL: Serial
      CC_CASH_ADV_LIMIT_PERCENTAGE: Rate
      CC_CASH_ADV_LIMIT_AMOUNT: Money
      POSITIVE_PAY_OPTION: { '-': "None" } | { D: "Check" } | { A: "ACH" } | { B: "Check and ACH" }
      DRAW_PERIOD_EXPIRATION_DATE: Date
      DRAW_PERIOD_STATUS: { D: "Normal" } | { R: "In repayment period" }
      NON_REVOLVING_BALANCE: Money
      MAX_VALUATION_CREDIT_LIMIT: Money
      SET_CR_LIMIT_FROM_VALUATION: { N: "No" } | { Y: "Yes" }
      SHADOW_DATE: Date
      SHADOW_BALANCE: Money
      SHADOW_INTEREST: Money
      SHADOW_LATE_FEE: Money
      CHARGE_OFF_DATE: Date
      CHARGE_OFF_TYPE_SERIAL: Serial
      CHARGE_OFF_AMOUNT: Money
      COLLECTION_STATUS: { '-': "None" } | { A: "Active" }
      COLLECTION_HANDLING: { '-': "Normal" } | { RM: "Removal" } | { RF: "Referral" }
      COLLECTION_NOTICE_COUNT: Count
      COLLECTION_NOTICE_DATE: Date
      BANKRUPTCY_INDICATOR: { '-': "None" } | { '7': "Chapter 7" } | { '11': "Chapter 11" } | { '12': "Chapter 12" } | { '13': "Chapter 13" }
      INTEREST_PAID_TOTAL: Money
      INTEREST_UNPAID: Money
      INTEREST_ONLY_UNPAID: Money
      INTEREST_PREPAID: Money
      INTEREST_CALCULATION_DATE: Date
      INTEREST_RATE_CURRENT: Rate
      INTEREST_RATE: Rate
      INTEREST_APR: Rate
      INTEREST_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      INTEREST_RATE_INDEX_SERIAL: Serial
      INTEREST_RATE_MARGIN: Rate
      INTEREST_RATE_DISCOUNT: Rate
      INTEREST_RATE_RISK_PREMIUM: Rate
      INTEREST_RATE_MINIMUM: Rate
      INTEREST_RATE_MAXIMUM: Rate
      INTEREST_RATE_CHG_START_DATE: Date
      INTEREST_RATE_CHG_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      INTEREST_RATE_CHG_SCH_FREQ_1: Count
      INTEREST_RATE_CHG_SCH_FREQ_2: Count
      INTEREST_RATE_CHG_SCH_PERIOD: Count
      INTEREST_RATE_CHG_SCH_DATE: Date
      INTEREST_RATE_CHG_SCH_RND_INC: Rate
      INTEREST_RATE_CHG_SCH_RND_OPT: { '-': "None" } | { IU: "Round index up" } | { ID: "Round index down" } | { IN: "Round index to nearest" } | { MU: "Round index plus margin up" } | { MD: "Round index plus margin down" } | { MN: "Round index plus margin to nearest" }
      INTEREST_RATE_CAP_FREQUENCY: { '-': "None" } | { A: "Annually" } | { S: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" } | { D: "Daily" }
      INTEREST_RATE_CAP_PERIOD: Count
      INTEREST_RATE_CAP_DIRECTION: { I: "Increase only" } | { B: "Increase and decrease" }
      INTEREST_RATE_CAP_START_DATE: Date
      INTEREST_RATE_CAP_START_RATE: Rate
      INTEREST_RATE_CAP: Rate
      INTEREST_RATE_ADJUSTMENT: Rate
      INTEREST_RATE_ADJ_RSN_SERIAL: Serial
      INTEREST_CHARGED_YTD: Money
      INTEREST_CHARGED_LAST_YEAR: Money
      INTEREST_YTD: Money
      INTEREST_LAST_YEAR: Money
      PAYMENT_METHOD: { C: "Cash" } | { O: "Cash with coupons" } | { T: "Automatic transfer" } | { A: "ACH" } | { P: "Payroll" } | { D: "Distribution" }
      PAYMENT_COUPON_DATE: Date
      PAYMENT_AMOUNT_FOR_DUE_DATE: Money
      PAYMENT_AMOUNT: Money
      PAYMENT_PARTIAL_AMOUNT: Money
      PAYMENT_CALCULATION_SERIAL: Serial
      PAYMENT_CALCULATION_STATUS: { '-': "Normal" } | { F: "Fixed payment amount" } | { L: "Do not include overlimit until underlimit" }
      PAYMENT_CALCULATION_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" }
      PAYMENT_CALCULATION_SCH_FREQ_1: Count
      PAYMENT_CALCULATION_SCH_PERIOD: Count
      PAYMENT_CALCULATION_SCH_DATE: Date
      PAYMENT_COUNT_SCHEDULED: Count
      PAYMENT_COUNT_MADE: Count
      PAYMENT_COUNT_DQ_UNDER_30: Count
      PAYMENT_COUNT_DQ_30_TO_59: Count
      PAYMENT_COUNT_DQ_60_TO_89: Count
      PAYMENT_COUNT_DQ_90_TO_119: Count
      PAYMENT_COUNT_DQ_120_AND_UP: Count
      PAYMENT_LAST_DATE: Date
      PAYMENT_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      PAYMENT_FREQUENCY_DAY_1: Count
      PAYMENT_FREQUENCY_DAY_2: Count
      PAYMENT_SKIP_COUNT: Count
      PAYMENT_SKIP_START_MONTH: Count
      PAYMENT_SKIP_START_DAY: Count
      PAYMENT_AHEAD: { N: "No limit" } | { D: "On or after due date only" } | { O: "One due date" } | { C: "One due date beyond last payment change" } | { P: "Specified payment count" } | { S: "Specified day count" }
      PAYMENT_AHEAD_COUNT: Count
      PAYMENT_DUE_DATE: Date
      LATE_FEE_UNPAID: Money
      LATE_FEE_CALCULATION_SERIAL: Serial
      LATE_FEE_CALCULATION_DATE: Date
      LATE_FEE_CALCULATION_ACCR: Money
      MAINTENANCE_FEE_SERIAL: Serial
      MAINTENANCE_FEE_EFFECT_DATE: Date
      MAINTENANCE_FEE_EXPIRE_DATE: Date
      MAINTENANCE_FEE_UNPAID: Money
      IMPOUND_AMOUNT: Money
      IMPOUND_PARTIAL_AMOUNT: Money
      IMPOUND_SHARE_SERIAL: Serial
      LIFE_INSURANCE_SERIAL: Serial
      DISABILITY_INSURANCE_SERIAL: Serial
      SINGLE_PREMIUM_LIFE: Money
      SINGLE_PREMIUM_DISABILITY: Money
      INSURANCE_METHOD: { L: "Loan advance" } | { S: "Savings withdrawal" }
      INSURANCE_SHARE_SERIAL: Serial
      CRED_REP_PRIMARY_ECOA_CODE: { '-': "Default" } | { '1': "'1' Individual" } | { '2': "'2' Joint contractual liability" } | { '3': "'3' Authorized user" } | { '5': "'5' Comaker or guarantor" } | { '7': "'7' Maker" } | { T: "'T' Association with account terminated" } | { W: "'W' Business or commercial" } | { X: "'X' Consumer deceased" } | { Z: "'Z' Delete consumer" }
      CRED_REP_PRIMARY_CONS_INFO_IND: { '-': "Retain previous value" } | { A: "'A ' Petition for chapter 7 bankruptcy" } | { B: "'B ' Petition for chapter 11 bankruptcy" } | { C: "'C ' Petition for chapter 12 bankruptcy" } | { D: "'D ' Petition for chapter 13 bankruptcy" } | { E: "'E ' Discharged through bankruptcy chapter 7" } | { F: "'F ' Discharged through bankruptcy chapter 11" } | { G: "'G ' Discharged through bankruptcy chapter 12" } | { H: "'H ' Discharged through bankruptcy chapter 13" } | { I: "'I ' Chapter 7 bankruptcy dismissed" } | { J: "'J ' Chapter 11 bankruptcy dismissed" } | { K: "'K ' Chapter 12 bankruptcy dismissed" } | { L: "'L ' Chapter 13 bankruptcy dismissed" } | { M: "'M ' Chapter 7 bankruptcy withdrawn" } | { N: "'N ' Chapter 11 bankruptcy withdrawn" } | { O: "'O ' Chapter 12 bankruptcy withdrawn" } | { P: "'P ' Chapter 13 bankruptcy withdrawn" } | { Z: "'Z ' Bankruptcy - undesignated chapter" } | { '1A': "'1A' Personal receivership" } | { Q: "'Q ' Remove previously reported bankruptcy or personal receivership" } | { R: "'R ' Chapter 7 reaffirmation of debt" } | { V: "'V ' Chapter 7 reaffirmation of debt rescinded" } | { '2A': "'2A' Lease assumption" } | { S: "'S ' Remove previously reported reaffirmation or rescinded or assumption" } | { T: "'T ' Credit grantor cannot locate consumer" } | { U: "'U ' Consumer now located" }
      CRED_REP_BANKRUPTCY_DATE: Date
      CRED_REP_ACCOUNT_TYPE: { '-': "Do not report" } | { '00': "'00' Auto" } | { '01': "'01' Unsecured" } | { '02': "'02' Secured" } | { '03': "'03' Partially secured" } | { '04': "'04' Home improvement" } | { '05': "'05' FHA home improvement" } | { '06': "'06' Installment sales contract" } | { '07': "'07' Charge account" } | { '08': "'08' Real estate type unknown" } | { '10': "'10' Business loan" } | { '11': "'11' Recreational merchandise" } | { '12': "'12' Education" } | { '13': "'13' Lease" } | { '15': "'15' Line of credit" } | { '17': "'17' Manufactured housing" } | { '18': "'18' Credit card" } | { '19': "'19' FHA real estate mortgage" } | { '20': "'20' Note loan" } | { '25': "'25' VA real estate mortgage" } | { '26': "'26' Conventional real estate mortgage" } | { '29': "'29' Rental agreement" } | { '37': "'37' Combined credit plan" } | { '43': "'43' Debit card" } | { '47': "'47' Credit line secured" } | { '48': "'48' Collection agency or attorney" } | { '50': "'50' Family support" } | { '65': "'65' Government unsecured guaranteed loan" } | { '66': "'66' Government secured guaranteed loan" } | { '67': "'67' Government unsecured direct loan" } | { '68': "'68' Government secured direct loan" } | { '69': "'69' Government grant" } | { '70': "'70' Government overpayment" } | { '71': "'71' Government fine" } | { '72': "'72' Government fee for services" } | { '73': "'73' Government employee advance" } | { '74': "'74' Government miscellaneous debt" } | { '75': "'75' Government benefit" } | { '77': "'77' Returned check" } | { '89': "'89' Home equity line of credit" } | { '90': "'90' Medical debt" } | { '91': "'91' Debt consolidation" } | { '92': "'92' Utility company" } | { '93': "'93' Child support" } | { '95': "'95' Attorney fees" } | { '0A': "'0A' Time share loan" } | { '2A': "'2A' Secured credit card" } | { '3A': "'3A' Auto lease" } | { '5A': "'5A' Real estate junior liens" } | { '6A': "'6A' Commercial installment loan" } | { '7A': "'7A' Commercial line of credit" } | { '8A': "'8A' Business credit card" } | { '9A': "'9A' Secured home improvement" } | { '5B': "'5B' Second mortgage" } | { '6B': "'6B' Commercial mortgage loan" } | { '7B': "'7B' Agricultural" } | { '8B': "'8B' Deposit account with overdraft protection" } | { '9B': "'9B' Business line personally guaranteed" } | { '0C': "'0C' Debt buyer" } | { '2C': "'2C' USDA real estate mortgage" } | { '4D': "'4D' Telecommunications or cellular" } | { '6D': "'6D' Home equity" } | { '0F': "'0F' Construction loan" } | { '0G': "'0G' Flexible spending credit card" }
      CRED_REP_PORTFOLIO_TYPE_OVR: { '-': "None" } | { I: "'I' Installment" } | { C: "'C' Line of credit" } | { M: "'M' Mortgage" } | { O: "'O' Open account" } | { R: "'R' Revolving" }
      CRED_REP_SPEC_COMM_CODE: { '-': "None" } | { B: "'B ' Account payments managed by counseling program" } | { C: "'C ' Paid by comaker or guarantor" } | { H: "'H ' Loan assumed by another party" } | { I: "'I ' Election of remedy" } | { M: "'M ' Account closed at credit grantor request" } | { O: "'O ' Account transferred to another company or servicer" } | { S: "'S ' Special handling" } | { V: "'V ' Adjustment pending" } | { AB: "'AB' Debt being paid through insurance" } | { AC: "'AC' Paying under a partial payment agreement" } | { AH: "'AH' Purchased by another company" } | { AI: "'AI' Recalled to active military duty" } | { AL: "'AL' Student loan assigned to government" } | { AM: "'AM' Account payments assured by wage garnishment" } | { AN: "'AN' Account acquired by FDIC or NCUA" } | { AO: "'AO' Voluntarily surrendered then redeemed or reinstated" } | { AP: "'AP' Credit line suspended" } | { AS: "'AS' Account closed due to refinance" } | { AT: "'AT' Account closed due to transfer" } | { AU: "'AU' Account paid in full for less than full balance" } | { AV: "'AV' First payment never received" } | { AW: "'AW' Affected by natural or declared disaster" } | { AX: "'AX' Account paid from collateral" } | { AZ: "'AZ' Redeemed or reinstated repossession" } | { BA: "'BA' Transferred to recovery" } | { BB: "'BB' Full termination status pending" } | { BC: "'BC' Full termination obligation satisfied" } | { BD: "'BD' Full termination balance owing" } | { BE: "'BE' Early termination status pending" } | { BF: "'BF' Early termination obligation satisfied" } | { BG: "'BG' Early termination balance owing" } | { BH: "'BH' Early termination insurance loss" } | { BI: "'BI' Involuntary repossession" } | { BJ: "'BJ' Involuntary repossession obligation satisfied" } | { BK: "'BK' Involuntary repossession balance owing" } | { BL: "'BL' Credit card lost or stolen" } | { BN: "'BN' Paid by company which originally sold merchandise" } | { BO: "'BO' Foreclosure proceedings started" } | { BP: "'BP' Paid through insurance" } | { BS: "'BS' Prepaid lease" } | { BT: "'BT' Principal deferred interest payment only" } | { CH: "'CH' Guaranteed or insured" } | { CI: "'CI' Account closed due to inactivity" } | { CJ: "'CJ' Credit line no longer available in repayment phase" } | { CK: "'CK' Credit line reduced due to collateral depreciation" } | { CL: "'CL' Credit line suspended due to collateral depreciation" } | { CM: "'CM' Collateral released by creditor balance owing" } | { CN: "'CN' Loan modified under federal government plan" } | { CO: "'CO' Loan modified" } | { CP: "'CP' Account in forbearance" } | { CS: "'CS' Child support agency only" }
      CRED_REP_COMP_COND_CODE: { '-': "Retain previous value" } | { XA: "'XA' Closed at consumer request" } | { XB: "'XB' FCRA dispute" } | { XC: "'XC' FCRA dispute completed - consumer disagrees" } | { XD: "'XD' Closed at consumer request - FCRA dispute" } | { XE: "'XE' Closed at consumer request - dispute completed - consumer disagrees" } | { XF: "'XF' FCBA dispute" } | { XG: "'XG' FCBA dispute completed - consumer disagrees" } | { XH: "'XH' Previously in dispute - now completed" } | { XJ: "'XJ' Closed at consumer request - FCBA dispute" } | { XR: "'XR' Remove most recent code" }
      CRED_REP_FIRST_DQ_DATE: Date
      CRED_REP_ACCOUNT_STATUS: { '11': "'11' Current account" } | { '13': "'13' Paid or closed account zero balance" } | { '61': "'61' Account paid in full - was a voluntary surrender" } | { '62': "'62' Account paid in full - was a collection account" } | { '63': "'63' Account paid in full - was a repossession" } | { '64': "'64' Account paid in full - was a charge off" } | { '65': "'65' Account paid in full - foreclosure was started" } | { '71': "'71' Account 30-59 days past due" } | { '78': "'78' Account 60-89 days past due" } | { '80': "'80' Account 90-119 days past due" } | { '82': "'82' Account 120-149 days past due" } | { '83': "'83' Account 150-179 days past due" } | { '84': "'84' Account 180 or more days past due" } | { '88': "'88' Claim filed with government" } | { '89': "'89' Deed received in lieu of foreclosure - there may be a balance due" } | { '93': "'93' Account assigned to collections" } | { '94': "'94' Foreclosure completed - there may be a balance due" } | { '95': "'95' Voluntary surrender - there may be a balance due" } | { '96': "'96' Merchandise was repossessed - there may be a balance due" } | { '97': "'97' Unpaid balance reported as a loss - charge off" } | { DA: "'DA' Delete entire account for reasons other than fraud" } | { DF: "'DF' Delete entire account due to confirmed fraud" } | { '05': "'05' Account transferred (no longer used)" }
      CRED_REP_PMT_HISTORY_PROFILE: string
      CRED_REP_LAST_DATE: Date
      MONETARY_PURGE_DATE: Date
      LAST_MONETARY_DATE: Date
      LAST_ACTIVITY_DATE: Date
      LAST_ADVANCE_DATE: Date
      ORIGINAL_LOAN_DATE: Date
      ORIGINAL_FUNDING_DATE: Date
      ORIGINAL_DUE_DATE: Date
      ORIGINAL_BALANCE: Money
      ACQUISITION_DATE: Date
      ACQUISITION_BALANCE: Money
      ACH_PAYMENT_LAST_AMOUNT: Money
      ACH_PAYMENT_LAST_DATE: Date
      MAIL_PERSON_ADDR_LINK_SERIAL: Serial
      STMT_MAIL_GROUP_SERIAL: Serial
      STMT_CUTOFF_GROUP_SERIAL: Serial
      STMT_CUTOFF_LAST_DATE: Date
      STMT_CUTOFF_LAST_TRAN_SERIAL: Serial
      STMT_CUTOFF_PRIOR_DATE: Date
      STMT_CUTOFF_PRIOR_TRAN_SERIAL: Serial
      STMT_REG_E_COUNT: Count
      PROCESSOR_USER_SERIAL: Serial
      APPROVAL_OFFICER_SERIAL: Serial
      APPROVAL_DATE: Date
      APPLICATION_SERIAL: Serial
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      CREDIT_SCORE: Count
      PAPER_GRADE_SERIAL: Serial
      TAX_PERSON_SERIAL: Serial
      FASB_91_TYPE_SERIAL: Serial
      FASB_91_ORIGINAL_APR: Rate
      FASB_91_EFFECTIVE_APR: Rate
      FASB_91_UNAMORTIZED_FEES: Money
      FASB_91_AMORTIZATION_AMOUNT: Money
      FASB_91_FUNDING_OPTION: { '-': "None" } | { R: "Required" } | { P: "Posted" }
      CC_PURCH_BAL_OLD: Money
      CC_PURCH_BAL_NEW: Money
      CC_PURCH_AVG_BAL: Money
      CC_PURCH_INT_RATE: Rate
      CC_PURCH_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_PURCH_INT_CHARGE: Money
      CC_PURCH_INT_UNPAID_OLD: Money
      CC_PURCH_INT_UNPAID_NEW: Money
      CC_PURCH_GRACE_IND_OLD: { N: "No" } | { Y: "Yes" }
      CC_PURCH_GRACE_IND_NEW: { N: "No" } | { Y: "Yes" }
      CC_CASH_ADV_BAL_OLD: Money
      CC_CASH_ADV_BAL_NEW: Money
      CC_CASH_ADV_AVG_BAL: Money
      CC_CASH_ADV_INT_RATE: Rate
      CC_CASH_ADV_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_CASH_ADV_INT_CHARGE: Money
      CC_CASH_ADV_INT_UNPAID_OLD: Money
      CC_CASH_ADV_INT_UNPAID_NEW: Money
      CC_CASH_ADV_GRACE_IND_OLD: { N: "No" } | { Y: "Yes" }
      CC_CASH_ADV_GRACE_IND_NEW: { N: "No" } | { Y: "Yes" }
      CC_BAL_XFR_BAL_OLD: Money
      CC_BAL_XFR_BAL_NEW: Money
      CC_BAL_XFR_AVG_BAL: Money
      CC_BAL_XFR_INT_RATE: Rate
      CC_BAL_XFR_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_BAL_XFR_INT_CHARGE: Money
      CC_BAL_XFR_INT_UNPAID_OLD: Money
      CC_BAL_XFR_INT_UNPAID_NEW: Money
      CC_BAL_XFR_GRACE_IND_OLD: { N: "No" } | { Y: "Yes" }
      CC_BAL_XFR_GRACE_IND_NEW: { N: "No" } | { Y: "Yes" }
      CC_FEE_BAL_OLD: Money
      CC_FEE_BAL_NEW: Money
      CC_TOTAL_BAL_OLD: Money
      CC_TOTAL_BAL_NEW: Money
      CC_FIRST_YEAR_FEES_MAXIMUM: Money
      CC_FIRST_YEAR_FEES_CHARGED: Money
      CC_PENALTY_INT_RATE: Rate
      EXTERNAL_ACCOUNT_NUMBER: string
      EXTERNAL_ACCOUNT_ACTION: { '-': "None" } | { C: "Create" }
      EXTERNAL_INVESTOR_BANK_CODE: string
      EXTERNAL_INVESTOR_CODE: string
      EXTERNAL_INVESTOR_GROUP_CODE: string
      LAST_IMPORT_DATE: Date
      TYPE_SERIAL: Serial
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      BRANCH_SERIAL: Serial
      OPEN_DATE: Date
      OPENED_BY_USER_SERIAL: Serial
      CLOSE_DATE: Date
      CLOSE_REASON_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { P: "Payment and inquiry" } | { I: "Inquiry only" }
      NOTE_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      MATURITY_DATE: Date
      PURPOSE_SERIAL: Serial
      COLLATERAL_TYPE_SERIAL: Serial
      SHARED_COLLATERAL_OPTION: { N: "Not allowed" } | { Y: "Allowed" }
      NOTE_NUMBER: string
      SHARE_SECURED_OPTION: { N: "Not savings secured" } | { L: "Partially savings secured}|{ release last" } | { F: "Partially savings secured}|{ release first" } | { S: "Fully savings secured" } | { A: "Fixed savings secured amount" }
      SHARE_SECURED_AMOUNT: Money
      BALLOON_DATE: Date
      BALLOON_AMOUNT: Money
      PROMO_RATE_TYPE_SERIAL: Serial
      SEGMENT_COUNT_LIMIT: Count
      MLA_LIMITATION: { N: "No" } | { Y: "Yes" } | { U: "Unknown" }
      PARTICIPATION_POOL_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    CU_LOAN_APP_REAPPROV_RULE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CU_LOAN_TYPE_SERIAL: Serial
      CU_TABLE_NAME: string
      CU_COLUMN_NAME: string
      CU_RULE_TYPE: { '-': "None" } | { I: "Ignore" } | { P: "Percentage" } | { V: "Value" } | { A: "Aging" } | { M: "Months" }
      CU_LOWER_LIMIT: string
      CU_UPPER_LIMIT: string
      CU_COMPARISON_COLUMN_NAME: string
      LAST_FM_DATE: Date
    }
    LN_BUDGET: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      BUDGET_AMOUNT: Money
      COMPLETION_DEADLINE_DATE: Date
      AMOUNT_UNALLOCATED: Money
      AMOUNT_DRAWN: Money
      LAST_FM_DATE: Date
    }
    LN_BUDGET_ITEM: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      INSPECTION_PERCENT: Rate
      BUDGET_AMOUNT: Money
      AMOUNT_DRAWN: Money
      LAST_FM_DATE: Date
    }
    LN_BUDGET_ITEM_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    LN_BUDGET_TPL: {
      SERIAL: Serial
      ACCESS_KEY: string
      TEMPLATE_NAME: string
      TEMPLATE_STATUS: { O: "Open" } | { C: "Closed" }
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    LN_BUDGET_TPL_ITEM: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    LN_BUDGET_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    LN_CHARGE_OFF_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CHARGE_OFF_GL_SERIAL: Serial
      CHARGE_OFF_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      RECOVERY_GL_SERIAL: Serial
      RECOVERY_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    COLLATERAL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      CATEGORY: { G: "General" } | { V: "Vehicle" } | { R: "Real estate" } | { S: "Savings secured" } | { A: "Asset" } | { C: "Shared collateral" }
      DESCRIPTION: string
      VEHICLE_CATEGORY: { '-': "None" } | { A: "Automobile" } | { C: "Motorcycle" } | { B: "Boat" } | { M: "Motorhome" } | { T: "Trailer" } | { R: "Motor" }
      VEHICLE_LICENSE_NUMBER: string
      VIN: string
      VEHICLE_MAKE: string
      VEHICLE_MODEL: string
      VEHICLE_BODY_TYPE: string
      VEHICLE_COLOR: string
      VEHICLE_YEAR: Count
      VEHICLE_ENGINE_SIZE: Count
      VEHICLE_ODOMETER: Count
      VEHICLE_ODOMETER_DATE: Date
      VEHICLE_HOURS: Count
      VEHICLE_HOURS_DATE: Date
      VEHICLE_CLEAN_TRADE_IN_VALUE: Money
      VEHICLE_CLEAN_LOAN_VALUE: Money
      INDIRECT_OPTION: { N: "No" } | { Y: "Yes" }
      VEHICLE_CASH_PURCHASE_PRICE: Money
      VEHICLE_REBATE: Money
      VEHICLE_TAXES: Money
      VEHICLE_TITLE_LIC_REG: Money
      VEHICLE_DOCUMENTATION_FEES: Money
      VEHICLE_THEFT_DETERRENT: Money
      VEHICLE_ENVIRONMENTAL_PACKAGE: Money
      VEHICLE_GAP: Money
      VEHICLE_CREDIT_LIFE: Money
      VEHICLE_CREDIT_DISABILITY: Money
      VEHICLE_WARRANTY: Money
      VEHICLE_OTHER_BACK_END_FEES: Money
      DEALER_SERIAL: Serial
      DEALER_NUMBER: string
      DEALER_COMPENSATION_CALC: { S: "System" } | { M: "Manual" }
      DEALER_FLAT_FEE: Money
      DEALER_MARKUP: Rate
      DEALER_MARKUP_FEE: Money
      DEALER_DEDUCTION_AMOUNT: Money
      DEALER_DEDUCTION_DESCRIPTION: string
      DEALER_COMPENSATION_PAID_DATE: Date
      DEALER_REFUND: Money
      DEALER_REFUND_REQUESTED_DATE: Date
      DEALER_REFUND_RECEIVED_DATE: Date
      APPLICATION_NUMBER: string
      REES_LEVERING_OPTION: { N: "No" } | { Y: "Yes" }
      RECOVERY_OPTION: { '-': "None" } | { B: "Bankruptcy" } | { C: "Charge off" } | { P: "Dealer repurchase" } | { R: "Repossession" } | { X: "Resolved credit issue" }
      RECOVERY_DATE: Date
      ACCOUNT_OPTION: { '-': "None" } | { F: "Financed loan" } | { D: "Dealer loan indirect" } | { R: "Refinance" } | { P: "Person to person" } | { B: "Lease buyout" } | { O: "Other" }
      PROPERTY_CATEGORY: { '-': "None" } | { C: "Condo" } | { O: "Commercial" } | { M: "Mobile home" } | { R: "Residential" }
      PROPERTY_ADDRESS_SERIAL: Serial
      PROPERTY_ADDRESS_COUNTY: string
      PROPERTY_COUNT: Count
      LEGAL_DESCRIPTION: string
      OWNER_OCCUPIED_OPTION: { N: "No" } | { Y: "Yes" }
      SECOND_HOME_OPTION: { N: "No" } | { Y: "Yes" }
      RENTAL_OPTION: { N: "No" } | { Y: "Yes" }
      VACANT_OPTION: { N: "No" } | { Y: "Yes" }
      LAND_LOAN_OPTION: { N: "No" } | { Y: "Yes" }
      HAZARD_IMPOUND_OPTION: { N: "No" } | { Y: "Yes" }
      TAXES_IMPOUND_OPTION: { N: "No" } | { Y: "Yes" }
      FLOOD_INSURANCE_OPTION: { N: "No" } | { Y: "Yes" }
      FLOOD_ZONE: { '-': "None" } | { A: "Zone A" } | { AE: "Zone AE; replaces zones A1-30" } | { AH: "Zone AH" } | { AO: "Zone AO" } | { AR: "Zone AR" } | { A99: "Zone A99" } | { V: "Zone V" } | { VE: "Zone VE; replaces zones V1-30" } | { X: "Zone X (shaded); replaces zone B" } | { x: "Zone X (unshaded); replaces zone C" } | { D: "Zone D" }
      DEED_DOCUMENT_NUMBER: string
      RECONVEYANCE_DOCUMENT_NUMBER: string
      TAX_ASSESSOR_PARCEL_NUMBER: string
      TAX_SERVICER_CONTRACT_NUMBER: string
      MLS_REBATE_AMOUNT: Money
      SHORT_SALE_OPTION: { N: "No" } | { Y: "Yes" }
      SHORT_SALE_DATE: Date
      FORECLOSURE_OPTION: { N: "No" } | { Y: "Yes" }
      FORECLOSURE_DATE: Date
      REO_OPTION: { N: "No" } | { Y: "Yes" }
      REO_DATE: Date
      OTH_MTG_CATEGORY: { '-': "None" } | { F: "First" } | { S: "Second" }
      OTH_MTG_BALANCE: Money
      OTH_MTG_PAYMENT_AMOUNT: Money
      OTH_MTG_INT_ONLY_OPTION: { N: "No" } | { Y: "Yes" }
      OTH_MTG_RATE: Rate
      OTH_MTG_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      OTH_MTG_RATE_INDEX_SERIAL: Serial
      OTH_MTG_RATE_MARGIN: Rate
      OTH_MTG_RATE_MAXIMUM: Rate
      OTH_MTG_RATE_CHG_NEXT_DATE: Date
      OTH_MTG_RATE_CHG_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      OTH_MTG_HOLDER_PERSON_SERIAL: Serial
      OTH_MTG_INFORMATION_DATE: Date
      HMDA_REPORTING_OPTION: { N: "No" } | { Y: "Yes" } | { E: "Partial exemption" }
      HMDA_APPLICATION_NUMBER: string
      HMDA_APPLICATION_DATE: Date
      HMDA_LOAN_TYPE: { '1': "Conventional" } | { '2': "FHA insured" } | { '3': "VA guaranteed" } | { '4': "FSA/RHS guaranteed" }
      HMDA_LOAN_PURPOSE: { '1': "Home purchase" } | { '2': "Home improvement" } | { '31': "Refinancing" } | { '32': "Cash-out refinancing" } | { '4': "Other purpose" } | { '5': "Not applicable" }
      HMDA_PROPERTY_TYPE: { '1': "One to four family dwelling" } | { '2': "Manufactured housing" } | { '3': "Multifamily dwelling" }
      HMDA_OWNER_OCCUPANCY: { '1': "Owner occupied as a principal dwelling" } | { '2': "Not owner occupied as a principal dwelling" } | { '3': "Not applicable" }
      HMDA_LOAN_AMOUNT: Money
      HMDA_PREAPPROVAL: { '1': "Preapproval requested" } | { '2': "Preapproval not requested" } | { '3': "Not applicable" }
      HMDA_CONSTRUCTION_METHOD: { '1': "Site-built" } | { '2': "Manufactured home" }
      HMDA_OCCUPANCY_TYPE: { '1': "Principal residence" } | { '2': "Second residence" } | { '3': "Investment property" }
      HMDA_ACTION_TAKEN: { '1': "Loan originated" } | { '2': "Application approved but not accepted" } | { '3': "Application denied" } | { '4': "Application withdrawn" } | { '5': "File closed for incompleteness" } | { '6': "Loan purchased by us" } | { '7': "Preapproval request denied" } | { '8': "Preapproval request approved but not accepted" }
      HMDA_ACTION_DATE: Date
      HMDA_STREET: string
      HMDA_CITY: string
      HMDA_STATE: string
      HMDA_POSTAL_CODE: string
      HMDA_MSA_MD_CODE: string
      HMDA_STATE_CODE: { NA: "Not applicable" } | { '01': "Alabama" } | { '02': "Alaska" } | { '04': "Arizona" } | { '05': "Arkansas" } | { '06': "California" } | { '08': "Colorado" } | { '09': "Connecticut" } | { '10': "Delaware" } | { '11': "District of Columbia" } | { '12': "Florida" } | { '13': "Georgia" } | { '15': "Hawaii" } | { '16': "Idaho" } | { '17': "Illinois" } | { '18': "Indiana" } | { '19': "Iowa" } | { '20': "Kansas" } | { '21': "Kentucky" } | { '22': "Louisiana" } | { '23': "Maine" } | { '24': "Maryland" } | { '25': "Massachusetts" } | { '26': "Michigan" } | { '27': "Minnesota" } | { '28': "Mississippi" } | { '29': "Missouri" } | { '30': "Montana" } | { '31': "Nebraska" } | { '32': "Nevada" } | { '33': "New Hampshire" } | { '34': "New Jersey" } | { '35': "New Mexico" } | { '36': "New York" } | { '37': "North Carolina" } | { '38': "North Dakota" } | { '39': "Ohio" } | { '40': "Oklahoma" } | { '41': "Oregon" } | { '42': "Pennsylvania" } | { '44': "Rhode Island" } | { '45': "South Carolina" } | { '46': "South Dakota" } | { '47': "Tennessee" } | { '48': "Texas" } | { '49': "Utah" } | { '50': "Vermont" } | { '51': "Virginia" } | { '53': "Washington" } | { '54': "West Virginia" } | { '55': "Wisconsin" } | { '56': "Wyoming" } | { '60': "American Samoa" } | { '64': "Federated States of Micronesia" } | { '66': "Guam" } | { '68': "Marshall Islands" } | { '69': "Northern Mariana Islands" } | { '70': "Palau" } | { '72': "Puerto Rico" } | { '74': "U.S. Minor Outlying Islands" } | { '78': "Virgin Islands of the U.S." }
      HMDA_COUNTY_CODE: string
      HMDA_CENSUS_TRACT: string
      HMDA_APPLICANT_ETHNICITY: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_2: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_3: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_4: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_5: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_TXT: string
      HMDA_APPLICANT_ETHNICITY_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_APPLICANT_RACE_1: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_2: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_3: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_4: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_5: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_TRI_TXT: string
      HMDA_APPLICANT_RACE_ASI_TXT: string
      HMDA_APPLICANT_RACE_ISL_TXT: string
      HMDA_APPLICANT_RACE_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_APPLICANT_SEX: { '-': "None" } | { '1': "Male" } | { '2': "Female" } | { '3': "Information not provided" } | { '4': "Not applicable" } | { '6': "Both male and female" }
      HMDA_APPLICANT_SEX_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_APPLICANT_AGE: Count
      HMDA_APPLICANT_CR_SCORE: Count
      HMDA_APPLICANT_CR_SCORE_MOD: { '-': "None" } | { '1': "Equifax Beacon 5.0" } | { '2': "Experian Fair Isaac" } | { '3': "FICO Risk Score Classic 04" } | { '4': "FICO Risk Score Classic 98" } | { F: "FICO Score 9" } | { '5': "Vantage Score 2.0" } | { '6': "Vantage Score 3.0" } | { '7': "More than one" } | { '8': "Other" } | { '9': "Not applicable" } | { E: "Exempt" }
      HMDA_APPLICANT_CR_SCORE_TXT: string
      HMDA_COAPPLICANT_ETHNICITY: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_2: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_3: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_4: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_5: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_TXT: string
      HMDA_COAPPLICANT_ETHNICITY_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_COAPPLICANT_RACE_1: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_2: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_3: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_4: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_5: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_IND_TXT: string
      HMDA_COAPPLICANT_RACE_ASI_TXT: string
      HMDA_COAPPLICANT_RACE_ISL_TXT: string
      HMDA_COAPPLICANT_RACE_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_COAPPLICANT_SEX: { '-': "None" } | { '1': "Male" } | { '2': "Female" } | { '3': "Information not provided" } | { '4': "Not applicable" } | { '6': "Both male and female" }
      HMDA_COAPPLICANT_SEX_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_COAPPLICANT_AGE: Count
      HMDA_COAPPLICANT_CR_SCORE: Count
      HMDA_COAPPLICANT_CR_SCORE_MOD: { '-': "None" } | { '1': "Equifax Beacon 5.0" } | { '2': "Experian Fair Isaac" } | { '3': "FICO Risk Score Classic 04" } | { '4': "FICO Risk Score Classic 98" } | { F: "FICO Score 9" } | { '5': "Vantage Score 2.0" } | { '6': "Vantage Score 3.0" } | { '7': "More than one" } | { '8': "Other" } | { '9': "Not applicable" } | { E: "Exempt" }
      HMDA_COAPPLICANT_CR_SCORE_TXT: string
      HMDA_APPLICANT_INCOME: Money
      HMDA_PURCHASER_TYPE: { '0': "Not sold" } | { '1': "Fannie Mae" } | { '2': "Ginnie Mae" } | { '3': "Freddie Mac" } | { '4': "Farmer Mac" } | { '5': "Private securitization" } | { '6': "Commercial bank}|{ savings bank}|{ or savings association" } | { '71': "Credit union}|{ mortgage company}|{ or finance company" } | { '72': "Life insurance company" } | { '8': "Affiliate institution" } | { '9': "Other" }
      HMDA_DENIAL_REASON_1: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_2: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_3: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_4: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_TXT: string
      HMDA_RATE_SPREAD: Rate
      HMDA_HOEPA_STATUS: { '1': "HOEPA loan" } | { '2': "Not HOEPA loan" } | { '3': "Not applicable" }
      HMDA_LIEN_STATUS: { '1': "Secured by a first lien" } | { '2': "Secured by a subordinate lien" } | { '3': "Not secured by a lien" } | { '4': "Not applicable" }
      HMDA_TOTAL_LOAN_COSTS: Money
      HMDA_TOTAL_POINTS_AND_FEES: Money
      HMDA_ORIGINATION_CHARGES: Money
      HMDA_DISCOUNT_POINTS: Money
      HMDA_LENDER_CREDITS: Money
      HMDA_INTEREST_RATE: Rate
      HMDA_PREPAYMENT_PENALTY_TERM: Count
      HMDA_DEBT_TO_INCOME_RATIO: Rate
      HMDA_COMBINED_LTV_RATIO: Rate
      HMDA_LOAN_TERM: Count
      HMDA_INTRODUCTORY_RATE_PERIOD: Count
      HMDA_BALLOON_PAYMENT: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_INTEREST_ONLY_PAYMENTS: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_NEGATIVE_AMORTIZATION: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_OTHER_NON_AMORTIZING: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_PROPERTY_VALUE: Money
      HMDA_MANU_HOME_SEC_PROP_TYPE: { '1': "Manufactured home and land" } | { '2': "Manufactured home and not land" } | { '3': "Not applicable" } | { E: "Exempt" }
      HMDA_MANU_HOME_LAND_PROP_INT: { '1': "Direct ownership" } | { '2': "Indirect ownership" } | { '3': "Paid leasehold" } | { '4': "Unpaid leasehold" } | { '5': "Not applicable" } | { E: "Exempt" }
      HMDA_TOTAL_UNITS: Count
      HMDA_MULTIFAMILY_AFF_UNITS: Count
      HMDA_APPLICATION_SUBMISSION: { '1': "Submitted directly" } | { '2': "Not submitted directly" } | { '3': "Not applicable" } | { E: "Exempt" }
      HMDA_INITIALLY_PAYABLE: { '1': "Yes" } | { '2': "No" } | { '3': "Not applicable" } | { E: "Exempt" }
      HMDA_NMLSR_ID: string
      HMDA_AUTO_UNDER_SYSTEM_1: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_2: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_3: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_4: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_5: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_TXT: string
      HMDA_AUTO_UNDER_RESULT_1: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_2: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_3: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_4: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_5: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_TXT: string
      HMDA_REVERSE_MORTGAGE: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_OPEN_END_LINE_OF_CREDIT: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_BUSINESS_PURPOSE: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      SECURED_SHARE_SERIAL: Serial
      PERCENTAGE: Rate
      SECURED_SHARE_ADD_AMOUNT: Money
      ASSET_CATEGORY: { '-': "None" } | { I: "Invoice" } | { E: "Equipment" } | { Y: "Inventory" } | { S: "Security" }
      SECURITY_ISSUER_NAME: string
      SECURITY_ISSUED_DATE: Date
      SECURITY_QUANTITY: Count
      SECURITY_CUSIP_NUMBER: string
      SECURITY_RELEASED_USER_SERIAL: Serial
      TITLE_NAME: string
      TITLE_ADDRESS_SERIAL: Serial
      TITLE_COMPANY_PERSON_SERIAL: Serial
      TITLE_LOCATION_OPTION: { '-': "None" } | { I: "In-house" } | { C: "Collateral Management Company" }
      TITLE_RESPONSIBLE_PARTY: { C: "Credit Union" } | { D: "Dealer" } | { M: "Member" }
      TITLE_HARD_COPY_OPTION: { N: "No" } | { Y: "Yes" }
      TITLE_STATE: string
      TITLE_COUNTY: string
      TITLE_REQUESTED_DATE: Date
      TITLE_RECEIVED_DATE: Date
      TITLE_RELEASED_OPTION: { '-': "None" } | { O: "Registered owner" } | { F: "Financial institution" } | { D: "Dealer" } | { I: "Insurance company" }
      TITLE_RELEASED_DATE: Date
      TITLE_RELEASED_BY_USER_SERIAL: Serial
      TITLE_SENT_DATE: Date
      TITLE_ELT_NUMBER: string
      LIEN_PERFECTED_DATE: Date
      LIEN_REF_RELEASE_RECEIVED_DATE: Date
      SOURCE_COLLATERAL_SERIAL: Serial
      VEHICLE_MSRP: Money
      VEHICLE_INVOICE: Money
      VEHICLE_RETAIL_VALUE: Money
      VEHICLE_WHOLESALE_VALUE: Money
      SELLER_CATEGORY: { '-': "None" } | { D: "Dealer" } | { P: "Private party" }
      SELLER_PERSON_SERIAL: Serial
      PAYOFF_PERSON_SERIAL: Serial
      OWNER_PERSON_SERIAL: Serial
      BORROWER_OTHER_NAME: string
      VALUATION_DATE: Date
      VALUATION_DOCUMENT: Document
      AMOUNT: Money
      LOAN_TO_VALUE: Rate
      TOTAL_LOAN_TO_VALUE: Rate
      HIGHEST_ALLOWED_LOAN_TO_VALUE: Rate
      FRONT_END_LOAN_TO_VALUE: Rate
      BACK_END_LOAN_TO_VALUE: Rate
      BORROWING_RATE: Rate
      SHARED_COLLATERAL_OPTION: { N: "Not allowed" } | { Y: "Allowed" }
      LAST_FM_DATE: Date
    }
    COLLATERAL_INSURANCE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      CATEGORY: { G: "GAP" } | { M: "MBP" } | { C: "Collision" } | { F: "Fire" } | { L: "Flood" } | { P: "PMI" } | { c: "CPI" } | { O: "Other" }
      COMPANY_PERSON_SERIAL: Serial
      AGENT: string
      POLICY_NUMBER: string
      QUOTE_NUMBER: string
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      RECEIVED_DATE: Date
      SOLD_DATE: Date
      SOLD_BY_USER_SERIAL: Serial
      AMOUNT: Money
      INTEREST_CALCULATION_DATE: Date
      INTEREST_CALCULATED: Money
      PAYMENT_AMOUNT: Money
      PAYMENT_COUNT_SCHEDULED: Count
      PAYMENT_DUE_DATE: Date
      MATURITY_DATE: Date
      CPI_LOAN_SERIAL: Serial
      SINGLE_MONTHLY_PREMIUM_AMOUNT: Money
      SINGLE_MONTHLY_PREMIUM_TOTAL: Money
      LAST_FM_DATE: Date
    }
    COLLATERAL_INSURANCE_REFUND: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      EXPIRATION_DATE: Date
      RECEIVED_DATE: Date
      AMOUNT: Money
      INTEREST_CALCULATION_DATE: Date
      INTEREST_CALCULATED: Money
      PAYMENT_AMOUNT: Money
      PAYMENT_COUNT_SCHEDULED: Count
      PAYMENT_DUE_DATE: Date
      MATURITY_DATE: Date
      LAST_FM_DATE: Date
    }
    COLLATERAL_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { C: "Shared collateral" }
      LOAN_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    COLLATERAL_VALUATION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      VALUATION_DATE: Date
      VALUATION_DOCUMENT: Document
      AMOUNT: Money
      LOAN_TO_VALUE: Rate
      LAST_FM_DATE: Date
    }
    COLLATERAL_VALUATION_ITEM: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LN_COVENANT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARED_COVENANT_OPTION: { N: "No" } | { Y: "Yes" }
      SHARED_COVENANT_SERIAL: Serial
      TYPE_SERIAL: Serial
      STATUS: { U: "Unbroken" } | { B: "Broken" } | { W: "Waived" }
      BROKEN_DATE: Date
      WAIVER_EXPIRATION_DATE: Date
      FREQUENCY: { '-': "None" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" }
      DUE_DATE: Date
      GRACE_DAYS: Count
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_REQUESTED_DATE: Date
      LAST_RECEIVED_DATE: Date
      LAST_REVIEWER_USER_SERIAL: Serial
      LAST_REVIEW_DATE: Date
      NEXT_REVIEW_DATE: Date
      EXPLANATION: string
      COMMENT: string
      LAST_FM_DATE: Date
    }
    LN_COVENANT_ACTIVITY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      EXPLANATION: string
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_CREDIT_LIMIT_SHARED_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    LN_DAILY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      BANKING_DATE: Date
      NSF_COUNT: Count
      NSF_AMOUNT: Money
      NEGATIVE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LOAN_DFLT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEFAULTS_NAME: string
      DEFAULTS_STATUS: { O: "Open" } | { C: "Closed" }
      ID: string
      DESCRIPTION: string
      MINIMUM_BALANCE: Money
      MINIMUM_ADVANCE: Money
      CREDIT_LIMIT: Money
      CREDIT_LIMIT_EXPIRATION_DATE: Date
      CREDIT_LIMIT_SHARED_GRP_SERIAL: Serial
      CC_CASH_ADV_LIMIT_PERCENTAGE: Rate
      CC_CASH_ADV_LIMIT_AMOUNT: Money
      POSITIVE_PAY_OPTION: { '-': "None" } | { D: "Check" } | { A: "ACH" } | { B: "Check and ACH" }
      DRAW_PERIOD_EXPIRATION_DATE: Date
      MAX_VALUATION_CREDIT_LIMIT: Money
      COLLECTION_HANDLING: { '-': "Normal" } | { RM: "Removal" } | { RF: "Referral" }
      INTEREST_RATE: Rate
      INTEREST_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      INTEREST_RATE_INDEX_SERIAL: Serial
      INTEREST_RATE_MARGIN: Rate
      INTEREST_RATE_DISCOUNT: Rate
      INTEREST_RATE_RISK_PREMIUM: Rate
      INTEREST_RATE_MINIMUM: Rate
      INTEREST_RATE_MAXIMUM: Rate
      INTEREST_RATE_CHG_START_DATE: Date
      INTEREST_RATE_CHG_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      INTEREST_RATE_CHG_SCH_FREQ_1: Count
      INTEREST_RATE_CHG_SCH_FREQ_2: Count
      INTEREST_RATE_CHG_SCH_PERIOD: Count
      INTEREST_RATE_CHG_SCH_DATE: Date
      INTEREST_RATE_CHG_SCH_RND_INC: Rate
      INTEREST_RATE_CHG_SCH_RND_OPT: { '-': "None" } | { IU: "Round index up" } | { ID: "Round index down" } | { IN: "Round index to nearest" } | { MU: "Round index plus margin up" } | { MD: "Round index plus margin down" } | { MN: "Round index plus margin to nearest" }
      INTEREST_RATE_CAP_FREQUENCY: { '-': "None" } | { A: "Annually" } | { S: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" } | { D: "Daily" }
      INTEREST_RATE_CAP_PERIOD: Count
      INTEREST_RATE_CAP_DIRECTION: { I: "Increase only" } | { B: "Increase and decrease" }
      INTEREST_RATE_CAP_START_DATE: Date
      INTEREST_RATE_CAP_START_RATE: Rate
      INTEREST_RATE_CAP: Rate
      PAYMENT_METHOD: { C: "Cash" } | { O: "Cash with coupons" } | { T: "Automatic transfer" } | { A: "ACH" } | { P: "Payroll" } | { D: "Distribution" }
      PAYMENT_CALCULATION_SERIAL: Serial
      PAYMENT_CALCULATION_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" }
      PAYMENT_CALCULATION_SCH_FREQ_1: Count
      PAYMENT_CALCULATION_SCH_PERIOD: Count
      PAYMENT_CALCULATION_SCH_DATE: Date
      PAYMENT_COUNT_SCHEDULED: Count
      PAYMENT_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      PAYMENT_FREQUENCY_DAY_1: Count
      PAYMENT_FREQUENCY_DAY_2: Count
      PAYMENT_SKIP_COUNT: Count
      PAYMENT_SKIP_START_MONTH: Count
      PAYMENT_SKIP_START_DAY: Count
      PAYMENT_AHEAD: { N: "No limit" } | { D: "On or after due date only" } | { O: "One due date" } | { C: "One due date beyond last payment change" } | { P: "Specified payment count" } | { S: "Specified day count" }
      PAYMENT_AHEAD_COUNT: Count
      LATE_FEE_CALCULATION_SERIAL: Serial
      MAINTENANCE_FEE_SERIAL: Serial
      MAINTENANCE_FEE_EFFECT_DATE: Date
      MAINTENANCE_FEE_EXPIRE_DATE: Date
      LIFE_INSURANCE_SERIAL: Serial
      DISABILITY_INSURANCE_SERIAL: Serial
      INSURANCE_METHOD: { L: "Loan advance" } | { S: "Savings withdrawal" }
      CRED_REP_ACCOUNT_TYPE: { '-': "Do not report" } | { '00': "'00' Auto" } | { '01': "'01' Unsecured" } | { '02': "'02' Secured" } | { '03': "'03' Partially secured" } | { '04': "'04' Home improvement" } | { '05': "'05' FHA home improvement" } | { '06': "'06' Installment sales contract" } | { '07': "'07' Charge account" } | { '08': "'08' Real estate type unknown" } | { '10': "'10' Business loan" } | { '11': "'11' Recreational merchandise" } | { '12': "'12' Education" } | { '13': "'13' Lease" } | { '15': "'15' Line of credit" } | { '17': "'17' Manufactured housing" } | { '18': "'18' Credit card" } | { '19': "'19' FHA real estate mortgage" } | { '20': "'20' Note loan" } | { '25': "'25' VA real estate mortgage" } | { '26': "'26' Conventional real estate mortgage" } | { '29': "'29' Rental agreement" } | { '37': "'37' Combined credit plan" } | { '43': "'43' Debit card" } | { '47': "'47' Credit line secured" } | { '48': "'48' Collection agency or attorney" } | { '50': "'50' Family support" } | { '65': "'65' Government unsecured guaranteed loan" } | { '66': "'66' Government secured guaranteed loan" } | { '67': "'67' Government unsecured direct loan" } | { '68': "'68' Government secured direct loan" } | { '69': "'69' Government grant" } | { '70': "'70' Government overpayment" } | { '71': "'71' Government fine" } | { '72': "'72' Government fee for services" } | { '73': "'73' Government employee advance" } | { '74': "'74' Government miscellaneous debt" } | { '75': "'75' Government benefit" } | { '77': "'77' Returned check" } | { '89': "'89' Home equity line of credit" } | { '90': "'90' Medical debt" } | { '91': "'91' Debt consolidation" } | { '92': "'92' Utility company" } | { '93': "'93' Child support" } | { '95': "'95' Attorney fees" } | { '0A': "'0A' Time share loan" } | { '2A': "'2A' Secured credit card" } | { '3A': "'3A' Auto lease" } | { '5A': "'5A' Real estate junior liens" } | { '6A': "'6A' Commercial installment loan" } | { '7A': "'7A' Commercial line of credit" } | { '8A': "'8A' Business credit card" } | { '9A': "'9A' Secured home improvement" } | { '5B': "'5B' Second mortgage" } | { '6B': "'6B' Commercial mortgage loan" } | { '7B': "'7B' Agricultural" } | { '8B': "'8B' Deposit account with overdraft protection" } | { '9B': "'9B' Business line personally guaranteed" } | { '0C': "'0C' Debt buyer" } | { '2C': "'2C' USDA real estate mortgage" } | { '4D': "'4D' Telecommunications or cellular" } | { '6D': "'6D' Home equity" } | { '0F': "'0F' Construction loan" } | { '0G': "'0G' Flexible spending credit card" }
      CRED_REP_PORTFOLIO_TYPE_OVR: { '-': "None" } | { I: "'I' Installment" } | { C: "'C' Line of credit" } | { M: "'M' Mortgage" } | { O: "'O' Open account" } | { R: "'R' Revolving" }
      STMT_MAIL_GROUP_SERIAL: Serial
      STMT_CUTOFF_GROUP_SERIAL: Serial
      FASB_91_TYPE_SERIAL: Serial
      FASB_91_UNAMORTIZED_FEES: Money
      FASB_91_AMORTIZATION_AMOUNT: Money
      FASB_91_FUNDING_OPTION: { '-': "None" } | { R: "Required" } | { P: "Posted" }
      CC_PURCH_INT_RATE: Rate
      CC_PURCH_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_CASH_ADV_INT_RATE: Rate
      CC_CASH_ADV_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_BAL_XFR_INT_RATE: Rate
      CC_BAL_XFR_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_FIRST_YEAR_FEES_MAXIMUM: Money
      CC_PENALTY_INT_RATE: Rate
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { P: "Payment and inquiry" } | { I: "Inquiry only" }
      PURPOSE_SERIAL: Serial
      COLLATERAL_TYPE_SERIAL: Serial
      SHARED_COLLATERAL_OPTION: { N: "Not allowed" } | { Y: "Allowed" }
      SHARE_SECURED_OPTION: { N: "Not savings secured" } | { L: "Partially savings secured}|{ release last" } | { F: "Partially savings secured}|{ release first" } | { S: "Fully savings secured" } | { A: "Fixed savings secured amount" }
      PROMO_RATE_TYPE_SERIAL: Serial
      SEGMENT_COUNT_LIMIT: Count
      LAST_FM_DATE: Date
    }
    LN_DISABILITY_INSURANCE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { LS: "Single credit life" } | { LJ: "Joint credit life" } | { LC: "Single co-borrower credit life" } | { DS: "Single credit disability" } | { DJ: "Joint credit disability" } | { DC: "Single co-borrower credit disability" }
      MONETARY_SOURCE: { I: "Insurance" } | { i: "Debt protection" }
      FORMULA: { '-': "None" } | { CMG_LR: "CUNA Mutual Level Rate" } | { CMG_MD: "CUNA Mutual Monthly Renewable Disability" } | { SMM_MB: "Securian Minnesota Mutual Monthly Outstanding Balance" } | { SMM_MT: "Securian Minnesota Mutual Monthly Outstanding Balance with LOC Term Calculation" } | { TRN_D: "Transamerica Gross Disability" } | { TRN_OD: "Transamerica Open End Disability" }
      PREMIUM: Money
      PREMIUM_IF_SINGLE_COVERAGE: Money
      PREMIUM_BALANCE_INCREMENT: Money
      MAXIMUM_INSURABLE_BALANCE: Money
      MAXIMUM_MONTHLY_BENEFIT: Money
      MAXIMUM_TOTAL_BENEFIT: Money
      MAXIMUM_TERM_IN_MONTHS: Count
      MAXIMUM_AGE: Count
      MAXIMUM_ELIGIBILITY_AGE: Count
      MINIMUM_HOURS_WORKED_PER_WEEK: Count
      DELINQUENCY_DAYS: Count
      STATEMENT_DESCRIPTION: string
      STATEMENT_DESCRIPTION_IF_SGL_C: string
      POSTING_POLICY_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      ITEM_GL_SERIAL: Serial
      ITEM_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    LN_DISABILITY_INSURANCE_RANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TERM_MONTH_COUNT: Count
      PREMIUM: Money
      PREMIUM_IF_SINGLE_COVERAGE: Money
      LAST_FM_DATE: Date
    }
    LN_DRAW_REQUEST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      DRAW_NUMBER: Count
      DESCRIPTION: string
      STATUS: { P: "Pending" } | { A: "Approved" } | { D: "Denied" }
      REQUEST_DATE: Date
      TOTAL_AMOUNT: Money
      PAYMENT_STATUS: { U: "Unpaid" } | { P: "Paid" }
      PAYMENT_PERSON_SERIAL: Serial
      PAYMENT_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" } | { S: "Savings deposit" }
      ACH_ORIGINATION_COMPANY_SERIAL: Serial
      ACH_DFI_ROUTING_NUMBER: string
      ACH_DFI_ROUTING_NUMBER_DESC: string
      ACH_DFI_ACCOUNT_NUMBER: string
      ACH_DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      ACH_ENTRY_CLASS: { CCD: "CCD" } | { PPD: "PPD" }
      ACH_IDENTIFICATION_NUMBER: string
      ACH_NAME: string
      ACH_PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      ACH_PRENOTIFICATION_DATE: Date
      PAYMENT_GL_SERIAL: Serial
      PAYMENT_SHARE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_DRAW_REQUEST_ITEM: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      BUDGET_ITEM_SERIAL: Serial
      AMOUNT: Money
      COMMENT: string
      LAST_FM_DATE: Date
    }
    LN_EXTENSION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      EXPLANATION: string
      PROCESSING_DATE: Date
      MONTH_COUNT: Count
      REDUCED_PAYMENT_AMOUNT: Money
      REDUCED_PAYMENT_DUE_DATE: Date
      RESUMED_PAYMENT_AMOUNT: Money
      RESUMED_PAYMENT_DUE_DATE: Date
      OLD_PAYMENT_DUE_DATE: Date
      NEW_PAYMENT_DUE_DATE: Date
      OLD_MATURITY_DATE: Date
      NEW_MATURITY_DATE: Date
      FEE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LN_EXTENSION_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { S: "Skip-A-Pay" } | { H: "Hardship" }
      METHOD: { A: "Advance due date" } | { R: "Reduce payment amount" }
      AUTOMATIC_PAYMENT_OPTION: { R: "Retain" } | { D: "Disable" }
      MONTH_COUNT: Count
      STATEMENT_DESCRIPTION: string
      FEE_SERIAL: Serial
      NOTE_TYPE_SERIAL: Serial
      NOTE_EXPLANATION: string
      POST_SECURITY_EVENT_SERIAL: Serial
      FEE_LN_SECURITY_EVENT_SERIAL: Serial
      FEE_AMT_SECURITY_EVENT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_EXT_TRAN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      CATEGORY: { D: "Deposit" } | { W: "Withdrawal" } | { P: "Payment" } | { A: "Advance" } | { R: "Refinance" } | { N: "New loan" } | { C: "Comment" }
      SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      SUB_CATEGORY: { '-': "None" } | { P: "Card purchase" } | { R: "Card purchase return" } | { B: "Card balance transfer" } | { S: "Single payment" } | { s: "Single payment - waive late fee" } | { A: "Additional payment" } | { O: "Principal only payment" } | { W: "Waive late fee" } | { L: "Close loan" } | { b: "Bankruptcy pre-petition payment" } | { I: "Interest prepayment" }
      FICS_CATEGORY: { '-': "None" } | { REG: "Regular payment odd amount" } | { CUR: "Principal curtailment" } | { LTC: "Late charge" } | { MIS: "Miscellaneous insurance" } | { PRE: "Prepayment" } | { RCP: "Returned check charge" } | { ADJ: "Adjustment - tax and insurance and/or unapplied" } | { MAN: "Manual payment - interest" }
      MORTGAGE_CATEGORY: { '-': "None" } | { PLC: "Regular payment plus late charge" } | { CUR: "Principal curtailment" } | { PAR: "Partial payment" } | { ESC: "Additional escrow" } | { LTC: "Late charge" } | { OTH: "Other" }
      AMOUNT: Money
      PRINCIPAL: Money
      TAX_AND_INSURANCE: Money
      UNAPPLIED: Money
      LATE_CHARGE: Money
      MISCELLANEOUS_INSURANCE: Money
      RETURNED_CHECK_CHARGE: Money
      MISCELLANEOUS_FEE: Money
      DEDUCT_SERVICE_FEE: { N: "No" } | { Y: "Yes" }
      EXPORT_SET_SERIAL: Serial
      STATUS: { '-': "None" } | { Q: "Queued" } | { P: "Posted" } | { p: "Posting failed" }
      TRACER: string
      EXCEPTION_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    LN_FASB_91: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      ORIGINAL_APR: Rate
      EFFECTIVE_APR: Rate
      UNAMORTIZED_FEES: Money
      AMORTIZATION_AMOUNT: Money
      FUNDING_OPTION: { '-': "None" } | { R: "Required" } | { P: "Posted" }
      LAST_FM_DATE: Date
    }
    LN_FASB_91_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      METHOD: { I: "Interest method" } | { S: "Straight line" }
      INTEREST_METHOD_ERROR_HANDLING: { '-': "Produce exception" } | { I: "Ignore" } | { O: "Post one cent" } | { R: "Recalculate rates" }
      STRAIGHT_LINE_MONTH_COUNT: Count
      BAL_SHEET_GL_SERIAL: Serial
      BAL_SHEET_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      INC_STMT_GL_SERIAL: Serial
      INC_STMT_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      FUNDING_GL_SERIAL: Serial
      FUNDING_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      LAST_FM_DATE: Date
    }
    LN_GUARANTEE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      GUARANTEE_NUMBER: string
      TYPE_SERIAL: Serial
      GUARANTEED_PERCENTAGE: Rate
      APPROVED_AMOUNT: Money
      DISBURSED_AMOUNT: Money
      REMAINING_AMOUNT: Money
      SERVICING_FEE_AMOUNT: Money
      BASIS_POINT_FEE_RATE: Rate
      LAST_FM_DATE: Date
    }
    LN_GUARANTEE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      GUARANTEE_OPTION: { '-': "None" } | { SBA: "Small Business Administration" }
      LAST_FM_DATE: Date
    }
    LN_HOLD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { FH: "Funds hold" } | { CK: "Check deposit" } | { OD: "ACH origination deposit" } | { BK: "Bulk check deposit" } | { BC: "Bulk cash deposit" } | { CD: "Certified check" } | { BD: "Bill payment check" } | { PA: "Preauthorization" } | { MV: "Merchant verification" } | { RI: "Large dollar return item" } | { IL: "IRS tax levy" } | { CL: "Child support levy" } | { LV: "Levy" } | { GA: "Garnishment" } | { UF: "Uncollected fee" } | { CA: "Close fee" } | { CF: "Close fee GL only" } | { PR: "Pending return" } | { DP: "Check positive pay" } | { AP: "ACH positive pay" } | { DS: "Check stop" } | { AS: "ACH stop" } | { AE: "ACH stop all except" } | { AR: "ACH revocation" } | { AN: "ACH not authorized" } | { AD: "ACH death notification" }
      AMOUNT: Money
      AVAILABLE_AMOUNT: Money
      REASON: string
      TRACER: string
      PAYEE: string
      CHECK_CATEGORY: { '-': "None" } | { D: "Next day" } | { L: "Local" } | { N: "Nonlocal" } | { P: "Proprietary ATM" } | { A: "Nonproprietary ATM" } | { O: "Other" }
      CHECK_EXCEPTION_HOLD_REASON: { '-': "None" } | { N: "New account" } | { L: "Large deposit" } | { R: "Redeposited check" } | { O: "Repeated overdrafts" } | { C: "Reasonable cause to doubt collectibility" } | { E: "Emergency conditions" } | { X: "Extra day for cash withdrawal" }
      CHECK_BANKING_DATE: Date
      CHECK_HOLD_DAYS: Count
      DRAFT_NUMBER: string
      ENDING_DRAFT_NUMBER: string
      ACH_COMPANY_ID: string
      ACH_COMPANY_NAME: string
      ACH_OPTION: { '-': "None" } | { D: "Debits only" } | { C: "Credits only" }
      ACH_STOP_COUNT: Count
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      POSTING_POLICY_SERIAL: Serial
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      PLACEMENT_TIME: Time
      EXPIRATION_TIME: Time
      RELEASE_TIME: Time
      LAST_FM_DATE: Date
    }
    LN_INT_RATE_CHANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      EFFECTIVE_DATE: Date
      INTEREST_RATE: Rate
      PRIOR_INTEREST_RATE: Rate
      ADJUSTMENT_REASON_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_INT_RATE_INDEX: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      RATE: Rate
      EFFECTIVE_DATE: Date
      NOTICE_PRODUCTION_OPTION: { N: "No" } | { Y: "Yes" } | { C: "Closed end mortgage only" }
      NOTICE_DESCRIPTION: string
      RATE_INCREMENT: Rate
      RATE_ROUNDING_OPTION: { '-': "None" } | { IU: "Round index up" } | { ID: "Round index down" } | { IN: "Round index to nearest" } | { MU: "Round index plus margin up" } | { MD: "Round index plus margin down" } | { MN: "Round index plus margin to nearest" }
      RATE_ROUNDING_DESCRIPTION: string
      RATE_RND_INDX_UP_DESCRIPTION: string
      RATE_RND_INDX_DOWN_DESCRIPTION: string
      RATE_RND_INDX_NEAR_DESCRIPTION: string
      RATE_RND_SUM_UP_DESCRIPTION: string
      RATE_RND_SUM_DOWN_DESCRIPTION: string
      RATE_RND_SUM_NEAR_DESCRIPTION: string
      PUBLISHING_DESCRIPTION: string
      ANNIVERSARY_OPTION: { N: "No" } | { L: "On loan scheduled date" } | { Y: "On index scheduled date after loan anniversary" } | { O: "On exact loan anniversary" }
      ANNIVERSARY_MONTHS: Count
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      LAST_FM_DATE: Date
    }
    LN_LIFE_INSURANCE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { LS: "Single credit life" } | { LJ: "Joint credit life" } | { LC: "Single co-borrower credit life" } | { DS: "Single credit disability" } | { DJ: "Joint credit disability" } | { DC: "Single co-borrower credit disability" }
      MONETARY_SOURCE: { I: "Insurance" } | { i: "Debt protection" }
      FORMULA: { '-': "None" } | { CMG_LR: "CUNA Mutual Level Rate" } | { CMG_MD: "CUNA Mutual Monthly Renewable Disability" } | { SMM_MB: "Securian Minnesota Mutual Monthly Outstanding Balance" } | { SMM_MT: "Securian Minnesota Mutual Monthly Outstanding Balance with LOC Term Calculation" } | { TRN_D: "Transamerica Gross Disability" } | { TRN_OD: "Transamerica Open End Disability" }
      PREMIUM: Money
      PREMIUM_IF_SINGLE_COVERAGE: Money
      PREMIUM_BALANCE_INCREMENT: Money
      MAXIMUM_INSURABLE_BALANCE: Money
      MAXIMUM_MONTHLY_BENEFIT: Money
      MAXIMUM_TOTAL_BENEFIT: Money
      MAXIMUM_TERM_IN_MONTHS: Count
      MAXIMUM_AGE: Count
      MAXIMUM_ELIGIBILITY_AGE: Count
      MINIMUM_HOURS_WORKED_PER_WEEK: Count
      DELINQUENCY_DAYS: Count
      STATEMENT_DESCRIPTION: string
      STATEMENT_DESCRIPTION_IF_SGL_C: string
      POSTING_POLICY_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      ITEM_GL_SERIAL: Serial
      ITEM_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    LN_LIFE_INSURANCE_RANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TERM_MONTH_COUNT: Count
      PREMIUM: Money
      PREMIUM_IF_SINGLE_COVERAGE: Money
      LAST_FM_DATE: Date
    }
    LN_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    LOAN_PAYOFF_REQUEST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      INCLUDE_PENDING_ITEMS: { N: "No" } | { Y: "Yes" }
      PAYOFF_PRINCIPAL: Money
      PAYOFF_INTEREST: Money
      PAYOFF_LATE_FEE: Money
      PAYOFF_OTHER_FEES: Money
      PAYOFF_UNAPPLIED_FUNDS: Money
      PAYOFF_TOTAL: Money
      PAYOFF_INTEREST_PER_DAY: string
      NEXT_DUE_DATE: Date
      PAST_DUE_AS_OF_DATE: Date
      PAST_DUE_IMPOUND: Money
      PAST_DUE_PAYMENT: Money
      PAST_DUE_PAYMENT_COUNT: Count
      PAST_DUE_PAYMENT_DAYS: Count
      REQUESTOR_NAME: string
      EFFECTIVE_DATE: Date
      INTEREST_CALCULATION: { D: "Daily with 365 factor" } | { d: "Daily with 360 factor" } | { L: "Daily with 365.25 factor" } | { l: "Daily with 365 or 366 factor" } | { E: "Daily with 360 factor and 30 day month" } | { M: "Monthly" } | { C: "Credit card" }
      INTEREST_CALCULATION_DATE: Date
      INTEREST_PAID_TO_DATE: Date
      BEGINNING_STATEMENT_DATE: Date
      ENDING_STATEMENT_DATE: Date
      MLA_REFUND_AMOUNT: Money
      RESPONSE_DOCUMENT: Document
      LAST_FM_DATE: Date
    }
    LN_PERSON_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PERSON_SERIAL: Serial
      PERSON_ADDRESS_LINK_SERIAL: Serial
      CATEGORY: { CB: "Co-borrower" } | { AS: "Authorized signer" } | { PA: "Power of attorney" } | { TR: "Trustee" } | { CU: "Custodian" } | { GD: "Guardian" } | { CV: "Conservator" } | { AD: "Administrator" } | { EX: "Executor" } | { ST: "Successor trustee" } | { SC: "Successor custodian" } | { CS: "Cosigner" } | { GU: "Guarantor" } | { AU: "Authorized user" } | { BO: "Beneficial owner" } | { CP: "Control person" } | { CO: "Collateral owner" } | { AA: "Additional mailing addressee" } | { OT: "Other related party" }
      CTR_OWNER_OPTION: { N: "No" } | { Y: "Yes" }
      TYPE_SERIAL: Serial
      CRED_REP_ECOA_CODE: { '-': "Default" } | { z: "Do not report" } | { '1': "'1' Individual" } | { '2': "'2' Joint contractual liability" } | { '3': "'3' Authorized user" } | { '5': "'5' Comaker or guarantor" } | { '7': "'7' Maker" } | { T: "'T' Association with account terminated" } | { W: "'W' Business or commercial" } | { X: "'X' Consumer deceased" } | { Z: "'Z' Delete consumer" }
      CRED_REP_CONS_INFO_IND: { '-': "Retain previous value" } | { A: "'A ' Petition for chapter 7 bankruptcy" } | { B: "'B ' Petition for chapter 11 bankruptcy" } | { C: "'C ' Petition for chapter 12 bankruptcy" } | { D: "'D ' Petition for chapter 13 bankruptcy" } | { E: "'E ' Discharged through bankruptcy chapter 7" } | { F: "'F ' Discharged through bankruptcy chapter 11" } | { G: "'G ' Discharged through bankruptcy chapter 12" } | { H: "'H ' Discharged through bankruptcy chapter 13" } | { I: "'I ' Chapter 7 bankruptcy dismissed" } | { J: "'J ' Chapter 11 bankruptcy dismissed" } | { K: "'K ' Chapter 12 bankruptcy dismissed" } | { L: "'L ' Chapter 13 bankruptcy dismissed" } | { M: "'M ' Chapter 7 bankruptcy withdrawn" } | { N: "'N ' Chapter 11 bankruptcy withdrawn" } | { O: "'O ' Chapter 12 bankruptcy withdrawn" } | { P: "'P ' Chapter 13 bankruptcy withdrawn" } | { Z: "'Z ' Bankruptcy - undesignated chapter" } | { '1A': "'1A' Personal receivership" } | { Q: "'Q ' Remove previously reported bankruptcy or personal receivership" } | { R: "'R ' Chapter 7 reaffirmation of debt" } | { V: "'V ' Chapter 7 reaffirmation of debt rescinded" } | { '2A': "'2A' Lease assumption" } | { S: "'S ' Remove previously reported reaffirmation or rescinded or assumption" } | { T: "'T ' Credit grantor cannot locate consumer" } | { U: "'U ' Consumer now located" }
      CRED_REP_BANKRUPTCY_DATE: Date
      PERCENTAGE: Rate
      ADDITIONAL_STATEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      ADDITIONAL_NOTICE_OPTION: { N: "No" } | { Y: "Yes" }
      EXT_MEMBER_SEQUENCE_NUMBER: Count
      LAST_FM_DATE: Date
    }
    CU_PREREQ_QUESTIONS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      JOINT_Q_OPTION: { Yes: "Loan Prerequisite Option Yes" } | { Noo: "Loan Prerequisite No" } | { NAA: "Loan Prerequisite Option N/A" }
      CREDIT_AUTH_OPTION: { Yes: "Loan Prerequisite Option Yes" } | { Noo: "Loan Prerequisite No" } | { NAA: "Loan Prerequisite Option N/A" }
      LAST_FM_DATE: Date
    }
    LN_PURPOSE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      AIRES_CODE: string
      LAST_FM_DATE: Date
    }
    LOAN_REQUEST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      DESCRIPTION: string
      SOURCE_LOAN_SERIAL: Serial
      PROJECTION_DESCRIPTION: string
      PROJECTION_METHOD: { P: "Compute payment amount" } | { L: "Compute loan amount" } | { M: "Compute maturity date" } | { I: "Compute interest rate" }
      MINIMUM_BALANCE: Money
      MINIMUM_ADVANCE: Money
      DOWN_PAYMENT: Money
      CREDIT_LIMIT: Money
      CREDIT_LIMIT_EXPIRATION_DATE: Date
      CREDIT_LIMIT_SHARED_GRP_SERIAL: Serial
      CC_CASH_ADV_LIMIT_PERCENTAGE: Rate
      CC_CASH_ADV_LIMIT_AMOUNT: Money
      POSITIVE_PAY_OPTION: { '-': "None" } | { D: "Check" } | { A: "ACH" } | { B: "Check and ACH" }
      DRAW_PERIOD_EXPIRATION_DATE: Date
      MAX_VALUATION_CREDIT_LIMIT: Money
      INTEREST_PREPAID: Money
      INTEREST_CALCULATION_DATE: Date
      INTEREST_RATE: Rate
      INTEREST_APR: Rate
      INTEREST_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      INTEREST_RATE_INDEX_SERIAL: Serial
      INTEREST_RATE_MARGIN: Rate
      INTEREST_RATE_DISCOUNT: Rate
      INTEREST_RATE_RISK_PREMIUM: Rate
      INTEREST_RATE_MINIMUM: Rate
      INTEREST_RATE_MAXIMUM: Rate
      INTEREST_RATE_CHG_START_DATE: Date
      INTEREST_RATE_CHG_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      INTEREST_RATE_CHG_SCH_FREQ_1: Count
      INTEREST_RATE_CHG_SCH_FREQ_2: Count
      INTEREST_RATE_CHG_SCH_PERIOD: Count
      INTEREST_RATE_CHG_SCH_DATE: Date
      INTEREST_RATE_CHG_SCH_RND_INC: Rate
      INTEREST_RATE_CHG_SCH_RND_OPT: { '-': "None" } | { IU: "Round index up" } | { ID: "Round index down" } | { IN: "Round index to nearest" } | { MU: "Round index plus margin up" } | { MD: "Round index plus margin down" } | { MN: "Round index plus margin to nearest" }
      INTEREST_RATE_CAP_FREQUENCY: { '-': "None" } | { A: "Annually" } | { S: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" } | { D: "Daily" }
      INTEREST_RATE_CAP_PERIOD: Count
      INTEREST_RATE_CAP_DIRECTION: { I: "Increase only" } | { B: "Increase and decrease" }
      INTEREST_RATE_CAP_START_DATE: Date
      INTEREST_RATE_CAP_START_RATE: Rate
      INTEREST_RATE_CAP: Rate
      INTEREST_RATE_ADJUSTMENT: Rate
      INTEREST_RATE_ADJ_RSN_SERIAL: Serial
      PAYMENT_METHOD: { C: "Cash" } | { O: "Cash with coupons" } | { T: "Automatic transfer" } | { A: "ACH" } | { P: "Payroll" } | { D: "Distribution" }
      PAYMENT_AMOUNT: Money
      PAYMENT_CALCULATION_SERIAL: Serial
      PAYMENT_CALCULATION_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" }
      PAYMENT_CALCULATION_SCH_FREQ_1: Count
      PAYMENT_CALCULATION_SCH_PERIOD: Count
      PAYMENT_CALCULATION_SCH_DATE: Date
      PAYMENT_COUNT_SCHEDULED: Count
      PAYMENT_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      PAYMENT_FREQUENCY_DAY_1: Count
      PAYMENT_FREQUENCY_DAY_2: Count
      PAYMENT_SKIP_COUNT: Count
      PAYMENT_SKIP_START_MONTH: Count
      PAYMENT_SKIP_START_DAY: Count
      PAYMENT_AHEAD: { N: "No limit" } | { D: "On or after due date only" } | { O: "One due date" } | { C: "One due date beyond last payment change" } | { P: "Specified payment count" } | { S: "Specified day count" }
      PAYMENT_AHEAD_COUNT: Count
      PAYMENT_DUE_DATE: Date
      LATE_FEE_CALCULATION_SERIAL: Serial
      MAINTENANCE_FEE_SERIAL: Serial
      MAINTENANCE_FEE_EFFECT_DATE: Date
      MAINTENANCE_FEE_EXPIRE_DATE: Date
      IMPOUND_AMOUNT: Money
      IMPOUND_SHARE_SERIAL: Serial
      LIFE_INSURANCE_SERIAL: Serial
      DISABILITY_INSURANCE_SERIAL: Serial
      SINGLE_PREMIUM_LIFE: Money
      SINGLE_PREMIUM_DISABILITY: Money
      INSURANCE_METHOD: { L: "Loan advance" } | { S: "Savings withdrawal" }
      INSURANCE_SHARE_SERIAL: Serial
      CRED_REP_PRIMARY_ECOA_CODE: { '-': "Default" } | { '1': "'1' Individual" } | { '2': "'2' Joint contractual liability" } | { '3': "'3' Authorized user" } | { '5': "'5' Comaker or guarantor" } | { '7': "'7' Maker" } | { T: "'T' Association with account terminated" } | { W: "'W' Business or commercial" } | { X: "'X' Consumer deceased" } | { Z: "'Z' Delete consumer" }
      CRED_REP_ACCOUNT_TYPE: { '-': "Do not report" } | { '00': "'00' Auto" } | { '01': "'01' Unsecured" } | { '02': "'02' Secured" } | { '03': "'03' Partially secured" } | { '04': "'04' Home improvement" } | { '05': "'05' FHA home improvement" } | { '06': "'06' Installment sales contract" } | { '07': "'07' Charge account" } | { '08': "'08' Real estate type unknown" } | { '10': "'10' Business loan" } | { '11': "'11' Recreational merchandise" } | { '12': "'12' Education" } | { '13': "'13' Lease" } | { '15': "'15' Line of credit" } | { '17': "'17' Manufactured housing" } | { '18': "'18' Credit card" } | { '19': "'19' FHA real estate mortgage" } | { '20': "'20' Note loan" } | { '25': "'25' VA real estate mortgage" } | { '26': "'26' Conventional real estate mortgage" } | { '29': "'29' Rental agreement" } | { '37': "'37' Combined credit plan" } | { '43': "'43' Debit card" } | { '47': "'47' Credit line secured" } | { '48': "'48' Collection agency or attorney" } | { '50': "'50' Family support" } | { '65': "'65' Government unsecured guaranteed loan" } | { '66': "'66' Government secured guaranteed loan" } | { '67': "'67' Government unsecured direct loan" } | { '68': "'68' Government secured direct loan" } | { '69': "'69' Government grant" } | { '70': "'70' Government overpayment" } | { '71': "'71' Government fine" } | { '72': "'72' Government fee for services" } | { '73': "'73' Government employee advance" } | { '74': "'74' Government miscellaneous debt" } | { '75': "'75' Government benefit" } | { '77': "'77' Returned check" } | { '89': "'89' Home equity line of credit" } | { '90': "'90' Medical debt" } | { '91': "'91' Debt consolidation" } | { '92': "'92' Utility company" } | { '93': "'93' Child support" } | { '95': "'95' Attorney fees" } | { '0A': "'0A' Time share loan" } | { '2A': "'2A' Secured credit card" } | { '3A': "'3A' Auto lease" } | { '5A': "'5A' Real estate junior liens" } | { '6A': "'6A' Commercial installment loan" } | { '7A': "'7A' Commercial line of credit" } | { '8A': "'8A' Business credit card" } | { '9A': "'9A' Secured home improvement" } | { '5B': "'5B' Second mortgage" } | { '6B': "'6B' Commercial mortgage loan" } | { '7B': "'7B' Agricultural" } | { '8B': "'8B' Deposit account with overdraft protection" } | { '9B': "'9B' Business line personally guaranteed" } | { '0C': "'0C' Debt buyer" } | { '2C': "'2C' USDA real estate mortgage" } | { '4D': "'4D' Telecommunications or cellular" } | { '6D': "'6D' Home equity" } | { '0F': "'0F' Construction loan" } | { '0G': "'0G' Flexible spending credit card" }
      CRED_REP_PORTFOLIO_TYPE_OVR: { '-': "None" } | { I: "'I' Installment" } | { C: "'C' Line of credit" } | { M: "'M' Mortgage" } | { O: "'O' Open account" } | { R: "'R' Revolving" }
      MAIL_PERSON_ADDR_LINK_SERIAL: Serial
      STMT_MAIL_GROUP_SERIAL: Serial
      STMT_CUTOFF_GROUP_SERIAL: Serial
      PROCESSOR_USER_SERIAL: Serial
      APPROVAL_OFFICER_SERIAL: Serial
      APPROVAL_DATE: Date
      APPROVED_LOAN_SERIAL: Serial
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      CREDIT_SCORE: Count
      PAPER_GRADE_SERIAL: Serial
      TAX_PERSON_SERIAL: Serial
      FASB_91_TYPE_SERIAL: Serial
      FASB_91_ORIGINAL_APR: Rate
      FASB_91_EFFECTIVE_APR: Rate
      FASB_91_UNAMORTIZED_FEES: Money
      FASB_91_AMORTIZATION_AMOUNT: Money
      FASB_91_FUNDING_OPTION: { '-': "None" } | { R: "Required" } | { P: "Posted" }
      CC_PURCH_INT_RATE: Rate
      CC_PURCH_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_CASH_ADV_INT_RATE: Rate
      CC_CASH_ADV_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_BAL_XFR_INT_RATE: Rate
      CC_BAL_XFR_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_FIRST_YEAR_FEES_MAXIMUM: Money
      CC_PENALTY_INT_RATE: Rate
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { P: "Payment and inquiry" } | { I: "Inquiry only" }
      MATURITY_DATE: Date
      PURPOSE_SERIAL: Serial
      COLLATERAL_TYPE_SERIAL: Serial
      SHARED_COLLATERAL_OPTION: { N: "Not allowed" } | { Y: "Allowed" }
      NOTE_NUMBER: string
      SHARE_SECURED_OPTION: { N: "Not savings secured" } | { L: "Partially savings secured}|{ release last" } | { F: "Partially savings secured}|{ release first" } | { S: "Fully savings secured" } | { A: "Fixed savings secured amount" }
      SHARE_SECURED_AMOUNT: Money
      BALLOON_DATE: Date
      BALLOON_AMOUNT: Money
      PROMO_RATE_TYPE_SERIAL: Serial
      SEGMENT_COUNT_LIMIT: Count
      MLA_LIMITATION: { N: "No" } | { Y: "Yes" } | { U: "Unknown" }
      WITHDRAWN_INDICATOR: { '-': "None" } | { D: "Duplicate" } | { A: "Withdrawn by applicant" }
      CONTRACT_DATE: Date
      RIGHT_TO_RESCIND_END_DATE: Date
      LAST_FM_DATE: Date
    }
    ADVERSE_ACTION_REASON: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      EXPLANATION: string
      DOCUMENTATION: string
      LAST_FM_DATE: Date
    }
    LR_COLLATERAL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      CATEGORY: { G: "General" } | { V: "Vehicle" } | { R: "Real estate" } | { S: "Savings secured" } | { A: "Asset" } | { C: "Shared collateral" }
      DESCRIPTION: string
      VEHICLE_CATEGORY: { '-': "None" } | { A: "Automobile" } | { C: "Motorcycle" } | { B: "Boat" } | { M: "Motorhome" } | { T: "Trailer" } | { R: "Motor" }
      VEHICLE_LICENSE_NUMBER: string
      VIN: string
      VEHICLE_MAKE: string
      VEHICLE_MODEL: string
      VEHICLE_BODY_TYPE: string
      VEHICLE_COLOR: string
      VEHICLE_YEAR: Count
      VEHICLE_ENGINE_SIZE: Count
      VEHICLE_ODOMETER: Count
      VEHICLE_ODOMETER_DATE: Date
      VEHICLE_HOURS: Count
      VEHICLE_HOURS_DATE: Date
      VEHICLE_CLEAN_TRADE_IN_VALUE: Money
      VEHICLE_CLEAN_LOAN_VALUE: Money
      INDIRECT_OPTION: { N: "No" } | { Y: "Yes" }
      VEHICLE_CASH_PURCHASE_PRICE: Money
      VEHICLE_REBATE: Money
      VEHICLE_TAXES: Money
      VEHICLE_TITLE_LIC_REG: Money
      VEHICLE_DOCUMENTATION_FEES: Money
      VEHICLE_THEFT_DETERRENT: Money
      VEHICLE_ENVIRONMENTAL_PACKAGE: Money
      VEHICLE_GAP: Money
      VEHICLE_CREDIT_LIFE: Money
      VEHICLE_CREDIT_DISABILITY: Money
      VEHICLE_WARRANTY: Money
      VEHICLE_OTHER_BACK_END_FEES: Money
      DEALER_SERIAL: Serial
      DEALER_NUMBER: string
      DEALER_COMPENSATION_CALC: { S: "System" } | { M: "Manual" }
      DEALER_FLAT_FEE: Money
      DEALER_MARKUP: Rate
      DEALER_MARKUP_FEE: Money
      DEALER_DEDUCTION_AMOUNT: Money
      DEALER_DEDUCTION_DESCRIPTION: string
      DEALER_COMPENSATION_PAID_DATE: Date
      DEALER_REFUND: Money
      DEALER_REFUND_REQUESTED_DATE: Date
      DEALER_REFUND_RECEIVED_DATE: Date
      APPLICATION_NUMBER: string
      REES_LEVERING_OPTION: { N: "No" } | { Y: "Yes" }
      RECOVERY_OPTION: { '-': "None" } | { B: "Bankruptcy" } | { C: "Charge off" } | { P: "Dealer repurchase" } | { R: "Repossession" } | { X: "Resolved credit issue" }
      RECOVERY_DATE: Date
      ACCOUNT_OPTION: { '-': "None" } | { F: "Financed loan" } | { D: "Dealer loan indirect" } | { R: "Refinance" } | { P: "Person to person" } | { B: "Lease buyout" } | { O: "Other" }
      PROPERTY_CATEGORY: { '-': "None" } | { C: "Condo" } | { O: "Commercial" } | { M: "Mobile home" } | { R: "Residential" }
      PROPERTY_ADDRESS_SERIAL: Serial
      PROPERTY_ADDRESS_COUNTY: string
      PROPERTY_COUNT: Count
      LEGAL_DESCRIPTION: string
      OWNER_OCCUPIED_OPTION: { N: "No" } | { Y: "Yes" }
      SECOND_HOME_OPTION: { N: "No" } | { Y: "Yes" }
      RENTAL_OPTION: { N: "No" } | { Y: "Yes" }
      VACANT_OPTION: { N: "No" } | { Y: "Yes" }
      LAND_LOAN_OPTION: { N: "No" } | { Y: "Yes" }
      HAZARD_IMPOUND_OPTION: { N: "No" } | { Y: "Yes" }
      TAXES_IMPOUND_OPTION: { N: "No" } | { Y: "Yes" }
      FLOOD_INSURANCE_OPTION: { N: "No" } | { Y: "Yes" }
      FLOOD_ZONE: { '-': "None" } | { A: "Zone A" } | { AE: "Zone AE; replaces zones A1-30" } | { AH: "Zone AH" } | { AO: "Zone AO" } | { AR: "Zone AR" } | { A99: "Zone A99" } | { V: "Zone V" } | { VE: "Zone VE; replaces zones V1-30" } | { X: "Zone X (shaded); replaces zone B" } | { x: "Zone X (unshaded); replaces zone C" } | { D: "Zone D" }
      DEED_DOCUMENT_NUMBER: string
      RECONVEYANCE_DOCUMENT_NUMBER: string
      TAX_ASSESSOR_PARCEL_NUMBER: string
      TAX_SERVICER_CONTRACT_NUMBER: string
      MLS_REBATE_AMOUNT: Money
      SHORT_SALE_OPTION: { N: "No" } | { Y: "Yes" }
      SHORT_SALE_DATE: Date
      FORECLOSURE_OPTION: { N: "No" } | { Y: "Yes" }
      FORECLOSURE_DATE: Date
      REO_OPTION: { N: "No" } | { Y: "Yes" }
      REO_DATE: Date
      OTH_MTG_CATEGORY: { '-': "None" } | { F: "First" } | { S: "Second" }
      OTH_MTG_BALANCE: Money
      OTH_MTG_PAYMENT_AMOUNT: Money
      OTH_MTG_INT_ONLY_OPTION: { N: "No" } | { Y: "Yes" }
      OTH_MTG_RATE: Rate
      OTH_MTG_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      OTH_MTG_RATE_INDEX_SERIAL: Serial
      OTH_MTG_RATE_MARGIN: Rate
      OTH_MTG_RATE_MAXIMUM: Rate
      OTH_MTG_RATE_CHG_NEXT_DATE: Date
      OTH_MTG_RATE_CHG_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      OTH_MTG_HOLDER_PERSON_SERIAL: Serial
      OTH_MTG_INFORMATION_DATE: Date
      HMDA_REPORTING_OPTION: { N: "No" } | { Y: "Yes" } | { E: "Partial exemption" }
      HMDA_APPLICATION_NUMBER: string
      HMDA_APPLICATION_DATE: Date
      HMDA_LOAN_TYPE: { '1': "Conventional" } | { '2': "FHA insured" } | { '3': "VA guaranteed" } | { '4': "FSA/RHS guaranteed" }
      HMDA_LOAN_PURPOSE: { '1': "Home purchase" } | { '2': "Home improvement" } | { '31': "Refinancing" } | { '32': "Cash-out refinancing" } | { '4': "Other purpose" } | { '5': "Not applicable" }
      HMDA_PROPERTY_TYPE: { '1': "One to four family dwelling" } | { '2': "Manufactured housing" } | { '3': "Multifamily dwelling" }
      HMDA_OWNER_OCCUPANCY: { '1': "Owner occupied as a principal dwelling" } | { '2': "Not owner occupied as a principal dwelling" } | { '3': "Not applicable" }
      HMDA_LOAN_AMOUNT: Money
      HMDA_PREAPPROVAL: { '1': "Preapproval requested" } | { '2': "Preapproval not requested" } | { '3': "Not applicable" }
      HMDA_CONSTRUCTION_METHOD: { '1': "Site-built" } | { '2': "Manufactured home" }
      HMDA_OCCUPANCY_TYPE: { '1': "Principal residence" } | { '2': "Second residence" } | { '3': "Investment property" }
      HMDA_ACTION_TAKEN: { '1': "Loan originated" } | { '2': "Application approved but not accepted" } | { '3': "Application denied" } | { '4': "Application withdrawn" } | { '5': "File closed for incompleteness" } | { '6': "Loan purchased by us" } | { '7': "Preapproval request denied" } | { '8': "Preapproval request approved but not accepted" }
      HMDA_ACTION_DATE: Date
      HMDA_STREET: string
      HMDA_CITY: string
      HMDA_STATE: string
      HMDA_POSTAL_CODE: string
      HMDA_MSA_MD_CODE: string
      HMDA_STATE_CODE: { NA: "Not applicable" } | { '01': "Alabama" } | { '02': "Alaska" } | { '04': "Arizona" } | { '05': "Arkansas" } | { '06': "California" } | { '08': "Colorado" } | { '09': "Connecticut" } | { '10': "Delaware" } | { '11': "District of Columbia" } | { '12': "Florida" } | { '13': "Georgia" } | { '15': "Hawaii" } | { '16': "Idaho" } | { '17': "Illinois" } | { '18': "Indiana" } | { '19': "Iowa" } | { '20': "Kansas" } | { '21': "Kentucky" } | { '22': "Louisiana" } | { '23': "Maine" } | { '24': "Maryland" } | { '25': "Massachusetts" } | { '26': "Michigan" } | { '27': "Minnesota" } | { '28': "Mississippi" } | { '29': "Missouri" } | { '30': "Montana" } | { '31': "Nebraska" } | { '32': "Nevada" } | { '33': "New Hampshire" } | { '34': "New Jersey" } | { '35': "New Mexico" } | { '36': "New York" } | { '37': "North Carolina" } | { '38': "North Dakota" } | { '39': "Ohio" } | { '40': "Oklahoma" } | { '41': "Oregon" } | { '42': "Pennsylvania" } | { '44': "Rhode Island" } | { '45': "South Carolina" } | { '46': "South Dakota" } | { '47': "Tennessee" } | { '48': "Texas" } | { '49': "Utah" } | { '50': "Vermont" } | { '51': "Virginia" } | { '53': "Washington" } | { '54': "West Virginia" } | { '55': "Wisconsin" } | { '56': "Wyoming" } | { '60': "American Samoa" } | { '64': "Federated States of Micronesia" } | { '66': "Guam" } | { '68': "Marshall Islands" } | { '69': "Northern Mariana Islands" } | { '70': "Palau" } | { '72': "Puerto Rico" } | { '74': "U.S. Minor Outlying Islands" } | { '78': "Virgin Islands of the U.S." }
      HMDA_COUNTY_CODE: string
      HMDA_CENSUS_TRACT: string
      HMDA_APPLICANT_ETHNICITY: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_2: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_3: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_4: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_5: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_APPLICANT_ETHNICITY_TXT: string
      HMDA_APPLICANT_ETHNICITY_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_APPLICANT_RACE_1: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_2: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_3: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_4: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_5: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_APPLICANT_RACE_TRI_TXT: string
      HMDA_APPLICANT_RACE_ASI_TXT: string
      HMDA_APPLICANT_RACE_ISL_TXT: string
      HMDA_APPLICANT_RACE_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_APPLICANT_SEX: { '-': "None" } | { '1': "Male" } | { '2': "Female" } | { '3': "Information not provided" } | { '4': "Not applicable" } | { '6': "Both male and female" }
      HMDA_APPLICANT_SEX_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_APPLICANT_AGE: Count
      HMDA_APPLICANT_CR_SCORE: Count
      HMDA_APPLICANT_CR_SCORE_MOD: { '-': "None" } | { '1': "Equifax Beacon 5.0" } | { '2': "Experian Fair Isaac" } | { '3': "FICO Risk Score Classic 04" } | { '4': "FICO Risk Score Classic 98" } | { F: "FICO Score 9" } | { '5': "Vantage Score 2.0" } | { '6': "Vantage Score 3.0" } | { '7': "More than one" } | { '8': "Other" } | { '9': "Not applicable" } | { E: "Exempt" }
      HMDA_APPLICANT_CR_SCORE_TXT: string
      HMDA_COAPPLICANT_ETHNICITY: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_2: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_3: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_4: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_5: { '-': "None" } | { '1': "Hispanic or Latino" } | { '11': "Mexican" } | { '12': "Puerto Rican" } | { '13': "Cuban" } | { '14': "Other Hispanic or Latino" } | { '2': "Not Hispanic or Latino" } | { '3': "Information not provided" } | { '4': "Not applicable" }
      HMDA_COAPPLICANT_ETHNICITY_TXT: string
      HMDA_COAPPLICANT_ETHNICITY_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_COAPPLICANT_RACE_1: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_2: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_3: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_4: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_5: { '-': "None" } | { '1': "American Indian or Alaska Native" } | { '2': "Asian" } | { '21': "Asian Indian" } | { '22': "Chinese" } | { '23': "Filipino" } | { '24': "Japanese" } | { '25': "Korean" } | { '26': "Vietnamese" } | { '27': "Other Asian" } | { '3': "Black or African American" } | { '4': "Native Hawaiian or Other Pacific Islander" } | { '41': "Native Hawaiian" } | { '42': "Guamanian or Chamorro" } | { '43': "Samoan" } | { '44': "Other Pacific Islander" } | { '5': "White" } | { '6': "Information not provided" } | { '7': "Not applicable" }
      HMDA_COAPPLICANT_RACE_IND_TXT: string
      HMDA_COAPPLICANT_RACE_ASI_TXT: string
      HMDA_COAPPLICANT_RACE_ISL_TXT: string
      HMDA_COAPPLICANT_RACE_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_COAPPLICANT_SEX: { '-': "None" } | { '1': "Male" } | { '2': "Female" } | { '3': "Information not provided" } | { '4': "Not applicable" } | { '6': "Both male and female" }
      HMDA_COAPPLICANT_SEX_COL: { '-': "None" } | { '1': "Visual observation or surname" } | { '2': "Not visual observation or surname" } | { '3': "Not applicable" }
      HMDA_COAPPLICANT_AGE: Count
      HMDA_COAPPLICANT_CR_SCORE: Count
      HMDA_COAPPLICANT_CR_SCORE_MOD: { '-': "None" } | { '1': "Equifax Beacon 5.0" } | { '2': "Experian Fair Isaac" } | { '3': "FICO Risk Score Classic 04" } | { '4': "FICO Risk Score Classic 98" } | { F: "FICO Score 9" } | { '5': "Vantage Score 2.0" } | { '6': "Vantage Score 3.0" } | { '7': "More than one" } | { '8': "Other" } | { '9': "Not applicable" } | { E: "Exempt" }
      HMDA_COAPPLICANT_CR_SCORE_TXT: string
      HMDA_APPLICANT_INCOME: Money
      HMDA_PURCHASER_TYPE: { '0': "Not sold" } | { '1': "Fannie Mae" } | { '2': "Ginnie Mae" } | { '3': "Freddie Mac" } | { '4': "Farmer Mac" } | { '5': "Private securitization" } | { '6': "Commercial bank}|{ savings bank}|{ or savings association" } | { '71': "Credit union}|{ mortgage company}|{ or finance company" } | { '72': "Life insurance company" } | { '8': "Affiliate institution" } | { '9': "Other" }
      HMDA_DENIAL_REASON_1: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_2: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_3: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_4: { '-': "None" } | { '1': "Debt-to-income ratio" } | { '2': "Employment history" } | { '3': "Credit history" } | { '4': "Collateral" } | { '5': "Insufficient cash" } | { '6': "Unverifiable information" } | { '7': "Credit application incomplete" } | { '8': "Mortgage insurance denied" } | { '9': "Other" }
      HMDA_DENIAL_REASON_TXT: string
      HMDA_RATE_SPREAD: Rate
      HMDA_HOEPA_STATUS: { '1': "HOEPA loan" } | { '2': "Not HOEPA loan" } | { '3': "Not applicable" }
      HMDA_LIEN_STATUS: { '1': "Secured by a first lien" } | { '2': "Secured by a subordinate lien" } | { '3': "Not secured by a lien" } | { '4': "Not applicable" }
      HMDA_TOTAL_LOAN_COSTS: Money
      HMDA_TOTAL_POINTS_AND_FEES: Money
      HMDA_ORIGINATION_CHARGES: Money
      HMDA_DISCOUNT_POINTS: Money
      HMDA_LENDER_CREDITS: Money
      HMDA_INTEREST_RATE: Rate
      HMDA_PREPAYMENT_PENALTY_TERM: Count
      HMDA_DEBT_TO_INCOME_RATIO: Rate
      HMDA_COMBINED_LTV_RATIO: Rate
      HMDA_LOAN_TERM: Count
      HMDA_INTRODUCTORY_RATE_PERIOD: Count
      HMDA_BALLOON_PAYMENT: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_INTEREST_ONLY_PAYMENTS: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_NEGATIVE_AMORTIZATION: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_OTHER_NON_AMORTIZING: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_PROPERTY_VALUE: Money
      HMDA_MANU_HOME_SEC_PROP_TYPE: { '1': "Manufactured home and land" } | { '2': "Manufactured home and not land" } | { '3': "Not applicable" } | { E: "Exempt" }
      HMDA_MANU_HOME_LAND_PROP_INT: { '1': "Direct ownership" } | { '2': "Indirect ownership" } | { '3': "Paid leasehold" } | { '4': "Unpaid leasehold" } | { '5': "Not applicable" } | { E: "Exempt" }
      HMDA_TOTAL_UNITS: Count
      HMDA_MULTIFAMILY_AFF_UNITS: Count
      HMDA_APPLICATION_SUBMISSION: { '1': "Submitted directly" } | { '2': "Not submitted directly" } | { '3': "Not applicable" } | { E: "Exempt" }
      HMDA_INITIALLY_PAYABLE: { '1': "Yes" } | { '2': "No" } | { '3': "Not applicable" } | { E: "Exempt" }
      HMDA_NMLSR_ID: string
      HMDA_AUTO_UNDER_SYSTEM_1: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_2: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_3: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_4: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_5: { '-': "None" } | { '1': "Desktop Underwriter" } | { '2': "Loan Prospector or Loan Product Advisor" } | { '3': "TOTAL Scorecard" } | { '4': "Guaranteed Underwriting System" } | { '5': "Other" } | { '7': "Internal Proprietary System" }
      HMDA_AUTO_UNDER_SYSTEM_TXT: string
      HMDA_AUTO_UNDER_RESULT_1: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_2: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_3: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_4: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_5: { '-': "None" } | { '1': "Approve/Eligible" } | { '2': "Approve/Ineligible" } | { '3': "Refer/Eligible" } | { '4': "Refer/Ineligible" } | { '5': "Refer with caution" } | { '6': "Out of scope" } | { '7': "Error" } | { '8': "Accept" } | { '9': "Caution" } | { '10': "Ineligible" } | { '11': "Incomplete" } | { '12': "Invalid" } | { '13': "Refer" } | { '14': "Eligible" } | { '15': "Unknown" } | { '16': "Other" } | { '18': "Accept/Eligible" } | { '19': "Accept/Ineligible" } | { '20': "Accept/Unable to determine" } | { '21': "Refer with caution/Eligible" } | { '22': "Refer with caution/Ineligible" } | { '23': "Refer/Unable to determine" } | { '24': "Refer with caution/Unable to determine" }
      HMDA_AUTO_UNDER_RESULT_TXT: string
      HMDA_REVERSE_MORTGAGE: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_OPEN_END_LINE_OF_CREDIT: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      HMDA_BUSINESS_PURPOSE: { '1': "Yes" } | { '2': "No" } | { E: "Exempt" }
      SECURED_SHARE_SERIAL: Serial
      PERCENTAGE: Rate
      SECURED_SHARE_ADD_AMOUNT: Money
      ASSET_CATEGORY: { '-': "None" } | { I: "Invoice" } | { E: "Equipment" } | { Y: "Inventory" } | { S: "Security" }
      SECURITY_ISSUER_NAME: string
      SECURITY_ISSUED_DATE: Date
      SECURITY_QUANTITY: Count
      SECURITY_CUSIP_NUMBER: string
      SECURITY_RELEASED_USER_SERIAL: Serial
      TITLE_NAME: string
      TITLE_ADDRESS_SERIAL: Serial
      TITLE_COMPANY_PERSON_SERIAL: Serial
      TITLE_LOCATION_OPTION: { '-': "None" } | { I: "In-house" } | { C: "Collateral Management Company" }
      TITLE_RESPONSIBLE_PARTY: { C: "Credit Union" } | { D: "Dealer" } | { M: "Member" }
      TITLE_HARD_COPY_OPTION: { N: "No" } | { Y: "Yes" }
      TITLE_STATE: string
      TITLE_COUNTY: string
      TITLE_REQUESTED_DATE: Date
      TITLE_RECEIVED_DATE: Date
      TITLE_RELEASED_OPTION: { '-': "None" } | { O: "Registered owner" } | { F: "Financial institution" } | { D: "Dealer" } | { I: "Insurance company" }
      TITLE_RELEASED_DATE: Date
      TITLE_RELEASED_BY_USER_SERIAL: Serial
      TITLE_SENT_DATE: Date
      TITLE_ELT_NUMBER: string
      LIEN_PERFECTED_DATE: Date
      LIEN_REF_RELEASE_RECEIVED_DATE: Date
      VEHICLE_MSRP: Money
      VEHICLE_INVOICE: Money
      VEHICLE_RETAIL_VALUE: Money
      VEHICLE_WHOLESALE_VALUE: Money
      SELLER_CATEGORY: { '-': "None" } | { D: "Dealer" } | { P: "Private party" }
      SELLER_PERSON_SERIAL: Serial
      PAYOFF_PERSON_SERIAL: Serial
      OWNER_PERSON_SERIAL: Serial
      BORROWER_OTHER_NAME: string
      VALUATION_DATE: Date
      VALUATION_DOCUMENT: Document
      AMOUNT: Money
      LOAN_TO_VALUE: Rate
      TOTAL_LOAN_TO_VALUE: Rate
      HIGHEST_ALLOWED_LOAN_TO_VALUE: Rate
      FRONT_END_LOAN_TO_VALUE: Rate
      BACK_END_LOAN_TO_VALUE: Rate
      BORROWING_RATE: Rate
      LAST_FM_DATE: Date
    }
    LR_COLLATERAL_INSURANCE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      CATEGORY: { G: "GAP" } | { M: "MBP" } | { C: "Collision" } | { F: "Fire" } | { L: "Flood" } | { P: "PMI" } | { c: "CPI" } | { O: "Other" }
      COMPANY_PERSON_SERIAL: Serial
      AGENT: string
      POLICY_NUMBER: string
      QUOTE_NUMBER: string
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      RECEIVED_DATE: Date
      SOLD_DATE: Date
      SOLD_BY_USER_SERIAL: Serial
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LR_COLLATERAL_LIST: { SERIAL: Serial }
    LR_COVENANT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARED_COVENANT_OPTION: { N: "No" } | { Y: "Yes" }
      SHARED_COVENANT_SERIAL: Serial
      TYPE_SERIAL: Serial
      STATUS: { U: "Unbroken" } | { B: "Broken" } | { W: "Waived" }
      BROKEN_DATE: Date
      WAIVER_EXPIRATION_DATE: Date
      FREQUENCY: { '-': "None" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" }
      DUE_DATE: Date
      GRACE_DAYS: Count
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_REQUESTED_DATE: Date
      LAST_RECEIVED_DATE: Date
      LAST_REVIEWER_USER_SERIAL: Serial
      LAST_REVIEW_DATE: Date
      NEXT_REVIEW_DATE: Date
      EXPLANATION: string
      COMMENT: string
      LAST_FM_DATE: Date
    }
    LR_DEBT_RATIO: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      RATIO: Rate
      LAST_FM_DATE: Date
    }
    DECISION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DECISION_DATE: Date
      DECISION_MAKER_USER_SERIAL: Serial
      DECISION_MAKER_2_USER_SERIAL: Serial
      DECISION_MODEL_CRITERIA_SERIAL: Serial
      COUNTER_OFFER_EXPIRATION_DATE: Date
      COUNTER_OFFER_AMOUNT: Money
      COUNTER_OFFER_DESCRIPTION: string
      COUNTER_OFFER_LR_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    DECISION_EXCEPTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    DECISION_STIPULATION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      EXPLANATION: string
      DOCUMENTATION: string
      SATISFIED: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    LR_SPLIT_INTEREST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      CATEGORY: { S: "Split rate" } | { A: "Promotional advances" } | { H: "Held rates" } | { L: "Loan segment" } | { P: "Primary place marker" }
      TYPE_SERIAL: Serial
      STATEMENT_DESCRIPTION: string
      ADVANCE_PERIOD_START_DATE: Date
      ADVANCE_PERIOD_END_DATE: Date
      RATE_EXPIRATION_DATE: Date
      ADVANCES: Money
      MINIMUM_REQUIRED: Money
      BALANCE: Money
      INTEREST_RATE: Rate
      INTEREST_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      MATURITY_DATE: Date
      REQUEST_AMOUNT: Money
      PAYMENT_AMOUNT: Money
      CC_PROMO_OPT: { A: "All" } | { P: "Purchases" } | { C: "Cash advances" } | { B: "Balance transfers" } | { PC: "Purchases and Cash advances" } | { PB: "Purchases and Balance transfers" } | { CB: "Cash advances and Balance transfers" }
      CC_PURCH_INT_RATE: Rate
      CC_PURCH_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_CASH_ADV_INT_RATE: Rate
      CC_CASH_ADV_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_BAL_XFR_INT_RATE: Rate
      CC_BAL_XFR_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      LAST_FM_DATE: Date
    }
    LR_TRADE_IN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      VEHICLE_YEAR: Count
      VEHICLE_MAKE: string
      VEHICLE_MODEL: string
      VEHICLE_BODY_TYPE: string
      LIEN_HOLDER: string
      MONTHLY_PAYMENT: Money
      AMOUNT: Money
      BALANCE: Money
      NET_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LR_TRANSFER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { P: "Automatic loan payment" } | { S: "Scheduled disbursement" } | { I: "Escrow disbursement" }
      METHOD: { S: "Savings transfer" } | { G: "General ledger" } | { C: "Credit union check" }
      SHARE_SERIAL: Serial
      GL_SERIAL: Serial
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      PERSON_ADDR_LINK_SERIAL: Serial
      SECOND_PERSON_SERIAL: Serial
      PERCENTAGE: Rate
      AMOUNT: Money
      AMOUNT_OVERRIDE: { '-': "None" } | { P: "Loan payment" } | { p: "Loan payment if it exceeds amount" } | { Q: "25% of Loan payment" } | { H: "50% of Loan payment" } | { D: "Loan due amount" } | { d: "Loan due amount if it exceeds amount" } | { B: "Loan cycle balance" } | { b: "Loan cycle balance if it exceeds amount" } | { C: "Loan cycle balance less credits" } | { c: "Loan cycle balance less credits if it exceeds amount" } | { A: "Available balance" } | { S: "Available balance in excess of amount" }
      IMPOUND_CATEGORY: { '-': "None" } | { T: "Property tax" } | { F: "Fire insurance" } | { L: "Flood insurance" } | { P: "PMI" } | { I: "Other insurance" }
      REFERENCE: string
      STATEMENT_DESCRIPTION: string
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      DONOR_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      RECIPIENT_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      SPECIFIED_WITHHOLDING_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_FEDERAL_WITHHOLD_AMT: Money
      SPECIFIED_FEDERAL_WITHHOLD_PCT: Rate
      SPECIFIED_STATE_WITHHOLD_AMT: Money
      SPECIFIED_STATE_WITHHOLD_PCT: Rate
      GROUP_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      LAST_ATTEMPT_DATE: Date
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    LN_SCHEDULED_CHANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      CHANGE_DATE: Date
      CHANGE_STATUS: { P: "Pending" } | { C: "Completed" }
      LN_TYPE_CHANGE_OPTION: { N: "No" } | { Y: "Yes" }
      LN_PAYMENT_CHANGE_OPTION: { N: "No" } | { C: "Change Payment Calculation and recalculate payment" } | { P: "Change Payment Calculation without changing payment" } | { A: "Change Payment Calculation and use specified amount" } | { S: "Specified amount" }
      LN_TYPE_SERIAL: Serial
      LN_PAYMENT_CALCULATION_SERIAL: Serial
      LN_PAYMENT_CALC_SCH_FREQ: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" }
      LN_PAYMENT_CALC_SCH_FREQ_1: Count
      LN_PAYMENT_CALC_SCH_PERIOD: Count
      LN_PAYMENT_CALC_SCH_DATE: Date
      LN_PAYMENT_AHEAD: { N: "No limit" } | { D: "On or after due date only" } | { O: "One due date" } | { C: "One due date beyond last payment change" } | { P: "Specified payment count" } | { S: "Specified day count" }
      LN_PAYMENT_AHEAD_COUNT: Count
      LN_PAYMENT_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LN_SCHEDULED_CHANGE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    SPLIT_INTEREST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      CATEGORY: { S: "Split rate" } | { A: "Promotional advances" } | { H: "Held rates" } | { L: "Loan segment" } | { P: "Primary place marker" }
      TYPE_SERIAL: Serial
      STATEMENT_DESCRIPTION: string
      ADVANCE_PERIOD_START_DATE: Date
      ADVANCE_PERIOD_END_DATE: Date
      RATE_EXPIRATION_DATE: Date
      ADVANCES: Money
      MINIMUM_REQUIRED: Money
      BALANCE: Money
      INTEREST_RATE: Rate
      INTEREST_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      OPEN_DATE: Date
      CLOSE_DATE: Date
      LAST_MONETARY_DATE: Date
      MATURITY_DATE: Date
      ORIGINAL_LOAN_DATE: Date
      ORIGINAL_DUE_DATE: Date
      ORIGINAL_BALANCE: Money
      REQUEST_AMOUNT: Money
      PAYMENT_AMOUNT: Money
      PAYMENT_PARTIAL_AMOUNT: Money
      INTEREST_UNPAID: Money
      CC_PROMO_OPT: { A: "All" } | { P: "Purchases" } | { C: "Cash advances" } | { B: "Balance transfers" } | { PC: "Purchases and Cash advances" } | { PB: "Purchases and Balance transfers" } | { CB: "Cash advances and Balance transfers" }
      CC_PURCH_BAL_OLD: Money
      CC_PURCH_BAL_NEW: Money
      CC_PURCH_AVG_BAL: Money
      CC_PURCH_INT_RATE: Rate
      CC_PURCH_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_PURCH_INT_CHARGE: Money
      CC_PURCH_INT_UNPAID_OLD: Money
      CC_PURCH_INT_UNPAID_NEW: Money
      CC_CASH_ADV_BAL_OLD: Money
      CC_CASH_ADV_BAL_NEW: Money
      CC_CASH_ADV_AVG_BAL: Money
      CC_CASH_ADV_INT_RATE: Rate
      CC_CASH_ADV_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_CASH_ADV_INT_CHARGE: Money
      CC_CASH_ADV_INT_UNPAID_OLD: Money
      CC_CASH_ADV_INT_UNPAID_NEW: Money
      CC_BAL_XFR_BAL_OLD: Money
      CC_BAL_XFR_BAL_NEW: Money
      CC_BAL_XFR_AVG_BAL: Money
      CC_BAL_XFR_INT_RATE: Rate
      CC_BAL_XFR_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_BAL_XFR_INT_CHARGE: Money
      CC_BAL_XFR_INT_UNPAID_OLD: Money
      CC_BAL_XFR_INT_UNPAID_NEW: Money
      LAST_FM_DATE: Date
    }
    SPLIT_INTEREST_DFLT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEFAULTS_NAME: string
      DEFAULTS_STATUS: { O: "Open" } | { C: "Closed" }
      ID: string
      CATEGORY: { S: "Split rate" } | { A: "Promotional advances" } | { H: "Held rates" } | { L: "Loan segment" } | { P: "Primary place marker" }
      TYPE_SERIAL: Serial
      STATEMENT_DESCRIPTION: string
      ADVANCE_PERIOD_START_DATE: Date
      ADVANCE_PERIOD_END_DATE: Date
      RATE_EXPIRATION_DATE: Date
      MINIMUM_REQUIRED: Money
      INTEREST_RATE: Rate
      INTEREST_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_PROMO_OPT: { A: "All" } | { P: "Purchases" } | { C: "Cash advances" } | { B: "Balance transfers" } | { PC: "Purchases and Cash advances" } | { PB: "Purchases and Balance transfers" } | { CB: "Cash advances and Balance transfers" }
      CC_PURCH_INT_RATE: Rate
      CC_PURCH_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_CASH_ADV_INT_RATE: Rate
      CC_CASH_ADV_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      CC_BAL_XFR_INT_RATE: Rate
      CC_BAL_XFR_INT_RATE_VAR_OPT: { F: "Fixed" } | { V: "Variable" }
      LAST_FM_DATE: Date
    }
    SP_INT_RATE_CHANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      EFFECTIVE_DATE: Date
      INTEREST_RATE: Rate
      PRIOR_INTEREST_RATE: Rate
      ADJUSTMENT_REASON_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_TRANSFER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { P: "Automatic loan payment" } | { S: "Scheduled disbursement" } | { I: "Escrow disbursement" }
      METHOD: { S: "Savings transfer" } | { G: "General ledger" } | { C: "Credit union check" }
      SHARE_SERIAL: Serial
      GL_SERIAL: Serial
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      PERSON_ADDR_LINK_SERIAL: Serial
      SECOND_PERSON_SERIAL: Serial
      PERCENTAGE: Rate
      AMOUNT: Money
      AMOUNT_OVERRIDE: { '-': "None" } | { P: "Loan payment" } | { p: "Loan payment if it exceeds amount" } | { Q: "25% of Loan payment" } | { H: "50% of Loan payment" } | { D: "Loan due amount" } | { d: "Loan due amount if it exceeds amount" } | { B: "Loan cycle balance" } | { b: "Loan cycle balance if it exceeds amount" } | { C: "Loan cycle balance less credits" } | { c: "Loan cycle balance less credits if it exceeds amount" } | { A: "Available balance" } | { S: "Available balance in excess of amount" }
      IMPOUND_CATEGORY: { '-': "None" } | { T: "Property tax" } | { F: "Fire insurance" } | { L: "Flood insurance" } | { P: "PMI" } | { I: "Other insurance" }
      REFERENCE: string
      STATEMENT_DESCRIPTION: string
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      DONOR_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      RECIPIENT_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      SPECIFIED_WITHHOLDING_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_FEDERAL_WITHHOLD_AMT: Money
      SPECIFIED_FEDERAL_WITHHOLD_PCT: Rate
      SPECIFIED_STATE_WITHHOLD_AMT: Money
      SPECIFIED_STATE_WITHHOLD_PCT: Rate
      GROUP_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      LAST_ATTEMPT_DATE: Date
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    LN_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      MINIMUM_BALANCE: Money
      MINIMUM_ADVANCE: Money
      PAYMENT_CALCULATION_SERIAL: Serial
      PAYMENT_AHEAD: { N: "No limit" } | { D: "On or after due date only" } | { O: "One due date" } | { C: "One due date beyond last payment change" } | { P: "Specified payment count" } | { S: "Specified day count" }
      PAYMENT_AHEAD_COUNT: Count
      REPAYMENT_CALCULATION_SERIAL: Serial
      REPAYMENT_AHEAD: { N: "No limit" } | { D: "On or after due date only" } | { O: "One due date" } | { C: "One due date beyond last payment change" } | { P: "Specified payment count" } | { S: "Specified day count" }
      REPAYMENT_AHEAD_COUNT: Count
      DRAW_PERIOD_EXPIRATION_MONTHS: Count
      PAYMENT_HANDLING: { S: "Standard" } | { M: "Mortgage" } | { A: "Mortgage with payment ahead" }
      PAYMENT_APPLICATION: { LMIP: "Fees}|{ escrow}|{ interest}|{ principal" } | { MLIP: "Escrow}|{ fees}|{ interest}|{ principal" } | { IPML: "Interest}|{ principal}|{ escrow}|{ fees" } | { MIPL: "Escrow}|{ interest}|{ principal}|{ fees" } | { LIPM: "Fees}|{ interest}|{ principal}|{ escrow" } | { ILPM: "Interest}|{ fees}|{ principal}|{ escrow" } | { IPLM: "Interest}|{ principal}|{ fees}|{ escrow" }
      PAYMENT_INTEREST_OPTION: { I: "Standard" } | { O: "Interest only" } | { A: "Fixed principal plus all interest due" }
      PAYMENT_LATE_FEE_OPTION: { I: "Included in standard payment amount" } | { A: "Added to standard payment amount" } | { P: "Added to standard payment amount}|{ prevent pyramiding" }
      PAYMENT_MAINTENANCE_FEE_OPTION: { A: "Collect on payment" } | { P: "Collect at payoff" }
      PAYMENT_PARTIAL_OPTION: { S: "Standard" } | { P: "Requires privilege" } | { U: "Unapplied funds" }
      PAYMENT_SHORT_AMOUNT: Money
      PAYMENT_SHORT_PERCENTAGE: Rate
      FIRST_DUE_DATE_CALCULATION: { '-': "None" } | { G: "On or after grace days" } | { S: "On or after grace days after statement cutoff" } | { O: "One due date beyond one on or after grace days" } | { C: "One due date beyond last payment change" }
      FIRST_DUE_DATE_GRACE_DAYS: Count
      BALANCE_GL_SERIAL: Serial
      BALANCE_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CHARGE_OFF_GL_SERIAL: Serial
      CHARGE_OFF_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      RECOVERY_GL_SERIAL: Serial
      RECOVERY_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      UNAPP_FUNDS_GL_SERIAL: Serial
      UNAPP_FUNDS_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      INTEREST_GL_SERIAL: Serial
      INTEREST_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      INT_ACCRUED_GL_SERIAL: Serial
      INT_ACCRUED_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LATE_FEE_GL_SERIAL: Serial
      LATE_FEE_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      EXT_TRAN_GL_SERIAL: Serial
      EXT_TRAN_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CATEGORY: { CE: "Closed end" } | { OE: "Open end" } | { LC: "Line of credit" } | { CC: "Credit card" }
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      CLOSE_OPTION: { '-': "None" } | { P: "Close on payment to zero balance" }
      DORMANCY_RESTRICTION_DAYS: Count
      DQ_RESTRICTION_GRACE_DAYS: Count
      DQ_RESTRICTION_GRACE_AMOUNT: Money
      DQ_RESTRICTION_FORCE_DAYS: Count
      INTEREST_CALCULATION: { D: "Daily with 365 factor" } | { d: "Daily with 360 factor" } | { L: "Daily with 365.25 factor" } | { l: "Daily with 365 or 366 factor" } | { E: "Daily with 360 factor and 30 day month" } | { M: "Monthly" } | { C: "Credit card" }
      INTEREST_PD_AHD_PAYOFF_OPTION: { '-': "None" } | { R: "Refund" }
      INTEREST_PST_DUE_PAYOFF_OPTION: { '-': "Standard" } | { F: "Fannie Mae" }
      CC_CALCULATION_SERIAL: Serial
      AVAILABLE_CALCULATION: { '-': "None" } | { O: "Credit limit minus non-revolving balance" } | { P: "Credit limit minus principal balance" } | { C: "Credit limit minus credit card effective balance" }
      ORIGINAL_LN_DT_UPDATE_OPTION: { N: "New loan transaction or if blank" } | { B: "Only if blank" }
      CRED_REP_PORTFOLIO_TYPE: { I: "'I' Installment" } | { C: "'C' Line of credit" } | { M: "'M' Mortgage" } | { O: "'O' Open account" } | { R: "'R' Revolving" }
      IRS_FORM_OPTION: { N: "None" } | { M: "Mortgage loan with 1098 requirement" } | { S: "Student loan with 1098-E requirement" }
      GUARANTEE_OPTION: { '-': "None" } | { SBA: "Small Business Administration" }
      MLA_ELIGIBILITY: { N: "None" } | { L: "Consumer credit with limitations" }
      EXT_INTERFACE_SERIAL: Serial
      COLLECTION_ITEM_TYPE_SERIAL: Serial
      COLLECTION_NOTICE_TYPE_SERIAL: Serial
      PAPER_GRADE_SCALE_SERIAL: Serial
      RISK_BASED_PRICING_SERIAL: Serial
      RISK_BASED_PRICING_PLAN_SERIAL: Serial
      DECISION_MODEL_SERIAL: Serial
      RIGHT_TO_RESCIND_DAYS: Count
      DEALER_COMPENSATION_SERIAL: Serial
      APP_FORM_PACKET_SERIAL: Serial
      DEF_LOGIN_WITHDRAWAL_ACCESS: { N: "No" } | { Y: "Yes" }
      DEF_LOGIN_DEPOSIT_ACCESS: { N: "No" } | { Y: "Yes" }
      DEF_LOGIN_INQUIRY_ACCESS: { N: "No" } | { Y: "Yes" }
      AIRES_CODE: string
      INSURANCE_PRODUCT_RESTRICTION: { N: "No" } | { Y: "Yes" }
      CALC_PAYOFF_FORM_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_TYPE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { I: "Insurance" }
      LIFE_INSURANCE_SERIAL: Serial
      DISABILITY_INSURANCE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LN_YTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STORED_ACCESS_KEY: string
      TAX_YEAR: Count
      INTEREST_CHARGED: Money
      FEES_CHARGED: Money
      INTEREST: Money
      LATE_FEE: Money
      OTHER_CHARGES_PAID: Money
      IMPOUND_PAID: Money
      PRINCIPAL_PAID: Money
      REFUND_OF_CURR_YEAR_INTEREST: Money
      REFUND_OF_PRIOR_YEAR_INTEREST: Money
      REPORTABLE_POINTS_PAID: Money
      REPORTABLE_INSURANCE_PREMIUMS: Money
      STARTING_BALANCE: Money
      ACH_PAYMENT_COUNT: Count
      ACH_PAYMENT_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    LOGIN: {
      SERIAL: Serial
      ACCESS_KEY: string
      CHANNEL_SERIAL: Serial
      ID: string
      ID_UPPERCASE: string
      PERSON_SERIAL: Serial
      ACCOUNT_SERIAL: Serial
      LAST_LOGIN_TIME: Time
      UNSUCCESSFUL_LOGIN_TIME: Time
      UNSUCCESSFUL_LOGIN_COUNT: Count
      LOGIN_LOCK: { N: "Not locked" } | { L: "Locked" }
      PREFERENCES: string
      LAST_FM_DATE: Date
    }
    LOGIN_ACCESS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      WITHDRAWAL_ACCESS: { N: "No" } | { Y: "Yes" }
      DEPOSIT_ACCESS: { N: "No" } | { Y: "Yes" }
      INQUIRY_ACCESS: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    LOGIN_CHANNEL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { '-': "None" } | { H: "Online banking" } | { M: "Mobile banking" } | { T: "Audio" }
      ID_FORMAT: { A: "Alphanumeric" } | { N: "Numeric" }
      ID_MIN_LENGTH: Count
      ID_MAX_LENGTH: Count
      PASSWORD_POLICY_SERIAL: Serial
      CHECKING_ACCOUNT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    LOGIN_PASSWORD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      PASSWORD: string
      CHANGE_TIME: Time
      CHANGE_REQUIRED: { N: "No" } | { Y: "Yes" }
      EXPIRATION_TIME: Time
    }
    MARKET: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    MARKET_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STATE_CODE: string
      POSTAL_CODES: string
      LAST_FM_DATE: Date
    }
    MARKET_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    MASTER_LINE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      MATURITY_DATE: Date
      CREDIT_LIMIT: Money
      CREDIT_LIMIT_AVAILABLE: Money
      CREDIT_LIMIT_ASSIGNED_UNUSED: Money
      TOTAL_AVAILABLE: Money
      TOTAL_BALANCE: Money
      LAST_FM_DATE: Date
    }
    MESSAGE_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { SMTP: "SMTP email" }
      ADDRESS_PREFIX: string
      TIME_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      SOCKET_NAME: string
      CONNECT_TIMEOUT_SECONDS: Count
      READ_WRITE_TIMEOUT_SECONDS: Count
      SMTP_START_TLS: { N: "No" } | { Y: "Yes" }
      SMTP_AUTHENTICATION: { N: "No" } | { Y: "Yes" }
      USERNAME: string
      PASSWORD: string
      FROM_ADDRESS: string
      SEND_TEST_MSG_ADDRESSES: string
      LAST_FM_DATE: Date
    }
    MONETARY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      POSTING_DATE: Date
      STATUS: { P: "Posted" } | { V: "Voided" }
      TARGET_CATEGORY: { S: "Savings" } | { L: "Loan" }
      TARGET_ACCESS_KEY: string
      TARGET_SERIAL: Serial
      EFFECTIVE_DATE: Date
      CATEGORY: { D: "Deposit" } | { W: "Withdrawal" } | { P: "Payment" } | { A: "Advance" } | { R: "Refinance" } | { N: "New loan" } | { C: "Comment" }
      SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      TRANSFER_OPTION: { '-': "No" } | { T: "Transfer" }
      ADJUSTMENT_OPTION: { '-': "No" } | { A: "Adjustment" }
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      SUB_CATEGORY: { '-': "None" } | { P: "Card purchase" } | { R: "Card purchase return" } | { B: "Card balance transfer" } | { S: "Single payment" } | { s: "Single payment - waive late fee" } | { A: "Additional payment" } | { O: "Principal only payment" } | { W: "Waive late fee" } | { L: "Close loan" } | { b: "Bankruptcy pre-petition payment" } | { I: "Interest prepayment" }
      TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      DESCRIPTION: string
      PRINCIPAL: Money
      INTEREST: Money
      IMPOUND: Money
      LATE_FEE: Money
      OTHER_CHARGES: Money
      NEW_BALANCE: Money
      LAST_MONETARY_DATE: Date
      LAST_ACTIVITY_DATE: Date
    }
    MON_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      CATEGORY: { COM: "Comment" } | { DSS: "Description with text value" } | { DSM: "Description with money value" } | { DSR: "Description with rate value" } | { DSD: "Description with date value" } | { DST: "Description with time value" } | { DSC: "Description with count value" } | { DNT: "Check number and tracer" } | { RAN: "Routing number and account number" } | { ACH: "ACH company name and ID" } | { ACD: "ACH company entry description and descriptive date" } | { ACO: "ACH company discretionary data and originating DFI ID" } | { ACC: "ACH standard entry class code and transaction code" } | { ACN: "ACH name and identification number" } | { ACT: "ACH trace number and IAT transaction type code" } | { ACP: "ACH payment related information" } | { WTC: "Wire type code and description" } | { WSC: "Wire subtype code and description" } | { WOI: "Wire originator name and identifier" } | { WOL: "Wire originator location" } | { WBI: "Wire beneficiary name and identifier" } | { WBL: "Wire beneficiary location" } | { TLI: "Terminal location and ID" } | { TCS: "Terminal city and state" } | { TCC: "Terminal country code" } | { MER: "Merchant name and type" } | { SRN: "Sender and receiver name" } | { TKT: "Ticket number" } | { TSF: "Transportation service fee" } | { MCR: "Masked card number and reference" } | { TSD: "Transaction date and settlement date" } | { TAV: "Transaction amount and available amount" } | { OCP: "Overdraft transfer and courtesy pay" } | { RUT: "Round up transfer" } | { HCO: "Hold category and stop option" } | { HDE: "Hold check number and ending number" } | { HAC: "Hold ACH company name and ID" } | { HAR: "Hold amount and reason" } | { HPT: "Hold payee and tracer" } | { HED: "Hold expiration date and time" } | { RMC: "Returned item maker and check number" } | { RCR: "Returned item channel and reason" } | { BCA: "Bulk cash receive amount" } | { BKA: "Bulk check receive amount and count" } | { KHA: "Check hold amount and date" } | { SIP: "Loan split interest serial and principal amount" } | { SII: "Loan split interest serial and interest amount" } | { PSP: "Credit card purchase split interest serial and principal amount" } | { PSI: "Credit card purchase split interest serial and interest amount" } | { CSP: "Credit card cash advance split interest serial and principal amount" } | { CSI: "Credit card cash advance split interest serial and interest amount" } | { BSP: "Credit card balance transfer split interest serial and principal amount" } | { BSI: "Credit card balance transfer split interest serial and interest amount" } | { CCF: "Credit card aggregated from transaction and monetary serials" } | { DRI: "Draw request item description and amount" } | { PDP: "Payment due date and paid date" } | { CCA: "Curtailment correction amount and date" } | { LOF: "Loan fee description and amount" } | { LMF: "Loan maintenance fee description and amount" } | { LFA: "Loan fee assess description and amount" } | { SIA: "Advance loan split interest serial and amount" } | { SIE: "Payment excess loan split interest serial" } | { PPI: "Credit card purchase principal amount and interest amount" } | { CPI: "Credit card cash advance principal amount and interest amount" } | { BPI: "Credit card balance transfer principal amount and interest amount" } | { FPI: "Credit card fee principal amount" } | { CCT: "Credit card aggregated into transaction and monetary serials" } | { FEC: "Fee classification and fee serial" } | { FCT: "Fee charge count" } | { LLI: "Loan life insurance serial" } | { LDI: "Loan disability insurance serial" } | { ULF: "Uncollected late fee" } | { UAF: "Unapplied funds amount and balance" } | { CAD: "Curtailment amount and date" } | { CDP: "Certificate penalty" } | { SRY: "Special reporting year" } | { TXA: "Taxable amount" } | { FTW: "Federal income tax withheld" } | { STW: "State income tax withheld" } | { AYR: "APYE rate" } | { ABO: "APYE average balance and collected balance option" } | { ADR: "APYE date range" } | { TAN: "Transfer account and name" } | { TID: "Transfer ID category and ID" } | { TDE: "Transfer ID description" } | { OTM: "Original transaction and monetary serials" } | { CTM: "Correction transaction and monetary serials" } | { DIS: "Dispute and dispute item serials" } | { RVR: "Reversal reason description and classification" } | { SPR: "Shadow principal and recovery" } | { SIL: "Shadow interest and late fee" } | { COA: "Shadow charge off adjustment" }
      DATA_TYPE_1: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      CONTENTS_1: string
      DATA_TYPE_2: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      CONTENTS_2: string
      DESCRIPTION_1: string
      DESCRIPTION_2: string
    }
    MONEY_ORDER_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CHECKING_ACCOUNT_SERIAL: Serial
      CHECK_NUMBER_REQUIRED: { N: "No" } | { Y: "Yes" }
      INVENTORY_TYPE_SERIAL: Serial
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      FEE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    NAICS: {
      SERIAL: Serial
      ACCESS_KEY: string
      CODE: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      FINCEN_ENABLED: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    NETWORK_CONNECTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      CATEGORY: { '-': "None" } | { COOP: "CO-OP" } | { CNGN: "CO-OP CUSC NGN" } | { ELAN: "Elan" } | { FDRD: "First Data for debit clients" } | { FDRJ: "First Data for JHA clients" } | { STNE: "First Data Star Northeast" } | { FCNX: "FIS Connex" } | { CB24: "FIS Certegy Base 24" } | { EPOC: "Fiserv EPOC" } | { FSCC: "FSCC" } | { IPRO: "InterPro" } | { JPPS: "JHA Payment Processing Solutions" } | { PSPT: "jhaPassPort direct" } | { PULS: "Pulse" } | { SHZM: "SHAZAM" } | { VNTV: "Vantiv" } | { VDPS: "Visa DPS" } | { FNOW: "Fiserv NOW" } | { ORCC: "ORCC" } | { QURY: "Query" }
      STATUS: { OFL: "Offline" } | { ONL: "Online" }
      CONNECTION_USER_SERIAL: Serial
      CONNECTION_DEVICE_SERIAL: Serial
      ISSUER_INSTITUTION_ID: string
      ISSUER_MSG_SECURITY_CODE: string
      ACQUIRER_INSTITUTION_ID: string
      ACQUIRER_MSG_SECURITY_CODE: string
      ISS_ACQ_MSG_SECURITY_CODE: string
      INSTITUTION_ACRONYM: string
      OPERATOR_ID: string
      SHARED_BRANCH_ACQUIRER_FORMAT: { '-': "None" } | { S: "Standard" } | { N: "NGN" } | { F: "FSCC" }
      ACQUIRER_PROCESSOR_ID: string
      SB_ACCOUNT_NUMBER_FORMAT: { S: "Standard" } | { N: "Use 0 or 1 separator" } | { T: "Use S or L separator" }
      ATM_INQUIRY_STMT_DESCRIPTION: string
      ACCOUNT_ID_OPTION: { S: "Standard (extract when 12 to 15 digits)" } | { O: "Open account (extract when 15 digits)" } | { N: "Do not use (post by PAN)" }
      ACCOUNT_TYPE_OPTION: { S: "Standard" } | { N: "Use funding for non-ATM" }
      ACCOUNT_LIMITING_OPTION: { N: "No" } | { Y: "Yes" }
      BILL_PAYMENT_SUB_CATEGORY: { A: "Cash Advance" } | { P: "Card Purchase" }
      CARD_TOKEN_FM_OPTION: { N: "None" } | { A: "Allow" }
      FORCE_POST_LIMITING_OPTION: { S: "Standard" } | { P: "Do not limit transactions with a previous settlement date" }
      ATM_POSTING_POLICY_SERIAL: Serial
      ATM_FORCE_POST_POLICY_SERIAL: Serial
      POS_POSTING_POLICY_SERIAL: Serial
      POS_FORCE_POST_POLICY_SERIAL: Serial
      CDC_POSTING_POLICY_SERIAL: Serial
      CDC_FORCE_POST_POLICY_SERIAL: Serial
      BP_POSTING_POLICY_SERIAL: Serial
      BP_FORCE_POST_POLICY_SERIAL: Serial
      SB_POSTING_POLICY_SERIAL: Serial
      SB_FORCE_POST_POLICY_SERIAL: Serial
      DRAFT_POSTING_POLICY_SERIAL: Serial
      DRAFT_FORCE_POST_POLICY_SERIAL: Serial
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      GL_ACCOUNT_OPTION: { S: "Standard" } | { T: "Use network terminal table" }
      PREAUTH_SUSPENSE_GL_SERIAL: Serial
      ACQUIRER_GL_SERIAL: Serial
      ACQUIRER_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      VISA_MUL_CURR_ISA_FEE_SERIAL: Serial
      VISA_SGL_CURR_ISA_FEE_SERIAL: Serial
      MC_CROSS_BORDER_FEE_SERIAL: Serial
      EXCEPTION_IMPORT_SET_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    NETWORK_CONNECTION_CARD_FILE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CARD_TYPE_SERIAL: Serial
      CATEGORY: { NF: "Negative file" } | { PF: "Positive file" }
      INTERFACE_SERIAL: Serial
      STATUS: { Y: "On" } | { N: "Off" }
      ACTIVATION_UPDATES: { N: "Do not send" } | { Y: "Send" } | { W: "Send web service" }
      EXPIRATION_DATE_UPDATES: { N: "Do not send" } | { Y: "Send" }
      PIN_OFFSET_UPDATES: { N: "Do not send" } | { Y: "Send" } | { W: "Send web service" }
      ADDL_NETWORK_STATUS_UPDATES: { N: "Do not send" } | { R: "Send to regional network(s)" } | { n: "Send to national network" } | { B: "Send to national and regional networks" }
      NEW_ISSUE_UPDATES: { N: "Do not send" } | { Y: "Send" } | { W: "Send web service" }
      CARD_REISSUE_UPDATES: { N: "Do not send" } | { Y: "Send" } | { W: "Send web service" }
      CARD_DIGITAL_ISSUE_UPDATES: { N: "Do not send" } | { Y: "Send" }
      INTERFACE_UPDATES: { N: "Do not send" } | { W: "Send web service" }
      LAST_FM_DATE: Date
    }
    NETWORK_CONNECTION_FEE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      DESCRIPTION: string
      STATUS: { Y: "On" } | { N: "Off" }
      TRAN_SOURCE_TYPE_COMPARISON: { '--': "None" } | { EQ: "=" } | { NE: "!=" } | { IN: "In" } | { NI: "Not in" }
      TRAN_SOURCE_TYPE_LIST: string
      ACQUIRER_NETWORK_ID_COMPARISON: { '--': "None" } | { EQ: "=" } | { NE: "!=" } | { IN: "In" } | { NI: "Not in" }
      ACQUIRER_NETWORK_ID_LIST: string
      NETWORK_TERMINAL_COMPARISON: { '-': "None" } | { O: "On-Us terminal" } | { F: "Foreign terminal" } | { U: "Unlisted terminal" }
      ACCOUNT_QUALIFIER_COMPARISON: { '--': "None" } | { EQ: "=" } | { NE: "!=" } | { IN: "In" } | { NI: "Not in" }
      ACCOUNT_QUALIFIER_LIST: string
      TARGET_CATEGORY_COMPARISON: { '-': "None" } | { S: "Savings" } | { L: "Loan" }
      FEE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    NETWORK_LOG: {
      SERIAL: Serial
      CONNECTION_SERIAL: Serial
      CATEGORY: { R: "Responder" } | { I: "Initiator" } | { L: "Late response" }
      MESSAGE_CLASS: { O: "Other" } | { A: "Authorization" } | { F: "Financial" } | { U: "File update" }
      TRANSACTION_SOURCE: { '-': "None" } | { C: "Credit or debit card" } | { D: "Check" } | { B: "Bill payment" } | { s: "Shared branch" } | { H: "Online banking" } | { A: "ATM" } | { O: "POS" } | { F: "File maintenance" }
      TRANSACTION_TYPE: { '-': "None" } | { ADD: "Add" } | { CNG: "Change" } | { DEL: "Delete" } | { INQ: "Inquiry" } | { WTH: "Withdrawal" } | { DDP: "Deposit" } | { ENC: "Payment enclosed" } | { XFR: "Transfer" } | { PUR: "Purchase" } | { RTN: "Purchase return" } | { PT3: "Payment to 3rd party" } | { PF3: "Payment from 3rd party" } | { ITD: "Interbank transfer debit" } | { ITC: "Interbank transfer credit" } | { CCK: "Cash check" } | { STM: "Statement print" } | { NOT: "Notification" } | { TKA: "Token activation notification" } | { TKD: "Token deactivation notification" }
      MEDIA: { '-': "None" } | { E: "Envelope" } | { C: "Cash" } | { K: "Check" } | { M: "Cash and check" } | { G: "Goods and services" } | { Q: "Quasi cash and scrip" } | { T: "Transfer" }
      REVERSAL_OPTION: { N: "No" } | { Y: "Yes" }
      FORCE_POST_OPTION: { N: "No" } | { Y: "Yes" }
      CARD_SERIAL: Serial
      TARGET_ACCOUNT_NUMBER: string
      TARGET_CATEGORY: { S: "Savings" } | { L: "Loan" }
      TARGET_ID: string
      TARGET_SHARE_SERIAL: Serial
      TARGET_LOAN_SERIAL: Serial
      POSTING_METHOD: { S: "Standard" } | { T: "Post to preauthorization suspense GL account" } | { F: "Post from preauthorization suspense GL account" }
      POSTING_AMOUNT: Money
      POSTING_DATE: Date
      POSTING_TIME: Time
      POSTING_SETTLEMENT_DATE: Date
      POSTING_RESPONSE: { '-': "None" } | { APP: "Approved" } | { DEN: "Denied" } | { DBN: "Denied by network" } | { CNF: "Card not found" } | { HOT: "Card is hot" } | { PIN: "Card PIN incorrect" } | { POI: "Card PIN offset invalid" } | { CNA: "Card not active" } | { CEX: "Card expired" } | { CEM: "Card expiration date mismatch" } | { CAD: "Card access denied" } | { CLA: "Card limit amount exceeded" } | { CLC: "Card limit count exceeded" } | { ALA: "Account limit amount exceeded" } | { ALC: "Account limit count exceeded" } | { PNF: "Person not found" } | { ANF: "Account not found" } | { CLS: "Closed" } | { SNF: "Recipient account not found" } | { SCL: "Recipient closed" } | { STP: "Stopped" } | { NSF: "NSF" } | { RDL: "Reg D limit" } | { DQL: "Delinquent loan" } | { RTR: "Restriction" }
      POSTING_EXCEPTION_DESCRIPTION: string
      TRANSACTION_SERIAL: Serial
      DUPLICATE_OPTION: { N: "No" } | { Y: "Yes" }
      DUPLICATE_MATCH_KEY: string
      DUPLICATE_NETWORK_LOG_SERIAL: Serial
      RECIPIENT_ACCOUNT_NUMBER: string
      RECIPIENT_CATEGORY: { S: "Savings" } | { L: "Loan" }
      RECIPIENT_ID: string
      RECIPIENT_SHARE_SERIAL: Serial
      RECIPIENT_LOAN_SERIAL: Serial
      MESSAGE_TYPE: string
      RESPONSE_CODE: string
      PAN: string
      CARD_SEQUENCE_NUMBER: string
      PROCESSING_CODE: string
      SETTLEMENT_AMT: Money
      SETTLEMENT_FEE_AMT: Money
      SETTLEMENT_CURRENCY_CODE: string
      SETTLEMENT_CONV_RATE_TEXT: string
      SETTLEMENT_PROC_FEE_AMT: Money
      TRANSACTION_AMT_TEXT: string
      TRANSACTION_FEE_AMT_TEXT: string
      TRANSACTION_CURRENCY_CODE: string
      TRANSACTION_PROC_FEE_AMT_TEXT: string
      CARDHOLDER_AMT_TEXT: string
      CARDHOLDER_FEE_AMT_TEXT: string
      CARDHOLDER_CURRENCY_CODE: string
      CARDHOLDER_CONV_RATE_TEXT: string
      TRACER: string
      TRANSMISSION_TIME: Time
      LOCAL_TRANSACTION_DATE: Date
      LOCAL_TRANSACTION_TIME_TEXT: string
      EXPIRATION_DATE: Date
      SETTLEMENT_DATE: Date
      CONVERSION_DATE: Date
      CAPTURE_DATE: Date
      MERCHANT_TYPE: string
      MERCHANT_NAME: string
      ACCEPTOR_ADDRESS: string
      ACCEPTOR_CITY: string
      ACCEPTOR_STATE: string
      ACCEPTOR_POSTAL_CODE: string
      ACCEPTOR_COUNTRY_CODE: string
      ACCEPTOR_ID: string
      POS_ENTRY_MODE: string
      POS_CONDITION_CODE: string
      CARDHOLDER_PRESENCE: { '-': "Unknown" } | { Y: "Present" } | { N: "Not present" } | { O: "Mail order/Telephone order" } | { R: "Recurring" }
      RETRIEVAL_REFERENCE_NUMBER: string
      AUTHORIZATION_ID_RESPONSE: string
      PREAUTHORIZATION_KEY: string
      TERMINAL_ID: string
      PSEUDO_TERMINAL_ID: string
      ACQUIRER_INST_COUNTRY_CODE: string
      ACQUIRER_INST_ID: string
      ACQUIRER_NETWORK_ID: string
      NETWORK_MGMT_INFO_CODE: string
      ADVICE_REASON: string
      REVERSAL_REASON: string
      ADDRESS_VERIFICATION_SOURCE: { '-': "None" } | { I: "Institution" } | { N: "Network" }
      ADDRESS_VERIFICATION_RESULT: { '-': "None" } | { '0': "Unknown" } | { A: "'A' Address matches}|{ postal code does not" } | { B: "'B' Address matches}|{ postal code not verified" } | { C: "'C' Not verified international" } | { D: "'D' Address and postal code matches international" } | { E: "'E' Ineligible transaction or content error" } | { G: "'G' Not verified international non-participant" } | { I: "'I' Address information not verified" } | { M: "'M' Address and postal code match" } | { N: "'N' Nothing matches" } | { P: "'P' Postal code matches}|{ address not verified incompatible" } | { R: "'R' Retry}|{ system unable to process" } | { S: "'S' Not supported" } | { U: "'U' No address data" } | { W: "'W' Nine-digit postal code matches}|{ address does not" } | { X: "'X' Address and nine-digit postal code matches" } | { Y: "'Y' Address and five-digit postal code matches" } | { Z: "'Z' Five-digit postal code matches}|{ address does not" }
      ORIGINAL_MESSAGE_TYPE: string
      ORIGINAL_SEQUENCE: string
      ORIGINAL_DATE: Date
      ORIGINAL_TIME_TEXT: string
      ACCOUNT_ID_1: string
      ACCOUNT_ID_2: string
      ACCOUNT_QUALIFIER_1: string
      ACCOUNT_QUALIFIER_2: string
      FILE_NAME: string
      CASH_BACK_AMOUNT: Money
      CASH_DEPOSIT_AMOUNT: Money
      IMMEDIATE_CHECK_DEPOSIT_AMOUNT: Money
      LOCAL_CHECK_DEPOSIT_AMOUNT: Money
      USAGE_FEE_AMOUNT: Money
      VISA_ISA_FEE_AMOUNT: Money
      MASTER_CARD_CCA_FEE_AMOUNT: Money
      MASTER_CARD_CB_FEE_AMOUNT: Money
      RESULT_STATUS: { '-': "None" } | { R: "Response received" } | { T: "Timeout" } | { F: "Format error" }
      RESULT_MESSAGE_TYPE: string
      RESULT_RESPONSE_CODE: string
      RESULT_TIME: Time
      SETTLEMENT_CATEGORY: { '-': "None" } | { D: "Debit" } | { C: "Credit" } | { T: "Transfer" }
    }
    NETWORK_LOG_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      DATA_NAME: string
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      CONTENTS: string
    }
    NETWORK_QUEUE: {
      SERIAL: Serial
      CONNECTION_SERIAL: Serial
      CATEGORY: { CFM: "Card file maintenance" }
      STATUS: { Q: "Queued" } | { F: "Failed" }
      QUEUED_TIME: Time
      SYNC_STATUS_AND_REASON: { N: "No" } | { Y: "Yes" }
      SYNC_ACTIVATION: { N: "No" } | { Y: "Yes" }
      SYNC_EXPIRATION_DATE: { N: "No" } | { Y: "Yes" }
      SYNC_PIN_OFFSET: { N: "No" } | { Y: "Yes" }
      SYNC_NEW_ISSUE: { N: "No" } | { Y: "Yes" }
      SYNC_INTERFACE: { N: "No" } | { Y: "Yes" }
      CARD_SERIAL: Serial
    }
    NETWORK_RESTRICTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      MERCHANT_NAME: string
      MERCHANT_NAME_EXPRESSION: string
      ACCEPTOR_CITY: string
      ACCEPTOR_STATES: string
      ACCEPTOR_COUNTRY_CODES: string
      ACCEPTOR_ID: string
      ACCEPTOR_ID_EXPRESSION: string
      TERMINAL_ID: string
      ACQUIRER_NETWORK_ID: string
      POSTING_AMOUNTS: string
      CASH_BACK_AMOUNTS: string
      TRANSACTION_SOURCE_TYPES: string
      MERCHANT_CATEGORY_CODES: string
      ACTIVE_TIMES: string
      NOTE_OPTION: { O: "Override restriction" } | { E: "Enforce restriction" }
      AGGREGATE_OPTION: { '-': "None" } | { M: "Minutes" } | { H: "Hours" } | { D: "Days" }
      AGGREGATE_PERIOD: Count
      AGGREGATE_LIMIT_AMOUNT: Money
      AGGREGATE_LIMIT_COUNT: Count
      LAST_FM_DATE: Date
    }
    NETWORK_RESTRICTION_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { NT: "Note type" } | { CT: "Card type" }
      NOTE_TYPE_SERIAL: Serial
      CARD_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    NETWORK_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { OFL: "Offline" } | { ONL: "Online" }
      LAST_FM_DATE: Date
    }
    NETWORK_TERMINAL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      INSTITUTION_ID: string
      TERMINAL_ID: string
      WITHDRAWAL_GL_SERIAL: Serial
      DEPOSIT_GL_SERIAL: Serial
      DEPOSIT_CASH_GL_SERIAL: Serial
      DEPOSIT_CHECK_GL_SERIAL: Serial
      SURCHARGE_GL_SERIAL: Serial
      ADDRESS_SERIAL: Serial
      FINCEN_LOCATION_CODE: string
      OWNERSHIP: { O: "On-Us" } | { F: "Foreign" }
      FEE_OPTION: { S: "Standard" } | { O: "Override ownership as On-Us" }
      FEE_REFUND_OPTION: { '-': "None" } | { B: "Batch" }
      LAST_FM_DATE: Date
    }
    NOTE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      VIEW_SECURITY_EVENT_SERIAL: Serial
      FM_SECURITY_EVENT_SERIAL: Serial
      MONETARY_RESTRICTION: { '-': "None" } | { W: "Withdrawals" } | { D: "Deposits" } | { B: "Withdrawals and deposits" } | { A: "Withdrawals}|{ deposits and comments" }
      MON_SECURITY_EVENT_SERIAL: Serial
      NOTE_VW_SECURITY_EVENT_SERIAL: Serial
      NOTE_VW_DENIED_DESCRIPTION: string
      NOTE_FM_SECURITY_EVENT_SERIAL: Serial
      NOTE_FM_O_U_SEC_EVENT_SERIAL: Serial
      DISPLAY_COLOR: string
      ALERT_OPTION: { N: "No" } | { Y: "Yes" }
      INCLUDE_EXPLANATION_ALERT: { N: "No" } | { Y: "Yes" }
      INCLUDE_EXPLANATION_ROW_DESC: { N: "No" } | { Y: "Yes" }
      PE_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      AC_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      SH_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      LN_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      CD_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      AP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      AP_SECURITY_OPTION: { N: "No" } | { Y: "Yes" }
      GL_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      IV_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      DP_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      DUPLICATE_PLACEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      EXPIRATION_OPTION: { N: "Never" } | { M: "Months" } | { D: "Days" }
      EXPIRATION_PERIOD: Count
      SHARED_BRANCH_OPTION: { N: "Do not send" } | { Y: "Send" }
      LAST_FM_DATE: Date
    }
    NOTICE_PRODUCTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { R: "Return item" } | { O: "Overdraft transfer" } | { C: "Courtesy pay" } | { W: "Reg D pay" } | { F: "Force pay" } | { D: "Collection" } | { M: "Savings maturity" } | { E: "Certificate renewal" } | { b: "Rental anticipated renewal" } | { B: "Rental renewal" } | { I: "Interest rate change" } | { A: "IRA withholding" }
      REASON: { '-': "None" } | { SNF: "Session not found" } | { ANF: "Account not found" } | { LAD: "Login access denied" } | { CLS: "Closed" } | { NAU: "Not authorized" } | { DNE: "Deceased" } | { RVK: "Revoked" } | { STP: "Stopped" } | { NSU: "NSF due to uncollected funds" } | { NSD: "NSF due to Reg D transfer limit" } | { NSF: "NSF" } | { OVL: "Loan over limit" } | { RDL: "Reg D limit" } | { DQL: "Delinquent loan" } | { GOB: "GL entries do not balance" } | { CHT: "Check hold requires a Savings or Loan to be specified" } | { OTH: "Other" }
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      MONETARY_SERIAL: Serial
      POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      EFFECTIVE_BALANCE: Money
      EFFECTIVE_BALANCE_RESULT: Money
      AVAILABLE_BALANCE: Money
      AVAILABLE_BALANCE_RESULT: Money
      FEE_POST_AMOUNT: Money
      FEE_HOLD_AMOUNT: Money
      FEE_DESCRIPTION: string
      LOAN_CREDIT_LIMIT: Money
      LOAN_INTEREST_RATE: Rate
      LOAN_INTEREST_RATE_RESULT: Rate
      LOAN_INTEREST_RATE_CHG_DEFER: Rate
      LOAN_REMAINING_TERM_MONTHS: Count
      LOAN_PAYMENT_DUE_DATE: Date
      LOAN_PAYMENT_AMOUNT: Money
      LOAN_PAYMENT_AMOUNT_RESULT: Money
      LOAN_PAST_DUE_AMOUNT: Money
      LOAN_LATE_FEE_AMOUNT: Money
      LOAN_MAINTENANCE_FEE_AMOUNT: Money
      COLLECTION_NOTICE_TYPE_SERIAL: Serial
      COLLECTION_NOTICE_COUNT: Count
      COLLECTION_NOTICE_FACT_ACT_OPT: { '-': "None" } | { '1': "Notice B-1" } | { '2': "Notice B-2" }
      SHARE_NEGATIVE_SINCE_DATE: Date
      SHARE_CATEGORY: { S: "Savings" } | { D: "Checking" } | { B: "Club" } | { C: "Certificate" }
      SHARE_CERTIFICATE_NUMBER: string
      SHARE_MATURITY_POSTING: { R: "Renew" } | { T: "Transfer then close" } | { t: "Transfer then renew" } | { H: "Hold" }
      SHARE_MATURITY_FREQUENCY: { M: "Months" } | { D: "Days" }
      SHARE_MATURITY_PERIOD: Count
      SHARE_MATURITY_DATE: Date
      SHARE_DIVIDEND_RATE: Rate
      SHARE_DIVIDEND_APY: Rate
      SHARE_OPENING_BALANCE: Money
      SHARE_MATURITY_FREQUENCY_RENEW: { M: "Months" } | { D: "Days" }
      SHARE_MATURITY_PERIOD_RENEW: Count
      SHARE_MATURITY_DATE_RENEW: Date
      RENTAL_DESCRIPTION: string
      RENTAL_LAST_FEE_DATE: Date
      RENTAL_NEXT_FEE_DATE: Date
      NOTICE_TEXT: string
      LAST_FM_DATE: Date
    }
    NOTICE_PRODUCTION_CUTOFF: {
      SERIAL: Serial
      ACCESS_KEY: string
      CUTOFF_LAST_NOTICE_PR_SERIAL: Serial
      CUTOFF_PRIOR_NOTICE_PR_SERIAL: Serial
      LOGO_IMAGE: Binary
      LOGO_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      LOGO_IMAGE_MOD_TIME: Time
      LOGO_IMAGE_HEIGHT: Count
      BRANCH_SERIAL: Serial
      MATURITY_NOTICE_DAYS_BEFORE: Count
      MATURITY_NOTICE_CUTOFF_DATE: Date
      RENTAL_NOTICE_DAYS_BEFORE: Count
      RENTAL_NOTICE_CUTOFF_DATE: Date
      PAYMENT_COUPON_LATE_FEE_OPTION: { T: "Add late fee based on Loan Type Payment Late Fee Option" } | { A: "Add late fee always" }
      IRA_WH_NOTICE_TEXT: string
      IRA_WH_NOTICE_NEXT_DATE: Date
      INCLUDE_TIN: { N: "No" } | { Y: "Yes" }
      MASK_ACCOUNT_NUMBER: { N: "No" } | { Y: "Yes" }
      PERSON_GROUPING: { S: "Standard" } | { L: "Use person link category" }
      LAST_FM_DATE: Date
    }
    NOTICE_PRODUCTION_HOLD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { FH: "Funds hold" } | { CK: "Check deposit" } | { OD: "ACH origination deposit" } | { BK: "Bulk check deposit" } | { BC: "Bulk cash deposit" } | { CD: "Certified check" } | { BD: "Bill payment check" } | { PA: "Preauthorization" } | { MV: "Merchant verification" } | { RI: "Large dollar return item" } | { IL: "IRS tax levy" } | { CL: "Child support levy" } | { LV: "Levy" } | { GA: "Garnishment" } | { UF: "Uncollected fee" } | { CA: "Close fee" } | { CF: "Close fee GL only" } | { PR: "Pending return" } | { DP: "Check positive pay" } | { AP: "ACH positive pay" } | { DS: "Check stop" } | { AS: "ACH stop" } | { AE: "ACH stop all except" } | { AR: "ACH revocation" } | { AN: "ACH not authorized" } | { AD: "ACH death notification" }
      AMOUNT: Money
      EXPIRATION_DATE: Date
      EXPIRATION_TIME: Time
      LAST_FM_DATE: Date
    }
    NOTICE_PRODUCTION_ITEM: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      POSTING_ITEM_SERIAL: Serial
      CATEGORY: { '-': "None" } | { D: "Deposit" } | { W: "Withdrawal" } | { R: "Refinance" } | { N: "New loan" } | { F: "Fee" } | { H: "Hold placement" } | { h: "Hold release" } | { C: "Comment" } | { O: "Prenotification" } | { G: "General ledger" } | { K: "Check reconciliation" } | { d: "Returned debit" } | { c: "Returned credit" }
      SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      DESCRIPTION: string
      DRAFT_NUMBER: string
      AMOUNT: Money
      TRANSACTION_FEE_AMOUNT: Money
      TRANSACTION_FEE_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    NOTICE_PRODUCTION_TRANSFER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      AMOUNT: Money
      FEE_POST_AMOUNT: Money
      FEE_HOLD_AMOUNT: Money
      FEE_DESCRIPTION: string
      EFFECTIVE_BALANCE_RESULT: Money
      AVAILABLE_BALANCE_RESULT: Money
      LAST_FM_DATE: Date
    }
    OCCUPATION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    OFAC: {
      SERIAL: Serial
      ACCESS_KEY: string
      SDN_FILE: Document
      SDN_FILE_DATE: Date
      PLC_FILE: Document
      PLC_FILE_DATE: Date
      FSE_FILE: Document
      FSE_FILE_DATE: Date
      CON_FILE: Document
      CON_FILE_DATE: Date
      PERSON_NEW_FILE_OPTION: { N: "No" } | { Y: "Yes" }
      BILL_PAY_NEW_FILE_OPTION: { N: "No" } | { Y: "Yes" }
      STATUS_EXPLANATION_REQUIRED: { N: "No" } | { Y: "Yes" }
      PERSON_MATCH_SCORE_THRESHOLD: Count
      BILL_PAY_MATCH_SCORE_THRESHOLD: Count
      ACH_IAT_MATCH_SCORE_THRESHOLD: Count
      LAST_FM_DATE: Date
    }
    ON_US_ROUTING_NUMBER: {
      SERIAL: Serial
      ACCESS_KEY: string
      ROUTING_NUMBER: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { K: "Closed - allow check order" } | { C: "Closed" }
      CATEGORY: { P: "Primary" } | { S: "Secondary" }
      SH_DRAFT_ACCOUNT_NUMBER_FORMAT: string
      LN_DRAFT_ACCOUNT_NUMBER_FORMAT: string
      LAST_FM_DATE: Date
    }
    OPPORTUNITY: {
      SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      SUBTYPE_SERIAL: Serial
      STAGE_SERIAL: Serial
      STATUS: { O: "Open" } | { C: "Closed" }
      PRIORITY_SERIAL: Serial
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      DUE_DATE: Date
      START_TIME: Time
      FINISH_TIME: Time
      DESCRIPTION: string
      EXPLANATION: string
      RESOLUTION_TYPE_SERIAL: Serial
      RESOLUTION_EXPLANATION: string
      ROOT_CAUSE_TYPE_SERIAL: Serial
      ROOT_CAUSE_EXPLANATION: string
      DISPUTE_SERIAL: Serial
      CAMPAIGN_SERIAL: Serial
      PRODUCT_SERIAL: Serial
      PERSON_SERIAL: Serial
      ACCOUNT_SERIAL: Serial
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      OFFER_AMOUNT: Money
      OFFER_STATUS: { '-': "None" } | { I: "Prepared" } | { O: "Presented" } | { D: "Declined" } | { P: "Postponed" } | { R: "Referred" } | { A: "Accepted" } | { F: "Fulfilled" }
      OFFER_LITERATURE_URL: string
      DECISION_MODEL_CRITERIA_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    OPP_CONFIG: {
      SERIAL: Serial
      ACCESS_KEY: string
      MAX_APP_AGE_DAYS: Count
      MAX_CREDIT_PULL_AGE_DAYS: Count
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_DFLT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEFAULTS_NAME: string
      DEFAULTS_STATUS: { O: "Open" } | { C: "Closed" }
      TYPE_SERIAL: Serial
      SUBTYPE_SERIAL: Serial
      STAGE_SERIAL: Serial
      PRIORITY_SERIAL: Serial
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      DESCRIPTION: string
      EXPLANATION: string
      RESOLUTION_TYPE_SERIAL: Serial
      RESOLUTION_EXPLANATION: string
      ROOT_CAUSE_TYPE_SERIAL: Serial
      ROOT_CAUSE_EXPLANATION: string
      CAMPAIGN_SERIAL: Serial
      PRODUCT_SERIAL: Serial
      OFFER_AMOUNT: Money
      OFFER_LITERATURE_URL: string
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_PRIORITY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      PRIORITY: Count
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_RESOLUTION_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_ROOT_CAUSE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_STAGE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      OPPORTUNITY_STATUS: { O: "Open" } | { C: "Closed" }
      OFFER_STATUS: { '-': "None" } | { I: "Prepared" } | { O: "Presented" } | { D: "Declined" } | { P: "Postponed" } | { R: "Referred" } | { A: "Accepted" } | { F: "Fulfilled" }
      RESOLUTION_TYPE_SERIAL: Serial
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      ESCALATION_POLICY_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_SUBTYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { '-': "None" } | { X: "Cross-sell" } | { M: "Marketing" } | { C: "Complaint" }
      OPP_VW_SECURITY_EVENT_SERIAL: Serial
      OPP_VW_DENIED_DESCRIPTION: string
      OPP_FM_SECURITY_EVENT_SERIAL: Serial
      EMP_FM_SEC_EVENT_SERIAL: Serial
      EMP_REL_FM_SEC_EVENT_SERIAL: Serial
      UA_EMP_FM_SEC_EVENT_SERIAL: Serial
      UA_EMP_REL_FM_SEC_EVENT_SERIAL: Serial
      DISPLAY_COLOR: string
      WORK_QUEUE_SERIAL: Serial
      WORK_QUEUE_CRITERIA_SERIAL: Serial
      WORK_FLOW_SERIAL: Serial
      ESCALATION_POLICY_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    OPPORTUNITY_TYPE_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SUBTYPE_SERIAL: Serial
      STAGE_SERIAL: Serial
      RESOLUTION_TYPE_SERIAL: Serial
      ROOT_CAUSE_TYPE_SERIAL: Serial
      INTERACTION_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PAPER_GRADE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    PAPER_GRADE_SCALE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    PAPER_GRADE_SCALE_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      CREDIT_SCORE: Count
      PAPER_GRADE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PARTICIPANT: {
      SERIAL: Serial
      ACCESS_KEY: string
      PARTICIPANT_NUMBER: string
      PARTICIPANT_PERSON_SERIAL: Serial
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      STMT_CUTOFF_GROUP_SERIAL: Serial
      STMT_CUTOFF_LAST_DATE: Date
      STMT_CUTOFF_LAST_TRAN_SERIAL: Serial
      STMT_CUTOFF_PRIOR_DATE: Date
      STMT_CUTOFF_PRIOR_TRAN_SERIAL: Serial
      REMITTANCE_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" }
      ACH_ORIGINATION_COMPANY_SERIAL: Serial
      ACH_DFI_ROUTING_NUMBER: string
      ACH_DFI_ROUTING_NUMBER_DESC: string
      ACH_DFI_ACCOUNT_NUMBER: string
      ACH_DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      ACH_ENTRY_CLASS: { CCD: "CCD" } | { PPD: "PPD" }
      ACH_IDENTIFICATION_NUMBER: string
      ACH_NAME: string
      ACH_PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      ACH_PRENOTIFICATION_DATE: Date
      REMITTANCE_GL_SERIAL: Serial
      REMITTANCE_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      REMITTANCE_FREQUENCY_DAY_1: Count
      REMITTANCE_FREQUENCY_DAY_2: Count
      LAST_REMITTANCE_DATE: Date
      NEXT_REMITTANCE_DATE: Date
      LAST_FM_DATE: Date
    }
    PARTICIPANT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    PARTICIPATION_AGREEMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ID: string
      DESCRIPTION: string
      PARTICIPANT_SERIAL: Serial
      REFERENCE_NUMBER: string
      TYPE_SERIAL: Serial
      OPEN_DATE: Date
      ACTIVATION_DATE: Date
      CLOSE_DATE: Date
      PAYABLE_GL_SERIAL: Serial
      PAYABLE_BALANCE: Money
      PRINCIPAL_GL_SERIAL: Serial
      PRINCIPAL_BALANCE: Money
      AGREEMENT_INT_RATE: Rate
      ALLOCATION_PERCENTAGE: Rate
      LATE_FEE_ALLOCATION_OPTION: { N: "No" } | { Y: "Yes" }
      SERVICING_FEE_OPTION: { S: "Servicing fee rate" } | { SL: "Ratio of servicing fee rate to loan rate" } | { AL: "Ratio of loan rate less agreement rate to loan rate" }
      SERVICING_FEE_RATE: Rate
      SERVICING_FEE_GL_SERIAL: Serial
      PRINCIPAL_PURCHASED_TOTAL: Money
      PRINCIPAL_PAID_TOTAL: Money
      INTEREST_TOTAL: Money
      LATE_FEE_TOTAL: Money
      SERVICING_FEE_TOTAL: Money
      LAST_FM_DATE: Date
    }
    PARTICIPATION_AGREEMENT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    PARTICIPATION_POOL: {
      SERIAL: Serial
      ACCESS_KEY: string
      PARTICIPATION_POOL_NUMBER: string
      DESCRIPTION: string
      STATUS: { P: "Pending" } | { A: "Active" }
      TYPE_SERIAL: Serial
      OPEN_DATE: Date
      ACTIVATION_DATE: Date
      CLOSE_DATE: Date
      PRINCIPAL_ALLOCATION_OPTION: { F: "Fixed percentage" } | { P: "Current principal ratio" }
      INTEREST_ALLOCATION_OPTION: { F: "Fixed percentage" } | { P: "Current principal ratio" }
      LATE_FEE_ALLOCATION_OPTION: { F: "Fixed percentage" } | { P: "Current principal ratio" }
      CHARGE_OFF_OPTION: { N: "Not allowed - repurchase required" } | { Y: "Allowed" }
      MINIMUM_RETENTION_PERCENTAGE: Rate
      RETENTION_PERCENTAGE: Rate
      RETENTION_LOAN_BALANCE: Money
      TOTAL_POOL_LOAN_BALANCE: Money
      LAST_FM_DATE: Date
    }
    PARTICIPATION_POOL_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    PARTICIPATION_TRANSACTION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TRANSACTION_SERIAL: Serial
      MONETARY_SERIAL: Serial
      POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      CATEGORY: { S: "Sale" } | { B: "Repurchase" } | { F: "Funding" } | { R: "Remittance" } | { A: "Advance allocation" } | { P: "Payment allocation" } | { C: "Comment" }
      ADJUSTMENT_OPTION: { '-': "No" } | { A: "Adjustment" } | { V: "Void reversal" }
      DESCRIPTION: string
      LOAN_SERIAL: Serial
      LOAN_BALANCE: Money
      PAYABLE: Money
      NEW_PAYABLE_BALANCE: Money
      PRINCIPAL: Money
      NEW_PRINCIPAL_BALANCE: Money
      INTEREST: Money
      LATE_FEE: Money
      SERVICING_FEE: Money
      LAST_FM_DATE: Date
    }
    PASSWORD_POLICY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      PASSWORD_MIN_CHARS: Count
      PASSWORD_MAX_CHARS: Count
      PASSWORD_MIN_ALPHA_CHARS: Count
      PASSWORD_MIN_UPPER_CHARS: Count
      PASSWORD_MIN_LOWER_CHARS: Count
      PASSWORD_MIN_NUMERIC_CHARS: Count
      PASSWORD_MIN_OTHER_CHARS: Count
      PASSWORD_OTHER_CHARS_ALLOWED: string
      PASSWORD_MAX_CHAR_REPEAT_COUNT: Count
      PASSWORD_MAX_SEQ_CHAR_COUNT: Count
      PASSWORD_MIN_CHANGE_CHARS: Count
      PASSWORD_PREVENT_USERNAME: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_ACCT_NUM: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_BIRTH_DATE: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_TIN: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_FIRST_NAME: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_LAST_NAME: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_PHONE_NUM: { N: "No" } | { Y: "Yes" }
      PASSWORD_PREVENT_REUSE_DAYS: Count
      PASSWORD_CHANGE_ALLOWED: { N: "No" } | { Y: "Yes" }
      PASSWORD_CHANGE_REQUIRED_DAYS: Count
      PASSWORD_CHANGE_GRACE_DAYS: Count
      PASSWORD_RESET_EXP_SECONDS: Count
      RETRY_DELAY_SECONDS: Count
      RETRY_CLEAR_AFTER_SECONDS: Count
      RETRY_DISABLE_AFTER_COUNT: Count
      RETRY_REENABLE_AFTER_SECONDS: Count
      LAST_FM_DATE: Date
    }
    PAYMENT_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FORMULA: { BPF: "Balance percentage" } | { BPR: "Balance percentage times interest rate" } | { BPB: "Balance percentage from balance range" } | { BPI: "Balance percentage from interest rate range" } | { PMD: "Payoff on maturity date" } | { PPC: "Payoff from payment count scheduled" } | { PMT: "Payoff months" } | { PMB: "Payoff months from balance range" } | { PMI: "Payoff months from interest rate range" } | { PAB: "Payment amount from balance range" } | { PNB: "Payment per next balance increment" } | { PEB: "Payment per nearest balance increment" } | { INT: "Interest due" } | { IDD: "Interest due on next due date" } | { INO: "Interest only" }
      PAYMENT_AMOUNT_MINIMUM: Money
      PAYMENT_AMOUNT_MAXIMUM_OPTION: { '-': "None" } | { PP: "Do not exceed projected payoff on due date" }
      PAYMENT_AMOUNT_INCREMENT: Money
      PAYMENT_AMOUNT_INCREMENT_ROUND: { U: "Up" } | { D: "Down" }
      PAYMENT_FREQUENCY_FACTOR: { PPY: "Adjust from monthly based on payments per year" } | { NOA: "No adjustment" }
      OVERLIMIT_OPTION: { '-': "None" } | { A: "Add overlimit to calculated payment" }
      INCREASE_OPTION: { D: "Increase or decrease" } | { I: "Increase only" }
      UPDATE_OPTION: { M: "On advance transaction" } | { C: "On advance transaction and by interest rate change" } | { P: "On advance transaction and by payment calculation batch" } | { B: "By statement cutoff" } | { I: "By statement cutoff if advance transaction" } | { S: "By statement cutoff if advance transaction and by interest rate change" } | { A: "By payment calculation batch" } | { R: "By interest rate change" }
      DUE_DATE_GRACE_OPTION: { G: "On or after grace days" } | { S: "On or after grace days after statement cutoff" }
      DUE_DATE_GRACE_DAYS: Count
      BALANCE_PERCENTAGE: Rate
      BALANCE_INCREMENT: Money
      PAYMENT_PER_BALANCE_INCREMENT: Money
      PAYOFF_MONTHS: Count
      PAYOFF_MATURITY_OPTION: { '-': "None" } | { L: "Maturity Date is limited to Balloon Date" }
      PAYOFF_MATURITY_UPDATE_OPTION: { N: "No" } | { Y: "Yes" } | { A: "Yes if advance else use existing" }
      ANNIVERSARY_OPTION: { N: "No" } | { L: "On loan scheduled date" } | { O: "On exact anniversary of last advance" }
      ANNIVERSARY_MONTHS: Count
      FREQUENCY: { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAYS_BEFORE_EOM: Count
      LAST_CALCULATION_DATE: Date
      NEXT_CALCULATION_DATE: Date
      LAST_FM_DATE: Date
    }
    PAYMENT_CALC_RANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      BALANCE: Money
      INTEREST_RATE: Rate
      BALANCE_PERCENTAGE: Rate
      PAYMENT_AMOUNT: Money
      PAYOFF_MONTHS: Count
      LAST_FM_DATE: Date
    }
    PAYMENT_CHANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      PAYMENT_DUE_DATE: Date
      PAYMENT_AMOUNT: Money
      IMPOUND_AMOUNT: Money
      PRIOR_PAYMENT_AMOUNT: Money
      PRIOR_IMPOUND_AMOUNT: Money
      CALCULATION_BALANCE: Money
      CALCULATION_OVERLIMIT_AMOUNT: Money
      CALCULATION_DATE: Date
      LAST_FM_DATE: Date
    }
    PAYROLL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      GROUP_SERIAL: Serial
      IDENTIFIER: string
      EXPECTED_AMOUNT: Money
      AMOUNT: Money
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      DISTRIBUTION_SERIAL: Serial
      POSTING_STATUS: { A: "Approved" } | { D: "Declined" } | { S: "Skipped" }
      LAST_POSTING_DATE: Date
      LAST_POSTING_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    PAYROLL_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { B: "Balanced" } | { P: "Posting in progress" }
      CODE: string
      GROUP_TOTAL: Money
      STATEMENT_DESCRIPTION: string
      POSTING_POLICY_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      LAST_APPROVED_TOTAL: Money
      LAST_DECLINED_TOTAL: Money
      LAST_POSTING_TIME: Time
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      ITEM_GL_SERIAL: Serial
      ITEM_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      POSTING_BATCH_JOB_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PERSON: {
      SERIAL: Serial
      ACCESS_KEY: string
      ROW_CHANGE_TIMESTAMP: Time
      TITLE: string
      FIRST_NAME: string
      MIDDLE_NAME: string
      LAST_NAME: string
      SUFFIX: string
      NICKNAME: string
      BIRTH_DATE: Date
      DEATH_DATE: Date
      OWNERSHIP_CHANGE_DATE: Date
      GENDER: { U: "Unspecified" } | { M: "Male" } | { F: "Female" }
      MARITAL_STATUS: { U: "Unspecified" } | { M: "Married" } | { S: "Separated" } | { N: "Unmarried" } | { P: "Domestic partner" }
      CITIZENSHIP_STATUS: { U: "Unspecified" } | { C: "US citizen" } | { P: "Permanent resident alien" } | { O: "Other" }
      DEMOGRAPHICS_FURNISHED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      ETHNICITY_HISPANIC_OR_LATINO: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_AMERICAN_INDIAN_OR_ALASKA: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_HAWAIIAN_OR_ISLANDER: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_ASIAN: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_BLACK_OR_AFRICAN_AMERICAN: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      RACE_WHITE: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      TIN: string
      TIN_TYPE: { S: "SSN" } | { E: "EIN" } | { I: "ITIN" } | { A: "ATIN" }
      TIN_CERTIFICATION: { C: "Certified" } | { N: "Not certified" } | { O: "One TIN notice from IRS" } | { T: "Two TIN notices from IRS within three years" }
      TIN_APPLICATION_DATE: Date
      BACKUP_WITHHOLD: { N: "No" } | { Y: "Yes" } | { E: "Exempt" }
      TAX_REPORTING: { '-': "Normal" } | { C: "Nonresident alien subject to 1042-S" } | { N: "No reporting" }
      TAX_STATE_SERIAL: Serial
      FOREIGN_TIN: string
      TAX_COUNTRY_CODE: string
      TAX_COUNTRY: string
      IRS_FORM_W8_EXPIRATION_DATE: Date
      IRS_FORM_W9_RECEIVED_DATE: Date
      TAX_PERSON_SERIAL: Serial
      HOUSEHOLD_CATEGORY: { '-': "None" } | { H: "Head" } | { M: "Member" }
      HOUSEHOLD_PERSON_SERIAL: Serial
      HOUSEHOLD_REASSIGNMENT: { A: "Allowed" } | { N: "Not allowed" }
      RELATIONSHIP_SERIAL: Serial
      RELATIONSHIP_OVR_SERIAL: Serial
      RELATIONSHIP_OVR_EFF_DATE: Date
      RELATIONSHIP_OVR_EXP_DATE: Date
      CHECK_HOLD_LEVEL_SERIAL: Serial
      CATEGORY: { I: "Individual" } | { B: "Sole Proprietorship" } | { C: "Corporation" } | { S: "S Corporation" } | { P: "Partnership" } | { p: "Limited Partnership" } | { l: "LLP" } | { L: "LLC" } | { N: "NPO" } | { T: "Trust" } | { E: "Estate" } | { O: "Other entity" }
      TYPE_SERIAL: Serial
      NAICS_SERIAL: Serial
      CTR_EXEMPTION: { N: "No" } | { Y: "Yes" }
      CTR_EXEMPTION_REVIEW_DATE: Date
      MARKETING_OPTION: { '-': "None" } | { AM: "Opt-out of all marketing" } | { CS: "Opt-out of cross-sell" }
      OFAC_RESTRICTION: { '-': "Not checked" } | { Y: "Yes" } | { N: "No" } | { M: "Maybe" }
      OFAC_LAST_CHECK_DATE: Date
      ACCESS_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" } | { E: "Employee" } | { F: "Employee related" }
      NOTE_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      LAST_FM_DATE: Date
    }
    PERSON_ADDRESS_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ADDRESS_SERIAL: Serial
      CATEGORY: { R: "Residence" } | { B: "Business" } | { M: "Mailing" } | { V: "Previous (Do not use)" }
      BAD_ADDRESS: { N: "No" } | { Y: "Yes" }
      TYPE_SERIAL: Serial
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      SEASON_START_MONTH: Count
      SEASON_START_DAY: Count
      SEASON_END_MONTH: Count
      SEASON_END_DAY: Count
      OWN_RENT: { U: "Unspecified" } | { O: "Own" } | { R: "Rent" } | { B: "Buying" } | { L: "Lives with parents" } | { Z: "Other" }
      CRED_REP_ADDRESS_INDICATOR: { '-': "None" } | { C: "'C' Confirmed address" } | { Y: "'Y' Known to be address of primary consumer" } | { N: "'N' Not confirmed address" } | { M: "'M' Military address" } | { S: "'S' Secondary address" } | { B: "'B' Business address" } | { U: "'U' Non-deliverable address" } | { D: "'D' Data reporter default address" } | { P: "'P' Bill payer service address" }
      CRED_REP_RESIDENCE_CODE: { '-': "None" } | { O: "'O' Owns" } | { R: "'R' Rents" }
      LAST_VERIFICATION_DATE: Date
      LAST_FM_DATE: Date
    }
    PERSON_AUTH_ENROLLMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      INTERFACE_SERIAL: Serial
      STATUS: { N: "Not enrolled" } | { D: "Declined" } | { F: "Deferred enrollment" } | { E: "Enrolled" } | { P: "Pending enrollment" }
      MEMBER_ID: string
      PHONE_NUMBER: string
      EXPIRATION_DATE: Date
      SERVICE_CONFIG: Document
      LAST_FM_DATE: Date
    }
    PERSON_AUTH_LOG: {
      SERIAL: Serial
      ACCESS_KEY: string
      EVENT: { E: "Enroll member" } | { U: "Unenroll member" } | { A: "Authenticate member" } | { D: "Member declined service" } | { T: "Transferred" }
      EVENT_DATE: Date
      EVENT_TIME: Time
      STATUS: { Q: "Queued" } | { S: "Successful" } | { D: "Denied" } | { F: "Failed" }
      ENROLLMENT_SERIAL: Serial
      PHONE_NUMBER: string
      SESSION_ID: string
      JOB_ID: string
      USER_SERIAL: Serial
      DEVICE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      EXCEPTION_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    PERSON_CONTACT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { HP: "Home phone" } | { BP: "Business phone" } | { HF: "Home fax" } | { BF: "Business fax" } | { PC: "Personal cell" } | { BC: "Business cell" } | { PP: "Personal pager" } | { Bp: "Business pager" } | { PE: "Personal email" } | { BE: "Business email" } | { PW: "Personal web page" } | { BW: "Business web page" } | { CU: "Custom" }
      DESCRIPTION: string
      VALUE: string
      MARKETING_OPTION: { Y: "Yes" } | { N: "No" } | { T: "Text only" } | { V: "Voice only" }
      CARD_FRAUD_ALERT_OPTION: { N: "No" } | { Y: "Yes" }
      ALERT_OPTION: { N: "Normal" } | { S: "Suppress" }
      BAD_CONTACT: { N: "No" } | { Y: "Yes" }
      EXPIRATION_DATE: Date
      LAST_VERIFICATION_DATE: Date
      LAST_FM_DATE: Date
    }
    PERSON_EMPLOYMENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      STATUS: { E: "Employed" } | { U: "Unemployed" } | { D: "Disabled" } | { R: "Retired" }
      SELF_EMPLOYED: { U: "Unspecified" } | { N: "No" } | { Y: "Yes" }
      EMPLOYER_PERSON_SERIAL: Serial
      EMPLOYER_PERSON_ADDR_SERIAL: Serial
      PHONE_NUMBER: string
      FAX_NUMBER: string
      EMPLOYEE_ID: string
      OCCUPATION_SERIAL: Serial
      TITLE_OR_OCCUPATION: string
      SUPERVISOR_NAME: string
      FROM_DATE: Date
      TO_DATE: Date
      HOURLY_INCOME: Money
      HOURS_PER_WEEK: Count
      MONTHLY_INCOME: Money
      LAST_FM_DATE: Date
    }
    APPLICANT_EMPLOYMENT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    CU_PERSON_EXTENSION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CU_PERSON_SERIAL: Serial
      CU_LAST_SURVEY_INVITE_DATE: Date
      LAST_FM_DATE: Date
    }
    PERSON_EXT_IDENTIFIER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      VALUE: string
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    PERSON_EXT_IDENTIFIER_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    PERSON_ID: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { DL: "Driver license" } | { PN: "Passport" } | { MI: "Military ID" } | { SI: "State ID" } | { RI: "Resident ID" } | { PW: "Password" } | { MM: "Mother's maiden name" } | { SQ: "Security question" } | { CU: "Custom" }
      DESCRIPTION: string
      VALUE: string
      ISSUER: string
      ISSUE_DATE: Date
      EXPIRATION_DATE: Date
      IMAGE: Binary
      IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      IMAGE_MOD_TIME: Time
      BACK_IMAGE: Binary
      BACK_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      BACK_IMAGE_MOD_TIME: Time
      LAST_VERIFICATION_DATE: Date
      LAST_FM_DATE: Date
    }
    PERSON_LINK_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    PERSON_MLA_CHECK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { U: "Unknown" } | { N: "Not a covered borrower" } | { Y: "Covered borrower" }
      STATUS_DATE: Date
      STATUS_EXPLANATION: string
      STATUS_SOURCE: { C: "Credit reporting agency" } | { D: "DMDC database" } | { O: "Other" }
      LAST_FM_DATE: Date
    }
    PE_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    PERSON_OFAC_CHECK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { N: "No match" } | { n: "No new potential match" } | { P: "Potential match" } | { C: "Match confirmed" } | { R: "Match rejected" }
      STATUS_DATE: Date
      STATUS_USER_SERIAL: Serial
      STATUS_EXPLANATION: string
      FILE_SOURCE: { '-': "None" } | { SDN: "SDN" } | { PLC: "PLC" } | { FSE: "FSE" } | { CON: "Consolidated" }
      FILE_UNIQUE_ID: string
      FILE_AKA_UNIQUE_ID: string
      FILE_ENTRY: Document
      FILE_DATE: Date
      MATCH_DATE: Date
      MATCH_SCORE: Count
      LAST_FM_DATE: Date
    }
    PERSON_SCORE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      SCORE: Count
      SCORE_PERCENTILE: Rate
      EXCLUSION_CODE: string
      EXCLUSION_DESCRIPTION: string
      SCORE_DATE: Date
      LAST_FM_DATE: Date
    }
    PERSON_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    POSTING_ITEM: {
      SERIAL: Serial
      ACCESS_KEY: string
      ITEM_ROUTING_NUMBER: string
      ITEM_ACCOUNT_NUMBER: string
      TARGET_SHARE_SERIAL: Serial
      TARGET_LOAN_SERIAL: Serial
      DISTRIBUTION_SERIAL: Serial
      POSTING_POLICY_SERIAL: Serial
      EFFECTIVE_DATE: Date
      CATEGORY: { '-': "None" } | { D: "Deposit" } | { W: "Withdrawal" } | { R: "Refinance" } | { N: "New loan" } | { F: "Fee" } | { H: "Hold placement" } | { h: "Hold release" } | { C: "Comment" } | { O: "Prenotification" } | { G: "General ledger" } | { K: "Check reconciliation" } | { d: "Returned debit" } | { c: "Returned credit" }
      SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      TRANSFER_OPTION: { '-': "No" } | { T: "Transfer" }
      ADJUSTMENT_OPTION: { '-': "No" } | { A: "Adjustment" }
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      SUB_CATEGORY: { '-': "None" } | { P: "Card purchase" } | { R: "Card purchase return" } | { B: "Card balance transfer" } | { S: "Single payment" } | { s: "Single payment - waive late fee" } | { A: "Additional payment" } | { O: "Principal only payment" } | { W: "Waive late fee" } | { L: "Close loan" } | { b: "Bankruptcy pre-petition payment" } | { I: "Interest prepayment" }
      TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      FEE_CLASSIFICATION: { '-': "None" } | { OVD: "Overdraft" } | { RTN: "Returned item" } | { ODT: "Overdraft transfer" } | { RDD: "Reg D direct" } | { RDO: "Reg D overdraft transfer" } | { MAP: "MAPR charge" } | { FYL: "Credit card first year limitation" } | { MAC: "MAPR charge and credit card first year limitation" }
      DESCRIPTION: string
      AMOUNT: Money
      SPECIFIED_INTEREST_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_INTEREST_AMOUNT: Money
      SPECIFIED_IMPOUND_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_IMPOUND_AMOUNT: Money
      SPECIFIED_LATE_FEE_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_LATE_FEE_AMOUNT: Money
      SPECIFIED_UNAPP_FUNDS_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_UNAPP_FUNDS_AMOUNT: Money
      CASH_AMOUNT: Money
      CHECK_NEXT_DAY_AMOUNT: Money
      CHECK_LOCAL_AMOUNT: Money
      CHECK_CATEGORY: { '-': "None" } | { P: "Proprietary ATM" } | { A: "Nonproprietary ATM" }
      HOLD_CATEGORY: { FH: "Funds hold" } | { CK: "Check deposit" } | { OD: "ACH origination deposit" } | { BK: "Bulk check deposit" } | { BC: "Bulk cash deposit" } | { CD: "Certified check" } | { BD: "Bill payment check" } | { PA: "Preauthorization" } | { MV: "Merchant verification" } | { RI: "Large dollar return item" } | { IL: "IRS tax levy" } | { CL: "Child support levy" } | { LV: "Levy" } | { GA: "Garnishment" } | { UF: "Uncollected fee" } | { CA: "Close fee" } | { CF: "Close fee GL only" } | { PR: "Pending return" } | { DP: "Check positive pay" } | { AP: "ACH positive pay" } | { DS: "Check stop" } | { AS: "ACH stop" } | { AE: "ACH stop all except" } | { AR: "ACH revocation" } | { AN: "ACH not authorized" } | { AD: "ACH death notification" }
      HOLD_TRACER: string
      PROMOTION_HANDLING: { '-': "Standard" } | { I: "Ignore check production settings" }
      IMPORT_SET_SERIAL: Serial
      IMPORT_COMMENTS: string
      EXPORT_SET_SERIAL: Serial
      ORDERING_SEQUENCE: Count
      SETTLEMENT_DATE: Date
      INCOMING_ACH_ENTRY_SERIAL: Serial
      OUTGOING_ACH_ENTRY_SERIAL: Serial
      STATUS: { U: "Unposted" } | { H: "Held" } | { P: "Posted" } | { R: "Returned" } | { V: "Voided" }
      REASON: { '-': "None" } | { SNF: "Session not found" } | { ANF: "Account not found" } | { LAD: "Login access denied" } | { CLS: "Closed" } | { NAU: "Not authorized" } | { DNE: "Deceased" } | { RVK: "Revoked" } | { STP: "Stopped" } | { NSU: "NSF due to uncollected funds" } | { NSD: "NSF due to Reg D transfer limit" } | { NSF: "NSF" } | { OVL: "Loan over limit" } | { RDL: "Reg D limit" } | { DQL: "Delinquent loan" } | { GOB: "GL entries do not balance" } | { CHT: "Check hold requires a Savings or Loan to be specified" } | { OTH: "Other" }
      LAST_BATCH_SERIAL: Serial
      DRAFT_RETURN_REASON_SERIAL: Serial
      ACH_RTN_REASON_CODE: { '-': "None" } | { R01: "'R01' Insufficient funds" } | { R02: "'R02' Account closed" } | { R03: "'R03' No account found" } | { R04: "'R04' Invalid account number structure" } | { R05: "'R05' Unauthorized debit to consumer account" } | { R06: "'R06' Returned per ODFI request" } | { R07: "'R07' Authorization revoked" } | { R08: "'R08' Payment stopped" } | { R09: "'R09' Uncollected funds" } | { R10: "'R10' Customer advises not known or not authorized" } | { R11: "'R11' Customer advises not in accordance with terms" } | { R12: "'R12' Account sold to another DFI" } | { R14: "'R14' Representative payee deceased" } | { R15: "'R15' Beneficiary or account holder deceased" } | { R16: "'R16' Account frozen" } | { R17: "'R17' File record edit criteria" } | { R20: "'R20' Non-transaction account" } | { R21: "'R21' Invalid company ID" } | { R22: "'R22' Invalid identification number" } | { R23: "'R23' Credit entry refused by receiver" } | { R24: "'R24' Duplicate entry" } | { R29: "'R29' Corporate customer advises not authorized" } | { R31: "'R31' Permissible return entry" } | { R33: "'R33' XCK Return entry" } | { R37: "'R37' Source document presented for payment" } | { R38: "'R38' Stop payment on source document" } | { R39: "'R39' Improper source document" } | { R50: "'R50' RCK State law affecting acceptance" } | { R51: "'R51' RCK Item is ineligible" } | { R52: "'R52' RCK Stop payment" } | { R53: "'R53' RCK Item and ACH entry presented for payment" } | { R61: "'R61' Dishonored Return - Misrouted return" } | { R62: "'R62' Dishonored Return - Return of erroneous debit" } | { R67: "'R67' Dishonored Return - Duplicate return" } | { R68: "'R68' Dishonored Return - Untimely return" } | { R69: "'R69' Dishonored Return - Field error in return" } | { R70: "'R70' Dishonored Return - Permissible return not accepted" } | { R71: "'R71' Contested Dishonored Return - Misrouted dishonored return" } | { R72: "'R72' Contested Dishonored Return - Untimely dishonored return" } | { R73: "'R73' Contested Dishonored Return - Timely original return" } | { R74: "'R74' Contested Dishonored Return - Field error in return corrected" } | { R75: "'R75' Contested Dishonored Return - Duplicate return is not a duplicate" } | { R76: "'R76' Contested Dishonored Return - Field error in return is not an error" } | { R77: "'R77' Contested Dishonored Return - Non-acceptance of R62 dishonored return" } | { C01: "'C01' Incorrect account number" } | { C02: "'C02' Incorrect routing number" } | { C03: "'C03' Incorrect routing number and account number" } | { C04: "'C04' Incorrect name" } | { C05: "'C05' Incorrect transaction code" } | { C06: "'C06' Incorrect account number and transaction code" } | { C07: "'C07' Incorrect routing and account number and transaction code" } | { C08: "'C08' Incorrect foreign receiving DFI ID" } | { C09: "'C09' Incorrect identification number" } | { C13: "'C13' Addenda format error" } | { C14: "'C14' IAT Operator - Incorrect SEC code for outbound payment" } | { C61: "'C61' Refused Notification Of Change - Misrouted notification of change" } | { C62: "'C62' Refused Notification Of Change - Incorrect trace number" } | { C63: "'C63' Refused Notification Of Change - Incorrect company ID" } | { C64: "'C64' Refused Notification Of Change - Incorrect identification number" } | { C65: "'C65' Refused Notification Of Change - Incorrectly formatted corrected data" } | { C66: "'C66' Refused Notification Of Change - Incorrect discretionary data" } | { C67: "'C67' Refused Notification Of Change - Routing number not from original entry detail" } | { C68: "'C68' Refused Notification Of Change - Account number not from original entry detail" } | { C69: "'C69' Refused Notification Of Change - Incorrect transaction code" } | { R13: "'R13' ACH Operator - Invalid routing number" } | { R18: "'R18' ACH Operator - Improper effective entry date" } | { R19: "'R19' ACH Operator - Amount field error" } | { R25: "'R25' ACH Operator - Addenda error" } | { R26: "'R26' ACH Operator - Mandatory field error" } | { R27: "'R27' ACH Operator - Trace number error" } | { R28: "'R28' ACH Operator - Routing number check digit error" } | { R30: "'R30' ACH Operator - RDFI not participant in check truncation program" } | { R32: "'R32' ACH Operator - RDFI non-settlement" } | { R34: "'R34' ACH Operator - RDFI limited participation" } | { R35: "'R35' ACH Operator - Return of improper debit entry" } | { R36: "'R36' ACH Operator - Return of improper credit entry" } | { R40: "'R40' ENR Return by federal government agency" } | { R41: "'R41' ENR Invalid transaction code" } | { R42: "'R42' ENR Invalid routing number" } | { R43: "'R43' ENR Invalid DFI account number" } | { R44: "'R44' ENR Invalid identification number" } | { R45: "'R45' ENR Invalid name" } | { R46: "'R46' ENR Invalid representative payee indicator" } | { R47: "'R47' ENR Duplicate enrollment" } | { R80: "'R80' IAT Operator - Entry coding error" } | { R81: "'R81' IAT Operator - Non-participant" } | { R82: "'R82' IAT Operator - Invalid foreign receiving DFI ID" } | { R83: "'R83' IAT Operator - Foreign receiving DFI cannot settle" } | { R84: "'R84' IAT Operator - Entry not processed" } | { R85: "'R85' IAT Operator - Incorrectly coded outbound payment" }
      ACH_RTN_DEATH_DATE: Date
      ACH_RTN_ADDENDA_INFORMATION: string
      ACH_CDR_ORIG_RETURN_DATE: Date
      ACH_CDR_ORIG_SETTLEMENT_DATE: Date
      ACH_NOC_REASON_CODE: { '-': "None" } | { C: "Correction" } | { A: "Addenda format error" }
      ACH_NOC_ROUTING_NUMBER: string
      ACH_NOC_ACCOUNT_NUMBER: string
      ACH_NOC_NAME: string
      ACH_NOC_IDENTIFICATION_NUMBER: string
      ACH_NOC_TRANSACTION_CODE: { '-': "None" } | { '21': "'21' Checking credit return" } | { '22': "'22' Checking credit" } | { '23': "'23' Checking credit prenotification" } | { '24': "'24' Checking credit remittance data" } | { '26': "'26' Checking debit return" } | { '27': "'27' Checking debit" } | { '28': "'28' Checking debit prenotification" } | { '29': "'29' Checking debit remittance data" } | { '31': "'31' Savings credit return" } | { '32': "'32' Savings credit" } | { '33': "'33' Savings credit prenotification" } | { '34': "'34' Savings credit remittance data" } | { '36': "'36' Savings debit return" } | { '37': "'37' Savings debit" } | { '38': "'38' Savings debit prenotification" } | { '39': "'39' Savings debit remittance data" } | { '41': "'41' GL credit return" } | { '42': "'42' GL credit" } | { '43': "'43' GL credit prenotification" } | { '44': "'44' GL credit remittance data" } | { '46': "'46' GL debit return" } | { '47': "'47' GL debit" } | { '48': "'48' GL debit prenotification" } | { '49': "'49' GL debit remittance data" } | { '51': "'51' Loan credit return" } | { '52': "'52' Loan credit" } | { '53': "'53' Loan credit prenotification" } | { '54': "'54' Loan credit remittance data" } | { '55': "'55' Loan reversal" } | { '56': "'56' Loan reversal return" } | { '81': "'81' ADV Credit for ACH debits originated" } | { '82': "'82' ADV Debit for ACH credits originated" } | { '83': "'83' ADV Credit for ACH credits received" } | { '84': "'84' ADV Debit for ACH debits received" } | { '85': "'85' ADV Credit for ACH credits in rejected batches" } | { '86': "'86' ADV Debit for ACH debits in rejected batches" } | { '87': "'87' ADV Summary credit for ACH activity" } | { '88': "'88' ADV Summary debit for ACH activity" }
      ACH_NOC_RECEIVING_DFI_ID: string
      OFAC_CHECK_STATUS: { '-': "None" } | { N: "No match" } | { P: "Potential match" } | { C: "Match confirmed" } | { R: "Match rejected" }
      OFAC_CHECK_STATUS_EXPLANATION: string
      RECIPIENT_SHARE_SERIAL: Serial
      RECIPIENT_LOAN_SERIAL: Serial
      RECIPIENT_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      TARGET_CHECKING_ACCOUNT_SERIAL: Serial
      TARGET_GL_SERIAL: Serial
      TARGET_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      TARGET_GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      TARGET_GL_COMMENT: string
      TARGET_GL_REFERENCE: string
      GL_POSTING_GROUP_SERIAL: Serial
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      GL_COMMENT: string
      GL_REFERENCE: string
      DRAFT_CATEGORY: { '-': "None" } | { S: "Stop" } | { U: "Stop suspect" } | { C: "Certified" } | { P: "Preauthorized" }
      DRAFT_NUMBER: string
      DRAFT_TRACER: string
      PROCESSOR_DATE: Date
      ACH_EFFECTIVE_ENTRY_DATE: Date
      ACH_COMPANY_NAME: string
      ACH_COMPANY_ID: string
      ACH_COMPANY_ENTRY_DESCRIPTION: string
      ACH_COMPANY_DESCRIPT_DATE_TEXT: string
      ACH_COMPANY_DISCRETIONARY_DATA: string
      ACH_ORIGINATING_DFI_ID: string
      ACH_STANDARD_ENTRY_CLASS_CODE: { '-': "None" } | { ACK: "'ACK' Acknowledgement of CCD" } | { ADV: "'ADV' Automated accounting advice" } | { ARC: "'ARC' Accounts receivable" } | { ATX: "'ATX' Acknowledgement of CTX" } | { BOC: "'BOC' Back office conversion" } | { CCD: "'CCD' Corporate credit or debit" } | { CIE: "'CIE' Customer initiated" } | { COR: "'COR' Notification of change" } | { CTX: "'CTX' Corporate trade exchange" } | { DNE: "'DNE' Death notification" } | { ENR: "'ENR' Automated enrollment" } | { IAT: "'IAT' International ACH transaction" } | { MTE: "'MTE' Machine transfer" } | { POP: "'POP' Point of purchase" } | { POS: "'POS' Point of sale" } | { PPD: "'PPD' Prearranged payment and deposit" } | { RCK: "'RCK' Re-presented check" } | { SHR: "'SHR' Shared network transaction" } | { TEL: "'TEL' Telephone initiated" } | { TRC: "'TRC' Truncated check" } | { TRX: "'TRX' Truncated checks exchange" } | { WEB: "'WEB' Web initiated" } | { XCK: "'XCK' Destroyed check" }
      ACH_IAT_TRANSACTION_TYPE_CODE: { '-': "None" } | { ANN: "'ANN' Annuity" } | { BUS: "'BUS' Business or commercial" } | { DEP: "'DEP' Deposit" } | { LOA: "'LOA' Loan" } | { MIS: "'MIS' Miscellaneous" } | { MOR: "'MOR' Mortgage" } | { PEN: "'PEN' Pension" } | { RLS: "'RLS' Rent or lease" } | { SAL: "'SAL' Salary or payroll" } | { TAX: "'TAX' Tax" } | { ARC: "'ARC' Accounts receivable" } | { BOC: "'BOC' Back office conversion" } | { MTE: "'MTE' Machine transfer" } | { POP: "'POP' Point of purchase" } | { POS: "'POS' Point of sale" } | { RCK: "'RCK' Re-presented check" } | { SHR: "'SHR' Shared network transaction" } | { TEL: "'TEL' Telephone initiated" } | { WEB: "'WEB' Internet initiated" }
      ACH_TRANSACTION_CODE: { '-': "None" } | { '21': "'21' Checking credit return" } | { '22': "'22' Checking credit" } | { '23': "'23' Checking credit prenotification" } | { '24': "'24' Checking credit remittance data" } | { '26': "'26' Checking debit return" } | { '27': "'27' Checking debit" } | { '28': "'28' Checking debit prenotification" } | { '29': "'29' Checking debit remittance data" } | { '31': "'31' Savings credit return" } | { '32': "'32' Savings credit" } | { '33': "'33' Savings credit prenotification" } | { '34': "'34' Savings credit remittance data" } | { '36': "'36' Savings debit return" } | { '37': "'37' Savings debit" } | { '38': "'38' Savings debit prenotification" } | { '39': "'39' Savings debit remittance data" } | { '41': "'41' GL credit return" } | { '42': "'42' GL credit" } | { '43': "'43' GL credit prenotification" } | { '44': "'44' GL credit remittance data" } | { '46': "'46' GL debit return" } | { '47': "'47' GL debit" } | { '48': "'48' GL debit prenotification" } | { '49': "'49' GL debit remittance data" } | { '51': "'51' Loan credit return" } | { '52': "'52' Loan credit" } | { '53': "'53' Loan credit prenotification" } | { '54': "'54' Loan credit remittance data" } | { '55': "'55' Loan reversal" } | { '56': "'56' Loan reversal return" } | { '81': "'81' ADV Credit for ACH debits originated" } | { '82': "'82' ADV Debit for ACH credits originated" } | { '83': "'83' ADV Credit for ACH credits received" } | { '84': "'84' ADV Debit for ACH debits received" } | { '85': "'85' ADV Credit for ACH credits in rejected batches" } | { '86': "'86' ADV Debit for ACH debits in rejected batches" } | { '87': "'87' ADV Summary credit for ACH activity" } | { '88': "'88' ADV Summary debit for ACH activity" }
      ACH_REASON_CODE: { '-': "None" } | { R01: "'R01' Insufficient funds" } | { R02: "'R02' Account closed" } | { R03: "'R03' No account found" } | { R04: "'R04' Invalid account number structure" } | { R05: "'R05' Unauthorized debit to consumer account" } | { R06: "'R06' Returned per ODFI request" } | { R07: "'R07' Authorization revoked" } | { R08: "'R08' Payment stopped" } | { R09: "'R09' Uncollected funds" } | { R10: "'R10' Customer advises not known or not authorized" } | { R11: "'R11' Customer advises not in accordance with terms" } | { R12: "'R12' Account sold to another DFI" } | { R14: "'R14' Representative payee deceased" } | { R15: "'R15' Beneficiary or account holder deceased" } | { R16: "'R16' Account frozen" } | { R17: "'R17' File record edit criteria" } | { R20: "'R20' Non-transaction account" } | { R21: "'R21' Invalid company ID" } | { R22: "'R22' Invalid identification number" } | { R23: "'R23' Credit entry refused by receiver" } | { R24: "'R24' Duplicate entry" } | { R29: "'R29' Corporate customer advises not authorized" } | { R31: "'R31' Permissible return entry" } | { R33: "'R33' XCK Return entry" } | { R37: "'R37' Source document presented for payment" } | { R38: "'R38' Stop payment on source document" } | { R39: "'R39' Improper source document" } | { R50: "'R50' RCK State law affecting acceptance" } | { R51: "'R51' RCK Item is ineligible" } | { R52: "'R52' RCK Stop payment" } | { R53: "'R53' RCK Item and ACH entry presented for payment" } | { R61: "'R61' Dishonored Return - Misrouted return" } | { R62: "'R62' Dishonored Return - Return of erroneous debit" } | { R67: "'R67' Dishonored Return - Duplicate return" } | { R68: "'R68' Dishonored Return - Untimely return" } | { R69: "'R69' Dishonored Return - Field error in return" } | { R70: "'R70' Dishonored Return - Permissible return not accepted" } | { R71: "'R71' Contested Dishonored Return - Misrouted dishonored return" } | { R72: "'R72' Contested Dishonored Return - Untimely dishonored return" } | { R73: "'R73' Contested Dishonored Return - Timely original return" } | { R74: "'R74' Contested Dishonored Return - Field error in return corrected" } | { R75: "'R75' Contested Dishonored Return - Duplicate return is not a duplicate" } | { R76: "'R76' Contested Dishonored Return - Field error in return is not an error" } | { R77: "'R77' Contested Dishonored Return - Non-acceptance of R62 dishonored return" } | { C01: "'C01' Incorrect account number" } | { C02: "'C02' Incorrect routing number" } | { C03: "'C03' Incorrect routing number and account number" } | { C04: "'C04' Incorrect name" } | { C05: "'C05' Incorrect transaction code" } | { C06: "'C06' Incorrect account number and transaction code" } | { C07: "'C07' Incorrect routing and account number and transaction code" } | { C08: "'C08' Incorrect foreign receiving DFI ID" } | { C09: "'C09' Incorrect identification number" } | { C13: "'C13' Addenda format error" } | { C14: "'C14' IAT Operator - Incorrect SEC code for outbound payment" } | { C61: "'C61' Refused Notification Of Change - Misrouted notification of change" } | { C62: "'C62' Refused Notification Of Change - Incorrect trace number" } | { C63: "'C63' Refused Notification Of Change - Incorrect company ID" } | { C64: "'C64' Refused Notification Of Change - Incorrect identification number" } | { C65: "'C65' Refused Notification Of Change - Incorrectly formatted corrected data" } | { C66: "'C66' Refused Notification Of Change - Incorrect discretionary data" } | { C67: "'C67' Refused Notification Of Change - Routing number not from original entry detail" } | { C68: "'C68' Refused Notification Of Change - Account number not from original entry detail" } | { C69: "'C69' Refused Notification Of Change - Incorrect transaction code" } | { R13: "'R13' ACH Operator - Invalid routing number" } | { R18: "'R18' ACH Operator - Improper effective entry date" } | { R19: "'R19' ACH Operator - Amount field error" } | { R25: "'R25' ACH Operator - Addenda error" } | { R26: "'R26' ACH Operator - Mandatory field error" } | { R27: "'R27' ACH Operator - Trace number error" } | { R28: "'R28' ACH Operator - Routing number check digit error" } | { R30: "'R30' ACH Operator - RDFI not participant in check truncation program" } | { R32: "'R32' ACH Operator - RDFI non-settlement" } | { R34: "'R34' ACH Operator - RDFI limited participation" } | { R35: "'R35' ACH Operator - Return of improper debit entry" } | { R36: "'R36' ACH Operator - Return of improper credit entry" } | { R40: "'R40' ENR Return by federal government agency" } | { R41: "'R41' ENR Invalid transaction code" } | { R42: "'R42' ENR Invalid routing number" } | { R43: "'R43' ENR Invalid DFI account number" } | { R44: "'R44' ENR Invalid identification number" } | { R45: "'R45' ENR Invalid name" } | { R46: "'R46' ENR Invalid representative payee indicator" } | { R47: "'R47' ENR Duplicate enrollment" } | { R80: "'R80' IAT Operator - Entry coding error" } | { R81: "'R81' IAT Operator - Non-participant" } | { R82: "'R82' IAT Operator - Invalid foreign receiving DFI ID" } | { R83: "'R83' IAT Operator - Foreign receiving DFI cannot settle" } | { R84: "'R84' IAT Operator - Entry not processed" } | { R85: "'R85' IAT Operator - Incorrectly coded outbound payment" }
      ACH_NAME: string
      ACH_IDENTIFICATION_NUMBER: string
      ACH_TRACE_NUMBER: string
      ACH_ORIGINAL_TRACE_NUMBER: string
      WIRE_TYPE_CODE: { '-': "None" } | { '10': "'10' Funds transfer" } | { '15': "'15' Foreign transfer" } | { '16': "'16' Settlement transfer" }
      WIRE_SUB_TYPE_CODE: { '-': "None" } | { '00': "'00' Basic funds transfer" } | { '01': "'01' Request for reversal" } | { '02': "'02' Reversal of a transfer" } | { '07': "'07' Request for reversal" } | { '08': "'08' Reversal of a prior day transfer" } | { '31': "'31' Request for credit (drawdown)" } | { '32': "'32' Funds transfer honoring a request for credit (drawdown)" } | { '33': "'33' refusal to honor a request for credit (drawdown)" } | { '90': "'90' service message" }
      WIRE_ORIGINATOR_NAME: string
      WIRE_ORIGINATOR_IDENTIFIER: string
      WIRE_ORIGINATOR_LOCATION: string
      WIRE_BENEFICIARY_NAME: string
      WIRE_BENEFICIARY_IDENTIFIER: string
      WIRE_BENEFICIARY_LOCATION: string
      TERMINAL_LOCATION: string
      TERMINAL_CITY: string
      TERMINAL_STATE: string
      TERMINAL_COUNTRY_CODE: string
      TERMINAL_ID: string
      MERCHANT_NAME: string
      MERCHANT_TYPE: string
      SENDER_NAME: string
      RECEIVER_NAME: string
      TICKET_NUMBER: string
      MASKED_CARD_NUMBER: string
      TRAN_REFERENCE: string
      TRAN_DATE: Date
      CPI_COLL_INS_TYPE_SERIAL: Serial
      CPI_VEHICLE_ID_NUMBER: string
      CPI_POLICY_NUMBER: string
      CPI_POLICY_EFFECTIVE_DATE: Date
      CPI_POLICY_EXPIRATION_DATE: Date
      CPI_SGL_MTHLY_PREM_AMOUNT: Money
      CPI_SGL_MTHLY_PREM_TOTAL: Money
      CPI_SGL_MTHLY_PREM_FROM_DATE: Date
      CPI_SGL_MTHLY_PREM_TO_DATE: Date
      SOURCE_DATA_RECORD: string
      LAST_FM_DATE: Date
    }
    POSTING_ITEM_DETAIL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { COM: "Comment" } | { DSS: "Description with text value" } | { DSM: "Description with money value" } | { DSR: "Description with rate value" } | { DSD: "Description with date value" } | { DST: "Description with time value" } | { DSC: "Description with count value" } | { DNT: "Check number and tracer" } | { RAN: "Routing number and account number" } | { ACH: "ACH company name and ID" } | { ACD: "ACH company entry description and descriptive date" } | { ACO: "ACH company discretionary data and originating DFI ID" } | { ACC: "ACH standard entry class code and transaction code" } | { ACN: "ACH name and identification number" } | { ACT: "ACH trace number and IAT transaction type code" } | { ACP: "ACH payment related information" } | { WTC: "Wire type code and description" } | { WSC: "Wire subtype code and description" } | { WOI: "Wire originator name and identifier" } | { WOL: "Wire originator location" } | { WBI: "Wire beneficiary name and identifier" } | { WBL: "Wire beneficiary location" } | { TLI: "Terminal location and ID" } | { TCS: "Terminal city and state" } | { TCC: "Terminal country code" } | { MER: "Merchant name and type" } | { SRN: "Sender and receiver name" } | { TKT: "Ticket number" } | { TSF: "Transportation service fee" } | { MCR: "Masked card number and reference" } | { TSD: "Transaction date and settlement date" } | { TAV: "Transaction amount and available amount" } | { OCP: "Overdraft transfer and courtesy pay" } | { RUT: "Round up transfer" } | { HCO: "Hold category and stop option" } | { HDE: "Hold check number and ending number" } | { HAC: "Hold ACH company name and ID" } | { HAR: "Hold amount and reason" } | { HPT: "Hold payee and tracer" } | { HED: "Hold expiration date and time" } | { RMC: "Returned item maker and check number" } | { RCR: "Returned item channel and reason" } | { BCA: "Bulk cash receive amount" } | { BKA: "Bulk check receive amount and count" } | { KHA: "Check hold amount and date" } | { SIP: "Loan split interest serial and principal amount" } | { SII: "Loan split interest serial and interest amount" } | { PSP: "Credit card purchase split interest serial and principal amount" } | { PSI: "Credit card purchase split interest serial and interest amount" } | { CSP: "Credit card cash advance split interest serial and principal amount" } | { CSI: "Credit card cash advance split interest serial and interest amount" } | { BSP: "Credit card balance transfer split interest serial and principal amount" } | { BSI: "Credit card balance transfer split interest serial and interest amount" } | { CCF: "Credit card aggregated from transaction and monetary serials" } | { DRI: "Draw request item description and amount" } | { PDP: "Payment due date and paid date" } | { CCA: "Curtailment correction amount and date" } | { LOF: "Loan fee description and amount" } | { LMF: "Loan maintenance fee description and amount" } | { LFA: "Loan fee assess description and amount" } | { SIA: "Advance loan split interest serial and amount" } | { SIE: "Payment excess loan split interest serial" } | { PPI: "Credit card purchase principal amount and interest amount" } | { CPI: "Credit card cash advance principal amount and interest amount" } | { BPI: "Credit card balance transfer principal amount and interest amount" } | { FPI: "Credit card fee principal amount" } | { CCT: "Credit card aggregated into transaction and monetary serials" } | { FEC: "Fee classification and fee serial" } | { FCT: "Fee charge count" } | { LLI: "Loan life insurance serial" } | { LDI: "Loan disability insurance serial" } | { ULF: "Uncollected late fee" } | { UAF: "Unapplied funds amount and balance" } | { CAD: "Curtailment amount and date" } | { CDP: "Certificate penalty" } | { SRY: "Special reporting year" } | { TXA: "Taxable amount" } | { FTW: "Federal income tax withheld" } | { STW: "State income tax withheld" } | { AYR: "APYE rate" } | { ABO: "APYE average balance and collected balance option" } | { ADR: "APYE date range" } | { TAN: "Transfer account and name" } | { TID: "Transfer ID category and ID" } | { TDE: "Transfer ID description" } | { OTM: "Original transaction and monetary serials" } | { CTM: "Correction transaction and monetary serials" } | { DIS: "Dispute and dispute item serials" } | { RVR: "Reversal reason description and classification" } | { SPR: "Shadow principal and recovery" } | { SIL: "Shadow interest and late fee" } | { COA: "Shadow charge off adjustment" }
      DATA_TYPE_1: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      DESCRIPTION_1: string
      CONTENTS_1: string
      DATA_TYPE_2: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      DESCRIPTION_2: string
      CONTENTS_2: string
      LAST_FM_DATE: Date
    }
    POSTING_POLICY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      DEP_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      DEP_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_NEG_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_ACCT_DQ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_DORMANT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_RESTRICT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_LESS_THAN_MINIMUM: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_ADJ_BAL_NEG: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_BELOW_MIN_BAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_TAX_PLAN_EXCESSIVE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_IRA_AGE_LIMIT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_OV_ESA_AGE_LIMIT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      DEP_REOPEN_CLOSED_DAYS: Count
      PMT_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      PMT_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_NEG_ADJ_SPEC: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_NEG_ADJ_UNSPEC: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_ACCT_DQ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_DORMANT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_BAL_BELOW_MIN: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_BAL_NEG_CLSD: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_BAL_NEG_OPEN: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_BAL_NEG_LOC: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_BAL_NEG_CC: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_LESS_THAN_LATE_FEE_DUE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_PAYOFF_PRINC_NOT_INT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_INT_PREPAYMENT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_MONTHLY_PARTIAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_NON_MONTHLY_PARTIAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_WAIVE_LATE_FEE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_ADDITIONAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_PRINCIPAL_ONLY: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_PRINCIPAL_ONLY_WHEN_DQ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_IMPOUND_NOT_DEFAULT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_LATE_FEE_NOT_DEFAULT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      PMT_OV_INTEREST_NOT_DEFAULT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      ADV_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_NEG_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_HOLD_PLACEMENT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_HOLD_RELEASE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_ACCT_DQ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_DORMANT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_LESS_THAN_MINIMUM: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_ADJ_BAL_NEG: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_BELOW_MIN_BAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_MONTHLY_INT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_CLSD_END: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_OPEN_END: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_DQ_LOAN: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_OV_OVL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      ADV_AVAILABLE_FORMULA: { S: "Standard" } | { H: "Ignore holds" } | { U: "Unlimited" }
      ADV_BEYOND_AVAILABLE_AMOUNT: Money
      ADV_BEYOND_CRED_LIM_PERCENT: Rate
      ADV_DQ_GRACE_DAYS: Count
      ADV_OVL_FEE_SERIAL: Serial
      ADV_OVL_TRACKING: { N: "No" } | { Y: "Yes" }
      ADV_RET_FEE_SERIAL: Serial
      WDL_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      WDL_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_NEG_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_HOLD_PLACEMENT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_HOLD_RELEASE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_ACCT_DQ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_DORMANT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_RESTRICT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_LESS_THAN_MINIMUM: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_BAL_NEG: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_BELOW_MIN_BAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_REGD_LIMIT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_OV_BELOW_AVAILABLE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      WDL_AVAILABLE_FORMULA: { S: "Standard" } | { H: "Ignore holds" } | { P: "Ignore pending item holds" } | { M: "Ignore minimum balance" } | { B: "Balance" }
      WDL_BEYOND_AVAILABLE_AMOUNT: Money
      WDL_CRTSY_OPTION: { N: "No" } | { Y: "Static" } | { D: "Dynamic" }
      WDL_CRTSY_ON_XFR_OPTION: { N: "No" } | { Y: "Yes" }
      WDL_CRTSY_ON_ADJ_OPTION: { N: "No" } | { Y: "Yes" }
      WDL_CRTSY_CALC_SERIAL: Serial
      WDL_CRTSY_FEE_ASSESSMENT: { A: "Available balance" } | { P: "Ignore pending item holds" } | { K: "Ignore pending item and check holds" } | { B: "Balance" }
      WDL_CRTSY_FEE_SERIAL: Serial
      WDL_FORCE_PAY_FEE_SERIAL: Serial
      WDL_REG_D_OPTION: { N: "No" } | { Y: "Yes" }
      WDL_REG_D_FEE_SERIAL: Serial
      WDL_NSF_FEE_SERIAL: Serial
      WDL_NSF_TRACKING: { N: "No" } | { Y: "Yes" }
      WDL_RET_FEE_SERIAL: Serial
      WDL_REOPEN_CLOSED_DAYS: Count
      WDL_RND_UP_OPTION: { '-': "None" } | { B: "Batch" } | { I: "Immediate" }
      WDL_RND_UP_TRN_TYPE_LIST: string
      WDL_RND_UP_STMT_DESCRIPTION: string
      OD_XFR_METHOD: { '-': "None" } | { S: "Savings only" } | { L: "Loan only" } | { B: "Savings and loan" }
      OD_XFR_PREAUTH_OPTION: { I: "Include in available amount" } | { E: "Exclude from available amount" } | { P: "Post on hold placement" }
      OD_XFR_ON_XFR_OPTION: { N: "No" } | { Y: "Yes" }
      OD_XFR_ON_ADJ_OPTION: { N: "No" } | { Y: "Yes" }
      OD_XFR_WDL_INCREMENT: Money
      OD_XFR_ADV_INCREMENT: Money
      OD_XFR_INCREMENT_OPTION: { R: "Required amount" } | { A: "Available amount" } | { I: "Increments only" }
      OD_XFR_ADV_BEYOND_AVAIL_AMT: Money
      OD_XFR_ADV_BEYOND_CRED_LIM_PCT: Rate
      OD_XFR_ADV_DQ_GRACE_DAYS: Count
      OD_XFR_STMT_DESCRIPTION: string
      OD_XFR_FROM_SH_FEE_SERIAL: Serial
      OD_XFR_FROM_LN_FEE_SERIAL: Serial
      OD_XFR_FROM_SH_LN_FEE_SERIAL: Serial
      OD_XFR_REG_D_OPTION: { N: "No" } | { Y: "Yes" }
      OD_XFR_REG_D_FEE_SERIAL: Serial
      XFR_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      XFR_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      XFR_ADV_AVAILABLE_FORMULA: { S: "Standard" } | { H: "Ignore holds" } | { U: "Unlimited" }
      XFR_ADV_BEYOND_AVAIL_AMT: Money
      XFR_ADV_BEYOND_CRED_LIM_PCT: Rate
      XFR_ADV_DQ_GRACE_DAYS: Count
      XFR_WDL_AVAILABLE_FORMULA: { S: "Standard" } | { H: "Ignore holds" } | { P: "Ignore pending item holds" } | { M: "Ignore minimum balance" } | { B: "Balance" }
      XFR_WDL_BEYOND_AVAIL_AMT: Money
      XFR_REG_D_OPTION: { N: "No" } | { Y: "Yes" }
      XFR_REG_D_FEE_SERIAL: Serial
      REF_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      REF_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_NEG_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_BAL_NEG: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_BELOW_MIN_BAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_IMPOUND_NOT_DEFAULT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_LATE_FEE_NOT_DEFAULT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_INTEREST_NOT_DEFAULT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_WITHOUT_BALANCE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      REF_OV_EXCEEDS_LIMIT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      NEW_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_NEG_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_LESS_THAN_MIN_ADV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_BAL_NEG: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_BELOW_MIN_BAL: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_WITH_BALANCE: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      NEW_OV_EXCEEDS_LIMIT: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      FEE_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      FEE_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      FEE_OV_POS_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      FEE_OV_NEG_ADJ: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      FEE_COLLECTION: { AF: "Post entire fee regardless of balance" } | { PD: "Post partial up to balance}|{ discard any remainder" } | { FE: "Post if balance covers fee}|{ else exception" } | { BF: "Post if balance covers fee}|{ else uncollected hold" } | { BP: "Post partial up to balance}|{ remainder uncollected hold" } | { MB: "Post partial to minimum balance}|{ remainder uncollected hold" }
      CMT_FORCE_POST_OPTION: { '-': "None" } | { F: "Force post" }
      CMT_OV: { '-': "None" } | { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      CMT_DEATH_NOTE_STMT_DESC: string
      CMT_DEP_PRENOTE_STMT_DESC: string
      CMT_PMT_PRENOTE_STMT_DESC: string
      CMT_ADV_PRENOTE_STMT_DESC: string
      CMT_WDL_PRENOTE_STMT_DESC: string
      STP_FEE_SERIAL: Serial
      STP_COMMENT: string
      NTC_PRODUCTION_OPTION: { N: "No" } | { Y: "Yes" }
      GL_POSTING_GROUP_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    POSTING_POLICY_FEE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      DEPOSIT_OPTION: { N: "No" } | { Y: "Yes" }
      WITHDRAWAL_OPTION: { N: "No" } | { Y: "Yes" }
      PAYMENT_OPTION: { N: "No" } | { Y: "Yes" }
      ADVANCE_OPTION: { N: "No" } | { Y: "Yes" }
      SH_TO_SH_TRANSFER_OPTION: { N: "No" } | { Y: "Yes" }
      SH_TO_LN_TRANSFER_OPTION: { N: "No" } | { Y: "Yes" }
      LN_TO_SH_TRANSFER_OPTION: { N: "No" } | { Y: "Yes" }
      JV_CASH_CHECK_OPTION: { N: "No" } | { Y: "Yes" }
      AUDIO_OPTION: { N: "No" } | { Y: "Yes" }
      HOME_BANKING_OPTION: { N: "No" } | { Y: "Yes" }
      PERIOD_START_MONTH: Count
      PERIOD_START_DAY: Count
      PERIOD_END_MONTH: Count
      PERIOD_END_DAY: Count
      FEE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    POSTING_REQUEST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      STATUS: { U: "Unposted" } | { H: "Held" } | { P: "Posted" } | { R: "Returned" } | { V: "Voided" }
      REASON: { '-': "None" } | { SNF: "Session not found" } | { ANF: "Account not found" } | { LAD: "Login access denied" } | { CLS: "Closed" } | { NAU: "Not authorized" } | { DNE: "Deceased" } | { RVK: "Revoked" } | { STP: "Stopped" } | { NSU: "NSF due to uncollected funds" } | { NSD: "NSF due to Reg D transfer limit" } | { NSF: "NSF" } | { OVL: "Loan over limit" } | { RDL: "Reg D limit" } | { DQL: "Delinquent loan" } | { GOB: "GL entries do not balance" } | { CHT: "Check hold requires a Savings or Loan to be specified" } | { OTH: "Other" }
      POSTING_ITEM_SERIAL: Serial
      NETWORK_LOG_SERIAL: Serial
    }
    PRINTER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CATEGORY: { WRP: "Windows receipt printer" } | { CPS: "Check printer server" } | { RPS: "Receipt printer server" } | { CEP: "Check endorsement printer" } | { CPP: "Card plastic printer" } | { CSC: "Check scanner" } | { CAM: "Camera" } | { DCM: "Document manager" }
      BRANCH_SERIAL: Serial
      IDENTIFIER: string
      INTERFACE_SERIAL: Serial
      RECEIPT_PRINTER_SERVER_FORMAT: { '--------------------': "Standard" } | { Bluepoint: "Bluepoint" }
      CHECK_ENDORSE_PRODUCT: { '--------------------': "None" } | { EpsonTMH6000IV: "Epson TM-H6000IV" }
      CHECK_ENDORSE_TEMPLATE: Document
      CHECK_ENDORSE_CUSC_SB_TEMPLATE: Document
      ORIENTATION: { '-': "None" } | { P: "Portrait" } | { L: "Landscape" }
      CHECK_SCANNER_PRODUCT: { '--------------------': "None" }
      CAMERA_PRODUCT: { '--------------------': "None" } | { '3xLogic': "3xLogic" }
      DOCUMENT_MANAGER_PRODUCT: { '--------------------': "None" } | { Bluepoint: "Bluepoint" }
      SOCKET_NAME: string
      CONNECT_TIMEOUT_SECONDS: Count
      READ_WRITE_TIMEOUT_SECONDS: Count
      STUB_LINE_LENGTH: Count
      STUB_CHARACTER_WIDTH: Count
      MARKETING_MESSAGE: string
      FRONT_IMAGE_PATH_NAME: string
      BACK_IMAGE_PATH_NAME: string
      LAST_FM_DATE: Date
    }
    PRIVILEGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      SECURITY_EVENT_SERIAL: Serial
      LOGGING: { F: "Default" } | { N: "None" } | { A: "All attempts" } | { D: "Denied attempts" } | { G: "Granted attempts" } | { P: "Posted transactions" }
      ACCESS: { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      AMOUNT: Money
      OVERRIDE_ACCESS: { G: "Grant" } | { L: "Grant local override only" } | { D: "Deny" }
      OVERRIDE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    PRODUCT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { '-': "None" } | { ES: "E-Statements" } | { EN: "E-Notices" } | { ST: "Savings Type" } | { LT: "Loan Type" } | { CT: "Card Type" } | { LC: "Login Channel" } | { CP: "Courtesy pay" }
      PRODUCT_LITERATURE: Document
      PRODUCT_LITERATURE_FORMAT: { T: "text" } | { H: "html" }
      PRODUCT_DOC_IMAGE: Binary
      PRODUCT_DOC_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      PRODUCT_DOC_IMAGE_MOD_TIME: Time
      MARKETING_LITERATURE: Document
      MARKETING_LITERATURE_FORMAT: { T: "text" } | { H: "html" }
      MARKETING_DOC_IMAGE: Binary
      MARKETING_DOC_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      MARKETING_DOC_IMAGE_MOD_TIME: Time
      RECEIPT_MESSAGE: string
      OFFER_OPTION: { '-': "None" } | { A: "All" } | { B: "Batch" } | { I: "Interactive" }
      OFFER_DECISION_MODEL_SERIAL: Serial
      OFFER_OPPORTUNITY_DFLT_SERIAL: Serial
      OFFER_PREPARED_INT_TY_SERIAL: Serial
      OFFER_PREPARED_OPP_ST_SERIAL: Serial
      OFFER_PRESENTED_INT_TY_SERIAL: Serial
      OFFER_PRESENTED_OPP_ST_SERIAL: Serial
      OFFER_DECLINED_INT_TY_SERIAL: Serial
      OFFER_DECLINED_OPP_ST_SERIAL: Serial
      OFFER_POSTPONED_INT_TY_SERIAL: Serial
      OFFER_POSTPONED_OPP_ST_SERIAL: Serial
      OFFER_REFERRED_INT_TY_SERIAL: Serial
      OFFER_REFERRED_OPP_ST_SERIAL: Serial
      OFFER_ACCEPTED_INT_TY_SERIAL: Serial
      OFFER_ACCEPTED_OPP_ST_SERIAL: Serial
      OFFER_FULFILLED_INT_TY_SERIAL: Serial
      OFFER_FULFILLED_OPP_ST_SERIAL: Serial
      OFFER_EXPIRATION_DAYS: Count
      SCRIPT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PRODUCT_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    PRODUCT_GROUP_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      LOAN_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PRODUCT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { ST: "Savings Type" } | { LT: "Loan Type" } | { CT: "Card Type" } | { LC: "Login Channel" }
      SHARE_TYPE_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      CARD_TYPE_SERIAL: Serial
      LOGIN_CHANNEL_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PROMO_RATE_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { S: "Specific loans" } | { N: "New loans" } | { A: "All loans" }
      LOAN_CATEGORY: { CE: "Closed end" } | { OE: "Open end" } | { LC: "Line of credit" } | { CC: "Credit card" }
      OFFER_START_DATE: Date
      OFFER_END_DATE: Date
      SPLIT_INTEREST_DEFAULTS_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    PURGE_LOG: {
      SERIAL: Serial
      ACCESS_KEY: string
      CONVERSION_DATE: Date
      REL_2017_01_04_TRAN_SERIAL: Serial
      SH_MON_RETENTION_DATE: Date
      LN_MON_RETENTION_DATE: Date
      FM_HIST_RETENTION_DATE: Date
      GL_ORIG_RETENTION_DATE: Date
      POST_REQ_RETENTION_DATE: Date
      CURR_TRAN_RETENTION_DATE: Date
      TRAN_RES_RETENTION_DATE: Date
      TRAN_PURGE_TIME: Time
      TRAN_REORG_TIME: Time
      TRAN_REBUILD_TIME: Time
      MON_PURGE_TIME: Time
      MON_REORG_TIME: Time
      MON_REBUILD_TIME: Time
      MON_DET_REORG_TIME: Time
      MON_DET_REBUILD_TIME: Time
      FM_HIST_PURGE_TIME: Time
      FM_ACTION_REORG_TIME: Time
      FM_ACTION_REBUILD_TIME: Time
      FM_FIELD_REORG_TIME: Time
      FM_FIELD_REBUILD_TIME: Time
      GL_ORIG_PURGE_TIME: Time
      GL_HEADER_REORG_TIME: Time
      GL_HEADER_REBUILD_TIME: Time
      GL_DETAIL_REORG_TIME: Time
      GL_DETAIL_REBUILD_TIME: Time
      GL_ENTRY_REORG_TIME: Time
      GL_ENTRY_REBUILD_TIME: Time
      POST_REQ_PURGE_TIME: Time
      POST_REQ_REORG_TIME: Time
      POST_REQ_REBUILD_TIME: Time
      CURR_TRAN_PURGE_TIME: Time
      CURR_TRAN_REORG_TIME: Time
      CURR_TRAN_REBUILD_TIME: Time
      CURR_DET_REORG_TIME: Time
      CURR_DET_REBUILD_TIME: Time
      TRAN_RES_PURGE_TIME: Time
      TRAN_RES_REORG_TIME: Time
      TRAN_RES_REBUILD_TIME: Time
      LAST_FM_DATE: Date
    }
    PURGE_LOG_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { T: "Table" } | { M: "Monetary" } | { F: "FM history" }
      TABLE_SERIAL: Serial
      SHARE_TYPE_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      RETENTION_DATE: Date
      PURGE_TIME: Time
      REORG_TIME: Time
      REBUILD_TIME: Time
      LAST_FM_DATE: Date
    }
    PURGE_POLICY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      SH_MON_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      SH_MON_RETENTION_MONTHS: Count
      SH_MON_RETENTION_DAYS: Count
      SH_MON_RETENTION_DATE: Date
      LN_MON_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      LN_MON_RETENTION_MONTHS: Count
      LN_MON_RETENTION_DAYS: Count
      LN_MON_RETENTION_DATE: Date
      FM_HIST_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      FM_HIST_RETENTION_MONTHS: Count
      FM_HIST_RETENTION_DAYS: Count
      FM_HIST_RETENTION_DATE: Date
      GL_ORIG_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      GL_ORIG_RETENTION_MONTHS: Count
      GL_ORIG_RETENTION_DAYS: Count
      GL_ORIG_RETENTION_DATE: Date
      POST_REQ_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      POST_REQ_RETENTION_MONTHS: Count
      POST_REQ_RETENTION_DAYS: Count
      POST_REQ_RETENTION_DATE: Date
      CURR_TRAN_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      CURR_TRAN_RETENTION_MONTHS: Count
      CURR_TRAN_RETENTION_DAYS: Count
      CURR_TRAN_RETENTION_DATE: Date
      TRAN_RES_PURGE_OPTION: { N: "No" } | { Y: "Yes" }
      TRAN_RES_RETENTION_MONTHS: Count
      TRAN_RES_RETENTION_DAYS: Count
      TRAN_RES_RETENTION_DATE: Date
      LAST_RUN_DATE: Date
      LAST_FM_DATE: Date
    }
    PURGE_POLICY_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { T: "Table" } | { M: "Monetary" } | { F: "FM history" }
      TABLE_SERIAL: Serial
      SHARE_TYPE_SERIAL: Serial
      LOAN_TYPE_SERIAL: Serial
      RETENTION_MONTHS: Count
      RETENTION_DAYS: Count
      RETENTION_DATE: Date
      LAST_FM_DATE: Date
    }
    QUERY_SERVER: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      CATEGORY: { KB: "KeyBridge" } | { CD: "CU Direct" } | { DT: "Dealertrack" } | { RO: "RouteOne" } | { DS: "DocuSign" }
      SERVER_USER_SERIAL: Serial
      SERVER_DEVICE_SERIAL: Serial
      SESSION_TIMEOUT_SECONDS: Count
      LAST_FM_DATE: Date
    }
    RECEIPT: {
      SERIAL: Serial
      ACCESS_KEY: string
      TRANSACTION_SERIAL: Serial
      IMAGE: Binary
      IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      IMAGE_MOD_TIME: Time
      SEND_TO_ADDRESSES: string
      LAST_FM_DATE: Date
    }
    RECEIPT_CONFIG: {
      SERIAL: Serial
      ACCESS_KEY: string
      ACCOUNT_NUMBER_MASK: string
      ENABLE_BALANCE_MASK_PROMPT: { N: "No" } | { Y: "Yes" }
      FILE_TRANSFER_TYPE_SERIAL: Serial
      LOGO_IMAGE: Binary
      LOGO_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      LOGO_IMAGE_MOD_TIME: Time
      LOGO_IMAGE_SIZE: Count
      MAX_LOGO_IMAGE_SIZE: Count
      CUSC_SB_FILE_XFR_TYPE_SERIAL: Serial
      CUSC_SB_LOGO_IMAGE: Binary
      CUSC_SB_LOGO_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      CUSC_SB_LOGO_IMAGE_MOD_TIME: Time
      CUSC_SB_LOGO_IMAGE_SIZE: Count
      CUSC_SB_MAX_LOGO_IMAGE_SIZE: Count
      FONT_NAME: { H: "Helvetica" } | { C: "Courier" } | { T: "Times" }
      FONT_STYLE: { R: "Regular" } | { I: "Italic" } | { B: "Bold" } | { O: "Bold Italic" }
      FONT_SIZE: Count
      TIME_FORMAT: { M: "Military" } | { A: "AM and PM" }
      INCLUDE_TELLER_ID: { N: "No" } | { Y: "Yes" }
      INCLUDE_GL_REFERENCE_COMMENT: { N: "No" } | { Y: "Yes" }
      PAYMENT_DATE_OPTION: { D: "Display payment due and paid dates" } | { N: "Do not display payment due and paid dates" }
      EMAIL_ENABLED: { N: "No" } | { Y: "Yes" }
      EMAIL_ADDRESS_PREFIX: string
      EMAIL_SUBJECT: string
      EMAIL_BODY_TEXT: string
      EMAIL_BODY_FORMAT: { text: "text" } | { html: "html" }
      LAST_FM_DATE: Date
    }
    INVOICE_RECUR: {
      SERIAL: Serial
      ACCESS_KEY: string
      VENDOR_SERIAL: Serial
      INVOICE_NUMBER: string
      PURCHASE_ORDER_NUMBER: string
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      INVOICE_DATE: Date
      INVOICE_AMOUNT: Money
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      FREQUENCY_DAYS_BEFORE_DUE: Count
      DUE_DATE: Date
      TOTAL_EXPENSES: Money
      PAYMENT_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" } | { S: "Savings deposit" }
      AP_GL_SERIAL: Serial
      DISCOUNT_GL_SERIAL: Serial
      DISCOUNT_DATE: Date
      DISCOUNT_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    INVOICE_EXPENSE_RECUR: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      DESCRIPTION: string
      GL_SERIAL: Serial
      GL_ALLOCATION_SERIAL: Serial
      GL_ACCRUAL_SERIAL: Serial
      IRS_FORM_1099_MISC_OPTION: { '-': "None" } | { '1': "Rents" } | { '2': "Royalties" } | { '3': "Other income" } | { '5': "Fishing boat proceeds" } | { '6': "Medical and health care payments" } | { '7': "Nonemployee compensation" } | { '8': "Substitute payments in lieu of dividends or interest" } | { A: "Crop insurance proceeds" } | { B: "Excess golden parachute payments" } | { C: "Gross proceeds paid to an attorney" } | { D: "Section 409A deferrals" } | { E: "Section 409A income" }
      AMOUNT: Money
      LAST_FM_DATE: Date
    }
    RENTAL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      STATUS: { A: "Available" } | { R: "Rented" } | { H: "Held" }
      STATUS_DATE: Date
      STATUS_COMMENT: string
      AVAILABLE_DATE: Date
      RENTAL_START_DATE: Date
      LAST_FEE_AMOUNT: Money
      LAST_FEE_DATE: Date
      NEXT_FEE_DATE: Date
      NSF_FEE_DATE: Date
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      KEY_COUNT: Count
      SERIAL_NUMBER: string
      ASSET_NUMBER: string
      ADDITIONAL_INFORMATION: string
      LAST_FM_DATE: Date
    }
    RENTAL_ACCESS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      PERSON_SERIAL: Serial
      CATEGORY: { '-': "None" } | { O: "Owner" } | { C: "Court ordered" } | { R: "Other" }
      ACCESS_DATE: Date
      ACCESS_TIME: Time
      USER_SERIAL: Serial
      COMMENT: string
      LAST_FM_DATE: Date
    }
    RENTAL_PERSON_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PERSON_SERIAL: Serial
      COMMENT: string
      LAST_FM_DATE: Date
    }
    RENTAL_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { S: "Safe deposit box" } | { O: "Other" }
      TERM_OPTION: { S: "Specific period" } | { A: "Anniversary" }
      NEW_RENTAL_PRORATE_OPTION: { N: "No" } | { Y: "Yes" }
      SURRENDER_PRORATE_OPTION: { N: "No" } | { Y: "Yes" }
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      NEXT_PERIOD_DATE: Date
      FEE_SERIAL: Serial
      FEE_POSTING_POLICY_OPTION: { F: "Fee policy" } | { W: "Withdrawal policy" }
      ACCESS_FORM_TYPE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    RENTAL_WAIT_LIST: {
      SERIAL: Serial
      ACCESS_KEY: string
      PERSON_SERIAL: Serial
      COMMENT: string
      CATEGORY: { S: "Safe deposit box" } | { O: "Other" }
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      RENTAL_SERIAL: Serial
      PLACEMENT_TIME: Time
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    REPORT: {
      SERIAL: Serial
      ACCESS_KEY: string
      TITLE: string
      SYSTEM_FILE_NAME: string
      SYSTEM_HOST_NAME: string
      CREATION_TIME: Time
      BATCH_SERIAL: Serial
      PAGE_COUNT: Count
      RECORD_COUNT: Count
      BYTE_COUNT: Count
      FORMAT: { pdf: "pdf" } | { xml: "xml" } | { html: "html" } | { txt: "txt" } | { binary: "binary" }
      INTERFACE_SERIAL: Serial
      FILE_ID: string
      FILE_DATE: Date
      MATCH_CRITERIA: string
      SYSTEM_PATH_NAME: string
      LAST_FM_DATE: Date
    }
    RETURNED_ITEM_CHANNEL: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      DEFAULT_REASON_SERIAL: Serial
      DEFAULT_FEE_SERIAL: Serial
      LOAN_FEE_ALLOWED: { N: "No" } | { Y: "Yes" }
      CHECK_NUMBER_REQUIRED: { N: "No" } | { Y: "Yes" }
      STATEMENT_DESCRIPTION: string
      STATEMENT_CHANNEL_NAME: string
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    RETURNED_ITEM_CHARGEBACK: {
      SERIAL: Serial
      ACCESS_KEY: string
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      MONETARY_SERIAL: Serial
      CHANNEL_SERIAL: Serial
      MAKER_NAME: string
      CHECK_NUMBER: string
      RECEIVED_DATE: Date
      RETURNED_DATE: Date
      REASON_SERIAL: Serial
      AMOUNT: Money
      FEE_SERIAL: Serial
      STATEMENT_DESCRIPTION: string
      BATCH_SERIAL: Serial
      POSTING_DATE: Date
      POSTING_FEE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    RETURNED_ITEM_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      STATEMENT_REASON_NAME: string
      LAST_FM_DATE: Date
    }
    REVERSAL_REASON: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FEE_OPTION: { N: "No" } | { Y: "Yes" }
      FEE_GL_OPTION: { O: "Original GL account" } | { R: "Reversal GL account" }
      ATM_OPTION: { N: "No" } | { Y: "Yes" }
      POS_OPTION: { N: "No" } | { Y: "Yes" }
      CDC_OPTION: { N: "No" } | { Y: "Yes" }
      BPM_OPTION: { N: "No" } | { Y: "Yes" }
      DEFAULT_COMMENT: string
      PROVISIONAL_CR_GL_SERIAL: Serial
      PROVISIONAL_CR_GL_BR_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    RISK_BASED_PRICING: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      BASED_ON_CREDIT_SCORE: { Y: "Credit Score" } | { P: "Paper Grade" } | { N: "No" }
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      CREDIT_SCORE_OPTION: { L: "Lowest" } | { H: "Highest" } | { P: "Primary applicant" } | { I: "Highest income applicant" }
      CREDIT_SCORE_REQUIRED: { N: "No" } | { Y: "Yes" }
      BASED_ON_TERM: { N: "No" } | { Y: "Yes" }
      TERM_ROUNDING: { D: "Round down" } | { N: "Round to nearest" }
      BASED_ON_VEHICLE_YEAR: { N: "No" } | { Y: "Yes" }
      BASED_ON_LTV: { N: "No" } | { Y: "Yes" }
      BASED_ON_LOAN_AMOUNT: { N: "No" } | { Y: "Yes" }
      BASED_ON_MARKET: { N: "No" } | { Y: "Yes" }
      MARKET_TYPE_SERIAL: Serial
      BASE_RATE: Rate
      BASE_MARGIN: Rate
      ADDITIVE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    RISK_BASED_ADDITIVE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      BASED_ON_CREDIT_SCORE: { Y: "Credit Score" } | { P: "Paper Grade" } | { N: "No" }
      CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      CREDIT_SCORE_OPTION: { L: "Lowest" } | { H: "Highest" } | { P: "Primary applicant" } | { I: "Highest income applicant" }
      CREDIT_SCORE_REQUIRED: { N: "No" } | { Y: "Yes" }
      BASED_ON_RELATIONSHIP: { N: "No" } | { Y: "Yes" }
      RELATIONSHIP_OPTION: { L: "Lowest" } | { H: "Highest" } | { P: "Primary applicant" } | { I: "Highest income applicant" }
      BASED_ON_PAYMENT_METHOD: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    RISK_BASED_PRICING_ADD_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      MIN_SCORE: Count
      MAX_SCORE: Count
      PAPER_GRADE_SERIAL: Serial
      RELATIONSHIP_SERIAL: Serial
      PAYMENT_METHOD: { '-': "None" } | { C: "Cash" } | { O: "Cash with coupons" } | { T: "Automatic transfer" } | { A: "ACH" } | { P: "Payroll" } | { D: "Distribution" }
      RATE: Rate
      INTEREST_RATE_MIN: Rate
      INTEREST_RATE_MAX: Rate
      MARGIN: Rate
      INTEREST_RATE_MARGIN_MIN: Rate
      INTEREST_RATE_MARGIN_MAX: Rate
      LAST_FM_DATE: Date
    }
    RISK_BASED_PRICING_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      MIN_SCORE: Count
      MAX_SCORE: Count
      PAPER_GRADE_SERIAL: Serial
      MIN_TERM: Count
      MAX_TERM: Count
      MIN_VEHICLE_YEAR: Count
      MAX_VEHICLE_YEAR: Count
      MIN_LTV: Rate
      MAX_LTV: Rate
      MIN_LOAN_AMOUNT: Money
      MAX_LOAN_AMOUNT: Money
      MARKET_SERIAL: Serial
      RATE: Rate
      MARGIN: Rate
      LAST_FM_DATE: Date
    }
    RISK_BASED_PRICING_PLAN: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    RISK_BASED_PRICING_PLAN_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      RISK_BASED_PRICING_SERIAL: Serial
      EFFECTIVE_DATE: Date
      LAST_FM_DATE: Date
    }
    ROLE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      BASE_ROLE_SERIAL: Serial
      STD_POSTING_POLICY_SERIAL: Serial
      ONUS_POSTING_POLICY_SERIAL: Serial
      CHECK_HOLD_POLICY_SERIAL: Serial
      PASSWORD_POLICY_SERIAL: Serial
      APP_AUTH_DECISION_MODEL_SERIAL: Serial
      DEN_AUTH_DECISION_MODEL_SERIAL: Serial
      SALES_OPPORTUNITY_OPTION: { '-': "Default" } | { NO: "No evaluation or display" } | { BA: "Evaluate and display on profile access" } | { BT: "Evaluate and display after transaction post" } | { EA: "Evaluate on profile access" } | { ET: "Evaluate after transaction post" } | { DA: "Display on profile access" } | { DT: "Display after transaction post" }
      PERSON_VERIFICATION_OPTION: { '-': "Default" } | { N: "No" } | { Y: "Yes" }
      PROF_ACCESS_INT_TY_SPECIFY: { N: "No" } | { Y: "Yes" }
      PROF_ACCESS_INT_TY_SERIAL: Serial
      AD_HOC_REP_USERNAME: string
      AD_HOC_REP_ROLE_LIST: string
      AD_HOC_REP_PASSWORD: string
      AD_HOC_REP_DASHBOARD_NAME: string
      ACCESS_LOGGING: { '-': "Default" } | { N: "None" } | { Y: "Account" } | { F: "Account}|{ card}|{ person}|{ application" }
      USER_INTERFACE_SETTINGS: Document
      LAST_FM_DATE: Date
    }
    ROUTING_NUMBER_INSTITUTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      ROUTING_NUMBER: string
      ACH_ENABLED: { N: "No" } | { Y: "Yes" }
      WIRE_ENABLED: { N: "No" } | { Y: "Yes" }
      INSTITUTION_NAME: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      PHONE_NUMBER: string
      OFFICE_CODE: { '-': "None" } | { O: "Main" } | { B: "Branch" }
      RECORD_TYPE_CODE: { '-': "None" } | { '0': "Federal Reserve Bank" } | { R: "Use routing number" } | { N: "Use new routing number" }
      NEW_ROUTING_NUMBER: string
      SERVICING_FRB_ROUTING_NUMBER: string
      ACH_REVISION_DATE: Date
      WIRE_INSTITUTION_NAME: string
      WIRE_TELEGRAPHIC_NAME: string
      WIRE_CITY: string
      WIRE_STATE: string
      FUNDS_TRANSFER_STATUS: { '-': "None" } | { N: "No" } | { Y: "Yes" }
      FUNDS_SETTLEMENT_ONLY_STATUS: { '-': "None" } | { N: "No" } | { Y: "Yes" }
      BOOK_ENT_SEC_TRANSFER_STATUS: { '-': "None" } | { N: "No" } | { Y: "Yes" }
      WIRE_REVISION_DATE: Date
      LAST_FM_DATE: Date
    }
    SHARE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STORED_ACCESS_KEY: string
      ORDINAL: Count
      ROW_CHANGE_TIMESTAMP: Time
      ID: string
      DESCRIPTION: string
      BALANCE: Money
      MINIMUM_BALANCE: Money
      MINIMUM_DEPOSIT: Money
      MINIMUM_WITHDRAWAL: Money
      SWEEP_OPTION: { '-': "None" } | { T: "Target balance" } | { L: "Savings secured loan payoff" }
      SWEEP_TARGET_BALANCE: Money
      SWEEP_MINIMUM_BALANCE: Money
      SWEEP_MAXIMUM_BALANCE: Money
      COURTESY_PAY_LIMIT: Money
      COURTESY_PAY_RESTRICT_SERIAL: Serial
      COURTESY_PAY_ATM_DEBIT: { N: "No" } | { Y: "Yes" }
      COURTESY_PAY_ATM_DEBIT_CH_DATE: Date
      COURTESY_PAY_OTHER: { N: "No" } | { Y: "Yes" }
      COURTESY_PAY_OTHER_CH_DATE: Date
      POSITIVE_PAY_OPTION: { '-': "None" } | { D: "Check" } | { A: "ACH" } | { B: "Check and ACH" }
      CK_HLD_NEXT_DAY_AVAIL_AMOUNT: Money
      REG_D_COUNT: Count
      REG_D_COUNT_PRIOR: Count
      REG_D_PAY: { N: "No" } | { Y: "Yes" }
      REG_D_PAY_CH_DATE: Date
      CHARGE_OFF_TYPE_SERIAL: Serial
      CHARGE_OFF_DATE: Date
      CHARGE_OFF_AMOUNT: Money
      COLLECTION_STATUS: { '-': "None" } | { A: "Active" }
      COLLECTION_HANDLING: { '-': "Normal" } | { RM: "Removal" } | { RF: "Referral" }
      COLLECTION_NOTICE_COUNT: Count
      COLLECTION_NOTICE_DATE: Date
      DIVIDEND_CALCULATION_SERIAL: Serial
      DIVIDEND_POSTING: { D: "Deposit" } | { T: "Transfer" }
      DIVIDEND_CUSTOM_RATE: Rate
      DIVIDEND_LAST_AMOUNT: Money
      DIVIDEND_LAST_DATE: Date
      DIVIDEND_ACCRUED_DATE: Date
      DIVIDEND_ACCRUED_AMOUNT: Money
      DIVIDEND_APYE_START_DATE: Date
      DIVIDEND_APYE_DAILY_BAL: Money
      DIVIDEND_YTD: Money
      DIVIDEND_LAST_YEAR: Money
      TAX_PERSON_SERIAL: Serial
      TAX_PLAN_CATEGORY: { '-': "None" } | { RI: "Roth IRA" } | { IR: "Inherited Roth IRA" } | { TI: "Traditional IRA" } | { CI: "Conduit Traditional IRA" } | { IT: "Inherited Traditional IRA" } | { SE: "SEP IRA" } | { SR: "SARSEP IRA" } | { SI: "SIMPLE IRA" } | { SK: "SIMPLE 401K" } | { '4K': "401K" } | { CE: "Coverdell ESA" } | { HS: "HSA" } | { AM: "Archer MSA" }
      TAX_PLAN_SERIAL: Serial
      CRED_REP_PRIMARY_ECOA_CODE: { '-': "Default" } | { '1': "'1' Individual" } | { '2': "'2' Joint contractual liability" } | { '3': "'3' Authorized user" } | { '5': "'5' Comaker or guarantor" } | { '7': "'7' Maker" } | { T: "'T' Association with account terminated" } | { W: "'W' Business or commercial" } | { X: "'X' Consumer deceased" } | { Z: "'Z' Delete consumer" }
      CRED_REP_PRIMARY_CONS_INFO_IND: { '-': "Retain previous value" } | { A: "'A ' Petition for chapter 7 bankruptcy" } | { B: "'B ' Petition for chapter 11 bankruptcy" } | { C: "'C ' Petition for chapter 12 bankruptcy" } | { D: "'D ' Petition for chapter 13 bankruptcy" } | { E: "'E ' Discharged through bankruptcy chapter 7" } | { F: "'F ' Discharged through bankruptcy chapter 11" } | { G: "'G ' Discharged through bankruptcy chapter 12" } | { H: "'H ' Discharged through bankruptcy chapter 13" } | { I: "'I ' Chapter 7 bankruptcy dismissed" } | { J: "'J ' Chapter 11 bankruptcy dismissed" } | { K: "'K ' Chapter 12 bankruptcy dismissed" } | { L: "'L ' Chapter 13 bankruptcy dismissed" } | { M: "'M ' Chapter 7 bankruptcy withdrawn" } | { N: "'N ' Chapter 11 bankruptcy withdrawn" } | { O: "'O ' Chapter 12 bankruptcy withdrawn" } | { P: "'P ' Chapter 13 bankruptcy withdrawn" } | { Z: "'Z ' Bankruptcy - undesignated chapter" } | { '1A': "'1A' Personal receivership" } | { Q: "'Q ' Remove previously reported bankruptcy or personal receivership" } | { R: "'R ' Chapter 7 reaffirmation of debt" } | { V: "'V ' Chapter 7 reaffirmation of debt rescinded" } | { '2A': "'2A' Lease assumption" } | { S: "'S ' Remove previously reported reaffirmation or rescinded or assumption" } | { T: "'T ' Credit grantor cannot locate consumer" } | { U: "'U ' Consumer now located" }
      CRED_REP_BANKRUPTCY_DATE: Date
      CRED_REP_ACCOUNT_TYPE: { '-': "Do not report" } | { '8B': "'8B' Deposit account with overdraft protection" }
      CRED_REP_SPEC_COMM_CODE: { '-': "None" } | { B: "'B ' Account payments managed by counseling program" } | { C: "'C ' Paid by comaker or guarantor" } | { H: "'H ' Loan assumed by another party" } | { I: "'I ' Election of remedy" } | { M: "'M ' Account closed at credit grantor request" } | { O: "'O ' Account transferred to another company or servicer" } | { S: "'S ' Special handling" } | { V: "'V ' Adjustment pending" } | { AB: "'AB' Debt being paid through insurance" } | { AC: "'AC' Paying under a partial payment agreement" } | { AH: "'AH' Purchased by another company" } | { AI: "'AI' Recalled to active military duty" } | { AL: "'AL' Student loan assigned to government" } | { AM: "'AM' Account payments assured by wage garnishment" } | { AN: "'AN' Account acquired by FDIC or NCUA" } | { AO: "'AO' Voluntarily surrendered then redeemed or reinstated" } | { AP: "'AP' Credit line suspended" } | { AS: "'AS' Account closed due to refinance" } | { AT: "'AT' Account closed due to transfer" } | { AU: "'AU' Account paid in full for less than full balance" } | { AV: "'AV' First payment never received" } | { AW: "'AW' Affected by natural or declared disaster" } | { AX: "'AX' Account paid from collateral" } | { AZ: "'AZ' Redeemed or reinstated repossession" } | { BA: "'BA' Transferred to recovery" } | { BB: "'BB' Full termination status pending" } | { BC: "'BC' Full termination obligation satisfied" } | { BD: "'BD' Full termination balance owing" } | { BE: "'BE' Early termination status pending" } | { BF: "'BF' Early termination obligation satisfied" } | { BG: "'BG' Early termination balance owing" } | { BH: "'BH' Early termination insurance loss" } | { BI: "'BI' Involuntary repossession" } | { BJ: "'BJ' Involuntary repossession obligation satisfied" } | { BK: "'BK' Involuntary repossession balance owing" } | { BL: "'BL' Credit card lost or stolen" } | { BN: "'BN' Paid by company which originally sold merchandise" } | { BO: "'BO' Foreclosure proceedings started" } | { BP: "'BP' Paid through insurance" } | { BS: "'BS' Prepaid lease" } | { BT: "'BT' Principal deferred interest payment only" } | { CH: "'CH' Guaranteed or insured" } | { CI: "'CI' Account closed due to inactivity" } | { CJ: "'CJ' Credit line no longer available in repayment phase" } | { CK: "'CK' Credit line reduced due to collateral depreciation" } | { CL: "'CL' Credit line suspended due to collateral depreciation" } | { CM: "'CM' Collateral released by creditor balance owing" } | { CN: "'CN' Loan modified under federal government plan" } | { CO: "'CO' Loan modified" } | { CP: "'CP' Account in forbearance" } | { CS: "'CS' Child support agency only" }
      CRED_REP_COMP_COND_CODE: { '-': "Retain previous value" } | { XA: "'XA' Closed at consumer request" } | { XB: "'XB' FCRA dispute" } | { XC: "'XC' FCRA dispute completed - consumer disagrees" } | { XD: "'XD' Closed at consumer request - FCRA dispute" } | { XE: "'XE' Closed at consumer request - dispute completed - consumer disagrees" } | { XF: "'XF' FCBA dispute" } | { XG: "'XG' FCBA dispute completed - consumer disagrees" } | { XH: "'XH' Previously in dispute - now completed" } | { XJ: "'XJ' Closed at consumer request - FCBA dispute" } | { XR: "'XR' Remove most recent code" }
      CRED_REP_FIRST_DQ_DATE: Date
      CRED_REP_ACCOUNT_STATUS: { '11': "'11' Current account" } | { '13': "'13' Paid or closed account zero balance" } | { '61': "'61' Account paid in full - was a voluntary surrender" } | { '62': "'62' Account paid in full - was a collection account" } | { '63': "'63' Account paid in full - was a repossession" } | { '64': "'64' Account paid in full - was a charge off" } | { '65': "'65' Account paid in full - foreclosure was started" } | { '71': "'71' Account 30-59 days past due" } | { '78': "'78' Account 60-89 days past due" } | { '80': "'80' Account 90-119 days past due" } | { '82': "'82' Account 120-149 days past due" } | { '83': "'83' Account 150-179 days past due" } | { '84': "'84' Account 180 or more days past due" } | { '88': "'88' Claim filed with government" } | { '89': "'89' Deed received in lieu of foreclosure - there may be a balance due" } | { '93': "'93' Account assigned to collections" } | { '94': "'94' Foreclosure completed - there may be a balance due" } | { '95': "'95' Voluntary surrender - there may be a balance due" } | { '96': "'96' Merchandise was repossessed - there may be a balance due" } | { '97': "'97' Unpaid balance reported as a loss - charge off" } | { DA: "'DA' Delete entire account for reasons other than fraud" } | { DF: "'DF' Delete entire account due to confirmed fraud" } | { '05': "'05' Account transferred (no longer used)" }
      CRED_REP_LAST_DATE: Date
      MONETARY_PURGE_DATE: Date
      LAST_MONETARY_DATE: Date
      LAST_ACTIVITY_DATE: Date
      OPENING_BALANCE: Money
      ORIGINAL_AMOUNT: Money
      ORIGINAL_DATE: Date
      ACH_DEPOSIT_LAST_AMOUNT: Money
      ACH_DEPOSIT_LAST_DATE: Date
      CERT_NUMBER: string
      CERT_PEN_CALCULATION_SERIAL: Serial
      CERT_PEN_WAIVE_COUNT: Count
      CERT_PEN_WAIVE_LAST_DATE: Date
      CERT_DIVIDENDS_AVAILABLE: Money
      CERT_OID_YIELD_TO_MATURITY: Rate
      CERT_OID_BALANCE: Money
      CERT_BUMP_COUNT: Count
      CERT_BUMP_LAST_DATE: Date
      MATURITY_POSTING: { R: "Renew" } | { T: "Transfer then close" } | { t: "Transfer then renew" } | { H: "Hold" }
      MATURITY_FREQUENCY: { M: "Months" } | { D: "Days" }
      MATURITY_PERIOD: Count
      MATURITY_DATE: Date
      MATURITY_LAST_DATE: Date
      MATURITY_RENEW_DEFAULTS_SERIAL: Serial
      MAIL_PERSON_ADDR_LINK_SERIAL: Serial
      STMT_MAIL_GROUP_SERIAL: Serial
      STMT_CUTOFF_GROUP_SERIAL: Serial
      STMT_CUTOFF_LAST_DATE: Date
      STMT_CUTOFF_LAST_TRAN_SERIAL: Serial
      STMT_CUTOFF_PRIOR_DATE: Date
      STMT_CUTOFF_PRIOR_TRAN_SERIAL: Serial
      STMT_REG_E_COUNT: Count
      ANALYSIS_CATEGORY: { '-': "None" } | { A: "Analysis account" } | { S: "Analysis subaccount" }
      ANALYSIS_SHARE_SERIAL: Serial
      TYPE_SERIAL: Serial
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      BRANCH_SERIAL: Serial
      OPEN_DATE: Date
      OPENED_BY_USER_SERIAL: Serial
      CLOSE_DATE: Date
      CLOSE_REASON_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { D: "Deposit and inquiry" } | { I: "Inquiry only" }
      NOTE_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      DEPOSIT_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      WITHDRAWAL_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      LAST_FM_DATE: Date
    }
    SH_ANALYSIS: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      EARNINGS_CALCULATION_SERIAL: Serial
      EARNINGS_CUSTOM_RATE: Rate
      EARNINGS_CARRY_FORWARD_OPTION: { N: "No carry forward" } | { C: "Carry forward" } | { A: "Carry forward until end of year" }
      STMT_CUTOFF_GROUP_SERIAL: Serial
      STMT_CUTOFF_LAST_DATE: Date
      STMT_CUTOFF_LAST_TRAN_SERIAL: Serial
      STMT_CUTOFF_PRIOR_DATE: Date
      STMT_CUTOFF_PRIOR_TRAN_SERIAL: Serial
      AVG_CONSOLIDATED_BALANCE: Money
      AVG_UNCOLLECTED_BALANCE: Money
      AVG_COLLECTED_BALANCE: Money
      AVG_POSITIVE_COLLECTED_BALANCE: Money
      AVG_NEGATIVE_COLLECTED_BALANCE: Money
      RESERVE_RATE: Rate
      RESERVE_AMOUNT: Money
      AVG_INVESTABLE_BALANCE: Money
      EARNINGS_CREDIT: Money
      EARNINGS_EFFECTIVE_RATE: Rate
      EARNINGS_BROUGHT_FORWARD: Money
      SVC_CHGS_ELIGIBLE: Money
      SVC_CHGS_BAL_EQUIVALENT: Money
      SVC_CHGS_AFTER_CREDIT: Money
      EARNINGS_CARRIED_FORWARD: Money
      SVC_CHGS_INELIGIBLE: Money
      SVC_CHGS_NET: Money
      LAST_FM_DATE: Date
    }
    SH_ANALYSIS_CONSOLIDATION: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SHARE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    SH_ANALYSIS_DFLT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEFAULTS_NAME: string
      DEFAULTS_STATUS: { O: "Open" } | { C: "Closed" }
      TYPE_SERIAL: Serial
      EARNINGS_CALCULATION_SERIAL: Serial
      EARNINGS_CUSTOM_RATE: Rate
      EARNINGS_CARRY_FORWARD_OPTION: { N: "No carry forward" } | { C: "Carry forward" } | { A: "Carry forward until end of year" }
      STMT_CUTOFF_GROUP_SERIAL: Serial
      RESERVE_RATE: Rate
      LAST_FM_DATE: Date
    }
    EARNINGS_CALC: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      RATE_OPTION: { SFR: "Single fixed rate" } | { SCR: "Single custom rate" } | { PTR: "Plateau tiered-rate" } | { STR: "Split-rate tiered-rate" }
      SINGLE_FIXED_RATE: Rate
      LAST_FM_DATE: Date
    }
    EARNINGS_CALC_RANGE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      BALANCE: Money
      RELATIONSHIP_SERIAL: Serial
      RATE: Rate
      LAST_FM_DATE: Date
    }
    SH_ANALYSIS_SERVICE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      FEE_SERIAL: Serial
      NEW_PERIOD_COPY_OPTION: { N: "No" } | { Y: "Yes" }
      USE_SERVICE_DEFAULTS: { N: "No" } | { Y: "Yes" }
      EARNINGS_CREDIT_ELIG: { N: "No" } | { Y: "Yes" }
      FORMULA: { '-': "None" } | { F: "Flat charge" } | { UC: "Flat charge plus unit charge per count above free count" } | { IC: "Flat charge plus unit charge per count increment above free count" } | { FC: "Flat charge if count above free count" } | { RA: "Flat charge plus charge rate times amount above free amount" } | { DA: "Flat charge plus daily rate times amount above free amount" } | { IA: "Flat charge plus unit charge per amount increment above free amount" } | { FA: "Flat charge if amount above free amount" }
      FLAT_CHARGE: Money
      UNIT_CHARGE: Money
      CHARGE_RATE: Rate
      INCREMENT_ROUNDING: { U: "Up" } | { D: "Down" } | { N: "Nearest" }
      INCREMENT_COUNT: Count
      INCREMENT_AMOUNT: Money
      FREE_COUNT: Count
      FREE_AMOUNT: Money
      USAGE_COUNT: Count
      USAGE_AMOUNT: Money
      SERVICE_CHARGE: Money
      LAST_FM_DATE: Date
    }
    SH_ANALYSIS_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      EARNINGS_GL_SERIAL: Serial
      EARNINGS_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      SVC_CHG_POSTING_POLICY_SERIAL: Serial
      SVC_CHG_STMT_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    SH_ANALYSIS_TYPE_SERVICE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      FEE_SERIAL: Serial
      NEW_PERIOD_COPY_OPTION: { N: "No" } | { Y: "Yes" }
      USE_SERVICE_DEFAULTS: { N: "No" } | { Y: "Yes" }
      EARNINGS_CREDIT_ELIG: { N: "No" } | { Y: "Yes" }
      FORMULA: { '-': "None" } | { F: "Flat charge" } | { UC: "Flat charge plus unit charge per count above free count" } | { IC: "Flat charge plus unit charge per count increment above free count" } | { FC: "Flat charge if count above free count" } | { RA: "Flat charge plus charge rate times amount above free amount" } | { DA: "Flat charge plus daily rate times amount above free amount" } | { IA: "Flat charge plus unit charge per amount increment above free amount" } | { FA: "Flat charge if amount above free amount" }
      FLAT_CHARGE: Money
      UNIT_CHARGE: Money
      CHARGE_RATE: Rate
      INCREMENT_ROUNDING: { U: "Up" } | { D: "Down" } | { N: "Nearest" }
      INCREMENT_COUNT: Count
      INCREMENT_AMOUNT: Money
      FREE_COUNT: Count
      FREE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    SH_CHARGE_OFF_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CHARGE_OFF_GL_SERIAL: Serial
      CHARGE_OFF_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      RECOVERY_GL_SERIAL: Serial
      RECOVERY_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CHEX_SYSTEMS_CODE: { '-': "None" } | { '0': "'0 ' ACH abuse" } | { '1': "'1 ' Transactions involving possibly altered items or checks" } | { '2': "'2 ' Transactions involving items or checks returned as uncollectable" } | { '3': "'3 ' Transactions involving possibly stolen items or checks" } | { '4': "'4 ' Overdrafts" } | { '6': "'6 ' Account abuse" } | { '7': "'7 ' Suspected fraud activity" } | { '8': "'8 ' Purchased account debt" } | { '9': "'9 ' Account debt sold unpaid" } | { A: "'A ' Non-sufficient funds activity" } | { B: "'B ' Writing checks on a closed account" } | { C: "'C ' Possible false information used in opening account" } | { D: "'D ' Transactions involving returned items from own acct at another FI" } | { E: "'E ' Excessive drawing on uncollected funds" } | { F: "'F ' Abuse of overdraft protection" } | { G: "'G ' Savings account abuse" } | { H: "'H ' Automatic teller machine abuse" } | { I: "'I ' Advanced fee with suspected fraud" } | { J: "'J ' Account takeover" } | { K: "'K ' Debit card revoked" } | { L: "'L ' Transactions involving possibly forged items or checks" } | { M: "'M ' Suspected fraud activity of electronic transfer account" } | { N: "'N ' Abuse of electronic transfer account" } | { O: "'O ' Transactions involving items belonging to a deceased party" } | { P: "'P ' Transactions involving items or checks belonging to another party" } | { Q: "'Q ' Using funds credited to account in error or received in error" } | { R: "'R ' Transactions involving items with irregular signature endorsement" } | { T: "'T ' Transactions involving checks returned stop payment" } | { U: "'U ' Unsatisfactory handling" } | { V: "'V ' Split depositing with checks returned as uncollectable" } | { W: "'W ' Drawing against uncollected funds" } | { Y: "'Y ' Possible forgery" } | { AA: "'AA' 419 Advanced fee abuse" } | { AB: "'AB' ACH suspected fraud" } | { AC: "'AC' Voluntary closure with no account abuse or fraud" } | { AD: "'AD' Voluntary closure with account abuse" } | { AE: "'AE' Voluntary closure with suspected fraud" }
      LAST_FM_DATE: Date
    }
    SH_DAILY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      BANKING_DATE: Date
      NSF_COUNT: Count
      NSF_AMOUNT: Money
      NEGATIVE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    SHARE_DFLT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DEFAULTS_NAME: string
      DEFAULTS_STATUS: { O: "Open" } | { C: "Closed" }
      ID: string
      DESCRIPTION: string
      MINIMUM_BALANCE: Money
      MINIMUM_DEPOSIT: Money
      MINIMUM_WITHDRAWAL: Money
      SWEEP_OPTION: { '-': "None" } | { T: "Target balance" } | { L: "Savings secured loan payoff" }
      SWEEP_TARGET_BALANCE: Money
      SWEEP_MINIMUM_BALANCE: Money
      SWEEP_MAXIMUM_BALANCE: Money
      COURTESY_PAY_LIMIT: Money
      COURTESY_PAY_RESTRICT_SERIAL: Serial
      COURTESY_PAY_OTHER: { N: "No" } | { Y: "Yes" }
      POSITIVE_PAY_OPTION: { '-': "None" } | { D: "Check" } | { A: "ACH" } | { B: "Check and ACH" }
      CK_HLD_NEXT_DAY_AVAIL_AMOUNT: Money
      REG_D_PAY: { N: "No" } | { Y: "Yes" }
      COLLECTION_HANDLING: { '-': "Normal" } | { RM: "Removal" } | { RF: "Referral" }
      DIVIDEND_CALCULATION_SERIAL: Serial
      DIVIDEND_POSTING: { D: "Deposit" } | { T: "Transfer" }
      DIVIDEND_CUSTOM_RATE: Rate
      TAX_PLAN_CATEGORY: { '-': "None" } | { RI: "Roth IRA" } | { IR: "Inherited Roth IRA" } | { TI: "Traditional IRA" } | { CI: "Conduit Traditional IRA" } | { IT: "Inherited Traditional IRA" } | { SE: "SEP IRA" } | { SR: "SARSEP IRA" } | { SI: "SIMPLE IRA" } | { SK: "SIMPLE 401K" } | { '4K': "401K" } | { CE: "Coverdell ESA" } | { HS: "HSA" } | { AM: "Archer MSA" }
      CRED_REP_ACCOUNT_TYPE: { '-': "Do not report" } | { '8B': "'8B' Deposit account with overdraft protection" }
      CERT_NUMBER: string
      CERT_PEN_CALCULATION_SERIAL: Serial
      CERT_OID_YIELD_TO_MATURITY: Rate
      MATURITY_POSTING: { R: "Renew" } | { T: "Transfer then close" } | { t: "Transfer then renew" } | { H: "Hold" }
      MATURITY_FREQUENCY: { M: "Months" } | { D: "Days" }
      MATURITY_PERIOD: Count
      MATURITY_DATE: Date
      MATURITY_RENEW_DEFAULTS_SERIAL: Serial
      STMT_MAIL_GROUP_SERIAL: Serial
      STMT_CUTOFF_GROUP_SERIAL: Serial
      TYPE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      SHARED_BRANCH_OPTION: { S: "Standard" } | { D: "Deposit and inquiry" } | { I: "Inquiry only" }
      DEPOSIT_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      WITHDRAWAL_RESTRICTION: { U: "Unrestricted" } | { R: "Restricted" }
      INSERT_ANALYSIS_DFLT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    SH_EXT_TRAN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      CATEGORY: { D: "Deposit" } | { W: "Withdrawal" } | { P: "Payment" } | { A: "Advance" } | { R: "Refinance" } | { N: "New loan" } | { C: "Comment" }
      SOURCE: { J: "Journal voucher" } | { S: "Cash" } | { K: "Check" } | { k: "Cash and check" } | { D: "Consumer check" } | { C: "Credit or debit card" } | { P: "Payroll" } | { B: "Bill payment" } | { T: "Audio" } | { H: "Online banking" } | { M: "Mobile banking" } | { s: "Shared branch" } | { A: "ATM" } | { a: "ACH" } | { o: "ACH origination" } | { E: "Incoming wire" } | { e: "Outgoing wire" } | { O: "POS" } | { I: "Insurance" } | { i: "Debt protection" } | { F: "Fee" } | { R: "Interest refund" } | { V: "Dividend" } | { W: "Federal backup withholding" }
      SUB_CATEGORY: { '-': "None" } | { P: "Card purchase" } | { R: "Card purchase return" } | { B: "Card balance transfer" } | { S: "Single payment" } | { s: "Single payment - waive late fee" } | { A: "Additional payment" } | { O: "Principal only payment" } | { W: "Waive late fee" } | { L: "Close loan" } | { b: "Bankruptcy pre-petition payment" } | { I: "Interest prepayment" }
      FICS_CATEGORY: { '-': "None" } | { REG: "Regular payment odd amount" } | { CUR: "Principal curtailment" } | { LTC: "Late charge" } | { MIS: "Miscellaneous insurance" } | { PRE: "Prepayment" } | { RCP: "Returned check charge" } | { ADJ: "Adjustment - tax and insurance and/or unapplied" } | { MAN: "Manual payment - interest" }
      MORTGAGE_CATEGORY: { '-': "None" } | { PLC: "Regular payment plus late charge" } | { CUR: "Principal curtailment" } | { PAR: "Partial payment" } | { ESC: "Additional escrow" } | { LTC: "Late charge" } | { OTH: "Other" }
      AMOUNT: Money
      PRINCIPAL: Money
      TAX_AND_INSURANCE: Money
      UNAPPLIED: Money
      LATE_CHARGE: Money
      MISCELLANEOUS_INSURANCE: Money
      RETURNED_CHECK_CHARGE: Money
      MISCELLANEOUS_FEE: Money
      DEDUCT_SERVICE_FEE: { N: "No" } | { Y: "Yes" }
      EXPORT_SET_SERIAL: Serial
      STATUS: { '-': "None" } | { Q: "Queued" } | { P: "Posted" } | { p: "Posting failed" }
      TRACER: string
      EXCEPTION_DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    SHARE_FEE_COUNT_MTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      YEAR: Count
      MONTH: Count
      COUNT: Count
      LAST_FM_DATE: Date
    }
    SH_HOLD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { FH: "Funds hold" } | { CK: "Check deposit" } | { OD: "ACH origination deposit" } | { BK: "Bulk check deposit" } | { BC: "Bulk cash deposit" } | { CD: "Certified check" } | { BD: "Bill payment check" } | { PA: "Preauthorization" } | { MV: "Merchant verification" } | { RI: "Large dollar return item" } | { IL: "IRS tax levy" } | { CL: "Child support levy" } | { LV: "Levy" } | { GA: "Garnishment" } | { UF: "Uncollected fee" } | { CA: "Close fee" } | { CF: "Close fee GL only" } | { PR: "Pending return" } | { DP: "Check positive pay" } | { AP: "ACH positive pay" } | { DS: "Check stop" } | { AS: "ACH stop" } | { AE: "ACH stop all except" } | { AR: "ACH revocation" } | { AN: "ACH not authorized" } | { AD: "ACH death notification" }
      AMOUNT: Money
      AVAILABLE_AMOUNT: Money
      REASON: string
      TRACER: string
      PAYEE: string
      CHECK_CATEGORY: { '-': "None" } | { D: "Next day" } | { L: "Local" } | { N: "Nonlocal" } | { P: "Proprietary ATM" } | { A: "Nonproprietary ATM" } | { O: "Other" }
      CHECK_EXCEPTION_HOLD_REASON: { '-': "None" } | { N: "New account" } | { L: "Large deposit" } | { R: "Redeposited check" } | { O: "Repeated overdrafts" } | { C: "Reasonable cause to doubt collectibility" } | { E: "Emergency conditions" } | { X: "Extra day for cash withdrawal" }
      CHECK_BANKING_DATE: Date
      CHECK_HOLD_DAYS: Count
      DRAFT_NUMBER: string
      ENDING_DRAFT_NUMBER: string
      ACH_COMPANY_ID: string
      ACH_COMPANY_NAME: string
      ACH_OPTION: { '-': "None" } | { D: "Debits only" } | { C: "Credits only" }
      ACH_STOP_COUNT: Count
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      POSTING_POLICY_SERIAL: Serial
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      PLACEMENT_TIME: Time
      EXPIRATION_TIME: Time
      RELEASE_TIME: Time
      LAST_FM_DATE: Date
    }
    SH_NOTE: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      EXPIRATION_DATE: Date
      EXPLANATION: string
      LAST_FM_DATE: Date
    }
    SH_PERSON_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PERSON_SERIAL: Serial
      PERSON_ADDRESS_LINK_SERIAL: Serial
      CATEGORY: { JT: "Joint owner" } | { AS: "Authorized signer" } | { PA: "Power of attorney" } | { TR: "Trustee" } | { CU: "Custodian" } | { GD: "Guardian" } | { CV: "Conservator" } | { RP: "Representative payee" } | { VF: "VA fiduciary" } | { AD: "Administrator" } | { EX: "Executor" } | { ST: "Successor trustee" } | { SC: "Successor custodian" } | { SR: "Settlor" } | { BE: "Beneficiary" } | { BC: "Contingent beneficiary" } | { RB: "Revocable trust beneficiary" } | { RC: "Contingent revocable trust beneficiary" } | { IB: "Irrevocable trust beneficiary" } | { IC: "Contingent irrevocable trust beneficiary" } | { AU: "Authorized user" } | { BO: "Beneficial owner" } | { CP: "Control person" } | { AA: "Additional mailing addressee" } | { OT: "Other related party" }
      CTR_OWNER_OPTION: { N: "No" } | { Y: "Yes" }
      FIDM_OWNER_OPTION: { N: "No" } | { Y: "Yes" }
      TYPE_SERIAL: Serial
      CRED_REP_ECOA_CODE: { '-': "Default" } | { z: "Do not report" } | { '1': "'1' Individual" } | { '2': "'2' Joint contractual liability" } | { '3': "'3' Authorized user" } | { '5': "'5' Comaker or guarantor" } | { '7': "'7' Maker" } | { T: "'T' Association with account terminated" } | { W: "'W' Business or commercial" } | { X: "'X' Consumer deceased" } | { Z: "'Z' Delete consumer" }
      CRED_REP_CONS_INFO_IND: { '-': "Retain previous value" } | { A: "'A ' Petition for chapter 7 bankruptcy" } | { B: "'B ' Petition for chapter 11 bankruptcy" } | { C: "'C ' Petition for chapter 12 bankruptcy" } | { D: "'D ' Petition for chapter 13 bankruptcy" } | { E: "'E ' Discharged through bankruptcy chapter 7" } | { F: "'F ' Discharged through bankruptcy chapter 11" } | { G: "'G ' Discharged through bankruptcy chapter 12" } | { H: "'H ' Discharged through bankruptcy chapter 13" } | { I: "'I ' Chapter 7 bankruptcy dismissed" } | { J: "'J ' Chapter 11 bankruptcy dismissed" } | { K: "'K ' Chapter 12 bankruptcy dismissed" } | { L: "'L ' Chapter 13 bankruptcy dismissed" } | { M: "'M ' Chapter 7 bankruptcy withdrawn" } | { N: "'N ' Chapter 11 bankruptcy withdrawn" } | { O: "'O ' Chapter 12 bankruptcy withdrawn" } | { P: "'P ' Chapter 13 bankruptcy withdrawn" } | { Z: "'Z ' Bankruptcy - undesignated chapter" } | { '1A': "'1A' Personal receivership" } | { Q: "'Q ' Remove previously reported bankruptcy or personal receivership" } | { R: "'R ' Chapter 7 reaffirmation of debt" } | { V: "'V ' Chapter 7 reaffirmation of debt rescinded" } | { '2A': "'2A' Lease assumption" } | { S: "'S ' Remove previously reported reaffirmation or rescinded or assumption" } | { T: "'T ' Credit grantor cannot locate consumer" } | { U: "'U ' Consumer now located" }
      CRED_REP_BANKRUPTCY_DATE: Date
      PERCENTAGE: Rate
      ADDITIONAL_STATEMENT_OPTION: { N: "No" } | { Y: "Yes" }
      ADDITIONAL_NOTICE_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    SH_TRANSFER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { O: "Overdraft" } | { W: "Sweep" } | { R: "Round up" } | { S: "Scheduled disbursement" } | { V: "Dividend" } | { M: "Maturity" }
      METHOD: { S: "Savings transfer" } | { L: "Loan transfer" } | { G: "General ledger" } | { C: "Credit union check" }
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      GL_SERIAL: Serial
      GL_CATEGORY: { '-': "General ledger" } | { SM: "Savings file maintenance" } | { SO: "Savings charge off" } | { So: "Savings charge off offset" } | { SG: "Savings reverse charge off" } | { Sg: "Savings reverse charge off offset" } | { SE: "Savings charge off recovery" } | { SD: "Savings deposit" } | { SW: "Savings withdrawal" } | { LM: "Loan file maintenance" } | { LO: "Loan charge off" } | { Lo: "Loan charge off offset" } | { LG: "Loan reverse charge off" } | { Lg: "Loan reverse charge off offset" } | { LE: "Loan charge off recovery" } | { LP: "Loan payment" } | { LA: "Loan advance" } | { LR: "Loan refinance" } | { LN: "Loan new" } | { SI: "Savings dividend" } | { SP: "Savings certificate penalty" } | { SF: "Federal backup withholding" } | { Sf: "Federal distribution withholding" } | { Ss: "State distribution withholding" } | { LI: "Loan interest" } | { LL: "Loan late fee" } | { LU: "Loan unapplied funds" } | { PS: "Participation sold" } | { PR: "Participation repurchase" } | { PA: "Participation advance" } | { PP: "Participation payment" } | { PI: "Participation interest" } | { PL: "Participation late fee" } | { PF: "Participation servicing fee" } | { PY: "Participation payable" } | { FG: "General fee" } | { FN: "NSF fee" } | { FO: "Overlimit fee" } | { Fr: "Advance return fee" } | { FR: "Withdrawal return fee" } | { FX: "Overdraft transfer fee" } | { FC: "Courtesy pay fee" } | { Fd: "Reg D pay fee" } | { FD: "Deposit fee" } | { FP: "Payment fee" } | { FA: "Advance fee" } | { FW: "Withdrawal fee" } | { FT: "Transfer fee" } | { Fk: "Check disbursed fee" } | { Fm: "Money order fee" } | { Ft: "Travelers check fee" } | { Fi: "Inventory sale fee" } | { Ri: "Inventory reload fee" } | { FS: "Stop enforcement fee" } | { Fs: "Stop placement fee" } | { Fh: "Hold placement fee" } | { FL: "Loan maintenance fee" } | { CR: "Cash received" } | { BC: "Bulk cash received" } | { MR: "Cash received cash machine" } | { CD: "Cash disbursed" } | { MD: "Cash disbursed cash machine" } | { CA: "Cash drawer adjustment" } | { CO: "Cash over" } | { CS: "Cash short" } | { Cr: "Cash transfer received" } | { Cd: "Cash transfer disbursed" } | { CT: "Cash transfer clearing" } | { UK: "On-Us corporate check received" } | { UD: "On-Us consumer check received" } | { KR: "Check received" } | { BK: "Bulk check received" } | { KD: "Check disbursed" } | { BP: "Bond redeemed principal" } | { BI: "Bond redeemed interest" } | { DT: "Dispute credit transfer" } | { MS: "Money order sold" } | { TS: "Travelers checks sold" } | { IS: "Inventory sold" } | { IR: "Inventory reloaded" } | { IC: "Inventory cost" } | { AP: "ACH origination withdrawal" } | { AD: "ACH origination deposit" } | { ND: "Shared branch deposit" } | { NP: "Shared branch payment" } | { NA: "Shared branch advance" } | { NW: "Shared branch withdrawal" } | { NU: "Shared branch purchase" } | { NT: "Shared branch transfer" } | { NM: "Shared branch miscellaneous" } | { DG: "Direct general ledger" }
      PERSON_ADDR_LINK_SERIAL: Serial
      SECOND_PERSON_SERIAL: Serial
      PERCENTAGE: Rate
      AMOUNT: Money
      AMOUNT_OVERRIDE: { '-': "None" } | { P: "Loan payment" } | { p: "Loan payment if it exceeds amount" } | { Q: "25% of Loan payment" } | { H: "50% of Loan payment" } | { D: "Loan due amount" } | { d: "Loan due amount if it exceeds amount" } | { B: "Loan cycle balance" } | { b: "Loan cycle balance if it exceeds amount" } | { C: "Loan cycle balance less credits" } | { c: "Loan cycle balance less credits if it exceeds amount" } | { A: "Available balance" } | { S: "Available balance in excess of amount" }
      REFERENCE: string
      STATEMENT_DESCRIPTION: string
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      DONOR_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      RECIPIENT_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      SPECIFIED_WITHHOLDING_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_FEDERAL_WITHHOLD_AMT: Money
      SPECIFIED_FEDERAL_WITHHOLD_PCT: Rate
      SPECIFIED_STATE_WITHHOLD_AMT: Money
      SPECIFIED_STATE_WITHHOLD_PCT: Rate
      GROUP_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      LAST_ATTEMPT_DATE: Date
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    SH_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      MINIMUM_BALANCE: Money
      MINIMUM_DEPOSIT: Money
      MINIMUM_WITHDRAWAL: Money
      BALANCE_GL_SERIAL: Serial
      BALANCE_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CHARGE_OFF_GL_SERIAL: Serial
      CHARGE_OFF_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      RECOVERY_GL_SERIAL: Serial
      RECOVERY_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      DIVIDEND_GL_SERIAL: Serial
      DIVIDEND_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      DIV_PAYABLE_GL_SERIAL: Serial
      DIV_PAYABLE_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CERT_PEN_GL_SERIAL: Serial
      CERT_PEN_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      EXT_TRAN_GL_SERIAL: Serial
      EXT_TRAN_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      CATEGORY: { S: "Savings" } | { D: "Checking" } | { B: "Club" } | { C: "Certificate" }
      PROCESSING: { N: "Normal" } | { X: "External processor" }
      REG_D_LIMITING: { '-': "None" } | { L: "Limit by calendar month" } | { S: "Limit by statement period" }
      REG_CC_OPTION: { '-': "None" } | { H: "Reg CC check holds" }
      CLOSE_OPTION: { '-': "None" } | { W: "Close on withdrawal to zero balance" }
      CLOSE_FEE_SERIAL: Serial
      DORMANCY_RESTRICTION_DAYS: Count
      CERT_BUMP_LIMIT: Count
      CERT_BUMP_WAIT_DAYS: Count
      COLLECTION_ITEM_TYPE_SERIAL: Serial
      COLLECTION_NOTICE_TYPE_SERIAL: Serial
      APP_FORM_PACKET_SERIAL: Serial
      DEF_LOGIN_WITHDRAWAL_ACCESS: { N: "No" } | { Y: "Yes" }
      DEF_LOGIN_DEPOSIT_ACCESS: { N: "No" } | { Y: "Yes" }
      DEF_LOGIN_INQUIRY_ACCESS: { N: "No" } | { Y: "Yes" }
      AIRES_CODE: string
      LAST_FM_DATE: Date
    }
    SH_YTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      STORED_ACCESS_KEY: string
      TAX_YEAR: Count
      DIVIDEND: Money
      PROMOTIONAL_PREMIUM: Money
      CERT_PENALTY: Money
      FEDERAL_BACKUP_WITHHOLDING: Money
      CERTIFICATE_OID_AMOUNT: Money
      CERTIFICATE_OID_OTHER_INTEREST: Money
      OVERDRAFT_FEE: Money
      RETURNED_ITEM_FEE: Money
      IMPOUND_TAXES_PAID: Money
      IMPOUND_HAZARD_INSURANCE_PAID: Money
      IMPOUND_PMI_PAID: Money
      IMPOUND_REFUND: Money
      ACH_DEPOSIT_COUNT: Count
      ACH_DEPOSIT_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    SCREEN_LAYOUT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    SCREEN_LAYOUT_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      COLUMN_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    SCRIPT: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      CATEGORY: { C: "Client" } | { S: "Server" }
      LANGUAGE: { JS: "JavaScript" } | { J: "Java" }
      DOCUMENTATION: Document
      SOURCE_CODE: Document
      COMPILED_CODE: Binary
      COMPILED_CODE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      COMPILED_CODE_MOD_TIME: Time
      CLIENT_TRAN_WORK_AREA_OPTION: { '-': "None" } | { P: "Pop-up" } | { D: "Default panel" } | { W: "New window" }
      CLIENT_TRAN_W_A_TAB_OPTION: { N: "No" } | { Y: "Yes" }
      CLIENT_FM_WORK_AREA_OPTION: { '-': "None" } | { P: "Pop-up" } | { D: "Default panel" } | { W: "New window" }
      CLIENT_APP_WORK_AREA_OPTION: { '-': "None" } | { P: "Pop-up" } | { D: "Default panel" } | { W: "New window" }
      CLIENT_COLL_WORK_AREA_OPTION: { '-': "None" } | { P: "Pop-up" } | { D: "Default panel" } | { W: "New window" }
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" } | { OD: "On demand" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      EXPANDED_SOURCE_CODE_REQUEST: { N: "No" } | { Y: "Yes" }
      EXPANDED_SOURCE_CODE: string
      LAST_FM_DATE: Date
    }
    SCRIPT_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SCRIPT_SERIAL: Serial
      CLIENT_TRAN_W_A_TAB_OPTION: { N: "No" } | { Y: "Yes" }
      ROLE_SERIAL: Serial
      USER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    SECURITY_EVENT: {
      SERIAL: Serial
      ACCESS_KEY: string
      CATEGORY: { '-': "None" } | { TBL_S: "Table Search" } | { TBL_V: "Table View" } | { TBL_I: "Table Insert" } | { TBL_IFD: "Table Insert From Default" } | { TBL_U: "Table Update" } | { TBL_D: "Table Delete" } | { TBL_M: "Table Move" } | { COL_G: "Column Get" } | { COL_S: "Column Set" } | { CUS: "Custom" } | { CUS_V: "Custom View" } | { CUS_FM: "Custom FM" } | { CUS_MON: "Custom Monetary" }
      EVENT: { '-': "None" } | { TBL_S: "Table Search" } | { TBL_V: "Table View" } | { TBL_I: "Table Insert" } | { TBL_IFD: "Table Insert From Default" } | { TBL_U: "Table Update" } | { TBL_D: "Table Delete" } | { TBL_M: "Table Move" } | { COL_G: "Column Get" } | { COL_S: "Column Set" } | { CUS: "Custom" } | { CUS_V: "Custom view" } | { CUS_FM: "Custom file maintenance" } | { CUS_MON: "Custom monetary" } | { PE_RES_V: "Person restricted view" } | { PE_RES_FM: "Person restricted file maintenance" } | { PE_EMP_V: "Person employee view" } | { PE_EMP_FM: "Person employee file maintenance" } | { PE_EMR_V: "Person employee related view" } | { PE_EMR_FM: "Person employee related file maintenance" } | { APP_RES_V: "Application restricted view" } | { APP_RES_FM: "Application restricted file maintenance" } | { APP_EMP_V: "Application employee view" } | { APP_EMP_FM: "Application employee file maintenance" } | { APP_EMR_V: "Application employee related view" } | { APP_EMR_FM: "Application employee related file maintenance" } | { AC_RES_V: "Account restricted view" } | { AC_RES_FM: "Account restricted file maintenance" } | { AC_RES_MON: "Account restricted monetary transaction" } | { AC_EMP_V: "Account employee view" } | { AC_EMP_FM: "Account employee file maintenance" } | { AC_EMP_MON: "Account employee monetary transaction" } | { AC_EMR_V: "Account employee related view" } | { AC_EMR_FM: "Account employee related file maintenance" } | { AC_EMR_MON: "Account employee related monetary transaction" } | { UA_RES_V: "User Account restricted view" } | { UA_RES_FM: "User Account restricted file maintenance" } | { UA_RES_MON: "User Account restricted monetary transaction" } | { UA_EMP_V: "User Account employee view" } | { UA_EMP_FM: "User Account employee file maintenance" } | { UA_EMP_MON: "User Account employee monetary transaction" } | { UA_EMR_V: "User Account employee related view" } | { UA_EMR_FM: "User Account employee related file maintenance" } | { UA_EMR_MON: "User Account employee related monetary transaction" } | { UA_PRO_V: "User Account prohibited view" } | { UA_PRO_FM: "User Account prohibited file maintenance" } | { UA_PRO_MON: "User Account prohibited monetary transaction" } | { GL_RE1_V: "General Ledger restricted 1 view" } | { GL_RE1_FM: "General Ledger restricted 1 file maintenance" } | { GL_RE1_MON: "General Ledger restricted 1 monetary transaction" } | { GL_RE2_V: "General Ledger restricted 2 view" } | { GL_RE2_FM: "General Ledger restricted 2 file maintenance" } | { GL_RE2_MON: "General Ledger restricted 2 monetary transaction" } | { GL_RE3_V: "General Ledger restricted 3 view" } | { GL_RE3_FM: "General Ledger restricted 3 file maintenance" } | { GL_RE3_MON: "General Ledger restricted 3 monetary transaction" } | { GL_RE4_V: "General Ledger restricted 4 view" } | { GL_RE4_FM: "General Ledger restricted 4 file maintenance" } | { GL_RE4_MON: "General Ledger restricted 4 monetary transaction" } | { GL_RE5_V: "General Ledger restricted 5 view" } | { GL_RE5_FM: "General Ledger restricted 5 file maintenance" } | { GL_RE5_MON: "General Ledger restricted 5 monetary transaction" } | { GL_RE6_V: "General Ledger restricted 6 view" } | { GL_RE6_FM: "General Ledger restricted 6 file maintenance" } | { GL_RE6_MON: "General Ledger restricted 6 monetary transaction" } | { GL_RE7_V: "General Ledger restricted 7 view" } | { GL_RE7_FM: "General Ledger restricted 7 file maintenance" } | { GL_RE7_MON: "General Ledger restricted 7 monetary transaction" } | { GL_RE8_V: "General Ledger restricted 8 view" } | { GL_RE8_FM: "General Ledger restricted 8 file maintenance" } | { GL_RE8_MON: "General Ledger restricted 8 monetary transaction" } | { GL_RE9_V: "General Ledger restricted 9 view" } | { GL_RE9_FM: "General Ledger restricted 9 file maintenance" } | { GL_RE9_MON: "General Ledger restricted 9 monetary transaction" } | { GLP_O: "Post a GL original entry" } | { GLP_F: "Post a GL final entry" } | { GLP_EDF: "Post an effective dated GL final entry" } | { GLP_NDC: "Post a GL negative debit or credit" } | { TRP: "Post a transaction result entry" } | { PI_CPS: "Posting item change posted status" } | { PST: "View monetary posting status" } | { PST_PND: "Posting policy not default" } | { PST_ED: "Post an effective dated member transaction" } | { DEP: "Deposit" } | { DEP_PA: "Deposit positive adjustment" } | { DEP_NA: "Deposit negative adjustment" } | { DEP_AD: "Deposit to delinquent account" } | { DEP_DS: "Deposit to dormant savings" } | { DEP_XP: "Deposit to externally processed savings" } | { DEP_RS: "Deposit to restricted savings" } | { DEP_LTM: "Deposit less than minimum" } | { DEP_ATBN: "Deposit adjustment takes balance negative" } | { DEP_BMB: "Deposit below minimum balance" } | { DEP_TPE: "Deposit to Tax Plan exceeds annual limit" } | { DEP_TPAC: "Deposit to Tax Plan after tax year cutoff" } | { DEP_CEAL: "Deposit to Coverdell ESA with beneficiary 18 or older" } | { DEP_TIAL: "Deposit to IRA for year on or after owner turns 70 1/2" } | { PMT: "Payment" } | { PMT_PA: "Payment positive adjustment" } | { PMT_NAS: "Payment negative adjustment with specified breakdown" } | { PMT_NAU: "Payment negative adjustment with unspecified breakdown" } | { PMT_AD: "Payment to delinquent account" } | { PMT_DS: "Payment to dormant loan" } | { PMT_XP: "Payment to externally processed loan" } | { PMT_TBBM: "Payment takes principal balance below minimum" } | { PMT_TBNCE: "Payment takes closed end principal balance negative" } | { PMT_TBNOE: "Payment takes open end principal balance negative" } | { PMT_TBNLC: "Payment takes line of credit principal balance negative" } | { PMT_TBNCC: "Payment takes credit card principal balance negative" } | { PMT_TCF: "Payment takes close fee" } | { PMT_LTLFD: "Payment does not cover late fee due" } | { PMT_PPBNI: "Payment payoff of principal but not interest" } | { PMT_IPP: "Payment of prepaid monthly interest" } | { PMT_MPP: "Payment of partial monthly payment" } | { PMT_OPP: "Payment of partial payment" } | { PMT_WLF: "Payment late fee waive" } | { PMT_ADD: "Payment is additional" } | { PMT_PRO: "Payment of principal only" } | { PMT_PRODQ: "Payment of principal only even though delinquent" } | { PMT_IMAND: "Payment escrow amount different from default" } | { PMT_LFAND: "Payment late fee amount different from default" } | { PMT_MFAND: "Payment maintenance fee amount different from default" } | { PMT_INAND: "Payment interest amount different from default" } | { PMT_UFAND: "Payment unapplied funds amount different from default" } | { ADV: "Advance" } | { ADV_PA: "Advance positive adjustment" } | { ADV_NA: "Advance negative adjustment" } | { ADV_HP: "Advance hold placement" } | { ADV_HR: "Advance hold release" } | { ADV_AD: "Advance from delinquent account" } | { ADV_DS: "Advance from dormant loan" } | { ADV_XP: "Advance from externally processed loan" } | { ADV_LTM: "Advance less than minimum" } | { ADV_ATBN: "Advance adjustment takes balance negative" } | { ADV_BMB: "Advance below minimum balance" } | { ADV_MI: "Advance from monthly interest loan" } | { ADV_CE: "Advance from closed end loan" } | { ADV_OE: "Advance from open end loan" } | { ADV_DQ: "Advance from delinquent loan" } | { ADV_OVL: "Advance over limit" } | { ADV_ESSA: "Advance exceeds savings secured available" } | { ADVS: "Advance from loan segment" } | { ADVS_PA: "Advance from loan segment positive adjustment" } | { ADVS_NA: "Advance from loan segment negative adjustment" } | { ADVS_BMB: "Advance from loan segment below minimum required" } | { ADVS_WEB: "Advance from loan segment with existing balance" } | { ADVS_AND: "Advance from loan segment amount different from default" } | { WDL: "Withdrawal" } | { WDL_PA: "Withdrawal positive adjustment" } | { WDL_NA: "Withdrawal negative adjustment" } | { WDL_HP: "Withdrawal hold placement" } | { WDL_HR: "Withdrawal hold release" } | { WDL_AD: "Withdrawal from delinquent account" } | { WDL_DS: "Withdrawal from dormant savings" } | { WDL_XP: "Withdrawal from externally processed savings" } | { WDL_RS: "Withdrawal from restricted savings" } | { WDL_LTM: "Withdrawal less than minimum" } | { WDL_TBN: "Withdrawal takes balance negative" } | { WDL_BMB: "Withdrawal below minimum balance" } | { WDL_ERDL: "Withdrawal exceeds Reg D limit" } | { WDL_BAB: "Withdrawal below available" } | { WDL_CPAND: "Withdrawal certificate penalty amount different from default" } | { WDL_WHAND: "Withdrawal withholding amount different from default" } | { XFR: "Transfer" } | { XFR_BCNCA: "Transfer between a corporate and a non-corporate account" } | { REF: "Refinance" } | { REF_PA: "Refinance positive adjustment" } | { REF_NA: "Refinance negative adjustment" } | { REF_TBN: "Refinance takes balance negative" } | { REF_BMB: "Refinance below minimum balance" } | { REF_IMAND: "Refinance escrow amount different from default" } | { REF_LFAND: "Refinance late fee amount different from default" } | { REF_MFAND: "Refinance maintenance fee amount different from default" } | { REF_INAND: "Refinance interest amount different from default" } | { REF_WEB: "Refinance without an existing balance" } | { REF_EL: "Refinance exceeds limit" } | { REF_ESSA: "Refinance exceeds savings secured available" } | { NEW: "New loan" } | { NEW_PA: "New loan positive adjustment" } | { NEW_NA: "New loan negative adjustment" } | { NEW_LTMA: "New loan less than minimum advance" } | { NEW_ATBN: "New loan adjustment takes balance negative" } | { NEW_BMB: "New loan below minimum balance" } | { NEW_WEB: "New loan with existing balance" } | { NEW_EL: "New loan exceeds limit" } | { NEW_ESSA: "New loan exceeds savings secured available" } | { FEE: "Savings or loan fee" } | { FEE_PA: "Savings or loan fee positive adjustment" } | { FEE_NA: "Savings or loan fee negative adjustment" } | { CMT: "Comment posting" } | { DIV: "Dividend" } | { DIV_PA: "Dividend positive adjustment" } | { DIV_NA: "Dividend negative adjustment" } | { DIV_EXA: "Dividend extraordinary amount" } | { S_CHG_R: "Savings charge off recovery" } | { S_CHG_A: "Savings charge off additional" } | { S_CHG_O: "Savings charge off other" } | { L_CHG_R: "Loan charge off recovery" } | { L_CHG_A: "Loan charge off additional" } | { L_CHG_O: "Loan charge off other" } | { S_COR: "Savings correction" } | { L_COR: "Loan correction" } | { S_MOV: "Savings move" } | { L_MOV: "Loan move" } | { STP_HP: "Stop payment placement" } | { RTN_D: "Post a returned debit" } | { RTN_C: "Post a returned credit" } | { RTN_NOC: "Post a notification of change" } | { CKH: "Check hold placement" } | { CKH_PND: "Check hold policy not default" } | { CKH_ESA: "Check hold exceeds savings available amount" } | { CKH_ELA: "Check hold exceeds loan available amount" } | { CKH_FM: "Check hold file maintenance" } | { CKR: "Check receive" } | { CKR_NONE: "Check receive check category of none" } | { CKR_NA: "Check receive negative amount" } | { CKR_AA: "Check receive immediate available amount" } | { CKR_TT: "Check receive teller transaction" } | { CKD: "Check disburse" } | { CKD_NA: "Check disburse negative amount" } | { CKD_FAND: "Check disburse fee amount not default" } | { CKI: "Check issue" } | { CKC: "Check reconcile" } | { CPF: "Check payee free form" } | { CPO: "Check payee OFAC match reject" } | { ODD: "On-Us duplicate check number" } | { CR: "Cash receive" } | { CR_NA: "Cash receive negative amount" } | { CR_AA: "Cash receive daily aggregate amount" } | { CR_CM: "Cash receive from cash machine" } | { CR_WOT: "Cash receive without transactor" } | { CR_WOI: "Cash receive without identification" } | { CR_AWOT: "Cash receive aggregate without transactor" } | { CR_AWOI: "Cash receive aggregate without identification" } | { CD: "Cash disburse" } | { CD_NA: "Cash disburse negative amount" } | { CD_AA: "Cash disburse daily aggregate amount" } | { CD_CM: "Cash disburse from cash machine" } | { CD_WOT: "Cash disburse without transactor" } | { CD_WOI: "Cash disburse without identification" } | { CD_AWOT: "Cash disburse aggregate without transactor" } | { CD_AWOI: "Cash disburse aggregate without identification" } | { CT: "Cash transfer" } | { CT_OD: "Cash transfer for another cash drawer" } | { CT_OB: "Cash transfer for another branch" } | { CT_XT: "Cash transfer for external source" } | { CT_WR: "Cash transfer without a request" } | { CA_WD: "Cash transaction without denominations" } | { BKR: "Bulk check receive" } | { BKRE: "Bulk check verify" } | { BKRE_OU: "Bulk check verify other user" } | { BCR: "Bulk cash receive" } | { BCRE: "Bulk cash verify" } | { BCRE_OU: "Bulk cash verify other user" } | { BR: "Bond redemption" } | { BR_NA: "Bond redemption negative amount" } | { BR_O: "Bond redemption of non-standard category" } | { MO: "Money order" } | { MO_NA: "Money order negative amount" } | { MO_AND: "Money order amount not default" } | { MO_FAND: "Money order fee amount not default" } | { TC: "Travelers checks" } | { TC_NA: "Travelers checks negative amount" } | { TC_AND: "Travelers checks amount not default" } | { TC_FAND: "Travelers checks fee amount not default" } | { IS: "Inventory sale" } | { IS_NA: "Inventory sale negative amount" } | { IS_AND: "Inventory sale amount not default" } | { IS_FAND: "Inventory sale fee amount not default" } | { IR: "Inventory reload" } | { IR_FAND: "Inventory reload fee amount not default" } | { PS: "Participation sale" } | { PS_PA: "Participation sale positive adjustment" } | { PS_NA: "Participation sale negative adjustment" } | { PS_WEB: "Participation sale with existing balance" } | { PP: "Participation repurchase" } | { PP_PA: "Participation repurchase positive adjustment" } | { PP_NA: "Participation repurchase negative adjustment" } | { PF: "Participation funding" } | { PF_PA: "Participation funding positive adjustment" } | { PF_NA: "Participation funding negative adjustment" } | { PR: "Participation remittance" } | { PR_PA: "Participation remittance positive adjustment" } | { PR_NA: "Participation remittance negative adjustment" } | { PAA_A: "Participation advance allocation adjustment" } | { PPA_A: "Participation payment allocation adjustment" } | { PC: "Participation comment" } | { CP: "Construction draw" } | { AOP: "ACH originate withdrawal" } | { AOD: "ACH originate deposit" } | { AO_AMT: "ACH origination amount file maintenance" } | { IVE: "Invoice expense" } | { IVP: "Invoice payment" } | { IVE_AO: "Invoice expense approval override" } | { FA: "Fee" } | { FA_NA: "Fee negative amount" } | { FA_AND: "Fee amount not default" } | { RN: "Rental transaction" } | { RN_OB: "Rental transaction for another branch" } | { RN_FND: "Rental transaction amount not default" } | { RN_SFND: "Rental transaction surrender amount not default" } | { TH: "Transaction history" } | { TH_OU: "Transaction history for another user" } | { TH_B: "Transaction history for a batch" } | { STI: "Statement inquiry" } | { TV: "Void a transaction" } | { TV_OU: "Void a transaction by another user" } | { TV_A: "Void a transaction automatically" } | { TOT: "Posting totals" } | { TOT_OU: "Posting totals for another user" } | { TOT_CD: "Posting totals for a cash drawer" } | { TOT_GL: "Posting totals for a GL account" } | { TOT_DP: "Posting totals for a department" } | { TOT_BR: "Posting totals for a branch" } | { TOT_IN: "Posting totals for institution" } | { CDR_V: "Cash drawer view" } | { CDR_VO: "Cash drawer view another drawer" } | { CDR_U: "Cash drawer update" } | { CDR_UO: "Cash drawer update another drawer" } | { CDR_O: "Cash drawer post over" } | { CDR_OO: "Cash drawer post over another drawer" } | { CDR_S: "Cash drawer post short" } | { CDR_SO: "Cash drawer post short another drawer" } | { WQ_V: "Work queue view" } | { WQ_VO: "Work queue view another user" } | { WQ_VQ: "Work queue view a specific queue" } | { WQ_VG: "Work queue view a specific group" } | { CAV: "Void collection activity" } | { CAV_OU: "Void collection activity by another user" } | { AC_NUM: "Account number change" } | { SH_ID: "Savings ID change" } | { LN_ID: "Loan ID change" } | { SH_CPH: "Savings close with pending item hold" } | { AC_CWR: "Account close without reason" } | { SH_CWR: "Savings close without reason" } | { LN_CWR: "Loan close without reason" } | { SH_CEP: "Savings close externally processed with balance" } | { LN_CEP: "Loan close externally processed with balance" } | { COL_OWN: "Shared collateral for non-owner" } | { ADD_UFM: "Address unconfirmed file maintenance" } | { L_CC_OB: "Loan credit card out-of-balance file maintenance" } | { L_CMP: "Loan computation" } | { DV_CMP: "Dividend computation" } | { CE_BMP: "Certificate rate bump" } | { RR_TRN: "Record reference transfer" } | { APP_FI: "Application finance import" } | { APP_MI: "Application MLA status import" } | { APP_SI: "Application scores import" } | { APP_SC: "Application scores calculate" } | { APP_CL: "Application credit limit calculate" } | { APP_RC: "Application rates calculate" } | { APP_DC: "Application debt ratios calculate" } | { APP_DE: "Application decisions calculate" } | { APP_AC: "Application approval and denial authorities calculate" } | { APP_TC: "Application totals calculate" } | { APP_AAE: "Application exceeds approval authority" } | { APP_DAE: "Application exceeds denial authority" } | { APP_PAU: "Application process and approve by the same user" } | { APP_AFU: "Application approve and fund by the same user" } | { APP_DMU: "Application decision maker set to another user" } | { APP_MLU: "Application MLA Limitation of Unknown loan setup" } | { APP_IAA: "Application increase approved amount" } | { APP_USL: "Application update when already finalized" } | { APP_BRF: "Application below minimum references" } | { APP_BEH: "Application below minimum employment history" } | { APP_BAH: "Application below minimum address history" } | { APP_USR_OR: "Application override active user" } | { APP_USR_CH: "Application change active user" } | { APP_PER_OTH: "Application person not an applicant" } | { FND_RES: "Application fund during rescission period" } | { SI_SC: "Loan segment calculate" } | { SI_SS: "Loan segment setup" } | { SI_SIND: "Loan segment interest rate different from default" } | { OPP_EVA: "Opportunity evaluate" } | { OPP_OFU: "Opportunity offer update" } | { BCH_SU: "Batch job submit" } | { BCH_TR: "Batch job terminate" } | { IMP_L: "Import list files" } | { IMP_V: "Import verify file" } | { NET_ST: "Network status" } | { NET_MG: "Network management" } | { NET_CF: "Network card file maintenance" } | { NET_SI: "Network shared branch inquiry" } | { NET_SB: "Network shared branch transaction" } | { NET_FP: "Network shared branch force post transaction" } | { LGR_UP: "Security reset user password" } | { LGR_U: "Security reset user" } | { LGR_D: "Security reset device" } | { LGR_LP: "Security reset login password" } | { LGR_L: "Security reset login" } | { SOV_R: "Security override response" } | { SOV_OG: "Security override outside of group" } | { SEC_COP: "Security change own privileges" } | { SEC_SV: "Security validate session" } | { PST_OU: "Post on behalf of another user" } | { LOG_S: "Login setup" } | { LOG_V: "Login verify" } | { PRT_SCK: "Print starter checks" } | { CRD_AC: "Card activate" } | { CRD_BL: "Card block" } | { CRD_DI: "Card digital issue" } | { CII_P: "Card instant issue print" } | { CII_RP: "Card instant issue reprint" } | { CII_RI: "Card instant issue reissue" } | { CII_RN: "Card instant issue re-PIN" } | { CII_AD: "Card instant issue administration" } | { CRD_REV: "Card transaction reversal" } | { CRD_NRD: "Card number in record description" } | { DIS_PC: "Dispute item provisional credit" } | { DIS_RPC: "Dispute item reverse provisional credit" } | { DIS_WO: "Dispute item write off" } | { DIS_USL: "Dispute update after close" } | { SND_EML: "Send email" } | { SRV_TRC: "Server trace control" }
      TABLE_SERIAL: Serial
      COLUMN_SERIAL: Serial
      DESCRIPTION: string
      SEVERITY: Count
      LOGGING: { F: "Default" } | { N: "None" } | { A: "All attempts" } | { D: "Denied attempts" } | { G: "Granted attempts" } | { P: "Posted transactions" }
      ACCESS: { G: "Grant" } | { W: "Grant with warning" } | { D: "Deny" }
      AMOUNT: Money
      OVERRIDE_ACCESS: { G: "Grant" } | { L: "Grant local override only" } | { D: "Deny" }
      OVERRIDE_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    SECURITY_OVR: {
      SERIAL: Serial
      ACCESS_KEY: string
      STATUS: { R: "Requested" } | { r: "Retracted" } | { D: "Denied" } | { G: "Granted for single use" } | { g: "Granted for multiple use" } | { U: "Utilized" } | { P: "Replaced" } | { E: "Expired" }
      USER_SERIAL: Serial
      DEVICE_SERIAL: Serial
      OVERRIDE_USER_SERIAL: Serial
      OVERRIDE_EXPLANATION: string
      REQUEST_TIME: Time
      RESPONSE_TIME: Time
      EXPIRATION_TIME: Time
      GRANT_OPTION: { N: "No" } | { Y: "Yes" }
      TRANSACTION_XML: Document
      LAST_FM_DATE: Date
    }
    SECURITY_OVR_EVENT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      SECURITY_EVENT_SERIAL: Serial
      AMOUNT: Money
      RESTRICTED_ACCESS_KEY: string
      GRANT_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    SECURITY_OVR_EXPLANATION: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      LAST_FM_DATE: Date
    }
    SHARED_BRANCH_INSTITUTION: {
      SERIAL: Serial
      ACCESS_KEY: string
      ISO_BIN: string
      ROUTING_NUMBER: string
      INSTITUTION_NAME: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      MAIN_PHONE_NUMBER: string
      FAX_NUMBER: string
      SB_SUPPORT_PHONE_NUMBER: string
      NETWORK_ID: string
      URL: string
      TIME_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      MONDAY_OPEN: string
      MONDAY_CLOSE: string
      TUESDAY_OPEN: string
      TUESDAY_CLOSE: string
      WEDNESDAY_OPEN: string
      WEDNESDAY_CLOSE: string
      THURSDAY_OPEN: string
      THURSDAY_CLOSE: string
      FRIDAY_OPEN: string
      FRIDAY_CLOSE: string
      SATURDAY_OPEN: string
      SATURDAY_CLOSE: string
      SUNDAY_OPEN: string
      SUNDAY_CLOSE: string
      LAST_FM_DATE: Date
    }
    SHARED_COVENANT: {
      SERIAL: Serial
      ACCESS_KEY: string
      SHARED_COVENANT_NUMBER: string
      PERSON_SERIAL: Serial
      DESCRIPTION: string
      TYPE_SERIAL: Serial
      STATUS: { U: "Unbroken" } | { B: "Broken" } | { W: "Waived" }
      BROKEN_DATE: Date
      WAIVER_EXPIRATION_DATE: Date
      FREQUENCY: { '-': "None" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { M: "Monthly" }
      DUE_DATE: Date
      GRACE_DAYS: Count
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_REQUESTED_DATE: Date
      LAST_RECEIVED_DATE: Date
      LAST_REVIEWER_USER_SERIAL: Serial
      LAST_REVIEW_DATE: Date
      NEXT_REVIEW_DATE: Date
      EXPLANATION: string
      COMMENT: string
      LAST_FM_DATE: Date
    }
    SHARED_COVENANT_ACTIVITY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TYPE_SERIAL: Serial
      EXPLANATION: string
      PLACEMENT_DATE: Date
      PLACEMENT_TIME: Time
      PLACEMENT_USER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    SPLIT_INTEREST_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      SGMT_RISK_BASED_PRICING_SERIAL: Serial
      SGMT_RISK_B_P_PLAN_SERIAL: Serial
      SGMT_FORM_PACKET_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    STARTER_CHECK_LOG: {
      SERIAL: Serial
      ACCESS_KEY: string
      ROUTING_NUMBER: string
      ACCOUNT_NUMBER: string
      STARTING_CHECK_NUMBER: Count
      ENDING_CHECK_NUMBER: Count
      CHECK_COUNT: Count
      PAYER_1: string
      PAYER_2: string
      PHONE_NUMBER: string
      ADDITIONAL_ADDRESS_LINE: string
      STREET: string
      CITY: string
      STATE: string
      POSTAL_CODE: string
      COUNTRY: string
      COUNTRY_CODE: string
      ADDRESS_FORMAT: { D: "Domestic" } | { L: "Foreign with postal code last" } | { F: "Foreign with postal code first" }
      FORM_ID: { '-': "None" } | { '1': "1" } | { '2': "2" }
      REPRINT_INDICATOR: { N: "No" } | { Y: "Yes" }
      REPRINT_EXPLANATION: string
      POSTING_DATE: Date
      POSTING_TIME: Time
      USER_SERIAL: Serial
      PRINTER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    TAX_STATE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      STATE_CODE: string
      DIST_WH_GL_SERIAL: Serial
      DIST_WH_GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      LAST_FM_DATE: Date
    }
    STMT_CONFIG: {
      SERIAL: Serial
      ACCESS_KEY: string
      MULTIPLE_ACCTS_PER_ENVELOPE: { N: "No" } | { Y: "Yes" }
      ENABLE_HOME_SECURED_FORMATS: { N: "No" } | { Y: "Yes" }
      INCLUDE_TIN: { N: "No" } | { Y: "Yes" }
      LOAN_SUMMARY_OPTION: { '-': "None" } | { I: "Include loan summary with savings statements" }
      ACCOUNT_TOTALS_OPTION: { '-': "None" } | { I: "Include ending summary for all savings and loans" }
      RMD_AMOUNT_OPTION: { C: "Calculate sole beneficiary not spouse 10 years younger" } | { T: "Pull from Tax Plan else calculate sole beneficiary not spouse 10 years younger" }
      INQUIRY_ACCOUNT_NUMBER_MASK: string
      INQUIRY_LOGO_IMAGE: Binary
      INQUIRY_LOGO_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      INQUIRY_LOGO_IMAGE_MOD_TIME: Time
      INQUIRY_LOGO_IMAGE_SIZE: Count
      MAX_INQUIRY_LOGO_IMAGE_SIZE: Count
      LAST_FM_DATE: Date
    }
    STMT_CUTOFF_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      FREQUENCY: { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { LP: "Loan payment frequency" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAYS_BEFORE_EOM: Count
      FREQUENCY_DAYS_BEFORE_DUE: Count
      STMT_CUTOFF_PRIOR_DATE: Date
      STMT_CUTOFF_LAST_DATE: Date
      STMT_CUTOFF_NEXT_DATE: Date
      LAST_BATCH_POSTING_DATE: Date
      LAST_BATCH_SERIAL: Serial
      ANALYSIS_CUTOFF_PRIOR_DATE: Date
      ANALYSIS_CUTOFF_LAST_DATE: Date
      ANALYSIS_CUTOFF_NEXT_DATE: Date
      ANALYSIS_LAST_POSTING_DATE: Date
      ANALYSIS_LAST_BATCH_SERIAL: Serial
      PARTICIP_CUTOFF_PRIOR_DATE: Date
      PARTICIP_CUTOFF_LAST_DATE: Date
      PARTICIP_CUTOFF_NEXT_DATE: Date
      PARTICIP_LAST_POSTING_DATE: Date
      PARTICIP_LAST_BATCH_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    STMT_MAIL_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    TABLES: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      TABLE_NAME: string
      PARENT_TABLE_SERIAL: Serial
      DEFAULTS_TABLE_SERIAL: Serial
      ACCESS_KEY_PREFIX: string
      FM_VALIDATION_SCRIPT_SERIAL: Serial
      TABLE_REPLICATION: { '-': "None" } | { C: "Database log enabled for replication" }
      LAST_FM_DATE: Date
    }
    TAX_1099AC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TAX_YEAR: Count
      SHARE_SERIAL: Serial
      LOAN_SERIAL: Serial
      IRS_FORM_OPTION: { A: "Form 1099-A" } | { C: "Form 1099-C" }
      AMOUNT_OF_DEBT: Money
      INTEREST_IF_INCLUDED: Money
      FAIR_MARKET_VALUE: Money
      EVENT_DATE: Date
      DEBT_DESCRIPTION: string
      IDENTIFIABLE_EVENT_CODE: { A: "Bankruptcy" } | { B: "Other judicial debt relief" } | { C: "Statute of limitations or expiration of deficiency period" } | { D: "Foreclosure election" } | { E: "Debt relief from probate or similar proceeding" } | { F: "By agreement" } | { G: "Creditor's debt collection policy" } | { h: "Expiration of non-payment testing period (through 2016)" } | { H: "Other actual discharge before identifiable event" }
      PERSONAL_LIABILITY_INDICATOR: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    TAX_1099MISC: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TAX_YEAR: Count
      NON_EMPLOYEE_COMPENSATION: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      RENTS: Money
      ROYALTIES: Money
      OTHER_INCOME: Money
      FISHING_BOAT_PROCEEDS: Money
      MEDICAL_HEALTH_CARE_PAYMENTS: Money
      SUBSTITUTE_PAYMENTS: Money
      CROP_INSURANCE_PROCEEDS: Money
      EXCESS_GOLDEN_PARACHUTE: Money
      GROSS_PROCEEDS_TO_ATTORNEY: Money
      SECTION_409A_DEFERRALS: Money
      SECTION_409A_INCOME: Money
      DIRECT_SALES: Money
      FED_INCOME_TAX_WITHHELD_MISC: Money
      LAST_FM_DATE: Date
    }
    TAX_1099R: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TAX_YEAR: Count
      TAX_STATE_SERIAL: Serial
      TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      TAXABLE_AMOUNT_SPECIFIED: { N: "No" } | { Y: "Yes" }
      GROSS_DISTRIBUTION: Money
      TAXABLE_AMOUNT: Money
      FEDERAL_INCOME_TAX_WITHHELD: Money
      STATE_INCOME_TAX_WITHHELD: Money
      LAST_FM_DATE: Date
    }
    TAX_5498: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TAX_YEAR: Count
      CONTRIBS_CURR_YEAR: Money
      CONTRIBS_PREV_YEAR: Money
      EMPLOYER_CURR_YEAR: Money
      EMPLOYER_PREV_YEAR: Money
      ROLLOVER_CONTRIBS: Money
      ROTH_CONVERSION_AMOUNT: Money
      RECHARACTERIZED_CONTRIBS: Money
      FAIR_MARKET_VALUE_PREV_YEAR: Money
      LAST_FM_DATE: Date
    }
    TAX_5498_SPECIAL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      SPECIAL_REPORTING_CODE: { '-': "None" } | { FD: "'FD' Federally designated disaster area" } | { QR: "'QR' Repayment of a qualified reservist distribution" } | { BA: "'BA' Repayment of a qualified birth or adoption distribution" } | { DD: "'DD' Repayment of a federally designated disaster distribution" } | { PO: "'PO' Rollover of qualified plan loan offset amount" } | { SC: "'SC' Late rollover certified by participant" } | { '39': "'EO13239' Afghanistan" } | { '44': "'EO12744' Arabian Peninsula" } | { '19': "'EO13119' Yugoslavia" } | { '97': "'PL115-97' Sinai Peninsula of Egypt" } | { AF: "'AF' Allied Force - No Longer Applicable" } | { EF: "'EF' Enduring Freedom - No Longer Applicable" } | { IF: "'IF' Iraqi Freedom - No Longer Applicable" }
      SPECIAL_REPORTING_YEAR: Count
      SPECIAL_REPORTING_AMOUNT: Money
      LAST_FM_DATE: Date
    }
    TAX_BOND_RED: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      TAX_YEAR: Count
      SAVINGS_BOND_INTEREST: Money
      FEDERAL_BACKUP_WITHHOLDING: Money
      LAST_FM_DATE: Date
    }
    TAX_PLAN: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TAX_PERSON_SERIAL: Serial
      CATEGORY: { RI: "Roth IRA" } | { IR: "Inherited Roth IRA" } | { TI: "Traditional IRA" } | { CI: "Conduit Traditional IRA" } | { IT: "Inherited Traditional IRA" } | { SE: "SEP IRA" } | { SR: "SARSEP IRA" } | { SI: "SIMPLE IRA" } | { SK: "SIMPLE 401K" } | { '4K': "401K" } | { CE: "Coverdell ESA" } | { HS: "HSA" } | { AM: "Archer MSA" }
      TYPE_SERIAL: Serial
      DESCRIPTION: string
      FEDERAL_WITHHOLDING_W4R_RCVD: { N: "No" } | { Y: "Yes" }
      FEDERAL_WITHHOLDING_W4R_PCNT: Rate
      FEDERAL_WITHHOLDING_W4R_AMT: Money
      FEDERAL_WITHHOLDING_FORM_RCVD: { N: "No" } | { Y: "Version 2021 or earlier" } | { '2': "Version 2022 or later" }
      FEDERAL_WITHHOLDING_STATUS: { E: "Exempt" } | { S: "Single" } | { M: "Married" } | { H: "Head of household" } | { P: "Specific percentage" }
      FEDERAL_WITHHOLDING_ALLOWANCES: Count
      FEDERAL_WITHHOLDING_INCOME: Money
      FEDERAL_WITHHOLDING_CREDITS: Money
      FEDERAL_WITHHOLDING_OTHER_INC: Money
      FEDERAL_WITHHOLDING_DEDUCTIONS: Money
      FEDERAL_WITHHOLDING_AMOUNT: Money
      FEDERAL_WITHHOLDING_PERCENTAGE: Rate
      STATE_WITHHOLDING_FORM_RCVD: { N: "No" } | { Y: "Yes" }
      STATE_WITHHOLDING_STATUS: { E: "Exempt" } | { S: "Single" } | { M: "Married" } | { H: "Head of household" } | { A: "Specific amount" } | { P: "Specific percentage" }
      STATE_WITHHOLDING_ALLOWANCES: Count
      STATE_WITHHOLDING_DEDUCTIONS: Count
      STATE_WITHHOLDING_AMOUNT: Money
      STATE_WITHHOLDING_PERCENTAGE: Rate
      RMD_OWNER_BIRTH_DATE: Date
      RMD_OWNER_DEATH_DATE: Date
      RMD_OWNER_OPTION: { '-': "None" } | { D: "Surviving spouse died prior to date distributions begin" }
      RMD_BENEFICIARY_BIRTH_DATE: Date
      RMD_BENEFICIARY_DEATH_DATE: Date
      RMD_BENEFICIARY_OPTION: { '-': "None" } | { S: "Sole beneficiary is spouse" } | { N: "Beneficiary is not an individual" } | { T: "Beneficiary must use the 10 year rule" }
      RMD_SPECIFIED_OPTION: { C: "Use calculated" } | { S: "Use specified" } | { L: "Use specified if it exceeds calculated" }
      RMD_SPECIFIED_AMOUNT: Money
      RMD_CALCULATED_AMOUNT: Money
      RMD_CALCULATED_YEAR: Count
      RMD_FAIR_MARKET_VALUE: Money
      RMD_FIVE_YEAR_RULE: { N: "No" } | { Y: "Yes" }
      RMD_TEN_YEAR_RULE: { N: "No" } | { Y: "Yes" }
      CONTRIB_YEAR_DEFAULT: { C: "Current" } | { P: "Previous" }
      HSA_HDHP_COVERAGE: { '-': "None" } | { S: "Self-only" } | { F: "Family" }
      HOLDING_PERIOD_START_DATE: Date
      DECEDENT_BENEF_PERSON_SERIAL: Serial
      FAIR_MARKET_VALUE_ON_DEATH: Money
      LAST_FM_DATE: Date
    }
    TP_PERSON_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      PERSON_SERIAL: Serial
      CATEGORY: { PA: "Power of attorney" } | { TR: "Trustee" } | { CU: "Custodian" } | { GD: "Guardian" } | { CV: "Conservator" } | { RP: "Representative payee" } | { VF: "VA fiduciary" } | { AD: "Administrator" } | { EX: "Executor" } | { ST: "Successor trustee" } | { SC: "Successor custodian" } | { BE: "Beneficiary" } | { BC: "Contingent beneficiary" } | { OT: "Other related party" }
      TYPE_SERIAL: Serial
      PERCENTAGE: Rate
      LAST_FM_DATE: Date
    }
    TP_TRANSFER: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      METHOD: { S: "Savings transfer" } | { C: "Credit union check" }
      SHARE_SERIAL: Serial
      PERSON_ADDR_LINK_SERIAL: Serial
      SECOND_PERSON_SERIAL: Serial
      PERCENTAGE: Rate
      AMOUNT: Money
      REFERENCE: string
      REG_E_OPTION: { '-': "No" } | { E: "Reg E" } | { R: "Reg E recurring" }
      REG_D_OPTION: { '-': "No" } | { D: "Reg D" }
      DONOR_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      RECIPIENT_TAX_DETAIL_CATEGORY: { '-': "None" } | { CIC: "Contribution for current year" } | { CIP: "Contribution for previous year" } | { CEC: "Contribution by employer for current year" } | { CEP: "Contribution by employer for previous year" } | { CRO: "Contribution}|{ rollover" } | { CRC: "Contribution}|{ Roth conversion" } | { CRE: "Contribution}|{ recharacterization" } | { cFD: "5498 'FD' Federally designated disaster area" } | { cQR: "5498 'QR' Repayment of a qualified reservist distribution" } | { cBA: "5498 'BA' Repayment of a qualified birth or adoption distribution" } | { cDD: "5498 'DD' Repayment of a federally designated disaster distribution" } | { cPO: "5498 'PO' Rollover of qualified plan loan offset amount" } | { cSC: "5498 'SC' Late rollover certified by participant" } | { c39: "5498 'EO13239' Afghanistan" } | { c44: "5498 'EO12744' Arabian Peninsula" } | { c19: "5498 'EO13119' Yugoslavia" } | { c97: "5498 'PL115-97' Sinai Peninsula of Egypt" } | { cAF: "5498 'AF' Allied Force - No Longer Applicable" } | { cEF: "5498 'EF' Enduring Freedom - No Longer Applicable" } | { cIF: "5498 'IF' Iraqi Freedom - No Longer Applicable" } | { UD: "Unreportable deposit" } | { RJ: "1099-R 'J ' Roth IRA early distribution" } | { RJ8: "1099-R 'J8' Roth IRA early distribution}|{ excess current year" } | { RJP: "1099-R 'JP' Roth IRA early distribution}|{ excess previous year" } | { RT: "1099-R 'T ' Roth IRA distribution exception applies" } | { RQ: "1099-R 'Q ' Roth IRA qualified distribution" } | { R1: "1099-R '1 ' Early distribution no exception" } | { R2: "1099-R '2 ' Early distribution exception applies" } | { R3: "1099-R '3 ' Disability" } | { R4: "1099-R '4 ' Death" } | { R4A: "1099-R '4A' Death}|{ may be eligible for 10-year tax option" } | { R7: "1099-R '7 ' Normal distribution" } | { R7A: "1099-R '7A' Normal}|{ may be eligible for 10-year tax option" } | { RN: "1099-R 'N ' Recharacterized IRA contribution for current year" } | { RR: "1099-R 'R ' Recharacterized IRA contribution for previous year" } | { RG: "1099-R 'G ' Direct rollover" } | { RG4: "1099-R 'G4' Direct rollover}|{ death" } | { R8: "1099-R '8 ' Excess plus earnings taxable in current year" } | { R81: "1099-R '81' Excess current year}|{ early no exception" } | { R82: "1099-R '82' Excess current year}|{ early exception applies" } | { R84: "1099-R '84' Excess current year}|{ death" } | { RP: "1099-R 'P ' Excess plus earnings taxable in previous year" } | { RP1: "1099-R 'P1' Excess previous year}|{ early no exception" } | { RP2: "1099-R 'P2' Excess previous year}|{ early exception applies" } | { RP4: "1099-R 'P4' Excess previous year}|{ death" } | { RL: "1099-R 'L ' Loans treated as deemed distributions" } | { RL1: "1099-R 'L1' Loans deemed distributions}|{ early no exception" } | { RL4: "1099-R 'L4' Loans deemed distributions}|{ death" } | { R5: "1099-R '5 ' Prohibited transaction" } | { R6: "1099-R '6 ' Section 1035 exchange" } | { R9: "1099-R '9 ' Cost of current life insurance protection" } | { RE: "1099-R 'E ' Distributions under EPCRS" } | { RF: "1099-R 'F ' Charitable gift annuity" } | { RS: "1099-R 'S ' Early distribution from SIMPLE IRA first two years" } | { Q1: "1099-Q '1 ' Distribution" } | { Q2: "1099-Q '2 ' Excess plus earnings taxable current year" } | { Q3: "1099-Q '3 ' Excess plus earnings taxable previous year" } | { Q4: "1099-Q '4 ' Disability" } | { Q5: "1099-Q '5 ' Death" } | { Q6: "1099-Q '6 ' Prohibited transaction" } | { Q1T: "1099-Q '1T' Trustee-to-trustee transfer" } | { Q1N: "1099-Q '1N' Not beneficiary}|{ distribution" } | { Q2N: "1099-Q '2N' Not beneficiary}|{ excess plus earnings taxable current year" } | { Q3N: "1099-Q '3N' Not beneficiary}|{ excess plus earnings taxable previous year" } | { Q4N: "1099-Q '4N' Not beneficiary}|{ disability" } | { Q5N: "1099-Q '5N' Not beneficiary}|{ death" } | { Q6N: "1099-Q '6N' Not beneficiary}|{ prohibited transaction" } | { S1: "1099-SA '1' Normal distribution" } | { S2: "1099-SA '2' Excess contribution" } | { S3: "1099-SA '3' Disability" } | { S4: "1099-SA '4' Death distribution other than code 6" } | { S5: "1099-SA '5' Prohibited transaction" } | { S6: "1099-SA '6' Death distribution after death year to nonspouse" } | { UW: "Unreportable withdrawal" }
      SPECIFIED_WITHHOLDING_OPTION: { N: "No" } | { Y: "Yes" }
      SPECIFIED_FEDERAL_WITHHOLD_AMT: Money
      SPECIFIED_FEDERAL_WITHHOLD_PCT: Rate
      SPECIFIED_STATE_WITHHOLD_AMT: Money
      SPECIFIED_STATE_WITHHOLD_PCT: Rate
      GROUP_SERIAL: Serial
      FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      FREQUENCY_DAY_1: Count
      FREQUENCY_DAY_2: Count
      SKIP_COUNT: Count
      SKIP_START_MONTH: Count
      SKIP_START_DAY: Count
      LAST_ATTEMPT_DATE: Date
      LAST_POSTING_DATE: Date
      NEXT_POSTING_DATE: Date
      EFFECTIVE_DATE: Date
      EXPIRATION_DATE: Date
      LAST_FM_DATE: Date
    }
    TAX_PLAN_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    TRANSACTION: {
      SERIAL: Serial
      STATUS: { P: "Posted" } | { V: "Voided" }
      CATEGORY: { A: "Approved" } | { D: "Declined" }
      PERSON_SERIAL: Serial
      USER_SERIAL: Serial
      OVERRIDE_USER_SERIAL: Serial
      OVERRIDE_CATEGORY: { S: "Security" } | { B: "On behalf" }
      DEVICE_SERIAL: Serial
      BRANCH_SERIAL: Serial
      BATCH_SERIAL: Serial
      SECURITY_SEVERITY: Count
      POSTING_DATE: Date
      POSTING_TIME: Time
    }
    TRANSACTION_RESULT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      SYSTEM_GENERATED: { '-': "No" } | { A: "No reversing" } | { a: "No reversing and privilege required" } | { G: "Yes" } | { g: "Privilege required" } | { U: "Reverse as Update" }
      TARGET_ACCESS_KEY: string
      CATEGORY: { I: "Information" } | { W: "Warning" } | { E: "Exception" } | { e: "Overridden exception" } | { D: "Security log}|{ privilege denied" } | { G: "Security log}|{ privilege granted" }
      REASON: { '-': "None" } | { SNF: "Session not found" } | { ANF: "Account not found" } | { LAD: "Login access denied" } | { CLS: "Closed" } | { NAU: "Not authorized" } | { DNE: "Deceased" } | { RVK: "Revoked" } | { STP: "Stopped" } | { NSU: "NSF due to uncollected funds" } | { NSD: "NSF due to Reg D transfer limit" } | { NSF: "NSF" } | { OVL: "Loan over limit" } | { RDL: "Reg D limit" } | { DQL: "Delinquent loan" } | { GOB: "GL entries do not balance" } | { CHT: "Check hold requires a Savings or Loan to be specified" } | { OTH: "Other" }
      SECURITY_EVENT_SERIAL: Serial
      SECURITY_SEVERITY: Count
      IDENTIFIER: { '-': "General" } | { SOE: "Security override explanation" } | { TVB: "Transaction void begin" } | { TVM: "Transaction void monetary" } | { TVE: "Transaction void end" } | { LRR: "Loan correction required" } | { DPD: "Delinquent payment due date" } | { TRA: "Remaining transfer amount" } | { CTE: "Currency transaction explanation" } | { PAU: "Person authentication" } | { SMO: "Savings move old" } | { SMN: "Savings move new" } | { LMO: "Loan move old" } | { LMN: "Loan move new" }
      DESCRIPTION: string
      DATA_TYPE: { N: "None" } | { S: "Text" } | { M: "Money" } | { R: "Rate" } | { D: "Date" } | { T: "Time" } | { O: "Option" } | { E: "Serial" } | { C: "Count" } | { L: "Document" } | { B: "Binary" }
      CONTENTS: string
    }
    TRANSFER_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      LAST_FM_DATE: Date
    }
    TRAVELERS_CHECK_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      INVENTORY_TYPE_SERIAL: Serial
      GL_SERIAL: Serial
      GL_BRANCH_ACCTING: { '-': "None" } | { A: "Account branch" } | { O: "Originating branch" }
      FEE_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    TROUBLED_DEBT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      TYPE_SERIAL: Serial
      CATEGORY: { R: "Repossession" } | { F: "Foreclosure" } | { M: "Modification" } | { T: "Restructuring" } | { B: "Bankruptcy" } | { L: "Legal action" }
      DESCRIPTION: string
      EXPLANATION: string
      DEALER_PERSON_SERIAL: Serial
      REPO_AGENCY_PERSON_SERIAL: Serial
      REPOSSESSION_REQUEST_DATE: Date
      REPOSSESSION_DATE: Date
      SENT_TO_AUCTION_DATE: Date
      REPOSSESSION_EXPENSES: Money
      MBP_AMOUNT: Money
      MBP_REFUND_AMOUNT: Money
      MBP_REFUND_REQUEST_DATE: Date
      MBP_REFUND_RECEIVED_DATE: Date
      GAP_AMOUNT: Money
      GAP_REFUND_AMOUNT: Money
      GAP_REFUND_REQUEST_DATE: Date
      GAP_REFUND_RECEIVED_DATE: Date
      LIFE_AMOUNT: Money
      LIFE_REFUND_AMOUNT: Money
      LIFE_REFUND_REQUEST_DATE: Date
      LIFE_REFUND_RECEIVED_DATE: Date
      DIS_AMOUNT: Money
      DIS_REFUND_AMOUNT: Money
      DIS_REFUND_REQUEST_DATE: Date
      DIS_REFUND_RECEIVED_DATE: Date
      PREFORE_NOTICE_SENT_DATE: Date
      WORKOUT_OPT_SENT_DATE: Date
      ACTION_DATE: Date
      UTILITIES_SWITCHED_DATE: Date
      TAXES_PAID: Money
      EVICTION_FEES: Money
      IMPOUND_AMOUNT: Money
      INSURANCE_AMOUNT: Money
      LEGAL_FEES: Money
      OTHER_EXPENSES: Money
      PAYOFF_BALANCE_AND_EXPENSES: Money
      LEGAL_SALE_DATE: Date
      ACTUAL_SALE_DATE: Date
      ACTUAL_SALE_AMOUNT: Money
      PROCESSING_DATE: Date
      MODIFICATION_START_DATE: Date
      MODIFICATION_END_DATE: Date
      DELINQUENCY_DAYS: Count
      OLD_CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      OLD_CREDIT_SCORE: Count
      NEW_CREDIT_SCORE_CATEGORY: { '-': "None" } | { XE: "Experian Auto" } | { XB: "Experian Bankruptcy" } | { XBP: "Experian Bankruptcy PLUS" } | { X5: "Experian Bankruptcy Watch" } | { XG: "Experian Collect Score" } | { XX: "Experian Credit Union" } | { X1: "Experian Cross View Score" } | { Xfs: "Experian Fast Start CU 6.99" } | { XI: "Experian FICO" } | { XF: "Experian FICO V2" } | { XAA: "Experian FICO V3" } | { XAF: "Experian FICO V8" } | { XF9: "Experian FICO V9" } | { XM: "Experian FICO Advanced" } | { XM2: "Experian FICO Advanced V2" } | { X7: "Experian FICO Auto" } | { XV: "Experian FICO Auto V2" } | { XAB: "Experian FICO Auto V3" } | { XAG: "Experian FICO Auto V8" } | { XFE: "Experian FICO Auto V9" } | { X9: "Experian FICO Bankcard" } | { XK: "Experian FICO Bankcard V2" } | { XAE: "Experian FICO Bankcard V3" } | { XAJ: "Experian FICO Bankcard V8" } | { XFF: "Experian FICO Bankcard V9" } | { XFB: "Experian FICO Bankruptcy" } | { X8: "Experian FICO Personal Finance" } | { XR: "Experian FICO Personal Finance V2" } | { XAC: "Experian FICO Personal Finance V3" } | { XF3: "Experian FICO Insurance Homeowner Form 3 and 5" } | { XF4: "Experian FICO Insurance Homeowner Form 4" } | { XFN: "Experian FICO Insurance Non-standard Auto" } | { XFP: "Experian FICO Insurance Preferred Auto GTM" } | { XFS: "Experian FICO Insurance Standard Auto GTM" } | { XFM: "Experian FICO Insurance Standard Auto Min" } | { X6: "Experian FICO Installment Loan" } | { XN: "Experian FICO Installment Loan V2" } | { XAD: "Experian FICO Installment Loan V3" } | { X2: "Experian Fraud Shield Score" } | { XII: "Experian Income Insight" } | { X4: "Experian National Equivalency" } | { X3: "Experian National Risk" } | { XA: "Experian Old National Risk" } | { XH: "Experian Recovery Score Bankcard" } | { XJ: "Experian Recovery Score Retail" } | { XD: "Experian Retail" } | { XRB: "Experian ROI 1 Digit Score" } | { XRA: "Experian ROI 3 Digit Score" } | { XU: "Experian SureView" } | { XSP: "Experian Scorex PLUS" } | { XS1: "Experian Scorex PLUS V2" } | { XW: "Experian TEC" } | { XL: "Experian Tele-Risk" } | { XQ: "Experian Vantage Score" } | { XV4: "Experian Vantage Score 4.0" } | { TF5: "TransUnion FICO 95" } | { TA5: "TransUnion FICO Auto 95" } | { TB5: "TransUnion FICO Bankcard 95" } | { TP5: "TransUnion FICO Personal Finance 95" } | { TI5: "TransUnion FICO Installment Loan 95" } | { TF8: "TransUnion FICO 98" } | { TA8: "TransUnion FICO Auto 98" } | { TB8: "TransUnion FICO Bankcard 98" } | { TP8: "TransUnion FICO Personal Finance 98" } | { TI8: "TransUnion FICO Installment Loan 98" } | { TF4: "TransUnion FICO 04" } | { TA4: "TransUnion FICO Auto 04" } | { TB4: "TransUnion FICO Bankcard 04" } | { TP4: "TransUnion FICO Personal Finance 04" } | { TI4: "TransUnion FICO Installment Loan 04" } | { TFE: "TransUnion FICO 08" } | { TAE: "TransUnion FICO Auto 08" } | { TBE: "TransUnion FICO Bankcard 08" } | { TF9: "TransUnion FICO 09" } | { TA9: "TransUnion FICO Auto 09" } | { TB9: "TransUnion FICO Bankcard 09" } | { TG0: "TransUnion FICO NextGen 00" } | { TG3: "TransUnion FICO NextGen 03" } | { TR8: "TransUnion FICO Bankruptcy 98" } | { TR3: "TransUnion FICO Bankruptcy 03" } | { TA: "TransUnion Auto" } | { TB: "TransUnion Bankruptcy 1.0" } | { TD: "TransUnion New DELPHI" } | { TV: "TransUnion Vantage Score" } | { TV4: "TransUnion Vantage Score 4.0" } | { TE3: "TransUnion Income Estimator 3.0" } | { QB9: "Equifax Beacon 09" } | { QBC: "Equifax Beacon 09 Auto" } | { QBD: "Equifax Beacon 09 Bankcard" } | { QBO: "Equifax Beacon 09 Mortgage" } | { QBG: "Equifax FACTA Beacon 09" } | { QBH: "Equifax FACTA Beacon 09 Auto" } | { QBI: "Equifax FACTA Beacon 09 Bankcard" } | { QBQ: "Equifax FACTA Beacon 09 Mortgage" } | { QBJ: "Equifax Beacon 5.0" } | { QBK: "Equifax Beacon 5.0 Auto" } | { QBL: "Equifax Beacon 5.0 Bankcard" } | { QBM: "Equifax Beacon 5.0 Finance" } | { QBN: "Equifax Beacon 5.0 Installment" } | { QBZ: "Equifax FACTA Beacon 5.0" } | { QBR: "Equifax FACTA Beacon 5.0 Auto" } | { QBW: "Equifax FACTA Beacon 5.0 Bankcard" } | { QBU: "Equifax FACTA Beacon 5.0 Finance" } | { QBP: "Equifax FACTA Beacon 5.0 Installment" } | { QV2: "Equifax Vantage Score 2.0" } | { QVA: "Equifax Vantage Score 4.0 Adverse Action" } | { QVP: "Equifax Vantage Score 4.0 Positive Reason" } | { QFS: "Equifax FICO V9" } | { QF4: "Equifax FICO V9 Auto" } | { QF8: "Equifax FICO V9 Bankcard" } | { QFV: "Equifax FACTA FICO V9" } | { 'QF@': "Equifax FACTA FICO V9 Auto" } | { 'QF$': "Equifax FACTA FICO V9 Bankcard" } | { QN8: "Equifax Bankruptcy Navigator Index 5.0 05477" } | { QN9: "Equifax Bankruptcy Navigator Index 5.0 05478" } | { QN6: "Equifax Bankruptcy Navigator Index 4.0 05146" } | { QN7: "Equifax Bankruptcy Navigator Index 4.0 05147" } | { QN1: "Equifax Bankruptcy Navigator Index 3.0 02781" } | { QN2: "Equifax Bankruptcy Navigator Index 3.0 02782" } | { QN3: "Equifax Bankruptcy Navigator Index 3.0 02783" } | { QN4: "Equifax Bankruptcy Navigator Index 3.0 02784" } | { QI2: "Equifax Bankruptcy Navigator Index 99 02502" } | { QI3: "Equifax Bankruptcy Navigator Index 99 02503" } | { CQU: "ChexSystems Qualifile Score" }
      NEW_CREDIT_SCORE: Count
      OLD_PAYMENT_AMOUNT: Money
      NEW_PAYMENT_AMOUNT: Money
      OLD_PAYMENT_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      NEW_PAYMENT_FREQUENCY: { S: "Single" } | { A: "Annually" } | { SA: "Semiannually" } | { Q: "Quarterly" } | { BM: "Bimonthly" } | { M: "Monthly" } | { SM: "Semimonthly" } | { BF: "Biweekly skip first" } | { BL: "Biweekly skip last" } | { B: "Biweekly" } | { WF: "Weekly skip first" } | { WL: "Weekly skip last" } | { W: "Weekly" } | { D: "Daily" }
      OLD_PAYMENT_COUNT_SCHEDULED: Count
      NEW_PAYMENT_COUNT_SCHEDULED: Count
      OLD_PAYMENT_DUE_DATE: Date
      NEW_PAYMENT_DUE_DATE: Date
      OLD_INTEREST_RATE: Rate
      NEW_INTEREST_RATE: Rate
      INTEREST_FEES_CAPITALIZED: Money
      NEW_BALANCE: Money
      CHARGE_OFF_OPTION: { N: "No" } | { Y: "Yes" }
      BK_INDICATOR: { '-': "None" } | { '7': "Chapter 7" } | { '11': "Chapter 11" } | { '12': "Chapter 12" } | { '13': "Chapter 13" }
      BK_COURT_NAME: string
      BK_COURT_CASE: string
      BK_STATUS: { '-': "None" } | { NR: "Notice received" } | { PC: "Plan confirmed" } | { CF: "Proof of claim filed" } | { MD: "Motion for discharge" } | { DI: "Discharged" } | { DP: "Discharged - monitor for payment" } | { RA: "Reaffirmed" } | { WI: "Withdrawn" } | { DM: "Dismissed" }
      BK_FILED_DATE: Date
      BK_FIRST_MEETING_TIME: Time
      BK_PROOF_OF_CLAIM_DATE: Date
      BK_MFR_GRANTED_DATE: Date
      BK_SURRENDERED_DATE: Date
      BK_DISCHARGED_DATE: Date
      BK_REAFFIRMED_DATE: Date
      BK_WITHDRAWN_DATE: Date
      BK_DISMISSED_DATE: Date
      BK_TTEE_PERSON_SERIAL: Serial
      BK_TTEE_PERSON_ADDR_SERIAL: Serial
      BK_TTEE_PHONE_NUMBER: string
      BK_D_A_PERSON_SERIAL: Serial
      BK_D_A_PERSON_ADDR_SERIAL: Serial
      BK_D_A_PHONE_NUMBER: string
      BK_PRE_ARR_ORIGINAL_BALANCE: Money
      BK_PRE_ARR_CURRENT_BALANCE: Money
      LA_ASSIGNED_DATE: Date
      LA_ATTORNEY_PERSON_SERIAL: Serial
      LA_ATTORNEY_PERSON_ADDR_SERIAL: Serial
      LA_ATTORNEY_PHONE_NUMBER: string
      LA_COURT_NAME: string
      LA_COURT_CASE: string
      LA_COURT_PHONE_NUMBER: string
      LA_JUDGMENT_OPTION: { '-': "None" } | { J: "Judgment" } | { G: "Garnishment" } | { C: "Small claims" } | { S: "Stipulation" }
      LA_JUDGMENT_AMOUNT: Money
      LA_JUDGMENT_DATE: Date
      LA_GARNISHMENT_FILED_DATE: Date
      LA_SATISFIED_DATE: Date
      LAST_FM_DATE: Date
    }
    TROUBLED_DEBT_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      CODE: string
      CATEGORY: { R: "Repossession" } | { F: "Foreclosure" } | { M: "Modification" } | { T: "Restructuring" } | { B: "Bankruptcy" } | { L: "Legal action" }
      LAST_FM_DATE: Date
    }
    USER: {
      SERIAL: Serial
      ACCESS_KEY: string
      USERNAME: string
      DOMAIN_NAME: string
      CATEGORY: { P: "Person" } | { S: "System" } | { N: "System - no login tracking" }
      RECEIPT_ID: string
      AIRES_CODE: string
      PERSON_SERIAL: Serial
      LAST_LOGIN_TIME: Time
      UNSUCCESSFUL_LOGIN_TIME: Time
      UNSUCCESSFUL_LOGIN_COUNT: Count
      LOGIN_LOCK: { N: "Not locked" } | { L: "Locked" }
      LOGIN_CHANNEL_SERIAL: Serial
      ROLE_SERIAL: Serial
      TEST_ROLE_SERIAL: Serial
      SEC_OVR_REQ_NOT_GROUP_SERIAL: Serial
      SEC_OVR_GRANTOR_GROUP_SERIAL: Serial
      SEC_OVR_GRANTOR_NOT_ADDRESSES: string
      WARNING_HANDLING: { '-': "Standard" } | { I: "Ignore warnings" }
      SALES_OPPORTUNITY_OPTION: { '-': "Default" } | { NO: "No evaluation or display" } | { BA: "Evaluate and display on profile access" } | { BT: "Evaluate and display after transaction post" } | { EA: "Evaluate on profile access" } | { ET: "Evaluate after transaction post" } | { DA: "Display on profile access" } | { DT: "Display after transaction post" }
      PERSON_VERIFICATION_OPTION: { '-': "Default" } | { N: "No" } | { Y: "Yes" }
      PROF_ACCESS_INT_TY_SPECIFY: { N: "No" } | { Y: "Yes" }
      PROF_ACCESS_INT_TY_SERIAL: Serial
      AD_HOC_REP_USERNAME: string
      AD_HOC_REP_ROLE_LIST: string
      AD_HOC_REP_PASSWORD: string
      AD_HOC_REP_DASHBOARD_NAME: string
      ACCESS_LOGGING: { '-': "Default" } | { N: "None" } | { Y: "Account" } | { F: "Account}|{ card}|{ person}|{ application" }
      HIRE_DATE: Date
      TERMINATION_DATE: Date
      JOB_TITLE: string
      DEPARTMENT_SERIAL: Serial
      MANAGER_USER_SERIAL: Serial
      PHONE_NUMBER: string
      FAX_NUMBER: string
      EMAIL_ADDRESS: string
      BRANCH_SERIAL: Serial
      NMLSR_ID: string
      OUT_OF_OFFICE_MESSAGE: string
      OUT_OF_OFFICE_RETURN_TIME: Time
      PROFILE_IMAGE: Binary
      PROFILE_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      PROFILE_IMAGE_MOD_TIME: Time
      SIGNATURE_IMAGE: Binary
      SIGNATURE_IMAGE_FORMAT: { none: "None" } | { jpeg: "jpeg" } | { pdf: "pdf" } | { gif: "gif" } | { png: "png" } | { jar: "jar" }
      SIGNATURE_IMAGE_MOD_TIME: Time
      EX_CREDIT_PULL_USER_SERIAL: Serial
      TU_CREDIT_PULL_USER_SERIAL: Serial
      EQ_CREDIT_PULL_USER_SERIAL: Serial
      CS_CREDIT_PULL_USER_SERIAL: Serial
      CS_LOCATION_ID: string
      SHARED_BRANCH_TELLER_ID: string
      SERVER_USERNAME: string
      SERVER_PASSWORD: string
      USER_INTERFACE_SETTINGS: Document
      LAST_FM_DATE: Date
    }
    USER_ACCOUNT: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CATEGORY: { R: "Restricted" } | { E: "Employee" } | { F: "Employee related" } | { PV: "Prohibited view" } | { PF: "Prohibited file maintenance" } | { PM: "Prohibited monetary transaction" }
      ACCOUNT_NUMBER: string
      LAST_FM_DATE: Date
    }
    USER_CASH_DRAWER_LINK: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      CASH_DRAWER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    USER_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      NOTIFICATION_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    USER_GROUP_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      USER_SERIAL: Serial
      USER_GROUP_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    USER_PASSWORD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      PASSWORD: string
      CHANGE_TIME: Time
      CHANGE_REQUIRED: { N: "No" } | { Y: "Yes" }
      EXPIRATION_TIME: Time
    }
    VENDOR: {
      SERIAL: Serial
      ACCESS_KEY: string
      VENDOR_NUMBER: string
      VENDOR_PERSON_SERIAL: Serial
      TYPE_SERIAL: Serial
      CUSTOMER_NUMBER: string
      DESCRIPTION: string
      IRS_FORM_1099_MISC_OPTION: { '-': "None" } | { '1': "Rents" } | { '2': "Royalties" } | { '3': "Other income" } | { '5': "Fishing boat proceeds" } | { '6': "Medical and health care payments" } | { '7': "Nonemployee compensation" } | { '8': "Substitute payments in lieu of dividends or interest" } | { A: "Crop insurance proceeds" } | { B: "Excess golden parachute payments" } | { C: "Gross proceeds paid to an attorney" } | { D: "Section 409A deferrals" } | { E: "Section 409A income" }
      BALANCE: Money
      PAYMENT_LAST_DATE: Date
      PAYMENT_LAST_AMOUNT: Money
      PAYMENT_METHOD: { C: "Check" } | { A: "ACH origination next day" } | { D: "ACH origination same day" } | { G: "General ledger" } | { S: "Savings deposit" }
      MULTIPLE_INVOICES_PER_PAYMENT: { N: "No" } | { Y: "Yes" }
      ACH_ORIGINATION_COMPANY_SERIAL: Serial
      ACH_DFI_ROUTING_NUMBER: string
      ACH_DFI_ROUTING_NUMBER_DESC: string
      ACH_DFI_ACCOUNT_NUMBER: string
      ACH_DFI_ACCOUNT_CATEGORY: { '-': "None" } | { C: "Checking" } | { S: "Savings" } | { L: "Loan" } | { G: "GL" }
      ACH_ENTRY_CLASS: { CCD: "CCD" } | { PPD: "PPD" }
      ACH_IDENTIFICATION_NUMBER: string
      ACH_NAME: string
      ACH_PRENOTIFICATION_OPTION: { '-': "None" } | { P: "Send" } | { S: "Sent" }
      ACH_PRENOTIFICATION_DATE: Date
      PAYMENT_SHARE_SERIAL: Serial
      PAYMENT_GL_SERIAL: Serial
      AP_GL_SERIAL: Serial
      EXPENSE_GL_SERIAL: Serial
      DISCOUNT_GL_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    VENDOR_TYPE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      DEF_INVOICE_TYPE_SERIAL: Serial
      DEF_CHECKING_ACCOUNT_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    VENDOR_YTD: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      YEAR: Count
      DEBITS: Money
      CREDITS: Money
      LAST_FM_DATE: Date
    }
    WORK_AREA_CONFIG: {
      SERIAL: Serial
      ACCESS_KEY: string
      CONTACT_INSERT_OPTION: { HP: "Home phone" } | { 'PC}|{PE': "Personal cell}|{ personal email" } | { 'PC}|{PE}|{HP}|{BP': "Personal cell}|{ personal email}|{ home phone}|{ business phone" } | { 'HP}|{BP}|{PC}|{PE': "Home phone}|{ business phone}|{ personal cell}|{ personal email" }
      PERSON_ADDRESS_VER_UPDATE: { N: "No" } | { Y: "Yes" }
      PERSON_ADDRESS_VER_MONTHS: Count
      PERSON_CONTACT_VER_UPDATE: { N: "No" } | { Y: "Yes" }
      PERSON_CONTACT_VER_MONTHS: Count
      PERSON_ID_VER_UPDATE: { N: "No" } | { Y: "Yes" }
      PERSON_ID_VER_MONTHS: Count
      PER_CONT_DEF_MRKT_OPTION: { Y: "Yes" } | { N: "No" } | { T: "Text only" } | { V: "Voice only" }
      PER_CONT_DEF_CARD_FRAUD_OPTION: { N: "No" } | { E: "Yes for email" } | { C: "Yes for cell phone" } | { B: "Yes for email and cell phone" }
      PERSON_OFAC_CHECK_ON_CHANGE: { N: "No" } | { Y: "Yes" } | { C: "Require match confirm or reject" }
      PERSON_HOUSEHOLD_ON_INSERT: { N: "No" } | { Y: "Yes" }
      PERSON_HOUSEHOLD_CANDIDATE: { LA: "Last name and any residence address" } | { A: "Any residence address" } | { D: "Default address" }
      PERSON_HOUSEHOLD_POSTAL_OPTION: { Y: "Match entire" } | { N: "Match first 5 digits" }
      ON_US_DRAFT_CLEARING: { I: "Immediate" } | { B: "Batch" }
      ON_US_DRAFT_DUP_CHK_DAYS: Count
      ACCT_LIST_IN_PERSON_VER: { N: "No" } | { Y: "Yes" }
      CL_TRAN_RENTAL_OPTION: { N: "No" } | { Y: "Yes" }
      CASH_DRAWER_OPTION: { O: "Always open" } | { C: "Close when balanced" } | { R: "Close when balanced and open without recount" }
      LN_PMT_EXCESS_HANDLING_OPTION: { SH: "Standard handling" } | { PSP: "Prompt with single payment default" } | { PSH: "Prompt with standard handling default" }
      LC_CLOSE_FEE_DEFAULT_GL_SERIAL: Serial
      TRAN_PERSON_ACC_SCRIPT_SERIAL: Serial
      TRAN_AFTER_POST_SCRIPT_SERIAL: Serial
      RSN_CAUSE_SEC_EVT_SERIAL: Serial
      BULK_CHECK_STMT_DESCRIPTION: string
      BULK_CHECK_AVAILABLE_OPTION: { '-': "Default" } | { Z: "No availability" } | { F: "Full availability" } | { D: "Next day availability amount" } | { O: "Other amount" }
      BULK_CHECK_AVAILABLE_AMOUNT: Money
      BULK_CASH_STMT_DESCRIPTION: string
      BULK_CASH_AVAILABLE_OPTION: { '-': "Default" } | { Z: "No availability" } | { F: "Full availability" } | { D: "Next day availability amount" } | { O: "Other amount" }
      BULK_CASH_AVAILABLE_AMOUNT: Money
      BULK_VER_POSTING_POLICY_SERIAL: Serial
      CALC_PAYOFF_SCRIPT_SERIAL: Serial
      CALC_PAYOFF_FORM_TYPE_SERIAL: Serial
      CALC_PAYOFF_ITN_TYPE_SERIAL: Serial
      DEFAULT_CHECK_HOLD_CATEGORY: { '-': "None" } | { D: "Next day" } | { L: "Local" } | { O: "Other" } | { R: "By routing number" }
      FEE_REV_DEFAULT_PERCENTAGE: Rate
      FEE_REV_REASON_REQUIRED: { N: "No" } | { Y: "Yes" }
      FEE_REV_CHG_CMT_SEC_EVT_SERIAL: Serial
      FEE_REV_INCLUDE_LATE_FEES: { N: "No" } | { Y: "Yes" }
      CRD_REV_POSTING_POLICY_SERIAL: Serial
      SH_MOVE_POSTING_POLICY_SERIAL: Serial
      SH_MOVE_CLOSE_REASON_SERIAL: Serial
      LN_MOVE_POSTING_POLICY_SERIAL: Serial
      LN_MOVE_CLOSE_REASON_SERIAL: Serial
      WORK_Q_AUTO_CHECKOUT_OPTION: { U: "Per user" } | { Q: "Per queue" }
      STARTER_CKS_MIN_CHECK_NUMBER: Count
      STARTER_CKS_DEF_CHECK_NUMBER: Count
      STARTER_CKS_MAX_CHECK_COUNT: Count
      STARTER_CKS_MAX_REPRINT_DAYS: Count
      CRED_PULL_HARD_DAYS: Count
      CRED_PULL_HARD_SEC_EVT_SERIAL: Serial
      EMP_ACT_PRIVILEGE_OPTION: { U: "User Account else Account employee" } | { B: "User Account and Account employee" }
      EMP_ACT_SETUP_USER_ACCT: { N: "No" } | { Y: "Yes" }
      EMP_ACT_SETUP_ACCT_ACCESS: { N: "No" } | { Y: "Yes" }
      VOID_CONFIRMATION: { N: "No" } | { Y: "Yes" }
      ROUTING_NUMBER_VALIDATION: { N: "No" } | { Y: "Yes" }
      ACT_NMBR_CHANGE_POP_UP_OPTION: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    WORK_FLOW: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      CATEGORY: { L: "Step list" } | { S: "Step" }
      STEP: { '-': "None" } | { APPLICANT: "Applicant" } | { CREDIT_PULL: "Credit Pull" } | { FINANCE: "Finance" } | { LN_PROJECT: "Loan projection" } | { LN_PROJECT_2: "Loan projection 2.0" } | { APPLY: "Apply" } | { FINANCIALS: "Financials" } | { DECISION_MODEL: "Decision model" } | { DECISION: "Decision" } | { FUNDING_OPT: "Funding options" } | { DOC_PREP: "Document preparation" } | { FUNDING: "Creation and funding" } | { ACCT_SHARE: "Account/Savings" } | { SHARE_OPT: "Additional Savings options" } | { SHARE_OPT_2: "Additional Savings options 2.0" } | { CARD_FM: "Card file maintenance" } | { APP_SUMM: "Application summary" } | { APPLCT_SUMM: "Applicants summary" } | { LN_REQ_SUMM: "Loan requests summary" } | { SALES_OPP: "Sales opportunity" } | { AUTH_ENROLL: "Authentication Enrollment" } | { NOTES: "Notes" } | { MESSAGES: "Messages" } | { COLLECTION: "Collection" } | { SCRIPT: "Script" }
      SEQUENCING_OPTION: { I: "Include" } | { E: "Exclude" }
      ESCALATION_POLICY_SERIAL: Serial
      START_SCRIPT_SERIAL: Serial
      FINISH_SCRIPT_SERIAL: Serial
      RULES: Document
      LAST_FM_DATE: Date
    }
    WORK_FLOW_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      WORK_FLOW_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    WORK_GROUP: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    WORK_GROUP_LIST: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      USER_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    WORK_QUEUE: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      WORK_GROUP_SERIAL: Serial
      ENQUEUE_NOTIFICATION_ADDRESSES: string
      AUTOMATIC_CHECKOUT: { N: "No" } | { Y: "Yes" }
      DEFAULT_NEXT_WORK_DAYS: Count
      DEFAULT_NEXT_WORK_MINUTES: Count
      DEFAULT_NEXT_WORK_TIME_OF_DAY: string
      DEFAULT_NEXT_WORK_TIME_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      ESCALATION_POLICY_SERIAL: Serial
      DISPLAY_POLICY_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    WORK_QUEUE_CRITERIA: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    WORK_QUEUE_CRITERIA_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      WORK_QUEUE_SERIAL: Serial
      USER_SERIAL: Serial
      BRANCH_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    WORK_QUEUE_DISPLAY_ENTRY: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      MINIMUM_PRIORITY: Count
      MAXIMUM_PRIORITY: Count
      PRIORITY_DISPLAY_COLOR: string
      MIN_MINUTES_AF_NEXT_WORK_TIME: Count
      MAX_MINUTES_AF_NEXT_WORK_TIME: Count
      NEXT_WORK_TIME_DISPLAY_COLOR: string
      MIN_MINUTES_TO_ESCALATION_TIME: Count
      MAX_MINUTES_TO_ESCALATION_TIME: Count
      ESCALATION_TIME_DISPLAY_COLOR: string
      LAST_FM_DATE: Date
    }
    WORK_QUEUE_DISPLAY_POLICY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    WORK_QUEUE_ESCALATION_LEVEL: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      ESCALATION_DAYS: Count
      ESCALATION_MINUTES: Count
      ESCALATION_TIME_OF_DAY: string
      ESCALATION_TIME_ZONE: { UTC: "Coordinated Universal Time" } | { EST5EDT: "Eastern" } | { CST6CDT: "Central" } | { MST7MDT: "Mountain" } | { MST7: "Arizona except Navajo Nation" } | { PST8PDT: "Pacific" } | { AST9ADT: "Alaska" } | { HST10: "Hawaii" }
      WORK_QUEUE_SERIAL: Serial
      WORK_TASK_PRIORITY: Count
      OPPORTUNITY_PRIORITY_SERIAL: Serial
      LAST_FM_DATE: Date
    }
    WORK_QUEUE_ESCALATION_POLICY: {
      SERIAL: Serial
      ACCESS_KEY: string
      DESCRIPTION: string
      STATUS: { O: "Open" } | { C: "Closed" }
      LAST_FM_DATE: Date
    }
    WORK_TASK: {
      SERIAL: Serial
      ACCESS_KEY: string
      WORK_QUEUE_SERIAL: Serial
      USER_SERIAL: Serial
      DESCRIPTION: string
      PRIORITY: Count
      PRIORITY_CHANGE_TIME: Time
      QUEUED_TIME: Time
      STARTED_TIME: Time
      LAST_WORK_TIME: Time
      NEXT_WORK_TIME: Time
      ESCALATION_TIME: Time
      FINISHED_TIME: Time
      WORK_FLOW_SERIAL: Serial
      APPLICATION_SERIAL: Serial
      COLLECTION_ITEM_SERIAL: Serial
      INVOICE_SERIAL: Serial
      OPPORTUNITY_SERIAL: Serial
      DISPUTE_SERIAL: Serial
      SET_NEXT_WORK_TIME_TO_DEFAULT: { N: "No" } | { Y: "Yes" }
      LAST_FM_DATE: Date
    }
    WORK_TASK_STEP: {
      SERIAL: Serial
      PARENT_SERIAL: Serial
      ACCESS_KEY: string
      ORDINAL: Count
      STEP: { '-': "None" } | { APPLICANT: "Applicant" } | { CREDIT_PULL: "Credit Pull" } | { FINANCE: "Finance" } | { LN_PROJECT: "Loan projection" } | { LN_PROJECT_2: "Loan projection 2.0" } | { APPLY: "Apply" } | { FINANCIALS: "Financials" } | { DECISION_MODEL: "Decision model" } | { DECISION: "Decision" } | { FUNDING_OPT: "Funding options" } | { DOC_PREP: "Document preparation" } | { FUNDING: "Creation and funding" } | { ACCT_SHARE: "Account/Savings" } | { SHARE_OPT: "Additional Savings options" } | { SHARE_OPT_2: "Additional Savings options 2.0" } | { CARD_FM: "Card file maintenance" } | { APP_SUMM: "Application summary" } | { APPLCT_SUMM: "Applicants summary" } | { LN_REQ_SUMM: "Loan requests summary" } | { SALES_OPP: "Sales opportunity" } | { AUTH_ENROLL: "Authentication Enrollment" } | { NOTES: "Notes" } | { MESSAGES: "Messages" } | { COLLECTION: "Collection" } | { SCRIPT: "Script" }
      STEP_IDENTIFIER: string
      STATUS: { I: "Incomplete" } | { C: "Complete" }
      STATUS_TIME: Time
      RESULTS: Document
      LAST_FM_DATE: Date
    }
  }
}