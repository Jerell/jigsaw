'use client';
import { d3svg } from '@/components/plot/d3';
import { PointPlotter } from '../plot/d3/points';
import { StageItem } from './StageItem';
import { ScaleLinear } from 'd3';
import clsxm from '@/lib/clsxm';
import styles from './stage.module.css';
import * as d3 from 'd3';

export default class StageItemPlotter extends PointPlotter<StageItem[]> {
  constructor(
    private readonly scales: {
      x: ScaleLinear<number, number, never>;
      y: ScaleLinear<number, number, never>;
    },
    private readonly refreshItems: () => void,
    private readonly xAccessor: (d: StageItem) => number = (d?: StageItem) =>
      d?.coords.x || 0,
    private readonly yAccessor: (d: StageItem) => number = (d?: StageItem) =>
      d?.coords.y || 0
  ) {
    super();
  }

  plot(svg: d3svg, data: StageItem[]) {
    svg.selectAll('g.nodes').remove();

    const invert = {
      x: this.scales.x.invert,
      y: this.scales.y.invert,
    };

    return svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', (d) => clsxm([styles.node, styles[d.component.type]]))
      .attr('r', 22)
      .attr('cx', (d, i) => this.scales.x(d.coords.x))
      .attr('cy', (d, i) => this.scales.y(d.coords.y))
      .call(
        d3
          .drag<SVGCircleElement, StageItem>()
          .on('drag', function (event: DragEvent, d: StageItem) {
            const item = d3.select(this);
            item.raise().attr('cx', event.x);
            item.raise().attr('cy', event.y);
            d.move({ x: invert.x(event.x), y: invert.y(event.y) });
          })
      );
  }
}
