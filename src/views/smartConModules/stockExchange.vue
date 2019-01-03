<template>
    <div class="stockExchange">
        <!-- 智能合约填写信息 -->
        <div class="head">
            <span class="title" @click="toModules">智能合约</span>
        </div>
        <div class="content">
           <div class="c_title">
               股权兑换
           </div>
           <!-- 过渡线条 -->
            <div class="gradient">

            </div>
            <!-- 股权兑换 表单 -->
            <div class="exchange_form el-form-item">
                <div class="form-item">
                    <p>兑换内容</p>
                    <el-input v-model="content" placeholder="请输入兑换内容"></el-input>
                </div>
                <div class="form-item deduction">
                    <p>Token兑换比例</p>
                    <span>可兑换Token数量&nbsp;&nbsp;/&nbsp;&nbsp;</span>
                    <el-input v-model="percent" placeholder="请输入抵扣数量"></el-input>             
                    <span>&nbsp;&nbsp;比例</span>
                    <p><img :src="image">用户可得股数等于用户要兑换的token数量除以可兑换的token比例，比例等于1股可兑换多少token</p>
                </div>
                <div class="form-item remark">
                    <p>备注</p>
                    <el-input v-model="remark" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
                </div>
            </div>
            <div>
                <el-button type="default" @click="goBack">取消</el-button>
                <el-button type="primary" @click="save">提交</el-button>
            </div>
            <!-- 股权兑换 预览 -->
            <el-dialog
                :title="dialogHeader"
                :visible.sync="centerDialogVisible"
                width="715px"
                :close-on-click-modal="false"
                center>
                <div class="con_modules con_modules_dialog">
                    <div class="con_modules_left">
                        <k-alert></k-alert>
                        <div class="content">
                            <div class="preview_item">
                                <span class="left">兑换内容:</span><p class="left">{{content}}</p>
                            </div>
                            <div class="preview_item">
                                <span class="left">Token兑换比例:</span><p class="left">可兑换的Token数量 / {{percent}}</p>
                            </div>
                            <div class="preview_item">
                                <span class="left">备注:</span><p class="left">{{remark}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit" >确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";
import kAlert from "@/components/orderDetails/alertCom"

export default {
    data() {
        return {
            content: '',
            percent: '',
            remark: '',
            image: require('@/assets/images/icon/coins_warn.png'),
            imgSrc:require('@/assets/images/icon/coins_warning.png'),
            dialogHeader: '股权兑换',
            centerDialogVisible: false,
            shockList:[]
        }
    },
    components:{
       kAlert
    },
    created() {
        this.getList()
    },
    mounted(){

    },
    computed:{
       
    },
    methods:{
        getList(){
            let msg = {
                user_id:this.$store.state.login.userInfo.user_id,
                scence_template_id:5,
                enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id
            }
            buttonApi.behaviorlist({params:msg}).then((res)=>{
                console.log('获取股权兑换信息==',res.payload)
                this.shockList = res.payload
                let msg = res.payload[0]
                if(msg){
                    this.content = msg.name||'';
                    this.percent = msg.proportion||'';
                    this.remark = msg.remark||'';
                }
            })
        },
        goBack(){
            this.$router.back(-1)
        },
        // 保存预览
        save(){
            let _self = this;
            if(!this.content || !this.percent || !this.remark){
                return this.$confim('info','请填写完整信息')
            }else{
                this.centerDialogVisible = true;
            }
        },
        // 提交 股权兑换行为
        submit(){
            if(this.shockList&&this.shockList.length!=0){
                let msg ={
                    behavior_id: this.shockList[0].id,
                    name: this.content,
                    proportion:this.percent,
                    remark:  this.remark
                };
                buttonApi.behavioredit(msg).then((res) =>{
                    if(res.payload.status == 200){
                        this.centerDialogVisible = false;
                        this.$confim("success", res.payload.msg || "提交成功");
                        this.$router.push({ path: '/homepage/smartConModules'});
                    }else{
                        this.$confim('error',res.payload.msg||'提交失败')
                    }
                })
            }else{
                let msg ={
                    user_id: this.$store.state.login.userInfo.user_id,
                    scence_template_id: 5,
                    enterprice_coin_id: this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id,
                    name: this.content,
                    proportion: this.percent,
                    remark:  this.remark,
                }
                buttonApi.addFinancing(msg).then((res) =>{
                    if(res.payload.status == 200){
                        this.centerDialogVisible = false;
                        this.$confim("success", res.payload.msg || "提交成功");
                        this.$router.push({ path: '/homepage/smartConModules'});
                    }else{
                        this.$confim('error',res.payload.msg||'提交失败');
                    }
                })
            }

            
        },
        toModules(){
            this.$router.back(-1)
        }
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.stockExchange{
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
            color:$fontFFF;
            cursor: pointer;
        }
    }
    .content{
        display:inline-block;
        width: 100%;
        height: calc(100% - 102px);
        background: $backGroup;
        .c_title{
            display:inline-block;
            width: 100%;
            height: 46px;
            line-height: 46px;
            font-size: 18px;
            padding: 0 30px;
            text-align: left;
            color:$fontFFF;
        }
        // 股权兑换表单
        .exchange_form{
            width: 600px;
            margin-left: 30px;
            height: calc(100% - 130px);
            .form-item{
                margin: 10px 0;
                float: left;
                width: 600px;
                p{
                    text-align: left;
                    font-size: 16px;
                    line-height: 40px;
                    color: $fontFFF;
                }
                .el-input,
                .el-textarea{
                    ::-webkit-input-placeholder{
                        color: $fontdark;
                    }
                }
            }
            .deduction{
                .el-input{
                    float: left;
                    width: 402px;
                }
                span{
                    float: left;
                    font-size: 16px;
                    line-height: 40px;
                    color: $fontFFF;
                    text-align: center;
                    font-size: 500;
                }
                p{
                    img{
                        margin-right: 8px;
                    }
                    &:nth-child(5){
                        color: $fontA2A2A2;
                        font-size: 12px;
                    }
                }
            }
        }
         // 模态框 css
        .con_modules_dialog{
            .warning{
                padding: 40px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -135px 0 0 -220px;
                width: 440px;
                height: 270px;
                background: $fontFFF;
                border-radius: 4px;
                box-shadow:0px 4px 12px 0px rgba(0,0,0,0.16);
                img{
                    width: 40px;
                    height: 35px;
                    margin: 10px 160px;
                }
                p{
                    color: $font3;
                    font-size: 16px;
                    line-height: 24px;
                    text-align: center;
                    font-weight: 500;
                    span{
                        color: $fontFAAD14;
                    }
                }
                button{
                    margin: 30px 0;
                    width: 64px;
                    margin-left: 151px;
                }
            }
            .content{
                width: 600px;
                .preview_item{
                    float: left;
                    margin: 15px 0;
                    font-weight: 500;
                    span{
                        margin-right: 20px;
                        width: 130px;
                        font-size: 16px;
                        text-align: right;
                    }
                    p{
                        text-align: left;
                        word-break: break-all;//纯数字,字母 会出现不换行的情况
                        width: 400px;
                        color: $fontFFF;
                        font-size: 20px;
                        line-height: 20px;
                    }
                }
            }
        }
    }
}


</style>