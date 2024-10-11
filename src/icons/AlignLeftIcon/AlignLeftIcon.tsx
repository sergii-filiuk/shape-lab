import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const AlignLeftIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.668 13.333V2.666"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13.335 8.666H4.668v2.667h8.667V8.666ZM10.001 4.666H4.668v2h5.333v-2Z"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
