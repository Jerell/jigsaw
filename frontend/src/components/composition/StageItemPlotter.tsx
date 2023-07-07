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
  private displayActiveState = <U extends SVGElement>(
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) => displayState(d, (e) => e.active, styles.active, d3node);

  private changeActiveState = <U extends SVGElement>(
    changer: () => void,
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) => {
    changer();
    this.displayActiveState(d, d3node);
  };

  private nodeKeypress<U extends SVGElement>(
    event: KeyboardEvent,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) {
    const { key } = event;

    const events: {
      [k: string]: (d: T, action?: (k: string, d: T) => void) => void;
    } = {
      Enter: this.nodeSelect,
      a: (d) => this.changeActiveState(() => d.activate(), d, d3node),
      s: (d) => this.changeActiveState(() => d.toggleActive(), d, d3node),
      d: (d) => this.changeActiveState(() => d.deactivate(), d, d3node),
    };

    return Object.keys(events).includes(key) ? events[key] : () => {};
  }
  private nodeClick<U extends SVGElement>(
    event: PointerEvent,
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) {
    if (event.altKey) {
      displayState(d, (e) => e.active, styles.active, d3node);
    } else {
      this.nodeSelect(d);
    }
  }

  constructor(
    private readonly scales: {
      x: d3.ScaleContinuousNumeric<number, number, never>;
      y: d3.ScaleContinuousNumeric<number, number, never>;
    },
    private readonly nodeSelect: (d: T) => void,
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

  private coreNodeBehaviour<U extends SVGElement>(
    nodes: d3.Selection<U, T, SVGGElement, unknown>,
    selected: number,
    move: (
      d3Element: d3.Selection<U, unknown, null, undefined>,
      { x, y }: { x: number; y: number }
    ) => void
  ) {
    const that = this;
    const g = nodes
      .attr('tabindex', 0)
      .attr('class', (d, i) =>
        clsxm(
          styles.node,
          styles[d.component.type],
          selected === i && styles.selected
        )
      )
      .on('click', function (e, d) {
        that.nodeClick(e, d, d3.select(this));
      })
      .on('keydown', function (e, d) {
        that.nodeKeypress(e, d3.select(this))(d);
      });

    return makeDraggable(g, move, this.scales);
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
      selected,
      dragMoveCircleSvg
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

    return this.circles(g, selected);
  }
}

function dragMoveCircleSvg(
  circle: d3.Selection<SVGCircleElement, unknown, null, undefined>,
  { x, y }: { x: number; y: number }
) {
  circle.raise().attr('cx', x);
  circle.raise().attr('cy', y);
}

function makeDraggable<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  move: (
    d3Element: d3.Selection<U, unknown, null, undefined>,
    { x, y }: { x: number; y: number }
  ) => void,
  scales: {
    x: d3.ScaleContinuousNumeric<number, number, never>;
    y: d3.ScaleContinuousNumeric<number, number, never>;
  }
) {
  return nodes.call(
    d3.drag<U, T>().on('drag', function (event: DragEvent, d: T) {
      move(d3.select(this), event);
      d.move({ x: scales.x.invert(event.x), y: scales.y.invert(event.y) });
    })
  );
}

function displayState<U extends SVGElement, T extends StageItem>(
  d: T,
  getState: (e: T) => boolean,
  className: string,
  d3node: d3.Selection<U, T, SVGGElement | null, unknown>
) {
  d3node.classed(className, getState(d));
}
