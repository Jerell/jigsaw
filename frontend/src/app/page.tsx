import Image from 'next/image';
import { ImSpinner2 } from 'react-icons/im';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-around p-24'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-xl font-bold'>jigsaw</h1>
        <ImSpinner2 className='animate-spin' />
      </div>
    </main>
  );
}
