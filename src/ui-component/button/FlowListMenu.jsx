import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import FileDownloadIcon from '@mui/icons-material/Downloading'
import FileDeleteIcon from '@mui/icons-material/Delete'
import FileCategoryIcon from '@mui/icons-material/Category'
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt'
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined'
import VpnLockOutlinedIcon from '@mui/icons-material/VpnLockOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import Button from '@mui/material/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import chatflowsApi from '@/api/chatflows'

import useApi from '@/hooks/useApi'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}))

export default function FlowListMenu({ chatflow, isAgentCanvas, setError, updateFlowsApi }) {
  const updateChatflowApi = useApi(chatflowsApi.updateChatflow)

  const [flowDialogOpen, setFlowDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleFlowRename = () => {
    setAnchorEl(null)
    setFlowDialogOpen(true)
  }

  const handleFlowStarterPrompts = () => {

  }

  const handleFlowChatFeedback = () => {

  }

  const handleAllowedDomains = () => {

  }

  const handleSpeechToText = () => {

  }

  const saveFlowRename = async (chatflowName) => {

  }

  const handleFlowCategory = () => {

  }

  const saveFlowCategory = async (categories) => {

  }

  const handleDelete = async () => {
  }

  const handleDuplicate = () => {

  }

  const handleExport = () => {

  }

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleFlowRename} disableRipple>
          <EditIcon />
          Rename
        </MenuItem>
        <MenuItem onClick={handleDuplicate} disableRipple>
          <FileCopyIcon />
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleExport} disableRipple>
          <FileDownloadIcon />
          Export
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleFlowStarterPrompts} disableRipple>
          <PictureInPictureAltIcon />
          Starter Prompts
        </MenuItem>
        <MenuItem onClick={handleFlowChatFeedback} disableRipple>
          <ThumbsUpDownOutlinedIcon />
          Chat Feedback
        </MenuItem>
        <MenuItem onClick={handleAllowedDomains} disableRipple>
          <VpnLockOutlinedIcon />
          Allowed Domains
        </MenuItem>
        <MenuItem onClick={handleSpeechToText} disableRipple>
          <MicNoneOutlinedIcon />
          Speech To Text
        </MenuItem>
        <MenuItem onClick={handleFlowCategory} disableRipple>
          <FileCategoryIcon />
          Update Category
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <FileDeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
      {/* <SaveChatflowDialog
        show={flowDialogOpen}
        dialogProps={{
          title: `Rename`,
          confirmButtonName: 'Rename',
          cancelButtonName: 'Cancel'
        }}
        onCancel={() => setFlowDialogOpen(false)}
        onConfirm={saveFlowRename}
      />
      <TagDialog
        isOpen={categoryDialogOpen}
        dialogProps={categoryDialogProps}
        onClose={() => setCategoryDialogOpen(false)}
        onSubmit={saveFlowCategory}
      />
      <StarterPromptsDialog
        show={conversationStartersDialogOpen}
        dialogProps={conversationStartersDialogProps}
        onCancel={() => setConversationStartersDialogOpen(false)}
      />
      <ChatFeedbackDialog
        show={chatFeedbackDialogOpen}
        dialogProps={chatFeedbackDialogProps}
        onCancel={() => setChatFeedbackDialogOpen(false)}
      />
      <AllowedDomainsDialog
        show={allowedDomainsDialogOpen}
        dialogProps={allowedDomainsDialogProps}
        onCancel={() => setAllowedDomainsDialogOpen(false)}
      /> */}
      {/* <SpeechToTextDialog
        show={speechToTextDialogOpen}
        dialogProps={speechToTextDialogProps}
        onCancel={() => setSpeechToTextDialogOpen(false)}
      /> */}
    </div>
  )
}

FlowListMenu.propTypes = {
  chatflow: PropTypes.object,
  isAgentCanvas: PropTypes.bool,
  setError: PropTypes.func,
  updateFlowsApi: PropTypes.object
}
