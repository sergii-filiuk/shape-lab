import { RasterizationRenderer } from './components/RasterizationRenderer';
import { useUiStore } from '../../store/uiStore';
import { RendererType } from '../../store/uiStore/types';
import { RayTracingRenderer } from './components/RayTracingRenderer';
import { Canvas } from '@react-three/fiber';
import { useScenesStore } from '../../store/scenesStore';
import { InstancedRasterizationRenderer } from './components/InstancedRasterizationRenderer';

export const RenderManager = () => {
  const { rendererType } = useUiStore();
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return null;

  let Renderer: () => JSX.Element | null = () => (
    <div className={'full items-center'}>No Renderer Exist</div>
  );

  switch (rendererType) {
    case RendererType.RASTERIZATION: {
      Renderer = RasterizationRenderer;
      break;
    }
    case RendererType.INSTANCED_RASTERIZATION: {
      Renderer = InstancedRasterizationRenderer;
      break;
    }
    case RendererType.RAY_TRACING: {
      Renderer = RayTracingRenderer;
      break;
    }
  }
  return (
    <div className={'absolute top-0'}>
      <Canvas
        orthographic
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setSize(scene.width, scene.height);
        }}
        camera={{
          position: [0, 0, 100],
          near: 0.1,
          far: 10000000,
        }}
      >
        <Renderer key={scene.updatedAt} />
      </Canvas>
    </div>
  );
};
