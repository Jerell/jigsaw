'use client';
import ModelComponent from '@/lib/ModelComponent';
import { ScatterPoint2D } from '../plot/d3/datatypes';

export class StageItem {
  public active = false;
  public displacement: ScatterPoint2D = { x: 0, y: 0 };
  constructor(
    public readonly component: ModelComponent,
    public coords: ScatterPoint2D = { x: 10, y: 10 }
  ) {}

  move({ x, y }: ScatterPoint2D) {
    this.displacement = {
      x: this.displacement.x + x,
      y: this.displacement.y + y,
    };
  }

  activate() {
    this.active = true;
    return this;
  }
  deactivate() {
    this.active = false;
    return this;
  }
  toggleActive() {
    this.active = !this.active;
    return this;
  }

  attach(side: 'inlets' | 'outlets', item: StageItem | null) {
    if (!item) return;
    if (!this.component[side].includes(item.component)) {
      this.component.attach(side, item.component);
    }
    console.log(this.component, side, this.component[side]);
  }
}
