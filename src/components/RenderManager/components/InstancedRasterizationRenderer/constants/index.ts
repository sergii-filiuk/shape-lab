import { ShapeType } from '../../../../../store/scenesStore/types';
import { Rectangles } from '../../../../shapes/Rectangles';
import { Circles } from '../../../../shapes/Circles';
import { Triangles } from '../../../../shapes/Triangles';
import { Stars } from '../../../../shapes/Stars';

export const INSTANCED_SHAPES = {
  [ShapeType.RECTANGLE]: Rectangles,
  [ShapeType.CIRCLE]: Circles,
  [ShapeType.TRIANGLE]: Triangles,
  [ShapeType.STAR]: Stars,
};
