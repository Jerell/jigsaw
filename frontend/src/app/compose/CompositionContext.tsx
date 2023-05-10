'use client';
import ModelComponent, { Pipe, Sink, Source } from '@/lib/ModelComponent';
import { ReactNode, createContext, useMemo, useState } from 'react';

type ICompositionContext = {
  components: ModelComponent[];
};

const defaultContextObject: ICompositionContext = {
  components: [],
};

export const CompositionContext = createContext(defaultContextObject);

export default function CompositionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [components, setComponents] = useState<ModelComponent[]>([
    new Source('source'),
    new Pipe('pipe-0'),
    new Pipe('pipe-1'),
    new Sink('sink'),
  ]);

  const value = useMemo(() => {
    return { components };
  }, [components]);

  return (
    <CompositionContext.Provider value={value}>
      {children}
    </CompositionContext.Provider>
  );
}
