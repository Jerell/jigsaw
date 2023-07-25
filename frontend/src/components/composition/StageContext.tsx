'use client';

import {
  CompositionContext,
  ISelect,
} from '@/app/(noscroll)/compose/CompositionContext';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { StageItem } from './StageItem';
import ModelComponent, { ModelComponentType } from '@/lib/ModelComponent';

export type IStageContext = {
  items: StageItem[];
  refreshItems: () => void;
  select: { byComponent: (c: StageItem) => void } & ISelect;
  selection: number;
  activated: StageItem | null;
  add: (mc: ModelComponent) => void;
};

const defaultContextObject: IStageContext = {
  items: [],
  refreshItems: () => {},
  select: {
    prev: () => {},
    next: () => {},
    byIndex: (i: number) => {},
    byComponent: (d: StageItem) => {},
  },
  selection: 0,
  activated: null,
  add: () => {},
};

export const StageContext = createContext(defaultContextObject);

export default function StageProvider({ children }: { children: ReactNode }) {
  const {
    components,
    select,
    selection,
    add: compAdd,
  } = useContext(CompositionContext);
  const [items, setItems] = useState<StageItem[]>(
    components.map(
      (c, i) =>
        new StageItem(c, {
          x: (i + 1) * 10,
          y:
            10 *
            (6 +
              Number(c.type === ModelComponentType.Source) -
              Number(c.type === ModelComponentType.Sink)),
        })
    )
  );
  const [activeItem, setActiveItem] = useState<StageItem | null>(null);

  const value = useMemo(() => {
    const refreshItems = () => setItems([...items]);
    const add = (mc: ModelComponent) => {
      compAdd(mc);
      setItems([
        ...items,
        new StageItem(mc, {
          x: Math.min(items.length + 1, 7) * 10,
          y:
            10 *
            (6 +
              Number(mc.type === ModelComponentType.Source) -
              Number(mc.type === ModelComponentType.Sink)),
        }),
      ]);
    };

    return {
      items,
      refreshItems,
      select: {
        byComponent: (d: StageItem) => {
          select.byIndex(components.findIndex((c) => c === d.component));
        },
        ...select,
      },
      selection,
      activated: activeItem,
      add,
    };
  }, [activeItem, compAdd, components, items, select, selection]);

  return (
    <StageContext.Provider value={value}>{children}</StageContext.Provider>
  );
}
