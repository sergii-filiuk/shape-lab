import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const SceneIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 16 16'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        d="M2 12H4V14"
        stroke="#5359FD"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4 2V4H2"
        stroke="#5359FD"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14 4H12V2"
        stroke="#5359FD"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12 14V12H14"
        stroke="#5359FD"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <rect
        x="4"
        y="4"
        width="8"
        height="8"
        stroke="#5359FD"
        strokeLinejoin="round"
      ></rect>
    </svg>
  );
};
