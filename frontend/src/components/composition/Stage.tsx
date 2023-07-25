'use client';
import Plot, { d3svg } from '@/components/plot/d3';
import getSvgWidthHeight from '@/components/plot/d3/getSvgWidthHeight';
import { ComponentPropsWithRef, useContext } from 'react';
import ScaleGenerator2D from '@/components/plot/d3/scale';
import { Grid } from '../plot/d3/axis/Grid';
import { StageContext } from './StageContext';
import StageItemPlotter from './StageItemPlotter';

export default function Stage({ ...rest }: ComponentPropsWithRef<'svg'>) {
  const { items, select, selection } = useContext(StageContext);

  async function draw(svg: d3svg) {
    const { width, height } = getSvgWidthHeight(svg);
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const scaleGenerator = new ScaleGenerator2D({ width, height, margin });
    const { x, y } = scaleGenerator.scale([
      { x: 0, y: 0 },
      { x: 100, y: 100 },
    ]);

    svg.select('g.base').remove();
    const base = svg.append('g').attr('class', 'base');

    const grid = new Grid({ width, height }, 50);
    grid.drawLines(base);

    svg.select('g.plot').remove();
    const plot = svg.append('g').attr('class', 'plot');
    const itemPlotter = new StageItemPlotter({ x, y }, select.byComponent);
    itemPlotter.plot(plot, items, selection);
  }

  return (
    <Plot
      data={[items]}
      draw={draw}
      dimensions={{ width: '100%', height: '100%' }}
      {...rest}
    />
  );
}
