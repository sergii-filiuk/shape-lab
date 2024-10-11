import { FC } from 'react';
import { IconProps } from '../../../../../../../icons/types';
import { RendererType } from '../../../../../../../store/uiStore/types';

export type RendererMenuItem = {
  id: RendererType;
  icon: FC<IconProps> | null;
  label: string;
  isSelectable?: boolean;
};

export type RendererMenuItems = RendererMenuItem[];

export type RendererMenuProps = {
  className?: string;
};
