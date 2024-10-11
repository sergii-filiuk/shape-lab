import { LineInputType } from '../types';
import { isValidColor } from './isValidColor.ts';

export const isValidLineInputValue = (
  type: LineInputType,
  value: string | number
): boolean => {
  switch (type) {
    case LineInputType.STRING: {
      return true;
    }
    case LineInputType.NUMBER: {
      return !isNaN(parseFloat(value as unknown as string));
    }
    case LineInputType.COLOR: {
      return isValidColor(value as unknown as string);
    }
    default: {
      return true;
    }
  }
};
