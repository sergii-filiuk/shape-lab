import { useMemo } from 'react';
import { clsx } from 'clsx';
import { useToolBarStore } from '../../store/toolBarStore';
import styles from './ToolBar.module.scss';
import { Tooltip } from 'react-tooltip';

const activeClassName = 'fill-[#00C1A2] text-[#00C1A2]';
const noActiveClassName =
  'fill-gray-800 hover:bg-gray-700 hover:fill-gray-700 hover:text-white';
export const ToolBar = () => {
  const state = useToolBarStore();

  const tools = useMemo(() => Object.values(state.tools), [state.tools]);

  return (
    <div
      id={'tool-bar'}
      className={'mr-auto flex h-6 flex-1 items-center gap-2'}
    >
      {tools.map((item) => {
        const Component = item.cfg.component;
        return (
          <div
            key={`${item.id}`}
            className={clsx('flex')}
            data-tooltip-id={item.id}
          >
            <Component
              id={item.id}
              className={clsx(
                state?.activeToolId === item.id
                  ? activeClassName
                  : noActiveClassName,
                state?.activeToolId === item.id ? styles.activeTool : null,
                'flex cursor-pointer items-center justify-center rounded hover:bg-gray-700',
                'relative z-[1]',
                item.cfg.disabled &&
                  'text-gray-600 hover:text-gray-600 event-pointers-none'
              )}
            />
            <Tooltip
              className={'z-dropdown relative z-[2]'}
              variant={'light'}
              id={`${item.id}`}
              place="bottom"
            >
              <div className={'text-xs'}>{item.label}</div>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};
