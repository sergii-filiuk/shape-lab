import { Point, Rectangle } from './types';

export const isPointInsideRectangle = (
  point: Point,
  rect: Rectangle
): boolean => {
  // Step 1: Translate the point relative to the rectangle's center
  const translatedX = point.x - rect.position.x;
  const translatedY = point.y - rect.position.y;

  // Step 2: Rotate the point back by the rectangle's rotation
  const cosTheta = Math.cos(-rect.rotation); // Reverse rotation
  const sinTheta = Math.sin(-rect.rotation);

  const localX = translatedX * cosTheta - translatedY * sinTheta;
  const localY = translatedX * sinTheta + translatedY * cosTheta;

  // Step 3: Check if the point is within the rectangle's bounds (now axis-aligned)
  const halfWidth = (rect.width * rect.scale.x) / 2;
  const halfHeight = (rect.height * rect.scale.y) / 2;

  return (
    localX >= -halfWidth &&
    localX <= halfWidth &&
    localY >= -halfHeight &&
    localY <= halfHeight
  );
};
