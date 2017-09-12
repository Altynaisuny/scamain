import rent from '../pages/rent/rent.vue'
import error from '../pages/error/404.vue'
import login from '../pages/login/login.vue'
import rentInfo from '../pages/rentInfo/rentInfo.vue'
import register from '../pages/register/goodsRegister.vue'
import workBench from '../pages/workBeach.vue'
import goodsInfo from '../pages/goodsInfo/goodsInfo.vue'
import charging from '../pages/charging/charging.vue'
import level from '../pages/level/level.vue'
import shopManage from '../pages/shopManage/shopManage.vue'
import userManage from '../pages/userManage/userManage.vue'
import category from '../pages/register/category.vue'
import recharge from '../pages/transaction/recharge.vue'
import cashFlow from '../pages/transaction/cashFlow.vue'
import cashFlowAll from '../pages/transaction/cashFlowAll.vue'
import modifyPassword from '../pages/password/Modify.vue'
import user from '../pages/user/user.vue'

export default [
  {
    path:'/',
    component:login
  },
  {
    path:'/index.html',
    component:login
  },
  {
    path:'/index',
    component:login
  },
  {
    path:'/rent',
    component:rent
  },
  {
    path:'/workBeach/',
    component:workBench,
    children:[
      {
        path:'rentInfo',
        component:rentInfo
      },
      {
        path:'goodsInfo',
        component:goodsInfo
      },
      {
        path:'register',
        component:register
      },
      {
        path:'charging',
        component:charging
      },
      {
        path:'level',
        component:level
      },
      {
        path:'shopManage',
        component:shopManage
      },
      {
        path:'userManage',
        component:userManage
      },
      {
        path:'category',
        component:category
      },
      {
        path:'recharge',
        component:recharge
      },
      {
        path:'cashFlow',
        component:cashFlow
      },
      {
        path:'cashFlowAll',
        component:cashFlowAll
      },
      {
        path:'modifyPassword',
        component:modifyPassword
      },
      {
        path:'user',
        component:user
      }
    ]
  },
  {
    path:'*',
    component:error
  }
]