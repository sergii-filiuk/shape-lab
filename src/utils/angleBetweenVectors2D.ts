import { MathUtils, Vector2 } from 'three';

export const angleBetweenVectors2D = (v1: Vector2, v2: Vector2): number => {
  const v1Normalized = v1.clone().normalize();
  const v2Normalized = v2.clone().normalize();

  // Calculate the dot product of the vectors
  const dotProduct = v1Normalized.dot(v2Normalized);

  // Ensure the value is within the range of -1 and 1 to avoid NaN due to floating point imprecision
  const clampedDotProduct = MathUtils.clamp(dotProduct, -1, 1);

  // Calculate the angle in radians using the arccos of the dot product
  const angle = Math.acos(clampedDotProduct);

  return angle;
};
