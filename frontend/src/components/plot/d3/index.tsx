/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { DataPlotter } from './DataPlotter';

export interface IMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export interface IDimensions {
  width: number | string;
  height: number | string;
  margin?: IMargin;
}

export type d3svg = d3.Selection<SVGSVGElement, unknown, null, undefined>;
export type plotFn<TData> = (svg: d3svg, data: TData) => void;
export type d3scale = d3.ScaleLinear<number, number, never>;
export type d3selection = d3.Selection<SVGGElement, unknown, null, undefined>;

export default function Plot<T>({
  data,
  draw,
  dimensions,
  ...rest
}: {
  data: T;
  draw: plotFn<T>;
  dimensions: IDimensions;
} & React.ComponentPropsWithRef<'svg'>) {
  const plotter = new DataPlotter<T>(draw);
  const { width = '100%', height = '100%' } = dimensions;

  const svgRef = useRef<SVGSVGElement>(null);

  const plot = () => {
    if (!svgRef.current) {
      return;
    }
    const svg = d3.select(svgRef.current);
    plotter.update(svg, data);
  };

  useEffect(() => {
    plot();
  }, [data]);

  useEffect(() => {
    window.addEventListener('resize', plot, false);
  }, []);

  return <svg ref={svgRef} width={width} height={height} {...rest} />;
}
