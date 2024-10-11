import { useScenesStore } from '../../store/scenesStore';
import { GeometryIcon } from '../../icons/GeometryIcon';
import { Button } from '@headlessui/react';
import { Shape } from '../../store/scenesStore/types';
import { useUiStore } from '../../store/uiStore';
import { clsx } from 'clsx';

const noSelectedShapeClassName =
  'relative mt-[1px] box-border pl-1 flex h-6 w-full flex-row items-center text-ellipsis whitespace-nowrap rounded-[4px] border-[0.5px] border-transparent rounded hover:border-white';
const selectedShapeClassName = 'bg-gray-900  hover:border-white';
export const Layers = () => {
  const {
    getSceneById,
    activeSceneId,
    updateShape,
    updateShapes,
    updateScene,
  } = useScenesStore();

  const { setTransformFrameNeedsUpdate } = useUiStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return;

  const shapes = Object.values(scene.shapes);

  const handleShapeOnSelect = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Shape
  ) => {
    const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;
    const isShiftPressed = e.shiftKey;

    if (isCtrlOrCmdPressed || isShiftPressed) {
      e.preventDefault();
      e.stopPropagation();
    }

    const maxZIndex = Math.max(...shapes.flatMap((shape) => shape.zIndex));
    updateScene(scene.id, {
      ...scene,
      shapes: shapes.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            zIndex: item.zIndex - 1,
            selected:
              isCtrlOrCmdPressed || isShiftPressed ? item.selected : false,
          },
        }),
        {}
      ),
    });
    updateShape(scene.id, item.id, {
      ...item,
      selected: true,
      hovered: false,
      zIndex: maxZIndex,
    });
    setTransformFrameNeedsUpdate(true);
  };

  const handleOnMouseEnter = (shape: Shape) => {
    updateShapes(
      scene.id,
      shapes.map((item) => ({
        ...item,
        hovered: shape.id === item.id && !shape.selected,
      }))
    );
  };

  const handleOnMouseLeave = (shape: Shape) => {
    updateShape(scene.id, shape.id, {
      ...shape,
      hovered: false,
    });
  };

  return (
    <div className={'pr-2 pt-2'}>
      {shapes.map((item) => (
        <Button
          key={item.id}
          className={clsx(
            noSelectedShapeClassName,
            item.selected && selectedShapeClassName
          )}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleShapeOnSelect(e, item)
          }
          onMouseEnter={() => handleOnMouseEnter(item)}
          onMouseLeave={() => handleOnMouseLeave(item)}
        >
          <>
            <div
              className={
                'flex h-4 w-4 items-center justify-center bg-gray-800 '
              }
            >
              <GeometryIcon className={'text-gray-50'} />
            </div>
            <div className="ml-1 h-[15px]">
              <span className={'capitalize'}>{`${item.type}`}</span>
              <span
                className={
                  'pl-2 overflow-hidden text-gray-400 capitalize text-[10px]'
                }
              >{`z-index: ${item.zIndex}`}</span>
            </div>
          </>
        </Button>
      ))}
    </div>
  );
};
