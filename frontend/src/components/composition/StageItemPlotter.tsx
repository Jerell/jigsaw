'use client';
import { d3selection, d3svg } from '@/components/plot/d3';
import { PointPlotter } from '../plot/d3/points';
import { StageItem } from './StageItem';
import clsxm from '@/lib/clsxm';
import styles from './stage.module.css';
import * as d3 from 'd3';
import { dragMoveG } from './dragMoveG';
import { makeDraggable } from './makeDraggable';
import { displayState } from './displayState';
import ModelComponent from '@/lib/ModelComponent';

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

  private handleConfig: {
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

    const change = (fn: (datapoint: T) => void) => (d) =>
      this.changeActiveState(() => fn(d), d, d3node);

    const events: {
      [k: string]: (d: T, action?: (k: string, d: T) => void) => void;
    } = {
      Enter: this.nodeSelect,
      a: change(activate),
      s: change(toggleActive),
      d: change(deactivate),
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
    return makeDraggable(d3EnterSelection.append('g'), {
      move: dragMoveG,
      moveElement: true,
    })
      .append('g')
      .attr('tabindex', 0)
      .attr('class', (d, i) =>
        clsxm(
          styles.node,
          styles[d.component.type],
          selected === i && styles.selected,
          d.active && styles.active
        )
      )
      .attr(
        'transform',
        (d) => `translate(${d.displacement.x}, ${d.displacement.y})`
      )
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
    const makeHandle = (c: keyof typeof this.handleConfig) =>
      nodes
        .append('circle')
        .attr('tabindex', 0)
        .attr('r', 5)
        .attr('cx', (d) => this.setPosition.x(d) + this.handleConfig[c].offset)
        .attr('cy', this.setPosition.y)
        .attr('name', c)
        .attr('class', styles.handle);

    const inlets = makeHandle('inlet');
    const outlets = makeHandle('outlet');

    for (const [side, n] of [
      ['inlets', inlets],
      ['outlets', outlets],
    ] as const) {
      makeDraggable(n, {
        start: () => {
          this.dragNode = this.mouseOverNode;
          console.log(this.dragNode);
        },
        move: () => {
          // draw preview line,
        },

        end: () => {
          const action = {
            inlets: () => this.mouseOverNode?.attach('outlets', this.dragNode),
            outlets: () => this.dragNode?.attach('outlets', this.mouseOverNode),
          };
          action[side]();
        },
        moveElement: false,
      });
    }

    return nodes;
  }

  private createLinks(
    d3EnterSelection: d3.Selection<
      d3.EnterElement,
      {
        source: [number, number];
        target: [number, number];
      },
      SVGGElement,
      unknown
    >
  ) {
    return d3EnterSelection
      .append('path')
      .attr('class', styles.link)
      .attr('d', (d) => {
        const coords = Object.assign({}, d);
        console.log(coords);
        coords.source[0] += this.handleConfig.outlet.offset;
        coords.target[0] += this.handleConfig.inlet.offset;
        return d3.line()(Object.values(coords));
      });
  }

  plot(g: d3selection, data: T[], selected: number) {
    g.selectAll('g.nodes').remove();

    const gLines = g
      .append('g')
      .attr('class', 'links')
      .selectAll('circle')
      .data(getItemLines(data, this.scales))
      .enter();

    const gNodes = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data)
      .enter();

    const nodes = this.createNodes(gNodes, selected);
    this.drawNodeBase(nodes);
    this.drawNodeHandles(nodes);

    const links = this.createLinks(gLines);
  }
}

const getItemByComponent = (c: ModelComponent, items: StageItem[]) =>
  items.find((i) => i.component === c);

const getItemCoordsByComponent = (c: ModelComponent, items: StageItem[]) =>
  getItemByComponent(c, items)?.coords;

const getItemDisplacementByComponent = (
  c: ModelComponent,
  items: StageItem[]
) => getItemByComponent(c, items)?.displacement ?? { x: 0, y: 0 };

const getOutletLineEnds = (component: ModelComponent) => {
  return component.outlets.reduce((acc, o) => {
    acc.push({ source: component, target: o });
    return acc;
  }, [] as { source: ModelComponent; target: ModelComponent }[]);
};

const lineEndsToCoords = (
  items: StageItem[],
  sd: { source: ModelComponent; target: ModelComponent },
  scales: {
    x: d3.ScaleContinuousNumeric<number, number, never>;
    y: d3.ScaleContinuousNumeric<number, number, never>;
  }
) =>
  Object.entries(sd).reduce((acc, [k, v]) => {
    const coords = getItemCoordsByComponent(v, items);
    if (!coords) return acc;
    acc[k] = [scales.x(coords.x), scales.y(coords.y)];
    return acc;
  }, {} as { source: [number, number]; target: [number, number] });

const getItemLines = (
  items: StageItem[],
  scales: {
    x: d3.ScaleContinuousNumeric<number, number, never>;
    y: d3.ScaleContinuousNumeric<number, number, never>;
  }
) =>
  items
    .map((item) =>
      getOutletLineEnds(item.component)
        .map((le) => lineEndsToCoords(items, le, scales))
        .filter((c) => c.target)
    )
    .flat();
