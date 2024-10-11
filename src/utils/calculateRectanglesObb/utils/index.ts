import { OBB, Point, Rectangle } from '../../types';
import { MathUtils } from 'three';

export function rotatePoint(
  px: number,
  py: number,
  ox: number,
  oy: number,
  angle: number
): Point {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const x = cos * (px - ox) - sin * (py - oy) + ox;
  const y = sin * (px - ox) + cos * (py - oy) + oy;

  return { x, y };
}

// Scale a point relative to the origin
export function scalePoint(
  px: number,
  py: number,
  ox: number,
  oy: number,
  scale: { x: number; y: number }
): Point {
  const x = ox + scale.x * (px - ox);
  const y = oy + scale.y * (py - oy);
  return { x, y };
}

// Get vertices of an axis-aligned rectangle (before rotation and scale)
export function getRectangleVertices(rect: Rectangle): Point[] {
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;

  const x = rect.position.x;
  const y = rect.position.y;

  return [
    { x: x - halfWidth, y: y - halfHeight }, // Top-left
    { x: x + halfWidth, y: y - halfHeight }, // Top-right
    { x: x + halfWidth, y: y + halfHeight }, // Bottom-right
    { x: x - halfWidth, y: y + halfHeight }, // Bottom-left
  ];
}

export const calculateObb = (rect: Rectangle): OBB => {
  // Get original rectangle vertices
  let vertices = getRectangleVertices(rect);

  const x = rect.position.x;
  const y = rect.position.y;

  // Apply scale and rotation transformations
  vertices = vertices.map((v) => scalePoint(v.x, v.y, x, y, rect.scale));
  vertices = vertices.map((v) => rotatePoint(v.x, v.y, x, y, rect.rotation));

  return { vertices };
};

export const convexHull = (points: Point[]): Point[] => {
  if (points.length < 3) return points;

  const hull: Point[] = [];
  const leftMost = points.reduce(
    (leftMost, point) => (point.x < leftMost.x ? point : leftMost),
    points[0]
  );

  let current = leftMost;
  do {
    hull.push(current);
    let nextPoint = points[0];
    for (const point of points) {
      if (
        nextPoint === current ||
        isCounterClockwise(current, nextPoint, point)
      ) {
        nextPoint = point;
      }
    }
    current = nextPoint;
  } while (current !== leftMost);

  return hull;
};

export const isCounterClockwise = (
  p1: Point,
  p2: Point,
  p3: Point
): boolean => {
  return (p2.y - p1.y) * (p3.x - p2.x) > (p2.x - p1.x) * (p3.y - p2.y);
};

// Function to calculate the minimum-area bounding box for a convex hull
export const orientedBoundingBox = (points: Point[]): Rectangle => {
  let minArea = Infinity;
  let bestOBB: Rectangle | null = null;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];

    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    let minX = Infinity,
      maxX = -Infinity;
    let minY = Infinity,
      maxY = -Infinity;

    for (const point of points) {
      const rotatedX = cosAngle * point.x + sinAngle * point.y;
      const rotatedY = -sinAngle * point.x + cosAngle * point.y;

      minX = Math.min(minX, rotatedX);
      maxX = Math.max(maxX, rotatedX);
      minY = Math.min(minY, rotatedY);
      maxY = Math.max(maxY, rotatedY);
    }

    const area = (maxX - minX) * (maxY - minY);
    if (area < minArea) {
      minArea = area;
      bestOBB = {
        position: {
          x: ((minX + maxX) / 2) * cosAngle - ((minY + maxY) / 2) * sinAngle,
          y: ((minX + maxX) / 2) * sinAngle + ((minY + maxY) / 2) * cosAngle,
        },
        width: maxX - minX,
        height: maxY - minY,
        rotation: MathUtils.radToDeg(angle),
        scale: {
          x: 1,
          y: 1,
        },
      };
    }
  }

  return bestOBB!;
};
