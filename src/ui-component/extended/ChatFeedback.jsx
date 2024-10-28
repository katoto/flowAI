import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// material-ui
import {  Box } from '@mui/material'

// Project import
import { StyledButton } from '@/ui-component/button/StyledButton'
import { SwitchInput } from '@/ui-component/switch/Switch'

// store
import { SET_CHATFLOW } from '@/store/actions'

// API
import chatflowsApi from '@/api/chatflows'

const ChatFeedback = ({ dialogProps }) => {
  const dispatch = useDispatch()

  const [chatFeedbackStatus, setChatFeedbackStatus] = useState(false)
  const [chatbotConfig, setChatbotConfig] = useState({})

  const handleChange = (value) => {
    setChatFeedbackStatus(value)
  }

  const onSave = async () => {
    try {
      let value = {
        chatFeedback: {
          status: chatFeedbackStatus
        }
      }
      chatbotConfig.chatFeedback = value.chatFeedback
      const saveResp = await chatflowsApi.updateChatflow(dialogProps.chatflow.id, {
        chatbotConfig: JSON.stringify(chatbotConfig)
      })
      if (saveResp.data) {

        dispatch({ type: SET_CHATFLOW, chatflow: saveResp.data })
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (dialogProps.chatflow && dialogProps.chatflow.chatbotConfig) {
      let chatbotConfig = JSON.parse(dialogProps.chatflow.chatbotConfig)
      setChatbotConfig(chatbotConfig || {})
      if (chatbotConfig.chatFeedback) {
        setChatFeedbackStatus(chatbotConfig.chatFeedback.status)
      }
    }

    return () => { }
  }, [dialogProps])

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <SwitchInput label='Enable chat feedback' onChange={handleChange} value={chatFeedbackStatus} />
      </Box>
      <StyledButton style={{ marginBottom: 10, marginTop: 10 }} variant='contained' onClick={onSave}>
        Save
      </StyledButton>
    </>
  )
}

ChatFeedback.propTypes = {
  dialogProps: PropTypes.object
}

export default ChatFeedback
