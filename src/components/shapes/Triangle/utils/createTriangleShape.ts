import { Shape } from 'three';

export const createTriangleShape = (size: number) => {
  const shape = new Shape();

  // Define the three vertices of the triangle
  const halfSize = size / 2;
  shape.moveTo(0, halfSize); // Top vertex
  shape.lineTo(-halfSize, -halfSize); // Bottom left vertex
  shape.lineTo(halfSize, -halfSize); // Bottom right vertex
  shape.lineTo(0, halfSize); // Close the path to the top vertex

  shape.closePath(); // Close the shape

  return shape;
};
