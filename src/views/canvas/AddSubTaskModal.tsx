import React from "react";
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, OutlinedInput } from '@mui/material'
import { StyledButton } from '@/ui-component/button/StyledButton'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'

// Icons
import { IconSubtask } from '@tabler/icons-react'
import { Dropdown } from '@/ui-component/dropdown/Dropdown'
import { addSubTaskConfig } from "@/api/canvas";
import { message } from "antd";

const modeTypes = [
  {
    label: 'Gpt',
    name: 'gpt',
    description: '大模型运行模式'
  },
  {
    label: 'Function',
    name: 'function',
    description: '函数运行模式'
  }
]

const AddSubTaskModal = ({ onCancel, onConfirm }) => {
  const portalElement = document.getElementById('portal')
  const [subTaskOpen, setSubTaskOpen] = useState(false)
  const [subtaskName, setSubtaskName] = useState('')
  const [description, setDescription] = useState('')
  const [modeType, setModeType] = useState<'gpt' | 'function'>('gpt')

  useEffect(() => {
    const handleMsg = (event) => {
      const { msgType } = event.data;
      if (msgType === 'canvas_add_subTask') {
        setSubTaskOpen(true)
      }
    }
    window.addEventListener('message', handleMsg);
    return () => {
      window.removeEventListener('message', handleMsg);
    }
  }, [])


  useEffect(() => {
    if (subTaskOpen) {
      setSubtaskName('')
      setDescription('')
      setModeType('gpt')
    }

  }, [subTaskOpen])


  const addNewVariable = async () => {
    try {
      const addResp = await addSubTaskConfig({
        description,
        content: '',
        external_name: 'load',
        name: subtaskName,
        mode: modeType,
        biz: localStorage.getItem('bizName') || ''
      })
      console.log('---addResp----', addResp)

      if (addResp && addResp.ret === 0) {
        message.success('添加成功', 2, () => {
          setSubTaskOpen(false)
        })
        onConfirm(1)
      } else {
        message.error(addResp?.msg || '添加失败')
      }
    } catch (err) {
      message.error('添加失败')
      onCancel()
    }
  }

  const component = subTaskOpen ? (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={subTaskOpen}
      onClose={() => {
        setSubTaskOpen(false)
        onCancel()
      }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <IconSubtask style={{ marginRight: '10px' }} />
          新增subTask
        </div>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              名称<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='subtaskName'
            onChange={(e) => setSubtaskName(e.target.value)}
            value={subtaskName ?? ''}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              作用描述<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='description'
            multiline
            rows={2}
            onChange={(e) => setDescription(e.target.value)}
            value={description ?? ''}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              模式<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <Dropdown
            key={modeType}
            name='modeType'
            options={modeTypes}
            onSelect={(newValue) => setModeType(newValue)}
            value={modeType ?? '选择运行模式'}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <StyledButton
          disabled={!subtaskName || !modeType || !description}
          variant='contained'
          onClick={() => {
            addNewVariable()
          }}
        >
          新增
        </StyledButton>
      </DialogActions>
      <ConfirmDialog />
    </Dialog>
  ) : null

  return createPortal(component, portalElement)
}

export default AddSubTaskModal
