export function removeEmptyEntries<T extends Record<string, unknown>>(input: T) {
  const out = {} as WithoutNullableKeys<T>;
  for (const key in input) {
    const data = input[key];
    if (data !== undefined || (isArray(data) && data.length !== 0)) {
      // @ts-expect-error
      out[key] = data;
    }
  }

  return out;
}

export function toArray<T>(input: T | T[]) {
  return Array.isArray(input) ? input : [input];
}

export function isArray<T>(input: T | T[]): input is T[] {
  return Array.isArray(input);
}

// https://bobbyhadz.com/blog/typescript-remove-null-and-undefined-from-type
type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>;
};
