import { Shape } from '../../../../../store/scenesStore/types';
import get from 'lodash/get';

export const isShapePropMixed = (shapes: Shape[], path: string) => {
  return (
    new Set(shapes.flatMap((shape) => get(shape, path) as unknown)).size > 1
  );
};
