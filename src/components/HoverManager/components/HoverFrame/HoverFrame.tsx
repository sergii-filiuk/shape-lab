import { FC } from 'react';
import { ShapeProps } from '../../../shapes/types';
import { extend } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { normalizeScale } from '../../../../utils/normalizeScale';
import { HOVER_FRAME_BORDER_COLOR } from './constants';

extend({ MeshLineGeometry, MeshLineMaterial });

export const HoverFrame: FC<
  {
    width: number;
    height: number;
  } & ShapeProps
> = ({ ...otherProps }) => {
  const position = otherProps.position;
  const scale = normalizeScale(otherProps.scale);

  const width = otherProps.width * scale.x;
  const height = otherProps.width * scale.y;
  const rotation = otherProps.rotation;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${position.x - width / 2}px`,
        top: `${position.y - height / 2}px`,
        borderColor: HOVER_FRAME_BORDER_COLOR,
        transform: `rotate(${rotation}deg)`,
      }}
      className={'border-2 border-solid absolute pointer-events-none'}
    />
  );
};
