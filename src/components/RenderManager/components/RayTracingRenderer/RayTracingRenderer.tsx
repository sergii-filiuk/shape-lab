import { useScenesStore } from '../../../../store/scenesStore';
import { RayTracingGeometry } from '../../../shapes/RayTracingShapes';

export const RayTracingRenderer = () => {
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);
  if (!scene) return null;

  const shapes = Object.values(scene.shapes).sort(
    (a, b) => a.zIndex - b.zIndex
  );

  return (
    <RayTracingGeometry
      shapes={shapes}
      resolution={{ x: scene.width, y: scene.height }}
    />
  );
};
