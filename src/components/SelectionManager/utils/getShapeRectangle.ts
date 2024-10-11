import {
  RECTANGLE_DEFAULT_HEIGHT,
  RECTANGLE_DEFAULT_WIDTH,
} from '../../shapes/constants';
import { normalizeScale } from '../../../utils/normalizeScale';
import { MathUtils } from 'three';
import { Shape } from '../../../store/scenesStore/types';

export const getShapeRectangle = (shape: Shape) => {
  return {
    position: shape.position,
    width: RECTANGLE_DEFAULT_WIDTH,
    height: RECTANGLE_DEFAULT_HEIGHT,
    scale: normalizeScale(shape.scale),
    rotation: MathUtils.degToRad(shape.rotation),
  };
};
