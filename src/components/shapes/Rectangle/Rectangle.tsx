import { useScenePosition } from '../../UiManager/hooks/useScenePosition';
import { ShapeProps } from '../types';
import { FC, useMemo } from 'react';
import { Color, Euler, ShapeGeometry, Vector3 } from 'three';
import { createRectangleShape } from './utils/createRectangleShape.ts';
import { normalizeScale } from '../../../utils/normalizeScale';

export const Rectangle: FC<
  {
    width: number;
    height: number;
  } & ShapeProps
> = ({
  width,
  height,
  color = 'blue',
  opacity = 1,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onPointerUp,
  onClick,
  ...otherProps
}) => {
  const position = useScenePosition(otherProps.position);

  const geometry = useMemo(() => {
    const shape = createRectangleShape(width, height);
    return new ShapeGeometry(shape);
  }, [width]);

  const scale = normalizeScale(otherProps.scale);
  const nextColor = new Color(color);

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
      <meshBasicMaterial color={nextColor} />
    </mesh>
  );
};
