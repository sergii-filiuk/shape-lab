import { FC } from 'react';
import { IconProps } from '../../../../../icons/types';

export type HamburgerMenuItem = {
  id: string;
  icon: FC<IconProps> | null;
  label: string;
  options?: HamburgerMenuItem[];
  isSelectable?: boolean;
  disabled?: boolean;
};

export type HamburgerMenuItems = HamburgerMenuItem[];
