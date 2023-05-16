'use client';

import Button from '@/components/buttons/Button';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { useContext } from 'react';
import { CompositionContext } from './CompositionContext';
import ModelComponent, { ModelComponentType, Pipe } from '@/lib/ModelComponent';
import { PipePanel } from './PipePanel';
import NodePanel from './NodePanel';

export default function ComponentPanel() {
  const { components, select, selection, replace } =
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
            {...{ replace }}
            key={selection}
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
}: {
  component: ModelComponent;
  replace: (mc: ModelComponent) => void;
}) {
  switch (component.type) {
    case ModelComponentType.Pipe:
      return (
        <PipePanel
          pipe={component as Pipe}
          {...{ replace }}
          key={component.name}
        />
      );
    default:
      return <NodePanel />;
  }
}
