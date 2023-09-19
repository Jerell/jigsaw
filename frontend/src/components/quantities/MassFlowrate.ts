import { convertAndGetValue, withUnit } from '@oliasoft-open-source/units';
import { PhysicalQuantity } from './PhysicalQuantity';

export class MassFlowrate extends PhysicalQuantity {
  valueWithUnit: string;

  constructor(value: number, unit: string) {
    super('massFlowRate');
    this.validateUnit(unit);

    this.valueWithUnit = withUnit(value, unit);
  }

  as(unit: string): number {
    this.validateUnit(unit);
    return convertAndGetValue(this.valueWithUnit, unit);
  }
}
