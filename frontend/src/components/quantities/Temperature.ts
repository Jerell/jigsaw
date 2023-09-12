import { convertAndGetValue, withUnit } from '@oliasoft-open-source/units';
import { ArbitraryQuantity, PhysicalQuantity } from './PhysicalQuantity';

export class Temperature extends PhysicalQuantity {
  valueWithUnit: string;

  constructor(value: number, unit: string) {
    super('temperature');
    this.validateUnit(unit);

    this.valueWithUnit = withUnit(value, unit);
  }

  as(unit: string): number {
    this.validateUnit(unit);
    return convertAndGetValue(this.valueWithUnit, unit);
  }
}
