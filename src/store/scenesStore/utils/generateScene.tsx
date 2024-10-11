import { v4 as uuidv4 } from 'uuid';
import { Scene } from '../types';
export const generateScene = (name: string): Scene => {
  return {
    id: uuidv4(),
    name,
    shapes: {},
    width: 500,
    height: 500,
    updatedAt: new Date().valueOf(),
  };
};
