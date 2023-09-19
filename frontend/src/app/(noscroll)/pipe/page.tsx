'use client';

import Inputs from '@/components/quantities/Inputs';
import { Length } from '@/components/quantities/Length';
import { ArbitraryQuantity } from '@/components/quantities/PhysicalQuantity';
import { Temperature } from '@/components/quantities/Temperature';
import { Pipe, Sink, Source } from '@/lib/ModelComponent';
import { useEffect, useState } from 'react';
import Bathymetry from '../compose/Bathymetry';
import { Pressure } from '@/components/quantities/Pressure';
import { MassFlowrate } from '@/components/quantities/MassFlowrate';

export default function PipePage() {
  const [source, setSource] = useState(new Source('inlet'));
  const [pipe, setPipe] = useState(new Pipe('pipe', 1.0, 1.0, 'p1'));
  const [sink, setSink] = useState(new Sink('sink'));

  useEffect(() => {
    source.attach('outlets', pipe);
    pipe.attach('outlets', sink);

    console.log(source, pipe, sink);
  }, [source, pipe, sink]);

  return (
    <div className='flex flex-col sm:flex-row gap-2 w-full h-full'>
      <div className='flex flex-col w-full gap-2'>
        <h2>Source</h2>

        <div className='flex flex-row justify-center'>
          <div className='flex flex-col items-end w-fit'>
            <Inputs update={console.log}>
              {{
                pressure: {
                  label: 'Pressure',
                  unitGroup: Pressure,
                },
                temperature: {
                  label: 'Temperature',
                  unitGroup: Temperature,
                },
              }}
            </Inputs>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full gap-2'>
        <h2>Pipe</h2>

        <div className='flex flex-row justify-center'>
          <div className='flex flex-col items-end w-fit'>
            <Inputs update={console.log}>
              {{
                diameter: {
                  label: 'Diameter',
                  unitGroup: Length,
                },
                roughness: {
                  label: 'Roughness',
                  unitGroup: 'roughness',
                },
                uValue: {
                  label: 'U Value',
                  unitGroup: ArbitraryQuantity,
                },
                massFlowrate: {
                  label: 'Mass Flowrate',
                  unitGroup: MassFlowrate,
                },
              }}
            </Inputs>
          </div>
        </div>

        <Bathymetry ID={pipe.ID} />
      </div>

      <div className='flex flex-col w-full gap-2'>
        <h2>Sink</h2>

        <div className='flex flex-row justify-center'>
          <div className='flex flex-col items-end w-fit'>
            <Inputs update={console.log}>
              {{
                pressure: {
                  label: 'Pressure',
                  unitGroup: Pressure,
                },
                temperature: {
                  label: 'Temperature',
                  unitGroup: Temperature,
                },
              }}
            </Inputs>
          </div>
        </div>
      </div>
    </div>
  );
}
