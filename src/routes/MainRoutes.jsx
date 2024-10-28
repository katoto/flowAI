import { lazy } from 'react'

// project imports
import MainLayout from '@/layout/MainLayout/index.tsx'
import Loadable from '@/ui-component/loading/Loadable'

const Home = Loadable(lazy(() => import('@/views/home')))
const BizAdmin = Loadable(lazy(() => import('@/views/bizAdmin')))
const PlatformFlows = Loadable(lazy(() => import('@/views/platformFlows')))

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/bizAdmin',
      element: <BizAdmin />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/platformflows',
      element: <PlatformFlows />
    },
  ]
}

export default MainRoutes
