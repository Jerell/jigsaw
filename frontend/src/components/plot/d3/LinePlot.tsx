'use client';
import Plot, { IDimensions, d3svg } from '@/components/plot/d3';
import { DataPlotter } from '@/components/plot/d3/DataPlotter';
import getSvgWidthHeight from '@/components/plot/d3/getSvgWidthHeight';
import { ComponentPropsWithRef } from 'react';
import { Grid } from './axis/Grid';
import ScaleGenerator2D from './scale';
import ScatterPointPlotter from './points/ScatterPointPlotter';
import LinePlotter from './points/LinePlotter';

export default function LinePlot({
  className,
  data,
  dimensions,
}: {
  data: { x: number; y: number }[];
  dimensions?: IDimensions;
} & ComponentPropsWithRef<'svg'>) {
  async function draw(svg: d3svg) {
    const { margin = { top: 20, right: 20, bottom: 30, left: 40 } } =
      dimensions || {};
    const { width, height } = getSvgWidthHeight(svg);

    const scaleGenerator = new ScaleGenerator2D({ width, height, margin });
    const { x, y } = scaleGenerator.scale(data);

    svg.select('g.base').remove();
    const base = svg.append('g').attr('class', 'base');

    const gridlines = {
      horizontal: base.append('g').attr('class', 'horizontal'),
      vertical: base.append('g').attr('class', 'vertical'),
    };

    const grid = new Grid({ width, height }, 50);

    grid.vertical(gridlines.vertical);
    grid.horizontal(gridlines.horizontal);

    const pointPlotter = new LinePlotter(() => '#d4a373');
    pointPlotter.plot(svg, data, { x, y });
  }

  const plotter = new DataPlotter<[]>(draw);
  return <Plot data={[]} dataPlotter={plotter} className={className} />;
}
