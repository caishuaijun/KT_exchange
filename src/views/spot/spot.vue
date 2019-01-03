<template>
    <div class="spot">
        <!-- 币币左侧部分 -->
        <div class="spot_left">
            <!-- 资产部分组件 -->
            <k-wallet></k-wallet>
            <!-- 市场列表 -->
            <k-spotlist></k-spotlist>
             <!-- 实时成交 -->
            <div class="tradeList">
                <k-trade></k-trade>
            </div>
            <!-- 公告 -->
            <k-notice></k-notice>
            <!-- 币种资料 -->
            <k-info></k-info>
        </div>
         <!-- 币币右侧部分 -->
        <div class="spot_right">
            <!-- k线图 -->
            <k-cross></k-cross>
            <!-- 下单版和盘口 -->
            <div class="panel_container">
                <div class="trade_wrap">
                    <!-- 下单版 -->
                    <div class="panel">
                        <div class="panel_head">
                            <div class="panel_change">
                                <span :class="[activeName=='limited' ? 'panel_line' : '', 'panel_tab']" @click="handleClick('limited')">限价交易</span>
                                <span :class="[activeName=='market' ? 'panel_line' : '', 'panel_tab']" @click="handleClick('market')">市价交易</span>
                            </div>
                            <el-tooltip placement="top-end" effect="light">
                                <div slot="content">每笔交易，收取交易总额的<br/>0.005作为手续费</div>
                                <div class="panel_fees">
                                    费率
                                </div>
                             </el-tooltip>
                        </div>
                        <!-- 过渡线条 -->
                        <div class="gradient">

                        </div>
                        <div class="panel_content">
                            <k-limited v-if="activeName=='limited'"></k-limited>
                            <k-market v-if="activeName=='market'"></k-market>
                        </div>
                        
                    </div>
                    <!-- 盘口 -->
                    <div class="ask_bid">
                        <k-kmesh></k-kmesh>
                    </div>
                </div>
            </div>
            <!-- 当前委托 -->
            <k-order></k-order>
             <!-- 历史委托 -->
            <k-orderhistory></k-orderhistory>
        </div>
    </div>
</template>
<script>

import kCross from "../../components/spot/spotKcross"
import kWallet from "../../components/spot/wallet"
import kMarket from "../../components/spot/market"
import kLimited from "../../components/spot/limited"
import kKmesh from "../../components/spot/kmesh"
import kTrade from "../../components/spot/trade"
import kSpotlist from "../../components/spot/spotlist"
import kNotice from "../../components/spot/notice"
import kInfo from "../../components/spot/information"
import kOrder from "../../components/spot/nowOrder"
import kOrderhistory from "../../components/spot/orderHistory"

export default {
    data() {
        return {
            activeName:'limited',
        }
    },
    components:{
        kCross,
        kWallet,
        kMarket,
        kLimited,
        kKmesh,
        kTrade,
        kSpotlist,
        kNotice,
        kInfo,
        kOrder,
        kOrderhistory
    },
    created() {

    },
    mounted(){

    },
    computed:{
        // ETH KKC实时行情
        prz_new(){
            return this.$store.state.coins.prz
        },
    },
    methods:{
       handleClick(val){
           this.activeName = val;
       }
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';



.spot{
    padding: 10px;
    overflow: scroll;
    .spot_left{
        display: inline-block;
        width: 360px;
        background: $back;
        float: left;
        .tradeList{
            display: inline-block;
            width:100%;
            background: $backGroup;
            border-radius: 3px;
            margin-top: 10px;
        }
    }
    .spot_right{
        display: inline-block;
        width: calc(100% - 370px);
        float: right;
        background: $back;
        .panel_container{
            width: 100%;
            height: 580px;
            // background: $backGroup;
            border-radius: 3px;
            .trade_wrap{
                display: inline-block;
                width: 100%;
                height: 100%;
                margin-bottom: 10px;
                .panel{
                    display: inline-block;
                    width:66%;
                    height: 100%;
                    background: $backGroup;
                    border-radius: 3px;
                    font-size: 14px;
                    .panel_head{
                        width: 100%;
                        height:50px;
                        line-height:50px;
                        padding: 0 30px;
                        .panel_change{
                            display: inline-block;
                            width: 80%;
                            font-size:16px;
                            .panel_tab{
                                display:inline-block;
                                height:46px;
                                margin-right: 40px;
                                cursor: pointer;
                            }
                            .panel_line{
                                border-bottom: 2px solid #007AFF;
                            }
                        }
                        .panel_fees{
                            display: inline-block;
                            text-align: center;
                            float: right;
                            height: 35px;
                            color: $fontBlue;
                        }
                    }
                    
                    .panel_content{
                        width: 100%;
                        height:calc(100% - 48px);
                        padding: 0 30px;
                    }
                    .panel_line{
                        color:$fontFFF;
                    }
                }
                .ask_bid{
                    display: inline-block;
                    width:calc(100% - 66% - 10px);
                    height: 100%;
                    background: $backGroup;
                    float: right;
                    border-radius: 3px;
                }
            }
        }
    }
    
    // @media only screen and (max-width: 1520px) {
    //     .spot_left{
    //         width: 320px;
    //     }
    //     .spot_right{
    //         width: calc(100% - 330px);
    //     }
    // }
}


</style>