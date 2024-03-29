'use client';
import { ArrayElement } from '@/lib/arrayElement';
import { PointPlotter } from '.';
import { ScatterData } from '../datatypes';
import * as d3 from 'd3';
import { d3selection, d3svg } from '..';

export default class ContourDensityPlotter extends PointPlotter<ScatterData> {
  constructor(
    private readonly width,
    private readonly height,
    private readonly xAccessor: (d: ArrayElement<ScatterData>) => number = (
      d?: ArrayElement<ScatterData>
    ) => d?.x || 0,
    private readonly yAccessor: (d: ArrayElement<ScatterData>) => number = (
      d?: ArrayElement<ScatterData>
    ) => d?.y || 0
  ) {
    super();
  }

  plot(g: d3selection, data: ScatterData): void {
    g.selectAll('g.data.contours').remove();

    const contours = d3
      .contourDensity()
      .size([this.width, this.height])
      .bandwidth(20)
      .thresholds(20)(data.map((d) => [this.xAccessor(d), this.yAccessor(d)]));

    g.append('g')
      .attr('class', 'data contours')
      .attr('fill', 'none')
      .attr('stroke', '#ccd5ae')
      .attr('stroke-linejoin', 'round')
      .selectAll('path')
      .data(contours)
      .join('path')
      .attr('stroke-width', (d, i) => (i % 6 ? 0.5 : 2))
      .attr('fill', '#fefae010')
      .attr('d', d3.geoPath());
  }
}
