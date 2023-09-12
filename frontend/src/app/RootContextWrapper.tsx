'use client';
import { theme } from '@/constant/leva.theme';
import { Leva } from 'leva';
import { ReactNode } from 'react';
import CompositionProvider from './(noscroll)/compose/CompositionContext';
import StageProvider from '@/components/composition/StageContext';
import UnitContextProvider from '@/components/quantities/UnitContextProvider';

export default function RootContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <UnitContextProvider>
      <Leva theme={theme} flat />
      <CompositionProvider>
        <StageProvider>{children}</StageProvider>
      </CompositionProvider>
    </UnitContextProvider>
  );
}
