'use client';

import Button from '@/components/buttons/Button';
import Display from '@/components/quantities/Display';
import Input from '@/components/quantities/Input';
import { ArbitraryQuantity } from '@/components/quantities/PhysicalQuantity';
import { Temperature } from '@/components/quantities/Temperature';
import { UnitContext } from '@/components/quantities/UnitContextProvider';
import { useContext } from 'react';

export default function Page() {
  const unitState = useContext(UnitContext);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-end'>
        <Input
          label='global unit T1'
          varKey='t1'
          unitGroup={Temperature}
          onUpdate={console.log}
        />
        <Input
          label='global unit T2'
          varKey='t2'
          unitGroup={Temperature}
          onUpdate={console.log}
        />
        <Input
          label='override unit T3'
          varKey='t3'
          onUpdate={console.log}
          unitOverride='F'
        />
        <Input
          label='Arbitrary Q1'
          varKey='q1'
          onUpdate={console.log}
          unitGroup={ArbitraryQuantity}
        />
        <Input
          label='Major Impurity 1'
          varKey='i1'
          onUpdate={console.log}
          unitGroup={'majorImpurity'}
        />
        <Input
          label='Major Impurity 2'
          varKey='i2'
          onUpdate={console.log}
          unitGroup={'majorImpurity'}
        />
        <Input
          label='Minor Impurity'
          varKey='i3'
          onUpdate={console.log}
          unitGroup={'minorImpurity'}
        />
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
