import { RefObject } from 'react';

export default async function copyTableContents(
  tableRef: RefObject<HTMLTableElement>
) {
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

  const html = [tableRef.current.tHead, ...tableRef.current.tBodies]
    .map((t) => t?.innerHTML)
    .join();

  const blob = new Blob([html], { type: 'text/html' });

  console.log(blob, html);

  await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
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
