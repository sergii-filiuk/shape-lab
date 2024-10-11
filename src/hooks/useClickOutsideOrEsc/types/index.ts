export type UseClickOutsideOrEscProps = {
  onOutsideOrEsc: (event: MouseEvent | KeyboardEvent) => void;
  excludeElementsQueries?: string[];
};
