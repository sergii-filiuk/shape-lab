import { FC } from 'react';
import { IconProps } from '../../../../../icons/types';
import { ShapeType } from '../../../../../store/scenesStore/types';

export type ShapeMenuItem = {
  id: ShapeType;
  icon: FC<IconProps>;
  label: string;
  isSelectable?: boolean;
};

export type ShapeMenuItems = ShapeMenuItem[];
