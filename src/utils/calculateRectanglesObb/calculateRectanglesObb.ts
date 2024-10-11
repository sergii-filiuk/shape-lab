import { Rectangle } from '../types';
import { calculateObb, convexHull, orientedBoundingBox } from './utils';

export const calculateRectanglesObb = (rectangles: Rectangle[]): Rectangle => {
  const vertices = rectangles
    .map(calculateObb)
    .flatMap(({ vertices }) => vertices);

  const hull = convexHull(vertices);

  return orientedBoundingBox(hull);
};
