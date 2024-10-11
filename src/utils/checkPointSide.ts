import { Point } from './types';

export const checkPointSide = (A: Point, B: Point, P: Point): number => {
  const crossProduct = (B.x - A.x) * (P.y - A.y) - (B.y - A.y) * (P.x - A.x);

  if (crossProduct > 0) {
    return 1; // left side
  } else if (crossProduct < 0) {
    return -1; // right side
  } else {
    return 0; // on the line
  }
};
