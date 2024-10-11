import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const AlignRightIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.332 13.333V2.666"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M2.665 8.666h8.667v2.667H2.665V8.666ZM5.999 4.666h5.333v2H5.999v-2Z"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
