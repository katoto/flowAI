import type { useStoreApi } from "@xyflow/react";
import { ReactFlowInstance } from "@xyflow/react";

import { ReactflowEdgeWithData, ReactflowNodeWithData } from "../data/types";

export const kReactflow: {
  instance?: ReactFlowInstance;
  store?: ReturnType<typeof useStoreApi>;
} = {};

export const getReactflowData = () => {
  const nodes: ReactflowNodeWithData[] = kReactflow.instance?.getNodes() ?? [];
  const edges: ReactflowEdgeWithData[] = kReactflow.instance?.getEdges() ?? [];
  return {
    nodes,
    edges,
    nodesMap: nodes.reduce((pre, v) => {
      pre[v.id] = v;
      return pre;
    }, {} as Record<string, ReactflowNodeWithData>),
    edgesMap: edges.reduce((pre, v) => {
      pre[v.id] = v;
      return pre;
    }, {} as Record<string, ReactflowEdgeWithData>),
  };
};
