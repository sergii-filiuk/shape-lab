import { RendererMenuItems } from '../types';
import { RendererType } from '../../../../../../../store/uiStore/types';

export const RENDERER_MENU_ITEMS: RendererMenuItems = [
  {
    id: RendererType.RASTERIZATION,
    icon: null,
    label: 'Rasterization',
    isSelectable: true,
  },
  {
    id: RendererType.INSTANCED_RASTERIZATION,
    icon: null,
    label: 'Instanced Rasterization',
    isSelectable: true,
  },
  {
    id: RendererType.RAY_TRACING,
    icon: null,
    label: 'Ray Tracing',
    isSelectable: true,
  },
];
