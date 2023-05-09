'use client';
import * as d3 from 'd3';
import { IMargin } from '..';
import { ArrayElement } from '@/lib/arrayElement';

export default class ScaleGenerator2D {
  constructor(
    protected readonly dimensions: {
      width: number;
      height: number;
      margin: IMargin;
    }
  ) {}

  scale(
    data: any[],
    xAccessor = (d: ArrayElement<typeof data>) => d.x,
    yAccessor = (d: ArrayElement<typeof data>) => d.y
  ) {
    const { width, height, margin } = this.dimensions;
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, xAccessor) as Iterable<d3.NumberValue>)
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor) as Iterable<d3.NumberValue>)
      .range([height - margin.bottom, margin.top])
      .nice();
    return { x, y };
  }
}
