import { FC } from 'react';
import { ToolProps } from '../types';
import { MoveEntityIcon } from '../../../../icons/MoveEntityIcon';
import { clsx } from 'clsx';
import { Button } from '@headlessui/react';
import { useToolBarStore } from '../../../../store/toolBarStore';

export const MoveEntity: FC<ToolProps> = ({ id, className }) => {
  const { getToolById, setActiveToolId } = useToolBarStore();

  const state = getToolById(id);

  const handleOnSelect = () => {
    if (state?.isActivable) {
      setActiveToolId(id);
    }
  };

  return (
    <Button onClick={handleOnSelect}>
      <MoveEntityIcon
        className={clsx(className, 'relative left-0.5 top-px w-6 h-6 px-1')}
      />
    </Button>
  );
};
