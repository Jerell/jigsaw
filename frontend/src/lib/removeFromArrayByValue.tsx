'use client';
export function removeFromArrayByValue<T>(arr: T[], value: T) {
  arr.includes(value) &&
    arr.splice(
      arr.findIndex((elem) => elem === value),
      1
    );
  return arr;
}
