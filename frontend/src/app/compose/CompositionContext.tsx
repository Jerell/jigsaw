'use client';
import ModelComponent, { Pipe, Sink, Source } from '@/lib/ModelComponent';
import { useStoreContext } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';
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
  store: StoreType | null;
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
  store: null,
};

export const CompositionContext = createContext(defaultContextObject);

export default function CompositionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const store = useStoreContext();

  const [components, setComponents] = useState<ModelComponent[]>([
    new Source('source'),
    new Pipe('pipe-0'),
    new Pipe('pipe-1'),
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
      store,
    };
  }, [components, selection, store]);

  return (
    <CompositionContext.Provider value={value}>
      {children}
    </CompositionContext.Provider>
  );
}
