'use client';
import ModelComponent from '@/lib/ModelComponent';
import { ScatterPoint2D } from '../plot/d3/datatypes';

export class StageItem {
  public active = false;
  constructor(
    public readonly component: ModelComponent,
    public coords: ScatterPoint2D = { x: 10, y: 10 }
  ) {}

  move({ x, y }: ScatterPoint2D) {
    this.coords = { x, y };
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
}
