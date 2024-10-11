import { PointerEvent } from 'react';

export type TransformFrameCornerCfg = {
  id: TransformFrameCorner;
  className: string;
};
export enum TransformFrameCorner {
  TOP_LEFT = 'tl',
  TOP_RIGHT = 'tr',
  BOTTOM_LEFT = 'bl',
  BOTTOM_RIGHT = 'br',
}

export enum TransformFrameAction {
  SCALE = 'scale',
  ROTATE = 'rotate',
  START_TRANSFORM = 'start_transform',
  END_TRANSFORM = 'end_transform',
}

export type TransformFrameProps = {
  onAction?: (action: {
    action: TransformFrameAction;
    event?: React.MouseEvent<HTMLDivElement> | MouseEvent | undefined;
  }) => void;
  onPointerOver?: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerOut?: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerDown?: (e: PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: (e: PointerEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
