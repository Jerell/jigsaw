import CylinderScene from '@/components/plot/three/cylinder/CylinderScene';
import { ImSpinner2 } from 'react-icons/im';

export default function Loading() {
  return (
    <main className='flex flex-col items-center justify-around p-24'>
      <div className='flex flex-col items-center gap-2'>
        <CylinderScene />
        <ImSpinner2 className='animate-spin' />
      </div>
    </main>
  );
}
