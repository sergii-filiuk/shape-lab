import { SceneIcon } from '../../../../icons/SceneIcon';
import { LineInputs } from '../LineInputs';
import { GeometryPropertyPath } from '../../types';
import { LineInputType, LineInputValue } from '../LineInputs/types';
import { useScenesStore } from '../../../../store/scenesStore';
import set from 'lodash/set';

export const SceneOptions = () => {
  const { activeSceneId, getSceneById, updateScene } = useScenesStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return;

  const handleTransformOnChange = (id: string, value: LineInputValue) => {
    updateScene(scene.id, {
      ...set(scene, id, value),
    });
  };

  return (
    <div className={'px-3 py-2'}>
      <div className={'mb-3 flex items-center text-xs font-bold text-gray-300'}>
        <SceneIcon className={'mr-1 h-3 w-3'} />
        <span>Scene</span>
      </div>
      <div className={'mt-2 flex w-full'}>
        <LineInputs
          inputsPerLine={2}
          inputs={[
            {
              id: GeometryPropertyPath.WIDTH,
              name: 'width',
              icon: 'W',
              value: scene.width,
              type: LineInputType.NUMBER,
            },
            {
              id: GeometryPropertyPath.HEIGHT,
              name: 'height',
              icon: 'H',
              value: scene.height,
              type: LineInputType.NUMBER,
            },
          ]}
          onChange={handleTransformOnChange}
        />
      </div>
    </div>
  );
};
