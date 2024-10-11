import { TransformFrameCorner, TransformFrameCornerCfg } from '../types';

export const generateTransformFrameCorners = (): TransformFrameCornerCfg[] => {
  return [
    {
      id: TransformFrameCorner.TOP_LEFT,
      className: 'top-0 left-0 -translate-x-2/4 -translate-y-2/4',
    },
    {
      id: TransformFrameCorner.TOP_RIGHT,
      className: 'top-0 right-0 translate-x-2/4 -translate-y-2/4',
    },
    {
      id: TransformFrameCorner.BOTTOM_LEFT,
      className: 'bottom-0 left-0 -translate-x-2/4 translate-y-2/4',
    },
    {
      id: TransformFrameCorner.BOTTOM_RIGHT,
      className: 'bottom-0 right-0 translate-x-2/4 translate-y-2/4',
    },
  ];
};
