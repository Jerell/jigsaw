'use client';
import { StageItem } from './StageItem';
import * as d3 from 'd3';

export function displayState<U extends SVGElement, T extends StageItem>(
  d: T,
  getState: (e: T) => boolean,
  className: string,
  d3node: d3.Selection<U, T, SVGGElement | null, unknown>
) {
  d3node.classed(className, getState(d));
}
