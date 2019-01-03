<template>
    <div class="oneButtonCoin">
       <!-- <el-button @click="click">测试websocket</el-button> -->
        <div class="block">
            <div class="coin_img">
                <!-- <span>一键发币</span> -->
            </div>
            <div :class="[step==2||step==4?'form_bg':'','coin_form']">

                <!-- 表单 -->
                <div class="coin_con">
                        <!-- 第一步生成代币 -->
                    <el-form :model="ruleForm"  ref="ruleForm" label-width="130px"  v-if="step=='0'">
                        <el-form-item label="代币全称：" prop="name">
                            <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入代币全称" @blur="regInputname"></el-input>
                             <div class="warn_text">
                                 <img src="@/assets/images/icon/coins_warn.png">
                                 <span>仅可英文字母和数字组合，限制20字以内</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="代币符号：" prop="ab">
                            <el-input type="text" v-model="ruleForm.ab" autocomplete="off" placeholder="请输入代币符号" @blur="regInputab"></el-input>
                            <div class="warn_text">
                                 <img src="@/assets/images/icon/coins_warn.png">
                                 <span>大写字母，五个字以内</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="发行总量：" prop="amout">
                            <el-input v-model.number="ruleForm.amout" placeholder="100000" @blur="regInputamout"></el-input>
                            <div class="warn_text">
                                 <img src="@/assets/images/icon/coins_warn.png">
                                 <span>系统预设100000，不设上限</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="可分小数位数：" prop="decimal">
                            <el-input v-model.number="ruleForm.decimal" placeholder="18" @blur="regInputdecimal"></el-input>
                            <div class="warn_text">
                                 <img src="@/assets/images/icon/coins_warn.png">
                                 <span>代币小数位数</span>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('1')">生成代币</el-button>
                        </el-form-item>
                    </el-form>


                    <!-- 第2步确认手续费 -->
                    <el-form label-position="top" :model="ruleForm2"  ref="ruleForm2" label-width="100px" v-if="step=='1'" class="fees_form">
                        <el-form-item label="可用额度：" prop="range">
                            <el-input disabled type="text" v-model="ruleForm2.range" autocomplete="off" placeholder=""></el-input>
                            <div class="warn_text" v-if="moreFees">
                                 <img src="@/assets/images/icon/coins_error.png">
                                 <span class="info_error">可用余额不足！需充值</span>
                            </div>
                            <span class="recharge">充值</span>
                        </el-form-item>
                        <el-form-item label="手续费：" prop="fees">
                            <el-input disabled type="text" v-model="ruleForm2.fees" autocomplete="off" placeholder=""></el-input>
                            <span style="display:inline-block;color:#333;font-size:12px;margin-top:15px;">合同部署</span>
                        </el-form-item>
                        <el-form-item style="display:inline-block;margin-top:30px;height:50px">
                            <el-button class="fees_cancal_btn" @click="resetForm('0')">取消</el-button>
                            <el-button class="fees_sure_btn" @click="submitForm2('2')">确认</el-button>
                        </el-form-item>
                    </el-form>


                    <!-- 第3步支付成功 -->
                    <div class="order_success" v-if="step=='2'">
                        <div class="_title">
                            支付成功
                        </div>
                        <div class="_con">
                            支付成功，需要等待三到五分钟时间···
                        </div>
                        <div class="_btn">
                            <i class="el-icon-loading"></i> 正在生成...
                        </div>
                    </div>



                    <!-- 第4步合约创建成功 -->
                    <div class="s_title" v-if="step=='3'">
                        合约创建成功
                    </div>
                    <el-form :model="ruleForm"  ref="ruleForm" label-width="130px"  v-if="step=='3'" class="success_form">
                        <el-form-item label="代币全称：" prop="name">
                            <el-input disabled type="text" v-model="ruleForm.name" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="代币符号：" prop="ab">
                            <el-input disabled type="text" v-model="ruleForm.ab" autocomplete="off" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item  label="发行总量：" prop="amout">
                            <el-input disabled v-model.number="ruleForm.amout" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item  label="可分小数位数：" prop="decimal">
                            <el-input disabled v-model.number="ruleForm.decimal" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item  label="地址：" prop="address">
                            <el-input disabled v-model.number="ruleForm.address" placeholder="" ></el-input>
                            <!-- 复制 -->
                            <div class="recharge" id="form_address" :data-clipboard-text="ruleForm.address">
                                <span @click="copyAddress">复制</span>
                            </div>
                            <span class="to_wallet">去钱包查看代币</span>
                        </el-form-item>
                    </el-form>
                    
                     <!-- 第5步合约部署超时-->
                    <div class="order_error" v-if="step=='4'">
                        <div class="_title">
                            合约部署超时
                        </div>
                        <div class="_con">
                            合约部署超时，并不意味着您的合约没有部署成功
                            请切换至<span class="to_orderDetail">交易记录</span>查看
                        </div>
                        <div class="_btn">交易记录</div>
                    </div>


                </div>

                <!-- 底部步骤条 -->
                <div class="coin_footer">
                    <span :class="[step=='0'?'active':'','coin_step']"></span>
                    <span :class="[step=='1'?'active':'','coin_step']" ></span>
                    <span :class="[step=='2'?'active':'','coin_step']" ></span>
                    <span :class="[step=='3'?'active':'','coin_step']" ></span>
                    <span :class="[step=='4'?'active':'','coin_step']" ></span>
                </div>

            </div>
        </div>
    </div>
</template>
<script>

import utils from '@/util/util'

export default {
    data() {
        return {
            step:'0',
            ruleForm: {
                name: '',
                ab: '',
                amout: '',
                decimal:'',
                address:''
            },
            ruleForm2:{
                range:'0KT ≈ 0.00CNY',
                fees:'1000KT ≈ 1000CNY'
            },
            moreFees:false,
            setInterval:null,
            coinName:null,
            enterprice_coin_id:null,
        };
    },
    created() {
        this.getCoinInfo()
    },
    computed:{
        // 交易对价格
        tickPrice(){
            return this.$store.state.coins.prz
        },
    },
    methods:{
        // 查询代币基本信息
        getCoinInfo(){
            this.enterprice_coin_id = this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id
            buttonApi.enterpriceinfo(
                {
                    params:{
                        enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id
                    }
                }).then((res)=>{
                console.log('查询代币基本信息===',res.payload,this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id)
                if(res.payload.status==200){
                    let msg = res.payload.msg
                    this.ruleForm = {
                        name:msg.name,
                        ab:msg.sign,
                        amout:msg.total_num,
                        decimal:msg.decimal_count,
                        address:msg.address
                    }
                    this.coinName = msg.name
                }
            })
        },
        // 一键发币表格
        submitForm(val) {
            let reg = new RegExp(/^[A-Za-z0-9]{2,20}$/);
            let reg2 = new RegExp(/^[A-Z]{1,5}$/);
            let reg3 = new RegExp(/^[0-9]+$/);
            if(this.ruleForm.name==''){
                console.log('代币全称不能为空')
                return this.$confim('error','代币全称不能为空');
            }
            if(!reg.test(this.ruleForm.name)||!isNaN(Number(this.ruleForm.name))){
                console.log("代币全称不符合");
                return this.$confim('error','代币全称不符合条件');
            }
            if(this.ruleForm.ab==''){
                console.log('代币符号不能为空')
                return this.$confim('error','代币符号不能为空');
            }
            if(!reg2.test(this.ruleForm.ab)){
                return this.$confim('error','代币符号不符合条件');
                console.log("代币符号不符合条件");
            }
            if(!reg3.test(this.ruleForm.amout)){
                console.log("发行总量请输入数字");
                return this.$confim('error','发行总量请输入数字');
            }
            if(this.ruleForm.decimal==''){
                console.log('可分小数位数不能为空')
                return this.$confim('error','可分小数位数不能为空');
            }
             if(!reg3.test(this.ruleForm.decimal)){
                console.log("可分小数位数请输入数字");
                return this.$confim('error','可分小数位数请输入数字');
            }


            let msg = {
                name:this.ruleForm.name,
                sign:this.ruleForm.ab,
                total_num:Number(this.ruleForm.amout)||100000,
                decimal_count:Number(this.ruleForm.decimal),
                user_id:this.$store.state.login.userInfo.user_id
            }
            
            console.log('this.coinName==this.ruleForm.name==',this.coinName==this.ruleForm.name)
            if(this.coinName==this.ruleForm.name){
                this.getFeesAndAsset(msg,val)
                this.step = val
                return 
            }


            buttonApi.querysign({params:{sign:this.ruleForm.ab}}).then((res)=>{//查询代币是否存在
                if(res.payload=='001'){
                   this.$confim('error','代币符号已存在') 
                }else{
                    this.$confirm('确认创建代币?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        buttonApi.generate(msg).then((res)=>{ ///创建代币
                            if(res.payload.status==200){
                                this.getFeesAndAsset(msg,val)
                                this.enterprice_coin_id = res.payload.msg
                                this.$confim('success','创建成功')
                            }else{
                                return this.$confim('error',res.payload.msg||'创建失败')
                            }
                        })
                    })
                }
            })
        },

        // 2.1用户账户kkc数量和手续费的详情
        getFeesAndAsset(msg,val){
            buttonApi.getkkcinfo({params:{user_id:this.$store.state.login.userInfo.user_id}}).then((template)=>{
                console.log('用户账户kt数量和手续费的详情=',template)
                let temp = template.payload
                let blance = utils.fix(temp.assets,2)
                let fees = utils.fix(temp.poundage,2)
                this.moreFees = Number(temp.assets)<Number(temp.poundage)?true:false
                this.ruleForm2.range = blance+'KT ≈ '+(blance*this.tickPrice['ETH']*this.tickPrice['USDT']).toFixed(2)+'CNY'
                this.ruleForm2.fees = fees+'KT ≈ '+(fees*this.tickPrice['ETH']*this.tickPrice['USDT']).toFixed(2)+'CNY'
                this.step = val
            })
        },

        // 手续费表格
        submitForm2(val){
            this.$confirm('确认扣除手续费?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                buttonApi.release({params:{user_id:this.$store.state.login.userInfo.user_id}}).then((res)=>{
                    if(res.payload.status==200){
                        this.$store.commit('contract/txHash',res.payload.msg)
                        this.$confim('success','手续费扣除成功')
                        this.step = val
                        this.checkStatus()
                    }else{
                        this.$confim('error',res.payload.msg||'手续费扣除失败')
                    }
                    console.log('收取用发币手续费=',res)
                })
            })
        },
        // 上一步
        resetForm(val) {
            this.step = val
            this.getCoinInfo()
        },

        checkStatus(){
            let time = 0;
            let msg = {
                tx_hash:this.$store.state.contract.txHsah,
                enterprice_coin_id:Number(this.enterprice_coin_id)
            }
            this.setInterval = setInterval(()=>{
                console.log('参数',msg)
                buttonApi.querytransactionstatus({params:msg}).then((res)=>{
                    console.log('检查部署代币页面=',res.payload)
                    if(res.payload.status==200){
                        this.ruleForm.address = res.payload.msg
                        this.step = '3'
                        clearInterval(this.setInterval)
                        this.setInterval = null
                    }else if(res.payload.status==406){
                        this.step = '4'
                        if(time>=18000000){
                            clearInterval(this.setInterval)
                            this.setInterval = null
                            this.step = '4'
                        }
                    }
                })
                time+=15000;
            },15000) 
        },
        // 查询结果
        queryStatus(item){
            // let msg = {
            //     tx_hash:this.$store.state.contract.txHsah,
            //     enterprice_coin_id:Number(this.enterprice_coin_id)
            // }
            // buttonApi.querytransactionstatus({params:msg}).then((res)=>{
            //         console.log('检查部署代币页面=',res.payload)
            //         if(res.payload.status==200){
            //             hash = true
            //         }
            //     })
        },

        // 复制
        copyAddress(){
            let btn = document.getElementById('form_address');
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

        // 表单验证
        regInputname(){
            // if(this.ruleForm.name==''){
            //     console.log('代币名称不能为空')
            //     return 
            // }
            // let reg = new RegExp(/^( [A-Za-z])(?=.*\d)[A-Za-z\d]{2,20}$/);
            // if(!reg.test(this.ruleForm.name)){
            //     console.log("不符合");
            // }else{
            //     console.log("符合");
            // }
        },
        // 表单验证 
        regInputab(){
            if(this.coinName==this.ruleForm.name){
                return
            }
            buttonApi.querysign({params:{sign:this.ruleForm.ab}}).then((res)=>{
                if(res.payload=='001'){
                   this.$confim('error','代币符号已存在') 
                }
            })
        },
        // 表单验证
        regInputamout(){
            // if(this.ruleForm.amout==''){
            //     console.log('发行总量不能为空')
            //     return 
            // }
        },
        // 表单验证
        regInputdecimal(){
            // if(this.ruleForm.decimal==''){
            //     console.log('可分小数位数不能为空')
            //     return 
            // }
        },

        // click(){
        //     let ws = new WebSocket("ws://prejys.sogukz.com:9505?situations=1");
        //     console.log('ws==',ws)
        //     ws.onopen = function () {};
        //     ws.onmessage = function (evt) {
        //         console.log("数据已接收...",JSON.parse(evt.data));
        //     };
        //     ws.onclose = function () {
        //         console.log("连接已关闭...");
        //     };
        // }
    },
    beforeDestroy(){
        clearInterval(this.setInterval)
        this.setInterval = null
    }

}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.oneButtonCoin{
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/oneButtonCoin/bg.png') no-repeat center center;
    background-size: 100% 100%;
    .block{
        display: inline-block;
        width: 1200px;
        height: 458px;
        margin-top: 100px;
        text-align: left;
        .recharge{
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0;
            background: $font007;
            width: 88px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            color: $fontFFF;
            span{
                color: $fontFFF;
            }
        }
        .fees_form{
            
        }
        .coin_img{
            display: inline-block;
            width: 400px;
            height: 100%;
            background: url('~@/assets/images/oneButtonCoin/small_bg.png') no-repeat center center;
            background-size: 100% 100%;
            float: left;
            text-align: left;
            padding: 25px 0 0 40px;
            font-size: 30px;
            font-weight: 600;
        }
        .coin_form{
            display: inline-block;
            width: 800px;
            height: 100%;
            float: right;
            background: $fontFFF;
            .coin_con{
                display: inline-block;
                width: 100%;
                height: calc(100% - 30px);
                padding: 40px 0 10px;
                .warn_text{
                    display: inline-block;
                    width: 100%;
                    height: 20px;
                    text-align: left;
                    font-size:12px;
                    padding-top: 3px;
                    img{
                        vertical-align: text-top;
                    }
                    span{
                        color: $fontA2A2A2;
                    }
                    .info_error{
                        color: $fontE70012;
                    }
                }
                .order_success,.order_error{
                    display: inline-block;
                    width:400px;
                    height: 200px;
                    margin: 80px 200px;
                    ._title{
                        font-size:24px;
                        font-weight:500;
                        color:$font3;
                        margin: 30px 0;
                    }
                    ._con{
                        color:$font3;
                        font-size:16px;
                        margin: 30px 0;
                    }
                    ._btn{
                        width:140px;
                        height:40px;
                        line-height:40px;
                        color:$font3;
                        font-size:16px;
                        background:$font007;
                        border-radius:4px;
                        text-align: center;
                        color: $fontFFF;
                    }
                }
                .order_error{
                    .to_orderDetail{
                        cursor: pointer;
                        color:$font007;
                    }
                    ._btn{
                        cursor: pointer;
                    }

                }
                .success_form{
                    .to_wallet{
                        display: inline-block;
                        color: $font007;
                        cursor: pointer;
                        font-size: 12px;
                        margin-top: 20px;
                        border-bottom: 1px solid $font007;
                        height: 16px;
                    }
                }
                .s_title{
                    margin: 0 0 20px 157px;
                    font-size:24px;
                    font-weight:500;
                    color:$font3;
                }
            }
            .coin_footer{
                display: inline-block;
                width: 100%;
                height: 20px;
                text-align: right;
                padding-right: 30px;
                .coin_step{
                    display: inline-block;
                    width: 20px;
                    height: 4px;
                    background: #F1F1F1;
                    // cursor: pointer;
                }
                .active{
                    background: #A2BAFF;
                }
            }
        }
        .form_bg{
            background: url('~@/assets/images/oneButtonCoin/form_bg.png') no-repeat center center;
            background-size: 100% 100%;
        }
    }
    
}

</style>