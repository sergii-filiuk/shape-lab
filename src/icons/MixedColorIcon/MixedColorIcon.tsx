import { FC } from 'react';
import { IconProps } from '../types';
import { clsx } from 'clsx';

export const MixedColorIcon: FC<IconProps> = ({ className, viewBox }) => {
  return (
    <svg
      viewBox={viewBox || '0 0 18 18'}
      className={clsx(className)}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
    >
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="white"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint0_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint1_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint2_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint3_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint4_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint5_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        fill="url(#paint6_linear_1270_280764)"
      ></rect>
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        stroke="#3D4852"
        strokeWidth="0.5"
      ></rect>
      <defs>
        <linearGradient
          id="paint0_linear_1270_280764"
          x1="8.31445"
          y1="11.5"
          x2="10.3145"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EC3527" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#EC3527"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_1270_280764"
          x1="9.31445"
          y1="10.5"
          x2="5.81445"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5810" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#FF5810"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_1270_280764"
          x1="5.31445"
          y1="10"
          x2="17.3145"
          y2="9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C527EC" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#C527EC"></stop>
        </linearGradient>
        <linearGradient
          id="paint3_linear_1270_280764"
          x1="6.81445"
          y1="8"
          x2="12.8145"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4327EC" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#4327EC"></stop>
        </linearGradient>
        <linearGradient
          id="paint4_linear_1270_280764"
          x1="7.31445"
          y1="9"
          x2="5.31445"
          y2="14.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#10FFFF" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#10FFFF"></stop>
        </linearGradient>
        <linearGradient
          id="paint5_linear_1270_280764"
          x1="9.81445"
          y1="9"
          x2="1.81445"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#10FF45" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#10FF45"></stop>
        </linearGradient>
        <linearGradient
          id="paint6_linear_1270_280764"
          x1="10.8145"
          y1="10"
          x2="1.31445"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFE710" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#FFE710"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
