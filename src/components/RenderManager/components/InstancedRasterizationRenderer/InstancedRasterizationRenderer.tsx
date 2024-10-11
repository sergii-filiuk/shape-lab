import { useScenesStore } from '../../../../store/scenesStore';
import { ShapeType } from '../../../../store/scenesStore/types';
import { Shape } from '../../../../store/scenesStore/types';
import { INSTANCED_SHAPES } from './constants';

export const InstancedRasterizationRenderer = () => {
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return null;

  const shapes = Object.values(scene.shapes).sort(
    (a, b) => b.zIndex - a.zIndex
  );

  const groupShapes: Record<ShapeType, Shape[]> = shapes.reduce<
    Record<ShapeType, Shape[]>
  >(
    (acc, shape) => {
      acc[shape.type] ??= [];
      acc[shape.type].push(shape);
      return acc;
    },
    {} as Record<ShapeType, Shape[]>
  );

  return (
    <mesh>
      {Object.keys(groupShapes).map((shapeGroupType) => {
        const Component = INSTANCED_SHAPES[shapeGroupType as ShapeType];

        if (!Component) return null;

        return (
          <Component
            key={shapeGroupType}
            shapes={groupShapes[shapeGroupType as ShapeType]}
          />
        );
      })}
    </mesh>
  );
};
