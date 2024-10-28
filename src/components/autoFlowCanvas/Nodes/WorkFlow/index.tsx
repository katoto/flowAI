import React, { memo } from "react";
// import CodeIcon from "@mui/icons-material/Code";
import BaseNode from "../BaseNode";
import { FunctionOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { EditOutlined, BugOutlined, CopyOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

function WorkFlowNode(params) {
  const { data } = params;
  return (
    <BaseNode
      {...params}
      label={
        <div className="label">
          {/* <CodeIcon
            style={{ marginRight: 15, fontSize: 25, fill: "#43cac8" }}
          /> */}
          <FunctionOutlined
            style={{ marginRight: 15, fontSize: 25, color: "#43cac8" }}
          />
          <Tooltip title={data.label}>
            <span
              style={{
                maxWidth: "140px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textWrap: 'nowrap'
              }}
            >
              {data.label}
            </span>
          </Tooltip>
        </div>
      }
      menuItems={[
        {
          key: "detail",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "canvas_operate_workflow",
                  data: {
                    type: "build",
                    ...data.data,
                  },
                });
              }}
            >
              <EditOutlined style={{ marginRight: 5 }} />
              编辑
            </div>
          ),
        },
        {
          key: "debug",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "insight_flow",
                  data: {
                    type: "build",
                    ...data.data,
                  },
                });
              }}
            >
              <BugOutlined style={{ marginRight: 5 }} />
              调试
            </div>
          ),
        },
        {
          key: "addpreset",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "canvas_operate_preset",
                  data: {
                    type: "add",
                    ...data.data,
                  },
                });
              }}
            >
              <PlusSquareOutlined style={{ marginRight: 5 }} />
              预置问题
            </div>
          ),
        },
        // {
        //   key: "copy",
        //   label: (
        //     <div>
        //       <CopyOutlined style={{ marginRight: 5 }} />
        //       复制 subTask
        //     </div>
        //   ),
        // },
      ]}
    />
  );
}

export default memo(WorkFlowNode);
