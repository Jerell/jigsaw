'use client';

import Button from '@/components/buttons/Button';
import Display from '@/components/quantities/Display';
import Input from '@/components/quantities/Input';
import Inputs from '@/components/quantities/Inputs';
import { ArbitraryQuantity } from '@/components/quantities/PhysicalQuantity';
import { Temperature } from '@/components/quantities/Temperature';
import { UnitContext } from '@/components/quantities/UnitContextProvider';
import { useContext } from 'react';

export default function Page() {
  const unitState = useContext(UnitContext);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-end'>
        <Inputs confirm={console.log}>
          {{
            test: {
              label: 'test input',
              unitGroup: Temperature,
              placeholder: 'placeholder',
              defaultValue: '10',
            },
          }}
        </Inputs>
      </div>

      <div className='flex flex-row gap-2 justify-center'>
        {unitState.get('Wemperature')?.list.map((t) => (
          <Button
            key={t}
            onClick={() => {
              unitState.get('Wemperature')?.set(t);
            }}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className='flex flex-col items-center border-b'>
        <Display unitOverride='F'>{new Temperature(20, 'C')}</Display>
        <Display unitGroup='Wemperature'>{new Temperature(20, 'C')}</Display>
        <Display unitGroup='Wemperature'>{new Temperature(30, 'C')}</Display>
      </div>

      <div className='flex flex-col items-end mt-4'>
        <Inputs confirm={console.log}>
          {{
            t1: {
              label: 'global unit T1',
              unitGroup: Temperature,
            },
            t2: {
              label: 'global unit T2',
              unitGroup: Temperature,
            },
            t3: {
              label: 'override unit T3',
              unitOverride: 'F',
            },
            q1: {
              label: 'Arbitrary Q1',
              unitGroup: ArbitraryQuantity,
            },
            i1: {
              label: 'Major Impurity 1',
              unitGroup: 'majorImpurity',
            },
            i2: {
              label: 'Major Impurity 2',
              unitGroup: 'majorImpurity',
            },
            i3: {
              label: 'Minor Impurity',
              unitGroup: 'minorImpurity',
            },
          }}
        </Inputs>
      </div>

      <div className='flex flex-col items-center border-b'>
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
      </div>
    </div>
  );
}
