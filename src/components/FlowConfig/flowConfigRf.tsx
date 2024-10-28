import React from "react";
import { Button, Empty, Form } from "antd";
import { BugOutlined } from "@ant-design/icons";
import VscodeEditor from "../vscode-editor";
import './flowConfigRf.scss';

const FlowConfigRf = () => {
  return (
    <div className="flow-config-rf-wrapper">
      <div className="flow-config-rf-header">
        <strong>测试代码</strong>
      </div>
      <div className="flow-config-rf-content">
        <div
          style={{
            flex: 1,
            paddingBottom: '12px',
            borderBottom: "1px solid rgb(204 204 204 / 83%)",
          }}
        >
          <div
            style={{
              padding: "10px 12px 0 12px",
              fontWeight: "bold",
            }}
          >
            输入
          </div>
          <Form.Item
            label=""
            name="debug_code"
            rules={[
              {
                required: false,
                validator: (_, value: string) => {
                  if (!value || value.length <= 4000) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('最大字符数4000'))
                },
              },
            ]}
            style={{ marginBottom: '5px' }}
          >
            <VscodeEditor defaultLanguage="python" readonly={false} editHeight={`calc(20vh)`} />
          </Form.Item>

          <Button
            icon={<BugOutlined />}
            type="primary"
            style={{
              marginLeft: 12,
            }}
          >
            调试
          </Button>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              padding: "12px 12px",
              fontWeight: "bold",
            }}
          >
            输出
          </div>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      </div>
    </div>
  );
};

export default FlowConfigRf;
