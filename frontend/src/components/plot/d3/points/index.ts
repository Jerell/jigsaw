'use client';

import { ScaleLinear } from 'd3';
import { d3selection, d3svg } from '..';

export abstract class PointPlotter<TData> {
  abstract plot(g: d3selection, data: TData, ...rest): void;
}

export type PointPlotterConstructor<TData> = new () => PointPlotter<TData>;
