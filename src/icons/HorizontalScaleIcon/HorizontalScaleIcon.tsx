import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const HorizontalScaleIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 17'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.332 5.834 2.667 2.667-2.667 2.666M4.667 11.167 2 8.501l2.667-2.667M14 8.5H2"
        stroke="#606F7B"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
