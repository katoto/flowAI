// assets
import {
  IconUsersGroup,
  IconHierarchy,
  IconHome
} from '@tabler/icons-react'


// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [{
      id: 'home',
      title: '首页',
      type: 'item',
      url: '/home',
      icon: IconHome,
      breadcrumbs: true
    },
    {
      id: 'bizAdmin',
      title: '业务线',
      type: 'item',
      url: '/bizAdmin',
      icon: IconUsersGroup,
      breadcrumbs: true
    },
    {
      id: 'platformflows',
      title: '工作台',
      type: 'item',
      url: '/platformflows',
      icon: IconHierarchy,
      breadcrumbs: true
    },
  ]
}

export default dashboard
