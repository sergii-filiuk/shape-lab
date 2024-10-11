import { useEffect } from 'react';
import { UseClickOutsideOrEscProps } from './types';

export const useClickOutsideOrEsc = ({
  onOutsideOrEsc,
  excludeElementsQueries = [],
}: UseClickOutsideOrEscProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const excludeElements =
        excludeElementsQueries
          ?.map((query) => document.querySelector(query))
          .filter(Boolean) || [];
      const isExcluded = excludeElements?.some((element) =>
        element?.contains(event.target as Node)
      );

      if (isExcluded) {
        return;
      }
      onOutsideOrEsc(event);
    };

    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOutsideOrEsc(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [onOutsideOrEsc]);
};
