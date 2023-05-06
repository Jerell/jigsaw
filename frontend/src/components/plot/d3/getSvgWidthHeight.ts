import { d3svg } from '.';

export default function getSvgWidthHeight(svg: d3svg) {
  const getNum = (property: string) => +svg.style(property).replace('px', '');
  return { width: getNum('width'), height: getNum('height') };
}
