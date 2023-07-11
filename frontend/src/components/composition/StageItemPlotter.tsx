'use client';
import { d3svg } from '@/components/plot/d3';
import { PointPlotter } from '../plot/d3/points';
import { StageItem } from './StageItem';
import clsxm from '@/lib/clsxm';
import styles from './stage.module.css';
import * as d3 from 'd3';
import { dragMoveG } from './dragMoveG';
import { makeDraggable, onDragEnd, onDragStart } from './makeDraggable';
import { displayState } from './displayState';

export default class StageItemPlotter<T extends StageItem> extends PointPlotter<
  T[]
> {
  private setPosition: Record<'x' | 'y', (d?: T) => number>;

  private actives: {
    item: StageItem | null;
    node: d3.Selection<any, T, SVGGElement | null, unknown> | null;
  }[] = [];
  private lastActivated = () => this.actives[this.actives.length - 1];

  private dragNode: T | null = null;
  private mouseOverNode: T | null = null;

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

    this.setPosition = Object.entries(this.scales).reduce(
      (acc, [k, sc]) => (
        (acc[k] = (d?: T) => sc(this.coordAccessors[k](d))), acc
      ),
      {} as typeof this.coordAccessors
    );
  }

  private changeActiveState = <U extends SVGElement>(
    changer: () => void,
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) => {
    changer();
    displayState(d, (e) => e.active, styles.active, d3node);
  };

  private nodeKeypress<U extends SVGElement>(
    event: KeyboardEvent,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) {
    const { key } = event;

    const activate = (d: T) => {
      d.activate();
      if (!this.actives.find((a) => a.item === d)) {
        this.actives.push({ item: d, node: d3node });
      }
    };

    const deactivate = (d: T) => {
      d.deactivate();
      const idx = this.actives.findIndex((a) => a.item === d);
      if (idx >= 0) {
        this.actives.splice(idx, 1);
      }
    };

    const toggleActive = (d: T) => {
      if (d.active) {
        deactivate(d);
      } else {
        activate(d);
      }
    };

    const events: {
      [k: string]: (d: T, action?: (k: string, d: T) => void) => void;
    } = {
      Enter: this.nodeSelect,
      a: (d) => this.changeActiveState(() => activate(d), d, d3node),
      s: (d) => this.changeActiveState(() => toggleActive(d), d, d3node),
      d: (d) => this.changeActiveState(() => deactivate(d), d, d3node),
      l: (d) => {
        console.log(d, this.lastActivated());
      },
    };

    return Object.keys(events).includes(key) ? events[key] : () => {};
  }
  private nodeClick<U extends SVGElement>(
    event: PointerEvent,
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) {
    if (event.altKey) {
      console.log(this.lastActivated()?.item?.coords, '->', d.coords);
    } else {
      this.nodeSelect(d);
    }
  }

  private nodeHoverEnter<U extends SVGElement>(
    event: PointerEvent,
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) {
    this.mouseOverNode = d;
  }

  private nodeHoverLeave<U extends SVGElement>(
    event: PointerEvent,
    d: T,
    d3node: d3.Selection<U, T, SVGGElement | null, unknown>
  ) {
    this.mouseOverNode = null;
  }

  private createNodes(
    d3EnterSelection: d3.Selection<d3.EnterElement, T, SVGGElement, unknown>,
    selected: number
  ) {
    const that = this;
    return makeDraggable(d3EnterSelection.append('g'), { move: dragMoveG })
      .attr('tabindex', 0)
      .attr('class', (d, i) =>
        clsxm(
          styles.node,
          styles[d.component.type],
          selected === i && styles.selected,
          d.active && styles.active
        )
      )
      .attr('transform', (d) => `translate(${d.movement.x}, ${d.movement.y})`)
      .on('click', function (e, d) {
        that.nodeClick(e, d, d3.select(this));
      })
      .on('keydown', function (e, d) {
        that.nodeKeypress(e, d3.select(this))(d);
      })
      .on('mouseenter', function (e, d) {
        that.nodeHoverEnter(e, d, d3.select(this));
      })
      .on('mouseleave', function (e, d) {
        that.nodeHoverLeave(e, d, d3.select(this));
      });
  }

  private drawNodeBase(
    nodes: d3.Selection<SVGGElement, T, SVGGElement, unknown>
  ) {
    return nodes
      .append('circle')
      .attr('r', 22)
      .attr('cx', this.setPosition.x)
      .attr('cy', this.setPosition.y);
  }

  private drawNodeHandles(
    nodes: d3.Selection<SVGGElement, T, SVGGElement, unknown>
  ) {
    const configs: {
      [type: string]: {
        offset: number;
      };
    } = {
      inlet: {
        offset: -22,
      },
      outlet: {
        offset: 22,
      },
    };

    const makeHandle = (c: keyof typeof configs) =>
      nodes
        .append('circle')
        .attr('tabindex', 0)
        .attr('r', 5)
        .attr('cx', (d) => this.setPosition.x(d) + configs[c].offset)
        .attr('cy', this.setPosition.y)
        .attr('name', c)
        .attr('class', styles.handle);

    const inlets = makeHandle('inlet');
    const outlets = makeHandle('outlet');

    makeDraggable(inlets, {
      start: () => {
        this.dragNode = this.mouseOverNode;
        console.log(this.dragNode);
      },
      // move: draw preview line,
      end: () => this.dragNode?.attach('inlets', this.mouseOverNode),
    });

    makeDraggable(outlets, {
      start: () => {
        this.dragNode = this.mouseOverNode;
        console.log(this.dragNode);
      },
      // move: draw preview line,
      end: () => this.dragNode?.attach('outlets', this.mouseOverNode),
    });

    return nodes;
  }

  plot(svg: d3svg, data: T[], selected: number) {
    svg.selectAll('g.nodes').remove();

    const g = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data)
      .enter();

    const nodes = this.createNodes(g, selected);

    this.drawNodeBase(nodes);
    this.drawNodeHandles(nodes);

    return nodes;
  }
}
