import { customAlphabet } from "nanoid";

export const generateNanoid = (alphabet: string, size: number): string => {
  const nanoid = customAlphabet(alphabet, size);
  return nanoid();
};
