'use client';

import Button from '@/components/buttons/Button';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { useContext, useEffect } from 'react';
import { CompositionContext } from './CompositionContext';
import ModelComponent, { ModelComponentType } from '@/lib/ModelComponent';
import { DataItem, StoreType } from 'leva/dist/declarations/src/types';
import { PipePanel } from './PipePanel';
import NodePanel from './NodePanel';

export default function ComponentPanel() {
  const { components, select, selection, replace, store } =
    useContext(CompositionContext);

  return (
    <section key={selection}>
      <h2>Component</h2>
      <div className='flex flex-row gap-2 justify-evenly'>
        <div className='flex flex-col'>
          <Button
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            leftIcon={AiOutlineDoubleLeft}
            onClick={select.prev}
            disabled={selection === 0}
          >
            prev
          </Button>
        </div>

        <div className='flex flex-col grow'>
          <h3 className='m-0'>{components[selection].name}</h3>
          <SpecificInfo
            component={components[selection]}
            {...{ replace, store }}
          />
        </div>

        <div className='flex flex-col'>
          <Button
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            rightIcon={AiOutlineDoubleRight}
            onClick={select.next}
            disabled={selection === components.length - 1}
          >
            next
          </Button>
        </div>
      </div>
    </section>
  );
}

function SpecificInfo({
  component,
  replace,
  store,
}: {
  component: ModelComponent;
  replace: (mc: ModelComponent) => void;
  store: StoreType | null;
}) {
  switch (component.type) {
    case ModelComponentType.Pipe:
      return <PipePanel pipe={component} {...{ replace, store }} />;
    default:
      return <NodePanel />;
  }
}
