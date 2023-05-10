'use client';
import Plot, { d3svg } from '@/components/plot/d3';
import { DataPlotter } from '@/components/plot/d3/DataPlotter';
import getSvgWidthHeight from '@/components/plot/d3/getSvgWidthHeight';
import { ComponentPropsWithRef } from 'react';
import { Grid } from '../../components/plot/d3/axis/Grid';

export default function Stage({ className }: ComponentPropsWithRef<'svg'>) {
  async function draw(svg: d3svg) {
    const { width, height } = getSvgWidthHeight(svg);

    svg.select('g.base').remove();
    const base = svg.append('g').attr('class', 'base');

    const gridlines = {
      horizontal: base.append('g').attr('class', 'horizontal'),
      vertical: base.append('g').attr('class', 'vertical'),
    };

    const grid = new Grid({ width, height }, 50);

    grid.vertical(gridlines.vertical);
    grid.horizontal(gridlines.horizontal);
  }

  const plotter = new DataPlotter<[]>(draw);
  return <Plot data={[]} dataPlotter={plotter} className={className} />;
}
