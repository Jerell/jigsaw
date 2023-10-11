import { v4 as uuidv4 } from 'uuid';
import { ToParsedJSON } from './ToParsedJSON';
import { Pressure } from '@/components/quantities/Pressure';

export default class ModelComponent {
  public inlets: ModelComponent['ID'][] = [];
  public outlets: ModelComponent['ID'][] = [];
  constructor(
    public type: ModelComponentType,
    public name: string,
    public ID: string = uuidv4()
  ) {}

  attach(side: 'inlets' | 'outlets', item: ModelComponent | null) {
    item &&
      item !== this &&
      !this[side].includes(item.ID) &&
      this[side].push(item.ID);
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
    public readonly roughness: number,
    ID: string = uuidv4()
  ) {
    super(ModelComponentType.Pipe, name, ID);
  }

  rename(name: string): Pipe {
    return new Pipe(name, this.diameter, this.roughness, this.ID);
  }

  setDiameter(d: number): Pipe {
    return new Pipe(this.name, d, this.roughness, this.ID);
  }

  setRoughness(r: number): Pipe {
    return new Pipe(this.name, this.diameter, r, this.ID);
  }
}

export class Source extends ModelComponent {
  constructor(
    name: string,
    ID: string = uuidv4(),
    public readonly pressure = new Pressure(1, 'bar')
  ) {
    super(ModelComponentType.Source, name, ID);

    this.pressure = new Pressure(1, 'bar');
  }

  setPressure(p: Pressure) {
    return new Source(this.name, this.ID, p);
  }
}

export class Sink extends ModelComponent {
  constructor(name: string, ID: string = uuidv4()) {
    super(ModelComponentType.Sink, name, ID);
  }
}

export function constructFromJson(mcjson: ToParsedJSON<ModelComponent>) {
  const construct = {
    [ModelComponentType.Pipe]: (mcjson: ToParsedJSON<Pipe>) =>
      new Pipe(mcjson.name, mcjson.diameter, mcjson.roughness, mcjson.ID),

    [ModelComponentType.Source]: (mcjson: ToParsedJSON<Source>) =>
      new Source(mcjson.name, mcjson.ID),

    [ModelComponentType.Sink]: (mcjson: ToParsedJSON<Sink>) =>
      new Sink(mcjson.name, mcjson.ID),
  };

  const { type: mcType } = mcjson;

  switch (mcType) {
    case ModelComponentType.Pipe:
      const pipe = (
        construct[mcjson.type] as (typeof construct)[ModelComponentType.Pipe]
      )(mcjson as ToParsedJSON<Pipe>);
      Object.assign(pipe, mcjson);
      return pipe;

    case ModelComponentType.Source:
      const source = (
        construct[mcjson.type] as (typeof construct)[ModelComponentType.Source]
      )(mcjson as ToParsedJSON<Source>);
      Object.assign(source, mcjson);
      return source;

    case ModelComponentType.Sink:
      const sink = (
        construct[mcjson.type] as (typeof construct)[ModelComponentType.Sink]
      )(mcjson as ToParsedJSON<Sink>);
      Object.assign(sink, mcjson);
      return sink;

    default:
      throw new Error(`unknown component type: ${mcType}`);
  }
}
