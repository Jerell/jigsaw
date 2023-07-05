'use client';

import {
  CompositionContext,
  ISelect,
} from '@/app/(noscroll)/compose/CompositionContext';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { StageItem } from './StageItem';

type IStageContext = {
  items: StageItem[];
  refreshItems: () => void;
  select: ISelect;
  selection: number;
};

const defaultContextObject: IStageContext = {
  items: [],
  refreshItems: () => {},
  select: {
    prev: () => {},
    next: () => {},
    byIndex: (i: number) => {},
  },
  selection: 0,
};

export const StageContext = createContext(defaultContextObject);

export default function StageProvider({ children }: { children: ReactNode }) {
  const { components, select, selection } = useContext(CompositionContext);
  const [items, setItems] = useState<StageItem[]>(
    components.map((c) => new StageItem(c))
  );

  const value = useMemo(() => {
    const refreshItems = () => setItems([...items]);
    return {
      items,
      refreshItems,
      select,
      selection,
    };
  }, [items, select, selection]);

  return (
    <StageContext.Provider value={value}>{children}</StageContext.Provider>
  );
}
