<template>
    <div class="kcross">
        <!-- k线顶部行情 -->
        <div class="kcross_title">
            <dl>
                <dt>
                    <span>{{symbolTick.symbol}}</span>
                    <span>{{symbolTick.lastprice}}</span>
                </dt>
                <dd>
                    ≈ {{symbolTick.rmb}} CNY
                </dd>
                <dd>
                    涨幅
                    <span :class="[symbolTick.rf>0?'uprfpre':symbolTick.rf<0?'downrfpre':'']">{{symbolTick.rfPre}}</span>
                </dd>
                <dd>
                    高
                    <span>{{symbolTick.high}}</span>
                </dd>
                <dd>
                    低
                    <span>{{symbolTick.low}}</span>
                </dd>
                <dd>
                    24H量
                    <span>{{symbolTick.vol}} {{symbol.bc}}</span>
                </dd>
            </dl>
        </div>
        <!-- trading view -->
        <div class = 'tv_chart_container' v-show="loading" v-loading="loading">

        </div>
        <div id = 'tv_chart_container' v-show="!loading">

        </div>
    </div>
</template>
<script>

import tvObj from '@/service/tradingview'
import utils from "@/util/util";
export default {
    data() {
        return {
           loading:true,
           interval:15
        }
    },
    created() {
        this.tv_inited = false
    },
    computed:{
        symbol(){
            let symbol = utils.symbol(this.$store.state.coins.symbol)
            return symbol
        },
        symbolTick(){
            return this.$store.state.coins.tick
        }
    },
    mounted(){
        this.interval = utils.getSet('coins_int')||this.$store.state.coins.kcross_int
        this.initTradeView();
        // this.initTopTick();
    },
    methods:{
        initTopTick(){
            // console.log('k线===')
            
        },
        initTradeView(){
            let msg = {
                goods_coin_id:2,
                settlement_coin_id:1
            }
            coinsApi.dishMath({params:msg}).then((res) => {
                this.$store.state.coins.k_history = []
                // console.log('k线数据=',res.payload)
                res.payload.forEach(em => {
                    let item = JSON.parse(em)
                    this.$store.state.coins.k_history.push(item)
                });
                let self = this
                if(!window.TradingView){
                    setTimeout(function(){
                        self.initTradeView()
                    },10)
                return
                }
                window.tvWidgetFT = new TradingView.widget({
                debug: false,
                autosize: true,
                symbol: this.$store.state.coins.symbol,
                interval: this.interval,
                container_id: "tv_chart_container",
                timezone: "Asia/Shanghai",
                datafeed: tvObj,
                // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
                library_path: "/static/charting_library/",
                locale: "zh",
                disabled_features: [
                    "edit_buttons_in_legend",
                    "timeframes_toolbar",
                    "go_to_date",
                    "volume_force_overlay",
                    'header_symbol_search',
                    "header_undo_redo",
                    // "header_interval_dialog_button",
                    "show_interval_dialog_on_key_press",
                    "control_bar",
                    "header_compare",
                    "header_chart_type",
                    "header_screenshot",
                    "header_saveload"
                ],
                enabled_features: [],
                custom_css_url: 'night.css',
                loading_screen: {
                    backgroundColor: "#060818",
                    foregroundColor: "#060818"
                },
                studies_overrides: {
                    "volume.volume.color.1": "#2fd258",
                    "bollinger bands.upper.color":"#0f0",
                    "bollinger bands.median.color":"#0f0",
                    "bollinger bands.lower.color":"#0f0"
                },
                widgetbar: {
                    details: true,
                    watchlist: true,
                },
                theme: "Dark",
                overrides: {
                    "symbolWatermarkProperties.color": "rgba(210,246,254, 0.1)",
                    "paneProperties.topMargin":"10",
                    "paneProperties.background": "#060817",
                    "paneProperties.vertGridProperties.color": "#454545",
                    "paneProperties.horzGridProperties.color": "#454545",
                    "scalesProperties.textColor": "#AAA",
                    "paneProperties.legendProperties.showLegend": false,
                    'scalesProperties.showLeftScale' : false,
                    'paneProperties.leftAxisProperties.autoScale':true,
                    'paneProperties.leftAxisProperties.autoScaleDisabled':false,
                    'paneProperties.legendProperties.showSeriesTitle': false
                },
                favorites: {
                    intervals: ["1", "5", "15", "30", "60", '360', "D", "W", "M"],
                    chartTypes: ["candles", "Line"]
                },
                drawings_access:{type:"black",
                    tools:[{name:"Regression Trend"}]
                }
            });
            tvWidgetFT.onChartReady(function(){
                self.loading = false
                self.tv_inited = true
                let a_chart = tvWidgetFT.chart()
                    // let btn = document.getElementById('header-toolbar-intervals')
                    // // console.log('测试==',btn)
                    // tvWidgetFT.createButton({align: "left"})
                    //             .attr('title', "分时")
                    //             .on('click', function (e) {
                    //                 a_chart.setResolution("1");
                    //                 a_chart.setChartType(3);  
                    // }).append(btn);
                    // console.log('tvWidgetFT==',tvWidgetFT.chart)
                    a_chart.createStudy('Moving Average', false, false, [5],null,{"plot.color.0":'#965fc4'})
                    a_chart.createStudy('Moving Average', false, false, [10],null,{"plot.color.0":'#84aad5'})
                    a_chart.createStudy('Moving Average', false, false, [30],null,{"plot.color.0":'#55b263'})
                    a_chart.createStudy('Moving Average', false, false, [60],null,{"plot.color.0":'#b7248a'})
                    a_chart.onIntervalChanged().subscribe(null, function(interval, obj) {
                        // console.log('interval==',interval,obj)
                        self.$store.state.coins.kcross_int = interval
                        utils.saveSet('coins_int',interval)
                    })
                    tvWidgetFT.subscribe('onAutoSaveNeeded',function(){
                        tvWidgetFT.save(function(obj){
                            // console.log('obj==',obj)
                        })
                    })
                    // tvWidgetFT.load(utils.getSet('studyData'+self.$route.query.Sym))
                })
            })
            


            // tvWidgetFT.onChartReady(() => {

            // const _self = this;
            // let chart = tvWidgetFT.chart();
            // const btnList = [
            //     {
            //     label:'分时',
            //     resolution: "1",
            //     chartType: 3
            //     },
            //     {

            //     label:'5min',
            //     resolution: "5",
            //     },
            //     {
            //     label:'15min',
            //     resolution: "15",
            //     },
            //     {
            //     label:'30min',
            //     resolution: "30",
            //     },
            //     {
            //     label:'1h',
            //     resolution: "60",
            //     }
            // ];
           
            // btnList.forEach(function (item) {
            //     let button = tvWidgetFT.createButton({
            //         align: "left"
            //     });
            //     item.resolution === tvWidgetFT._options.interval && updateSelectedIntervalButton(button);
            //     button.attr('class', "button " + item.class).attr("data-chart-type", item.chartType === undefined ? 8 : item.chartType).on('click', function (e) {
            //     let chartType = +button.attr("data-chart-type");
            //     if (chart.resolution() !== item.resolution) {
            //         chart.setResolution(item.resolution);
            //     }
            //     if (chart.chartType() !== chartType) {
            //         chart.setChartType(chartType);
            //     }
            //     updateSelectedIntervalButton(button);

            //     }).append(item.label);
            // });
            // function updateSelectedIntervalButton(button) {
            //     tvWidgetFT.selectedIntervalButton && tvWidgetFT.selectedIntervalButton.removeClass("selected");
            //     button.addClass("selected");
            //     tvWidgetFT.selectedIntervalButton = button;
            // }

            // });

            
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.kcross{
    display: inline-block;
    width:100%;
    height:520px;
    margin-bottom: 10px;
    border-radius: 3px;
    .kcross_title{
        display: inline-block;
        width:100%;
        height: 50px;
        line-height: 50px;
        background: $backGroup;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        dl{
            display: inline-block;
            height: 50px;
            line-height: 50px;
            dt{
                display: inline-block;
                font-size: 20px;
                font-weight: 700;
                span{
                    display: inline-block;
                    margin-left: 20px;
                }
            }  
            dd{
                display: inline-block;
                font-size: 14px;
                margin-left: 10px;
            }
        }
        
    }
    .uprfpre {
        color: $uprfpre;
    }

    .downrfpre {
        color: $downrfpre;
    }
}
#tv_chart_container,.tv_chart_container{
    height: 470px;
    width: 100%;
}

</style>