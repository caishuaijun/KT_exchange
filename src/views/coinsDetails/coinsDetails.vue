<template>
<!-- 发币状态详情 -->
    <div class="coinsDetails">
        <div class="head">
            <span class="title" @click="toModules">交易记录</span>
            <!-- 复制 -->
            <!-- <div class="d_address">   
                <span>地址</span>
                <el-input disabled v-model="address" placeholder="" ></el-input>
                <span class="d_addressCopy" id="d_addCopy" :data-clipboard-text="address" @click="copyAddress">复制</span>
            </div> -->
        </div>
        <div class="content">
            <div class="content_menu">
                <el-menu
                    default-active="2"
                    mode="vertical"
                    :collapse="isCollapse"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                    text-color="#fff"
                    active-text-color="#D6E0FF">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>权益互换</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <el-menu-item index="1_1">当前委托</el-menu-item>
                            <el-menu-item index="1_2">委托历史</el-menu-item> -->
                            <el-menu-item index="1_3">成交明细</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">智能合约</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2_1">成交明细</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">资金记录</span>
                    </el-menu-item>
                </el-menu>
            </div>
            
            <!-- 智能合约>成交明细 -->
            <div class="content_main">
                <!-- <k-order></k-order> -->
                <o-smartDetails ></o-smartDetails>
            </div>
            
        </div>
    </div>
</template>
<script>

import utils from "@/util/util";
import oSmartDetails from "@/components/orderDetails/smartDetails"
import kOrder from "@/components/spot/nowOrder"

export default {
    data() {
        return {
            isCollapse:false,
            coinsDetList:[],
            index:'',
        }
    },
    components:{
        oSmartDetails,
        kOrder
    },
    created() {

    },
    mounted(){

    },
    computed:{
       
    },
    methods:{
        // 选择回调
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
       copyAddress(){
           var btn = document.getElementById('d_addCopy');
            var clipboard = new Clipboard(btn);
             console.log('复制');
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
       toModules(){
           this.$router.push({ path: '/homepage/coinsDetails'});
       }
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.coinsDetails{
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
        .title{
            margin-left:  30px;
            float: left;
            font-size: 24px;
            color:$fontFFF;
        }
        // .d_address{
        //     display: inline-block;
        //     width: 500px;
        //     height: 60px;
        //     line-height: 60px;
        //     float: right;
        //     text-align: right;
        //     font-size: 16px;
        //     margin: 0 -50px;
        //     .el-input{
        //         width:260px;
        //         height: 32px;
        //         margin-left: 15px;
        //     }
        //     .d_addressCopy{
        //         display: inline-block;
        //         width: 80px;
        //         height:30px;
        //         line-height: 30px;
        //         background: #4A5F99;
        //         text-align: center;
        //         border-top-right-radius: 3px;
        //         border-bottom-right-radius: 3px;
        //         position: relative;
        //         top:1px;
        //         right: 85px;
        //         color: $fontFFF;
        //         cursor: pointer;
        //     }
        // }
    }
    .content{
        display:inline-block;
        width: 100%;
        height: calc(100% - 108px);
        overflow: scroll;
        .content_menu{
            display: inline-block;
            height: 100%;
            width:200px;
            float: left;
        }
        .content_main{
            display: inline-block;
            height: 100%;
            width:990px;
            float: right;
        }
        .c_head{
            display:inline-block;
            width: 100%;
            height: 48px;
            line-height: 48px;
            background: $backGroup;
            float: left;
            .title{
                margin-left: 30px;
                float: left;
                font-size: 18px;
                color:$fontFFF;
            }
        }
        .con_ing{
            display:inline-block;
            width: 100%;
            height: 266px;
            margin-bottom: 10px;
            background: $backGroup;
        }
        .con_history{
            display:inline-block;
            width: 100%;
            margin-bottom: 10px;
            background: $backGroup;
        }
    }
}


</style>