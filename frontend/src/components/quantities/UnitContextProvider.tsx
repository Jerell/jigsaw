import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import { ArbitraryQuantity, PQ } from './PhysicalQuantity';
import { Temperature } from './Temperature';
import { getUnitsForQuantity } from '@oliasoft-open-source/units';
import { Length } from './Length';
import { Pressure } from './Pressure';
import { MassFlowrate } from './MassFlowrate';

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
initialUnitState.set(Temperature, 'C');
initialUnitState.set('Wemperature', 'K');
initialUnitState.set(ArbitraryQuantity, '-');
initialUnitState.set('majorImpurity', 'ppm');
initialUnitState.set('minorImpurity', 'ppb');
initialUnitState.set(Length, 'm');
initialUnitState.set('roughness', 'mm');
initialUnitState.set(Pressure, 'bar');
initialUnitState.set(MassFlowrate, 'kg/s');

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
      ArbitraryQuantity,
      unitstate(
        unitMap.get(ArbitraryQuantity)!,
        (u: string) => setUnit(ArbitraryQuantity, u),
        ['-']
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
    PQUnits.set(
      'majorImpurity',
      unitstate(
        unitMap.get('majorImpurity')!,
        (u: string) => setUnit('majorImpurity', u),
        ['ppm', 'ppb']
      )
    );
    PQUnits.set(
      'minorImpurity',
      unitstate(
        unitMap.get('minorImpurity')!,
        (u: string) => setUnit('minorImpurity', u),
        ['ppb', 'ppm']
      )
    );
    PQUnits.set(
      Length,
      unitstate(
        unitMap.get(Length)!,
        (u: string) => setUnit(Length, u),
        getUnitsForQuantity('length')
      )
    );
    PQUnits.set(
      'roughness',
      unitstate(
        unitMap.get('roughness')!,
        (u: string) => setUnit('roughness', u),
        ['mm']
      )
    );
    PQUnits.set(
      Pressure,
      unitstate(
        unitMap.get(Pressure)!,
        (u: string) => setUnit(Pressure, u),
        getUnitsForQuantity('pressure')
      )
    );
    PQUnits.set(
      MassFlowrate,
      unitstate(
        unitMap.get(MassFlowrate)!,
        (u: string) => setUnit(MassFlowrate, u),
        getUnitsForQuantity('massFlowRate')
      )
    );

    return PQUnits;
  }, [unitMap]);

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}
