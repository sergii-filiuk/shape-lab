import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

export const useScenePosition = (position: {
  x: number;
  y: number;
  z: number;
}) => {
  const { size } = useThree();
  const worldX = (position.x / size.width) * 2 - 1; // Convert from pixels to normalized device coordinates
  const worldY = -(position.y / size.height) * 2 + 1; // Invert Y-axis because screen Y is inverted

  return new Vector3(
    worldX * (size.width / 2),
    worldY * (size.height / 2),
    position.z
  );
};
