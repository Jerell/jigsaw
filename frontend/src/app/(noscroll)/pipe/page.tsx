/* eslint-disable react-hooks/exhaustive-deps */
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
import { split } from '@oliasoft-open-source/units';

export default function PipePage() {
  const [source, setSource] = useState(new Source('inlet'));
  const [sourceFields, setSourceFields] = useState<{ [vk: string]: string }>();

  const [pipe, setPipe] = useState(new Pipe('pipe', 1.0, 1.0, 'p1'));
  const [pipeFields, setPipeFields] = useState<{ [vk: string]: string }>();

  const [sink, setSink] = useState(new Sink('sink'));
  const [sinkFields, setSinkFields] = useState<{ [vk: string]: string }>();

  useEffect(() => {
    source.attach('outlets', pipe);
    pipe.attach('outlets', sink);

    console.log(source, pipe, sink);
  }, [source, pipe, sink]);

  const changeDiameter = (d: number) => setPipe(pipe.setDiameter(d));
  const changeRoughness = (d: number) => setPipe(pipe.setRoughness(d));

  useEffect(() => {
    if (!pipeFields?.diameter) return;
    const d = new Length(...(split(pipeFields.diameter) as [number, string]));

    changeDiameter(d.as('m'));
  }, [pipeFields?.diameter]);

  useEffect(() => {
    if (!pipeFields?.roughness) return;
    const r = new Length(...(split(pipeFields.roughness) as [number, string]));

    changeRoughness(r.as('m'));
  }, [pipeFields?.roughness]);

  return (
    <div className='flex flex-col sm:flex-row gap-2 w-full h-full'>
      <div className='flex flex-col w-full gap-2'>
        <h2>Source</h2>

        <div className='flex flex-row justify-center'>
          <div className='flex flex-col items-end w-fit'>
            <Inputs update={setSourceFields}>
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
            <Inputs update={setPipeFields}>
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
            <Inputs update={setSinkFields}>
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
