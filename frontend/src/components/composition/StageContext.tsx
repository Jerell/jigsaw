'use client';

import {
  CompositionContext,
  ISelect,
} from '@/app/(noscroll)/compose/CompositionContext';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { StageItem } from './StageItem';

export type IStageContext = {
  items: StageItem[];
  refreshItems: () => void;
  select: { byComponent: (c: StageItem) => void } & ISelect;
  selection: number;
  activated: StageItem | null;
  manipulate: {
    activate: (item: StageItem) => void;
    deactivate: (item: StageItem) => void;
    toggleActive: (item: StageItem) => void;
  };
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
  manipulate: {
    activate: (d: StageItem) => {},
    deactivate: (d: StageItem) => {},
    toggleActive: (d: StageItem) => {},
  },
};

export const StageContext = createContext(defaultContextObject);

export default function StageProvider({ children }: { children: ReactNode }) {
  const { components, select, selection } = useContext(CompositionContext);
  const [items, setItems] = useState<StageItem[]>(
    components.map(
      (c, i) =>
        new StageItem(c, {
          x: (i + 1) * 10,
          y: (6 + Math.round(2 * Math.random())) * 10,
        })
    )
  );
  const [activeItem, setActiveItem] = useState<StageItem | null>(null);

  const value = useMemo(() => {
    const manipulate = {
      activate: (item: StageItem) => {
        setActiveItem(item);
      },
      deactivate: (item: StageItem) => {
        setActiveItem(null);
      },
      toggleActive: (item: StageItem) => {
        setActiveItem(item.active ? item : null);
      },
    };

    const refreshItems = () => setItems([...items]);

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
      manipulate,
    };
  }, [activeItem, components, items, select, selection]);

  return (
    <StageContext.Provider value={value}>{children}</StageContext.Provider>
  );
}
