'use client';
import { d3scale, d3selection, d3svg, IMargin } from '..';

export abstract class AxisGenerator<TData> {
  constructor(
    protected readonly dimensions: {
      width: number;
      height: number;
      margin: IMargin;
    }
  ) {}

  abstract scale(data: TData): {
    x: d3scale;
    y: d3scale;
  };

  abstract xAxis(g: d3selection, x: d3scale, height: number): d3selection;
  abstract yAxis(g: d3selection, y: d3scale, title: string): d3selection;

  abstract applyXAxis(svg: d3svg, x: d3scale, height: number): d3selection;
  abstract applyYAxis(svg: d3svg, y: d3scale, title: string): d3selection;
}
