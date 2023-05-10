export default class ModelComponent {
  constructor(type: ModelComponentType) {}
}

export enum ModelComponentType {
  Pipe,
  Source,
  Sink,
}

export class Pipe extends ModelComponent {
  constructor(public readonly name) {
    super(ModelComponentType.Pipe);
  }
}

export class Source extends ModelComponent {
  constructor(public readonly name) {
    super(ModelComponentType.Source);
  }
}

export class Sink extends ModelComponent {
  constructor(public readonly name) {
    super(ModelComponentType.Sink);
  }
}
