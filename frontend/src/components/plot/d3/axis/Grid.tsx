'use client';
import { IDimensions, d3selection } from '@/components/plot/d3';
import * as d3 from 'd3';

export class Grid {
  public readonly spacing: { x: number; y: number };
  constructor(
    public readonly dimensions: IDimensions,
    spacing: number | { x: number; y: number }
  ) {
    this.spacing =
      typeof spacing === 'number' ? { x: spacing, y: spacing } : spacing;
  }

  private vertical(g: d3selection) {
    const xLines = d3.range(
      this.spacing.x,
      Number(this.dimensions.width),
      this.spacing.x
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

  private horizontal(g: d3selection) {
    const yLines = d3.range(
      this.spacing.y,
      Number(this.dimensions.height),
      this.spacing.y
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

  drawLines(g: d3selection) {
    this.vertical(g.append('g').attr('class', 'vertical'));
    this.horizontal(g.append('g').attr('class', 'horizontal'));
    return g;
  }
}
