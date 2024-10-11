import { useState, useEffect, useCallback } from 'react';

interface DeltaPosition {
  deltaX: number;
  deltaY: number;
}

export const useMouseMoveDelta = () => {
  const [delta, setDelta] = useState<DeltaPosition>({ deltaX: 0, deltaY: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prevMousePosition) {
        const deltaX = e.clientX - prevMousePosition.x;
        const deltaY = e.clientY - prevMousePosition.y;

        setDelta({ deltaX, deltaY });
      }

      setPrevMousePosition({ x: e.clientX, y: e.clientY });
    },
    [prevMousePosition]
  );

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return delta;
};
