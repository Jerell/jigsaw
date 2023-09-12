'use client';

import Button from '@/components/buttons/Button';
import Display from '@/components/quantities/Display';
import { ArbitraryQuantity } from '@/components/quantities/PhysicalQuantity';
import { Temperature } from '@/components/quantities/Temperature';
import { UnitContext } from '@/components/quantities/UnitContextProvider';
import { withUnit } from '@oliasoft-open-source/units';
import { useContext } from 'react';

export default function Page() {
  const unitState = useContext(UnitContext);

  return (
    <>
      <div className='flex flex-row gap-2 justify-center'>
        {unitState.get(Temperature)?.list.map((t) => (
          <Button
            key={t}
            onClick={() => {
              unitState.get(Temperature)?.set(t);
            }}
          >
            {t}
          </Button>
        ))}
      </div>

      <Display>{new Temperature(10, 'C')}</Display>
      <Display>{new Temperature(20, 'C')}</Display>
      <Display valueWithUnit={new Temperature(20, 'C').valueWithUnit} />
      {/* <Display
        valueWithUnit={new Temperature(20, 'C').convert('K').valueWithUnit}
      /> */}

      {/* <Display valueWithUnit={withUnit(1, 'ppb')} />
      <Display>{new ArbitraryQuantity(1, 'ppm')}</Display> */}
    </>
  );
}
