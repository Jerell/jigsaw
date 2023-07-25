'use client'; // Error components must be Client Components

import ButtonLink from '@/components/links/ButtonLink';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className='flex flex-col gap-2 items-center'>
      <h2>Something went wrong!</h2>
      <p>{error.name}</p>
      <p>{error.message}</p>
      <ButtonLink href={'/compose'}>Return to Compose</ButtonLink>
    </section>
  );
}
