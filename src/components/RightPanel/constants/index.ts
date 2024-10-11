import { AlignOption } from '../types';
import { AlignLeftIcon } from '../../../icons/AlignLeftIcon';
import { AlignHorizontalIcon } from '../../../icons/AlignHorizontalIcon';
import { AlignRightIcon } from '../../../icons/AlignRightIcon';
import { AlignTopIcon } from '../../../icons/AlignTopIcon';
import { AlignVerticalIcon } from '../../../icons/AlignVerticalIcon';
import { AlignBottomIcon } from '../../../icons/AlignBottomIcon';

export const TABS = [
  {
    name: 'Properties',
  },
];
export const ALIGN_OPTIONS = [
  {
    id: AlignOption.ALIGN_LEFT,
    label: 'Align Left',
    icon: AlignLeftIcon,
  },
  {
    id: AlignOption.ALIGN_HORIZONTAL,
    label: 'Align Horizontal Centers',
    icon: AlignHorizontalIcon,
  },
  {
    id: AlignOption.ALIGN_RIGHT,
    label: 'Align Right',
    icon: AlignRightIcon,
  },
  {
    id: AlignOption.ALIGN_TOP,
    label: 'Align Top',
    icon: AlignTopIcon,
  },
  {
    id: AlignOption.ALIGN_VERTICAL,
    label: 'Align Vertical Centers',
    icon: AlignVerticalIcon,
  },
  {
    id: AlignOption.ALIGN_BOTTOM,
    label: 'Align Bottom',
    icon: AlignBottomIcon,
  },
];
