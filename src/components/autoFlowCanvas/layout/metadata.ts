import { MarkerType, Position } from "@xyflow/react";

import {
  Reactflow,
  ReactflowEdgeWithData,
  ReactflowNodeWithData,
} from "../data/types";
import { kReactflow } from "../states/reactflow";
import { LayoutDirection, LayoutVisibility } from "./node";

export const getRootNode = (nodes: Reactflow["nodes"]) => {
  return nodes.find((e) => e.type === "start") ?? nodes[0];
};

export const getNodeSize = (
  node: ReactflowNodeWithData,
  defaultSize = { width: 250, height: 180 }
) => {
  const internalNode = kReactflow.store
    ?.getState()
    ?.nodeLookup?.get(node.id);

  const nodeWith = internalNode?.measured.width;
  const nodeHeight = internalNode?.measured.height;

  // console.log('debug', nodeWith, nodeHeight, internalNode?.measured)

  const hasDimension = [nodeWith, nodeHeight].every((e) => e != null);

  return {
    hasDimension,
    width: nodeWith,
    height: nodeHeight,
    widthWithDefault: defaultSize.width,
    heightWithDefault: defaultSize.height,
    // widthWithDefault: nodeWith ?? defaultSize.width,
    // heightWithDefault: nodeHeight ?? defaultSize.height,
  };
};

export type IFixPosition = (pros: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  x: number;
  y: number;
};
export const getNodeLayouted = (props: {
  node: ReactflowNodeWithData;
  position: { x: number; y: number };
  direction: LayoutDirection;
  visibility: LayoutVisibility;
  fixPosition?: IFixPosition;
}) => {
  const {
    node,
    position,
    direction,
    visibility,
    fixPosition = (p) => ({ x: p.x, y: p.y }),
  } = props;

  const hidden = visibility !== "visible";
  const isHorizontal = direction === "horizontal";
  const { width, height, widthWithDefault, heightWithDefault } =
    getNodeSize(node);

  node.targetPosition = isHorizontal ? Position.Left : Position.Top;
  node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

  return {
    ...node,
    // type: "base",
    width,
    height,
    hidden,
    position: fixPosition({
      ...position,
      width: widthWithDefault,
      height: heightWithDefault,
    }),
    data: {
      ...node.data,
      label: node.label ? node.label : node.id,
    },
    style: {
      ...node.style,
      opacity: hidden ? 0 : 1,
    },
  };
};

export const getEdgeLayouted = (props: {
  edge: ReactflowEdgeWithData;
  visibility: LayoutVisibility;
}) => {
  const { edge, visibility } = props;
  edge.type = 'custom'
  edge.style = {
    // stroke: '#4d53e8',
    strokeWidth: 1
  }

  const hidden = visibility !== "visible";
  return {
    ...edge,
    hidden,
    markerEnd: {
      // type: MarkerType.Arrow,
    },
    style: {
      ...edge.style,
      opacity: hidden ? 0 : 1,
    },
  };
};
