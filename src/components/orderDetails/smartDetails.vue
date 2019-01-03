<template>
    <!-- smartDetails -->
    <div class="smartDetails">
        <div class="counter" v-if="toDetails==0">
            <div class="content_main_h">
                <div class="smart_header">
                    交易记录 > 成交明细
                </div>
                <!-- 过渡线条 -->
                <!-- <div class="gradient">
                </div> -->
                <!-- 复制地址 -->
                <!-- <div class="smart_address">
                    <span>{{address}}</span>
                    <div class="copy_address" id="smart_address" :data-clipboard-text="address">
                        <span @click="copyAddress"><i class="el-icon-document"></i>复制</span>
                    </div>
                </div> -->
            </div>

            <div class="content_main_c">
                <div class="smart_header">
                    列队
                </div>
                <!-- 过渡线条 -->
                <div class="gradient">
                </div>
                <div>
                    <el-table
                        :data="waitList"
                        style="width: 100%"
                        height="110"
                        >
                        <el-table-column
                        prop="date"
                        label="时间"
                        min-width="220"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="token"
                        label="token符号"
                        min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="statusShow"
                        label="订单状态"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="fees"
                        label="手续费"
                        min-width="180"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="content_main_c2">
                <div class="smart_header">
                    历史
                </div>
                <!-- 过渡线条 -->
                <div class="gradient">
                </div>
                <div ><!-- style="height:calc(100% - 70px);overflow:scroll" -->
                    <el-table
                        :data="historyList"
                        style="width: 100%"
                        highlight-current-row
                        @row-click="historyRowClick"
                        >
                        <el-table-column
                        prop="date"
                        label="时间"
                        min-width="220"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="token"
                        label="token符号"
                        min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="statusShow"
                        label="订单状态"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="fees"
                        label="手续费"
                        min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="right"
                                min-width="200">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click.native.prevent="detailsRow(scope.$index, historyList)">查看详情</el-button>
                                    <el-button :class="[scope.row.status==2||scope.row.status==3?'btnColor':'']" type="text" size="small" @click.native.prevent="deleteRow(scope.$index, historyList,scope.row.status)">删除订单</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        
        <!-- 详情页 -->
        <div class="counter" v-if="toDetails==1">
            <div class="details_main">
                <div class="smart_header">
                    <span @click="toDetails=0">交易记录</span> > <span @click="toDetails=0">成交明细</span> > <span>详情</span>
                </div>
                <!-- 过渡线条 -->
                <div class="gradient">
                </div>

                <div class="reView_con">

                    <div class="reView_item" v-for="(item,index) in detailsMsg" :key='index'>
                        <span class="label">{{item.scence.name}}：</span>
                        <button  v-for="(temp,idx) in item.template" :key='idx' @click="toModuleDetail(temp.scence_template_id)">{{temp.temname}}</button>
                    </div>
                    
                    <div class="reView_item">
                        <span class="label">代币全称：</span>
                        <i>{{enter.name}}</i>
                    </div>
                    <div class="reView_item">
                        <span class="label">代币符号：</span>
                        <i>{{enter.sign}}</i>
                    </div>
                    <div class="reView_item">
                        <span class="label">发行总量：</span>
                        <i>{{enter.total_num}}</i>
                    </div>
                    <div class="reView_item">
                        <span class="label">可分小数位数：</span>
                        <i>{{enter.decimal_count}}</i>
                    </div>
                </div>

                <div class="footer">
                    <button class="toETHCoins" @click="toETHCoins" v-if="enter.status!=2&&enter.status!=3">去部署</button>
                </div>

            </div>
        </div>

         <!-- 各模块详情页 -->
        <div class="counter" v-if="toDetails==2">
            <div class="details_main">
                <div class="smart_header">
                    <span @click="toDetails=0">交易记录</span> > <span @click="toDetails=0">成交明细</span> > <span @click="toDetails=1">详情</span> > {{moduleName[name]}}
                </div>
                <!-- 过渡线条 -->
                <div class="gradient">
                </div>
                <!-- 预览详情 -->
                <!-- 行为激励 -->
                <div class="review_last" v-if="name == '1'">
                    <el-table
                        :data="behaviorData"
                        style="width: 100%"
                        height="490"
                        border
                        >
                        <el-table-column
                        type="index"
                        label="序号"
                        width="80"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="行为"
                        min-width="180"
                        :show-overflow-tooltip='true'>
                        </el-table-column>
                        <el-table-column
                        prop="token_num"
                        label="发放Token数量"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="备注"
                        min-width="180"
                        :show-overflow-tooltip='true'>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 内部融资 -->
                <div class="review_last" v-else-if="name == '2'">
                    <div class="reView_con">
                        <div class="reView_item">
                            <span class="label">行为：</span>
                            <i>{{financing.name}}</i>
                        </div>
                        <div class="reView_item">
                            <span class="label">融资额度：</span>
                            <i>{{financing.credit}}</i>
                        </div>
                        <div class="reView_item">
                            <span class="label">发放Token规则：</span>
                            <i>融资额度 X {{financing.proportion}}</i>
                        </div>
                        <div class="reView_item">
                            <span class="label" >备注：</span>
                            <i>{{financing.remark}}</i>
                        </div>
                    </div>
                    
                </div>
                <!-- 股权兑换 -->
                <div class="review_last" v-else>
                    <div class="reView_con">
                        <div class="reView_item">
                            <span class="label">兑换内容：</span>
                            <i>{{shock.name}}</i>
                        </div>
                        <div class="reView_item">
                            <span class="label">抵扣Token数量：</span>
                            <i>{{shock.token_num}}</i>
                        </div>
                        <div class="reView_item">
                            <span class="label">备注：</span>
                            <i>{{shock.remark}}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import utils from "@/util/util";

export default {
    data() {
        return {
            address:"",
            waitList:[],
            historyList:[],
            behaviorData: [],
            financing:{},//内部融资
            shock:{},//股权兑换
            toDetails:0,//步骤条
            moduleName:{
                "1":"行为激励",
                "2":"内部融资",
                "3":"福利兑换",
                "4":"营业分红",
                "5":"股权兑换"
            },
            name:'',//模块名
            status:{
                "0":"未绑定代币",
                "1":"等待发币",
                "2":"发币中",
                "3":"发币成功",
                "4":"发币失败"
            },
            detailsMsg:{},
            enter:{},
            setInterval:null,
            enterprice_coin_id:null,//当前页面的货币id
        }
    },
    created() {
        this.initLinedUp()
        this.initHistory()
    },
    computed:{
        
    },
    mounted(){
        
    },
    methods:{
        initLinedUp(){
            buttonApi.linedUp({params:{user_id:this.$store.state.login.userInfo.user_id}}).then((res)=>{
                console.log('列队记录=',res.payload)
                if(res.payload.status==200){
                    this.waitList=[];
                    let msg = res.payload.msg
                    this.waitList.push(this.init(msg))
                }
            })
        },
        initHistory(){
            clearInterval(this.setInterval)
            this.setInterval = null
            buttonApi.deployhistory({params:{user_id:this.$store.state.login.userInfo.user_id}}).then((res)=>{
                console.log('部署历史=',res.payload)
                if(res.payload&&res.payload.length>0){
                    this.address = res.payload[0].address
                }
                this.historyList=[];
                let status = [];
                res.payload.forEach(item => {
                    if(item.status==2){
                        status.push(item)
                    }
                    this.historyList.push(this.init(item))
                });
                this.checkStatus(status)
            })
        },
        checkStatus(arr){
            let len = arr.length
            arr.forEach((item,index)=>{
                let msg = {
                    enterprice_coin_id:item.enterprice_coin_id,
                    tx_hash:item.tx_hash
                }
                buttonApi.querytransactionstatus({params:msg}).then((res)=>{
                    console.log('检查部署代币页面=',res.payload)
                    if(res.payload.status==200){
                        let enter = res.payload.msg.enter
                        this.initHistory()
                        len--
                    }
                })
            })
            this.setInterval = setInterval(()=>{
                arr.forEach((item,index)=>{
                    let msg = {
                        enterprice_coin_id:item.enterprice_coin_id,
                        tx_hash:item.tx_hash
                    }
                    buttonApi.querytransactionstatus({params:msg}).then((res)=>{
                        console.log('检查部署代币页面=',res.payload)
                        if(res.payload.status==200){
                            let enter = res.payload.msg.enter
                            this.initHistory()
                            len--
                        }
                    })
                })
                if(len==0){
                    clearInterval(this.setInterval)
                    this.setInterval = null
                }
            },15000)
        },

        // 查询结果
        queryStatus(arr,len){
            arr.forEach((item,index)=>{
                let msg = {
                    enterprice_coin_id:item.enterprice_coin_id,
                    tx_hash:item.tx_hash
                }
                buttonApi.querytransactionstatus({params:msg}).then((res)=>{
                    console.log('检查部署代币页面=',res.payload)
                    if(res.payload.status==200){
                        let enter = res.payload.msg.enter
                        this.initHistory()
                        len--
                    }
                    return len
                })
            })
        },
        init(msg){
            let item = {
                date: utils.dateFtt("yyyy-MM-dd hh:mm:ss",new Date(msg.created_at*1000)),
                token: msg.sign||'--',
                fees: utils.fix(msg.poundage,2)+' KT',
                status:msg.status,
                statusShow:this.status[msg.status],
                enterprice_coin_id:msg.enterprice_coin_id,
                address:msg.address
            }
            return item
        },
        
        // 预览模块详情
        toModuleDetail(name){
            if(name=='3'||name=='4') {
                return this.$confim('info','该模版无法预览！')
            }
            this.toDetails = 2
            this.name = name
            let temp = {
                    user_id:this.$store.state.login.userInfo.user_id,
                    scence_template_id:Number(name),
                    enterprice_coin_id:this.enterprice_coin_id
                }
            buttonApi.behaviorlist({params:temp}).then((res)=>{
                if(this.name=='1'){
                    this.behaviorData = []
                    res.payload.forEach(item => {
                        this.behaviorData.push(item)
                    });
                }else if(this.name=='2'){
                    this.financing = res.payload[0]
                }else if(this.name=='5'){
                    this.shock = res.payload[0]
                }
                console.log('获取详情==',temp,res.payload)
            })
        },
        
        // 查看详情
        detailsRow(index, rows){
            buttonApi.tokensdetails({params:{user_id:this.$store.state.login.userInfo.user_id,enterprice_coin_id:Number(rows[index].enterprice_coin_id)}}).then((res)=>{
                console.log('查看部署详情=',res.payload,rows[index].enterprice_coin_id)
                let msg = res.payload.msg
                if(res.payload.status==200){
                    this.enterprice_coin_id = rows[index].enterprice_coin_id
                    this.detailsMsg = {}
                    for(let key in msg){
                        if(key == 'enter'){
                            this.enter = msg[key]||{};
                            continue
                        }
                        this.detailsMsg[key] = msg[key]||{}
                    }
                    this.toDetails = 1
                }else{
                    this.$confim('info',msg)      
                }
            })
        },
        //删除
        deleteRow(index,rows,status) {
            if(status==2||status==3) return
            this.$confirm('确认要删除当前订单?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                buttonApi.deleteAll({params:{user_id:this.$store.state.login.userInfo.user_id,enterprice_coin_id:Number(rows[index].enterprice_coin_id)}}).then((res)=>{
                    console.log('删除订单=',res)
                    if(res.payload.status==200){
                        this.waitList=[];
                        rows.splice(index, 1);
                        this.$confim('success',res.payload.msg||'删除成功')
                    }else{
                        this.$confim('info',res.payload.msg||'已取消删除')      
                    }
                })
            }).catch(() => {
                this.$confim('info','已取消删除')      
            });
        },

        // 单击历史列表
        historyRowClick(row){
            this.address = row.address
            console.log(row)
        },

       // 复制
        copyAddress(){
            if(!this.address) return this.$confim('info','暂无地址')
            let btn = document.getElementById('smart_address');
            let clipboard = new Clipboard(btn);
            //复制成功执行的回调，可选
            clipboard.on('success', (e)=> {
                this.$confim('success','复制成功')
                clipboard.destroy();
            });
            //复制失败执行的回调，可选
            clipboard.on('error', (e)=> {
                this.$confim('error','复制失败')
                clipboard.destroy();
            });
        },
        toETHCoins(){
            this.$router.push({ path: '/homepage/oneButtonCoin'})
        },
    },
    beforeDestroy(){
        console.log('清除定时器')
        clearInterval(this.setInterval)
        this.setInterval = null
        console.log('清除定时器',this.setInterval)
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.smartDetails{
    display:inline-block;
    height: 100%;
    width: 100%;
    border-radius: 3px;
    overflow:scroll;
    .counter{
        display:inline-block;
        height: 100%;
        width: 100%;
        border-radius: 3px;
    }
    .content_main_h{
        display: inline-block;
        width: 100%;
        height: 50px;
        background: $backGroup;
        margin-bottom: 10px;
    }
    .content_main_c{
        display: inline-block;
        width: 100%;
        height: 180px;
        background: $backGroup;
        margin-bottom: 10px;
    }
    .content_main_c2{
        display: inline-block;
        width: 100%;
        height: calc(100% - 250px);
        background: $backGroup;
        margin-bottom: 10px;
    }
    
    .smart_header{
        display: inline-block;
        width: 100%;
        height: 48px;
        line-height: 48px;
        text-align: left;
        font-size:18px;
        padding: 0 20px;
        span{
            cursor: pointer;
        }
    }
    .smart_address{
        display: inline-block;
        width: 100%;
        height: 100px;
        line-height: 100px;
        font-size:20px;
        padding: 0 20px;
        .copy_address{
            display: inline-block;
            cursor: pointer;
            margin-left: 20px;
        }
    }
    .details_main{
        display: inline-block;
        width: 100%;
        height: 100%;
        background: $backGroup;
        .review_last{
            display: inline-block;
            width: 100%;
            height: calc(100% - 82px);
            margin-top: 20px;
            padding: 0 20px;
        }
        .reView_con{
            display: inline-block;
            width: 100%;
            height: calc(100% - 162px);
            margin-top: 30px;
            padding: 0 20px;
            text-align: left;
            .reView_item{
                display: inline-block;
                width: 100%;
                height:60px;
                line-height: 60px;
                button{
                    width:106px;
                    height:32px;
                    background:#4A5F99;
                    border-radius:2px;
                    color: $fontFFF;
                    font-size:16px;
                    margin-right: 30px;
                    cursor: pointer;
                }
                .label{
                    display: inline-block;
                    width: 150px;
                    text-align: right;
                    margin-right: 20px;
                }
                span{
                    font-size:16px;
                }
                i{
                    display: inline-block;
                    width: 600px;
                    line-height: 30px;
                    height: auto;
                    font-size:20px;
                    color: $fontFFF;
                }
            }
        }
        .footer{
            .toETHCoins{
                width:140px;
                height:40px;
                background:#007AFF;
                border-radius:4px;
                color: $fontFFF;
                font-size:16px;
                cursor: pointer;
            }
        }
    }
}

</style>