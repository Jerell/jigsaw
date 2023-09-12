import {
  cleanNum,
  getUnitsForQuantity,
  split,
  withUnit,
} from '@oliasoft-open-source/units';

export type PQ = { new (a: number, b: string): PhysicalQuantity };

export abstract class PhysicalQuantity {
  abstract valueWithUnit: string;

  protected validateUnit(unit: string) {
    const unitOptions = getUnitsForQuantity(this.kind) as string[];
    if (!unitOptions?.includes(unit)) {
      throw new Error(`unsupported ${this.kind} unit: ${unit}`);
    }
  }

  constructor(public readonly kind: string) {}

  abstract as(unit: string): number;

  public convert(unit: string) {
    this.validateUnit(unit);
    return withUnit(this.as(unit), unit);
  }
}

export class ArbitraryQuantity extends PhysicalQuantity {
  valueWithUnit: string;

  constructor(value: number, unit: string, kind = 'arbitrary') {
    super(kind);
    this.valueWithUnit = withUnit(value, unit);
  }

  as(unit: string): number {
    // ignores requested unit
    return cleanNum(split(this.valueWithUnit)[0]);
  }
}
