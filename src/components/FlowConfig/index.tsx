/**
 * 工作流配置弹窗
 */
import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  getSubTaskTemplate,
  getSubTasksInfo,
  getWorkflowQues,
  workflowDetail,
  loadSubtaskTemplate,
  debugTaskChat,
  getDebugInitContextParams
} from "@/api/canvas";
import { ResizableBox } from "react-resizable";
import { useRequest } from "ahooks";
import FlowConfigLf from "./flowConfigLf";
import FlowConfigRf from "./flowConfigRf";
import "./index.scss";
import VscodeEditor from "../vscode-editor";

const { Paragraph } = Typography;

const FlowConfig = () => {
  const [form] = Form.useForm(); // modal form
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState<number>(350);
  const { runAsync: runAsyncTaskTemplate } = useRequest(getSubTaskTemplate, {
    retryCount: 2,
    manual: true,
  });
  const { data: quesData, run: runQues }: any = useRequest(getWorkflowQues, {
    retryCount: 1,
    manual: true,
  });

  const { runAsync: runAsyncTasksInfo } = useRequest(getSubTasksInfo, {
    retryCount: 2,
    manual: true,
  });
  const {
    data: flowDetail,
    run: runFlowDetail,
    loading: detailLoading,
    mutate,
  } = useRequest<any, any>(workflowDetail, {
    retryCount: 2,
    manual: true,
    onSuccess: (data) => {
      mutate((_) => {
        if (data && data.ret == 0) {
          return {
            ...data.data,
          };
        }
        return {};
      });
    },
  });

  console.log(">.>>flowDetail>>>", flowDetail);

  const getRandomColor = () => {
    const colorArr = [
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    return colorArr[Math.floor(Math.random() * colorArr.length)];
  };

  useEffect(() => {
    loadSubtaskTemplate({ mode: "function" }).then((res) => {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        // subTask_template: JSON.stringify(res.data, null, '\t'),
        subTask_template: res.data,
        debug_code: `{
          "biz": "sr",
          "biz_type": "JsHelper",
          "intention": "ReviewJs",
          "job": "dev",
          "topic_id": 119,
          "task_code": "GptRefactor",
        }`,
        input_prompt: `# Output
        The output should be a markdown code snippet formatted in the following schema, including the leading and trailing： "
        # Limit
        输出的数据不需要自我发挥

        # Goals
        1、请根据提问提取活动ID（actId/activityId）
        2、按照json输出，json格式：<code-block>{"actId":234}</code-block>`
      })
    });

    const handleMsg = (event) => {
      const { msgType, params, data } = event.data;
      if (msgType === "insight_flow") {
        // 获取flow 详情
        runFlowDetail({
          topicId: data.topic_id,
        });
        // 获取预设问题
        runQues({
          topic_id: data.topic_id,
        });
        setNoticeOpen(true);
        console.log("debug params", params);
      }
    };

    window.addEventListener("message", handleMsg);

    return () => {
      window.removeEventListener("message", handleMsg);
    };
  }, []);

  useEffect(() => {
    if (noticeOpen) {
      runAsyncTaskTemplate({ mode: "gpt" }).then((res) => {
        console.log("==runAsyncTaskTemplate==", res);
      });

      runAsyncTasksInfo({
        biz: localStorage.getItem("bizName") || "",
        name: ["SrReleaseSchemeCreate"],
      }).then((res) => {
        console.log("==SrReleaseSchemeCreate==", res);
      });
    }
  }, [noticeOpen]);

  console.log("flowDetail", flowDetail);

  return (
    <div style={{ width: "100vw" }}>
      <Drawer
        closable
        width={450}
        height={"100vh"}
        title="workFlow 调试"
        open={noticeOpen}
        loading={detailLoading}
        onClose={() => {
          setNoticeOpen(false);
        }}
        placement="top"
        rootStyle={{
          padding: 0,
        }}
        styles={{
          body: {
            padding: "0 12px",
          },
        }}
      >
        <Form form={form}>
          <div className="flow-config-wrapper">
            <header
              style={{
                marginBottom: 2,
              }}
            >
              <Typography>
                <Paragraph>
                  <pre>
                    {flowDetail && (
                      <Flex
                        align="center"
                        justify="space-between"
                        style={{ height: "50px", padding: "0 2px" }}
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <h5 className="flow-config-name">
                              {flowDetail.name}{" "}
                            </h5>
                            <h6 className="flow-config-sub-name">
                              {flowDetail.goal}
                            </h6>
                          </div>
                          {quesData &&
                            quesData?.data?.map((item) => {
                              return (
                                <Tooltip title={item.query}>
                                  <Tag
                                    color={getRandomColor()}
                                    style={{ margin: "auto 4px" }}
                                  >
                                    {item.name || "-"}
                                  </Tag>
                                </Tooltip>
                              );
                            })}
                        </div>
                        <Space size={"middle"}>
                          {flowDetail.status === 1 ? (
                            <Button type="primary">下线</Button>
                          ) : (
                            <Button type="primary">上线</Button>
                          )}
                          <Button onClick={async () => {
                            // const res = await getDebugInitContextParams()
                            const res = {
                              data: {
                                "biz": "sr",        // 必传，当前业务code
                                "biz_type": "JsHelper",        // 必传，业务分类
                                "intention": "ReviewJs",       // 必传，场景分类
                                "job": "dev",             // 必传，账户角色, 用于页面判定/权限管理
                                "topic_id": 119,                // 必传，当前衔接层id
                                "task_code": "GptRefactor",  // 必传，待调试的subtask name
                              }
                            }
                            debugTaskChat({
                              account: 'jiawen.peng',
                              request_id: 'debug',
                              role: {
                                // name: "v1_{workflow_id}_{task_name}", // 角色名
                                name: "v1_{141}_{GptRefactor}", // 角色名
                                prompt: "今天天气如何", // 用户开发的prompt内容
                              },
                              model: {
                                name: "is2", // 用户在页面选择的模型
                                temperature: "0.1", // 用户在页面选择的模型温度
                                json_mode: false, // 是否启用json模式输出，目前仅gpt系列模型支持设置为true
                              },
                              flow_id: 38, // 由于subtask调试通过后需要将配置保存到flow中，因此这里还需要额外传入flow_id
                              order: 1, // 当前节点在flow中的顺序，默认从1开始递增
                              question: "下雨了么", // gpt类subtask调试时需要用户手动写入一个提问词
                              ...res.data
                            })
                          }}>调试</Button>
                        </Space>
                      </Flex>
                    )}
                  </pre>
                </Paragraph>
              </Typography>
            </header>
            <div className="flow-config-content-lf">
              <div
                style={{
                  width: `${drawerWidth}px`
                }}
              >
                <ResizableBox
                  resizeHandles={["w"]}
                  onResize={(e) => {
                    if (e.x > 700) return;
                    setDrawerWidth(Math.max(340, e.x));
                  }}
                >
                  <FlowConfigLf flowDetail={flowDetail} />
                </ResizableBox>
              </div>
              <div style={{ width: `calc(100% - ${drawerWidth}px - 400px)` }}>
                <Form.Item
                  label=""
                  name="subTask_template"
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
                  <VscodeEditor defaultLanguage="python" readonly={false} editHeight={`calc(100vh - 240px)`} />
                </Form.Item>
              </div>

              <FlowConfigRf />
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default FlowConfig;
