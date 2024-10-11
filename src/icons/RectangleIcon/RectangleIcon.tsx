import { IconProps } from '../types';
import { FC } from 'react';
import { clsx } from 'clsx';

export const RectangleIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 24 24'}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
