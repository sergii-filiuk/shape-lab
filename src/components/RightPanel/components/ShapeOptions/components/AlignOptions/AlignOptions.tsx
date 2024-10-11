import { ALIGN_OPTIONS } from '../../../../constants';
import { Button } from '@headlessui/react';
import { useScenesStore } from '../../../../../../store/scenesStore';
import { AlignOption } from '../../../../types';
import { calculateRectanglesObb } from '../../../../../../utils/calculateRectanglesObb';
import {
  calculateObb,
  orientedBoundingBox,
} from '../../../../../../utils/calculateRectanglesObb/utils';
import { Rectangle } from '../../../../../shapes/Rectangle/types';
import { Tooltip } from 'react-tooltip';
import { getShapeRectangle } from '../../../../../SelectionManager/utils/getShapeRectangle.ts';
import { useUiStore } from '../../../../../../store/uiStore';
import { clsx } from 'clsx';

export const AlignOptions = () => {
  const { activeSceneId, getSceneById, updateShapes } = useScenesStore();
  const { setTransformFrameNeedsUpdate } = useUiStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return;

  const handleOnAlignSelect = (option: { id: AlignOption }) => {
    const selectedShapes = Object.values(scene.shapes).filter(
      ({ selected }) => selected
    );

    const transformFrame = calculateRectanglesObb(
      selectedShapes.map((shape) => getShapeRectangle(shape))
    );

    const bbox = selectedShapes
      .map((item) => ({
        ...getShapeRectangle(item),
        rotation: 0,
      }))
      .map(calculateObb)
      .map(({ vertices }) => orientedBoundingBox(vertices))
      .reduce(
        (acc, rectangle: Rectangle) => ({
          min: {
            x: Math.min(rectangle.position.x, acc.min.x),
            y: Math.min(rectangle.position.y, acc.min.y),
          },
          max: {
            x: Math.max(rectangle.position.x, acc.min.x),
            y: Math.max(rectangle.position.y, acc.min.y),
          },
        }),
        {
          min: { x: Infinity, y: Infinity },
          max: { x: -Infinity, y: -Infinity },
        }
      );

    updateShapes(
      scene.id,
      selectedShapes.map((shape) => {
        const position = { ...shape.position };
        switch (option?.id) {
          case AlignOption.ALIGN_LEFT: {
            position.x = bbox.min.x;
            break;
          }
          case AlignOption.ALIGN_RIGHT: {
            position.x = bbox.max.x;
            break;
          }
          case AlignOption.ALIGN_TOP: {
            position.y = bbox.min.y;
            break;
          }
          case AlignOption.ALIGN_BOTTOM: {
            position.y = bbox.max.y;
            break;
          }
          case AlignOption.ALIGN_VERTICAL: {
            position.x = transformFrame.position.x;
            break;
          }
          case AlignOption.ALIGN_HORIZONTAL: {
            position.y = transformFrame.position.y;
            break;
          }
        }
        return {
          ...shape,
          position,
        };
      })
    );
    setTransformFrameNeedsUpdate(true);
  };

  return (
    <div className={'flex justify-evenly py-2'}>
      {ALIGN_OPTIONS.map((option) => {
        const Icon = option.icon;
        return (
          <Button
            id={option.id}
            key={option.id}
            onClick={() => {
              handleOnAlignSelect(option);
            }}
          >
            <Icon
              className={clsx(
                'flex h-6 w-6 rounded p-1 fill-gray-400 stroke-gray-400',
                'hover:cursor-pointer hover:bg-gray-700 hover:fill-white hover:stroke-white'
              )}
            />
            <Tooltip
              className={'z-dropdown'}
              variant={'light'}
              anchorSelect={`#${option.id}`}
              place="bottom"
            >
              {option.label}
            </Tooltip>
          </Button>
        );
      })}
    </div>
  );
};
