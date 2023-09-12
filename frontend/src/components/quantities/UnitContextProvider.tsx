import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
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

type UnitMap<T> = Map<PQ | string, T>;
type UnitStateMap = UnitMap<IUnitState>;

const initialUnitState: UnitMap<string> = new Map();
initialUnitState.set(Temperature, 'F');
initialUnitState.set('Wemperature', 'K');

const defaultContextObject: UnitStateMap = new Map();

export const UnitContext = createContext<UnitStateMap>(defaultContextObject);

export default function UnitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [unitMap, setUnitMap] = useState<UnitMap<string>>(initialUnitState);

  const setUnit = (kind: PQ | string, unit: string) => {
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
    PQUnits.set(
      'Wemperature',
      unitstate(
        unitMap.get('Wemperature')!,
        (u: string) => setUnit('Wemperature', u),
        getUnitsForQuantity('temperature')
      )
    );

    return PQUnits;
  }, [unitMap]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}
