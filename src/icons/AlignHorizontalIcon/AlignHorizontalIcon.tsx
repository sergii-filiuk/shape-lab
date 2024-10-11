import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const AlignHorizontalIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.835 8H3.168"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M9.168 3.333v9.333h2.667V3.333H9.168ZM5.168 5.333v5.333h2V5.333h-2Z"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
