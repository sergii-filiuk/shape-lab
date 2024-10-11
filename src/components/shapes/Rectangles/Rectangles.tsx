import { FC, useMemo } from 'react';
import { ShapeGeometry } from 'three';
import { RectanglesProps } from './types';
import { useUpdateInstances } from '../../RenderManager/components/InstancedRasterizationRenderer/hooks/useUpdateInstances';
import { createRectangleShape } from '../Rectangle/utils/createRectangleShape.ts';
import {
  RECTANGLE_DEFAULT_HEIGHT,
  RECTANGLE_DEFAULT_WIDTH,
} from '../constants';

export const Rectangles: FC<RectanglesProps> = ({ shapes }) => {
  const meshRef = useUpdateInstances(shapes);
  const numInstances = shapes.length;

  const geometry = useMemo(() => {
    const shape = createRectangleShape(
      RECTANGLE_DEFAULT_WIDTH,
      RECTANGLE_DEFAULT_HEIGHT
    );
    return new ShapeGeometry(shape);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, numInstances]}>
      <meshBasicMaterial />
    </instancedMesh>
  );
};
