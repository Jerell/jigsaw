import CylinderScene from '@/components/plot/three/Scene';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-around'>
      <div className='h-96 w-full'>
        <CylinderScene />
      </div>
    </main>
  );
}
