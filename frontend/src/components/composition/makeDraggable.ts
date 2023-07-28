'use client';
import { StageItem } from './StageItem';
import * as d3 from 'd3';

export function makeDraggable<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  {
    start,
    move,
    end,
    moveElement,
  }: {
    start?: (d3Element: d3.Selection<U, unknown, null, undefined>) => void;
    move?: (
      dd3Element: d3.Selection<U, unknown, null, undefined>,
      { x, y }: { x: number; y: number }
    ) => void;
    end?: (d3Element: d3.Selection<U, unknown, null, undefined>) => void;
    moveElement: boolean;
  }
) {
  return nodes.call(
    d3
      .drag<U, T>()
      .on(
        'start',
        function (event: DragEvent & { sourceEvent: MouseEvent }, d: T) {
          event.sourceEvent.stopPropagation();
          start && start(d3.select(this));
        }
      )
      .on(
        'drag',
        function (
          event: DragEvent & {
            dx: number;
            dy: number;
            sourceEvent: MouseEvent;
          },
          d: T
        ) {
          event.sourceEvent.stopPropagation();

          if (moveElement) {
            d.move({
              x: event.dx,
              y: event.dy,
            });
          }

          move && move(d3.select(this), d.displacement);
        }
      )
      .on(
        'end',
        function (event: DragEvent & { sourceEvent: MouseEvent }, d: T) {
          event.sourceEvent.stopPropagation();
          end && end(d3.select(this));
        }
      )
  );
}
