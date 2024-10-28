import React, { useRef } from "react";
import { useEffect, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
} from "@xyflow/react";
import CanvasHeader from "./CanvasHeader.tsx";
import { useParams } from "react-router-dom";
import { kReactflow } from "@/components/autoFlowCanvas/states/reactflow";
import "@xyflow/react/dist/style.css";
import "./index.css";

// material-ui
import { Toolbar, Box, AppBar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// API
import { useAutoLayout } from "@/components/autoFlowCanvas/layout/useAutoLayout";
import { kDefaultLayoutConfig } from "@/components/autoFlowCanvas/layout/node";
import { workflow2reactflow } from "@/components/autoFlowCanvas/data/convert";
import { ReactflowInstance } from "@/components/autoFlowCanvas/ReactflowInstance";
import { kNodeTypes, kEdgeTypes } from "@/components/autoFlowCanvas/Nodes";
import FlowConfig from "../../components/FlowConfig/index";
import AddSubTaskModal from "./AddSubTaskModal";
import { useRequest } from "ahooks";
import { getBizTypeAll } from "@/api/canvas";
import { useSelector } from "react-redux";
import OperateIntention from "./OperateIntention.tsx";
import OperateWorkflow from "./OperateWorkflow.tsx";
import ConfirmDialog from "@/ui-component/dialog/ConfirmDialog";
import ControlPanel from "./ControlPanel.tsx";
import { getTypeId } from "@/utils/tools.ts";
import OperatePreset from "./OperatePreset.tsx";

const Canvas = () => {
  const theme = useTheme();
  const { type } = useParams();
  const intentionRef = useRef<any>();
  const workflowRef = useRef<any>();
  const presetRef = useRef<any>();
  const customization = useSelector((state: any) => state.customization);

  const { data: bizTypeInfo, refresh: refreshTypeInfo } = useRequest(
    () =>
      type &&
      getBizTypeAll({
        page_no: 1,
        page_size: 99,
        biz: customization.bizName,
        job: customization.jobName,
        id: getTypeId(),
        type,
      })
  );

  useEffect(() => {
    console.log('bizTypeInfo', bizTypeInfo);
    if (bizTypeInfo) {
      const { nodes, edges } = workflow2reactflow(
        adapt2WorkFlowData(bizTypeInfo)
      );
      layout({ nodes, edges, ...kDefaultLayoutConfig });
    } else {
      // doInitCanvas();
    }
  }, [bizTypeInfo]);

  const doInitCanvas = () => {
    const nType = type ? type : "Untitled Type";
    const initNodes: any = [
      {
        id: nType,
        label: `${nType}`,
        draggable: false,
        type: "first",
        data: {
          id: nType,
          label: `${nType}`,
          draggable: false,
          type: "first",
          sourceHandles: [`${nType}#source#0`],
          targetHandles: [],
        },
        position: {
          x: 0,
          y: 0,
        },
        targetPosition: "top",
        sourcePosition: "bottom",
      },
    ];
    layout({ nodes: initNodes, edges: [], ...kDefaultLayoutConfig });
  };

  const adapt2WorkFlowData = (data) => {
    if (data && data.ret === 0) {
      let nodes: {
        id: string;
        label: string;
        draggable: boolean;
        data: any;
        type: string;
        preset?: any[];
      }[] = [
        {
          id: type,
          label: `${type}`,
          draggable: false,
          type: "first",
          data: "",
        },
      ];
      const edges = [];

      if (data.data.intentions && data.data.intentions.length > 0) {
        data.data.intentions.forEach((intentionItem, index) => {
          nodes.push({
            data: intentionItem,
            id: `${intentionItem.name}_${index}`,
            label: intentionItem.name,
            draggable: false,
            type: "intention",
          });
          edges.push({
            id: `${type}#${intentionItem.name}_${index}#0`,
            draggable: false,
            source: type,
            target: `${intentionItem.name}_${index}`,
            sourceHandle: `${type}#source#0`,
            targetHandle: `${intentionItem.name}_${index}#target#0`,
          });

          if (intentionItem.flows && intentionItem.flows.length > 0) {
            intentionItem.flows.forEach((flow, subIndex) => {
              nodes.push({
                data: Object.assign(flow, {
                  intentionName: intentionItem.name || "",
                }),
                id: `${flow.name}_${index}_${subIndex}`,
                label: flow.name,
                draggable: false,
                type: "workFlow",
              });

              edges.push({
                id: `${intentionItem.name}_${index}#${flow.name}_${index}_${subIndex}#0`,
                draggable: false,
                source: `${intentionItem.name}_${index}`,
                target: `${flow.name}_${index}_${subIndex}`,
                sourceHandle: `${intentionItem.name}_${index}#source#0`,
                targetHandle: `${flow.name}_${index}_${subIndex}#target#0`,
              });

              flow.preset?.forEach((preset, idx) => {
                const id = `${flow.name}_${index}_${subIndex}_${idx}`;
                nodes.push({
                  data: preset,
                  id,
                  label: preset.name,
                  draggable: false,
                  type: "question",
                });

                edges.push({
                  id: `${intentionItem.name}_${index}#${flow.name}_${id}#0`,
                  draggable: false,
                  source: `${flow.name}_${index}_${subIndex}`,
                  target: `${id}`,
                  sourceHandle: `${intentionItem.name}_${index}#source#1`,
                  targetHandle: `${flow.name}_${index}_${subIndex}#target#1`,
                });
              });
            });
          }
        });


        return {
          nodes: nodes,
          edges: edges,
        };
      } else {
        // 无数据 设置空
        doInitCanvas();
      }
    }
    return {
      nodes: [],
      edges: [],
    };
  };

  // ==============================|| message evt 分发 ||========================= //

  useEffect(() => {
    const handleMsg = (event) => {
      const { msgType, data } = event.data;
      console.log("msgType", msgType, data);
      switch (msgType) {
        case "canvas_operate_intention":
          {
            if (intentionRef.current) {
              intentionRef.current.doMsgEvt(data);
            }
          }
          break;
        case "canvas_operate_workflow":
          if (workflowRef.current) {
            workflowRef.current.doMsgEvt(data);
          }
          break;
        case "canvas_operate_preset":
          if (presetRef.current) {
            presetRef.current.doMsgEvt(data);
          }
          break;
      }
    };
    window.addEventListener("message", handleMsg);
    return () => {
      window.removeEventListener("message", handleMsg);
    };
  }, []);

  // ==============================|| ReactFlow ||============================== //

  const [nodes, _setNodes, onNodesChange] = useNodesState([]);
  const [edges, _setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (connection) =>
      _setEdges((eds) => {
        console.log("eds", eds);
        return addEdge(connection, eds);
      }),
    [_setEdges]
  );

  const { layout } = useAutoLayout();

  const layoutFn = (params: any) => {
    const edges = kReactflow.instance?.getEdges();
    const nodes = kReactflow.instance?.getNodes();
    // debugger;

    layout({
      nodes: [...nodes],
      edges: [
        ...edges.map((edge) => ({
          ...edge,
        })),
      ],
      ...kDefaultLayoutConfig,
      ...params,
    });
  };

  // 递归收集所有子节点的ID
  const collectChildNodeIds = (nodeId, nodes, edges) => {
    const childNodeIds = [];
    edges.forEach((edge) => {
      if (edge.source === nodeId) {
        const childNode = nodes.find((node) => node.id === edge.target);
        if (childNode) {
          childNodeIds.push(edge.target);
          const grandChildIds = collectChildNodeIds(edge.target, nodes, edges);
          childNodeIds.push(...grandChildIds);
        }
      }
    });
    return childNodeIds;
  };

  return (
    <Box>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        style={{
          zIndex: 9,
        }}
        sx={{
          bgcolor: theme.palette.background.default,
        }}
      >
        <Toolbar>
          <CanvasHeader
            chatflow={{
              id: getTypeId(),
              name: type || "Untitled Type",
            }}
            handleSaveFlow={() => {}}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: "70px", height: "100vh", width: "100%" }}>
        <div className="reactflow-parent-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={kNodeTypes}
            edgeTypes={kEdgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls
              style={{
                display: "flex",
                flexDirection: "row",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <Background color="#f2f3f5" gap={0} />
            <ReactflowInstance />
            <MiniMap pannable zoomable />
            {/* 控制面板 */}
            <ControlPanel layoutFn={layoutFn} nodes={nodes} edges={edges} />
          </ReactFlow>
        </div>
      </Box>

      <FlowConfig />

      {/*  intention 意图 */}
      <OperateIntention
        params={{
          type: type,
          biz: customization.bizName,
          job: customization.jobName,
        }}
        onCancel={() => {}}
        onConfirm={() => {
          refreshTypeInfo();
        }}
        cRef={intentionRef}
      />

      <OperateWorkflow
        params={{
          type: type,
          biz: customization.bizName,
          job: customization.jobName,
        }}
        onCancel={() => {}}
        onConfirm={() => {
          console.log("add workflow");
          refreshTypeInfo();
        }}
        cRef={workflowRef}
      />

      {/*  新增预制问题 */}
      <OperatePreset
        onCancel={() => {}}
        onConfirm={() => {
          refreshTypeInfo();
        }}
        cRef={presetRef}
      />

      {/* add subTask */}
      <AddSubTaskModal
        onCancel={() => {}}
        onConfirm={() => {}}
      ></AddSubTaskModal>

      {/* 删除type\intention弹窗 */}
      <ConfirmDialog />
    </Box>
  );
};

export default Canvas;
