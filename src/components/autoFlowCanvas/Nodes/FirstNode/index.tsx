import React, { memo } from "react";
// import CodeIcon from "@mui/icons-material/Code";
import BaseNode from "../BaseNode";
import { FunctionOutlined } from "@ant-design/icons";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";

function FirstNode(params) {
  return (
    <BaseNode
      {...params}
      menuItems={[
        {
          key: "add",
          label: (
            <div
              onClick={() => {
                window.postMessage({ msgType: 'canvas_operate_intention', data: { type: 'add' } });
              }}
            >
              <PlusOutlined style={{ marginRight: 5 }} />
              增加意图
            </div>
          ),
        },
      ]}
    />
  );
}

export default memo(FirstNode);
