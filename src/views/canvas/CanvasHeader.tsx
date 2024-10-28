import React from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Avatar, Box, ButtonBase, Typography, Stack, TextField } from '@mui/material'

// icons
import { IconSettings, IconChevronLeft, IconPencil, IconCheck, IconX } from '@tabler/icons-react'

// project imports
import Settings from "./setting";
import SaveChatflowDialog from '@/ui-component/dialog/SaveChatflowDialog'
// import APICodeDialog from '@/views/chatflows/APICodeDialog'
// import ViewMessagesDialog from '@/ui-component/dialog/ViewMessagesDialog'
// import UpsertHistoryDialog from '@/views/vectorstore/UpsertHistoryDialog'

// utils
import { message } from "antd";
import { useRequest } from "ahooks";
import { getBizTypeDel, getBizTypeUpdate } from "@/api/canvas";
import useConfirm from "@/hooks/useConfirm";
// ==============================|| CANVAS HEADER ||============================== //

const CanvasHeader = ({ chatflow, handleSaveFlow }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const flowNameRef = useRef<HTMLInputElement>(null)
  const settingsRef = useRef()
  const { confirm } = useConfirm()

  const customization = useSelector((state: any) => state.customization)
  const { runAsync: runAsyncUpdate } = useRequest(getBizTypeUpdate, {
    manual: true
  });
  const { runAsync: runAsyncDel } = useRequest(getBizTypeDel, {
    manual: true
  });

  const [isEditingFlowName, setEditingFlowName] = useState(null)
  const [flowName, setFlowName] = useState('')
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [flowDialogOpen, setFlowDialogOpen] = useState(false)


  const submitTypeName = () => {
    if (chatflow.id && flowNameRef.current) {
      runAsyncUpdate({
        type: flowNameRef?.current?.value || '',
        id: chatflow.id,
        biz: customization.bizName,
        job: customization.jobName,
      }).then((res: any) => {
        console.log('--->>res>---', res)
        if (res.ret === 0) {
          message.success('操作成功', 1.2, () => {
            setEditingFlowName(false)
          })
          navigate(`/canvas/${flowNameRef?.current?.value || ''}?id=${chatflow.id}`, { replace: true })
        }
      })
    }
  }


  const onSaveChatflowClick = () => {
    if (chatflow.id) handleSaveFlow(flowName)
    else setFlowDialogOpen(true)
  }

  const handleDeleteType = async () => {
    const confirmPayload = {
      title: `Delete Type`,
      description: `Delete ${flowName}?`,
      confirmButtonName: 'Delete',
      cancelButtonName: 'Cancel'
    }
    const isConfirmed = await confirm(confirmPayload)

    if (isConfirmed) {
      try {
        runAsyncDel({
          id: chatflow.id,
          biz: customization.bizName,
          job: customization.jobName,
        }).then((res) => {
          if (res.ret === 0) {
            message.success('删除成功', 1.5, () => {
              navigate('/platformflows')
            })
          }
        })
      } catch (error) {
        console.warn(error)
      }
    }
  }

  useEffect(() => {
    if (chatflow) {
      setFlowName(chatflow.name)

    }
  }, [chatflow])

  return (
    <>
      <Stack flexDirection='row' justifyContent='space-between' sx={{ width: '100%' }}>
        <Stack flexDirection='row' sx={{ width: '100%', maxWidth: '50%' }}>
          <Box>
            <ButtonBase title='Back' sx={{ borderRadius: '50%' }}>
              <Avatar
                variant='rounded'
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
                  }
                }}
                color='inherit'
                onClick={() =>
                  window.history.state && window.history.state.idx > 0 ? navigate(-1) : navigate('/', { replace: true })
                }
              >
                <IconChevronLeft stroke={1.5} size='1.3rem' />
              </Avatar>
            </ButtonBase>
          </Box>
          <Box sx={{ width: '100%' }}>
            {!isEditingFlowName ? (
              <Stack flexDirection='row'>
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    ml: 2,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {/* <strong style={{ color: theme.palette.orange.main }}>*</strong>  */}
                  {flowName}
                </Typography>
                {chatflow?.id && (
                  <ButtonBase title='Edit Name' sx={{ borderRadius: '50%' }}>
                    <Avatar
                      variant='rounded'
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        ml: 1,
                        background: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        '&:hover': {
                          background: theme.palette.secondary.dark,
                          color: theme.palette.secondary.light
                        }
                      }}
                      color='inherit'
                      onClick={() => setEditingFlowName(true)}
                    >
                      <IconPencil stroke={1.5} size='1.3rem' />
                    </Avatar>
                  </ButtonBase>
                )}
              </Stack>
            ) : (
              <Stack flexDirection='row' sx={{ width: '100%' }}>
                <TextField
                  size='small'
                  inputRef={flowNameRef}
                  sx={{
                    width: '100%',
                    ml: 2
                  }}
                  defaultValue={flowName}
                />
                <ButtonBase title='保存Type 名称' sx={{ borderRadius: '50%' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      transition: 'all .2s ease-in-out',
                      background: theme.palette.success.light,
                      color: theme.palette.success.dark,
                      ml: 1,
                      '&:hover': {
                        background: theme.palette.success.dark,
                        color: theme.palette.success.light
                      }
                    }}
                    color='inherit'
                    onClick={submitTypeName}
                  >
                    <IconCheck stroke={1.5} size='1.3rem' />
                  </Avatar>
                </ButtonBase>
                <ButtonBase title='Cancel' sx={{ borderRadius: '50%' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      transition: 'all .2s ease-in-out',
                      background: theme.palette.error.light,
                      color: theme.palette.error.dark,
                      ml: 1,
                      '&:hover': {
                        background: theme.palette.error.dark,
                        color: theme.palette.error.light
                      }
                    }}
                    color='inherit'
                    onClick={() => setEditingFlowName(false)}
                  >
                    <IconX stroke={1.5} size='1.3rem' />
                  </Avatar>
                </ButtonBase>
              </Stack>
            )}
          </Box>
        </Stack>
        <Box>
          <ButtonBase ref={settingsRef} title='Settings' sx={{ borderRadius: '50%' }}>
            <Avatar
              variant='rounded'
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: theme.palette.canvasHeader.settingsLight,
                color: theme.palette.canvasHeader.settingsDark,
                '&:hover': {
                  background: theme.palette.canvasHeader.settingsDark,
                  color: theme.palette.canvasHeader.settingsLight
                }
              }}
              onClick={() => setSettingsOpen(!isSettingsOpen)}
            >
              <IconSettings stroke={1.5} size='1.3rem' />
            </Avatar>
          </ButtonBase>
        </Box>
      </Stack>
      <Settings
        chatflow={chatflow}
        isSettingsOpen={isSettingsOpen}
        anchorEl={settingsRef.current}
        onClose={() => setSettingsOpen(false)}
        onSettingsItemClick={(setting) => {
          console.log('-setting--', setting)
          if (setting === 'deleteChatflow') {
            handleDeleteType()
          } else if (setting === 'duplicateChatflow') {
            try {
              // window.open(`${uiBaseURL}/canvas}`, '_blank')
            } catch (e) {
              console.error(e)
            }
          }
        }}
      />
      <SaveChatflowDialog
        show={flowDialogOpen}
        dialogProps={{
          title: `新增Type业务类型`,
          confirmButtonName: '保存',
          cancelButtonName: '取消'
        }}
        onCancel={() => setFlowDialogOpen(false)}
        onConfirm={(newTypeName) => {
          runAsyncUpdate({
            type: newTypeName || '',
            biz: customization.bizName,
            job: customization.jobName,
          }).then((res) => {
            console.log('-->res>>---', res)
            if (res.ret === 0) {
              message.success('新增成功', 1.2, () => {
                setFlowDialogOpen(false)
              })
              navigate(`/canvas/${newTypeName}?id=${res.data}`, { replace: true })
            }
          })
        }}
      />

    </>
  )
}

export default CanvasHeader
