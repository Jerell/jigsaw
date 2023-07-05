'use client';

import { ScaleLinear } from 'd3';
import { d3svg } from '..';

export abstract class PointPlotter<TData> {
  abstract plot(svg: d3svg, data: TData, ...rest): void;
}

export type PointPlotterConstructor<TData> = new () => PointPlotter<TData>;
