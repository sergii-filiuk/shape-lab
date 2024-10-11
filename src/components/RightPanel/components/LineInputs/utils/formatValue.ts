import { LineInputType } from '../types';
import { numberToFixed } from '../../../../../utils/numberToFixed.ts';

export const formatValue = (value: string | number, type: LineInputType) => {
  switch (type) {
    case LineInputType.NUMBER: {
      return typeof value === 'number'
        ? numberToFixed(parseFloat(value as unknown as string), 2)
        : value;
    }
    default: {
      return value;
    }
  }
};
