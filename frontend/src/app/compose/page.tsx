import CylinderScene from '@/components/plot/three/cylinder/CylinderScene';
import Stage from './Stage';

export default function Compose() {
  return (
    <div className='grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 sm:grid-flow-col gap-2 w-full h-full grow'>
      <section>
        <h2>Parameters</h2>
        <p>input fields</p>
        <p>tabular data</p>
      </section>

      <section>
        <h2>Component</h2>
        <CylinderScene />
        <p>some kind of graphic in the space above</p>
        <p>input fields</p>
        <p>tabular data</p>
      </section>

      <section className='row-span-2 h-full'>
        <h2>Network</h2>
        <Stage />
      </section>
    </div>
  );
}
