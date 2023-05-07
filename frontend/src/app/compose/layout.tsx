import { ReactNode } from 'react';
import Controls from './Controls';

export default function ComposeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Controls />
      {children}
      <div className='flex flex-col items-center gap-2'></div>
    </>
  );
}
