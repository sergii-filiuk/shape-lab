import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const RotateAngleIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox={viewBox || '0 0 16 16'}
      className={clsx(className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 4C4.5 3.72386 4.27614 3.5 4 3.5C3.72386 3.5 3.5 3.72386 3.5 4V12.5H12C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5H8.47254C8.24196 9.41419 6.58581 7.75804 4.5 7.52746V4ZM4.5 8.53544V11.5H7.46456C7.2453 9.96715 6.03285 8.7547 4.5 8.53544Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
