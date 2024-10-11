import { create } from 'zustand';
import { RendererType, UiStore } from './types';

export const useUiStore = create<UiStore>((set) => ({
  isEventsBlocking: false,
  rendererType: RendererType.INSTANCED_RASTERIZATION,
  transformFrameNeedsUpdate: false,
  setIsEventsBlocking: (isEventsBlocking: boolean) =>
    set((state) => ({ ...state, isEventsBlocking })),
  setRendererType: (rendererType: RendererType) =>
    set((state) => ({ ...state, rendererType })),
  setTransformFrameNeedsUpdate: (transformFrameNeedsUpdate: boolean) =>
    set((state) => ({ ...state, transformFrameNeedsUpdate })),
}));
