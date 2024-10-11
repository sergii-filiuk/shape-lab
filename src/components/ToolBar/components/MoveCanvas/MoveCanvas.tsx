import { ToolProps } from '../types';
import { FC } from 'react';
import { MoveCanvasIcon } from '../../../../icons/MoveCanvasIcon';
import { clsx } from 'clsx';
import { useToolBarStore } from '../../../../store/toolBarStore';
import { Button } from '@headlessui/react';

export const MoveCanvas: FC<ToolProps> = ({ id, className }) => {
  const { getToolById, setActiveToolId } = useToolBarStore();

  const state = getToolById(id);

  const handleOnSelect = () => {
    if (state?.isActivable) {
      setActiveToolId(id);
    }
  };

  return (
    <Button onClick={handleOnSelect}>
      <MoveCanvasIcon className={clsx(className, 'w-6 h-6 px-1')} />
    </Button>
  );
};
