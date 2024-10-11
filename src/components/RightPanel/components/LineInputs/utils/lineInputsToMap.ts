import { LineInput } from '../types';

export const lineInputsToMap = (inputs: LineInput[]) =>
  inputs.reduce((acc, item) => ({ ...acc, [item.id]: item.value }), {});
