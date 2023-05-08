'use client';
import { IDimensions, d3selection } from '@/components/plot/d3';
import * as d3 from 'd3';

export class Grid {
  constructor(
    public readonly dimensions: IDimensions,
    public readonly spacing: number
  ) {}

  vertical(g: d3selection) {
    const xLines = d3.range(
      this.spacing,
      Number(this.dimensions.width),
      this.spacing
    );

    return g
      .selectAll('line')
      .data([...xLines])
      .enter()
      .append('line')
      .attr('class', 'grid-line vertical')
      .attr('x1', (d) => d)
      .attr('y1', 0)
      .attr('x2', (d) => d)
      .attr('y2', Number(this.dimensions.height));
  }

  horizontal(g: d3selection) {
    const yLines = d3.range(
      this.spacing,
      Number(this.dimensions.height),
      this.spacing
    );

    return g
      .selectAll('line')
      .data([...yLines])
      .enter()
      .append('line')
      .attr('class', 'grid-line horizontal')
      .attr('x1', 0)
      .attr('y1', (d) => d)
      .attr('x2', Number(this.dimensions.width))
      .attr('y2', (d) => d);
  }
}
