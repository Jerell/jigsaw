'use client';
import ModelComponent, {
  Pipe,
  Sink,
  Source,
  constructFromJson,
} from '@/lib/ModelComponent';
import replaceAtState from '@/lib/replaceAtState';
import { ToParsedJSON } from '@/lib/ToParsedJSON';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { ReactNode, createContext, useMemo, useState } from 'react';

export type ISelect = {
  prev: () => void;
  next: () => void;
  byIndex: (i: number) => void;
};

export type ICompositionContext = {
  components: ModelComponent[];
  refreshComponents: () => void;
  selection: number;
  select: ISelect;
  replace: (mc: ModelComponent) => void;
  add: (mc: ModelComponent) => void;
  getByID: (id: ModelComponent['ID']) => ModelComponent | undefined;
};

const defaultContextObject: ICompositionContext = {
  components: [],
  refreshComponents: () => {},
  selection: 0,
  select: {
    prev: () => {},
    next: () => {},
    byIndex: (i: number) => {},
  },
  replace: (mc: ModelComponent) => {},
  add: (mc: ModelComponent) => {},
  getByID: function (id: ModelComponent['ID']): ModelComponent {
    throw new Error('Function not implemented.');
  },
};

export const CompositionContext = createContext(defaultContextObject);

export default function CompositionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [components, setComponents] = useLocalStorage<ModelComponent[]>(
    'components',
    [],
    (jsonstring: string) => {
      const parsed =
        (JSON.parse(jsonstring) as (
          | ToParsedJSON<Pipe>
          | ToParsedJSON<Source>
          | ToParsedJSON<Sink>
        )[]) ?? [];

      return parsed.map(constructFromJson);
    }
  );
  const [selection, setSelection] = useState<number>(0);

  const value = useMemo(() => {
    const refreshComponents = () => setComponents([...components]);
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
      refreshComponents,
      selection,
      select,
      replace: replaceAtState(setComponents, selection),
      add: replaceAtState(setComponents, components.length),
      getByID: (id: ModelComponent['ID']) =>
        components.find((c) => c.ID === id),
    };
  }, [components, selection, setComponents]);

  return (
    <CompositionContext.Provider value={value}>
      {children}
    </CompositionContext.Provider>
  );
}
