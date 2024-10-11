import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const AlignBottomIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.835 13.334H3.168"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M9.168 2.667v8.667h2.667V2.667H9.168ZM5.168 6v5.334h2V6.001h-2Z"
        strokeWidth="0.994"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
