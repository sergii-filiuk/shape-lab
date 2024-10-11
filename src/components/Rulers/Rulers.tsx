import ScenaRuler from '@scena/react-ruler';
import { FC, useEffect, useRef, useState } from 'react';
import { Mark, RulersProps, RulerType } from './types';
import { clsx } from 'clsx';
import { useScenesStore } from '../../store/scenesStore';
import styles from './Rulers.module.scss';
import { useUiStore } from '../../store/uiStore';
import { v4 as uuidv4 } from 'uuid';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useClickOutsideOrEsc } from '../../hooks/useClickOutsideOrEsc';
import { ContextMenuMeta } from '../types';

export const Rulers: FC<RulersProps> = ({ className }) => {
  const mousePosition = useMousePosition();
  const { activeSceneId } = useScenesStore();
  const { setIsEventsBlocking } = useUiStore();
  const [contextMenuMeta, setContextMenuMeta] =
    useState<ContextMenuMeta<Mark> | null>(null);
  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const horizontalRulerRef = useRef<ScenaRuler | null>(null);
  const verticalRulerRef = useRef<ScenaRuler | null>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [horizontalRulerRange, setHorizontalRulerRange] = useState<
    [number, number]
  >([0, Infinity]);
  const [verticalRulerRange, setVerticalRulerRange] = useState<
    [number, number]
  >([0, Infinity]);

  useClickOutsideOrEsc({
    onOutsideOrEsc: () => {
      setContextMenuMeta(null);
    },
    excludeElementsQueries: ['.context-menu'],
  });

  const handleRanges = () => {
    const sceneElement = document.querySelector(`#scene_${activeSceneId}`);
    if (
      !sceneElement ||
      !horizontalRulerRef.current ||
      !verticalRulerRef.current
    )
      return;

    const sceneElementBoundingClientRect = sceneElement.getClientRects();
    const horizontalRulerBoundingClientRect =
      horizontalRulerRef.current?.canvasElement?.getClientRects();
    const verticalRulerBoundingClientRect =
      verticalRulerRef.current?.canvasElement?.getClientRects();

    setHorizontalRulerRange([
      verticalRulerBoundingClientRect[0].x +
        horizontalRulerBoundingClientRect[0].height -
        sceneElementBoundingClientRect[0].x,
      Infinity,
    ]);

    setVerticalRulerRange([
      horizontalRulerBoundingClientRect[0].y +
        verticalRulerBoundingClientRect[0].width -
        sceneElementBoundingClientRect[0].y,
      Infinity,
    ]);
  };

  const handleOnResize = () => {
    horizontalRulerRef.current?.resize();
    verticalRulerRef.current?.resize();
    handleRanges();
  };

  const handleMarkOnMouseDown = (mark: Mark) => {
    setIsEventsBlocking(true);
    setMarks((marks) =>
      marks.map((item) => ({ ...item, selected: item.id === mark.id }))
    );
  };

  const handleOnMouseDown = (e: MouseEvent) => {
    if (!rulerContainerRef.current) return;

    const rulerContainerClientRect = rulerContainerRef.current.getClientRects();
    const rulers = [
      {
        ref: verticalRulerRef,
        type: RulerType.VERTICAL,
      },
      {
        ref: horizontalRulerRef,
        type: RulerType.HORIZONTAL,
      },
    ];
    rulers.forEach((ruler) => {
      if (ruler.ref.current) {
        if (e.target === ruler.ref.current.canvasElement) {
          setIsEventsBlocking(true);
          const mark = {
            id: uuidv4(),
            type: ruler.type,
            position: {
              x: 0,
              y: 0,
            },
            selected: true,
          };

          switch (ruler.type) {
            case RulerType.VERTICAL: {
              mark.position.x = e.clientX - rulerContainerClientRect[0].x;
              mark.position.y = 0;
              break;
            }
            case RulerType.HORIZONTAL: {
              mark.position.x = 0;
              mark.position.y = e.clientY - rulerContainerClientRect[0].y;
              break;
            }
          }
          setMarks((marks) => [...marks, mark]);
        }
      }
    });
  };

  const handleOnMouseMove = (e: MouseEvent) => {
    if (!rulerContainerRef.current) return;

    const rulerContainerClientRect = rulerContainerRef.current.getClientRects();
    setMarks((marks) => {
      let selectedMarks = marks.filter((mark) => mark.selected);
      const unSelectedMarks = marks.filter((mark) => !mark.selected);

      selectedMarks = selectedMarks.map((mark) => {
        const position = mark.position;
        switch (mark.type) {
          case RulerType.VERTICAL: {
            position.x = e.clientX - rulerContainerClientRect[0].x;
            break;
          }
          case RulerType.HORIZONTAL: {
            position.y = e.clientY - rulerContainerClientRect[0].y;
            break;
          }
        }
        return { ...mark, position };
      });

      return [...unSelectedMarks, ...selectedMarks];
    });
  };

  const handleOnMouseUp = () => {
    setIsEventsBlocking(false);
    setMarks((marks) => marks.map((mark) => ({ ...mark, selected: false })));
  };

  const handleOnDelete = (mark: Mark) => {
    setMarks((marks) => marks.filter(({ id }) => id !== mark.id));
    setContextMenuMeta(null);
  };

  const handleMarkOnContextMenu = (e: MouseEvent) => {
    const selectedMarks = marks.filter(({ selected }) => selected);

    if (selectedMarks.length) {
      const mark = selectedMarks[0];
      e.stopPropagation();
      e.preventDefault();

      if (!mark) return;

      setContextMenuMeta({
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        data: mark,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleOnResize, false);
    window.addEventListener('mousedown', handleOnMouseDown, false);
    window.addEventListener('mousemove', handleOnMouseMove, false);
    window.addEventListener('mouseup', handleOnMouseUp, false);

    handleRanges();
    return () => {
      window.removeEventListener('mouseup', handleOnMouseUp, false);
      window.removeEventListener('mousemove', handleOnMouseMove, false);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('contextmenu', handleMarkOnContextMenu, false);
    return () => {
      window.removeEventListener('contextmenu', handleMarkOnContextMenu, false);
    };
  }, [marks]);

  return (
    <div
      className={clsx(className, 'w-full h-full')}
      id={'rulers'}
      ref={rulerContainerRef}
    >
      <div
        className={
          'z-[10] w-6 h-6 absolute top-0 bg-[#182023] border border-[#333c45]'
        }
      />
      <div
        className={clsx(
          'absolute z-[10] left-0 top-6 w-6 h-full border-[#333c45] border-l',
          styles.horizontalRulerCursor
        )}
      >
        <ScenaRuler
          font={'10px Noto Sans,sans-serif'}
          width={24}
          unit={50}
          segment={5}
          textColor={'#a1acb7'}
          backgroundColor={'#182023'}
          mainLineSize={'35%'}
          longLineSize={5}
          shortLineSize={3.5}
          textAlign={'center'}
          textOffset={[7, 0]}
          lineColor={'#333c45'}
          range={verticalRulerRange}
          scrollPos={verticalRulerRange[0]}
          type={RulerType.VERTICAL}
          ref={verticalRulerRef}
        />
      </div>
      <div
        className={clsx(
          'absolute z-[10] left-6 top-0 w-full h-6 border-[#333c45] border-b',
          styles.verticalRulerCursor
        )}
      >
        <ScenaRuler
          font={'10px Noto Sans,sans-serif'}
          unit={50}
          segment={5}
          textColor={'#a1acb7'}
          backgroundColor={'#182023'}
          mainLineSize={'35%'}
          longLineSize={5}
          shortLineSize={3.5}
          range={horizontalRulerRange}
          textAlign={'center'}
          textOffset={[0, 7]}
          lineColor={'#333c45'}
          scrollPos={horizontalRulerRange[0]}
          height={24}
          type={RulerType.HORIZONTAL}
          ref={horizontalRulerRef}
        />
      </div>
      {marks.map((mark) => (
        <div
          onMouseDown={() => handleMarkOnMouseDown(mark)}
          key={mark.id}
          className={clsx(
            'absolute z-[10]',
            styles[`${mark.type}RulerMark`],
            styles.rulerMark
          )}
          style={{
            left: `${mark.position.x}px`,
            top: `${mark.position.y}px`,
          }}
        />
      ))}
      {/*// Mark Label*/}
      {marks
        .filter((mark) => mark.selected)
        .map((mark) => {
          const clientRect = (
            mark.type === RulerType.VERTICAL
              ? horizontalRulerRef
              : verticalRulerRef
          ).current?.canvasElement.getClientRects()[0]!;
          const rulerStartFromPixels =
            mark.type === RulerType.VERTICAL
              ? horizontalRulerRange[0] - clientRect.height
              : verticalRulerRange[0] - clientRect.width;
          const markPixels =
            mark.type === RulerType.VERTICAL
              ? mark.position.x
              : mark.position.y;
          return (
            <div
              key={`label_${mark.id}`}
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
              }}
              className={clsx(
                'fixed p-2 text-xs text-white rounded bg-[red] z-cursor pointer-events-none z-[200]',
                styles[`${mark.type}RulerCursorLabel`]
              )}
            >
              {Math.round(rulerStartFromPixels + markPixels)}
            </div>
          );
        })}

      {contextMenuMeta && (
        <div
          style={{
            left: `${contextMenuMeta.position.x}px`,
            top: `${contextMenuMeta.position.y}px`,
          }}
          className={clsx('fixed z-dropdown context-menu')}
        >
          <div className="mt-1 w-48 cursor-pointer rounded-lg border border-gray-600 bg-gray-800 py-2 shadow-dropdown focus:outline-none">
            <button
              onClick={() => {
                handleOnDelete(contextMenuMeta.data);
              }}
              className="flex w-full px-2 text-xs text-white"
            >
              <div className="flex w-full pl-2 relative px-1 rounded items-center h-6 hover:bg-gray-600">
                <div className="flex">{`Delete Mark`}</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
