/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { RefObject } from 'react';

export default async function copyTableContents(
  tableRef: RefObject<HTMLTableElement>
) {
  if (!tableRef.current) {
    console.log('table is null');
    return;
  }

  const noModify = tableRef.current.cloneNode(true) as HTMLTableElement;

  for (const body of [noModify.tHead, ...noModify.tBodies, noModify.tFoot]) {
    if (!body) continue;
    const buttons = [...body.getElementsByTagName('button')];
    for (const button of buttons) {
      const td = button.parentElement;
      td?.parentElement?.removeChild(td);
    }
  }

  const tsv = tableToTsv(noModify);
  try {
    await navigator.clipboard.writeText(tsv);
    console.log('Table copied to clipboard as TSV');
  } catch (error) {
    console.error('Failed to copy table to clipboard:', error);
  }
}

function tableToTsv(table: HTMLTableElement) {
  const tsv: string[] = [];

  const rows = table.querySelectorAll('tr');
  for (const row of rows) {
    const cells: (string | null)[] = [];
    for (const cell of row.cells) {
      cells.push(cell.textContent);
    }
    tsv.push(cells.join('\t'));
  }
  return tsv.join('\n');
}
