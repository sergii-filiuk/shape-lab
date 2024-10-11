import { LineInputs } from '../../../LineInputs';
import { GeometryPropertyPath } from '../../../../types';
import { MixedColorIcon } from '../../../../../../icons/MixedColorIcon/MixedColorIcon.tsx';
import { LineInputType, LineInputValue } from '../../../LineInputs/types';
import { useScenesStore } from '../../../../../../store/scenesStore';
import set from 'lodash/set';
import { isShapePropMixed } from '../../utils/isShapePropMixed.ts';

export const AppearanceOptions = () => {
  const { activeSceneId, getSceneById, updateScene, updateShapes } =
    useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return;

  const shapes = Object.values(scene.shapes).filter((item) => item.selected);

  const handleTransformOnChange = (id: string, value: LineInputValue) => {
    updateScene(scene.id, {
      ...set(scene, id, value),
    });
    updateShapes(
      scene.id,
      shapes.map((shape) => ({ ...set(shape, id, value) }))
    );
  };

  const isMixed = isShapePropMixed(shapes, 'color');

  return (
    <div className={'flex flex-col pb-3 pl-4 pr-3 pt-4'}>
      <div className={'mb-3 flex items-center text-xs font-bold text-gray-300'}>
        <span>Appearance:</span>
      </div>
      <div className={'mt-2 flex w-full'}>
        <LineInputs
          inputsPerLine={1}
          inputs={[
            {
              id: GeometryPropertyPath.COLOR,
              name: 'color',
              icon: isMixed ? (
                <div>
                  <MixedColorIcon className={'h-4 w-4'} />
                </div>
              ) : (
                <div
                  className="h-4 w-4 cursor-pointer rounded-lg border-[0.5px] border-solid border-gray-600 shadow-sm "
                  style={{
                    backgroundColor: shapes?.[0]?.color,
                  }}
                ></div>
              ),
              value: isMixed ? 'Mixed' : shapes?.[0]?.color,
              type: LineInputType.COLOR,
            },
          ]}
          onChange={handleTransformOnChange}
        />
      </div>
    </div>
  );
};
