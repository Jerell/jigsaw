'use client';
import { d3svg } from '@/components/plot/d3';
import { PointPlotter } from '../plot/d3/points';
import { StageItem } from './StageItem';
import { ScaleLinear } from 'd3';
import clsxm from '@/lib/clsxm';
import styles from './stage.module.css';
import * as d3 from 'd3';

export default class StageItemPlotter<T extends StageItem> extends PointPlotter<
  T[]
> {
  private position: Record<'x' | 'y', (d?: T) => number>;

  constructor(
    private readonly scales: {
      x: ScaleLinear<number, number, never>;
      y: ScaleLinear<number, number, never>;
    },
    private readonly coordAccessors: Record<
      keyof typeof scales,
      (d?: T) => number
    > = {
      x: (d?: T) => d?.coords.x || 0,
      y: (d?: T) => d?.coords.y || 0,
    }
  ) {
    super();

    this.position = Object.entries(this.scales).reduce(
      (acc, [k, sc]) => (
        (acc[k] = (d?: T) => sc(this.coordAccessors[k](d))), acc
      ),
      {} as typeof this.coordAccessors
    );
  }

  plot(svg: d3svg, data: T[], selection: number) {
    svg.selectAll('g.nodes').remove();

    const g = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data)
      .enter();

    const invert = {
      x: this.scales.x.invert,
      y: this.scales.y.invert,
    };

    const circles = (
      g: d3.Selection<d3.EnterElement, T, SVGGElement, unknown>
    ) =>
      g
        .append('circle')
        .attr('class', (d, i) =>
          clsxm(
            styles.node,
            styles[d.component.type],
            selection === i && styles.selected
          )
        )
        .attr('r', 22)
        .attr('cx', this.position.x)
        .attr('cy', this.position.y);

    const draggableCircles = (
      g: d3.Selection<d3.EnterElement, T, SVGGElement, unknown>
    ) => {
      return circles(g).call(
        d3
          .drag<SVGCircleElement, T>()
          .on('drag', function (event: DragEvent, d: T) {
            dragMoveCircleSvg(d3.select(this), event);
            d.move({ x: invert.x(event.x), y: invert.y(event.y) });
          })
      );
    };

    return draggableCircles(g);
  }
}

function dragMoveCircleSvg(
  circle: d3.Selection<SVGCircleElement, unknown, null, undefined>,
  event: DragEvent
) {
  circle.raise().attr('cx', event.x);
  circle.raise().attr('cy', event.y);
}
