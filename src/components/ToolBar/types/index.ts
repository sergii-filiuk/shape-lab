import * as React from 'react';
import { ToolProps } from '../components/types';

export enum ToolType {
  HAMBURGER_MENU = 'hamburger_menu',
  SHAPE_MENU = 'shape_menu',
  MOVE_CANVAS = 'move_canvas',
  MOVE_ENTITY = 'move_entity',
}

export type ToolBarItemCfg = {
  id: string;
  component: React.FC<ToolProps>;
  label: string;
  isActivable?: boolean;
  isVisible?: boolean;
};

export type ToolBarItemsCfg = ToolBarItemCfg[];
