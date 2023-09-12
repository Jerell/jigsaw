import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PQ } from './PhysicalQuantity';
import { Temperature } from './Temperature';
import { getUnitsForQuantity } from '@oliasoft-open-source/units';

interface IUnitState {
  unit: string;
  set: (u: any) => void | Dispatch<SetStateAction<string>>;
  list: string[];
}
const unitstate = (
  unit: string,
  set: (u: any) => void | Dispatch<SetStateAction<string>>,
  list: string[] = []
) => ({
  unit,
  set,
  list,
});

type UnitMap<T> = Map<PQ, T>;
type UnitStateMap = UnitMap<IUnitState>;

const initialUnitState: UnitMap<string> = new Map();
initialUnitState.set(Temperature, 'F');

const defaultContextObject: UnitStateMap = new Map();

export const UnitContext = createContext<UnitStateMap>(defaultContextObject);

export default function UnitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [unitMap, setUnitMap] = useState<UnitMap<string>>(initialUnitState);

  const setUnit = (kind: PQ, unit: string) => {
    setUnitMap((prev) => {
      const p = new Map(prev);
      p.set(kind, unit);
      return p;
    });
  };

  const value = useMemo(() => {
    const PQUnits: UnitStateMap = new Map();
    PQUnits.set(
      Temperature,
      unitstate(
        unitMap.get(Temperature)!,
        (u: string) => setUnit(Temperature, u),
        getUnitsForQuantity('temperature')
      )
    );

    return PQUnits;
  }, [unitMap]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}
