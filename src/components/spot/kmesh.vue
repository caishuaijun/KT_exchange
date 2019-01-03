<template>
    <!-- 买卖盘口 -->
    <div class="kmesh">
        {{isbuyfives}}
        {{issellfives}}
        <!-- 最新价 -->
        <div class="head">
            <span style="font-size:14px">
                最新价 {{symbolTick.lastprice}} {{symbol.qc}}
            </span>
            <span>
                ≈ {{symbolTick.rmb}} CNY
            </span>
        </div>
        <!-- 过渡线条 -->
        <div class="gradient">

        </div>
        <div class="content">
            <!-- 卖盘 -->
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

                    <span class="vol" @click="focusVol(item.vol)">
                        {{item.vol}}
                    </span>
                    <span class="price" >
                        {{item.proportion}}
                    </span>
                    <b :style="{ width: item.width/maxWidth['ask']*100 +'%' }" class="ask_depth_color ask_depth"></b>
                </dd>
            </dl>
            <i class="under_line"></i>
            <!-- 买盘 -->
            <dl class="bid">
                <dd v-for="(item,index) in bidData" :key="index" class="line" @click="focusPrice(item)">
                    <span class="title bid_color">
                        {{item.dir}}
                    </span>
                    <span class="amount">
                        {{item.moreVol}}
                    </span>

                    <span class="vol" @click="focusVol(item.vol)">
                        {{item.vol}}
                    </span>
                    
                    <span class="price" >
                        {{item.proportion}}
                    </span>
                    <b :style="{ width: item.width/maxWidth['bid']*100 +'%' }" class="bid_depth_color bid_depth"></b>
                </dd>
            </dl>
        </div>
        <!-- 盘后底部 -->
        <div class="footer">
            <div class="select">
                深度
                <select v-model="value" @change="changeFlaot">
                    <option v-for="item in options" :key='item.value' :value ="item.value">{{item.label}}</option>
                </select>
            </div>
            <div class="more" @click="moreDepth">
                更多
            </div>
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
                    label:'0.00000001',
                    value:8
                },
                {
                    label:'0.0000001',
                    value:7
                },
                {
                    label:'0.000001',
                    value:6
                },
                {
                    label:'0.00001',
                    value:5
                },
                {
                    label:'0.0001',
                    value:4
                },
                {
                    label:'0.001',
                    value:3
                },
                {
                    label:'0.01',
                    value:2
                },
                {
                    label:'0.1',
                    value:1
                }
            ],
            value:8,//默认位数
            askDataList:[], //卖
            bidData:[], //买
            maxWidth:{
                ask:0.00000001,
                bid:0.00000001
            },
            setInterval:null,
        }
    },
    created() {

    },
    computed:{
        symbol(){
            return utils.symbol(this.$store.state.coins.symbol)
        },
        symbolTick(){
            return this.$store.state.coins.tick
        },
        isbuyfives(){
            if(this.$store.state.coins.isbuyfives){
                this.bidDataInit(this.$store.state.coins.buyfives)
                this.$store.state.coins.isbuyfives = false
                return
            }
        },
        issellfives(){
            if(this.$store.state.coins.issellfives){
                this.askDataListInit(this.$store.state.coins.sellfives)
                this.$store.state.coins.issellfives = false
                return
            }
        }
    },
    mounted(){
        this.depthMethod(6);
    },
    methods:{
        changeFlaot(){
            let val = 100
            this.depthMethod(val)
        },
        // 档期接口
        depthMethod(val){
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
            // 获取最后6档最后一个
            if(data.length!=0){
                this.$store.commit('coins/buyLast',data[data.length-1].proportion)
            }
            this.bidData = []
            this.maxWidth['bid']=0.00000001
            // let buy = data
            let buy = utils.spliceFloat(data,this.value,1)||[]
            let more = 0
            for(let i = 0;i<6;i++){
                // 买
                if(buy[i]){
                    let vol = Number(buy[i].vol)
                    more += vol
                    msg = {
                        vol:utils.fix(vol,4),
                        proportion:utils.fix(buy[i].proportion,this.value),
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
            console.log('五档深度买入===',this.bidData)
        },
        askDataListInit(data){
            if(!data) return
            let item
            // 获取最后6档最后一个
            if(data.length!=0){
                this.$store.commit('coins/sellLast',data[data.length-1].proportion)
            }
            this.askDataList = []
            this.maxWidth['ask']=0.00000001
            // let sell = data

            let sell = utils.spliceFloat(data,this.value,-1)||[]

            let more = 0
            for(let j = 0;j<6;j++){
                // 卖
                if(sell[j]){
                    let vol = sell[j].vol
                    more += Number(vol)
                    item = {
                        vol:utils.fix(vol,4),
                        proportion:utils.fix(sell[j].proportion,this.value),
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
                this.askDataList.unshift(item)
            }
            console.log('五档深度卖出===',this.askDataList)
        },
        focusPrice(val){
            if(val.proportion=='-') return
            this.$store.commit('coins/kkcToPrice',val.proportion)
        },
        focusVol(val){
            if(val.proportion=='-') return
            // console.log('val==',val)
            // this.$store.commit('coins/ethTovol',val)
        },
        
        moreDepth(){
            let msg = 100+'_KT/ETH'
            this.$store.commit('coins/depthChange',msg)
            this.$router.push({ path: '/homepage/hundred'})
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.kmesh{
    display:inline-block;
    height: 100%;
    width: 100%;
    .head{
        display:inline-block;
        height: 50px;
        line-height: 50px;
        width: 100%;
        padding: 0 30px;
    }
    .content{
        display:inline-block;
        height: calc(100% - 100px);
        width: 100%;
        float: left;
        .ask{
            height: 240px;
        }
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
                max-width:calc(100% - 40px);
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
            width: 30px;
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
        }
    }
    
    
    .footer{
        display:inline-block;
        height: 30px;
        line-height: 30px;
        width: 100%;
        padding: 0 30px;
        .select{
            display:inline-block;
            width: 60%;
            color: $fontBlue;
            select{
                background: $backGroup;
                color: $fontBlue;
                option{
                    background: $backGroup;
                    color: $fontBlue;
                    &:hover{
                        background: $border;
                    }
                }
            }
        }
        .more{
            float: right;
            cursor: pointer;
            color: $fontBlue;
            &:hover{
                color: $fontFFF;
            }
        }
    }
}

</style>