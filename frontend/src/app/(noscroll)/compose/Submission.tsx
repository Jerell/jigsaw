'use client';

import Button from '@/components/buttons/Button';
import { useContext } from 'react';
import { CompositionContext } from './CompositionContext';

export default function Submission() {
  const { sendCompositionData } = useContext(CompositionContext);
  return (
    <>
      <Button className='justify-center' onClick={sendCompositionData}>
        submit
      </Button>
    </>
  );
}
