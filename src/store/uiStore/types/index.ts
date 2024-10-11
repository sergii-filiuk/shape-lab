export enum RendererType {
  RASTERIZATION = 'rasterization',
  INSTANCED_RASTERIZATION = 'instanced_rasterization',
  RAY_TRACING = 'ray_tracing',
}

export interface UiStore {
  isEventsBlocking: boolean;
  rendererType: RendererType;
  transformFrameNeedsUpdate: boolean;
  setIsEventsBlocking: (isEventsBlocking: boolean) => void;
  setRendererType: (rendererTyp: RendererType) => void;
  setTransformFrameNeedsUpdate: (transformFrameNeedsUpdate: boolean) => void;
}
