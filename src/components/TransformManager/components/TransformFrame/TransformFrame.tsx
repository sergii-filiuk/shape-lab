import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ShapeProps } from '../../../shapes/types';
import styles from './TransformFrame.module.scss';
import { clsx } from 'clsx';
import { generateTransformFrameCorners } from './utils/generateTransformFrameCorners.ts';
import {
  TransformFrameAction,
  TransformFrameCornerCfg,
  TransformFrameProps,
} from './types';
import { RotateIcon } from '../../../../icons/RotateIcon';
import { ScaleIcon } from '../../../../icons/ScaleIcon';
import { useMousePosition } from '../../../../hooks/useMousePosition';
import { normalizeScale } from '../../../../utils/normalizeScale';

export const TransformFrame: FC<
  {
    width: number;
    height: number;
  } & ShapeProps &
    TransformFrameProps
> = ({
  position,
  rotation,
  color = '#02b7fe',
  onAction = () => {},
  ...otherProps
}) => {
  const mousePosition = useMousePosition();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredCfg, setHoveredCfg] = useState<{
    corner: TransformFrameCornerCfg;
    type: TransformFrameAction;
  } | null>(null);
  const transformFrameRef = useRef<HTMLDivElement>(null);

  const corners = useMemo(() => generateTransformFrameCorners(), []);

  const handleOnMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent
  ) => {
    setIsDragging(true);
    onAction?.({ action: TransformFrameAction.START_TRANSFORM, event: e });
  };

  const handleOnMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    document.body.classList.remove(styles.clearCursor);
    setHoveredCfg(null);
    onAction?.({ action: TransformFrameAction.END_TRANSFORM, event: e });
  };

  const handleOnMouseMove = (
    _e: React.MouseEvent<HTMLDivElement>,
    corner: TransformFrameCornerCfg,
    type: TransformFrameAction
  ) => {
    if (!isDragging) {
      document.body.classList.add(styles.clearCursor);
      setHoveredCfg({
        corner,
        type,
      });
    }
  };
  const handleOnMouseLeave = (_e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      document.body.classList.remove(styles.clearCursor);
      setHoveredCfg(null);
    }
  };

  const handleOnDrag = (e: MouseEvent) => {
    if (isDragging) {
      onAction?.({ action: hoveredCfg?.type!, event: e });
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleOnDrag, false);
    }
    return () => {
      window.removeEventListener('mousemove', handleOnDrag, false);
    };
  }, [isDragging, hoveredCfg]);

  useEffect(() => {
    window.addEventListener('mouseup', handleOnMouseUp, false);
    return () => {
      window.removeEventListener('mouseup', handleOnMouseUp, false);
    };
  }, []);

  const scale = normalizeScale(otherProps.scale);
  const width = otherProps.width * scale.x;
  const height = otherProps.height * scale.y;

  return (
    <div
      id={'transform_frame'}
      ref={transformFrameRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${position.x - width / 2}px`,
        top: `${position.y - height / 2}px`,
        borderColor: color,
        transform: `rotate(${rotation}deg)`,
      }}
      className={
        'border-2 border-solid absolute flex items-center justify-center'
      }
      onPointerOver={(e) => otherProps.onPointerOver?.(e)}
      onPointerOut={(e) => otherProps.onPointerOut?.(e)}
      onPointerDown={(e) => otherProps.onPointerDown?.(e)}
      onPointerUp={(e) => otherProps.onPointerUp?.(e)}
    >
      {corners.map((corner) => {
        return (
          <div key={corner.id}>
            <div
              onMouseMove={(e) =>
                handleOnMouseMove(e, corner, TransformFrameAction.ROTATE)
              }
              onMouseLeave={(e) => handleOnMouseLeave(e)}
              onMouseDown={(e) => handleOnMouseDown(e)}
              className={clsx(
                corner.className,
                'flex absolute w-6 h-6 items-center justify-center bg-color-grey'
              )}
            />
            <div
              onMouseMove={(e) =>
                handleOnMouseMove(e, corner, TransformFrameAction.SCALE)
              }
              onMouseLeave={(e) => handleOnMouseLeave(e)}
              onMouseDown={(e) => handleOnMouseDown(e)}
              style={{ borderColor: color }}
              className={clsx(
                corner.className,
                'flex absolute w-[11px] h-[11px] border-2 border-solid bg-[white]'
              )}
            />
          </div>
        );
      })}
      {hoveredCfg &&
        createPortal(
          <div
            style={{
              left: `${mousePosition.x - 12}px`,
              top: `${mousePosition.y - 12}px`,
              transform: `rotate(${parseInt(String(rotation))}deg)`,
            }}
            className={'absolute z-cursor pointer-events-none'}
          >
            <div
              className={
                styles[`${hoveredCfg.type}_${hoveredCfg.corner.id}_cursor`]
              }
            >
              {hoveredCfg.type === TransformFrameAction.ROTATE && (
                <RotateIcon />
              )}
              {hoveredCfg.type === TransformFrameAction.SCALE && <ScaleIcon />}
            </div>
          </div>,
          document.body
        )}
      <div
        style={{ borderColor: color }}
        className={'border-2 border-solid h-2 w-2 rounded-xl'}
      />
    </div>
  );
};
