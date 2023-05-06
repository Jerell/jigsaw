'use client';
import { plotFn, d3svg } from './index';

export class DataPlotter<TData> {
  constructor(public readonly plot: plotFn<TData>) {}

  update(svg: d3svg, data: TData) {
    if (!svg || !data) return;
    this.plot(svg, data);
  }
}
