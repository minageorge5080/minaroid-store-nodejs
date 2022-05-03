import { customAlphabet } from "nanoid";

export const isNumeric = (value: unknown): boolean => {
  if (typeof value != "string") return false;
  return /^-?\d+$/.test(value);
};

export const generateNanoid = (alphabet: string, size: number): string => {
  const nanoid = customAlphabet(alphabet, size);
  return nanoid();
};
