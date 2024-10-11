import { useEffect, useRef } from 'react';

export const useResizeObserver = (
  callback: (width: number, height: number) => void
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        callback(width, height);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  return ref;
};
