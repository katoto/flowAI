import React, { memo } from "react";
import BaseNode from "../BaseNode";
import { AimOutlined } from "@ant-design/icons";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

function InterntionNode(params) {
  const { data } = params;
  return (
    <BaseNode
      {...params}
      label={
        <div className="label">
          {/* <PsychologyIcon
            style={{ marginRight: 15, fontSize: 25, fill: "orange" }}
          /> */}
          <AimOutlined
            style={{ marginRight: 15, fontSize: 25, color: "orange" }}
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
          key: "add",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "canvas_operate_workflow",
                  data: { type: "add", intentionName: data.data.name },
                });
              }}
            >
              <PlusOutlined style={{ marginRight: 5 }} />
              增加 workFlow
            </div>
          ),
        },
        {
          key: "detail",
          label: (
            <div
              onClick={() => {
                // window.postMessage({ msgType: 'canvas_operate_intention', data: { type: 'build', data: data } });
                console.log("data", {
                  type: "build",
                  data: {
                    id: data.data.id,
                    intentionName: data.data.name,
                    order: data.data.order,
                  },
                });
                window.postMessage({
                  msgType: "canvas_operate_intention",
                  data: {
                    type: "build",
                    id: data.data.id,
                    intentionName: data.data.name,
                    order: data.data.order,
                  },
                });
              }}
            >
              <EditOutlined style={{ marginRight: 5 }} />
              查看编辑
            </div>
          ),
        },
        {
          key: "delete",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "canvas_operate_intention",
                  data: {
                    type: "del",
                    id: data.data.id,
                    intentionName: data.data.name,
                    order: data.data.order,
                  },
                });
              }}
            >
              <DeleteOutlined style={{ marginRight: 5 }} />
              删除意图
            </div>
          ),
        },
        // {
        //   key: "copy",
        //   label: (
        //     <div>
        //       <CopyOutlined style={{ marginRight: 5 }} />
        //       复制意图
        //     </div>
        //   ),
        // },
      ]}
    />
  );
}

export default memo(InterntionNode);
