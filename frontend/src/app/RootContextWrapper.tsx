'use client';
import { theme } from '@/constant/leva.theme';
import { Leva, LevaStoreProvider, useCreateStore } from 'leva';
import { ReactNode } from 'react';
import CompositionProvider from './compose/CompositionContext';

export default function RootContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const store = useCreateStore();
  return (
    <>
      <Leva theme={theme} flat />
      <LevaStoreProvider store={store}>
        <CompositionProvider>{children}</CompositionProvider>
      </LevaStoreProvider>
    </>
  );
}
