import { GeometryIcon } from '../../../../../../icons/GeometryIcon';
import { LineInputs } from '../../../LineInputs';
import { GeometryPropertyPath } from '../../../../types';
import { LineInputType, LineInputValue } from '../../../LineInputs/types';
import { HorizontalScaleIcon } from '../../../../../../icons/HorizontalScaleIcon';
import { VerticalScaleIcon } from '../../../../../../icons/VerticalScaleIcon';
import { RotateAngleIcon } from '../../../../../../icons/RotateAngleIcon';
import { useScenesStore } from '../../../../../../store/scenesStore';
import set from 'lodash/set';
import { isShapePropMixed } from '../../utils/isShapePropMixed.ts';
import { useUiStore } from '../../../../../../store/uiStore';

export const TransformOptions = () => {
  const { activeSceneId, getSceneById, updateShapes } = useScenesStore();
  const { setTransformFrameNeedsUpdate } = useUiStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return;

  const shapes = Object.values(scene.shapes).filter((item) => item.selected);

  const handleTransformOnChange = (id: string, value: LineInputValue) => {
    updateShapes(
      scene.id,
      shapes.map((shape) => ({ ...set(shape, id, value) }))
    );
    setTransformFrameNeedsUpdate(true);
  };

  return (
    <div className={'px-3 py-2'}>
      <div className={'mb-3 flex items-center text-xs font-bold text-gray-300'}>
        <span>Transform:</span>
        <GeometryIcon
          className={'mx-1 my-auto h-3 w-3 rounded bg-gray-700 p-0.5'}
          viewBox={'3 3 10 10'}
        />
        <span className={'capitalize'}>
          {shapes.length > 1 ? 'Multiple Objects' : shapes?.[0]?.type || ''}
        </span>
      </div>
      <div className={'mt-2 flex w-full'}>
        <LineInputs
          inputsPerLine={2}
          inputs={[
            {
              id: GeometryPropertyPath.POS_X,
              name: 'x',
              icon: 'X',
              value: isShapePropMixed(shapes, 'position.x')
                ? 'Mixed'
                : shapes?.[0]?.position?.x,
              type: LineInputType.NUMBER,
            },
            {
              id: GeometryPropertyPath.POS_Y,
              name: 'Y',
              icon: 'Y',
              value: isShapePropMixed(shapes, 'position.y')
                ? 'Mixed'
                : shapes?.[0]?.position?.y,
              type: LineInputType.NUMBER,
            },
            {
              id: GeometryPropertyPath.SCALE_X,
              name: 'Scale X',
              icon: <HorizontalScaleIcon className={'h-4 w-4'} />,
              value: isShapePropMixed(shapes, 'scale.x')
                ? 'Mixed'
                : shapes?.[0]?.scale?.x,
              type: LineInputType.NUMBER,
            },
            {
              id: GeometryPropertyPath.SCALE_Y,
              name: 'Scale Y',
              icon: <VerticalScaleIcon className={'h-4 w-4'} />,
              value: isShapePropMixed(shapes, 'scale.y')
                ? 'Mixed'
                : shapes?.[0]?.scale?.y,
              type: LineInputType.NUMBER,
            },
            {
              id: GeometryPropertyPath.ROTATION,
              name: 'Angle',
              icon: <RotateAngleIcon className={'h-4 w-4'} />,
              value: shapes.length === 1 ? shapes?.[0]?.rotation : 0,
              type: LineInputType.NUMBER,
            },
          ]}
          onChange={handleTransformOnChange}
        />
      </div>
    </div>
  );
};
