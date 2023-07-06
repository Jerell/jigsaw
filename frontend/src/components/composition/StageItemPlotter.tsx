'use client';
import { d3svg } from '@/components/plot/d3';
import { PointPlotter } from '../plot/d3/points';
import { StageItem } from './StageItem';
import clsxm from '@/lib/clsxm';
import styles from './stage.module.css';
import * as d3 from 'd3';

export default class StageItemPlotter<T extends StageItem> extends PointPlotter<
  T[]
> {
  private position: Record<'x' | 'y', (d?: T) => number>;

  constructor(
    private readonly scales: {
      x: d3.ScaleContinuousNumeric<number, number, never>;
      y: d3.ScaleContinuousNumeric<number, number, never>;
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

  private coreNodeBehaviour<T extends StageItem, U extends SVGElement>(
    nodes: d3.Selection<U, T, SVGGElement, unknown>,
    selected: number
  ) {
    return nodes
      .attr('tabindex', 0)
      .attr('class', (d, i) =>
        clsxm(
          styles.node,
          styles[d.component.type],
          selected === i && styles.selected
        )
      );
  }

  private circles(
    d3EnterSelection: d3.Selection<d3.EnterElement, T, SVGGElement, unknown>,
    selected: number
  ) {
    return this.coreNodeBehaviour(
      d3EnterSelection
        .append('circle')
        .attr('r', 22)
        .attr('cx', this.position.x)
        .attr('cy', this.position.y),
      selected
    );
  }

  plot(svg: d3svg, data: T[], selected: number) {
    svg.selectAll('g.nodes').remove();

    const g = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data)
      .enter();

    return makeDraggable(
      setKeybinds(this.circles(g, selected)),
      dragMoveCircleSvg,
      this.scales
    );
  }
}

function dragMoveCircleSvg(
  circle: d3.Selection<SVGCircleElement, unknown, null, undefined>,
  event: DragEvent
) {
  circle.raise().attr('cx', event.x);
  circle.raise().attr('cy', event.y);
}

function makeDraggable<T extends StageItem, U extends SVGElement>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  onDrag: (
    d3Element: d3.Selection<U, unknown, null, undefined>,
    event: DragEvent
  ) => void,
  scales: {
    x: d3.ScaleContinuousNumeric<number, number, never>;
    y: d3.ScaleContinuousNumeric<number, number, never>;
  }
) {
  return nodes.call(
    d3.drag<U, T>().on('drag', function (event: DragEvent, d: T) {
      onDrag(d3.select(this), event);
      d.move({ x: scales.x.invert(event.x), y: scales.y.invert(event.y) });
    })
  );
}

function setKeybinds<T extends StageItem, U extends SVGElement>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>
) {
  return nodes;
}
