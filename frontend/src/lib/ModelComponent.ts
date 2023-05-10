export default class ModelComponent {
  constructor(
    public readonly type: ModelComponentType,
    public readonly name: string
  ) {}
}

export enum ModelComponentType {
  Pipe,
  Source,
  Sink,
}

export class Pipe extends ModelComponent {
  constructor(name: string) {
    super(ModelComponentType.Pipe, name);
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
