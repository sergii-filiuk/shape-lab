import { ShapeMenu } from '../components/ShapeMenu';
import { MoveEntity } from '../components/MoveEntity';
import { MoveCanvas } from '../components/MoveCanvas';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { ToolCfg } from '../../../store/toolBarStore/types';
import { ToolType } from '../types';

export const TOOLBAR_ITEMS_CFG: ToolCfg[] = [
  {
    id: ToolType.HAMBURGER_MENU,
    component: HamburgerMenu,
    label: 'Preferences',
  },
  {
    id: ToolType.MOVE_ENTITY,
    component: MoveEntity,
    label: 'Move',
    isActivable: true,
  },
  {
    id: ToolType.MOVE_CANVAS,
    component: MoveCanvas,
    label: 'Hand tool',
    isActivable: true,
    disabled: true,
  },
  {
    id: ToolType.SHAPE_MENU,
    component: ShapeMenu,
    label: 'Polygon',
    isActivable: true,
  },
];
