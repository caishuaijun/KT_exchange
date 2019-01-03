<template>
    <div class="financing">
        <!-- 智能合约填写信息 -->
        <div class="head">
            <span class="title" @click="toModules">智能合约</span>
        </div>
        <div class="content">
           <div class="c_title">
               内部融资
           </div>
           <!-- 过渡线条 -->
            <div class="gradient">

            </div>
            <!-- 融资表单 -->
            <div class="create_financing_form el-form-item">
                <div class="item behave">
                    <p>行为</p>
                    <el-input v-model="behave" placeholder="请输入行为"></el-input>
                </div>
                <div class="item num">
                    <p>融资额度</p>
                    <el-input v-model="num" placeholder="请输入融资额度"></el-input>
                </div>
                <div class="item token">
                    <p>发放Token规则</p>
                    <span>融资额度&nbsp;&nbsp;&nbsp;X</span>
                    <el-input v-model="percent" placeholder="请输入数值"></el-input>
                    <span>&nbsp;&nbsp;&nbsp;比例</span>
                    <i>注：比例=1CNY等于多少token</i>
                </div>
                <div class="item remark">
                    <p>备注</p>
                    <el-input v-model="remark" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
                </div>
            </div>
            <div>
                <el-button type="default" @click="goBack">返回</el-button>
                <el-button type="primary" @click="save">提交</el-button>
            </div>
            <!-- 预览模态框 -->
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
                                <span class="left">行为:</span><p class="left">{{behave}}</p>
                            </div>
                            <div class="preview_item">
                                <span class="left">融资额度:</span><p class="left">{{num}}</p>
                            </div>
                            <div class="preview_item">
                                <span class="left">发放Token规则:</span><p class="left">{{totalToken}}</p>
                            </div>
                            <div class="preview_item">
                                <span class="left">备注:</span><p class="left">{{remark}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
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
            behave: '',
            num: '',
            percent: '',
            remark: '',
            centerDialogVisible: false,
            imgSrc:require('@/assets/images/icon/coins_warning.png'),
            dialogHeader:'新增行为',
            financingList:[]
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
        totalToken: function () {
            return this.num * this.percent;
        }
    },
    methods:{
        getList(){
            let msg = {
                user_id:this.$store.state.login.userInfo.user_id,
                scence_template_id:2,
                enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id
            }
            buttonApi.behaviorlist({params:msg}).then((res)=>{
                console.log('获取内部融资信息==',res.payload)
                this.financingList = res.payload
                let msg = res.payload[0]
                if(msg){
                    this.behave = msg.name||'';
                    this.num = msg.token_num||'';
                    this.percent = msg.proportion||'';
                    this.remark = msg.remark||'';
                }
            })
        },
        goBack(){
            this.$router.back(-1)
        },
        save(){
            let _self = this;
            if(!this.behave || !this.num || !this.percent || !this.remark){
                 return this.$confim('info','请填写完整信息')
            }else{
                this.centerDialogVisible = true;
            }
        },
        // 添加融资行为
        submit(){
            if(this.financingList&&this.financingList.length!=0){
                let msg ={
                    behavior_id: this.financingList[0].id,
                    name: this.behave,
                    token_num: this.num,
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
                    scence_template_id: 2,
                    enterprice_coin_id: this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id,
                    name: this.behave,
                    proportion: this.percent,
                    remark:  this.remark,
                    credit: this.num
                };
                buttonApi.addFinancing(msg).then((res) =>{
                    if(res.payload.status == 200){
                        this.centerDialogVisible = false;
                        this.$confim("success", res.payload.msg || "提交成功");
                        this.$router.push({ path: '/homepage/smartConModules'});
                    }else{
                        this.$confim('error',res.payload.msg||'提交失败')
                    }
                })
            }
            
        },
        toModules(){
            this.$router.back(-2)
        }
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.financing{
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
        .create_financing_form{
            width: 600px;
            margin-left: 30px;
            color:$inputBorder;
            height: calc(100% - 130px);
            .item{
                overflow: auto;
                zoom: 1;
                margin: 10px 0;
                p{
                font-size:16px;
                text-align: left;
                line-height: 30px;
                color: $fontFFF;
                }
                .el-input,
                .el-textarea{
                    ::-webkit-input-placeholder{
                        color: $fontdark;
                    }
                    .right_append_input{
                        border-right: 0;
                    }
                }
            }
            // 发放token
            .token{
                .el-input{
                    float: left;
                    width: 222px;
                    .el-input__inner{
                        background-color: black;
                        width:600px;
                        height:32px;
                        border-radius:4px;
                        border:2px solid $inputBorder;
                    }
                }
                span{
                    float: left;
                    width: 100px;
                    text-align: left;
                    line-height: 36px;
                    font-size: 14px;
                    color: $fontFFF;
                    &:nth-child(4){
                        width: 40px;
                    }
                }
                i{
                    display: inline-block;
                    width: 200px;
                    line-height: 36px;
                    text-align: right;
                    color: $fontdark;
                    font-size: 14px;
                    white-space: normal;
                }
            }
        }
        // 模态框 css
        .con_modules_dialog{
            


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