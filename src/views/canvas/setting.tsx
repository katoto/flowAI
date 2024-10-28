import React from "react";
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import { ListItemButton, ListItemIcon, ListItemText, Typography, Box, List, Paper, Popper, ClickAwayListener } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MainCard from '@/ui-component/cards/MainCard'
import Transitions from '@/ui-component/extended/Transitions'
import settings from '@/menu-items/settings'

// ==============================|| SETTINGS ||============================== //

const Settings = ({ chatflow, isSettingsOpen, anchorEl, onSettingsItemClick, onClose }) => {
  const theme = useTheme()
  const [settingsMenu, setSettingsMenu] = useState([])
  const customization = useSelector((state: any) => state.customization)
  const inputFile = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const menus = settings
    let settingsMenu = menus.children

    if (chatflow && !chatflow.id) {
      settingsMenu = menus.children.filter((menu) => menu.id === 'Configuration')
    }
    setSettingsMenu(settingsMenu)

  }, [chatflow])

  useEffect(() => {
    setOpen(isSettingsOpen)

  }, [isSettingsOpen])

  // settings list items
  const items = settingsMenu.map((menu) => {
    const Icon = menu.icon
    const itemIcon = menu?.icon ? (
      <Icon stroke={1.5} size='1.3rem' />
    ) : (
      <FiberManualRecordIcon
        sx={{
          width: customization.isOpen.findIndex((id) => id === menu?.id) > -1 ? 8 : 6,
          height: customization.isOpen.findIndex((id) => id === menu?.id) > -1 ? 8 : 6
        }}
        fontSize={'inherit'}
      />
    )
    return (
      <ListItemButton
        key={menu.id}
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          py: 1.25,
          pl: `24px`
        }}
        onClick={() => {
          onSettingsItemClick(menu.id)
          // inputFile?.current.click()
        }}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
        <ListItemText primary={<Typography color='inherit'>{menu.title}</Typography>} />
      </ListItemButton>
    )
  })

  return (
    <>
      <Popper
        placement='bottom-end'
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [170, 20]
              }
            }
          ]
        }}
        sx={{ zIndex: 1000 }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={onClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <List>{items}</List>
                    </Box>
                  </PerfectScrollbar>
                  <input
                    type='file'
                    hidden
                    accept='.json'
                    ref={inputFile}
                    style={{ display: 'none' }}
                  />
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}

Settings.propTypes = {
  chatflow: PropTypes.object,
  isSettingsOpen: PropTypes.bool,
  anchorEl: PropTypes.any,
  onSettingsItemClick: PropTypes.func,
  onClose: PropTypes.func
}

export default Settings
