import client from './client'

/**
 * 查询当前业务当前身份的分类列表
 */
const initData = [
  {
      "biz": "sr",
      "created_at": "2024-10-24T16:27:38",
      "created_by": "jiawen.peng",
      "extra": "",
      "id": 56,
      "is_valid": true,
      "job": "default",
      "type": "guang_new_bee",
      "updated_at": "2024-10-24T16:27:38",
      "updated_by": "jiawen.peng"
  },
  {
      "biz": "sr",
      "created_at": "2024-10-18T17:40:42",
      "created_by": "jiawen.peng",
      "extra": "{\n  \"a\": \"1231231223\"\n}",
      "id": 54,
      "is_valid": true,
      "job": "default",
      "type": "ext_3",
      "updated_at": "2024-10-22T16:21:17",
      "updated_by": "jiawen.peng"
  },
  {
      "biz": "sk",
      "created_at": "2024-09-18T14:16:14",
      "created_by": "zg.xie",
      "extra": "{\"biz_id\":\"116252330967040\"}",
      "id": 17,
      "is_valid": true,
      "job": "small_car_knowledge",
      "type": "invite",
      "updated_at": "2024-10-18T17:13:48",
      "updated_by": "zg.xie"
  },
  {
      "biz": "sr2",
      "created_at": "2024-09-20T15:22:29",
      "created_by": "zg.xie",
      "extra": "{\"name\":\"技术测试{biz_id}\",\"biz_id\":\"123\",\"extra\":{\"timeType\":1,\"startDate\":\"2024-09-24 13:38:46\",\"endDate\":\"2024-09-24 13:38:46\",\"businessType\":1,\"dataType\":0,\"departIds\":[2404366],\"accounts\":[]}}",
      "id": 10,
      "is_valid": true,
      "job": "default",
      "type": "dev2",
      "updated_at": "2024-10-18T15:41:59",
      "updated_by": "zg.xie"
  },
  {
      "biz": "sr",
      "created_at": "2024-09-20T11:30:32",
      "created_by": "jiawen.peng",
      "extra": "",
      "id": 9,
      "is_valid": true,
      "job": "default",
      "type": "jiawen.test",
      "updated_at": "2024-09-20T11:30:32",
      "updated_by": "jiawen.peng"
  },
  {
      "biz": "sr",
      "created_at": "2024-09-19T11:19:56",
      "created_by": "jiawen.peng",
      "extra": "",
      "id": 6,
      "is_valid": true,
      "job": "default",
      "type": "test3",
      "updated_at": "2024-09-19T11:20:03",
      "updated_by": "jiawen.peng"
  }
]
export const getBizTypeList = (data) => {
  // client.post(`/v1/biz/type/list`, data)
  return new Promise((resolve) => {
    if(!localStorage.getItem('bizTypeList')) {
      localStorage.setItem('bizTypeList', JSON.stringify(initData))
    }
    const currBizTypeList = JSON.parse(localStorage.getItem('bizTypeList')) || []

    setTimeout(() => {
      resolve({
        "items": currBizTypeList,
        "page_no": 1,
        "page_size": 999,
        "total_size": 30
    })
    }, 500)
  })
}

export const mockBizTypeItem = (obj) => {
  const currBizTypeList = JSON.parse(localStorage.getItem('bizTypeList')) || []
  currBizTypeList.push(
    {
      "created_at": new Date().getTime(),
      "created_by": "zg.xie",
      "id": new Date().getTime(),
      "job": "default",
      "updated_by": "zg.xie",
      ...obj
  }
  )
  localStorage.setItem('bizTypeList', JSON.stringify(currBizTypeList))

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 300)
  })
}
