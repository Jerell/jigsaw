import { SetStateAction } from 'react';

export default function replaceAtState<T>(
  setter: (value: SetStateAction<T[]>) => void,
  i: number
) {
  return function (item: T) {
    setter((prev) => {
      const list = [...prev];
      list[i] = item;
      return list;
    });
  };
}
