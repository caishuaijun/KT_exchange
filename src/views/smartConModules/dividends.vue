<template>
    <div class="dividends">
        <!-- 智能合约填写信息 -->
        <div class="head">
            <span class="title">智能合约</span>
        </div>
        <div class="content">
           <div class="c_title">
               营业分红
           </div>
           <!-- 过渡线条 -->
            <div class="gradient">
            </div>
            <!-- 营业分红表单 -->
            <div class="dividend_form el-form-item" v-if="showForm == 1">
                <div class="form-item content">
                    <p>兑换内容</p>
                    <el-input v-model="content" placeholder="请输入兑换内容"></el-input>
                </div>
                <div class="form-item rule">
                    <p>Token兑换规则</p>
                    <el-input v-model="money" placeholder="请输入金额"></el-input>
                    <span>*</span>
                    <el-input v-model="percent" placeholder="请输入百分比例"></el-input>
                    <span>%</span>
                    <p><img :src="image">持有数量/当年度实际发放数量</p>
                </div>
                <div class="form-item remark">
                    <p>备注</p>
                    <el-input v-model="remark" type="textarea" :rows="4" placeholder="请输入备注"></el-input>
                </div>
            </div>
            <div v-if="showForm == 1">
                <el-button type="default" @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
            <!-- 表单预览 -->
            <div class="dividend_preview" v-if="showForm == -1">
                <div class="content">
                    <div class="preview_item content">
                        <span class="left">兑换内容:</span><p class="left">{{content}}</p>
                    </div>
                    <div class="preview_item rule">
                        <span class="left">Token兑换规则:</span><p class="left">{{totalToken}}</p>
                        <p><img :src="image">持有数量/当年度实际发放数量</p>
                    </div>
                    <div class="preview_item remark">
                        <span class="left">备注:</span><p class="left">{{remark}}</p>
                    </div>
                </div>
            </div>
            <div v-if="showForm == -1">
                <el-button type="default" @click="goBack">返回</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";

export default {
    data() {
        return {
            showForm: 1,
            content: '营业分红',
            money: '1000',
            percent: '0.5',
            remark: '公司所有员工',
            image: require('../../assets/images/icon/coins_warn.png')
        }
    },
    components:{
       
    },
    created() {
    },
    mounted(){

    },
    computed:{
       totalToken: function () {
           return this.money * this.percent;
       }
    },
    methods:{
        cancel(){

        },
        save(){
            this.showForm = -1;
        },
        goBack(){
            this.showForm = 1;
        },
        submit(){
            this.$router.push({ path: '/homepage/smartConModules'})
        }
        // nextStep(){
        //     this.$router.push({ path: '/homepage/smartConModules'})
        // },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.dividends{
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
        // 营业分红表单
        .dividend_form{
            width: 600px;
            margin-left: 30px;
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
            .rule{
                .el-input{
                    float: left;
                    &:nth-child(2){
                        width: 381px;
                    }
                    &:nth-child(4){
                        width: 135px;
                    }
                }
                span{
                    float: left;
                    line-height: 40px;
                    color: $fontFFF;
                    width: 40px;
                }
                p{
                    &:nth-child(6){
                        font-size: 12px;
                        color: $fontA2A2A2;
                    }
                }
            }
        }
        // 营业分红预览
    
        .dividend_preview{
            width: 600px;
            .content{
                width: 600px;
                .preview_item{
                    float: left;
                    margin: 15px 0;
                    font-weight: 500;
                    span{
                        // float: left;
                        margin-right: 20px;
                        width: 130px;
                        font-size: 16px;
                        text-align: right;
                    }
                    p{
                        // float: left;
                        text-align: left;
                        width: 400px;
                        color: $fontFFF;
                        font-size: 20px;
                        line-height: 20px;
                    }
                }
                .rule{
                    p{
                        &:nth-child(3){
                            margin-top: 10px;
                            font-size: 12px;
                            float: left;
                            color: $fontA2A2A2;
                        }
                    }
                }
            }
        }
    }
}


</style>