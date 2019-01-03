  import service_k from '@/service/tradingview'
  import utils from "@/util/util";

  const state = {
      iswebsocketOpen: false,
      symbol: 'KT/ETH',
      tick: {
          symbol: 'KT/ETH',
          lastprice: '0.00000000',
          rmb: '0.00',
          rf: 0,
          rfPre: '0.00%',
          high: '0.00000000',
          low: '0.00000000',
          vol: '0'
      },
      panel: {
          price: '',
          vol: '',
          ispriceUse: false,
          isvolUse: false
      },
      kcross_int: '15', // 15分钟
      prz: {
          ETH: 0, //ETH价格
          KT: 0,
          USDT: 6.9
      },

      depthChange: '5_KT/ETH',

      lastTradeData: null, //左边成交数据
      lastCurOrder: null, //最新历史委托
      buyfives: null, //五档 买
      buybests: null, //100档 买
      buyalls: null, //所有档 买
      sellfives: null, //五档 卖
      sellbests: null, //100档 卖
      sellalls: null, //所有档 卖


      isbuyfives: false, //五档 买
      isbuybests: false, //100档 买
      isbuyalls: false, //所有档 买
      issellfives: false, //五档 卖
      issellbests: false, //100档 卖
      issellalls: false, //所有档 卖
      islastCurOrder: false, //最新历史委托
      isHistoryChange: false, //最新历史委托

      k_history: [], //k线历史
      k_lastdata: null, //最新k线数据

      lastPanelprice: {
          buy: null,
          sell: null
      },

      loading: false,
      firstDate: true
  };



  // getters
  const getters = {

  };


  // actions
  const actions = {
      init({ commit, dispatch, state }) {
          commit('initEth');
          //   ws连接
          let arr = ['situations', 'fives', 'bests', 'alls', 'sellfives', 'sellbests', 'sellalls', 'deals', 'dishs', 'entrusts'];
          //   arr = []
          arr.forEach((item) => {
              commit('initWebsocket', item);
          })
          setInterval(() => {
              if (!state.iswebsocketOpen) {
                  arr.forEach((item) => {
                          commit('initWebsocket', item);
                      })
                      //   console.log('断线重连。。。。')
              }
          }, 6000);
          //ETH数据

      },
  };

  // mutations
  const mutations = {
      initEth(context) {
          let ws = new WebSocket("wss://market01.gmex.io/v1/market");
          ws.onopen = function() {
              ws.send(`{"req":"Sub","rid":"20","expires":1537708219903,"args":["index_GMEX_CI_ETH"]}`);
          };
          ws.onmessage = function(evt) {
              if (evt && evt.data) {
                  let a = JSON.parse(evt.data)
                  context.prz['ETH'] = a.data.Prz
                  if (Number(context.tick.lastprice) != 0 && Number(context.prz['ETH'] != 0)) {
                      context.prz[utils.symbol(context.symbol).bc] = Number((Number(context.prz['ETH']) * Number(context.tick.lastprice)))
                      context.tick['rmb'] = (context.tick['lastprice'] * context.prz[utils.symbol(context.symbol).qc] * context.prz['USDT']).toFixed(2) || 0
                  }
              }
          };
          ws.onclose = function() {};
      },



      //100档位
      depthChange(context, msg) {
          context.depthChange = msg
      },

      //   初始化websocket
      initWebsocket(context, type) {
          let heartCheck = {
              timeout: 3000,
              timeoutObj: null,
              serverTimeoutObj: null,
              start: () => {
                  let self = this;
                  this.timeoutObj && clearTimeout(this.timeoutObj);
                  this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
                  this.timeoutObj = setTimeout(() => {
                      ws.send("HeartBeat");
                      self.serverTimeoutObj = setTimeout(() => {
                          //   ws.close();
                      }, self.timeout);
                  }, this.timeout)
              }
          }
          let ws = new WebSocket("ws://prejys.sogukz.com:9505?" + type + "=1");
          if (type == 'entrusts') {
              ws = new WebSocket("ws://prejys.sogukz.com:9505?" + type + "=8"); //8为用户ID
          }
          ws.onopen = function() {
              context.iswebsocketOpen = true
                  //   heartCheck.start()
                  //   console.log("数据已iswebsocketOpen...");
          };
          ws.onmessage = function(evt) {
              console.log("数据已接收...", type, JSON.parse(evt.data));
              let evtData = JSON.parse(evt.data)
              let data
              if (type == 'situations' && context.firstDate) {
                  context.firstDate = false
                  data = JSON.parse(evtData);
              } else {
                  console.log('evtData.data==', evtData, evtData.data)
                  if (type == 'situations') {
                      data = evtData.data ? JSON.parse(evtData.data) : JSON.parse(evtData);
                  } else {
                      data = evtData.data;
                  }
              }
              if (type == 'situations') { //交易行情
                  //   console.log('交易行情==', data)
                  if (!data) return
                  context.tick = {
                      symbol: context.symbol,
                      lastprice: data.proportion || 0,
                      rmb: (data.proportion * context.prz[utils.symbol(context.symbol).qc] * context.prz['USDT']).toFixed(2) || 0,
                      rfPre: ((data.gains) * 100).toFixed(2) + '%' || '0.00%',
                      rf: data.gains || 0,
                      high: data.high || 0,
                      low: data.low || 0,
                      vol: data.tradeNum || 0
                  }
                  console.log('context.tick ==', context.tick, context.prz[utils.symbol(context.symbol).bc])
              } else if (type == 'fives') { //五档数据推送 买
                  context.buyfives = data
                  if (data && data.length != 0) {
                      context.lastPanelprice.buy = data[data.length - 1].proportion || 0
                  }
                  context.isbuyfives = true
              } else if (type == 'bests') { //100档数据推送 买
                  //   console.log('100 买 ==', data)
                  context.buybests = data
                  context.isbuybests = true
              } else if (type == 'alls') { //所有档数据推送 买
                  //   console.log('所有档 买 ==', data)
                  context.buyalls = data
                  context.isbuyalls = true
              } else if (type == 'sellfives') { //五档数据推送 卖
                  //   console.log('五档 卖 ==', data)
                  context.sellfives = data
                  if (data && data.length != 0) {
                      context.lastPanelprice.sell = data[data.length - 1].proportion || 0
                  }
                  context.issellfives = true
              } else if (type == 'sellbests') { //100档数据推送 卖
                  //   console.log('100档 卖==', data)
                  context.sellbests = data
                  context.issellbests = true
              } else if (type == 'sellalls') { //所有档数据推送 卖
                  //   console.log('所有档 卖==', data)
                  context.sellalls = data
                  context.issellalls = true
              } else if (type == 'deals') { //实时成交数据
                  //   console.log('成交数据==', data)
                  context.lastTradeData = data
              } else if (type == 'dishs') { //实时成交k线和柱状图数据推送
                  context.k_lastdata = data
                      //   console.log('实时成交k线和柱状图数据==', type, context.k_lastdata)
                  service_k.onKline(context.k_lastdata)
              } else if (type == 'entrusts') { //推送历史委托
                  console.log('推送历史委托=', data)
                  context.lastCurOrder = data
                  context.islastCurOrder = true
              }

          };
          ws.onclose = function() {
              //   console.log("连接已关闭...");
              context.iswebsocketOpen = false
          };

      },
      //   下单版赋值价格
      kkcToPrice(context, val) {
          context.panel.price = val
          context.panel.ispriceUse = true
              //   console.log("ispriceUse...", context.panel);
      },
      //   下单版赋值数量
      ethTovol(context, val) {
          context.panel.vol = val
          context.panel.isvolUse = true
              //   console.log("isvolUse...", context.panel);
      },
      //   获取买盘六档最后一个
      buyLast(context, val) {
          context.lastPanelprice.buy = val
      },
      //   获取卖盘六档最后一个
      sellLast(context, val) {
          context.lastPanelprice.sell = val
      }

  }

  export default {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
  }