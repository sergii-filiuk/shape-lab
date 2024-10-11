import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const StarIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '2 2 20 20'}
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.25a.75.75 0 0 0-.68.432L9.02 8.59l-5.133.78a.75.75 0 0 0-.424 1.266l3.736 3.832-.881 5.411a.75.75 0 0 0 1.102.778l4.58-2.53 4.58 2.53a.75.75 0 0 0 1.102-.778l-.881-5.411 3.736-3.832a.75.75 0 0 0-.424-1.265L14.98 8.59l-2.3-4.908A.75.75 0 0 0 12 3.25Zm0 2.517 1.792 3.822a.75.75 0 0 0 .566.423l4.086.622-2.981 3.057a.75.75 0 0 0-.203.644l.694 4.262-3.591-1.983a.75.75 0 0 0-.726 0l-3.59 1.983.693-4.262a.75.75 0 0 0-.203-.644l-2.98-3.057 4.085-.622a.75.75 0 0 0 .566-.423L12 5.767Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
