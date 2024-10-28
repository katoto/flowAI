/**
 * 新增工作流 workflow
 */
import React, { useImperativeHandle } from "react";
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, OutlinedInput } from '@mui/material'
import { StyledButton } from '@/ui-component/button/StyledButton'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'
import { IconSubtask } from '@tabler/icons-react'
import { addPreset, updatePreset, delPreset } from "@/api/canvas";
import useConfirm from "@/hooks/useConfirm";
import { message } from "antd";
import { useRequest } from "ahooks";

interface OperatePresetProps {
  onCancel: () => void
  onConfirm: (data: any) => void
  cRef: any
}

const OperatePreset = ({ onCancel, onConfirm, cRef }: OperatePresetProps) => {
  const portalElement = document.getElementById('portal')
  const [presetOpen, setPresetOpen] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('')
  const [topicId, setTopicId] = useState<number>()
  const [presetId, setPresetId] = useState<number>()
  const { confirm } = useConfirm()
  const { runAsync: runAsyncDelPreset } = useRequest(delPreset, {
    manual: true
  });


  const initData = () => {
    setPresetName('')
    setOrder('')
    setQuery('')
    setPresetId(undefined)
    setTopicId(undefined)
  }

  const handleDeletePreset = async (id: number, name: string) => {

    const confirmPayload = {
      title: `Delete Preseet`,
      description: `Delete ${name}?`,
      confirmButtonName: 'Delete',
      cancelButtonName: 'Cancel'
    }
    const isConfirmed = await confirm(confirmPayload)

    if (isConfirmed) {
      try {
        if (!id) {
          return message.warning('操作失败,没有id')
        }
        runAsyncDelPreset({
          id: id,
        }).then((res: any) => {
          if (res.ret === 0) {
            message.success('删除成功', 1.5, () => {
              onConfirm(res)
            })
          }
        })
      } catch (error) {
        console.warn(error)
      }
    }
  }


  useImperativeHandle(cRef, () => {
    return {
      doMsgEvt: (data) => {
        console.log('--preset modal---', data)
        initData()
        setTopicId(data.topic_id)
        switch (data.type) {
          case 'add': {
            setPresetOpen(true)
          }; break;
          case 'delete': {
            handleDeletePreset(data.id, data.name)
          }; break;
          case 'build': {
            setPresetOpen(true)
            setOrder(data.order)
            setQuery(data.query)
            setPresetName(data.name)
            setPresetId(data.id)
          }; break;
        }
      }
    }
  })



  const addNewVariable = async () => {
    try {
      const fn = presetId ? updatePreset : addPreset
      const addResp = await fn({
        name: presetName,
        order: parseInt(order) || -1,
        topic_id: topicId || undefined,
        id: presetId || undefined,
        query
      })
      if (addResp && addResp.ret === 0) {
        message.success('操作成功', 2, () => {
          setPresetOpen(false)
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

  const component = presetOpen ? (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={presetOpen}
      onClose={() => {
        setPresetOpen(false)
        onCancel()
      }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <IconSubtask style={{ marginRight: '10px' }} />
          {presetId ? '编辑' : '新增'}预置问题
        </div>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              预置问题名称<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='presetName'
            onChange={(e) => setPresetName(e.target.value)}
            value={presetName ?? ''}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              预置问题提示词<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='query'
            multiline
            rows={2}
            onChange={(e) => setQuery(e.target.value)}
            value={query ?? ''}
          />
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
          disabled={!presetName || !query || !order}
          variant='contained'
          onClick={() => {
            addNewVariable()
          }}
        >
          {presetId ? '编辑' : '新增'}
        </StyledButton>
      </DialogActions>
      <ConfirmDialog />
    </Dialog>
  ) : null

  return createPortal(component, portalElement)
}

export default OperatePreset
