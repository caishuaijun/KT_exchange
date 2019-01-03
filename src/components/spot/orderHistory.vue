<template>
    <!-- 委托历史 -->
    <div class="orderHistory">
        <!-- information -->
        {{lastCurOrder}}
        <div class="head">
            <span style="font-size:16px">
                委托历史(本周一至本周日)
            </span>
            <div class="sel">
                <span :class="[activeName==1 ? 'panel_line' : '']" @click="selsetOrder(1)">
                    买入
                </span >
                <span :class="[activeName==2 ? 'panel_line' : '']" @click="selsetOrder(2)">
                    卖出
                </span>
                <span :class="[activeName==0 ? 'panel_line' : '']" @click="selsetOrder(0)">
                    全部
                </span>
            </div>
            
        </div>
        <!-- 过渡线条 -->
        <div class="gradient">

        </div>
         <!-- 数据 -->
        <div class="content">
            <el-table
                :data="orderHistory"
                style="width: 100%"
                @expand-change="expandedRows">

                <el-table-column
                prop="date"
                label="时间"
                min-width="160"
                >
                </el-table-column>

                <el-table-column
                prop="symbol"
                label="交易对"
                min-width="75"
                >
                </el-table-column>
                <el-table-column
                prop="dir"
                label="方向"
                min-width="50"
                >
                <template slot-scope="scope">
                    <div :class="[scope.row.trade_type==1  ? 'green' : scope.row.trade_type==2 ? 'red' : '' ]">
                        {{scope.row.dir}}
                    </div>
                </template>
                </el-table-column>
                <el-table-column
                prop="price"
                :label="'价格('+symbol.qc+')'"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="vol"
                label="委托量"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                prop="avol"
                :label="'已成交('+symbol.bc+')'"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="a_price"
                label="成交均价"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="statusShow"
                label="状态"
                min-width="100"
                >
                
                </el-table-column>

                <el-table-column
                    type="expand"
                    width="80"
                    >
                    <template slot="header" slot-scope="scope">
                        <span>操作</span>    
                    </template>
                    <template slot-scope="props" >
                        <div class="detail_son" v-if="!props.row.noDetails">
                            <span>详情</span>
                            <div class="head_line">
                                <span class="head_line_item">成交时间</span>
                                <span class="head_line_item">价格({{symbol.bc}})</span>
                                <span class="head_line_item">数量({{symbol.qc}})</span>
                                <span class="head_line_item">成交额(({{symbol.bc}}))</span>
                                <span class="head_line_item">手续费({{symbol.bc}})</span>
                            </div>
                            <div class="demo-table-expand head_line" v-for="item in props.row.son_trade_orders" :key="item.id">
                                <span class="head_line_item">{{ item.date }}</span>
                                <span class="head_line_item">{{ item.price }}</span>
                                <span class="head_line_item">{{ item.vol}}</span>
                                <span class="head_line_item">{{ item.amount }}</span>
                                <span class="head_line_item">{{ item.fees }}</span>
                            </div>
                        </div>
                        <div class="detail_son" v-if="props.row.noDetails" style="text-align:center">
                            <span>此订单无详情信息</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="footer">
            <span @click="toOrderHistory">查看历史所有记录</span>
        </div>

    </div>
</template>
<script>
import utils from "@/util/util";

export default {
    data() {
        return {
            orderHistory: [],
            activeName:0,
            orderStatus: {
                '1': '等待交易',
                '2': '交易完成',
                '3': '非法订单',
                '4': '撤销订单'
            },
        }
    },
    created() {

    },
    computed:{
        symbol(){
            let symbol = utils.symbol(this.$store.state.coins.symbol)
            return symbol
        },
        userInfo(){
            let userInfo = this.$store.state.login.userInfo
            return userInfo
        },
        lastCurOrder(){
            if(this.$store.state.coins.isHistoryChange){
                let lastCurOrder = this.$store.state.coins.lastCurOrder
                if(lastCurOrder.status!=1){
                    this.orderHistory.unshift(this.initOrder(lastCurOrder))
                    this.orderHistory = this.orderHistory.splice(0,this.orderHistory.length-1)
                }
                this.$store.state.coins.isHistoryChange = false
            }
        },
    },
    mounted(){
        this.getAllorders(0);
    },
    methods:{
        getAllorders(val){
            let info = {
                user_id:this.userInfo.user_id,
                trade_type:val,
                page:1,
                page_size:5
            }
            coinsApi.historyEntrust({params:info}).then((res)=>{
                console.log('历史委托==',res.payload)
                this.orderHistory = []
                res.payload.forEach(item => {
                    let a = this.initOrder(item)
                    this.orderHistory.push(a)
                });
            })
        },
        initOrder(item){
            this.loading = true
            let noDetails = (!item.son_trade_orders||item.son_trade_orders.length==0)?true:false
            let data = {
                date: utils.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(item.created_at*1000)),
                symbol: item.currency_type,
                dir: item.trade_type==1?'买入':'卖出',
                trade_type:item.trade_type,
                price: utils.fix(item.proportion,8),
                vol: utils.fix(item.trade_num,8),
                amount: utils.fix(item.consumption,8),
                avol: utils.fix(item.trading_num,8),
                a_price: utils.fix(item.average_price,8),
                statusShow:this.orderStatus[item.status],
                status:item.status,
                son_trade_orders:this.initSonOrder(item.son_trade_orders),
                id:item.id,
                noDetails:noDetails
            }
            return data
        },
        initSonOrder(arr){
            if(!arr||arr.length==0) return
            arr.forEach((item)=>{
                item.date = utils.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(item.created_at*1000))
                item.price = utils.fix(item.proportion,8)
                item.vol = utils.fix(item.trade_num,8)
                item.amount = utils.fix(item.consumption,8)
                item.fees = utils.fix(item.poundage_num,2)||'0.00'
            })
            return arr
        },
       selsetOrder(dir){
           this.activeName = dir;
            this.getAllorders(dir);
       },
       toOrderHistory(){
            this.$router.push({ path: '/homepage/orderHistoryAll'})
       },
       expandedRows(row, expandedRows){
           coinsApi.subOrders({params:{_id:Number(row.id)}}).then((res)=>{
                console.log('获取子订单==',row.id,res.payload)
                let noDetails = (!res.payload||res.payload.length==0)?true:false
                row.noDetails = noDetails
                row.son_trade_orders = this.initSonOrder(res.payload)
            })
       },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.orderHistory{
    display:inline-block;
    min-height: 182px;
    width: 100%;
    margin-top: 10px;
    background: $backGroup;
    border-radius: 3px;
    .head{
        display:inline-block;
        height: 50px;
        line-height: 50px;
        width: 100%;
        padding: 0 20px;
        .sel{
            float: right;
            font-size:16px;
            span{
                display: inline-block;
                cursor: pointer;
                height: 50px;
                margin-left: 20px;
                color:$fontBlue;
            }
            .panel_line{
                border-bottom: 2px solid $font007;
                color:$fontFFF;
            }
        }
    }
    .content{
        display:inline-block;
        width: 100%;
        float: left;
        overflow: scroll;
        .detail_son{
            line-height: 30px;
            .head_line{
                height: 30px;
                width: 100%;
                .head_line_item{
                    display:inline-block;
                    width: 20%;
                    float: left;
                }
            }
        }
        .green{
            color: $depthbid;
        }
        .red{
            color: $depthask;
        }
    }
    .footer{
        display: inline-block;
        height: 50px;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        span{
            color:$fontBlue;
            line-height: 50px;
            border-bottom: 1px solid $fontBlue;
            cursor: pointer;
        }
    }
}

</style>