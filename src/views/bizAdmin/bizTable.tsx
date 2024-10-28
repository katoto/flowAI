import React from "react";
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { styled } from '@mui/material/styles'
import {
  Button,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
// import FlowListMenu from '../button/FlowListMenu'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.grey[900] + 25,

  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.grey[900]
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 64
  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))


export const BizTable = ({ data, isLoading, setError }) => {
  const theme = useTheme()
  const customization = useSelector((state: any) => state.customization)

  return (
    <>
      <TableContainer sx={{ border: 1, borderColor: theme.palette.grey[900] + 25, borderRadius: 2 }} >
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead
            sx={{
              backgroundColor: customization.isDarkMode ? theme.palette.common.black : theme.palette.grey[100],
              height: 56
            }}
          >
            <TableRow>
              <StyledTableCell scope='row' style={{ width: '10%' }} key='0'>
                业务线
              </StyledTableCell>
              <StyledTableCell style={{ width: '42%' }} key='1'>
                平台链接
              </StyledTableCell>
              <StyledTableCell style={{ width: '12%' }} key='2'>
                更新人
              </StyledTableCell>
              <StyledTableCell style={{ width: '15%' }} key='3'>
                更新时间
              </StyledTableCell>
              <StyledTableCell style={{ width: '10%' }} key='4'>
                操作
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <>
                <StyledTableRow key={1}>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2}>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ) : (
              <>
                {data.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell key='0'>
                      <strong>{row.templateName || row.name}</strong>
                    </StyledTableCell>
                    <StyledTableCell key='1'>
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          fontSize: 14,
                          fontWeight: 500,
                          WebkitLineClamp: 10,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                      >
                        {
                          row.links.map((link) => {
                            return <div key={link}><a target="_blank" style={{ color: '#2196f3', textDecoration: 'none' }} href={link}>{link}</a></div>
                          })
                        }
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell key='2'>
                      {row.updated_by || '-'}
                    </StyledTableCell>
                    <StyledTableCell key='3'>
                      {dayjs(row.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                    </StyledTableCell>
                    <StyledTableCell key='4'>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        justifyContent='center'
                        alignItems='center'
                      >
                        <Button
                          id='demo-customized-button'
                          disableElevation
                          onClick={() => { }}
                        >
                          操作
                        </Button>
                        {/* <FlowListMenu
                            chatflow={row}
                            setError={setError}
                            updateFlowsApi={updateFlowsApi}
                        /> */}
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow key={1}>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton variant='text' />
                  </StyledTableCell>
                </StyledTableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
