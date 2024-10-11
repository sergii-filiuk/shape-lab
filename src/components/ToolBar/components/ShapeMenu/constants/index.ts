import { RectangleIcon } from '../../../../../icons/RectangleIcon';
import { CircleIcon } from '../../../../../icons/CircleIcon';
import { TriangleIcon } from '../../../../../icons/TriangleIcon';
import { StarIcon } from '../../../../../icons/StarIcon';
import { ShapeMenuItems } from '../types';
import { ShapeType } from '../../../../../store/scenesStore/types';

export const SHAPE_MENU_ITEMS: ShapeMenuItems = [
  {
    id: ShapeType.RECTANGLE,
    icon: RectangleIcon,
    label: 'Rectangle',
    isSelectable: true,
  },
  {
    id: ShapeType.CIRCLE,
    icon: CircleIcon,
    label: 'Circle',
    isSelectable: true,
  },
  {
    id: ShapeType.TRIANGLE,
    icon: TriangleIcon,
    label: 'Triangle',
    isSelectable: true,
  },
  {
    id: ShapeType.STAR,
    icon: StarIcon,
    label: 'Star',
    isSelectable: true,
  },
];
