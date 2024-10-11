import { useScenesStore } from '../../store/scenesStore';
import { HoverFrame } from './components/HoverFrame';

export const HoverManager = () => {
  const { activeSceneId, getSceneById } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return null;

  const hoveredShapes = Object.values(scene.shapes)
    .sort((a, b) => b.zIndex - a.zIndex)
    .filter((shape) => shape.hovered);

  return (
    <>
      {hoveredShapes.map((shape) => (
        <HoverFrame
          key={`hover_frame_${shape.id}`}
          width={100}
          height={100}
          position={{
            x: shape?.position?.x,
            y: shape?.position?.y,
            z: shape?.zIndex,
          }}
          rotation={shape.rotation}
          scale={shape.scale}
          color={shape.color}
        />
      ))}
    </>
  );
};
