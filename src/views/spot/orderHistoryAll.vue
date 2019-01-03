<template>
    <div class="orderHistoryAll">
        {{lastCurOrders}}
        <div class="head">
            <span class="title" @click="toHomePage">权益互换 > </span>
            <span>历史委托</span>
        </div>
        <div class="t_head">
            <div class="t_head_item">
                <span>交易对</span>
                <el-input v-model="input.bc" placeholder="请输入币种"></el-input>
                <i> &nbsp;/&nbsp; </i>
                <select v-model="input.qc">
                    <option v-for="item in coinList" :key='item.value' :value ="item.value">{{item.label}}</option>
                </select>
            </div>
            <div class="t_head_item">
                <span>方向</span>
                <select v-model="input.dir">
                    <option v-for="item in dirList" :key='item.value' :value ="item.value">{{item.label}}</option>
                </select>
            </div>
            <div class="t_head_item">
                <span>时间范围</span>
                <el-date-picker
                    v-model="input.timeRange"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="t_head_item">
                <button @click="searchOrder">搜索</button>
            </div>
            <div class="t_head_item">
                <button @click="handleDownload">导出</button>
            </div>
            <div class="t_head_item" style="float:right;margin:0">
                 <el-checkbox v-model="input.checked" @change="searchOrder">隐藏已撤销</el-checkbox>
            </div>
        </div>
            <!-- 数据 -->
        <div class="content">
            <el-table
                :data="orderHistoryAll"
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
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="dir"
                label="方向"
                min-width="80"
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
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="vol"
                label="委托量"
                min-width="80"
                >
                </el-table-column>

                <el-table-column
                prop="avol"
                :label="'已成交('+symbol.bc+')'"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="a_price"
                label="成交均价"
                min-width="80"
                >
                </el-table-column>

                <el-table-column
                prop="status"
                label="状态"
                min-width="80"
                >
                </el-table-column>

                <el-table-column
                    type="expand"
                    width="80">
                    <template slot="header" slot-scope="scope">
                        <span>操作</span>    
                    </template>
                    <template slot-scope="props">
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
            <!-- <el-pagination
                background
                small
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination> -->
            <span @click="backHomepage" v-show="page!=1">返回首页</span>
            <span @click="prePage" v-show="page!=1">上一页</span>
            <span @click="nextPage" v-show="orderHistoryAll.length==10">下一页</span>
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";

export default {
    data() {
        return {
            input:{
                bc:'',
                qc:'all',
                dir:'0',
                timeRange:'',
                checked:false
            },
            coinList:[
                {
                    label:'全部',
                    value:'all'
                },
                {
                    label:'KT ',
                    value:'KT'
                },
                {
                    label:'ETH ',
                    value:'ETH'
                }
            ],
            dirList:[
                {
                    label:'全部',
                    value:'0'
                },
                {
                    label:'买入',
                    value:'1'
                },
                {
                    label:'卖出',
                    value:'2'
                }
            ],
            orderHistoryAll: [
                
            ],
            orderStatus: {
                '1': '等待交易',
                '2': '交易完成',
                '3': '非法订单',
                '4': '撤销订单'
            },
            page:1,
        }
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
        lastCurOrders(){
            if(this.$store.state.coins.isHistoryChange){
                console.log('this.$store.state.coins.isHistoryChange==',this.$store.state.coins.isHistoryChange)
                let lastCurOrder = this.$store.state.coins.lastCurOrder
                if(lastCurOrder.status!=1){
                    this.orderHistoryAll.unshift(this.initOrder(lastCurOrder))
                    this.orderHistoryAll = this.orderHistoryAll.splice(0,this.orderHistoryAll.length-1)
                }
                this.$store.state.coins.isHistoryChange = false
            }
        },
    },
    created() {

    },
    mounted(){
        this.getAllorders(this.page)
    },
    methods:{
        // 导出excel
        handleDownload() {
            this.downloadLoading = true
            let startTime = '',endTime = ''
            if(this.input.timeRange){
                startTime = new Date(this.input.timeRange[0]).getTime()/1000
                endTime = new Date(this.input.timeRange[1]).getTime()/1000
            }
            let info = {
                user_id:8,
                trade_type:Number(this.input.dir),
                page:1,
                page_size:100000000,
                start_time:startTime,
                end_time:endTime,
                hide_canceled_orders:Number(this.input.checked)
            }
            let orderHistoryAll=[]
            coinsApi.allhistoryEntrust({params:info}).then((res)=>{
                console.log('全部历史委托==',res.payload)
                res.payload.forEach(item => {
                    let a = this.initOrder(item)
                    item.son_trade_orders = this.initSonOrder(item.son_trade_orders)
                    orderHistoryAll.push(a)
                });
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
                    const tHeader = ['时间', '交易对', '方向','价格('+this.symbol.qc+')','委托量','已成交('+this.symbol.bc+')','成交均价','状态'];
                    const filterVal = ['date', 'symbol','dir','price','vol','avol','a_price','status']
                    const list = orderHistoryAll
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '历史委托')
                    this.downloadLoading = false
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        getAllorders(page){
            let startTime = '',endTime = ''
            if(this.input.timeRange){
                startTime = new Date(this.input.timeRange[0]).getTime()/1000
                endTime = new Date(this.input.timeRange[1]).getTime()/1000
            }
            // console.log('搜索信息==',this.input,startTime,endTime,this.input.dir)
            let info = {
                user_id:8,
                trade_type:Number(this.input.dir),
                page:page,
                page_size:10,
                start_time:startTime,
                end_time:endTime,
                hide_canceled_orders:Number(this.input.checked)
            }
            coinsApi.allhistoryEntrust({params:info}).then((res)=>{
                console.log('全部历史委托==',res.payload)
                this.orderHistoryAll = []
                res.payload.forEach(item => {
                    let a = this.initOrder(item)
                    item.son_trade_orders = this.initSonOrder(item.son_trade_orders)
                    this.orderHistoryAll.push(a)
                });
            })
        },
        initOrder(item){
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
                status:this.orderStatus[item.status],
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
        expandedRows(row, expandedRows){
           coinsApi.subOrders({params:{_id:Number(row.id)}}).then((res)=>{
               console.log('获取子订单==',row.id,res.payload)
                row.son_trade_orders = this.initSonOrder(res.payload)
            })
       },
        nextPage(){
            if(this.orderHistoryAll.length<10){
                return
            }
            console.log('this.orderHistoryAll==',this.orderHistoryAll)
            this.getAllorders(++this.page)
        },
        prePage(){
            this.getAllorders(--this.page)
        },
        backHomepage(){
            this.page = 1
            this.getAllorders(this.page)
        },
        searchOrder(){
            this.getAllorders(this.page)
        },
        toHomePage(){
            this.$router.push({ path: '/homepage/spot'})
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.orderHistoryAll{
    display: inline-block;
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    height: 100%;
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
    .t_head{
        .t_head_item{
            span{
                display: inline-block;
                margin-right:  20px;
            }
            select{
                display: inline-block;
                width: 80px;
                height: 32px;
                line-height: 30px;
                background: $backGroup;
                color: $fontFFF;
                border: 2px solid $inputBorder;
            }
            button{
                display: inline-block;
                width: 80px;
                height: 32px;
                line-height: 32px;
                font-size: 16px;
                color: $fontFFF;
                background: $inputBorder;
                border-radius:4px;
                cursor: pointer;
            }
        }
    }
    
    .content{
        display:inline-block;
        width: 100%;
        height: calc(100% - 192px);
        background: $backGroup;
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
        width: 100%;
        height: 40px;
        line-height: 30px;
        background: $backGroup;
        text-align: right;
        span{
            display: inline-block;
            margin: 0 20px 10px 0;
            height: 30px;
            width:72px;
            background: $inputBorder;
            text-align: center;
            cursor: pointer;
            color:$fontFFF;
        }
    }
    .el-table td:first-child > .cell{
        padding-left: 44px !important;
    }
}


</style>