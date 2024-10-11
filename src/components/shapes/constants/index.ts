import { ShapeType } from '../../../store/scenesStore/types';
import { Rectangle } from '../Rectangle';
import { Circle } from '../Circle';
import { Triangle } from '../Triangle';
import { Star } from '../Star';

export const SHAPES_TEMPLATES = {
  [ShapeType.RECTANGLE]: {
    component: Rectangle,
  },
  [ShapeType.CIRCLE]: {
    component: Circle,
  },
  [ShapeType.TRIANGLE]: {
    component: Triangle,
  },
  [ShapeType.STAR]: {
    component: Star,
  },
};

export const SCENE_BG_COLOR = '#FFFFFF';
export const SCENE_BG_ALPHA = 1;

export const RECTANGLE_DEFAULT_WIDTH = 100;
export const RECTANGLE_DEFAULT_HEIGHT = 100;

export const SHAPE_FRAGMENT_SHADER = `
    precision highp float;
    uniform vec3 color;
    out vec4 fragColor;
             
    void main() {
      fragColor = vec4(color, 1.0);
    }
`;
