import store from '@/store/index' // 引入store
let tv = {};


//初始化tradeview的回调函数,设置一些基本的格式
tv.onReady = function(cb) {
    setTimeout(() => {
        cb({
            supports_timescale_marks: true,
            supported_resolutions: ["1", "5", "15", "30", "60", '360', "D", "W", "M"],
            supports_time: true,

        })
    }, 0)
}


//解析获取到的symbol
tv.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        // console.log("symbolName", symbolName);
        var info = {
            "name": symbolName,
            "timezone": "Asia/Shanghai",
            "minmov": 1,
            "minmov2": 0,
            "pointvalue": 1,
            "session": "24x7",
            "has_no_volume": false,
            "description": '',
            "type": "bitcoin",
            "has_intraday": true,
            "has_seconds": true,
            "seconds_multipliers": [60],
            "supported_resolutions": ["1", "5", "15", "30", "60", '360', "D", "W", "M"],
            "intraday_multipliers": ["1", "5", "15", "30", "60", '360', "D", "W", "M"],
            "has_empty_bars": true,
            "force_session_rebuild": false,
            "data_status": "streaming",
            "pricescale": 20,
            "ticker": symbolName
        }
        setTimeout(() => { onSymbolResolvedCallback(info) }, 0)
    }
    // let i = 0
    // setInterval(() => {
    //     if (i >= 30) {
    //         i = 0
    //     }
    //     if (d && tv.time) {
    //         let tick = {
    //             PrzClose: Math.random() * 10 + 4,
    //             PrzOpen: Math.random() * 10 + 2,
    //             PrzHigh: Math.random() * 10 + 10,
    //             PrzLow: Math.random() * 10 + 1,
    //             Volume: Math.random() * 1,
    //             Sec: Number(tv.time) + 1000
    //         }
    //         tv.onKline({
    //             name: 'KKC_ETH',
    //             tick: tick
    //         })
    //         tv.time = tick.Sec
    //         i++
    //     }
    // }, 1000)


tv.onKline = function(msg) { //添加新数据
        // console.log('初始化=', this.inited)
        if (!this.inited) return
        if (!msg) return
        if (this.onRealtimeCallback && msg) {
            let tick = {
                    time: msg.created_at * 1000,
                    close: Number(msg.proportion),
                    open: Number(msg.proportion),
                    high: Number(msg.proportion),
                    low: Number(msg.proportion),
                    volume: Number(msg.trade_num)
                        // currency_type 交易类型
                }
                // console.log('当前时间==', new Date(tick.time))
            this.onRealtimeCallback(tick)
        }
    }
    //通过日期范围获取历史K线数据
tv.getBars = function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
    this.inited = true
        // let offset = null;
        // if (Number(resolution)) {
        //     offset = 60 * Number(resolution);
        // } else if (resolution.toLowerCase().indexOf('w') > -1) {
        //     offset = 60 * 60 * 24 * 7;
        // } else if (resolution.toLowerCase().indexOf('d') > -1) {
        //     offset = 60 * 60 * 24;
        // } else if (resolution.toLowerCase().indexOf('m') > -1) {
        //     offset = 60 * 60 * 24 * 7 * 30;
        // }

    let kdatas = [];
    let payload = store.state.coins.k_history
    let time = null
    if (payload && payload.length > 0) {
        for (let index = 0; index < payload.length; index++) {
            let it = payload[index]
            if (time == it.created_at) continue
            time = it.created_at
            kdatas.push({
                time: it.created_at * 1000,
                close: Number(it.proportion),
                open: Number(it.proportion),
                high: Number(it.proportion),
                low: Number(it.proportion),
                volume: Number(it.trade_num)
            })
            if (index == payload.length - 1) {
                kdatas.push({
                    time: new Date().getTime(),
                    close: Number(it.proportion),
                    open: Number(it.proportion),
                    high: Number(it.proportion),
                    low: Number(it.proportion),
                    volume: 0
                })
            }
        }
        // console.log('k线')
    } else {
        onErrorCallback()
    }
    tv.rtnKdatas(symbolInfo, resolution, from, to, kdatas, onHistoryCallback, firstDataRequest)
}


tv.getTimescaleMarks = function(symbolInfo, startDate, endDate, onDataCallback, resolution) {
    // console.log("getTimescaleMarks", this.getTimescaleMarks, this);
}


tv.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    this.onRealtimeCallback = onRealtimeCallback //用来实时更新数据
}

tv.getServerTime = function(callback) {
    callback(Math.floor(new Date().getTime() / 1000))
}

tv.unsubscribeBars = function(subscriberUID) {

}

tv.calculateHistoryDepth = function(resolution, resolutionBack, intervalBack) {

}
tv.rtnKdatas = function(sys, resolution, mfrom, mto, kdatas, onHistoryCallback, firstDataRequest) {
    if (!this.inited) return
    let time = 0
    mfrom = mfrom < 100000000000 ? mfrom * 1000 : mfrom
    mto = mto < 100000000000 ? mto * 1000 : mto
    let data = []
    let from = -1,
        to = kdatas.length - 1;
    for (let i = 0; i < kdatas.length; i++) {
        if (from == -1 && mfrom < kdatas[i].time) {
            from = i;
        }
        if (to == kdatas.length - 1 && mto < kdatas[i].time) {
            to = i - 1;
        }
    }
    if (firstDataRequest) {
        to = kdatas.length - 1
    }
    if (from != -1 && to >= 0) {
        data = kdatas.slice(from, to + 1).sort((a, b) => {
            // console.log(a.time - b.time)
            return a.time - b.time
        })
        onHistoryCallback(data, {
            noData: false
        })
    } else {
        onHistoryCallback([], {
            noData: true
        })
    }
    return
}
export default tv;