import client from "./client";

interface ResponseData {
  data: any;
  ret: number;
}

/**
 * 2.8【已修复联动bug】intention 场景新增修改接口
 */
export const intentionOperate = (data: {
  id?: number;
  biz: string;
  job: string;
  type: string;
  intention: string;
  order?: number;
}): any => client.post(`/third_api/v1/biz/intention/update`, data);

/**
 * 2.9 intention 场景删除接口
 */
export const delIntention = (data: { id: number }): any =>
  client.post(`/third_api/v1/biz/intention/del`, data);

// ==============================|| workflow 相关 ||============================== //
/**
 * 3.4 新增workflow
 */
interface WorkFlowProps {
  biz: string;
  type: string;
  job: string;
  intention: string;
  name: string;
  goal?: string;
  is_intention_recognition?: number;
  order?: number;
}
export const addWorkflow = (data: WorkFlowProps): any =>
  client.post(`/third_api/v1/workflow/add`, data);

/**
 * 3.6 更新workflow
 */
export const updateWorkflow = (data: WorkFlowProps): any =>
  client.post(`/third_api/v1/workflow/update`, data);

export const copyWorkflow = (data: WorkFlowProps): any =>
  client.post(`/third_api/v1/workflow/copy`, data);

/**
 * 3.8 新增预置问题
 */
interface PresetProps {
  name: string;
  query: string;
  order: number;
  id?: number;
  topic_id?: number;
}
export const addPreset = (data: PresetProps): any =>
  client.post(`/third_api/v1/preset_query/add`, data);

/**
 * 3.9 更新预置问题
 */
export const updatePreset = (data: PresetProps): any =>
  client.post(`/third_api/v1/preset_query/update`, data);

/**
 * 3.9 删除问题
 */
export const delPreset = (data: { id: number }): any =>
  client.post(`/third_api/v1/preset_query/del`, data);

/**
 * 3.11 查询主题对应的预置问题
 */
export const getWorkflowQues = (data: { topic_id: number }): any =>
  client.post(`/third_api/v1/preset_query/list`, data);

/**
 * 查询workflow详情
 */
export const workflowDetail = (data: {
  topicId?: number;
  flowId?: number;
}): any => client.post(`/third_api/v1/workflow/get`, data);

/**
 * 4.2 加载subtask代码模板
 */
export const loadSubtaskTemplate = (data: { mode: "gpt" | "function" }): any => {
  // client.post(`/third_api/v1/load_subtask_template`, data);
  return new Promise(() => {
    setTimeout(() => {
      return {
        "data": "class ${name}(BaseSubTask):\n\n    def load_data(self, **kwargs):\n        # 具体的业务代码实现，用于获取必要的业务数据\n        return {\n            'weather': 'Sunny',\n            'date': time_util.get_now(),\n            'location': 'Shanghai'\n        }\n\n    def description(self, **kwargs) -> str:\n        # subtask作用描述，不用调整\n        return '${description}'\n\n# 将class作为执行结果放到output_context中用于引擎调度\noutput_context.update({'${name}': ${name}})",
        "msg": "Success",
        "request_id": "",
        "ret": 0
      };
    }, 500);
  })
}

// ==============================|| subtask 相关 ||============================== //
/**
 * 4.1 加载subtask代码模板
 */
export const getSubTaskTemplate = (data: { mode: "gpt" | "function" }): any =>
  client.post(`/third_api/v1/load_subtask_template`, data);

/**
 * 4.2 创建subtask
 */
interface TaskConfigProps {
  biz: string;
  name: string;
  description?: string;
  content?: string;
  external_name?: string;
  mode: "gpt" | "function";
}

/**
 * 查询当前分类详细数据
 */

const initIntention = [
  {
      "flows": [
          {
              "desc": "test2",
              "flow_id": 227,
              "is_default_workflow": 0,
              "is_intention_recognition": true,
              "name": "test3",
              "order": 1,
              "preset": [],
              "status": 0,
              "topic_id": 205
          }
      ],
      "id": null,
      "name": "test",
      "order": 1
  },
  {
      "flows": [
          {
              "desc": "test2",
              "flow_id": 120,
              "is_default_workflow": 0,
              "is_intention_recognition": true,
              "name": "test3",
              "order": 1,
              "preset": [],
              "status": 1,
              "topic_id": 97
          }
      ],
      "id": 7,
      "name": "test改名",
      "order": 2
  }
]

export const getBizTypeAll = (data): any => {
  // client.post(`/third_api/v1/biz/type/all`, data);
  return new Promise((resolve) => {

    if(!localStorage.getItem('canvasList')) {
      localStorage.setItem('canvasList', JSON.stringify(initIntention))
    }
    const currIntentions = JSON.parse(localStorage.getItem('canvasList')) || []

    setTimeout(() => {
      resolve({
        ret: 0,
        data: {
          "intentions": currIntentions,
          "name": "dev"
        }
      })
    })
  })
}

export const mockCanvasAddIntention = (obj) => {
  const currIntentionList = JSON.parse(localStorage.getItem('canvasList')) || []
  currIntentionList.push(
    {
      "flows": [],
      "id": 7,
      "name": obj.intention,
      "order": 2,
      ...obj
  })
  localStorage.setItem('canvasList', JSON.stringify(currIntentionList))

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 300)
  })
}

export const mockCanvasAddflows = (obj) => {
  const currIntentionList = JSON.parse(localStorage.getItem('canvasList')) || []

  console.log('----??obj??----', obj)

  const findFlows = currIntentionList.find((item) => {
    return item.name === obj.intention
  })

  if(findFlows) {
    findFlows.flows.push(
      {
        "desc": "test2",
        "flow_id": 120,
        "is_default_workflow": 0,
        "is_intention_recognition": true,
        "name": "test3",
        "order": 1,
        "preset": [],
        "status": 1,
        "topic_id": 97,
        ...obj
    })
  }

  localStorage.setItem('canvasList', JSON.stringify(currIntentionList))

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 300)
  })
}




/**
 * type 业务分类新增/更新接口
 */
export const getBizTypeUpdate = (data): any =>
  client.post(`/third_api/v1/biz/type/update`, data);

/**
 * type 业务分类删除
 */
export const getBizTypeDel = (data): any =>
  client.post(`/third_api/v1/biz/type/del`, data);

export const addSubTaskConfig = (data: TaskConfigProps): any =>
  client.post(`/third_api/v1/add_subtask_config`, data);

/**
 * 4.1 加载可用model列表
 */
export const getAvailableModels = (): any =>
  client.get(`/third_api/v1/get_available_models`);

/**
 * 4.3 初始化subtask调试参数
 */

export const initContextParams = (data: Record<string, any>): any =>
  client.post(`/intention/debug/init_context_params`, data);

/**
 * 4.6 更新subtask
 */
export const updateSubTaskConfig = (data: TaskConfigProps): any =>
  client.post(`/third_api/v1/update_subtask_config`, data);

/**
 * 4.7 批量查询subtask详情
 */
export const getSubTasksInfo = (data: { biz: string; name: string[] }): any =>
  client.post(`/third_api/v1/list_subtask`, data);

/**
 * 4.6 执行gpt subtask调试
 */
export const debugTaskChat = (data: { role: any; [key: string]: any }): any =>
  client.post(`/intention/debug/task_chat`, data);

/**
 * 4.4 初始化subtask调试参数
 */
export const getDebugInitContextParams = (): any =>
  client.post(`/intention/debug/init_context_params`, {});
