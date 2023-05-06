'use client';

import * as d3 from 'd3';
import { d3scale, d3selection, d3svg, IMargin } from '..';
import { ScatterData } from '../datatypes';
import { AxisGenerator } from './index';

export default class ScatterAxisGenerator extends AxisGenerator<ScatterData> {
  constructor(dimensions: { width: number; height: number; margin: IMargin }) {
    super(dimensions);
  }

  scale(data: { x: number; value: number }[]): {
    x: d3.ScaleLinear<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
  } {
    const { width, height, margin } = this.dimensions;
    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x) as [number, number])
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value) as [number, number])
      .range([height - margin.bottom, margin.top])
      .nice();
    return { x, y };
  }

  xAxis(g: d3selection, x: d3scale, height: number): d3selection {
    if (!this.dimensions) return g;
    return g
      .attr(
        'transform',
        `translate(0,${height - this.dimensions.margin.bottom})`
      )
      .call(
        d3
          .axisBottom(x)
          .ticks(this.dimensions.width / 80)
          .tickSizeOuter(0)
      );
  }

  yAxis(g: d3selection, y: d3scale, title: string): d3selection {
    if (!this.dimensions) return g;
    return g
      .attr(
        'transform',
        `translate(${this.dimensions.width - this.dimensions.margin.right},0)`
      )
      .call(
        d3
          .axisLeft(y)
          .tickSizeInner(
            this.dimensions.width -
              (this.dimensions.margin.left + this.dimensions.margin.right)
          )
      )
      .call((g) =>
        g
          .selectAll('.title')
          .data([title])
          .join('text')
          .attr('class', 'title')
          .attr('x', -this.dimensions.height / 2)
          .attr('y', this.dimensions.margin.left * 0.9 - this.dimensions.width)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'middle')
          .text(title)
          .attr('transform', `rotate(-90)`)
      )
      .call((g) => g.select('.domain').remove());
  }

  applyXAxis(svg: d3svg, x: d3scale, height: number): d3selection {
    return svg
      .append('g')
      .attr('class', 'axis axis--x')
      .call(
        (selection: d3selection, scale: d3scale, h: number) =>
          this.xAxis(selection, scale, h),
        x,
        height
      );
  }

  applyYAxis(svg: d3svg, y: d3scale, title: string): d3selection {
    return svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(
        (selection: d3selection, scale: d3scale, t: string) =>
          this.yAxis(selection, scale, t),
        y,
        title
      );
  }
}
