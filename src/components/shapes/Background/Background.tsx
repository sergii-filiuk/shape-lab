import { Canvas } from '@react-three/fiber';
import { Color, GLSL3, Vector2 } from 'three';
import {
  BACKGROUND_COLOR,
  DOT_COLOR,
  DOT_SIZE,
  DOT_SPACING,
  FRAGMENT_SHADER,
  VERTEX_SHADER,
} from './constants';
import { useScenesStore } from '../../../store/scenesStore';
import { FC } from 'react';

export const Background: FC = () => {
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return null;

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <mesh>
        <planeGeometry args={[2, 2]} />
        <rawShaderMaterial
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={{
            resolution: { value: new Vector2(scene.width, scene.height) },
            backgroundColor: { value: new Color(BACKGROUND_COLOR) },
            dotColor: { value: new Color(DOT_COLOR) },
            dotSpacing: { value: DOT_SPACING },
            dotSize: { value: DOT_SIZE },
          }}
          glslVersion={GLSL3}
        />
      </mesh>
    </Canvas>
  );
};
