export default class ModelComponent {
  constructor(public type: ModelComponentType, public name: string) {}
}

export enum ModelComponentType {
  Pipe,
  Source,
  Sink,
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
