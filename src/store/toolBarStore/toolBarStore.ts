import { create } from 'zustand';
import { TOOLBAR_ITEMS_CFG } from '../../components/ToolBar/constants';
import { Tool, ToolsStore } from './types';
import { ToolType } from '../../components/ToolBar/types';
import { ViewPreferences } from '../../components/ToolBar/components/HamburgerMenu/constants';

export const useToolBarStore = create<ToolsStore>((set, get) => ({
  tools:
    TOOLBAR_ITEMS_CFG?.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: {
          id: item.id,
          isActivable: !!item.isActivable,
          isVisible: !!item.isVisible,
          label: item.label,
          cfg: item,
          ...(item.id === ToolType.HAMBURGER_MENU
            ? { selected: { [ViewPreferences.RULERS]: true } }
            : {}),
        },
      };
    }, {}) || {},
  activeToolId: null,
  addTool: (tool: Tool) =>
    set((state) => ({
      ...state,
      tools: {
        ...state.tools,
        [tool.id]: tool,
      },
    })),
  addTools: (tools: Tool[]) =>
    set((state) => {
      if (!tools.length) {
        return state;
      }
      const nextState = { ...state };
      tools.forEach((tool) => {
        nextState.tools = {
          ...nextState.tools,
          [tool.id]: tool,
        };
      });
      return nextState;
    }),
  removeTool: (id) =>
    set((state) => {
      delete state.tools?.[id];
      return { ...state };
    }),
  updateTool: (id, updatedTool) =>
    set((state) => {
      state.tools[id] = updatedTool;
      return { ...state };
    }),
  clearTools: () => set((state) => ({ ...state, tools: {} })),
  getToolById: (id) => {
    return get().tools[id];
  },
  setActiveToolId: (id: string) =>
    set((state) => ({ ...state, activeToolId: id })),
}));
