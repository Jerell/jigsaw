'use client';
import { theme } from '@/constant/leva.theme';
import { Leva } from 'leva';
import { ReactNode } from 'react';
import CompositionProvider from './(noscroll)/compose/CompositionContext';
import StageProvider from '@/components/composition/StageContext';

export default function RootContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Leva theme={theme} flat />
      <CompositionProvider>
        <StageProvider>{children}</StageProvider>
      </CompositionProvider>
    </>
  );
}
