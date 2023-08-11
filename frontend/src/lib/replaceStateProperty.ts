import { SetStateAction } from 'react';

export default function replaceStateProperty<T, K extends string>(
  setter: (value: SetStateAction<Record<K, T>>) => void,
  key: K
) {
  return function (item: T) {
    setter((prev) => {
      return { ...prev, [key]: item };
    });
  };
}
