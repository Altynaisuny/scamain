import rent from '../pages/rent/rent.vue'
import error from '../pages/error/404.vue'
import login from '../pages/login/login.vue'
import vip from '../pages/vip/vip.vue'
import rentInfo from '../pages/rentInfo/rentInfo.vue'
import register from '../pages/register/goodsRegister.vue'
import blackList from '../pages/blackList/blackList.vue'
import workBench from '../pages/workBeach.vue'
import goodsInfo from '../pages/goodsInfo/goodsInfo.vue'
import charging from '../pages/charging/charging.vue'
import level from '../pages/level/level.vue'
import shopManage from '../pages/shopManage/shopManage.vue'
import userManage from '../pages/userManage/userManage.vue'


export default [
  {
    path:'/',
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
        path:'blackList',
        component:blackList
      },
      {
        path:'vip',
        component:vip
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
      }
    ]
  },
  {
    path:'*',
    component:error
  }
]