'use client';
import Plot, { d3svg } from '@/components/plot/d3';
import { DataPlotter } from '@/components/plot/d3/DataPlotter';
import getSvgWidthHeight from '@/components/plot/d3/getSvgWidthHeight';
import { ComponentPropsWithRef } from 'react';

export default function Stage({ className }: ComponentPropsWithRef<'svg'>) {
  async function draw(svg: d3svg) {
    const { width, height } = getSvgWidthHeight(svg);

    svg.select('g.base').remove();
    const base = svg.append('g').attr('class', 'base');
  }

  const plotter = new DataPlotter<[]>(draw);
  return <Plot data={[]} dataPlotter={plotter} className={className} />;
}
