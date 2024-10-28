/**
 * 新增工作流 workflow
 */
import React, { useImperativeHandle } from "react";
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, OutlinedInput, Switch } from '@mui/material'
import { StyledButton } from '@/ui-component/button/StyledButton'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'
import { IconSubtask } from '@tabler/icons-react'
import { addWorkflow, mockCanvasAddflows, updateWorkflow, workflowDetail } from "@/api/canvas";
import { message } from "antd";
import { useRequest } from "ahooks";

interface OperateWorkflowProps {
  onCancel: () => void
  onConfirm: (data: any) => void
  cRef: any
  params: {
    biz: string
    job: string
    type: string
  }
}

const OperateWorkflow = ({ onCancel, onConfirm, params, cRef }: OperateWorkflowProps) => {
  const { runAsync: runAsyncWorkFlow } = useRequest(workflowDetail, {
    retryCount: 1,
    manual: true,
  });
  const portalElement = document.getElementById('portal')
  const [workflowOpen, setWorkflowOpen] = useState(false)
  const [intentionName, setIntentionName] = useState('')
  const [goal, setGoal] = useState('')
  const [isRecognition, setIsRecognition] = useState<boolean>(false)
  const [order, setOrder] = useState('')
  const [workflowName, setWorkflowName] = useState('')
  const [workId, setWorkId] = useState()

  const initData = () => {
    setWorkflowName('')
    setIsRecognition(false)
    setOrder('')
    setGoal('')
    setWorkId(undefined)
  }

  useImperativeHandle(cRef, () => {
    return {
      doMsgEvt: async (data) => {
        console.log('--workflow---', data)
        initData()
        setWorkflowOpen(true)
        switch (data.type) {
          case 'add': {
            setIntentionName(data.intentionName)
          }; break;
          case 'copy': {
            setIntentionName(data.intentionName)
            setWorkId(data.topic_id)
          }; break;
          case 'build': {
            let currWorkData = undefined
            if (data.topic_id) {
              currWorkData = await runAsyncWorkFlow({
                topicId: data.topic_id || ''
              })
              if (currWorkData.data) {
                setGoal(currWorkData.data.goal)
                // todo is_intention_recognition 字段没返回
                setIsRecognition(currWorkData.data.is_intention_recognition === 1)
              }
            }
            setIntentionName(data.intentionName)
            setOrder(data.order)
            setWorkflowName(data.name)
            setWorkId(data.topic_id)
          }; break;
        }
      }
    }
  })

  const addNewVariable = async () => {
    try {
      const fn = workId ? updateWorkflow : addWorkflow
      const addResp = await mockCanvasAddflows({
        ...params,
        intention: intentionName || '',
        name: workflowName,
        is_intention_recognition: isRecognition ? 1 : 0,
        order: parseInt(order) || -1,
        goal
      })
      if (addResp) {
        message.success('操作成功', 2, () => {
          setWorkflowOpen(false)
          onConfirm(addResp)
        })
      } else {
        message.error(addResp?.msg || '添加失败')
      }
    } catch (err) {
      message.error('添加失败')
      onCancel()
    }
  }

  const component = workflowOpen ? (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={workflowOpen}
      onClose={() => {
        setWorkflowOpen(false)
        onCancel()
      }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <IconSubtask style={{ marginRight: '10px' }} />
          {workId ? '编辑' : '新增'}工作流workflow
        </div>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              workflow名称<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='workflowName'
            onChange={(e) => setWorkflowName(e.target.value)}
            value={workflowName ?? ''}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              workflow描述<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='goal'
            multiline
            rows={2}
            onChange={(e) => setGoal(e.target.value)}
            value={goal ?? ''}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              是否启用意图识别
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <Switch checked={isRecognition} onChange={(e) => setIsRecognition(e.target.checked)} />
        </Box>

        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              Order
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='order'
            onChange={(e) => setOrder(e.target.value)}
            value={order ?? ''}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <StyledButton
          disabled={!intentionName || !order}
          variant='contained'
          onClick={() => {
            addNewVariable()
          }}
        >
          {workId ? '编辑' : '新增'}
        </StyledButton>
      </DialogActions>
      <ConfirmDialog />
    </Dialog>
  ) : null

  return createPortal(component, portalElement)
}

export default OperateWorkflow
