import { Pipe, Objects, Booleans } from 'hotscript';

export type ToParsedJSON<T> = Pipe<
  T,
  [
    Objects.OmitBy<Booleans.Equals<symbol>>,
    Objects.OmitBy<Booleans.Extends<Function>>
  ]
>;
