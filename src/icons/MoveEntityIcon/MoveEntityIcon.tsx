import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const MoveEntityIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 15 15'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        d="M8.02821 9.44983L6.23576 13.3332L2.66663 2.6665L13.3333 6.54529L9.46098 8.09068C8.82705 8.34367 8.31426 8.83011 8.02821 9.44983Z"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
