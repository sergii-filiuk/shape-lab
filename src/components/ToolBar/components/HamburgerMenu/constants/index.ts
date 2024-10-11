import { HamburgerMenuItems } from '../types';

export enum ViewPreferences {
  RULERS = 'rulers',
}

export const HAMBURGER_MENU_ITEMS: HamburgerMenuItems = [
  {
    id: 'edit',
    icon: null,
    label: 'Edit',
    options: [
      {
        id: 'undo',
        icon: null,
        label: 'Undo',
        disabled: true,
      },
      {
        id: 'redo',
        icon: null,
        label: 'Redo',
        disabled: true,
      },
    ],
  },
  {
    id: 'view',
    icon: null,
    label: 'View',
    options: [
      {
        id: ViewPreferences.RULERS,
        icon: null,
        label: 'Show rulers',
        isSelectable: true,
      },
    ],
  },
];
