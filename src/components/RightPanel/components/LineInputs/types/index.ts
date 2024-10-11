export type LineInputValue = string | number;

export enum LineInputType {
  STRING = 'string',
  NUMBER = 'number',
  COLOR = 'color',
}

export type LineInput = {
  id: string;
  name: string;
  icon?: React.JSX.Element | string;
  value: LineInputValue;
  type?: LineInputType;
};
export type LineInputsProps = {
  inputs: LineInput[];
  inputsPerLine?: number;
  onChange?: (id: string, value: LineInputValue) => void;
};
