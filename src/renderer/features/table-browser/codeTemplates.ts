/**
 * Code template generators for Table Browser.
 * Produces XML, JavaScript (CR.XML + ajaxRequest), matching the original Keyscript IDE output.
 */

import type { TableInfo, SearchFilter } from './tableBrowserApi'

// ─── Search Templates ────────────────────────────────────────

export function searchXmlTemplate(tableName: string, filter: SearchFilter): string {
  const params = filter.parameter.map(p =>
    `        <parameter>\n` +
    `          <columnName>${p.columnName}</columnName>\n` +
    `          <contents>[${p.dataType || 'value'}]</contents>\n` +
    `        </parameter>`
  ).join('\n')

  return `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0">
  <sequence>
    <transaction>
      <step>
        <search label="${tableName}_search">
          <tableName>${tableName}</tableName>
          <filterName>${filter.filterName}</filterName>
          <includeSelectColumns option="Y"/>
          <includeTotalHitCount option="Y"/>
          <returnLimit>10</returnLimit>
${params}
        </search>
      </step>
    </transaction>
  </sequence>
</query>`
}

export function searchJsTemplate(tableName: string, filter: SearchFilter): string {
  const lines: string[] = []
  lines.push(`var xml = new CR.XML();`)
  lines.push(`var sequence = xml.addContainer(xml.getRootElement(), 'sequence');`)
  lines.push(`var transaction = xml.addContainer(sequence, 'transaction');`)
  lines.push(``)
  lines.push(`var step = xml.addContainer(transaction, 'step');`)
  lines.push(`var search = xml.addContainer(step, 'search');`)
  lines.push(`xml.setAttribute(search, 'label', '${tableName}_search');`)
  lines.push(`xml.addText(search, 'tableName', '${tableName}');`)
  lines.push(`xml.addText(search, 'filterName', '${filter.filterName}');`)
  lines.push(`xml.addOption(search, 'includeSelectColumns', 'Y');`)
  lines.push(`xml.addOption(search, 'includeTotalHitCount', 'Y');`)
  lines.push(`xml.addCount(search, 'returnLimit', 10);`)

  for (const p of filter.parameter) {
    lines.push(``)
    lines.push(`var parameter = xml.addContainer(search, 'parameter');`)
    lines.push(`xml.addText(parameter, 'columnName', '${p.columnName}');`)
    lines.push(`xml.addText(parameter, 'contents', '[${p.dataType}]');`)
  }

  lines.push(``)
  lines.push(`CR.Core.ajaxRequest({`)
  lines.push(`  url: 'DirectXMLPostJSON',`)
  lines.push(`  xmlData: xml.getXMLDocument(),`)
  lines.push(`  success: function(response) {`)
  lines.push(`    var searchResponse = null;`)
  lines.push(`    var tranResult = 'failed';`)
  lines.push(`    var errorArray = [];`)
  lines.push(`    var responseJson = CR.JSON.parse(response.responseText);`)
  lines.push(`    var query = responseJson.query;`)
  lines.push(`    if (query) {`)
  lines.push(`      Ext.each(query.sequence, function(sequence) {`)
  lines.push(`        Ext.each(sequence.transaction, function(transaction) {`)
  lines.push(`          tranResult = transaction.$attr.result;`)
  lines.push(`          Ext.each(transaction.exception, function(exception) {`)
  lines.push(`            errorArray.push(exception.message);`)
  lines.push(`          });`)
  lines.push(`          Ext.each(transaction.step, function(step) {`)
  lines.push(`            if (step.tranResult &&`)
  lines.push(`                step.tranResult.category &&`)
  lines.push(`                step.tranResult.category.option === 'E') {`)
  lines.push(`              errorArray.push(step.tranResult.description);`)
  lines.push(`            } else if (step.search &&`)
  lines.push(`                       step.search.$attr &&`)
  lines.push(`                       step.search.$attr.label === '${tableName}_search') {`)
  lines.push(`              searchResponse = step.search;`)
  lines.push(`            }`)
  lines.push(`          });`)
  lines.push(`        });`)
  lines.push(`      });`)
  lines.push(`    }`)
  lines.push(`    if (tranResult !== 'posted' || errorArray.length > 0) {`)
  lines.push(`      CR.Core.displayExceptions({ items: errorArray });`)
  lines.push(`    } else {`)
  lines.push(`      // searchResponse.resultRow contains the matching records`)
  lines.push(`      // searchResponse.totalHitCount has the total count`)
  lines.push(`      console.log('searchResponse', searchResponse);`)
  lines.push(`    }`)
  lines.push(`  }`)
  lines.push(`});`)
  return lines.join('\n')
}

// ─── Record Templates ────────────────────────────────────────

export type RecordOperation = 'V' | 'I' | 'U' | 'D'

export function recordXmlTemplate(table: TableInfo, operation: RecordOperation): string {
  const fields = operation === 'I' || operation === 'U'
    ? table.field.map(f =>
        `          <field>\n` +
        `            <columnName>${f.columnName}</columnName>\n` +
        `            <newContents>[${f.dataType}]</newContents>\n` +
        `          </field>`
      ).join('\n')
    : ''

  const targetLine = operation !== 'I'
    ? `          <targetSerial>[serial]</targetSerial>\n`
    : table.parentTableName
      ? `          <targetParentSerial>[serial]</targetParentSerial>\n`
      : ''

  const allColumnsLine = operation === 'V' || operation === 'D'
    ? `          <includeAllColumns option="Y"/>\n`
    : ''

  return `<query xmlns="http://www.corelationinc.com/queryLanguage/v1.0">
  <sequence>
    <transaction>
      <step>
        <record label="${table.tableName}_record">
          <tableName>${table.tableName}</tableName>
          <operation option="${operation}"/>
${targetLine}          <includeTableMetadata option="N"/>
          <includeColumnMetadata option="N"/>
          <includeRowDescriptions option="Y"/>
${allColumnsLine}${fields ? fields + '\n' : ''}        </record>
      </step>
    </transaction>
  </sequence>
</query>`
}

export function recordJsTemplate(table: TableInfo, operation: RecordOperation): string {
  const lines: string[] = []
  lines.push(`var xml = new CR.XML();`)
  lines.push(`var sequence = xml.addContainer(xml.getRootElement(), 'sequence');`)
  lines.push(`var transaction = xml.addContainer(sequence, 'transaction');`)
  lines.push(``)
  lines.push(`var step = xml.addContainer(transaction, 'step');`)
  lines.push(`var record = xml.addContainer(step, 'record');`)
  lines.push(`xml.setAttribute(record, 'label', '${table.tableName}_record');`)
  lines.push(`xml.addText(record, 'tableName', '${table.tableName}');`)
  lines.push(`xml.addOption(record, 'operation', '${operation}');`)

  if (operation !== 'I') {
    lines.push(`xml.addText(record, 'targetSerial', [serial]);`)
  } else if (table.parentTableName) {
    lines.push(`xml.addText(record, 'targetParentSerial', [serial]);`)
  }

  lines.push(`xml.addOption(record, 'includeTableMetadata', 'N');`)
  lines.push(`xml.addOption(record, 'includeColumnMetadata', 'N');`)
  lines.push(`xml.addOption(record, 'includeRowDescriptions', 'Y');`)

  if (operation === 'V' || operation === 'D') {
    lines.push(`xml.addOption(record, 'includeAllColumns', 'Y');`)
  } else {
    lines.push(``)
    lines.push(`var field = null;`)
    for (const f of table.field) {
      lines.push(`field = xml.addContainer(record, 'field');`)
      lines.push(`xml.addText(field, 'columnName', '${f.columnName}');`)
      lines.push(`xml.addOption(field, 'operation', 'S');`)
      lines.push(`xml.addText(field, 'newContents', [${f.dataType}]);`)
      lines.push(``)
    }
  }

  lines.push(``)
  lines.push(`CR.Core.ajaxRequest({`)
  lines.push(`  url: 'DirectXMLPostJSON',`)
  lines.push(`  xmlData: xml.getXMLDocument(),`)
  lines.push(`  success: function(response) {`)
  lines.push(`    var recordResponse = null;`)
  lines.push(`    var tranResult = 'failed';`)
  lines.push(`    var errorArray = [];`)
  lines.push(`    var responseJson = CR.JSON.parse(response.responseText);`)
  lines.push(`    var query = responseJson.query;`)
  lines.push(`    if (query) {`)
  lines.push(`      Ext.each(query.sequence, function(sequence) {`)
  lines.push(`        Ext.each(sequence.transaction, function(transaction) {`)
  lines.push(`          tranResult = transaction.$attr.result;`)
  lines.push(`          Ext.each(transaction.exception, function(exception) {`)
  lines.push(`            errorArray.push(exception.message);`)
  lines.push(`          });`)
  lines.push(`          Ext.each(transaction.step, function(step) {`)
  lines.push(`            if (step.tranResult &&`)
  lines.push(`                step.tranResult.category &&`)
  lines.push(`                step.tranResult.category.option === 'E') {`)
  lines.push(`              errorArray.push(step.tranResult.description);`)
  lines.push(`            } else if (step.record &&`)
  lines.push(`                       step.record.$attr &&`)
  lines.push(`                       step.record.$attr.label === '${table.tableName}_record') {`)
  lines.push(`              recordResponse = step.record;`)
  lines.push(`            }`)
  lines.push(`          });`)
  lines.push(`        });`)
  lines.push(`      });`)
  lines.push(`    }`)
  lines.push(`    if (tranResult !== 'posted' || errorArray.length > 0) {`)
  lines.push(`      CR.Core.displayExceptions({ items: errorArray });`)
  lines.push(`    } else {`)
  if (operation === 'V') {
    lines.push(`      // recordResponse.field contains all column values`)
    lines.push(`      Ext.each(recordResponse.field, function(field) {`)
    lines.push(`        console.log(field.columnName, '=', field.contents);`)
    lines.push(`      });`)
  } else if (operation === 'I') {
    lines.push(`      // recordResponse.serial contains the new record serial`)
    lines.push(`      console.log('New serial:', recordResponse.serial);`)
  } else {
    lines.push(`      console.log('recordResponse', recordResponse);`)
  }
  lines.push(`    }`)
  lines.push(`  }`)
  lines.push(`});`)
  return lines.join('\n')
}

// ─── Operation labels ────────────────────────────────────────

export const RECORD_OPERATIONS: { value: RecordOperation; label: string }[] = [
  { value: 'V', label: 'View' },
  { value: 'I', label: 'Insert' },
  { value: 'U', label: 'Update' },
  { value: 'D', label: 'Delete' },
]
