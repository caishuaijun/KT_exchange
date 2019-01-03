<template>
<!-- v-show="loading" -->
    <div class="smartConModules" v-show="loading">
        <!-- 智能合约模块信息 -->
        <div class="head">
            <span class="title" @click="toModules">智能合约</span>
        </div>
        <div class="content">
           <div class="c_title">
               TOKEN 使用场景
           </div>
           <!-- 过渡线条 -->
            <div class="gradient">

            </div>
            <div class="con_modules">
                
                <div class="con_modules_item" v-for="(item,index) in modulesInfo['template']" :key="index">
                    <div class="con_modules_title">
                        <span>{{item['scence']['sname']}}</span>
                    </div>
                    <div class="con_modules_con">
                        <div class="block" v-for="(elem,idx) in item['template']" :key="idx">
                            <img  src="../../assets/images/oneButtonCoin/con_xingwei.png" @click="toModuleDetail(elem.scence_template_id)">
                            <div class="check_box">
                                <span>{{elem.tname}}</span>
                                <el-checkbox v-model="checked[idx]" @change="checkedModule(elem)"></el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="text-align:center">
                    <el-button type="primary" @click="toETHCoins">部署合约</el-button>
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
            moduleList:[
                {
                    name:'behavior',
                    img:require("../../assets/images/oneButtonCoin/con_xingwei.png"),
                    text:'行为激励',
                    checked:false
                },
                {
                    name:'financing',
                    img:require('../../assets/images/oneButtonCoin/con_neibu.png'),
                    text:'内部融资',
                    checked:false
                },
            ],
            moduleList2:[
                {
                    name:'welfare',
                    img:require("../../assets/images/oneButtonCoin/con_fuli.png"),
                    text:'福利兑换',
                    checked:false
                },
                {
                    name:'dividends',
                    img:require('../../assets/images/oneButtonCoin/con_fenhong.png'),
                    text:'营业分红',
                    checked:false
                },
                {
                    name:'stockExchange',
                    img:require('../../assets/images/oneButtonCoin/con_guquan.png'),
                    text:'股权兑换',
                    checked:false
                },
            ],
            routerPath:{
                '1':'behavior',
                '2':'financing',
                '3':'welfare',
                '4':'dividends',
                '5':'stockExchange'
            },
            loading:true,
            checked:{},//模块勾选
        }
    },
    components:{
       
    },
    created() {
        this.getModulesInfo()
    },
    mounted(){
        this.loading = true
        console.log('模块数据==',this.$store.state.contract.modulesInfo)
    },
    computed:{
       userInfo(){
            let userInfo = this.$store.state.login.userInfo
            return userInfo
        },
        modulesInfo(){
            
            return this.$store.state.contract.modulesInfo
        }
    },
    methods:{
        getModulesInfo(){
          buttonApi.scencelist({params:{user_id:this.userInfo.user_id}}).then((res)=>{
              let modulesInfo = res.payload
                if(modulesInfo&&modulesInfo.template){
                    for(let k in modulesInfo.template){
                        for(let key in modulesInfo.template[k].template){
                            this.checked[key] = modulesInfo.template[k].template[key].open==1?true:false
                        }
                    }
                }
                this.$store.commit('contract/modulesInit',res.payload)
          })
        },
        toETHCoins(){
            console.log('this.checked==',this.checked)
            let hash = false
            for(let key in this.checked){
                if(this.checked[key]==true){
                    hash = true;
                    break;
                }
            }
            if(hash){
                this.loading = false
                this.$router.push({ path: '/homepage/oneButtonCoin'})
            }else{
                this.$confim('info','至少选择一个模版')
            }
                
        },
        // 选择框
        checkedModule(item){
            if(item.scence_template_id==1||item.scence_template_id==2||item.scence_template_id==5) return
            if(item.open){
                let msg = {
                    user_id:this.$store.state.login.userInfo.user_id,
                    scence_template_id:item.scence_template_id
                }
                
                this.$confirm('是否确认删除'+item.tname+'模版?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    buttonApi.delempty({params:msg}).then((res)=>{
                        if(res.payload.status==200){
                            this.getModulesInfo()
                            this.$confim('success',res.payload.msg||'删除成功')
                        }else{
                            this.$confim('error',res.payload.msg||'删除失败')
                        }
                    })
                })

            }else{
                let msg = {
                    user_id:this.$store.state.login.userInfo.user_id,
                    scence_template_id:item.scence_template_id,
                    enterprice_coin_id:this.$store.state.contract.modulesInfo.scenceList.enterprice_coin_id,
                    proportion:'0.5',
                    name:item.tname,
                    credit:item.scence_template_id
                }
                this.$confirm('是否确认添加'+item.tname+'模版?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    buttonApi.addFinancing(msg).then((res)=>{
                        if(res.payload.status==200){
                            this.getModulesInfo()
                            this.$confim('success',res.payload.msg||'添加成功')
                        }else{
                            this.$confim('error',res.payload.msg||'添加失败')
                        }
                    })
                })
            }
        },
        toModuleDetail(id){
            let name = this.routerPath[id]
            if(name=='welfare'||name=='dividends') return
            this.loading = false
            this.$router.push({ path: '/homepage/'+name})
        },
        toModules(){
            this.$router.go(-1)
        },
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.smartConModules{
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
        text-align: left;
        .c_title{
            display:inline-block;
            width: 100%;
            height: 46px;
            line-height: 46px;
            font-size: 18px;
            padding: 0 30px;
            color:$fontFFF;
        }
        .authority{
            text-align: center;
            margin: 20px;
            .authority_text{
                height:24px;
                font-size:24px;
                font-weight:500;
                color:$fontD6;
                line-height:24px;
                margin-top: 30px;
            }
        }
        .con_modules{
            display:inline-block;
            width: 100%;
            height: calc(100% - 60px);
            min-height: 400px;
            overflow: scroll;
            .con_modules_item{
                display:inline-block;
                width: 100%;
                height: calc(50% - 34px);
                min-height: 200px;
                .con_modules_title{
                    display:inline-block;
                    width: calc(100% - 60px);
                    height: 24px;
                    line-height: 24px;
                    margin: 10px 30px;
                    border-left: 4px solid #007AFF;
                    font-size:24px;
                    span{
                        display: inline-block;
                        margin:0 20px;
                    }
                }
                .con_modules_con{
                    display: inline-block;
                    width: calc(100% - 60px);
                    margin: 0 30px;
                    .block{
                        display: inline-block;
                        width: 320px;
                        height: 180px;
                        margin-right: 30px;
                        .check_box{
                            display: inline-block;
                            position: relative;
                            bottom: 40px;
                            left: 110px;
                            span{
                                color: $font3;
                                font-size:24px;
                            }
                        }
                    }
                    img{
                        vertical-align: middle;
                        display: inline-block;
                        width: 320px;
                        height: 180px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}


</style>