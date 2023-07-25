import { useState } from 'react';

function returnInitialState<T>(storageKey: string, fallback: T) {
  const item = window.localStorage.getItem(storageKey);
  return item ? (JSON.parse(item) as T) : fallback;
}

export function useLocalStorage<T>(
  storageKey: string,
  initialState: T
): [T, (value: T | ((prevState: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState(
    returnInitialState(storageKey, initialState)
  );

  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
