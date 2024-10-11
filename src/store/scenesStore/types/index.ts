export enum ShapeType {
  'RECTANGLE' = 'rectangle',
  'TRIANGLE' = 'triangle',
  'CIRCLE' = 'circle',
  'STAR' = 'star',
}

export const ShapeTypeNum = {
  [ShapeType.RECTANGLE]: 0,
  [ShapeType.CIRCLE]: 1,
  [ShapeType.TRIANGLE]: 2,
  [ShapeType.STAR]: 3,
};

export type Shape = {
  id: string;
  zIndex: number;
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  type: ShapeType;
  color: string;
  visible?: boolean;
  selected?: boolean;
  hovered?: boolean;
};

export interface Scene {
  id: string;
  name: string;
  shapes: Record<string, Shape>;
  width: number;
  height: number;
  updatedAt: number;
}

export interface ScenesStore {
  scenes: Record<string, Scene>;
  activeSceneId: string | null;
  addScene: (shape: Scene) => void;
  addScenes: (scenes: Scene[]) => void;
  removeScene: (sceneId: string) => void;
  updateScene: (sceneId: string, updatedScene: Scene) => void;
  clearScenes: () => void;
  getSceneById: (id: string) => Scene | undefined;
  addShape: (sceneId: string, shape: Shape) => void;
  addShapes: (sceneId: string, shapes: Shape[]) => void;
  removeShape: (sceneId: string, shapeId: string) => void;
  updateShape: (sceneId: string, shapeId: string, updatedShape: Shape) => void;
  updateShapes: (sceneId: string, updatedShapes: Shape[]) => void;
  clearShapes: (sceneId: string) => void;
  getShapeById: (id: string) => Shape | undefined;
  setActiveSceneId: (sceneId: string) => void;
}
