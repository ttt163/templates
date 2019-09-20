// import Loadable from "react-loadable";
// import LoadingComp from "../components/loadingComp";
import asyncComponent from '../components/asyncComponent'
// import UserAccount from '../pages/userAccount'
// import RefundOrder from '../pages/refundOrder'

/**
 * Author：tantingting
 * Time：2019/8/12
 * Description：Description
 */
const UserAccount = asyncComponent(() => import(/* webpackChunkName: "userAccount" */ '../pages/userAccount'))
const RefundOrder = asyncComponent(() => import(/* webpackChunkName: "refundOrder" */ '../pages/refundOrder'))
export const pageRouters = {
  blankLayout: [],
  headerLayout: [],
  baseLayout: [
    {
      key: 'userAccount',
      path: '/userAccount',
      label: '账户管理',
      icon: 'user',
      component: UserAccount
    },
    {
      key: 'refundOrder',
      path: '/refundOrder',
      icon: 'solution',
      label: '退款订单管理',
      component: RefundOrder
    }
  ]
}
