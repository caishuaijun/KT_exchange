<template>
    <!-- 实时成交 -->
    <div class="trade">
        <!-- 实时成交 -->
        {{lastTradeData}}
        <div class="head">
            <span style="font-size:16px">
                实时成交
            </span>
        </div>
        <!-- 过渡线条 -->
        <div class="gradient">

        </div>
        <div class="content">
            <!-- 数据 -->
            <dl class="ask">
                <dt class="header">
                    <span class="title">
                        时间
                    </span>
                    <span class="vol">
                        数量({{symbol.bc}})
                    </span>
                    <span class="price">
                        价格({{symbol.qc}})
                    </span>
                    <span class="dir">
                        方向
                    </span>
                </dt>
                <dd v-for="(item,index) in tradeData" :key="index" class="line" @click="focusPrice(item)">
                    <span class="title">
                         {{item.ts}}
                    </span>
                    <span class="vol">
                        {{item.vol}}
                    </span>
                     <span class="price">
                        {{item.price}}
                    </span>
                    <span :class="[item.trade_type==1?'bid_color':'ask_color','dir']">
                        {{item.dir}}
                    </span>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>

// import coinsApi from "@/service/apiCoins";
import utils from "@/util/util";

export default {
    data() {
        return {
            options:[
                {
                    label:'0.01',
                    value:'0.01'
                },
                {
                    label:'0.1',
                    value:'0.1'
                },
            ],
            value:'0.01',
            tradeData:[],
        }
    },
    created() {

    },
    computed:{
        symbol(){
            let symbol = utils.symbol(this.$store.state.coins.symbol)
            return symbol
        },
        lastTradeData(){
            let lastTradeData = this.$store.state.coins.lastTradeData
            if(lastTradeData&&lastTradeData.updated_at){
                this.tradeData.unshift(this.initDetail(lastTradeData))
                return
            }
        },
    },
    mounted(){
        this.getTradelist()
    },
    methods:{
       focusPrice(item){

       },
       getTradelist(){
           coinsApi.getDealOrder({params:{pagesize:30,goods_coin_id:2,settlement_coin_id:1}}).then((res)=>{
               if(res.payload&&res.payload.length==0) return
               let arr = res.payload.sort((a,b)=>{
                   return b.updated_at - a.updated_at
               })
               console.log('成交数据获取==',arr)
               arr.forEach((item)=>{
                   this.tradeData.push(this.initDetail(item))
               })
           })
       },
        initDetail(msg){
            if(!msg) return
            let  date = utils.dateFtt("hh:mm:ss",new Date(msg.updated_at*1000));
            let item = {
                dir:msg.trade_type==1?'买入':'卖出',
                trade_type:msg.trade_type,
                price:utils.fix(msg.end_proportion,8),
                vol:utils.fix(msg.end_trade_num,8),
                ts:date,
            }
            // console.log('最新成交数据==',item)
            return item
        }
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.trade{
    display:inline-block;
    height: 100%;
    width: 100%;
    .head{
        display:inline-block;
        height: 56px;
        line-height: 56px;
        width: 100%;
        padding: 0 20px;
        background: url('~@/assets/images/trade_icon.png') no-repeat center center;
        background-size: 100% 100%;
    }
    .content{
        display:inline-block;
        height: 692px;
        width: 100%;
        float: left;
        overflow: scroll;
        dl{
            display: inline-block;
            width:100%;
            overflow: hidden;
            padding: 0 20px;
            position: relative;
            .header{
                display: inline-block;
                height: 40px;
                line-height: 40px;
                width: 100%;
            }
            .bid_depth,.ask_depth{
                position: absolute;
                right: 20px;
                height: 30px;
                line-height: 30px;
                opacity: 0.1;
                max-width:calc(100% - 35px);
            }
            .bid_color{
                color: $depthbid;
            }
            .ask_color{
                color: $depthask;
            }
        }
        dd{
            display: inline-block;
            width:100%;
            height: 29px;
            line-height: 30px;
            padding-right: 2px;
            border-top:1px solid #1C253F;
            .line{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                width: 100%;
            }
            
        }
        .title{
            display: inline-block;
            width: 30px;
            height:100%;
            float: left;
            text-align: left;
        }
        .price{
            display: inline-block;
            width: 33%;
            height:100%;
            float: right;
            text-align: right;
        }
        .vol{
            display: inline-block;
            width: 33%;
            height:100%;
            float: right;
            text-align: right;
        }
        .dir{
            display: inline-block;
            width: 20%;
            height:100%;
            float: right;
            text-align: right;
        }
    }
    
    .under_line{
        display: inline-block;
        width: 100%;
        height: 2px;
        background: $border;
        padding: 0 10px;
        margin-bottom: 5px;
    }
}

</style>