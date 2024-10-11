import { TransformFrameAction } from '../components/TransformFrame/types';
import { Shape } from '../../../store/scenesStore/types';
import { MousePosition } from '../../../hooks/useMousePosition/types';
import { MathUtils, Vector2 } from 'three';
import { checkPointSide } from '../../../utils/checkPointSide';
import { angleBetweenVectors2D } from '../../../utils/angleBetweenVectors2D';
import { Rectangle } from '../../shapes/Rectangle/types';

export const calculateShapesTransforms = (
  action: TransformFrameAction,
  shapes: Shape[],
  startPosition: MousePosition,
  endPosition: MousePosition,
  oobb: Rectangle
): { transformedShapes: Shape[]; transformedFrame: Rectangle } => {
  if (!startPosition) return { transformedShapes: [], transformedFrame: oobb };

  const oobbPositionV = new Vector2(oobb.position.x, oobb.position.y);

  const startPositionV = new Vector2(startPosition.x, startPosition.y);
  const endPositionV = new Vector2(endPosition.x, endPosition.y);

  const v1 = startPositionV.clone().sub(oobbPositionV);
  const v2 = endPositionV.clone().sub(oobbPositionV);

  const l1 = v1.length();
  const l2 = v2.length();

  const endPositionSign = Math.sign(
    checkPointSide(oobbPositionV, startPositionV, endPositionV)
  );
  const angle = MathUtils.radToDeg(angleBetweenVectors2D(v1, v2));

  const diff = l2 - l1;

  const transformedShapes = shapes.map((shape) => {
    const nextShape = {
      ...shape,
    };
    switch (action) {
      case TransformFrameAction.SCALE: {
        const positionV = new Vector2(shape.position.x, shape.position.y);
        const positionInFrameSpaceV = positionV.clone().sub(oobbPositionV);
        const transformedFrameNewScaleV = new Vector2(
          Math.abs(oobb.scale.x + diff),
          Math.abs(oobb.scale.y + diff)
        );

        const scalingFactorV = new Vector2(
          (oobb.width * transformedFrameNewScaleV.x) /
            (oobb.width * oobb.scale.x),
          (oobb.width * transformedFrameNewScaleV.y) /
            (oobb.width * oobb.scale.y)
        );

        const length = positionInFrameSpaceV
          .clone()
          .multiply(scalingFactorV)
          .length();

        const normalizedPositionInFrameSpaceV = positionInFrameSpaceV
          .clone()
          .normalize();

        const transformedPositionInFrameSpaceV = normalizedPositionInFrameSpaceV
          .clone()
          .multiplyScalar(length);

        const newPositionV = transformedPositionInFrameSpaceV
          .clone()
          .add(oobbPositionV);

        const newScale = {
          x: shape.scale.x * scalingFactorV.x,
          y: shape.scale.y * scalingFactorV.y,
        };

        if (shapes.length > 1) {
          nextShape.position = {
            x: newPositionV.x,
            y: newPositionV.y,
          };
        }
        nextShape.scale = newScale;

        break;
      }
      case TransformFrameAction.ROTATE: {
        const position = { ...shape.position };
        const angleInRadians = (angle * endPositionSign * Math.PI) / 180;
        const cosTheta = Math.cos(angleInRadians);
        const sinTheta = Math.sin(angleInRadians);
        const deltaX = position.x - oobbPositionV.x;
        const deltaY = position.y - oobbPositionV.y;

        const rotatedX =
          deltaX * cosTheta - deltaY * sinTheta + oobbPositionV.x;
        const rotatedY =
          deltaX * sinTheta + deltaY * cosTheta + oobbPositionV.y;

        if (shapes.length > 1) {
          nextShape.position = {
            x: rotatedX,
            y: rotatedY,
          };
        }

        nextShape.rotation += angle * endPositionSign;
        break;
      }
    }
    return nextShape;
  });

  const transformedFrame = {
    ...oobb,
  };

  switch (action) {
    case TransformFrameAction.SCALE: {
      const newScale = {
        x: Math.abs(oobb.scale.x + diff),
        y: Math.abs(oobb.scale.y + diff),
      };

      if (newScale.x >= 0 && newScale.y >= 0) {
        transformedFrame.scale = newScale;
      }

      break;
    }
    case TransformFrameAction.ROTATE: {
      transformedFrame.rotation =
        transformedFrame.rotation + angle * endPositionSign;

      break;
    }
  }

  return {
    transformedShapes,
    transformedFrame,
  };
};
