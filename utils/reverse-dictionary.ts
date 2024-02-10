type Key = string | number | symbol;

export function reverseDictionary<T extends Key, R extends Key>(object: Record<T, R>): Record<R, T> {
  const reversed: Record<R, T> = {} as Record<R, T>;

  for (const key in object) {
    const value = object[key];
    reversed[value] = key;
  }

  return reversed;
}