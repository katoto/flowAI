import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  // getBezierPath,
  getStraightPath,
  Position,
  useReactFlow,
} from "@xyflow/react";

import "./buttonedge.css";
import { kReactflow } from "../../states/reactflow";
import { kDefaultLayoutConfig } from "../../layout/node";

export default function CustomEdge(params: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    target,
    style = {},
    markerEnd,
    targetPosition,
    sourcePosition,
    pathOptions,
  } = params;

  const { setEdges } = useReactFlow();

  const isHorizontal =
    targetPosition === Position.Left || sourcePosition === Position.Right;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: pathOptions?.borderRadius,
    offset: pathOptions?.offset,
  });

  const targetType = kReactflow.instance?.getNode(target);

  // console.log("targetType", params);

  // 父节点对应的子节点名字
  const targetStr =
    { workFlow: "workFlow", intention: "意图", question: "预置问题" }[
      targetType.type
    ] || "未知";

  const targetColor =
    { workFlow: "#43cac8", intention: "orange", question: "pink" }[
      targetType.type
    ] || "orange";

  // const onEdgeClick = () => {
  //   setEdges((edges) => edges.filter((edge) => edge.id !== id));
  // };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        labelX={labelX}
        labelY={labelY}
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${
              isHorizontal ? targetX - 60 : targetX
            }px,${isHorizontal ? targetY : labelY}px)`,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
            background: targetColor,
            color: "#fff",
            padding: "3px 8px",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "4px",
          }}
          className="nodrag nopan"
        >
          {/* <button className="edgebutton" onClick={onEdgeClick}>
            ×
          </button> */}
          {targetStr}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
