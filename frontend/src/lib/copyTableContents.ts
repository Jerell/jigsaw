import { RefObject } from 'react';

export default async function copyTableContents(
  tableRef: RefObject<HTMLTableElement>
) {
  async function copyTable() {
    if (!tableRef.current) {
      console.log('table is null');
      return;
    }
    let a;
    try {
      a = ClipboardItem || undefined;
    } catch {
      console.log('ClipboardItem is not defined');
    }
    if (!a) {
      return copyDeprecated(tableRef);
    }

    const noModify = tableRef.current.cloneNode(true) as HTMLTableElement;
    for (const body of noModify.tBodies) {
      const svgs = [...body.getElementsByTagName('svg')];
      for (const svg of svgs) {
        const span = svg.parentElement;
        const td = span?.parentElement;
        td?.parentElement?.removeChild(td);
      }
    }

    const html = [noModify.tHead, ...noModify.tBodies]
      .map((t) => t?.outerHTML)
      .join('')
      .toString();

    const blob = new Blob([html], { type: 'text/html' });

    await navigator.clipboard.writeText(html);

    // await navigator.clipboard.write([
    //   new ClipboardItem({ [blob.type]: Promise.resolve(blob) }),
    // ]);
  }
  return await copyTable();
}

function copyDeprecated(tableRef: RefObject<HTMLTableElement>) {
  if (!tableRef.current) {
    console.log('table is null');
    return;
  }

  let range: Range,
    sel: Selection | null = null;

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection) {
    range = document.createRange();
    sel = window.getSelection();

    // unselect any element in the page
    sel?.removeAllRanges();

    try {
      range.selectNodeContents(tableRef.current);
      sel?.addRange(range);
    } catch (e) {
      range.selectNode(tableRef.current);
      sel?.addRange(range);
    }

    document.execCommand('copy');
  }

  sel?.removeAllRanges();
}
