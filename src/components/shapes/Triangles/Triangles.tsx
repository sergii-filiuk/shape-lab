import { FC, useMemo } from 'react';
import { ShapeGeometry } from 'three';
import { TrianglesProps } from './types';
import { useUpdateInstances } from '../../RenderManager/components/InstancedRasterizationRenderer/hooks/useUpdateInstances';
import { createTriangleShape } from '../Triangle/utils/createTriangleShape.ts';
import { RECTANGLE_DEFAULT_WIDTH } from '../constants';

export const Triangles: FC<TrianglesProps> = ({ shapes }) => {
  const meshRef = useUpdateInstances(shapes);
  const numInstances = shapes.length;

  const geometry = useMemo(() => {
    const shape = createTriangleShape(RECTANGLE_DEFAULT_WIDTH);
    return new ShapeGeometry(shape);
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, numInstances]}>
      <meshBasicMaterial />
    </instancedMesh>
  );
};
