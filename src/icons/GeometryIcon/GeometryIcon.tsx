import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const GeometryIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        d="M7.13 9.59a2.264 2.264 0 1 0 2.734-2.356"
        stroke="#F5F8FA"
        strokeWidth="0.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6.938 4.443 4.347 8.618h5.172L6.938 4.443Z"
        stroke="#F5F8FA"
        strokeWidth="0.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
