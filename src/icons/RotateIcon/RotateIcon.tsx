import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const RotateIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 24 24'}
      className={clsx(className)}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
    >
      <g clipPath="url(#clip0_2748_344847)">
        <g filter="url(#filter0_ddd_2748_344847)">
          <mask
            id="path-1-outside-1_2748_344847"
            maskUnits="userSpaceOnUse"
            x="2.20898"
            y="2.93994"
            width="20"
            height="19"
            fill="black"
          >
            <rect fill="white" x="2.20898" y="2.93994" width="20" height="19" />
            <path d="M8.26055 19.8405C8.55344 19.5476 8.55344 19.0727 8.26055 18.7799L5.82469 16.344H8.26831C13.1008 16.344 17.0183 12.4265 17.0183 7.59399V6.50047L19.5093 8.99151C19.8022 9.2844 20.2771 9.2844 20.57 8.99151C20.8629 8.69862 20.8629 8.22374 20.57 7.93085L16.7988 4.15961C16.5059 3.86672 16.031 3.86672 15.7381 4.15961L11.9669 7.93085C11.674 8.22374 11.674 8.69862 11.9669 8.99151C12.2598 9.2844 12.7346 9.2844 13.0275 8.99151L15.5183 6.50074V7.59399C15.5183 11.5981 12.2724 14.844 8.26831 14.844H5.7146L8.26055 12.298C8.55344 12.0051 8.55344 11.5303 8.26055 11.2374C7.96766 10.9445 7.49278 10.9445 7.19989 11.2374L3.42865 15.0086C3.13576 15.3015 3.13576 15.7764 3.42865 16.0693L7.19989 19.8405C7.49278 20.1334 7.96766 20.1334 8.26055 19.8405Z" />
          </mask>
          <path
            d="M8.26055 19.8405C8.55344 19.5476 8.55344 19.0727 8.26055 18.7799L5.82469 16.344H8.26831C13.1008 16.344 17.0183 12.4265 17.0183 7.59399V6.50047L19.5093 8.99151C19.8022 9.2844 20.2771 9.2844 20.57 8.99151C20.8629 8.69862 20.8629 8.22374 20.57 7.93085L16.7988 4.15961C16.5059 3.86672 16.031 3.86672 15.7381 4.15961L11.9669 7.93085C11.674 8.22374 11.674 8.69862 11.9669 8.99151C12.2598 9.2844 12.7346 9.2844 13.0275 8.99151L15.5183 6.50074V7.59399C15.5183 11.5981 12.2724 14.844 8.26831 14.844H5.7146L8.26055 12.298C8.55344 12.0051 8.55344 11.5303 8.26055 11.2374C7.96766 10.9445 7.49278 10.9445 7.19989 11.2374L3.42865 15.0086C3.13576 15.3015 3.13576 15.7764 3.42865 16.0693L7.19989 19.8405C7.49278 20.1334 7.96766 20.1334 8.26055 19.8405Z"
            fill="#111417"
          />
          <path
            d="M8.26055 19.8405C8.55344 19.5476 8.55344 19.0727 8.26055 18.7799L5.82469 16.344H8.26831C13.1008 16.344 17.0183 12.4265 17.0183 7.59399V6.50047L19.5093 8.99151C19.8022 9.2844 20.2771 9.2844 20.57 8.99151C20.8629 8.69862 20.8629 8.22374 20.57 7.93085L16.7988 4.15961C16.5059 3.86672 16.031 3.86672 15.7381 4.15961L11.9669 7.93085C11.674 8.22374 11.674 8.69862 11.9669 8.99151C12.2598 9.2844 12.7346 9.2844 13.0275 8.99151L15.5183 6.50074V7.59399C15.5183 11.5981 12.2724 14.844 8.26831 14.844H5.7146L8.26055 12.298C8.55344 12.0051 8.55344 11.5303 8.26055 11.2374C7.96766 10.9445 7.49278 10.9445 7.19989 11.2374L3.42865 15.0086C3.13576 15.3015 3.13576 15.7764 3.42865 16.0693L7.19989 19.8405C7.49278 20.1334 7.96766 20.1334 8.26055 19.8405Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#path-1-outside-1_2748_344847)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_ddd_2748_344847"
          x="-45.791"
          y="-37.0601"
          width="115.58"
          height="114.12"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="24" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.952941 0 0 0 0 0.964706 0 0 0 0 0.972549 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2748_344847"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.239216 0 0 0 0 0.282353 0 0 0 0 0.32549 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2748_344847"
            result="effect2_dropShadow_2748_344847"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.239216 0 0 0 0 0.282353 0 0 0 0 0.32549 0 0 0 0.36 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2748_344847"
            result="effect3_dropShadow_2748_344847"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2748_344847"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_2748_344847">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
