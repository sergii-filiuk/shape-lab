import { Color } from 'three';
export const isValidColor = (colorString: string): boolean => {
  try {
    new Color(colorString);
    return true; // If no error is thrown, it's a valid color
  } catch {
    return false; // If an error is thrown, it's an invalid color
  }
};
