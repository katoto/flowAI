/**
 * 新增场景
 */
import React, { useImperativeHandle } from "react";
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, OutlinedInput } from '@mui/material'
import { StyledButton } from '@/ui-component/button/StyledButton'
import ConfirmDialog from '@/ui-component/dialog/ConfirmDialog'
import { IconSubtask } from '@tabler/icons-react'
import { delIntention, intentionOperate, mockCanvasAddIntention } from "@/api/canvas";
import { message } from "antd";
import useConfirm from "@/hooks/useConfirm";
import { useRequest } from "ahooks";

interface OperateIntentionProps {
  onCancel: () => void
  onConfirm: (data: any) => void
  cRef: any
  params: {
    id?: number
    biz: string
    job: string
    type: string
  }
}


const OperateIntention = ({ onCancel, onConfirm, params, cRef }: OperateIntentionProps) => {
  const portalElement = document.getElementById('portal')
  const [subIntentionOpen, setIntentionOpen] = useState(false)
  const [intentionName, setIntentionName] = useState('')
  const [order, setOrder] = useState('')
  const [intentionId, setIntentionId] = useState()
  const { confirm } = useConfirm()
  const { runAsync: runAsyncDelIntention } = useRequest(delIntention, {
    manual: true
  });

  const initData = () => {
    setIntentionName('')
    setOrder('')
    setIntentionId(undefined)
  }

  useImperativeHandle(cRef, () => {
    return {
      doMsgEvt: (data) => {
        initData()
        switch (data.type) {
          case 'add': {
            setIntentionOpen(true)
            setOrder(data.order)
            break;
          };
          case 'del': {
            handleDeleteIntention(data.id, data.intentionName)
            break;
          };
          case 'build': {
            setIntentionOpen(true)
            setIntentionId(data.id)
            setIntentionName(data.intentionName)
            setOrder(data.order)
          }; break;
        }
      }
    }
  })

  const doNewVariable = async () => {
    try {
      const addResp = await mockCanvasAddIntention({
        ...params,
        intention: intentionName || '',
        order: parseInt(order) || -1,
        id: intentionId ? parseInt(intentionId) : undefined
      })
      if (addResp) {
        message.success('操作成功', 2, () => {
          setIntentionOpen(false)
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

  const handleDeleteIntention = async (id: number, name: string) => {
    const confirmPayload = {
      title: `Delete Intention`,
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
        runAsyncDelIntention({
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


  const component = subIntentionOpen ? (
    <Dialog
      fullWidth
      maxWidth='sm'
      open={subIntentionOpen}
      onClose={() => {
        setIntentionOpen(false)
        onCancel()
      }}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={{ fontSize: '1rem' }} id='alert-dialog-title'>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <IconSubtask style={{ marginRight: '10px' }} />
          {intentionId ? '编辑' : '新增'}意图Intention
        </div>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography>
              意图名称<span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <div style={{ flexGrow: 1 }}></div>
          </div>
          <OutlinedInput
            size='small'
            sx={{ mt: 1 }}
            type='string'
            fullWidth
            key='intentionName'
            onChange={(e) => setIntentionName(e.target.value)}
            value={intentionName ?? ''}
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
          disabled={!intentionName || !order}
          variant='contained'
          onClick={() => {
            doNewVariable()
          }}
        >
          {intentionId ? '编辑' : '新增'}
        </StyledButton>
      </DialogActions>
      <ConfirmDialog />
    </Dialog>
  ) : null

  return createPortal(component, portalElement)
}

export default OperateIntention
