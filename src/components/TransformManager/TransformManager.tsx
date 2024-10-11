import { useEffect, useRef, useState } from 'react';
import { useScenesStore } from '../../store/scenesStore';
import { useToolBarStore } from '../../store/toolBarStore';
import { ToolType } from '../ToolBar/types';
import { TransformFrame } from './components/TransformFrame';
import { TransformFrameAction } from './components/TransformFrame/types';
import styles from './TransformManager.module.scss';
import { useMousePosition } from '../../hooks/useMousePosition';
import { MousePosition } from '../../hooks/useMousePosition/types';
import { calculateShapesTransforms } from './utils/calculateShapesTransforms.ts';
import { useMouseMoveDelta } from '../../hooks/useMouseMoveDelta';
import { Rectangle } from '../shapes/Rectangle/types';
import { calculateRectanglesObb } from '../../utils/calculateRectanglesObb';
import { useUiStore } from '../../store/uiStore';
import { getShapeRectangle } from '../SelectionManager/utils/getShapeRectangle.ts';

export const TransformManager = () => {
  const {
    setIsEventsBlocking,
    transformFrameNeedsUpdate,
    setTransformFrameNeedsUpdate,
  } = useUiStore();
  const mousePosition = useMousePosition();
  const mouseMoveDelta = useMouseMoveDelta();
  const { activeToolId } = useToolBarStore();
  const { activeSceneId, getSceneById, updateShapes } = useScenesStore();
  const [startTransformMousePosition, setStartTransformMousePosition] =
    useState<MousePosition | null>(null);
  const transformManagerRef = useRef<HTMLDivElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransformAction, setIsTransformAction] = useState<boolean>(false);
  const [transformFrame, setTransformFrame] = useState<Rectangle | null>(null);

  const scene = getSceneById(activeSceneId!);
  const isToolMoveEntityActive = activeToolId === ToolType.MOVE_ENTITY;

  if (!scene) return null;

  const shapes = Object.values(scene.shapes).sort(
    (a, b) => b.zIndex - a.zIndex
  );

  const selectedShapes = shapes.filter((shape) => shape.selected);
  const selectedShapesIds = selectedShapes.flatMap(({ id }) => id);

  const handleOnAction = ({
    action,
    event,
  }: {
    action: TransformFrameAction;
    event?: React.MouseEvent<HTMLDivElement> | MouseEvent | undefined;
  }) => {
    if (!event) return;

    if (action === TransformFrameAction.START_TRANSFORM) {
      setIsEventsBlocking(true);
      setIsTransformAction(true);
      setStartTransformMousePosition({ x: event.clientX, y: event.clientY });
    } else if (action === TransformFrameAction.END_TRANSFORM) {
      setStartTransformMousePosition(null);
      setIsTransformAction(false);
      setIsEventsBlocking(false);
    } else {
      const rect = transformManagerRef?.current?.getBoundingClientRect();

      if (!startTransformMousePosition || !rect || !transformFrame) return;

      const { transformedShapes, transformedFrame } = calculateShapesTransforms(
        action,
        selectedShapes,
        {
          x: startTransformMousePosition.x - rect.left,
          y: startTransformMousePosition.y - rect.top,
        },
        {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        },
        transformFrame
      );

      setTransformFrame(transformedFrame);
      setStartTransformMousePosition({ x: event.clientX, y: event.clientY });
      updateShapes(scene.id, transformedShapes);
    }
  };

  useEffect(() => {
    if (isToolMoveEntityActive && isHovered) {
      document.body.classList.add(styles.moveCursor);
    } else {
      document.body.classList.remove(styles.moveCursor);
    }
    return () => {
      document.body.classList.remove(styles.moveCursor);
    };
  }, [isToolMoveEntityActive, isHovered]);

  useEffect(() => {
    const scene = getSceneById(activeSceneId!);
    if (!isDragging || isTransformAction || !transformFrame || !scene) return;

    const shapes = Object.values(scene.shapes).filter(
      ({ selected }) => selected
    );

    updateShapes(
      scene.id,
      shapes.map((shape) => ({
        ...shape,
        position: {
          x: shape.position.x + mouseMoveDelta.deltaX,
          y: shape.position.y + mouseMoveDelta.deltaY,
        },
      }))
    );
    transformFrame.position = {
      x: transformFrame.position.x + mouseMoveDelta.deltaX,
      y: transformFrame.position.y + mouseMoveDelta.deltaY,
    };
  }, [
    selectedShapesIds.toString(),
    activeSceneId,
    mousePosition.x,
    mousePosition.y,
  ]);

  useEffect(() => {
    if (!transformFrameNeedsUpdate) return;

    const nextTransformFrame = calculateRectanglesObb(
      selectedShapes.map((shape) => getShapeRectangle(shape))
    );

    if (nextTransformFrame) {
      // map scale from normalized view to 100%
      nextTransformFrame.scale = {
        x: nextTransformFrame.scale.x * 100,
        y: nextTransformFrame.scale.y * 100,
      };
    }

    setTransformFrame(nextTransformFrame);
    setTransformFrameNeedsUpdate(false);
  }, [transformFrameNeedsUpdate]);

  useEffect(() => {
    return () => {
      setIsEventsBlocking(false);
    };
  }, []);

  const handleOnPointerOver = () => {
    setIsHovered(true);
  };

  const handleOnPointerOut = () => {
    setIsHovered(false);
  };

  const handleOnPointerDown = () => {
    setIsEventsBlocking(true);
    setIsDragging(true);
  };

  const handleOnPointerUp = () => {
    setIsEventsBlocking(false);
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleOnPointerUp, false);
    return () => {
      window.removeEventListener('mouseup', handleOnPointerUp, false);
    };
  }, []);

  if (!isToolMoveEntityActive || !selectedShapes.length || !transformFrame)
    return;

  return (
    <div ref={transformManagerRef} className={'absolute top-0 left-0'}>
      <TransformFrame
        key={'transform_frame'}
        width={transformFrame.width}
        height={transformFrame.height}
        position={{ ...transformFrame.position, z: 10 }}
        onPointerOver={handleOnPointerOver}
        onPointerOut={handleOnPointerOut}
        onPointerDown={handleOnPointerDown}
        onAction={handleOnAction}
        scale={transformFrame.scale}
        rotation={transformFrame.rotation}
      />
    </div>
  );
};
