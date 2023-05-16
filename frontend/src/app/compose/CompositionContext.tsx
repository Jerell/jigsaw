'use client';
import ModelComponent, { Pipe, Sink, Source } from '@/lib/ModelComponent';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type ICompositionContext = {
  components: ModelComponent[];
  selection: number;
  select: {
    prev: () => void;
    next: () => void;
    byIndex: (i: number) => void;
  };
  replace: (mc: ModelComponent) => void;
};

const defaultContextObject: ICompositionContext = {
  components: [],
  selection: 0,
  select: {
    prev: () => {},
    next: () => {},
    byIndex: (i: number) => {},
  },
  replace: (mc: ModelComponent) => {},
};

export const CompositionContext = createContext(defaultContextObject);

export default function CompositionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [components, setComponents] = useState<ModelComponent[]>([
    new Source('source'),
    new Pipe('section-0'),
    new Pipe('section-1'),
    new Sink('sink'),
  ]);
  const [selection, setSelection] = useState<number>(0);

  const replaceAt = (i: number) => (mc: ModelComponent) => {
    setComponents((prev) => {
      const list = [...prev];
      list[i] = mc;
      return list;
    });
  };

  const value = useMemo(() => {
    const select = {
      prev: () => setSelection(Math.max(0, selection - 1)),
      next: () => setSelection(Math.max(0, selection + 1)),
      byIndex: (i: number) => {
        if (i >= components.length || i < 0) {
          return;
        }
        setSelection(i);
      },
    };

    return {
      components,
      selection,
      select,
      replace: replaceAt(selection),
    };
  }, [components, selection]);

  return (
    <CompositionContext.Provider value={value}>
      {children}
    </CompositionContext.Provider>
  );
}
