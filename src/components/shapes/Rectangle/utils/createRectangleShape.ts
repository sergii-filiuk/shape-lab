import { Shape } from 'three';

export const createRectangleShape = (width: number, height: number) => {
  const shape = new Shape();

  // Define the four corners of the rectangle
  shape.moveTo(-width / 2, height / 2); // Top left
  shape.lineTo(width / 2, height / 2); // Top right
  shape.lineTo(width / 2, -height / 2); // Bottom right
  shape.lineTo(-width / 2, -height / 2); // Bottom left
  shape.lineTo(-width / 2, height / 2); // Close the shape (back to top left)

  return shape;
};
