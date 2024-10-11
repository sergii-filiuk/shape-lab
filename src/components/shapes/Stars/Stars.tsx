import { FC, useMemo } from 'react';
import { ShapeGeometry } from 'three';
import { StarsProps } from './types';
import { useUpdateInstances } from '../../RenderManager/components/InstancedRasterizationRenderer/hooks/useUpdateInstances';
import { createStarShape } from '../Star/utils/screateStarShape.ts';
import {
  RECTANGLE_DEFAULT_HEIGHT,
  RECTANGLE_DEFAULT_WIDTH,
} from '../constants';

export const Stars: FC<StarsProps> = ({ shapes }) => {
  const meshRef = useUpdateInstances(shapes);
  const numInstances = shapes.length;

  const geometry = useMemo(() => {
    const shape = createStarShape(
      RECTANGLE_DEFAULT_WIDTH / 2,
      RECTANGLE_DEFAULT_HEIGHT / 4,
      5
    );
    return new ShapeGeometry(shape);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, numInstances]}>
      <meshBasicMaterial />
    </instancedMesh>
  );
};
