'use client';
import ModelComponent, { Pipe, Sink, Source } from '@/lib/ModelComponent';
import replaceAtState from '@/lib/replaceAtState';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

export type ISelect = {
  prev: () => void;
  next: () => void;
  byIndex: (i: number) => void;
};

export type ICompositionContext = {
  components: ModelComponent[];
  selection: number;
  select: ISelect;
  replace: (mc: ModelComponent) => void;
  add: (mc: ModelComponent) => void;
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
  add: (mc: ModelComponent) => {},
};

export const CompositionContext = createContext(defaultContextObject);

export default function CompositionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [components, setComponents] = useLocalStorage<ModelComponent[]>(
    'components',
    [
      new Source('source'),
      new Pipe('section-0', 1.0, 1.0),
      new Pipe('section-1', 1.0, 1.0),
      new Sink('sink'),
    ]
  );
  const [selection, setSelection] = useState<number>(0);

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
      replace: replaceAtState(setComponents, selection),
      add: replaceAtState(setComponents, components.length),
    };
  }, [components, selection, setComponents]);

  return (
    <CompositionContext.Provider value={value}>
      {children}
    </CompositionContext.Provider>
  );
}
