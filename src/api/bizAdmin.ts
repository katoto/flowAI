import client from './client'

export const getBizList = (data) => {
  // client.post(`/v1/biz/list`, data)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "items": [
            {
                "biz": "sr2",
                "content": "class Sr2WsNamespace(WsNamespace):\n\n    def __init__(self, biz):\n        super().__init__(assemble_namespace(biz), biz)\n\n    def load_user_job(self, account: str, appointed_job: Optional[list[str]]) -> list[str]:\n        return super().load_user_job(account, appointed_job)\n        \noutput_context.update({'Sr2WsNamespace': Sr2WsNamespace})",
                "created_at": "2024-09-12T18:06:22",
                "created_by": "zg.xie",
                "id": 11,
                "is_valid": true,
                "job": "default,dev",
                "jump_url": "https://",
                "name": "sr2",
                "updated_at": "2024-10-15T15:32:12",
                "updated_by": "zg.xie"
            },
            {
                "biz": "sk",
                "content": "class SkWsNamespace(WsNamespace):\n\n    def __init__(self, biz):\n        super().__init__(assemble_namespace(biz), biz)\n\n    def load_user_job(self, account: str, appointed_job: Optional[list[str]]) -> list[str]:\n        return inner_sk.get_user_job().get('job')\n\n    def biz_init_entrance(self, biz_id: Optional[str] = None) -> Optional[dict]:\n        \"\"\"\n        根据biz_type + biz_id加载业务数据\n        \"\"\"\n        return inner_sk.load_biz_data_from_cache(biz_id)\noutput_context.update({'SkWsNamespace': SkWsNamespace})",
                "created_at": "2024-05-20T11:02:45",
                "created_by": "zg.xie",
                "id": 4,
                "is_valid": true,
                "job": "invite,follow_board,small_car_knowledge,redline",
                "jump_url": "https://",
                "name": "司库",
                "updated_at": "2024-10-18T17:14:43",
                "updated_by": "zg.xie"
            }
        ],
        "page_no": 1,
        "page_size": 999,
        "total_size": 4
    })
    }, 1000)
  })
}

export const createNewChatflow = (body) => client.post(`/chatflows`, body)
