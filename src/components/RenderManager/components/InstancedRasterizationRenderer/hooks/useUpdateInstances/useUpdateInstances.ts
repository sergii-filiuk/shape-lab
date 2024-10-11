import { useEffect, useRef } from 'react';
import { Color, InstancedMesh, MathUtils, Matrix4, Vector3 } from 'three';
import { Shape } from '../../../../../../store/scenesStore/types';
import { useThree } from '@react-three/fiber';
import { normalizeScale } from '../../../../../../utils/normalizeScale';

export const useUpdateInstances = (shapes: Shape[]) => {
  const meshRef = useRef<InstancedMesh>(null);
  const { size } = useThree();

  const numInstances = shapes.length;

  useEffect(() => {
    if (meshRef.current) {
      // Update transformations for each instance
      for (let i = 0; i < numInstances; i++) {
        const matrix = new Matrix4();
        const shape = shapes[i];
        const scale = normalizeScale(shape.scale);
        const rotation = MathUtils.degToRad(shape.rotation);

        matrix.makeRotationZ(-rotation);

        matrix.setPosition(
          new Vector3(
            shape.position.x - size.width / 2,
            size.height / 2 - shape.position.y,
            shape.zIndex
          )
        );

        matrix.scale(new Vector3(scale.x, scale.y, 1.0));

        meshRef.current.setMatrixAt(i, matrix);
        meshRef.current.setColorAt(i, new Color(shape.color));
      }

      meshRef.current.instanceMatrix.needsUpdate = true;
      if (meshRef.current.instanceColor?.needsUpdate) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [size]);

  return meshRef;
};
