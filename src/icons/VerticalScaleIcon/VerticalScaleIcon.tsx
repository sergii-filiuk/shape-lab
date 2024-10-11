import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const VerticalScaleIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 17 17'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.165 11.834 8.5 14.501l-2.667-2.667M5.832 5.167 8.499 2.5l2.666 2.667M8.5 14.5v-12"
        stroke="#606F7B"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
