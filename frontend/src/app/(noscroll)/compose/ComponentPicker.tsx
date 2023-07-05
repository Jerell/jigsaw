import Button from '@/components/buttons/Button';

export default function ComponentPicker() {
  return (
    <section>
      <h2>New</h2>
      <Button variant='ghost' className='w-full'>
        Source
      </Button>
      <Button variant='ghost' className='w-full'>
        Sink
      </Button>
      <Button variant='ghost' className='w-full'>
        Pipe
      </Button>
    </section>
  );
}
