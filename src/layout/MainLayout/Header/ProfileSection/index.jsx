import { MENU_OPEN, REMOVE_DIRTY } from '@/store/actions'
import { sanitizeChatflows } from '@/utils/genericHelper'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// material-ui
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import AboutDialog from '@/ui-component/dialog/AboutDialog'
import Transitions from '@/ui-component/extended/Transitions'

// assets
import { IconInfoCircle, IconLogout, IconSettings, IconX } from '@tabler/icons-react'
import './index.css'

//API
import chatFlowsApi from '@/api/chatflows.ts'

// Hooks
import useApi from '@/hooks/useApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({ username, handleLogout }) => {
  const theme = useTheme()

  const customization = useSelector((state) => state.customization)

  const [open, setOpen] = useState(false)
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false)

  const anchorRef = useRef(null)
  const inputRef = useRef()

  const navigate = useNavigate()
  const location = useLocation()

  // ==============================|| Snackbar ||============================== //

  const dispatch = useDispatch()

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const errorFailed = (msg) => {
    message.error(msg)
  }
  const importChatflowsApi = useApi(chatFlowsApi.importChatflows)

  const importChatflowsSuccess = () => {
    dispatch({ type: REMOVE_DIRTY })

  }
  useEffect(() => {
    if (importChatflowsApi.error) errorFailed(`Failed to import chatflows: ${importChatflowsApi.error.response.data.message}`)
    if (importChatflowsApi.data) {
      importChatflowsSuccess()
      // if current location is /chatflows, refresh the page
      if (location.pathname === '/chatflows') navigate(0)
      else {
        // if not redirect to /chatflows
        dispatch({ type: MENU_OPEN, id: 'chatflows' })
        navigate('/chatflows')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importChatflowsApi.error, importChatflowsApi.data])

  const getAllChatflowsApi = useApi(chatFlowsApi.getAllChatflows)

  const exportChatflowsSuccess = () => {
    dispatch({ type: REMOVE_DIRTY })

  }

  useEffect(() => {
    if (getAllChatflowsApi.error) errorFailed(`Failed to export Chatflows: ${getAllChatflowsApi.error.response.data.message}`)
    if (getAllChatflowsApi.data) {
      const sanitizedChatflows = sanitizeChatflows(getAllChatflowsApi.data)
      const dataStr = JSON.stringify({ Chatflows: sanitizedChatflows }, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

      const exportFileDefaultName = 'AllChatflows.json'

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      exportChatflowsSuccess()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllChatflowsApi.error, getAllChatflowsApi.data])

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <ButtonBase ref={anchorRef} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
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
          onClick={handleToggle}
          color='inherit'
        >
          <IconSettings stroke={1.5} size='1.3rem' />
        </Avatar>
      </ButtonBase>
      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  {username && (
                    <Box sx={{ p: 2 }}>
                      <Typography component='span' variant='h4'>
                        {username}
                      </Typography>
                    </Box>
                  )}
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <List
                        component='nav'
                        sx={{
                          width: '100%',
                          maxWidth: 250,
                          minWidth: 200,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          onClick={() => {
                            setOpen(false)
                            setAboutDialogOpen(true)
                          }}
                        >
                          <ListItemIcon>
                            <IconInfoCircle stroke={1.5} size='1.3rem' />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant='body2'>About Flowise</Typography>} />
                        </ListItemButton>
                        {localStorage.getItem('username') && localStorage.getItem('password') && (
                          <ListItemButton
                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                            onClick={handleLogout}
                          >
                            <ListItemIcon>
                              <IconLogout stroke={1.5} size='1.3rem' />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant='body2'>Logout</Typography>} />
                          </ListItemButton>
                        )}
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <AboutDialog show={aboutDialogOpen} onCancel={() => setAboutDialogOpen(false)} />
    </>
  )
}

ProfileSection.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func
}

export default ProfileSection
