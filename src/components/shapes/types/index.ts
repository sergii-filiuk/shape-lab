import { ThreeEvent } from '@react-three/fiber';

export type ShapeProps = {
  color?: string;
  opacity?: number;
  transparent?: boolean;
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number };
  rotation: number;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerDown?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerUp?: (e: ThreeEvent<PointerEvent>) => void;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
};
