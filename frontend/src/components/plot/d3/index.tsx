/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as d3 from 'd3';
import { ComponentPropsWithRef, useEffect, useRef } from 'react';
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

export default function Plot<T>({
  data,
  dimensions,
  dataPlotter,
  className,
}: {
  data: T;
  dimensions?: IDimensions;
  dataPlotter: DataPlotter<T>;
} & ComponentPropsWithRef<'svg'>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { width = '100%', height = '100%' } = dimensions || {};

  const plot = () => {
    if (!svgRef.current || !dataPlotter) {
      return;
    }

    const svg = d3.select(svgRef.current);
    dataPlotter.update(svg, data);
  };

  const render = () => {
    plot();
  };

  useEffect(render, [data]);

  useEffect(() => {
    window.addEventListener('resize', render, false);
  }, []);

  return (
    <svg ref={svgRef} width={width} height={height} className={className} />
  );
}

export type d3svg = d3.Selection<SVGSVGElement, unknown, null, undefined>;
export type plotFn<TData> = (svg: d3svg, data: TData) => void;
export type d3scale = d3.ScaleLinear<number, number, never>;
export type d3selection = d3.Selection<SVGGElement, unknown, null, undefined>;
