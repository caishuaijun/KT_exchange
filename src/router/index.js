import Vue from 'vue'
import Router from 'vue-router'
const homePage = r =>
    require.ensure([], () => r(require('@/views/homePage/homePage')), 'homePage')

const login = r =>
    require.ensure([], () => r(require('@/views/login/login')), 'login')

//现货
const spot = r => require.ensure([], () => r(require('@/views/spot/spot')), 'spot')

//法币
const buy_kt = r => require.ensure([], () => r(require('@/views/buy_kkc/buy_kkc')), 'buy_kkc')

//一键发币
const oneButtonCoin = r => require.ensure([], () => r(require('@/views/oneButtonCoin/oneButtonCoin')), 'oneButtonCoin')

//智能合约
const smartContracts = r => require.ensure([], () => r(require('@/views/smartConModules/smartContracts')), 'smartContracts')

//智能合约模块
const smartConModules = r => require.ensure([], () => r(require('@/views/smartConModules/smartConModules')), 'smartConModules')

//行为激励
const behavior = r => require.ensure([], () => r(require('@/views/smartConModules/behavior')), 'behavior')

//内部融资
const financing = r => require.ensure([], () => r(require('@/views/smartConModules/financing')), 'financing')

//福利兑换
const welfare = r => require.ensure([], () => r(require('@/views/smartConModules/welfare')), 'welfare')

//营业分红
const dividends = r => require.ensure([], () => r(require('@/views/smartConModules/dividends')), 'dividends')

//股权兑换
const stockExchange = r => require.ensure([], () => r(require('@/views/smartConModules/stockExchange')), 'stockExchange')

//100挡行情
const hundred = r => require.ensure([], () => r(require('@/views/spot/hundred')), 'hundred')

//历史委托
const orderHistoryAll = r => require.ensure([], () => r(require('@/views/spot/orderHistoryAll')), 'orderHistoryAll')

//一键发币订单详情
const coinsDetails = r => require.ensure([], () => r(require('@/views/coinsDetails/coinsDetails')), 'coinsDetails')


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '*',
            redirect: '/homepage/spot'
        },
        {
            path: '/homepage',
            redirect: '/homepage/spot'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/homepage',
            name: 'homepage',
            component: homePage,
            children: [{
                    path: 'spot',
                    name: 'spot',
                    component: spot,
                },
                {
                    path: 'buy_kt',
                    name: 'buy_kt',
                    component: buy_kt,
                },
                {
                    path: 'hundred',
                    name: 'hundred',
                    component: hundred,
                },
                {
                    path: 'orderHistoryAll',
                    name: 'orderHistoryAll',
                    component: orderHistoryAll,
                },
                {
                    path: 'coinsDetails',
                    name: 'coinsDetails',
                    component: coinsDetails,
                    children: [{
                        path: 'spot',
                        name: 'spot',
                        component: spot,
                    }]
                },
                {
                    path: 'coinsDetails',
                    name: 'coinsDetails',
                    component: coinsDetails,
                },
                {
                    path: 'smartContracts',
                    name: 'smartContracts',
                    component: smartContracts,
                },
                {
                    path: 'smartConModules',
                    name: 'smartConModules',
                    component: smartConModules,
                },
                {
                    path: 'behavior',
                    name: 'behavior',
                    component: behavior,
                },
                {
                    path: 'financing',
                    name: 'financing',
                    component: financing,
                },
                {
                    path: 'welfare',
                    name: 'welfare',
                    component: welfare,
                },
                {
                    path: 'dividends',
                    name: 'dividends',
                    component: dividends,
                },
                {
                    path: 'stockExchange',
                    name: 'stockExchange',
                    component: stockExchange,
                },
                {
                    path: 'oneButtonCoin',
                    name: 'oneButtonCoin',
                    component: oneButtonCoin,
                },
            ]
        },
    ]
})

export default router