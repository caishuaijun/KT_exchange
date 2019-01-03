<template>
    <div class="smartContracts">
        <!-- 智能合约填写信息 -->
        <div class="head">
            <span class="title">智能合约</span>
        </div>
        <div class="content">

            <div  v-if="isAuthority">
                <div class="c_title">
                    填写信息
                </div>
                <!-- 过渡线条 -->
                    <div class="gradient">
                        
                    </div>
                    <div class="con_modules">
                        <el-form :model="ruleForm"  ref="ruleForm" label-width="130px">
                            <el-form-item label="公司名称" prop="name">
                                <el-input disabled type="text" v-model="ruleForm.name" autocomplete="off" placeholder=""></el-input>
                                <div class="warn_text">
                                        <img src="@/assets/images/icon/coins_warn.png">
                                        <span>公司名称为必填项，填写完成进入下一步</span>
                                </div>
                                <!-- <ul class="selectTable" v-if="selectTable">
                                    <li v-for="(item,index) in selectList" :key="index" @mousedown="selectName(item.value,$event)">{{item.name}}</li>
                                </ul> -->
                            </el-form-item>
                        </el-form>
                    </div>
                    <div>
                        <el-button type="primary" @click="nextStep" v-if="ruleForm.name">下一步</el-button>
                        <el-button type="info" disabled v-if="!ruleForm.name">下一步</el-button>
                    </div>
            </div>
           <div class="authority" v-if="!isAuthority">
                <img src="../../assets/images/oneButtonCoin/con_none.png" alt="">
                <div class="authority_text">此功能属于邀请制，您暂时还不可使用</div>
            </div>
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";

export default {
    data() {
        return {
            ruleForm:{
                name:''
            },
            // selectTable:false,
            // selectList:[
            //     {
            //         name:'kt',
            //         value:'KT'
            //     },
            //     {
            //         name:'kt',
            //         value:'KT'
            //     },
            //     {
            //         name:'kt',
            //         value:'KT'
            //     }
            // ],
            isAuthority:true,//邀请
        }
    },
    components:{
       
    },
    created() {
        this.getCompanyInfo()
    },
    mounted(){

    },
    computed:{
       userInfo(){
            let userInfo = this.$store.state.login.userInfo
            return userInfo
        },
    },
    methods:{
        getCompanyInfo(){
            console.log('this.userInfo.user_id==',this.userInfo.user_id)
            buttonApi.getCompanyInfo({params:{user_id:this.userInfo.user_id}}).then((res)=>{
                if(res.payload.status==200){
                    this.ruleForm.name = res.payload.msg.name
                }else{
                    this.isAuthority = false;
                }
            })
        },
        // selectName(name){
        //     this.ruleForm.name = name;
        //     this.selectTable = false;
        // },
        nextStep(){
            this.$router.push({ path: '/homepage/smartConModules'});
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.smartContracts{
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
        .authority{
            text-align: center;
            margin-top: 50px;
            .authority_text{
                height:24px;
                font-size:24px;
                font-weight:500;
                color:$fontD6;
                line-height:24px;
                margin-top: 30px;
            }
        }
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
        .con_modules{
            display:inline-block;
            width: 600px;
            height: calc(100% - 190px);
            min-height: 400px;
            overflow: scroll;
            margin-top: 50px;
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
                }
            .selectTable{
                position: relative;
                top:-42px;
                background: $fontFFF;
                text-align: left;
                li{
                    color:$font3;
                    padding: 0 20px;
                    cursor: pointer;
                    &:hover{
                        background: $fontBlue;
                        color:$fontFFF;
                    }
                }
            }
        }
    }
}


</style>