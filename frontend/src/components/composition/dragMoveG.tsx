'use client';
import * as d3 from 'd3';

export function dragMoveG(
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  { x, y }: { x: number; y: number }
) {
  g.raise().attr('transform', `translate(${x}, ${y})`);
}
