const rent = r => require.ensure([], () => r(require('../pages/rent/rent.vue')), 'rent');
const error = r => require.ensure([], () => r(require('../pages/error/404.vue')), 'error');
const login = r => require.ensure([], () => r(require('../pages/login/login.vue')), 'login');
const rentInfo = r => require.ensure([], () => r(require('../pages/rentInfo/rentInfo.vue')), 'rentInfo');
const register = r => require.ensure([], () => r(require('../pages/register/goodsRegister.vue')), 'register');
const workBench = r => require.ensure([], () => r(require('../pages/workBeach.vue')), 'workBench');
const goodsInfo = r => require.ensure([], () => r(require('../pages/goodsInfo/goodsInfo.vue')), 'goodsInfo');
const charging = r => require.ensure([], () => r(require('../pages/charging/charging.vue')), 'charging');
const level = r => require.ensure([], () => r(require('../pages/level/level.vue')), 'level');
const shopManage = r => require.ensure([], () => r(require('../pages/shopManage/shopManage.vue')), 'shopManage');
const userManage = r => require.ensure([], () => r(require('../pages/userManage/userManage.vue')), 'userManage');
const category = r => require.ensure([], () => r(require('../pages/register/category.vue')), 'category');
const recharge = r => require.ensure([], () => r(require('../pages/transaction/recharge.vue')), 'recharge');
const cashFlow = r => require.ensure([], () => r(require('../pages/transaction/cashFlow.vue')), 'cashFlow');
const cashFlowAll = r => require.ensure([], () => r(require('../pages/transaction/cashFlowAll.vue')), 'cashFlowAll');
const modifyPassword = r => require.ensure([], () => r(require('../pages/password/Modify.vue')), 'modifyPassword');
const user = r => require.ensure([], () => r(require('../pages/user/user.vue')), 'user');

export default [
	{
		path: '/',
		component: login
	},
	{
		path: '/index.html',
		component: login
	},
	{
		path: '/index',
		component: login
	},
	{
		path: '/rent',
		component: rent
	},
	{
		path: '/workBeach/',
		component: workBench,
		children: [
			{
				path: 'rentInfo',
				component: rentInfo
			},
			{
				path: 'goodsInfo',
				component: goodsInfo
			},
			{
				path: 'register',
				component: register
			},
			{
				path: 'charging',
				component: charging
			},
			{
				path: 'level',
				component: level
			},
			{
				path: 'shopManage',
				component: shopManage
			},
			{
				path: 'userManage',
				component: userManage
			},
			{
				path: 'category',
				component: category
			},
			{
				path: 'recharge',
				component: recharge
			},
			{
				path: 'cashFlow',
				component: cashFlow
			},
			{
				path: 'cashFlowAll',
				component: cashFlowAll
			},
			{
				path: 'modifyPassword',
				component: modifyPassword
			},
			{
				path: 'user',
				component: user
			}
		]
	},
	{
		path: '*',
		component: error
	}
]