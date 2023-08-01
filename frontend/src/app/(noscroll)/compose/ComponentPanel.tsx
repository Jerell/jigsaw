'use client';

import Button from '@/components/buttons/Button';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { useContext } from 'react';
import { CompositionContext } from './CompositionContext';
import ModelComponent, { ModelComponentType, Pipe } from '@/lib/ModelComponent';
import { PipePanel } from './PipePanel';
import NodePanel from './NodePanel';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import { StageContext } from '@/components/composition/StageContext';

export default function ComponentPanel() {
  const { components, select, selection, replace } =
    useContext(CompositionContext);

  const { removeByID } = useContext(StageContext);

  return (
    <section>
      <h2>Component</h2>
      <div className='flex flex-row gap-2 justify-evenly mb-1'>
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

        <h3 className='m-0 grow'>{components[selection]?.name}</h3>

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

      {components[selection] && (
        <SpecificInfo
          component={components[selection]}
          {...{ replace }}
          key={selection}
        />
      )}

      <div className='flex flex-col gap-2 mt-2'>
        <Button
          variant='ghost'
          leftIcon={MdOutlineRemoveCircle}
          onClick={() => {
            components[selection] && removeByID(components[selection].ID);
          }}
        >
          Remove
        </Button>
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
      return <PipePanel pipe={component as Pipe} key={component.name} />;
    default:
      return <NodePanel />;
  }
}
