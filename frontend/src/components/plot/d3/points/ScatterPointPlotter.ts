'use client';

import { ScaleLinear } from 'd3';
import { d3svg } from '..';
import { ScatterData } from '../datatypes';
import { ArrayElement } from '@/lib/arrayElement';
import { PointPlotter } from '.';

export default class ScatterPointPlotter extends PointPlotter<ScatterData> {
  constructor(
    private readonly color: (d: ArrayElement<ScatterData>) => string
  ) {
    super();
  }

  plot(
    svg: d3svg,
    data: ScatterData,
    scales: {
      x: ScaleLinear<number, number, never>;
      y: ScaleLinear<number, number, never>;
    }
  ): void {
    const { x, y } = scales;
    svg
      .append('g')
      .attr('class', 'data points')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.value))
      .attr('r', 2.5)
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('stroke', this.color);
  }
}
