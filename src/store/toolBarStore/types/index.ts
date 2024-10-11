import * as React from 'react';
import { ToolProps } from '../../../components/ToolBar/components/types';

export type ToolCfg = {
  id: string;
  label: string;
  component: React.FC<ToolProps>;
  isActivable?: boolean;
  isVisible?: boolean;
  disabled?: boolean;
};
export interface Tool {
  id: string;
  label: string;
  selected: Record<string, boolean>;
  isVisible: boolean;
  isActivable: boolean;
  cfg: ToolCfg;
}

export type Tools = Record<string, Tool>;

export interface ToolsStore {
  tools: Tools;
  activeToolId: string | null;
  addTool: (tool: Tool) => void;
  addTools: (tools: Tool[]) => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updatedTool: Tool) => void;
  clearTools: () => void;
  getToolById: (id: string) => Tool | undefined;
  setActiveToolId: (id: string) => void;
}
