<template>
    <!-- information -->
    <div class="information">
        <!-- information -->
        <div class="head">
            <span style="font-size:16px">
                币种资料
            </span>
        </div>
        <!-- 过渡线条 -->
        <div class="gradient">

        </div>
         <!-- 数据 -->
        <div class="content">
            <!-- <el-button type="primary" @click="addUser">添加用户</el-button> -->
            <el-button type="primary" @click="userList">用户登陆</el-button>
            <!-- <el-button type="primary" @click="test">测试</el-button> -->
            <dl>
                
            </dl>
        </div>
    </div>
</template>
<script>

import apiLogin from "@/service/apiLogin";

export default {
    data() {
        return {
            setInterval:null,
        }
    },
    created() {

    },
    computed:{
        
    },
    mounted(){
     this.setInterval = setInterval(() => {
            this.userList()
        }, 5000);
    },
    methods:{
       addUser(){
           let msg = {
               phone:'18862601720',
               password:'123',
               account:'cai',
               userInfo:{
                   nickname:'jay',
                   kkc:'100000',
                   eth:'1000'
               }
           }
           apiLogin.addUser(msg).then((res)=>{
               console.log('添加用户成功==',res,msg)
           })
       },
       userList(){
           apiLogin.userList().then((res)=>{
               for(let i = 0;i<res.payload.length;i++){
                    if(res.payload[i].user_id==8){
                        this.$store.commit('login/userInfo',res.payload[i])
                        this.$store.state.login.login = true
                        break
                    }
               }
               
           })
       },
       test(){
        //    let value = 0.9887678608;
        //    let idx = 8;
        //    let it = value.toFixed(idx + 1)
        //     it = it.substring(0, it.length - 1)
        //     console.log(it)
       }
    },
    beforeDestroy(){
        clearInterval(this.setInterval);
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.information{
    display:inline-block;
    height: 362px;
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
    }
    .content{
        display:inline-block;
        height: 132px;
        width: 100%;
        float: left;
        overflow: scroll;
    }
    
}

</style>