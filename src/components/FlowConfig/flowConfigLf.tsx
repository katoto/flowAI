import React, { memo, useCallback, useState } from 'react';
import { Slider, Stack, Tooltip } from '@mui/material';
import { IconPlus } from "@tabler/icons-react";
import { getAvailableModels } from '@/api/canvas';
import { useRequest } from 'ahooks';
import { Button, Empty, Form, Popconfirm, Select } from 'antd';
import './flowConfigLf.scss';
import VscodeEditor from '@/components/vscode-editor'


const FlowConfigLf = ({ flowDetail }) => {
  const { data: modelsData }: any = useRequest(getAvailableModels, {
    retryCount: 1
  });
  console.log('--modelsData--', modelsData)
  const jsonFlowList = useCallback((flowDetail) => {
    if (flowDetail && flowDetail.flow) {
      return JSON.parse(flowDetail.flow)
    }
    if (flowDetail) {
      if (flowDetail.flow) {
        return JSON.parse(flowDetail.flow)
      }

    }
    return []
  }, [flowDetail])
  const flowList = jsonFlowList(flowDetail)

  flowList.push({
    name: 'testSubtask',
    description: '123123',
    external_name: 'load',
    mode: 'gpt'
  })

  flowList.push({
    name: 'testSubtask',
    description: '123123',
    external_name: 'load',
    mode: 'function'
  })

  flowList.push({
    name: 'testSubtask',
    description: '123123',
    external_name: 'load',
    mode: 'gpt'
  })

  flowList.push({
    name: 'testSubtask',
    description: '123123',
    external_name: 'load',
    mode: 'function'
  })

  flowList.push({
    name: 'testSubtask',
    description: '123123',
    external_name: 'load',
    mode: 'gpt'
  })

  flowList.push({
    name: 'testSubtask',
    description: '123123',
    external_name: 'load',
    mode: 'function'
  })


  return <div className='flow-config-lf'>
    <section>
      <div className='flow-config-task-header'>
        <strong>SubTask List</strong>
        <IconPlus
          onClick={() => {
            window.postMessage({ msgType: 'canvas_add_subTask' });
          }}
          style={{ cursor: 'pointer', color: 'rgb(33, 150, 243)' }}
        />
      </div>
      {
        flowList && flowList.length > 0 ?
          <ul className='flow-config-task-ul'>
            {/* // active */}
            {
              flowList.map((item) => {
                return <li className='flow-config-task-li'>
                  <div className='flow-config-task-li-lf'>
                    {
                      item.mode === 'gpt' ? <svg viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1146" width="28" height="28"><path d="M187.445205 561.809243V485.371768h154.970115v159.150129c-12.220088 20.600756-31.860989 36.742831-58.8969 48.436547-27.061714 11.683395-56.806894 17.530252-89.276823 17.530252-38.04328 0-71.813657-8.375508-101.305972-25.121362-29.492315-16.740694-52.358534-40.215854-68.583178-70.42032-16.234964-30.194144-24.347286-64.650869-24.347286-103.401139 0-39.436617 8.458076-74.244257 25.389709-104.448722 16.931633-30.178663 40.050718-53.395797 69.372736-69.635922 29.322018-16.219483 62.122219-24.342126 98.421246-24.342126 156.043501 0 150.26373 109.113824 150.263731 132.573502l-74.342307 0.418001c-7.322764-16.400101-17.540574-29.136239-30.627627-38.218737-13.092214-9.082498-28.723399-13.613425-46.867752-13.613425-18.495268 0-35.256604 4.696064-50.258207 14.129476-15.017084 9.428252-26.875936 22.959109-35.597198 40.57709-8.726422 17.633463-13.092214 38.487084-13.092214 62.560863 0 36.660263 9.681117 65.533317 29.058832 86.655284 19.367394 21.127128 45.283475 31.664889 77.743083 31.664889 24.429854 0 43.110901-6.455798 56.017336-19.357073v-48.699732H187.445205zM539.794507 312.933327c32.108693 0 60.037373 5.537227 83.770559 16.5962 23.728025 11.064133 41.944625 26.741763 54.680764 47.048369 12.777423 20.301446 19.12485 44.055274 19.12485 71.256323 0 27.190727-6.347427 50.939394-19.12485 71.23568-12.736139 20.322088-30.952739 36.004878-54.680764 47.048369-23.738346 11.053812-51.667026 16.580719-83.770559 16.580719h-49.210624v128.367686h-89.534848V312.933327h138.745472z m-9.954624 191.460081c21.643179 0 39.266321-4.345149 52.890067-13.05093 13.613425-8.70578 20.420138-23.206813 20.420138-43.508259 0-19.945371-6.899602-34.363836-20.678163-43.250235-13.794043-8.876077-31.339777-13.324437-52.632042-13.324437h-39.250839v113.133861h39.250839zM710.994426 313.119105h319.363322v82.088233h-115.167101v315.859335h-89.023958V395.207338H710.999587V313.119105z" p-id="1147" fill="#1296db"></path></svg>
                        : <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1736" width="30" height="30"><path d="M510.665143 801.536c13.037714 0 22.253714-7.296 22.253714-20.333714 0-5.76-1.536-8.832-5.76-16.896-46.811429-72.502857-73.289143-155.757714-73.289143-245.924572 0-87.094857 24.941714-174.189714 73.289143-247.076571 4.205714-8.045714 5.76-11.117714 5.76-16.877714 0-12.288-9.216-20.333714-22.253714-20.333715-12.672 0-23.04 5.741714-35.291429 22.637715-57.563429 73.270857-86.710857 164.571429-86.710857 261.266285s27.995429 185.307429 86.692572 260.900572c12.288 16.877714 22.637714 22.637714 35.291428 22.637714z m391.716571 0c12.653714 0 22.637714-5.76 34.925715-22.637714C995.986286 703.305143 1024 614.692571 1024 517.997714c0-96.676571-28.781714-187.977143-86.710857-261.266285-12.269714-16.896-22.253714-22.637714-34.907429-22.637715-13.037714 0-22.253714 8.045714-22.253714 20.333715 0 5.76 1.152 8.813714 5.376 16.877714 48.731429 72.886857 73.654857 160 73.654857 247.076571 0 90.148571-26.843429 173.421714-73.270857 245.942857-4.608 8.045714-5.76 11.117714-5.76 16.877715 0 12.269714 9.216 20.333714 22.253714 20.333714z m-850.578285-0.768c75.190857 0 110.098286-32.237714 128.128-118.564571l43.739428-209.865143h69.449143c22.253714 0 36.443429-11.885714 36.443429-31.085715 0-16.475429-10.733714-26.843429-28.379429-26.843428h-64.841143l10.733714-52.169143c9.984-48.731429 25.325714-68.681143 67.913143-68.681143 6.144 0 12.269714-0.384 16.493715-0.768 19.2-1.92 27.611429-10.752 27.611428-27.245714 0-21.485714-18.011429-31.085714-54.857143-31.085714-73.270857 0-110.866286 36.461714-127.744 118.564571l-13.056 61.385143H115.858286c-22.235429 0-36.827429 11.885714-36.827429 31.085714 0 16.493714 11.136 26.843429 28.781714 26.843429h43.337143L108.982857 673.005714C98.194286 723.254857 82.468571 741.668571 41.435429 741.668571c-5.376 0-10.368 0.384-14.189715 0.768-17.664 2.304-27.245714 11.885714-27.245714 28.013715 0 20.717714 17.645714 30.317714 51.803429 30.317714z m539.044571-100.918857c12.653714 0 21.101714-4.205714 30.683429-18.029714l84.022857-119.698286h1.536l85.942857 121.618286c9.6 13.44 18.797714 16.109714 28.013714 16.109714 18.413714 0 30.701714-13.037714 30.701714-28.763429 0-7.296-2.304-14.189714-7.314285-20.717714l-98.194286-133.522286 98.194286-131.602285c5.010286-6.509714 7.314286-13.421714 7.314285-21.485715 0-16.493714-13.824-27.995429-29.165714-27.995428-13.805714 0-21.869714 6.912-29.165714 18.029714l-80.950857 118.546286h-1.92l-81.334857-118.930286c-7.296-11.136-16.493714-17.645714-31.085715-17.645714-17.645714 0-31.085714 14.189714-31.085714 29.531428 0 11.136 3.090286 18.048 8.466286 24.557715l93.220571 125.074285-98.980571 136.96c-5.76 7.314286-6.912 13.824-6.912 21.504 0 14.957714 12.672 26.459429 28.013714 26.459429z" p-id="1737" fill="#1296db"></path></svg>
                    }
                    <span style={{ marginLeft: '12px' }}>{item.name}</span>
                  </div>

                  <Popconfirm
                    title="确定删除该subTask?"
                    onConfirm={() => { }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type='link' danger>删除</Button>
                  </Popconfirm>


                </li>
              })
            }
          </ul>
          :
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'No SubTask List'} />
      }
    </section>
    <div>
      <div className='flow-config-task-prompt'>
        <strong>Prompt</strong>

        <div className='flow-config-task-prompt-header' >
          <Form.Item
            label=""
            name="model"
            style={{ margin: 0, marginRight: '8px' }}
          >
            <Select placeholder="Model" style={{ minWidth: 100 }}>
              {
                modelsData && modelsData.data && modelsData.data.map((modelItem) => {
                  return <Select.Option value={modelItem.name}>{modelItem.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>

          <Stack spacing={2} direction="row" style={{ marginBottom: 0 }} sx={{ alignItems: 'center', mb: 1 }}>
            <span style={{ color: '#9e9e9e' }}>温度:</span>
            <Slider
              style={{ width: 100, margin: '0 2px' }}
              aria-label="temperature"
              defaultValue={30}
              step={10}
              min={10}
              max={100}
              marks
              valueLabelDisplay="auto"
              size="small"
            />
          </Stack>
        </div>
      </div>
      <div style={{ height: '294px' }}>
        <Form.Item
          label=""
          name="input_prompt"
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
          <VscodeEditor defaultLanguage="markdown" readonly={false} />
        </Form.Item>


      </div>

    </div>

  </div>
}

export default memo(FlowConfigLf)
