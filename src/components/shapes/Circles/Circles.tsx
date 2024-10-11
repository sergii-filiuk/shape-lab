import { FC, useMemo } from 'react';
import { ShapeGeometry } from 'three';
import { CirclesProps } from './types';
import { useUpdateInstances } from '../../RenderManager/components/InstancedRasterizationRenderer/hooks/useUpdateInstances';
import { createCircleShape } from '../Circle/utils/createCircleShape.ts';
import { RECTANGLE_DEFAULT_WIDTH } from '../constants';

export const Circles: FC<CirclesProps> = ({ shapes }) => {
  const meshRef = useUpdateInstances(shapes);
  const numInstances = shapes.length;

  const geometry = useMemo(() => {
    const shape = createCircleShape(RECTANGLE_DEFAULT_WIDTH / 2);
    return new ShapeGeometry(shape);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, numInstances]}>
      <meshBasicMaterial />
    </instancedMesh>
  );
};
