'use client';
import Plot, { d3svg } from '@/components/plot/d3';
import { DataPlotter } from '@/components/plot/d3/DataPlotter';
import getSvgWidthHeight from '@/components/plot/d3/getSvgWidthHeight';
import { ComponentPropsWithRef, useContext } from 'react';
import { Grid } from '../../components/plot/d3/axis/Grid';
import { CompositionContext } from './CompositionContext';
import ScaleGenerator2D from '@/components/plot/d3/scale';
import clsxm from '@/lib/clsxm';
import styles from './stage.module.css';

export default function Stage({ className }: ComponentPropsWithRef<'svg'>) {
  const { components, select, selection, replace, store } =
    useContext(CompositionContext);

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

    const gridlines = {
      horizontal: base.append('g').attr('class', 'horizontal'),
      vertical: base.append('g').attr('class', 'vertical'),
    };

    const grid = new Grid({ width, height }, 50);

    grid.vertical(gridlines.vertical);
    grid.horizontal(gridlines.horizontal);

    const calcN = (i: number) => (100 / (components.length + 1)) * (i + 1);

    svg.select('g.nodes').remove();
    const nodes = base.append('g').attr('class', 'nodes');
    nodes
      .selectAll('circle')
      .data(components)
      .enter()
      .append('circle')
      .attr('class', clsxm(['node', styles.node]))
      .attr('r', 22)
      .attr('cx', (d, i) => x(calcN(i)))
      .attr('cy', (d, i) => x(calcN(i)))
      .on('click', (e, d) => {
        select.byIndex(components.findIndex((c) => c === d));
      });
  }

  const plotter = new DataPlotter<[]>(draw);
  return <Plot data={[]} dataPlotter={plotter} className={className} />;
}
