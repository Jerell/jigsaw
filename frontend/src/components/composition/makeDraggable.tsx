'use client';
import { StageItem } from './StageItem';
import * as d3 from 'd3';

export function makeDraggable<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  {
    start,
    move,
    end,
  }: {
    start?: (d3Element: d3.Selection<U, unknown, null, undefined>) => void;
    move?: (
      dd3Element: d3.Selection<U, unknown, null, undefined>,
      { x, y }: { x: number; y: number }
    ) => void;
    end?: (d3Element: d3.Selection<U, unknown, null, undefined>) => void;
  }
) {
  return nodes.call(
    d3
      .drag<U, T>()
      .on('start', function (event: DragEvent, d: T) {
        start && start(d3.select(this));
      })
      .on(
        'drag',
        function (event: DragEvent & { dx: number; dy: number }, d: T) {
          d.move({
            x: event.dx,
            y: event.dy,
          });

          move && move(d3.select(this), d.movement);
        }
      )
      .on('end', function (event: DragEvent, d: T) {
        end && end(d3.select(this));
      })
  );
}

export function onDragEnd<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  end: (d3Element: d3.Selection<U, unknown, null, undefined>) => void
) {
  return nodes.call(
    d3.drag<U, T>().on('end', function (event: DragEvent, d: T) {
      end(d3.select(this));
    })
  );
}

export function onDragStart<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  start: (d3Element: d3.Selection<U, unknown, null, undefined>) => void
) {
  return nodes.call(
    d3.drag<U, T>().on('start', function (event: DragEvent, d: T) {
      start(d3.select(this));
    })
  );
}

export function drag<U extends SVGElement, T extends StageItem>(
  nodes: d3.Selection<U, T, SVGGElement, unknown>,
  start: (d3Element: d3.Selection<U, unknown, null, undefined>) => void,
  move: (
    dd3Element: d3.Selection<U, unknown, null, undefined>,
    { x, y }: { x: number; y: number }
  ) => void,
  end: (d3Element: d3.Selection<U, unknown, null, undefined>) => void
) {
  return nodes.call(
    d3
      .drag<U, T>()
      .on('start', function (event: DragEvent, d: T) {
        start(d3.select(this));
      })
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
      .on('end', function (event: DragEvent, d: T) {
        end(d3.select(this));
      })
  );
}
