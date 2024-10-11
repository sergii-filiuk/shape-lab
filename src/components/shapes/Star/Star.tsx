import { useScenePosition } from '../../UiManager/hooks/useScenePosition';
import { FC, useMemo } from 'react';
import { Color, Euler, ShapeGeometry, Vector3 } from 'three';
import { createStarShape } from './utils/screateStarShape.ts';
import { ShapeProps } from '../types';
import { normalizeScale } from '../../../utils/normalizeScale';

export const Star: FC<
  {
    width: number;
    height: number;
  } & ShapeProps
> = ({
  width,
  height,
  color = 'blue',
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onPointerUp,
  onClick,
  ...otherProps
}) => {
  const position = useScenePosition(otherProps.position);

  const geometry = useMemo(() => {
    const shape = createStarShape(width / 2, height / 4, 5);
    return new ShapeGeometry(shape);
  }, [width]);

  const scale = normalizeScale(otherProps.scale);

  return (
    <mesh
      geometry={geometry}
      position={position}
      scale={new Vector3(scale.x, scale.y, 1)}
      rotation={new Euler(0, 0, otherProps.rotation * -0.0174532925)}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onClick={onClick}
    >
      <meshBasicMaterial color={new Color(color)} />
    </mesh>
  );
};
