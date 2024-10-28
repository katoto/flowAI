// project imports
import config from '@/config'
import queryString from 'query-string';

// action - state management
import * as actionTypes from '../actions'

const getBizName = () => {
  const urlSearchObj = queryString.parse(location.search);
  if (urlSearchObj && urlSearchObj.biz) {
    localStorage.setItem('bizName', String(urlSearchObj.biz))
    return urlSearchObj.biz
  }
  return localStorage.getItem('bizName') || 'admin'
}
const getJobName = () => {
  const urlSearchObj = queryString.parse(location.search);
  if (urlSearchObj && urlSearchObj.job) {
    localStorage.setItem('jobName', String(urlSearchObj.job))
    return urlSearchObj.job
  }
  return localStorage.getItem('jobName') || ''
}

console.log('--biz--', getBizName())
console.log('--job--', getJobName())


export const initialState = {
  isOpen: [], // for active default menu
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  isDarkMode: localStorage.getItem('isDarkMode') === 'true' ? true : false,
  bizName: getBizName() || 'admin', // 业务切换
  jobName: getJobName() || ''
}

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id
  switch (action.type) {
    case actionTypes.MENU_OPEN: {
      id = action.id
      return {
        ...state,
        isOpen: [id]
      }
    }
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      }
      case actionTypes.SET_DARKMODE:
        return {
          ...state,
          isDarkMode: action.isDarkMode
        }
        default:
          return state
  }
}

export default customizationReducer
