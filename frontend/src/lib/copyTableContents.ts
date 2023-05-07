import { RefObject } from 'react';

export default function copyTableContents(
  tableRef: RefObject<HTMLTableElement>
) {
  let range: Range,
    sel: Selection | null = null;

  if (!tableRef.current) {
    console.log('table is null');
    return;
  }

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

  console.log('Element Copied! Paste it in a file');
}
