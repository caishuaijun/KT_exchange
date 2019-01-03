<template>
    <div class="header_box">
        <div class="header">
            <div class="header_left">
                <img src="@/assets/images/logo.png" alt="">
            </div>

            <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect" menu-trigger="click">

                <el-menu-item index="/homepage/spot">权益互换</el-menu-item>

                <!-- <el-menu-item index="/homepage/buy_kkc">法币交易</el-menu-item> -->

                <el-menu-item index="/homepage/smartContracts">智能合约</el-menu-item>

                <el-menu-item index="" style="float:right;margin:0">Kindle+钱包</el-menu-item>

                <el-menu-item index="/homepage/coinsDetails" style="float:right">交易记录</el-menu-item>

                <!-- <el-menu-item index="/homepage/coinsDetails">Kindle+钱包</el-menu-item> -->

            </el-menu>

            <div class="header_right">
                <div class=""></div>
                <!-- <div class="header_right_text" @click="toDeatilOrder">交易记录</div> -->
                <!-- <div class="header_right_text">Kindle+钱包</div> -->
                <div class="header_right_set">
                    <el-dropdown trigger="click" placement='bottom'>
                        <div class="header_right_userbox">
                            <span>188****1720@163.com</span>
                        </div>
                        <el-dropdown-menu slot="dropdown" class="kl_select_menulist">
                            <el-dropdown-item>
                                <div class="header_right_listitem">
                                    <span class="header_icon ibass-user"></span>个人设置
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div class="header_right_listitem">
                                    <span class="header_icon ibass-faq"></span>帮助中心
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div class="header_right_listitem">
                                    <span class="header_icon ibass-logout"></span>退出
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            // activeIndex: '/homepage/spot'
        }
    },
    created() {

    },
    computed:{
        activeIndex(){
            return this.$route.path
        },
    },
    mounted(){

    },
    methods:{
        handleSelect(key, keyPath) {
        },
        // toDeatilOrder(){
        //     this.$router.push({ path: '/homepage/coinsDetails'})
        // },
    }

}
</script>
<style lang="scss" scoped>
@import '../assets/styles/mixin';

.header_box {
    width: 100%;
    background: #262D44;
    height: 60px;
    line-height: 60px;
}

.header {
    display: inline-block;
    width: 100%;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
}
.el-menu-demo{
    display: inline-block;
    height: 60px;
    width:calc(100% - 390px);
}

.header_left {
    display: inline-block;
    width: 130px;
    float: left;
    margin-right: 50px; 
    img{
        position: relative;
        top: 6px;
        left: 0px;
    }
}

.header_right {
    display: inline-block;
    width: 200px;
    float: right;
    text-align: right;
    .header_right_text{
        display: inline-block;
        margin-right: 30px;
        cursor: pointer;
    }
    .header_right_set{
        display: inline-block;
    }
}

.header_right_userbox {
    cursor: pointer;
}

.el-dropdown-menu__item {
    min-width: 180px;
    color: $back;
    padding: 0px;

    &>span {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 20px;
    }

    &:hover {
        background-color: #f8f8f9;
        color: $back;
    }
}

.header_right_list {}


.header_right_listitem {
    height: 32px;
    cursor: pointer;
    padding: 0px 12px;

    &:hover {
        background: #F9F8F6;
    }

    .header_icon {
        line-height: 1em;
        color: $back;
        font-size: 18px;
        margin-right: 15px;
        margin-top: 2px;
    }
}
</style>