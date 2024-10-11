import { Rectangle } from './types';

interface Point {
  x: number;
  y: number;
}

// Function to get the corners of a rotated, scaled rectangle
function getRectangleCorners(rect: Rectangle): Point[] {
  const halfWidth = (rect.width * rect.scale.x) / 2;
  const halfHeight = (rect.height * rect.scale.y) / 2;
  const cosTheta = Math.cos(rect.rotation);
  const sinTheta = Math.sin(rect.rotation);

  return [
    {
      x: rect.position.x + (halfWidth * cosTheta - halfHeight * sinTheta),
      y: rect.position.y + (halfWidth * sinTheta + halfHeight * cosTheta),
    },
    {
      x: rect.position.x + (-halfWidth * cosTheta - halfHeight * sinTheta),
      y: rect.position.y + (-halfWidth * sinTheta + halfHeight * cosTheta),
    },
    {
      x: rect.position.x + (-halfWidth * cosTheta + halfHeight * sinTheta),
      y: rect.position.y + (-halfWidth * sinTheta - halfHeight * cosTheta),
    },
    {
      x: rect.position.x + (halfWidth * cosTheta + halfHeight * sinTheta),
      y: rect.position.y + (halfWidth * sinTheta - halfHeight * cosTheta),
    },
  ];
}

// Function to get the edges of the rectangle from its corners
function getEdges(corners: Point[]): Point[] {
  const edges: Point[] = [];
  for (let i = 0; i < corners.length; i++) {
    const next = (i + 1) % corners.length;
    edges.push({
      x: corners[next].x - corners[i].x,
      y: corners[next].y - corners[i].y,
    });
  }
  return edges;
}

// Function to project a polygon onto an axis and return the min and max values
function projectPolygon(
  corners: Point[],
  axis: Point
): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;

  for (const corner of corners) {
    const projection =
      (corner.x * axis.x + corner.y * axis.y) /
      Math.sqrt(axis.x * axis.x + axis.y * axis.y); // Dot product
    min = Math.min(min, projection);
    max = Math.max(max, projection);
  }

  return { min, max };
}

// Function to check for overlap between two projections
function isProjectionOverlap(
  proj1: { min: number; max: number },
  proj2: { min: number; max: number }
): boolean {
  return !(proj1.max < proj2.min || proj2.max < proj1.min);
}

// Function to check if two rectangles intersect using SAT
export const isRectanglesIntersected = (
  rect1: Rectangle,
  rect2: Rectangle
): boolean => {
  const corners1 = getRectangleCorners(rect1);
  const corners2 = getRectangleCorners(rect2);

  const edges1 = getEdges(corners1);
  const edges2 = getEdges(corners2);

  // Combine edges to test as axes
  const axes = [...edges1, ...edges2];

  for (const axis of axes) {
    const projection1 = projectPolygon(corners1, axis);
    const projection2 = projectPolygon(corners2, axis);

    if (!isProjectionOverlap(projection1, projection2)) {
      // If there is no overlap on one axis, the rectangles are not intersecting
      return false;
    }
  }

  // If all axes projections overlap, the rectangles are intersecting
  return true;
};
