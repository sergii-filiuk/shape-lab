import { create } from 'zustand';
import { Scene, ScenesStore, Shape } from './types';
import { generateScene } from './utils/generateScene.tsx';

const DEFAULT_SCENE = generateScene('Main Scene');
export const useScenesStore = create<ScenesStore>((set, get) => ({
  scenes: {
    [DEFAULT_SCENE.id]: DEFAULT_SCENE,
  },
  activeSceneId: DEFAULT_SCENE.id,
  addScene: (scene: Scene) =>
    set((state) => ({
      ...state,
      scenes: {
        ...state.scenes,
        [scene.id]: scene,
      },
    })),
  addScenes: (scenes: Scene[]) =>
    set((state) => {
      if (!scenes.length) {
        return state;
      }
      scenes.forEach((scene) => {
        state.scenes[scene.id] = {
          ...scene,
          updatedAt: new Date().valueOf(),
        };
      });
      return {
        ...state,
      };
    }),
  removeScene: (id) =>
    set((state) => {
      delete state.scenes?.[id];
      return { ...state };
    }),
  updateScene: (id, updatedScene) =>
    set((state) => {
      state.scenes[id] = {
        ...updatedScene,
        updatedAt: new Date().valueOf(),
      };
      return { ...state };
    }),
  clearScenes: () => set((state) => ({ ...state, scenes: {} })),
  getSceneById: (id) => {
    return get().scenes[id];
  },
  addShape: (sceneId: string, shape: Shape) =>
    set((state) => {
      const scene = state.scenes[sceneId];
      scene.shapes[shape.id] = shape;
      scene.updatedAt = new Date().valueOf();
      return {
        ...state,
      };
    }),
  addShapes: (sceneId, shapes: Shape[]) =>
    set((state) => {
      if (!shapes.length) {
        return state;
      }
      const scene = state.scenes[sceneId];
      shapes.forEach((shape) => {
        scene.shapes[shape.id] = shape;
      });
      scene.updatedAt = new Date().valueOf();
      return {
        ...state,
      };
    }),
  removeShape: (sceneId, shapeId) =>
    set((state) => {
      const scene = state.scenes[sceneId];
      delete scene.shapes[shapeId];
      scene.updatedAt = new Date().valueOf();
      return {
        ...state,
      };
    }),
  updateShape: (sceneId, shapeId, updatedShape) =>
    set((state) => {
      const scene = state.scenes[sceneId];
      scene.shapes[shapeId] = updatedShape;
      scene.updatedAt = new Date().valueOf();
      return {
        ...state,
      };
    }),
  updateShapes: (sceneId, updatedShapes) =>
    set((state) => {
      if (!updatedShapes.length) {
        return state;
      }
      const scene = state.scenes[sceneId];
      updatedShapes.forEach((updatedShape) => {
        scene.shapes[updatedShape.id] = updatedShape;
      });
      scene.updatedAt = new Date().valueOf();
      return {
        ...state,
      };
    }),
  clearShapes: (sceneId) =>
    set((state) => {
      const scene = state.scenes[sceneId];
      scene.updatedAt = new Date().valueOf();
      scene.shapes = {};
      return {
        ...state,
      };
    }),
  getShapeById: (id) => {
    const state = get();
    const scenes = Object.values(state.scenes);
    const scene = scenes.find((scene) => !!scene.shapes[id]);
    return scene?.shapes?.[id];
  },
  setActiveSceneId: (id: string) =>
    set((state) => ({ ...state, activeSceneId: id })),
}));
