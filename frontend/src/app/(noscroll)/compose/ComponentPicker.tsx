'use client';

import Button from '@/components/buttons/Button';
import { useContext } from 'react';
import { Pipe, Sink, Source } from '@/lib/ModelComponent';
import { StageContext } from '@/components/composition/StageContext';

export default function ComponentPicker() {
  const { add, items } = useContext(StageContext);
  return (
    <section>
      <h2>New</h2>
      <Button
        variant='ghost'
        className='w-full'
        onClick={() => add(new Source(`node-${items.length}`))}
      >
        Source
      </Button>
      <Button
        variant='ghost'
        className='w-full'
        onClick={() => add(new Sink(`node-${items.length}`))}
      >
        Sink
      </Button>
      <Button
        variant='ghost'
        className='w-full'
        onClick={() => add(new Pipe(`node-${items.length}`, 1.0, 1.0))}
      >
        Pipe
      </Button>
    </section>
  );
}
