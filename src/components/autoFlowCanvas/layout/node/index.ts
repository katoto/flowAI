import { removeEmpty } from "@/utils/tools";

import { Reactflow } from "../../data/types";
// import { D3DAGLayoutAlgorithms, kD3DAGAlgorithms } from "./algorithms/d3-dag";
import { layoutD3Hierarchy } from "./algorithms/d3-hierarchy";
// import { layoutDagreTree } from "./algorithms/dagre-tree";
import { ELKLayoutAlgorithms, kElkAlgorithms } from "./algorithms/elk";
import { layoutOrigin } from "./algorithms/origin";
import { values } from "@/views/canvas/ControlPanel";

export type LayoutDirection = "vertical" | "horizontal";
export type LayoutVisibility = "visible" | "hidden";
export interface LayoutSpacing {
  x: number;
  y: number;
}

export type ReactflowLayoutConfig = {
  algorithm: LayoutAlgorithms;
  direction: LayoutDirection;
  spacing: LayoutSpacing;
  /**
   * Whether to hide the layout
   *
   * We may need to hide layout if node sizes are not available during the first layout.
   */
  visibility: LayoutVisibility;
  /**
   * Whether to reverse the order of source handles.
   */
  reverseSourceHandles: boolean;
};

export type LayoutAlgorithmProps = Reactflow &
  Omit<ReactflowLayoutConfig, "algorithm">;

export type LayoutAlgorithm = (
  props: LayoutAlgorithmProps
) => Promise<Reactflow | undefined>;

export const kLayoutAlgorithms: Record<string, LayoutAlgorithm> = {
  origin: layoutOrigin,
  // "dagre-tree": layoutDagreTree,
  "d3-hierarchy": layoutD3Hierarchy,
  ...kElkAlgorithms
};

const direction = values['方向'].options[0] === '垂直' ? 'vertical' : 'horizontal';

const isHorizontal = direction === 'horizontal';

export const kDefaultLayoutConfig: ReactflowLayoutConfig = {
  algorithm: "d3-hierarchy",
  // 方向
  direction,
  visibility: "visible",
  spacing: { x: isHorizontal ? 200 : 60, y: isHorizontal ? 200 : 70 },
  reverseSourceHandles: false,
};

export type LayoutAlgorithms =
  | "origin"
  | "elk-mr-tree"
  | "d3-hierarchy"
  | ELKLayoutAlgorithms

export type ILayoutReactflow = Reactflow & Partial<ReactflowLayoutConfig>;

export const layoutReactflow = async (
  options: ILayoutReactflow
): Promise<Reactflow> => {
  const config = { ...kDefaultLayoutConfig, ...removeEmpty(options) };

  // TODO: 待处理
  const ddd = config.direction === 'horizontal'

  config.spacing =  { x: ddd ? 200 : 60, y: ddd ? 30 : 70 };

  const { nodes = [], edges = [] } = config;
  const layout = kLayoutAlgorithms[config.algorithm];

  console.log('config', config);

  let result = await layout({ ...config, nodes, edges });
  if (!result) {
    // If the layout fails, fallback to the origin layout
    result = await layoutReactflow({
      ...config,
      nodes,
      edges,
      algorithm: "origin",
    });
  }
  return result!;
};
