import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const AlignVerticalIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 13.333V2.666"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12.665 8.666H3.332v2.667h9.333V8.666ZM10.665 4.666H5.332v2h5.333v-2Z"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
