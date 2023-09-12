'use client';

import Button from '@/components/buttons/Button';
import Display from '@/components/quantities/Display';
import { Temperature } from '@/components/quantities/Temperature';
import { UnitContext } from '@/components/quantities/UnitContextProvider';
import { useContext } from 'react';

export default function Page() {
  const unitState = useContext(UnitContext);

  return (
    <div className='flex flex-col gap-4'>
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
        <Display unitGroupTag='Wemperature'>{new Temperature(20, 'C')}</Display>
        <Display unitGroupTag='Wemperature'>{new Temperature(30, 'C')}</Display>
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
