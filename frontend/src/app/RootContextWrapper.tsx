'use client';
import { theme } from '@/constant/leva.theme';
import { Leva } from 'leva';
import { ReactNode } from 'react';

export default function RootContextWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Leva theme={theme} flat />
      {children}
    </>
  );
}
