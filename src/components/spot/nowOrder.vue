<template>
    <!-- 当前委托 -->
    <div class="order">
        <!-- 当前委托 -->
        {{lastCurOrder}}
        <div class="head">
            <span style="font-size:16px">
                当前委托
            </span>
            <span class="cancal_all" @click="cancalAll">
                全部撤单
            </span>
        </div>
        <!-- 过渡线条 -->
        <div class="gradient">

        </div>
         <!-- 数据 -->
        <div class="content">
            <el-table
                :data="orderData"
                height="120"
                style="width: 100%"
                >

                <!-- brbrbrbrbrbr -->
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
                label="数量"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="amount"
                label="委托总额"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="avol"
                label="已成交"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="nvol"
                label="未成交"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="right">
                    <template slot-scope="scope">
                        <el-button
                        @click.native.prevent="deleteRow(scope.$index, orderData)"
                        type="text"
                        size="small">
                        撤单
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";

export default {
    data() {
        return {
            orderData: []
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
            if(this.$store.state.coins.islastCurOrder){
                let lastCurOrder = this.$store.state.coins.lastCurOrder
                console.log('this.orderData[i]2222==',this.orderData,lastCurOrder)
                let hash = true
                for(let i=0; i<this.orderData.length; i++){
                    if(this.orderData[i].id == lastCurOrder.id){
                        console.log('this.orderData[i]==',this.orderData[i],lastCurOrder)
                        if(lastCurOrder.status==1){
                            this.orderData[i] = this.initOrder(lastCurOrder)
                        }else{
                            this.orderData.splice(i,1)
                        }
                        hash = false
                        break
                    }
                }
                if(hash&&lastCurOrder.status==1){
                    this.orderData.unshift(this.initOrder(lastCurOrder))
                }
                this.$store.state.coins.islastCurOrder = false
                this.$store.state.coins.isHistoryChange = true //接着判断委托历史界面
            }
        }
    },
    mounted(){
        this.getMyorders()
    },
    methods:{
        getMyorders(){
            let info = {
                user_id:this.userInfo.user_id,
                page:1,
                page_size:10
            }
            coinsApi.currentEntrust({params:info}).then((res)=>{
                console.log('当前委托==',res.payload)
                res.payload.forEach(item => {
                    let a = this.initOrder(item)
                    this.orderData.push(a)
                });
            })
        },

        initOrder(item){
            let data = {
                id:item.id,
                amount: item.consumption,
                vol: utils.fix(item.trade_num,8),
                price: utils.fix(item.proportion,8),
                avol: utils.fix(item.trading_num,8),
                symbol: item.currency_type,
                trade_type:item.trade_type,
                date: utils.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(item.created_at*1000)),
                dir: item.trade_type==1?'买入':'卖出',
                nvol: (Number(item.trade_num)-Number(item.trading_num)).toFixed(8),
                status:item.status
            }
            return data
        },
        // 单个撤单
        deleteRow(index, rows) {
            this.$confirm('是否确认撤单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                coinsApi.cancelOrder({
                    _id:rows[index].id,
                    user_id:this.userInfo.user_id
                }).then((res)=>{
                    rows.splice(index, 1);
                    this.$confim('success','撤单成功')
                })
            }).catch(() => {
                this.$confim('info','已取消撤单')      
            });
        },
        cancalAll(){
            if(!this.orderData||this.orderData.length==0) return
            this.$confirm('是否确认全部撤单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                coinsApi.cancelAllOrders({
                user_id:this.userInfo.user_id
            }).then((res)=>{
                    this.orderData = []
                    this.$confim('success','全部撤单成功')
                    console.log('全部撤单==',res)
                })
            }).catch(() => {
                this.$confim('info','已取消全部撤单')      
            });
            
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.order{
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
        .cancal_all{
            font-size:16px;
            float:right;
            color:$fontBlue;
            cursor: pointer;
        }
    }
    .content{
        display:inline-block;
        height: 120px;
        width: 100%;
        float: left;
        overflow: scroll;
        .green{
            color: $depthbid;
        }
        .red{
            color: $depthask;
        }
    }
}

</style>