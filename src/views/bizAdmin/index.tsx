import React from "react";
import ViewHeader from "@/layout/MainLayout/ViewHeader";
import { StyledButton } from "@/ui-component/button/StyledButton";
import { BizTable } from "./bizTable";
import { IconPlus } from "@tabler/icons-react";
import { useRequest } from 'ahooks';
import { getBizList } from "@/api/bizAdmin.ts";

const BizAdmin = () => {
  const { data: bizListData, loading } = useRequest(() => getBizList({
    page_no: 1,
    page_size: 999
  }), {
    retryCount: 2
  });

  const adaptData = (data) => {
    if (data) {
      return data.items.map((item) => {
        let links = []
        if (item.job) {
          links = item.job.split(',').map((subItem) => {
            return `https://${location.hostname}/?biz=${item.biz}&job=${subItem}`
          })
        }
        return {
          ...item,
          links
        }
      })
    }

    return []
  }

  return (
    <div>
      <ViewHeader searchPlaceholder='请输入' title="业务线">
        <StyledButton variant='contained' onClick={() => {
        }} startIcon={<IconPlus />} sx={{ borderRadius: 2, height: 40 }}>
          新增
        </StyledButton>
      </ViewHeader>
      <BizTable
        data={adaptData(bizListData)}
        isLoading={loading}
        setError={() => { }}
      />
    </div>
  )
}

export default BizAdmin;
