'use client';
import { ArrayElement } from '@/lib/arrayElement';
import { PointPlotter } from '.';
import { ScatterData } from '../datatypes';
import { ScaleLinear } from 'd3';
import * as d3 from 'd3';
import { d3selection, d3svg } from '..';

export default class LinePlotter extends PointPlotter<ScatterData> {
  constructor(
    private readonly color: (d?: ArrayElement<ScatterData>) => string,
    public readonly dots: boolean = true
  ) {
    super();
  }

  plot(
    g: d3selection,
    data: ScatterData,
    scales: {
      x: ScaleLinear<number, number, never>;
      y: ScaleLinear<number, number, never>;
    }
  ): void {
    g.selectAll('g.data.points').remove();
    g.selectAll('g.data.line').remove();
    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => scales.x(d.x))
      .y((d) => scales.y(d.y))
      .curve(d3.curveMonotoneX);

    g.append('g')
      .attr('class', 'data line')
      .datum(data)
      .append('path')
      .attr('stroke', this.color())
      .attr('stroke-width', 1.5)
      .attr('fill', 'none')
      .attr('d', line);

    if (this.dots) {
      g.append('g')
        .attr('class', 'data points')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d) => scales.x(d.x))
        .attr('cy', (d) => scales.y(d.y))
        .attr('r', 2.5)
        .attr('fill', this.color())
        .attr('stroke-width', 1.5)
        .attr('stroke', this.color());
    }
  }
}
