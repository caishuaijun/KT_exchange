let utils = {}

utils.dateFtt = (fmt, date) => {
    var o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

utils.fix = (value, idx) => { //值 小数位数
    let it = Number(value).toFixed(idx + 1)
    it = it.substring(0, it.length - 1)
    return it
};

//切割深度合并小数位数
utils.spliceFloat = (arr, p, t) => {
    let c = []
    let a = Object.assign([], arr);
    for (let i = a.length - 1; i >= 0; i--) {
        let proportion = String(Number(a[i].proportion).toFixed(9))
        let pvalue = Number(proportion.split('.')[0] + '.' + proportion.split('.')[1].slice(0, p))
        let b = {
            proportion: pvalue,
            vol: Number(a[i].tradeNum) - Number(a[i].tradingNum)
        }
        let float = Number(1 / Math.pow(10, p).toFixed(p))
        if (t == -1 && p != 8) {
            if (Number(proportion.split('.')[1].slice(p, 9)) != 0) { //确保后几位不是零
                b.proportion = Number((pvalue + float).toFixed(p))
            }
        }
        c.unshift(b)
    }
    let result = [],
        hash = {},
        idx = 0
    for (let i = 0; i < c.length; i++) {
        let elem = c[i].proportion;
        if (!hash[elem]) {
            idx++
            result.push({ proportion: Number(c[i].proportion).toFixed(p), vol: utils.fix(c[i].vol, 8) });
            hash[elem] = true;
        } else {
            result[idx - 1].vol = Number(result[idx - 1].vol) + Number(c[i].vol, 8)
        }
    }
    return result
};

// 切割计价币基础币
utils.symbol = (symbol) => {
    let sym = symbol.split('/')
    return { bc: sym[0] || 'KT', qc: sym[1] || 'ETH' }
};

utils.saveSet = function(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
}

utils.getSet = function(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

export default utils