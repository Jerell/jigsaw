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
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { removeFromArrayByValue } from '../../../lib/removeFromArrayByValue';
import replaceStateProperty from '@/lib/replaceStateProperty';

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
  removeByID: (id: ModelComponent['ID']) => void;
  setPipeBathymetry: (
    pipeID: Pipe['ID']
  ) => (item: { x: number; y: number }[]) => void;
  getPipeBathymetry: (pipeID: Pipe['ID']) => { x: number; y: number }[];
  sendCompositionData: () => void;
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
  removeByID: function (id: string): void {
    throw new Error('Function not implemented.');
  },
  setPipeBathymetry: function (
    pipeID: string
  ): (items: { x: number; y: number }[]) => void {
    throw new Error('Function not implemented.');
  },
  getPipeBathymetry: function (pipeID: string): { x: number; y: number }[] {
    throw new Error('Function not implemented.');
  },
  sendCompositionData: function (): void {
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

  const [bathymetries, setBathymetries] = useLocalStorage<
    Record<Pipe['ID'], { x: number; y: number }[]>
  >('bathymetries', {});

  const setPipeBathymetry = useCallback(
    (pipeID: Pipe['ID']) => replaceStateProperty(setBathymetries, pipeID),
    [setBathymetries]
  );

  const getPipeBathymetry = useCallback(
    (pipeID: Pipe['ID']) => bathymetries[pipeID] || [],
    [bathymetries]
  );

  const [selection, setSelection] = useState<number>(0);

  const value = useMemo(() => {
    const refreshComponents = () => setComponents([...components]);

    const boundedIndex = (i: number) =>
      Math.min(Math.max(0, i), components.length - 1);

    const select = {
      prev: () => setSelection(boundedIndex(selection - 1)),
      next: () => setSelection(boundedIndex(selection + 1)),
      byIndex: (i: number) => {
        if (i >= components.length || i < 0) {
          return;
        }
        setSelection(boundedIndex(i));
      },
    };

    const removeConnectionsTo = (id: ModelComponent['ID']) => {
      setComponents((prev) =>
        [...prev].map((c) => {
          removeFromArrayByValue(c.inlets, id);
          removeFromArrayByValue(c.outlets, id);
          return c;
        })
      );
    };

    const removeStoredBathymetry = (id: ModelComponent['ID']) => {
      setBathymetries((prev) => {
        const p = { ...prev };
        delete p[id];
        return p;
      });
    };

    const sendCompositionData = async () => {
      const body = { components, bathymetries };
      console.log(body);

      await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
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
      removeByID: (id: ModelComponent['ID']) => {
        const c = components.find((c) => c.ID === id);
        if (!c) return;
        removeConnectionsTo(c.ID);
        removeStoredBathymetry(c.ID);
        setComponents((prev) => {
          const elems = [...prev];
          elems.splice(
            elems.findIndex((elem) => elem.ID === id),
            1
          );
          return elems;
        });
        select.byIndex(0);
      },
      setPipeBathymetry,
      getPipeBathymetry,
      sendCompositionData,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    components,
    getPipeBathymetry,
    selection,
    setBathymetries,
    setComponents,
    setPipeBathymetry,
  ]);

  return (
    <CompositionContext.Provider value={value}>
      {children}
    </CompositionContext.Provider>
  );
}
