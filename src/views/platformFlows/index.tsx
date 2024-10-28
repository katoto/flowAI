import React, { useState } from "react";
import ViewHeader from "@/layout/MainLayout/ViewHeader";
import { StyledButton } from "@/ui-component/button/StyledButton";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
// icons
import { IconPlus } from '@tabler/icons-react'
import { Box, Skeleton, Stack } from "@mui/material";
import ItemCard from "@/ui-component/cards/ItemCard";
import { getBizTypeList, mockBizTypeItem } from "@/api/platformFlows";
import WorkflowEmptySVG from '@/assets/images/workflow_empty.svg'
import { useSelector } from "react-redux";
import SaveChatflowDialog from '@/ui-component/dialog/SaveChatflowDialog'
import { message } from "antd";
import { getBizTypeUpdate } from "@/api/canvas";
import type1 from '@/assets/images/1.png'
import type2 from '@/assets/images/2.png'


const PlatformFlows = () => {
  const customization = useSelector((state: any) => state.customization)
  const [typeOpen, setTypeOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { data: bizTypeListData, loading, refresh } = useRequest(() => getBizTypeList({
    page_no: 1,
    page_size: 99,
    biz: customization.bizName,
    job: customization.jobName
  }), {
    retryCount: 2
  });
  const { runAsync: runAsynAdd } = useRequest(getBizTypeUpdate, {
    manual: true
  });

  const adaptData = (data) => {
    if (data) {
      return data.items.map((item) => {
        return {
          ...item,
          name: `业务分类: ${item.type}`,
          imgs: [type1, type2]
        }
      })
    }
    return []
  }

  return (
    <div>
      <ViewHeader search={true} searchPlaceholder='请输入' title="工作台">
        <StyledButton variant='contained' onClick={() => {
          setTypeOpen(true)
        }} startIcon={<IconPlus />} sx={{ borderRadius: 2, height: 40 }}>
          新增
        </StyledButton>
      </ViewHeader>

      {!loading && (adaptData(bizTypeListData).length === 0) && (
        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} flexDirection='column'>
          <Box sx={{ p: 2, height: 'auto' }}>
            <img
              style={{ objectFit: 'cover', height: '25vh', width: 'auto' }}
              src={WorkflowEmptySVG}
              alt='WorkflowEmptySVG'
            />
          </Box>
          <div>No Data Yet</div>
        </Stack>
      )}
      {
        adaptData(bizTypeListData).length > 0 &&
        <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={3} style={{ marginTop: 20 }}>
          {adaptData(bizTypeListData).map((item, index) => (
            <ItemCard key={index} onClick={() => {
              window.open(`/canvas/${item.type}?id=${item.id}`, "_blank")
            }}
              data={item}
              images={item.imgs} />
          ))}
        </Box>
      }
      {
        loading && <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={3} style={{ marginTop: 20 }}>
          <Skeleton variant='rounded' height={160} />
          <Skeleton variant='rounded' height={160} />
          <Skeleton variant='rounded' height={160} />
        </Box>
      }

      <SaveChatflowDialog
        show={typeOpen}
        dialogProps={{
          title: `新增Type业务类型`,
          confirmButtonName: '保存',
          cancelButtonName: '取消'
        }}
        onCancel={() => setTypeOpen(false)}
        onConfirm={(newTypeName) => {
          mockBizTypeItem({
            type: newTypeName || '',
            biz: customization.bizName,
            job: customization.jobName,
          }).then((res: any) => {
            if (res) {
              message.success('新增成功', 1.2, () => {
                setTypeOpen(false)
                refresh()
              })
              // navigate(`/canvas/${newTypeName}?id=${res.data}`, { replace: true })
            }
          })
        }}
      />
    </div>
  )
}

export default PlatformFlows;
