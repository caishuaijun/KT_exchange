const configParams = {
    getAssets: 'market/getAssets', //获取资金
    archivesMouths: 'market/archivesMouths', //深度
    dishMath: 'market/dishMath', //k线盘口
    getDealOrder: 'market/getDealOrder', //实时成交

    sendOrder: 'order', //下单
    currentEntrust: 'order/currentEntrust', //当前委托
    historyEntrust: 'order/historyEntrust', //历史委托
    cancelOrder: 'order/cancelOrder', //单个撤单
    cancelOrders: 'order/cancelOrders', //单个撤单
    subOrders: 'order/subOrders', //二级子订单接口
    allhistoryEntrust: 'order/allhistoryEntrust', //全部历史委托订单接口


    addUser: 'user', //添加用户
    userList: 'user/usersInfo', //添加用户


    // 智能合约
    getcompanyinfo: 'deploy/getcompanyinfo', //获取企业名称
    scencelist: 'deploy/scencelist', //模版导航栏以及配置
    behavioradd: 'deploy/behavioradd', //添加行为激励
    behaviorlist: 'deploy/behaviorlist', //行为激励列表
    behavioredit: 'deploy/behavioredit', //编辑行为激励数据
    searchbehavior: 'deploy/searchbehavior', //搜索行为激励数据
    importbehavior: 'deploy/importbehavior', //行为激励数据导入
    delbehavior: 'deploy/delbehavior', //行为删除
    generate: 'deploy/generate', //生产代币
    getkkcinfo: 'deploy/getkkcinfo', //用户账户kkc数量和手续费的详情
    release: 'deploy/release', //收取用发币手续费
    addFinancing: 'financing/internalfinancing', //添加 内部融资和股权兑换行为
    submitFinancing: 'deploy/behavioredit', //编辑 行为激励数据（股权兑换，内部融资）
    delempty: 'deploy/delempty', //删除福利兑换和利润分红

    linedUp: 'financing/linedup', //列队记录
    deployhistory: 'financing/deployhistory', //部署历史
    enterpriceinfo: 'financing/enterpriceinfo', //查询代币基本信息
    querysign: 'financing/querysign', //查询代币符号是否存在
    deleteAll: 'financing/deleteAll', //一键撤销部署
    tokensdetails: 'financing/tokensdetails', //查询代币 部署详情
    querytransactionstatus: 'deploy/querytransactionstatus', //查询代币 部署成与否



    buttonCoins: 'api/contract/deploy', //发币
    ethAddress: 'api/create/eth/address', //eth地址
    ethBalance: 'api/account/ethereum/balance' //eth余额


};

export default configParams;