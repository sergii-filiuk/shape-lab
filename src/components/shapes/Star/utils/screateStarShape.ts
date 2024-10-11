import { Shape } from 'three';

export const createStarShape = (
  outerRadius: number,
  innerRadius: number,
  points: number
) => {
  const shape = new Shape();
  const angleStep = (Math.PI * 2) / points;
  const rotationOffset = -Math.PI / 2 - angleStep / 2;

  // Start the shape at the first vertex
  for (let i = 0; i < points * 2; i++) {
    const angle = i * (angleStep / 2) + rotationOffset; // Alternates between outer and inner points
    const radius = i % 2 === 0 ? outerRadius : innerRadius; // Use outerRadius for outer points and innerRadius for inner points
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      shape.moveTo(x, y); // Move to the first point
    } else {
      shape.lineTo(x, y); // Draw lines between the points
    }
  }

  shape.closePath(); // Close the shape

  return shape;
};
