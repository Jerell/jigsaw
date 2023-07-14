export default class ModelComponent {
  public inlets: ModelComponent[] = [];
  public outlets: ModelComponent[] = [];
  constructor(public type: ModelComponentType, public name: string) {}

  attach(side: 'inlets' | 'outlets', item: ModelComponent | null) {
    item && item !== this && this[side].push(item);
  }
}

export enum ModelComponentType {
  Pipe = 'pipe',
  Source = 'source',
  Sink = 'sink',
}

export class Pipe extends ModelComponent {
  constructor(
    name: string,
    public readonly diameter: number,
    public readonly roughness: number
  ) {
    super(ModelComponentType.Pipe, name);
  }

  rename(name: string): Pipe {
    return new Pipe(name, this.diameter, this.roughness);
  }

  setDiameter(d: number): Pipe {
    return new Pipe(this.name, d, this.roughness);
  }

  setRoughness(r: number): Pipe {
    return new Pipe(this.name, this.diameter, r);
  }
}

export class Source extends ModelComponent {
  constructor(name: string) {
    super(ModelComponentType.Source, name);
  }
}

export class Sink extends ModelComponent {
  constructor(name: string) {
    super(ModelComponentType.Sink, name);
  }
}
