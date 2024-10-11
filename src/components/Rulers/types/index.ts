export type RulersProps = {
  className?: string;
};

export enum RulerType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export type Mark = {
  id: string;
  type: RulerType;
  position: {
    x: number;
    y: number;
  };
  selected?: boolean;
};
