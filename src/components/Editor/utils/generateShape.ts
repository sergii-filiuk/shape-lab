import { v4 as uuidv4 } from 'uuid';
import { ShapeType } from '../../../store/scenesStore/types';
import { generateRandomHEXColor } from '../../../utils/generateRandomHEXColor';
export const generateShape = (
  type: string,
  position: { x: number; y: number },
  zIndex: number
) => {
  const id = uuidv4();
  const rotation = 0;
  const scale = { x: 100, y: 100 };
  const color = generateRandomHEXColor();
  const visible = true;
  const selected = false;
  let shapeType = ShapeType.RECTANGLE;
  switch (type) {
    case 'rectangle': {
      shapeType = ShapeType.RECTANGLE;
      break;
    }
    case 'circle': {
      shapeType = ShapeType.CIRCLE;
      break;
    }
    case 'triangle': {
      shapeType = ShapeType.TRIANGLE;
      break;
    }
    case 'star': {
      shapeType = ShapeType.STAR;
      break;
    }
  }
  return {
    id,
    rotation,
    scale,
    position,
    zIndex,
    type: shapeType,
    color,
    visible,
    selected,
  };
};
