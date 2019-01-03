<template>
    <!-- 市价交易 -->
    <div class="market">
        {{walletInfo}}
        <!-- 买入下单版 -->
        <div class="market_buy">
            <div class="buy_head_des">
                买入
            </div>
            <div class="buy_head">
                <div class="available">
                    可用 {{assets_buy}} {{symbol.qc}}
                </div>
                <div class="recharge">
                    充币
                </div>
            </div>

            <div class="buy_content">
                <el-form label-position="top" label-width="80px" :model="buy">
                    <!-- 买入价 -->
                    <el-form-item label="买入价">
                        <!-- 计价币价格 -->
                        <el-input disabled placeholder="以市场上最优价格买入"></el-input>
                        <i class="position_c">{{symbol.qc}}</i>
                        <span class="rmbChange"></span>
                    </el-form-item>
                    <!-- 买入量 -->
                    <el-form-item label="买入量">
                        <!-- 基础币数量 -->
                        <el-input v-model="buy.vol" @blur="blurVol(1)"></el-input>
                        <i class="position_c">{{symbol.bc}}</i>
                        <!-- 滑块 -->
                        <!-- <div style="width:100%;padding:0 5px;"> -->
                            <div class="sd">
                                <el-slider v-model="buy.sliderValue" :format-tooltip="formatTooltip"  @change="sliderChange(buy.sliderValue,1)"></el-slider>
                                <i v-if="buy.sliderValue>0" class='sd_0' @click="sliderPre(0,1)"></i>
                                <i class='sd_25' @click="sliderPre(25,1)"></i>
                                <i class='sd_50' @click="sliderPre(50,1)"></i>
                                <i class='sd_75' @click="sliderPre(75,1)"></i>
                                <i v-if="buy.sliderValue!=100" class='sd_100' @click="sliderPre(100,1)"></i>
                            </div>
                        <!-- </div> -->
                        <div class="slider_line">
                            <span class="sld_start"> 0 {{symbol.bc}}</span>
                            <span class="sld_end"> {{balance_buy}} {{symbol.bc}}</span>
                        </div>
                        <!-- 交易额 -->
                        <p class="trade_vol">
                            &nbsp;
                        </p>
                        <el-button type="primary" @click="sendOrder(buy,1)">买入 {{symbol.bc}}</el-button>
                    </el-form-item>

                </el-form>
            </div>

        </div>
        <!-- 卖出下单版 -->
        <div class="market_buy market_sell">
            <div class="buy_head_des">
                卖出
            </div>
            <div class="buy_head">
                <div class="available">
                    可用 {{assets_sell}} {{symbol.bc}}
                </div>
                <div class="recharge">
                    充币
                </div>
            </div>
            <div class="buy_content">
                <el-form label-position="top" label-width="80px" :model="sell">
                    <!-- 卖出价 -->
                    <el-form-item label="卖出价">
                        <!-- 计价币价格 -->
                        <el-input disabled placeholder="以市场上最优价格卖出"></el-input>
                        <i class="position_c">{{symbol.qc}}</i>
                        <span class="rmbChange"></span>
                    </el-form-item>
                    <!-- 卖出量 -->
                    <el-form-item label="卖出量">
                        <!-- 基础币数量 -->
                        <el-input v-model="sell.vol" @blur="blurVol(2)"></el-input>
                        <i class="position_c">{{symbol.bc}}</i>
                        <!-- 滑块 -->
                        <!-- <div style="width:100%;padding:0 5px;"> -->
                            <div class="sd">
                                <el-slider v-model="sell.sliderValue" :format-tooltip="formatTooltip" @change="sliderChange(sell.sliderValue,2)"></el-slider>
                                <i v-if="sell.sliderValue>0" class='sd_0' @click="sliderPre(0,2)"></i>
                                <i class='sd_25' @click="sliderPre(25,2)"></i>
                                <i class='sd_50' @click="sliderPre(50,2)"></i>
                                <i class='sd_75' @click="sliderPre(75,2)"></i>
                                <i v-if="sell.sliderValue!=100" class='sd_100' @click="sliderPre(100,2)"></i>
                            </div>
                        <!-- </div> -->
                        <div class="slider_line">
                            <span class="sld_start"> 0 {{symbol.bc}}</span>
                            <span class="sld_end"> {{balance_sell}} {{symbol.bc}}</span>
                        </div>
                        <!-- 交易额 -->
                        <p class="trade_vol">
                            &nbsp;
                        </p>
                        <el-button type="danger" @click="sendOrder(sell,2)">卖出 {{symbol.bc}}</el-button>
                    </el-form-item>

                </el-form>
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
            buy:{
                price:'1',
                rmb:'',
                vol:0,
                sliderValue:0,
            },
            sell:{
                price:'1',
                rmb:'',
                vol:0,
                sliderValue:0,
            },
            assets_buy:0,
            assets_sell:0,
            balance_buy:'',
            balance_sell:''
        }
    },
    created() {

    },
    mounted(){
        this.lastprice()
    },
    computed:{
        symbol(){
            let symbol = utils.symbol(this.$store.state.coins.symbol)
            return symbol
        },
        walletInfo(){
            let walletInfo = this.$store.state.login.walletInfo
            if(this.buy.price&&JSON.stringify(walletInfo)!='{}'){
                this.balance_buy =  utils.fix(walletInfo[this.symbol.bc].assets/this.buy.price,4)
                this.balance_sell =  utils.fix(walletInfo[this.symbol.qc].assets,4)
                this.assets_buy = walletInfo[this.symbol.bc].assets
                this.assets_sell = walletInfo[this.symbol.qc].assets
            }
            return
        },
        
    },
    watch:{
        'buy.sliderValue':function(val){
            this.sliderChange(val,1)
        },
        'sell.sliderValue':function(val){
            this.sliderChange(val,2)
        },
        'buy.vol':function(val){
            if(val==0&&val.length<6) return
            if(typeof(Number(val)) !== 'number' || Number(val)==0 || isNaN(Number(val))){
                this.$nextTick(()=>{
                    this.buy.vol = '0.000'
                })
            }
        },
        'sell.vol':function(val){
            if(val==0&&val.length<6) return
            if(typeof(Number(val)) !== 'number' || Number(val)==0 || isNaN(Number(val))){
                this.$nextTick(()=>{
                    this.sell.vol = '0.000'
                })
            }
        },
    },
    methods:{
        lastprice(){
            let tick = this.$store.state.coins.tick
            if(tick.lastprice){
                this.buy.price = tick.lastprice
                this.sell.price = tick.lastprice
            }
        },
        sendOrder(item,dir){
            let walletInfo = this.$store.state.login.walletInfo
            if(!this.$store.state.login.login){
                this.$confim('info','请先登陆！')
                return
            }
            if(!item.vol||Number(item.vol)==0){
                this.$confim('error','数量不能为0！')
                return
            }
            let pri = this.$store.state.coins.lastPanelprice
            item.price = dir==1?pri.sell:pri.buy
            let msg = {
                user_id:walletInfo[this.symbol.bc].user_id,
                trade_num:Number(item.vol),
                proportion:1,
                trade_type:dir,
                trade_way:2,
                currency_type:this.$store.state.coins.symbol,
                goods_coin_id:2,
                settlement_coin_id:1
            }
            
            this.$confirm('是否确认下单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
               coinsApi.sendOrder(msg).then((res)=>{
                   this.$confim('success','市价下单成功')
                    console.log('市价下单成功==',res,msg)
                }).catch((error)=>{
                    this.$confim('error','市价下单失败')
                    console.log('市价下单失败==',error)
                })
            }).catch(() => {
                this.$confim('info','已取消下单')
            });

        },
        sliderPre(val,dir){
            if(dir==1){//买入
                this.buy.sliderValue = val
            }else{//卖出
                this.sell.sliderValue = val
            }
            this.sliderChange(val,dir)
        },
        sliderChange(val,dir){
            let walletInfo = this.$store.state.login.walletInfo
            console.log('val',val)
            if(dir==1){//买入
                this.buy.vol = utils.fix(this.balance_buy * (val/100),4) 
                this.buy.amount = utils.fix(this.buy.vol * this.buy.price,4) 
            }else{//卖出
                if(walletInfo[this.symbol.qc]&&walletInfo[this.symbol.qc].assets){
                    this.sell.vol = utils.fix(walletInfo[this.symbol.qc].assets * (val/100),4)
                }else{
                    this.sell.vol = utils.fix(0.0,4)
                }
            }
        },
        // 数量失去焦点
        blurVol(dir){
            if(dir==1){//买入
                this.buy.vol = utils.fix(this.buy.vol,4)
                this.buy.sliderValue = utils.fix(this.buy.vol/this.balance_buy,2)*100
            }else{//卖出
                this.sell.vol = utils.fix(this.sell.vol,4) 
                this.sell.sliderValue = utils.fix(this.sell.vol/this.balance_sell,2)*100
            }
        },
        formatTooltip(val) {//格式化滑块
            return val + '%';
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.market{
    width: 100%;
    height: 100%;
    .market_buy{
        display: inline-block;
        width: calc(50% - 10px);
        height:100%;
        float: left;
        .buy_head_des{
            height:40px;
            line-height: 40px;
            font-size: 20px;
            color: $fontFFF;
        }
        .buy_head{
            display: inline-block;
            width: 100%;
            height:50px;
            line-height: 50px;
            border-bottom: 1px solid $border
        }
        .buy_content{
            display: inline-block;
            width: 100%;
            height: 400px;
            .rmbChange{
                display: inline-block;
                width: 100%;
                height: 30px;
                line-height: 30px;
                float: left;
                padding: 0 15px;
                font-size: 12px;
            }
            .position_c{
                position: absolute;
                top: 0;
                right: 15px;
            }
            .slider_line{
                display: inline-block;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                .sld_start{
                    display: inline-block;
                    float: left;
                    height: 20px;
                    line-height: 20px;
                }
                .sld_end{
                    display: inline-block;
                    float: right;
                    height: 20px;
                    line-height: 20px;
                }
            }
            .trade_vol{
                display: inline-block;
                width: 100%;
                font-size: 16px;
                margin-bottom: 10px;
            }
        }
    }
    .market_sell{
        display: inline-block;
        width: calc(50% - 10px);
        height:100%;
        float: right;
    }
    .sd{
        position: relative;
        i{
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #fff;
            position: absolute;
            border-radius: 50%;
            top: 14px;
            cursor: pointer;
        }
        .sd_0{
            left: 0;
        }
        .sd_25{
            left: calc(25% - 6px);
        }
        .sd_50{
            left: calc(50% - 6px);
        }
        .sd_75{
            left: calc(75% - 6px);
        }
        .sd_100{
            left: calc(100% - 6px);
        }
    }
    .available{
        display: inline-block;
        width: 80%;
    }
    .recharge{
        display: inline-block;
        width: 30px;
        float: right;
        margin-right: 10px;
        color: $fontBlue;
    }
}

</style>