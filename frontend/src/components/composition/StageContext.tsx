'use client';

import {
  CompositionContext,
  ISelect,
} from '@/app/(noscroll)/compose/CompositionContext';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { StageItem } from './StageItem';
import ModelComponent, { ModelComponentType } from '@/lib/ModelComponent';

export type IStageContext = {
  items: StageItem[];
  refreshItems: () => void;
  refreshComponents: () => void;
  select: { byComponent: (c: StageItem) => void } & ISelect;
  selection: number;
  activated: StageItem | null;
  add: (mc: ModelComponent) => void;
  getByID: (id: ModelComponent['ID']) => ModelComponent | undefined;
};

const defaultContextObject: IStageContext = {
  items: [],
  refreshItems: () => {},
  refreshComponents: () => {},
  select: {
    prev: () => {},
    next: () => {},
    byIndex: (i: number) => {},
    byComponent: (d: StageItem) => {},
  },
  selection: 0,
  activated: null,
  add: () => {},
  getByID: function (id: string): ModelComponent | undefined {
    throw new Error('Function not implemented.');
  },
};

export const StageContext = createContext(defaultContextObject);

export default function StageProvider({ children }: { children: ReactNode }) {
  const {
    components,
    refreshComponents,
    select,
    selection,
    add: compAdd,
    getByID,
  } = useContext(CompositionContext);

  const newStageItem = useCallback(
    (c: ModelComponent, i = components.length) =>
      new StageItem(c, {
        x: Math.min(i + 1, 7) * 10,
        y:
          10 *
          (6 +
            Number(c.type === ModelComponentType.Source) -
            Number(c.type === ModelComponentType.Sink)),
      }),
    [components.length]
  );

  const [items, setItems] = useState<StageItem[]>(components.map(newStageItem));
  const [activeItem, setActiveItem] = useState<StageItem | null>(null);

  const value = useMemo(() => {
    const refreshItems = () => setItems([...items]);
    const add = (mc: ModelComponent) => {
      compAdd(mc);
      setItems([...items, newStageItem(mc)]);
    };

    return {
      items,
      refreshItems,
      refreshComponents,
      select: {
        byComponent: (d: StageItem) => {
          select.byIndex(components.findIndex((c) => c === d.component));
        },
        ...select,
      },
      selection,
      activated: activeItem,
      add,
      getByID,
    };
  }, [
    activeItem,
    compAdd,
    components,
    getByID,
    items,
    newStageItem,
    refreshComponents,
    select,
    selection,
  ]);

  return (
    <StageContext.Provider value={value}>{children}</StageContext.Provider>
  );
}
