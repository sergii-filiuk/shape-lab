import { ToolBar } from '../ToolBar';
import { Dashboard } from '../Dashboard';
import { RightPanel } from '../RightPanel';
import { SceneInspector } from '../SceneIspector';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import styles from './App.module.scss';
import { SCENE_INSPECTOR_DEFAULT_HEIGHT } from './constants';

export const App = () => {
  const [sceneInspectorHeight, setSceneInspectorHeight] = useState<
    number | string
  >(SCENE_INSPECTOR_DEFAULT_HEIGHT);
  const sceneInspectorRef = useResizeObserver((_width, height) => {
    setSceneInspectorHeight(height);
  });
  const handleOnOpenSceneInspector = (open: boolean) => {
    setSceneInspectorHeight(open ? SCENE_INSPECTOR_DEFAULT_HEIGHT : 'auto');
  };

  return (
    <div className={'flex flex-1 flex-col h-full w-full'}>
      <div className={'box-border h-10 bg-gray-800'}>
        <header className={'h-10'}>
          <nav className="flex px-2 py-2">
            <ToolBar />
          </nav>
        </header>
      </div>
      <div className="relative h-full flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div className="relative h-full flex flex-1 flex-col overflow-hidden">
            <Dashboard />
            <div
              className={'pointer-events-none'}
              style={{ height: sceneInspectorHeight }}
            />
          </div>
          <RightPanel />
        </div>
      </div>
      <div
        ref={sceneInspectorRef}
        className={clsx(
          'absolute bottom-0 z-10 w-full',
          styles.sceneInspectorShadow
        )}
        style={{ height: sceneInspectorHeight }}
      >
        <SceneInspector onOpen={handleOnOpenSceneInspector} />
      </div>
    </div>
  );
};
