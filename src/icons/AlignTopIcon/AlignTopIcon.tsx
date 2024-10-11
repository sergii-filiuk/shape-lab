import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const AlignTopIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.165 2.666h10.667"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M11.832 13.333V4.666H9.165v8.667h2.667ZM7.168 10V4.665h-2v5.333h2Z"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
