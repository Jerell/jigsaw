'use client';
import Plot, { IDimensions, d3svg } from '@/components/plot/d3';
import getSvgWidthHeight from '@/components/plot/d3/getSvgWidthHeight';
import { ComponentPropsWithRef } from 'react';
import { Grid } from './axis/Grid';
import ScaleGenerator2D from './scale';
import ContourDensityPlotter from './points/ContourDensityPlotter';
import { ScatterData } from './datatypes';
import { ArrayElement } from '@/lib/arrayElement';

export default function ContourPlot({
  className,
  data,
  dimensions,
  dots = true,
}: {
  data: { x: number; y: number }[];
  dimensions?: IDimensions;
  dots: boolean;
} & ComponentPropsWithRef<'svg'>) {
  async function draw(svg: d3svg) {
    const { margin = { top: 20, right: 20, bottom: 20, left: 20 } } =
      dimensions || {};
    const { width, height } = getSvgWidthHeight(svg);

    const scaleGenerator = new ScaleGenerator2D({ width, height, margin });

    svg.select('g.base').remove();
    const base = svg.append('g').attr('class', 'base');

    const grid = new Grid({ width, height }, 50);
    grid.drawLines(base);

    svg.select('g.plot').remove();
    const plot = svg.append('g').attr('class', 'plot');
    const pointPlotter = new ContourDensityPlotter(
      width,
      height,
      (d: ArrayElement<ScatterData>) => d.x,
      (d: ArrayElement<ScatterData>) => d.y
    );
    pointPlotter.plot(plot, data);
  }

  return (
    <Plot
      data={[]}
      draw={draw}
      dimensions={{ width: '100%', height: '100%' }}
    />
  );
}
