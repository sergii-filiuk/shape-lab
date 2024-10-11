import { FC } from 'react';
import { ToolProps } from '../types';
import { MoveEntityAnchorIcon } from '../../../../icons/MoveEntityAnchorIcon';
import { clsx } from 'clsx';
import { Button } from '@headlessui/react';
import { useToolBarStore } from '../../../../store/toolBarStore';

export const MoveEntityAnchor: FC<ToolProps> = ({ id, className }) => {
  const { getToolById, setActiveToolId } = useToolBarStore();

  const state = getToolById(id);

  const handleOnSelect = () => {
    if (state?.isActivable) {
      setActiveToolId(id);
    }
  };

  return (
    <Button onClick={handleOnSelect}>
      <MoveEntityAnchorIcon className={clsx(className, 'w-6 h-6 px-1')} />
    </Button>
  );
};
