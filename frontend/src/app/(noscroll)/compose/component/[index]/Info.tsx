'use client';

import ModelComponent, { ModelComponentType, Pipe } from '@/lib/ModelComponent';
import { useContext } from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import NodePanel from '../../NodePanel';
import { PipePanel } from '../../PipePanel';
import { CompositionContext } from '../../CompositionContext';
import ButtonLink from '@/components/links/ButtonLink';
import Button from '@/components/buttons/Button';

export default function ComponentPanel({ index }: { index: number }) {
  const { components, replace } = useContext(CompositionContext);

  return (
    <section>
      <h2>Component</h2>
      <div className='flex flex-row gap-2 justify-evenly mb-1'>
        {index === 0 ? (
          <Button
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            leftIcon={AiOutlineDoubleLeft}
            disabled
          >
            prev
          </Button>
        ) : (
          <ButtonLink
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            leftIcon={AiOutlineDoubleLeft}
            href={'/compose/component/' + (index - 1)}
          >
            prev
          </ButtonLink>
        )}

        <h3 className='m-0 grow'>{components[index].name}</h3>

        {index === components.length - 1 ? (
          <Button
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            rightIcon={AiOutlineDoubleRight}
            disabled
          >
            next
          </Button>
        ) : (
          <ButtonLink
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            rightIcon={AiOutlineDoubleRight}
            href={'/compose/component/' + (index + 1)}
          >
            next
          </ButtonLink>
        )}
      </div>

      <SpecificInfo
        component={components[index]}
        {...{ replace }}
        key={index}
      />
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
