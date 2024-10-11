import { Shape } from 'three';

export const createCircleShape = (radius: number, segments: number = 32) => {
  const shape = new Shape();

  // Add points to create the circle shape
  shape.moveTo(radius, 0); // Start at the rightmost point
  for (let i = 1; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2; // Calculate the angle
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    shape.lineTo(x, y); // Draw the next point on the circle
  }

  return shape;
};
