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
import { label, split } from '@oliasoft-open-source/units';
import Button from '@/components/buttons/Button';

export default function PipePage() {
  const [source, setSource] = useState(new Source('inlet'));
  const [sourceFields, setSourceFields] = useState<{ [vk: string]: string }>();

  const [pipe, setPipe] = useState(new Pipe('pipe', 1.0, 1.0, 'p1'));
  const [pipeFields, setPipeFields] = useState<{ [vk: string]: string }>();

  const [sink, setSink] = useState(new Sink('sink'));
  const [sinkFields, setSinkFields] = useState<{ [vk: string]: string }>();

  const [flow, setFlow] = useState<number>();

  useEffect(() => {
    source.attach('outlets', pipe);
    pipe.attach('outlets', sink);
  }, [source, pipe, sink]);

  const changeDiameter = (d: number) => setPipe(pipe.setDiameter(d));
  const changeRoughness = (d: number) => setPipe(pipe.setRoughness(d));

  useEffect(() => {
    if (!pipeFields?.diameter || pipe.diameter == Number(pipeFields?.diameter))
      return;
    const d = new Length(...(split(pipeFields.diameter) as [number, string]));

    changeDiameter(d.as('m'));
  }, [pipeFields?.diameter]);

  useEffect(() => {
    if (
      !pipeFields?.roughness ||
      pipe.roughness == Number(pipeFields?.roughness)
    )
      return;
    const r = new Length(...(split(pipeFields.roughness) as [number, string]));

    changeRoughness(r.as('m'));
  }, [pipeFields?.roughness]);

  const run = async () => {
    setFlow(undefined);
    const body = {
      components: [source, pipe, sink],
      bathymetries:
        JSON.parse(window.localStorage.getItem('bathymetries') || '') || {},
    };

    const response = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const { data } = await response.json();
    const result = JSON.parse(data);
    console.log(result);
    setFlow(-result.u[0]);
  };

  return (
    <div className='flex flex-col gap-2 w-full'>
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
                    defaultValue: '2',
                  },
                  // temperature: {
                  //   label: 'Temperature',
                  //   unitGroup: Temperature,
                  // },
                }}
              </Inputs>
            </div>
          </div>

          {flow !== undefined && (
            <p>
              {flow} {label('m3/s')}
            </p>
          )}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <h2>Pipe</h2>

          <div className='flex flex-row justify-center'>
            <div className='flex flex-col items-end w-fit'>
              <Inputs update={(f) => setPipeFields((p) => ({ ...p, ...f }))}>
                {{
                  diameter: {
                    label: 'Diameter',
                    unitGroup: Length,
                    defaultValue: '1',
                  },
                  roughness: {
                    label: 'Roughness',
                    unitGroup: 'roughness',
                  },
                  uValue: {
                    label: 'U Value',
                    unitGroup: ArbitraryQuantity,
                  },
                  temperature: {
                    label: 'Temperature',
                    unitGroup: Temperature,
                  },
                  // massFlowrate: {
                  //   label: 'Mass Flowrate',
                  //   unitGroup: MassFlowrate,
                  // },
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
                    defaultValue: '1',
                  },
                  // temperature: {
                  //   label: 'Temperature',
                  //   unitGroup: Temperature,
                  // },
                }}
              </Inputs>
            </div>
          </div>
        </div>
      </div>

      <h2>Run</h2>
      <Button className='justify-center' onClick={run}>
        submit
      </Button>
    </div>
  );
}
