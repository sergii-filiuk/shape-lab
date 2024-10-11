import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const TriangleIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 24 24'}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <g clipPath="url(#a)">
        <path
          d="m12.001 4 9 14.5H3.038L12.001 4Z"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.514"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="#fff"
            transform="matrix(-1 0 0 1 24 0)"
            d="M0 0h24v24H0z"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
};
