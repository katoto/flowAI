import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import "../styles.css";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { kReactflowLayoutConfig } from "../../../../views/canvas/ControlPanel";
import { Button, Dropdown } from "antd";
import { MoreOutlined, MergeOutlined } from "@ant-design/icons";
import { Tooltip } from "@mui/material";

function BaseNode(params) {
  const { data } = params || {};

  const direction =
    (kReactflowLayoutConfig.state as any)?.方向 === "水平"
      ? "horizontal"
      : "vertical";

  const isHorizontal = direction === "horizontal";

  return (
    <div
      className="react-flow-base-node"
      onClick={(event) => {
        console.log("Custom node clicked", event.target);
        if (
          !(
            (event.target as HTMLElement).nodeName === "DIV" &&
            (event.target as HTMLElement).className === "base-node-footer-add"
          )
        ) {
          event.stopPropagation(); // 阻止事件冒泡
        }
      }}
    >
      <div
        className={`handles handles-${direction} targets`}
        style={{
          flexDirection: isHorizontal ? "column" : "row",
        }}
      >
        {data.targetHandles.map((id) => (
          <Handle
            key={id}
            id={id}
            type="target"
            position={isHorizontal ? Position.Left : Position.Top}
          />
        ))}
      </div>
      {params.label ?? (
        <div className="label">
          {/* <AccountTreeOutlinedIcon
            style={{ marginRight: 15, fontSize: 25, fill: "#4d53e8" }}
          /> */}
          <MergeOutlined
            style={{ marginRight: 15, fontSize: 25, color: "#4d53e8" }}
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
      )}
      {params.menuItems && (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: params.menuItems,
          }}
        >
          <div className="affix">
            <MoreOutlined />
          </div>
        </Dropdown>
      )}
      <div
        className={`handles handles-${direction} sources`}
        style={{
          flexDirection: "row",
        }}
      >
        {data.sourceHandles.map((id: string) => (
          <Handle
            // hidden
            key={id}
            id={id}
            type="source"
            position={isHorizontal ? Position.Right : Position.Bottom}
            className="base-node-footer"
          >
            <div className="base-node-footer-add" style={{ color: "#fff" }}>
              +
            </div>
          </Handle>
        ))}
      </div>
    </div>
  );
}

export default memo(BaseNode);
