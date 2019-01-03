<template>
    <div class="hundred">
        {{isbuybests}}
        {{issellbests}}
        <div class="head">
            <span class="title" @click="toHomePage">权益互换 > </span>
            <span>买卖盘</span>
        </div>
        <div class="content">
            <!-- 左侧买盘 -->
            <div class="left">
                <div class="left_head">
                    <span>买盘</span>    
                </div>
                <!-- 过渡线条 -->
                <div class="gradient">

                </div>
                <dl class="bid">
                    <dt class="header">
                        <span class="title">

                        </span>
                        <span class="amount">
                            累计({{symbol.bc}})
                        </span>
                        <span class="vol">
                            数量({{symbol.bc}})
                        </span>
                        <span class="price">
                            价格({{symbol.qc}})
                        </span>
                    </dt>
                    <dd v-for="(item,index) in bidData" :key="index" class="line">
                        <span class="title bid_color">
                             {{item.dir}}
                        </span>
                        <span class="amount">
                             {{item.moreVol}}
                        </span>

                        <span class="vol">
                           {{item.vol}}
                        </span>
                        
                        <span class="price">
                             {{item.proportion}}
                        </span>
                        <b :style="{ width: item.width/maxWidth['bid']*100 +'%' }" class="bid_depth_color bid_depth"></b>
                    </dd>
                </dl>
            </div>

             <!-- 右侧卖盘 -->
            <div class="right">
                <div class="left_head">
                    <span>卖盘</span>    
                </div>
                <!-- 过渡线条 -->
                <div class="gradient">

                </div>
                <dl class="ask">
                    <dt class="header">
                        <span class="title">

                        </span>
                        <span class="amount">
                            累计({{symbol.bc}})
                        </span>
                        <span class="vol">
                            数量({{symbol.bc}})
                        </span>
                        <span class="price">
                            价格({{symbol.qc}})
                        </span>
                    </dt>
                    <dd v-for="(item,index) in askDataList" :key="index" class="line" @click="focusPrice(item)">
                        <span class="title ask_color">
                            {{item.dir}}
                        </span>
                        <span class="amount">
                           {{item.moreVol}}
                        </span>

                        <span class="vol">
                            {{item.vol}}
                        </span>
                        
                        <span class="price">
                            {{item.proportion}}
                        </span>
                        <b :style="{ width: item.width/maxWidth['ask']*100 +'%' }" class="ask_depth_color ask_depth"></b>
                    </dd>
                </dl>
            </div>

        </div>
    </div>
</template>
<script>

// import kCross from "../../components/spot/spotKcross"
import utils from "@/util/util";

export default {
    data() {
        return {
            askDataList:[], //卖
            bidData:[], //买
            maxWidth:{
                ask:0.00000001,
                bid:0.00000001
            },
        }
    },
    components:{
       
    },
    created() {

    },
    mounted(){
        this.depthMethod(100);
    },
    computed:{
        symbol(){
            let symbol = utils.symbol(this.$store.state.coins.symbol)
            return symbol
        },
       isbuybests(){
            if(this.$store.state.coins.isbuybests){
                this.bidDataInit(this.$store.state.coins.buybests)
                this.$store.state.coins.isbuybests = false
                return
            }
        },
        issellbests(){
            if(this.$store.state.coins.issellbests){
                this.askDataListInit(this.$store.state.coins.sellbests)
                this.$store.state.coins.issellbests = false
                return
            }
        }
    },
    methods:{
       // 档期接口
        depthMethod(val){
            let msg,item
            coinsApi.archivesMouths({params:{pagesize:val,type:1,goods_coin_id:2,settlement_coin_id:1}}).then((res)=>{
                this.bidDataInit(res.payload)
            })

            coinsApi.archivesMouths({params:{pagesize:val,type:2,goods_coin_id:2,settlement_coin_id:1}}).then((res)=>{
                this.askDataListInit(res.payload)
            })
        },
        bidDataInit(data){
            if(!data) return
            let msg
            this.bidData = []
            this.maxWidth['bid']=0.00000001
            let buy = data
            let more = 0
            for(let i = 0;i<100;i++){
                // 买
                if(buy[i]){
                    let vol = Number(buy[i].tradeNum)-Number(buy[i].tradingNum)
                    more += vol
                    msg = {
                        vol:utils.fix(vol,4),
                        proportion:utils.fix(buy[i].proportion,8),
                        moreVol:utils.fix(more,4),
                        dir:'买'+(i+1),
                        width:vol
                    }
                    if(this.maxWidth['bid']<vol){
                        this.maxWidth['bid'] = vol
                    }
                }else{
                    msg = {
                        vol:'-',
                        proportion:'-',
                        moreVol:'-',
                        dir:'买'+(i+1),
                        width:0
                    }
                }
                this.bidData.push(msg)
            }
            console.log('100档深度买入===',this.bidData)
        },
        askDataListInit(data){
            if(!data) return
            let item
            this.askDataList = []
            this.maxWidth['ask']=0.00000001
            let sell = data
            let more = 0
            for(let j = 0;j<100;j++){
                // 卖
                if(sell[j]){
                    let vol = Number(sell[j].tradeNum)-Number(sell[j].tradingNum)
                    more += vol
                    item = {
                        vol:utils.fix(vol,4),
                        proportion:utils.fix(sell[j].proportion,8),
                        moreVol:utils.fix(more,4),
                        dir:'卖'+(j+1),
                        width:vol
                    }
                    if(this.maxWidth['ask']<vol){
                        this.maxWidth['ask'] = vol
                    }
                }else{
                    item = {
                        vol:'-',
                        proportion:'-',
                        moreVol:'-',
                        dir:'卖'+(j+1),
                        width:0
                    }
                }
                this.askDataList.push(item)
            }
            console.log('100档深度卖出===',this.askDataList)
        },
        toHomePage(){
            this.$router.push({ path: '/homepage/spot'})
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.hundred{
    display: inline-block;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    .head{
        display: inline-block;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: $backGroup;
        margin: 20px 0 10px;
        font-size: 24px;
        text-align: left;
        .title{
            margin-left:  30px;
            color: $fontBlue;
            cursor: pointer;
        }
    }
    .content{
        display:inline-block;
        width: 100%;
        .left_head{
            display:inline-block;
            height: 50px;
            width: 100%;
            line-height: 50px;
            font-size: 16px;
            margin-left: 30px;
            text-align: left;
        }
        .left{
            display:inline-block;
            width: calc(50% - 5px);
            float: left;
            background: $backGroup;
        }
        .right{
            display:inline-block;
            width: calc(50% - 5px);
            float: right;
            background: $backGroup;
        }
        dl{
            display: inline-block;
            width:100%;
            overflow: hidden;
            position: relative;
            padding: 0 10px;
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
            }
            .bid_depth_color{
                background: $depthbid;
            }
            .ask_depth_color{
                background: $depthask;
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
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            padding-right: 10px;
            cursor: pointer;
            .line{
                display: inline-block;
                height: 30px;
                line-height: 30px;
                width: 100%;
            }
            &:hover{
                background: $border;
            }
        }
        .title{
            display: inline-block;
            width: 40px;
            height:100%;
            float: left;
            text-align: right;
        }
        .price{
            display: inline-block;
            width: 30%;
            height:100%;
            float: right;
            text-align: right;
        }
        .vol{
            display: inline-block;
            width: 30%;
            height:100%;
            float: right;
            text-align: right;
        }
        .amount{
            display: inline-block;
            width: 28%;
            height:100%;
            float: right;
            text-align: right;
            padding-right: 20px;
        }
    }
}


</style>