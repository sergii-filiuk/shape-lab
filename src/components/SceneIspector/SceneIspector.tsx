import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import { Button } from '@headlessui/react';
import { FC, useState } from 'react';
import { PlusIcon } from '../../icons/PlusIcon';
import { UpSlopeIcon } from '../../icons/UpSlopeIcon';
import { DownSlopeIcon } from '../../icons/DownSlopeIcon';
import { useScenesStore } from '../../store/scenesStore';
import { generateScene } from '../../store/scenesStore/utils/generateScene.tsx';
import { Scene } from '../../store/scenesStore/types';
import { Layers } from '../Layers';
import { SceneIcon } from '../../icons/SceneIcon';
import { clsx } from 'clsx';

export type SceneInspectorProps = {
  onOpen?: (value: boolean) => void;
};

const activeSceneClassName =
  'relative flex h-[26px] shrink-0 items-center self-end rounded-t-lg bg-gray-700';
const noActiveSceneClassName = 'cursor-pointer';

export const SceneInspector: FC<SceneInspectorProps> = ({ onOpen }) => {
  const { scenes, addScene, removeScene, setActiveSceneId, activeSceneId } =
    useScenesStore();
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredSceneTab, setHoveredSceneTab] = useState<Scene | null>(null);

  const handleOnSelectActiveScene = (item: Scene) => {
    setActiveSceneId(item.id);
  };
  const handleOnOpenSceneInspector = (value: boolean) => {
    setIsOpen(value);
    onOpen?.(value);
  };

  const handleOnAddScene = () => {
    const newScene = generateScene('New Scene');

    addScene(newScene);
    setActiveSceneId(newScene.id);
  };

  const handleOnRemoveScene = (item: Scene) => {
    const nextScenes = Object.values(scenes).filter(
      (scene) => scene.id !== item.id
    );
    removeScene(item.id);
    if (activeSceneId === item.id && nextScenes.length) {
      setActiveSceneId(nextScenes[0].id);
    }
  };

  return (
    <div
      id={'scene-inspector'}
      className="text-xs h-full rounded-t-2xl bg-gray-800 text-white"
    >
      <div className="flex min-h-[28px] items-center">
        <Button
          className="h-full"
          onClick={() => handleOnOpenSceneInspector(!isOpen)}
        >
          {isOpen ? (
            <ChevronUpIcon className="mx-3 h-4 w-4 cursor-pointer" />
          ) : (
            <ChevronDownIcon className="mx-3 h-4 w-4 cursor-pointer" />
          )}
        </Button>
        {Object.values(scenes).map((item) => {
          return (
            <div
              onMouseEnter={() => {
                setHoveredSceneTab(item);
              }}
              onMouseLeave={() => {
                setHoveredSceneTab(null);
              }}
              key={item.id}
              className={clsx(
                noActiveSceneClassName,
                activeSceneId === item.id && activeSceneClassName
              )}
            >
              <Button
                className="flex h-full"
                onClick={() => handleOnSelectActiveScene(item)}
              >
                <div className="flex font-normal text-white hover:text-[#BFC8D1] h-full pl-4">
                  <div className={'flex items-center '}>
                    <SceneIcon className={'mr-1 h-4 w-4 text-gray-400'} />
                    <span
                      className={
                        'ml-1 mr-6 text-caption font-normal text-white hover:text-[#BFC8D1]'
                      }
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </Button>
              {hoveredSceneTab?.id === item.id && (
                <Button
                  onClick={() => handleOnRemoveScene(item)}
                  className={
                    'absolute right-1.5 top-[7px] h-3.5 w-3.5 cursor-pointer text-gray-400'
                  }
                >
                  <XMarkIcon />
                </Button>
              )}
              {activeSceneId === item.id && (
                <div>
                  <UpSlopeIcon className="absolute -left-4 bottom-0 h-4 w-4 text-gray-700" />
                  <DownSlopeIcon className="absolute -right-4 bottom-0 h-4 w-4 text-gray-700" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex h-full flex-1 bg-gray-700">
        <div className="my-1 flex w-10 flex-col items-center gap-2">
          <Button
            onClick={handleOnAddScene}
            className="flex h-5 w-5 items-center justify-center"
          >
            <PlusIcon className="h-4 w-4 cursor-pointer stroke-gray-300 hover:rounded hover:bg-[#283137] hover:stroke-white" />
          </Button>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="relative overflow-auto text-xs font-normal leading-[15px]">
            <div className="flex flex-col">
              <div className="mt-1 h-[17px] shrink-0 items-center text-caption font-medium text-gray-300">
                Layers
              </div>
              {isOpen && (
                <div className="h-full">
                  <Layers />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
