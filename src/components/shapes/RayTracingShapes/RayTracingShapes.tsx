import { FC, useMemo, useRef } from 'react';
import {
  DataTexture,
  FloatType,
  GLSL3,
  Mesh,
  RGBAFormat,
  Vector2,
} from 'three';

import { FRAGMENT_SHADER, VERTEX_SHADER } from './constants';
import { RayTracingGeometryProps } from './types';
import { generateShapesData } from '../../RenderManager/components/RayTracingRenderer/utils/generateShapesData.ts';

export const RayTracingGeometry: FC<RayTracingGeometryProps> = ({
  shapes,
  resolution,
}) => {
  const meshRef = useRef<Mesh>(null);

  const numShapes = shapes.length;

  if (!numShapes) return;

  const shapesData = useMemo(() => generateShapesData(shapes), []);

  const dataTexture = useMemo(() => {
    const texture = new DataTexture(
      shapesData,
      4,
      numShapes,
      RGBAFormat,
      FloatType
    );
    texture.needsUpdate = true;
    return texture;
  }, [shapesData]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <rawShaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={{
          dataTexture: { value: dataTexture },
          resolution: { value: new Vector2(resolution.x, resolution.y) },
          numShapes: { value: numShapes },
          dataTextureWidth: { value: 4 },
          dataTextureHeight: { value: numShapes },
          devicePixelRatio: { value: window.devicePixelRatio },
        }}
        glslVersion={GLSL3}
      />
    </mesh>
  );
};
