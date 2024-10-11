import { Color, MathUtils } from 'three';
import {
  RECTANGLE_DEFAULT_HEIGHT,
  RECTANGLE_DEFAULT_WIDTH,
} from '../../../../shapes/constants';

import { Shape, ShapeTypeNum } from '../../../../../store/scenesStore/types';
import { normalizeScale } from '../../../../../utils/normalizeScale.ts';

export const generateShapesData = (shapes: Shape[]) => {
  const numShapes = shapes.length;
  const data = new Float32Array(numShapes * 4 * 4); // 4 parameters per rectangle, encoded in 4 floats (RGBA)

  for (let i = 0; i < numShapes; i++) {
    const shape = shapes[i];
    const baseIndex = i * 16;
    const color = new Color(shape.color);
    const normalizedScale = normalizeScale(shape.scale);

    data[baseIndex] = shape.position.x;
    data[baseIndex + 1] = shape.position.y;
    data[baseIndex + 2] = RECTANGLE_DEFAULT_WIDTH;
    data[baseIndex + 3] = RECTANGLE_DEFAULT_HEIGHT;

    data[baseIndex + 4] = normalizedScale.x;
    data[baseIndex + 5] = normalizedScale.y;
    data[baseIndex + 6] = MathUtils.degToRad(shape.rotation);
    data[baseIndex + 7] = ShapeTypeNum[shape.type];

    data[baseIndex + 8] = color.r;
    data[baseIndex + 9] = color.g;
    data[baseIndex + 10] = color.b;
  }
  return data;
};
