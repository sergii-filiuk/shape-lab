import { useScenesStore } from '../../store/scenesStore';
import { useToolBarStore } from '../../store/toolBarStore';
import { ToolType } from '../ToolBar/types';
import { clsx } from 'clsx';
import styles from './UiManager.module.scss';
import { TransformManager } from '../TransformManager';
import { HoverManager } from '../HoverManager';
import { SelectionManager } from '../SelectionManager';
import { RenderManager } from '../RenderManager';
import { Background } from '../shapes/Background';
import { useUiStore } from '../../store/uiStore';

export const UiManager = () => {
  const { activeToolId } = useToolBarStore();
  const { activeSceneId, getSceneById } = useScenesStore();
  const { rendererType } = useUiStore();

  const scene = getSceneById(activeSceneId!);

  if (!scene) return null;

  return (
    <div
      id={`scene_${scene.id}`}
      style={{ width: `${scene.width}px`, height: `${scene.height}px` }}
      className={clsx(
        activeToolId === ToolType.SHAPE_MENU && styles.dropShape,
        'relative z-[1]'
      )}
    >
      <div
        className={
          'flex justify-between w-full items-center pointer-events-none absolute translate-y-[-18px] whitespace-nowrap text-[12px] leading-none'
        }
      >
        <div>
          <span
            className={'overflow-hidden text-gray-400'}
          >{`${scene.width} X ${scene.height}`}</span>
          <span className={'overflow-hidden font-bold text-white pl-2'}>
            {scene.name}
          </span>
        </div>
        <span
          className={
            'pl-2 overflow-hidden text-gray-400 capitalize text-[10px]'
          }
        >
          {`Render Type: ${rendererType.replace('_', ' ')}`}
        </span>
      </div>
      <Background />
      <RenderManager />
      <TransformManager />
      <HoverManager />
      <SelectionManager />
    </div>
  );
};
