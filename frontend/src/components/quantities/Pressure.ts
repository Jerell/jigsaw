import { convertAndGetValue, withUnit } from '@oliasoft-open-source/units';
import { PhysicalQuantity } from './PhysicalQuantity';

export class Pressure extends PhysicalQuantity {
  valueWithUnit: string;

  constructor(value: number, unit: string) {
    super('pressure');
    this.validateUnit(unit);

    this.valueWithUnit = withUnit(value, unit);
  }

  as(unit: string): number {
    this.validateUnit(unit);
    return convertAndGetValue(this.valueWithUnit, unit);
  }
}
