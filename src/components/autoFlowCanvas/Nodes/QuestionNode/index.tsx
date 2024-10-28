import React, { memo } from "react";
import BaseNode from "../BaseNode";
import { Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, QuestionOutlined } from "@ant-design/icons";

function QuestionNode(params) {
  const { data } = params;

  return (
    <BaseNode
      {...params}
      label={
        <Tooltip title={(data.data && data.data.query) ? data.data.query : data.label}>
          <div className="label">
            <QuestionOutlined
              style={{ marginRight: 15, fontSize: 25, color: "pink" }}
            />
            <span
              style={{
                maxWidth: "140px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textWrap: "nowrap",
              }}
            >
              {data.label}
            </span>
          </div>
        </Tooltip>
      }
      menuItems={[
        {
          key: "build",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "canvas_operate_preset",
                  data: {
                    type: "build",
                    ...data.data,
                  },
                });
              }}
            >
              <EditOutlined style={{ marginRight: 5 }} />
              编辑问题
            </div>
          ),
        },
        {
          key: "delete",
          label: (
            <div
              onClick={() => {
                window.postMessage({
                  msgType: "canvas_operate_preset",
                  data: {
                    type: "delete",
                    ...data.data,
                  },
                });
              }}
            >
              <DeleteOutlined style={{ marginRight: 5 }} />
              删除问题
            </div>
          ),
        },
      ]}
    />
  );
}

export default memo(QuestionNode);
