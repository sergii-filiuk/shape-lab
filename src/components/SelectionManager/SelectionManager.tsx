import { useClickOutsideOrEsc } from '../../hooks/useClickOutsideOrEsc';
import { useScenesStore } from '../../store/scenesStore';
import { MathUtils } from 'three';
import { isPointInsideRectangle } from '../../utils/isPointInsideRectangle';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useEffect, useState } from 'react';
import { MousePosition } from '../../hooks/useMousePosition/types';
import { isRectanglesIntersected } from '../../utils/isRectanglesIntersected';
import { useUiStore } from '../../store/uiStore';
import { getShapeRectangle } from './utils/getShapeRectangle.ts';
import { clsx } from 'clsx';
import { ContextMenuMeta } from '../types';
import { Shape } from '../../store/scenesStore/types';

export const SelectionManager = () => {
  const { isEventsBlocking, setTransformFrameNeedsUpdate } = useUiStore();
  const mousePosition = useMousePosition();
  const [contextMenuMeta, setContextMenuMeta] =
    useState<ContextMenuMeta<Shape> | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startMousePosition, setStartMousePosition] =
    useState<MousePosition | null>(null);
  const { getSceneById, activeSceneId, updateShapes, removeShape } =
    useScenesStore();

  useClickOutsideOrEsc({
    onOutsideOrEsc: () => {
      setContextMenuMeta(null);
    },
    excludeElementsQueries: ['.context-menu'],
  });

  useClickOutsideOrEsc({
    onOutsideOrEsc: (e) => {
      const scene = getSceneById(activeSceneId!);
      const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;
      const isShiftPressed = e.shiftKey;

      if (isCtrlOrCmdPressed || isShiftPressed || !scene) return;

      const element = document.querySelector(`#scene_${scene?.id}`);

      if (
        element &&
        element.contains(e.target as Node) &&
        e.type === 'mousedown'
      ) {
        const boundingClientRect = element && element.getBoundingClientRect();
        const shapes = Object.values(scene?.shapes);
        const mouseX = (e as MouseEvent).clientX - boundingClientRect.left;
        const mouseY = (e as MouseEvent).clientY - boundingClientRect.top;

        updateShapes(
          scene.id,
          shapes.map((shape) =>
            shape.selected
              ? {
                  ...shape,
                  selected: isPointInsideRectangle(
                    { x: mouseX, y: mouseY },
                    getShapeRectangle(shape)
                  ),
                }
              : shape
          )
        );
        setTransformFrameNeedsUpdate(true);
      }
    },
    excludeElementsQueries: [
      '#right-panel',
      '#tool-bar',
      '#scene-inspector',
      '#transform_frame',
    ],
  });

  const handleMouseDown = (e: MouseEvent) => {
    const scene = getSceneById(activeSceneId!);

    if (isEventsBlocking) return;

    const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;
    const isShiftPressed = e.shiftKey;

    if (isCtrlOrCmdPressed || isShiftPressed) {
      e.preventDefault();
      e.stopPropagation();
    }

    const element = document.querySelector(`#scene_${scene?.id}`);

    if (!(scene && element)) return;

    const boundingClientRect = element && element.getBoundingClientRect();
    const shapes = Object.values(scene?.shapes);
    const mouseX = e.clientX - boundingClientRect.left;
    const mouseY = e.clientY - boundingClientRect.top;

    const pointInShapes = shapes
      .filter((shape) =>
        isPointInsideRectangle(
          { x: mouseX, y: mouseY },
          getShapeRectangle(shape)
        )
      )
      .sort((a, b) => b.zIndex - a.zIndex);

    if (!pointInShapes.length) {
      setStartMousePosition({ x: e.clientX, y: e.clientY });
      setIsSelecting(true);
    }

    if (element.contains(e.target as Node)) {
      const maxZIndex = Math.max(...shapes.flatMap((shape) => shape.zIndex));
      const pointInShape = pointInShapes[0];

      updateShapes(
        scene.id,
        shapes.map((shape) => {
          const isGroupSelection = isCtrlOrCmdPressed || isShiftPressed;
          const isShapeInsideRectangle = isPointInsideRectangle(
            { x: mouseX, y: mouseY },
            getShapeRectangle(shape)
          );

          if (isShapeInsideRectangle) {
            pointInShapes.push(shape);
          }

          // Calculate z index
          let zIndex = pointInShape ? shape.zIndex - 1 : shape.zIndex;
          zIndex = pointInShape?.id === shape.id ? maxZIndex : zIndex;

          // Calculate is shape selected with case when shift ctr btn pressed
          const selected =
            isGroupSelection && shape.selected
              ? shape.selected
              : pointInShape?.id === shape.id;

          return {
            ...shape,
            zIndex,
            selected,
            hovered: false,
          };
        })
      );

      if (pointInShapes.length) {
        setTransformFrameNeedsUpdate(true);
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const scene = getSceneById(activeSceneId!);

    if (isEventsBlocking) return;

    const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;
    const isShiftPressed = e.shiftKey;

    if (isCtrlOrCmdPressed || isShiftPressed) {
      e.preventDefault();
      e.stopPropagation();
    }

    const element = document.querySelector(`#scene_${scene?.id}`);
    if (scene && element && element.contains(e.target as Node)) {
      const boundingClientRect = element && element.getBoundingClientRect();
      const shapes = Object.values(scene?.shapes);
      const mouseX = (e as MouseEvent).clientX - boundingClientRect.left;
      const mouseY = (e as MouseEvent).clientY - boundingClientRect.top;

      const pointInShapes = shapes
        .filter((shape) =>
          isPointInsideRectangle(
            { x: mouseX, y: mouseY },
            getShapeRectangle(shape)
          )
        )
        .sort((a, b) => b.zIndex - a.zIndex);

      const pointInShape = pointInShapes[0];

      updateShapes(
        scene.id,
        shapes.map((shape) => ({
          ...shape,
          hovered: pointInShape?.id === shape.id && !shape.selected,
        }))
      );
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    const scene = getSceneById(activeSceneId!);

    setIsSelecting(false);

    const element = document.querySelector(`#scene_${scene?.id}`);

    if (!scene || !startMousePosition || !element || !isSelecting) return;

    const shapes = Object.values(scene?.shapes);

    const boundingClientRect = element.getBoundingClientRect();

    const width = e.clientX - startMousePosition.x;
    const height = e.clientY - startMousePosition.y;
    const x =
      startMousePosition.x -
      (width < 0 ? Math.abs(width) : 0) +
      Math.abs(width) / 2 -
      boundingClientRect.left;
    const y =
      startMousePosition.y -
      (height < 0 ? Math.abs(height) : 0) +
      Math.abs(height) / 2 -
      boundingClientRect.top;

    const selectionRectangle = {
      position: {
        x,
        y,
      },
      width: Math.abs(width),
      height: Math.abs(height),
      scale: { x: 1, y: 1 },
      rotation: MathUtils.degToRad(0),
    };

    if (selectionRectangle.width <= 0 || selectionRectangle.height <= 0) return;

    updateShapes(
      scene?.id,
      shapes.map((shape) => ({
        ...shape,
        selected: isRectanglesIntersected(
          selectionRectangle,
          getShapeRectangle(shape)
        ),
      }))
    );
    setTransformFrameNeedsUpdate(true);
  };

  const handleMarkOnContextMenu = (e: MouseEvent) => {
    const scene = getSceneById(activeSceneId!);

    if (isEventsBlocking) return;

    const element = document.querySelector(`#scene_${scene?.id}`);

    if (scene && element && element.contains(e.target as Node)) {
      const boundingClientRect = element && element.getBoundingClientRect();
      const shapes = Object.values(scene?.shapes);
      const mouseX = (e as MouseEvent).clientX - boundingClientRect.left;
      const mouseY = (e as MouseEvent).clientY - boundingClientRect.top;

      const pointInShapes = shapes
        .filter((shape) =>
          isPointInsideRectangle(
            { x: mouseX, y: mouseY },
            getShapeRectangle(shape)
          )
        )
        .sort((a, b) => b.zIndex - a.zIndex);

      const pointInShape = pointInShapes[0];

      if (pointInShape) {
        e.preventDefault();
        e.stopPropagation();
        setContextMenuMeta({
          position: {
            x: e.clientX,
            y: e.clientY,
          },
          data: pointInShape,
        });
      }
    }
  };

  const handleShapeOnDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    shape: Shape
  ) => {
    const scene = getSceneById(activeSceneId!);

    if (!scene) return;

    e.stopPropagation();
    e.preventDefault();

    removeShape(scene?.id, shape.id);
    setContextMenuMeta(null);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown, false);
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('mouseup', handleMouseUp, false);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown, false);
      window.removeEventListener('mousemove', handleMouseMove, false);
      window.removeEventListener('mouseup', handleMouseUp, false);
    };
  }, [
    activeSceneId,
    startMousePosition?.x,
    startMousePosition?.y,
    isEventsBlocking,
    isSelecting,
  ]);

  useEffect(() => {
    window.addEventListener('contextmenu', handleMarkOnContextMenu, false);
    return () => {
      window.removeEventListener('contextmenu', handleMarkOnContextMenu, false);
    };
  }, [activeSceneId]);

  useEffect(() => {
    return () => {
      setIsSelecting(false);
    };
  }, []);

  if (contextMenuMeta) {
    return (
      <div
        style={{
          left: `${contextMenuMeta.position.x}px`,
          top: `${contextMenuMeta.position.y}px`,
        }}
        className={clsx('fixed z-dropdown context-menu')}
      >
        <div className="mt-1 w-48 cursor-pointer rounded-lg border border-gray-600 bg-gray-800 py-2 shadow-dropdown focus:outline-none">
          <button
            onClick={(e) => {
              handleShapeOnDelete(e, contextMenuMeta.data as Shape);
            }}
            className="flex w-full px-2 text-xs text-white"
          >
            <div className="flex w-full pl-2 relative px-1 rounded items-center h-6 hover:bg-gray-600">
              <div className="flex">{`Delete Shape`}</div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (!isSelecting || !startMousePosition || isEventsBlocking) return null;

  const width = mousePosition.x - startMousePosition.x;
  const height = mousePosition.y - startMousePosition.y;
  const top = startMousePosition.y;
  const left = startMousePosition.x;

  return (
    <div
      style={{
        top: `${top - (width < 0 ? Math.abs(height) : 0)}px`,
        left: `${left - (height < 0 ? Math.abs(width) : 0)}px`,
        width: `${Math.abs(width)}px`,
        height: `${Math.abs(height)}px`,
      }}
      className={
        'fixed pointer-events-none border bg-[#01b6fe20] border-[#01b6fe]'
      }
    />
  );
};
