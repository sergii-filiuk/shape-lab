import { useScenesStore } from '../../store/scenesStore';
import { useToolBarStore } from '../../store/toolBarStore';
import { generateShape } from './utils/generateShape.ts';
import { ToolType } from '../ToolBar/types';
import { UiManager } from '../UiManager/UiManager.tsx';
import { Rulers } from '../Rulers';
import { ViewPreferences } from '../ToolBar/components/HamburgerMenu/constants';
import { useUiStore } from '../../store/uiStore';

export const Editor = () => {
  const { addShape, updateShapes, getSceneById, activeSceneId } =
    useScenesStore();
  const { getToolById, setActiveToolId, activeToolId } = useToolBarStore();
  const { setTransformFrameNeedsUpdate } = useUiStore();

  const preferences = getToolById(ToolType.HAMBURGER_MENU);

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tool = getToolById(activeToolId!);

    const boundingClientRect = (
      e.target as HTMLDivElement
    ).getBoundingClientRect();

    const position = {
      x: e.clientX - boundingClientRect.left,
      y: e.clientY - boundingClientRect.top,
    };

    if (tool?.id === ToolType.SHAPE_MENU) {
      const scene = getSceneById(activeSceneId!);
      if (!scene) return;

      const shapes = Object.values(scene.shapes);
      const selectedShapeId = tool.selected && Object.keys(tool.selected)[0];
      if (selectedShapeId) {
        const maxZIndex =
          shapes.length > 0
            ? Math.max(...shapes.flatMap((shape) => shape.zIndex))
            : 0;

        updateShapes(
          scene.id,
          shapes.map((shape) => ({
            ...shape,
            selected: false,
            hovered: false,
          }))
        );

        addShape(activeSceneId!, {
          ...generateShape(selectedShapeId, position, maxZIndex + 1),
          selected: true,
        });

        setTransformFrameNeedsUpdate(true);

        setActiveToolId(ToolType.MOVE_ENTITY);
      }
    }
  };
  return (
    <div className={'flex flex-1 h-full w-full items-center justify-center'}>
      <div onClick={handleOnClick}>
        {preferences?.selected?.[ViewPreferences.RULERS] && (
          <Rulers className={'absolute top-0 left-0'} />
        )}
        <UiManager />
      </div>
    </div>
  );
};
