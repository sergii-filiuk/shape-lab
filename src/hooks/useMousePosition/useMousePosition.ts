import { useEffect, useState } from 'react';
import { MousePosition } from './types';

export const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const handleOnMouseMove = (event: MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleOnMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleOnMouseMove);
    };
  }, []);

  return position;
};
