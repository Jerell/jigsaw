'use client';
import { StageItem } from './StageItem';
import * as d3 from 'd3';

export function makeDraggable<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  move: (
    d3Element: d3.Selection<U, unknown, null, undefined>,
    { x, y }: { x: number; y: number }
  ) => void
) {
  return nodes.call(
    d3
      .drag<U, T>()
      .on(
        'drag',
        function (event: DragEvent & { dx: number; dy: number }, d: T) {
          d.move({
            x: event.dx,
            y: event.dy,
          });

          move(d3.select(this), d.movement);
        }
      )
  );
}
