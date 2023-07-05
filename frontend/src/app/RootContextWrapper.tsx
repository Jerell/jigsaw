'use client';
import { theme } from '@/constant/leva.theme';
import { Leva, LevaStoreProvider, useCreateStore } from 'leva';
import { ReactNode } from 'react';
import CompositionProvider from './(noscroll)/compose/CompositionContext';

export default function RootContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Leva theme={theme} flat />
      <CompositionProvider>{children}</CompositionProvider>
    </>
  );
}
