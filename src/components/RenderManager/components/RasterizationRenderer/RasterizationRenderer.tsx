import { useScenesStore } from '../../../../store/scenesStore';
import {
  RECTANGLE_DEFAULT_HEIGHT,
  RECTANGLE_DEFAULT_WIDTH,
  SHAPES_TEMPLATES,
} from '../../../shapes/constants';

export const RasterizationRenderer = () => {
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return null;

  const shapes = Object.values(scene.shapes).sort(
    (a, b) => b.zIndex - a.zIndex
  );

  return (
    <mesh>
      {shapes.map((shape) => {
        const Component = SHAPES_TEMPLATES[shape.type]?.component;
        return (
          <Component
            key={shape.id}
            width={RECTANGLE_DEFAULT_WIDTH}
            height={RECTANGLE_DEFAULT_HEIGHT}
            scale={shape.scale}
            rotation={shape.rotation}
            position={{
              x: shape.position.x,
              y: shape.position.y,
              z: shape.zIndex,
            }}
            color={shape.color}
          />
        );
      })}
    </mesh>
  );
};
