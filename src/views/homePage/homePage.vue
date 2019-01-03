<template>
    <el-container>
        <ec-header></ec-header>
        <div :class="[keyPath=='/homepage/spot'?'main':'main2']">
            <router-view></router-view>
        </div>

        <div :class="[keyPath=='/homepage/spot'?'foot':'foot2']">
            <ec-footer></ec-footer>
        </div>
    </el-container>
</template>
<script>

import ecHeader from '@/layout/header.vue'
import ecFooter from '@/layout/footer.vue'

export default {
    data() {
        return {

        }
    },
    components: {
        ecHeader,
        ecFooter
    },
    computed:{
        keyPath(){
            return this.$route.path
        },
    },
    created() {
        // console.log('测试路由==',this.$route.path)
    },
    mounted(){

    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
.main{
    background:#161D28;
    width:100%;
    height: 100%;
    min-width: 1310px;
    overflow: scroll;
}
.main2{
    background:#161D28;
    width:100%;
    min-width: 1310px;
    overflow: scroll;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 115px;
    text-align: center;
}
.foot2{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;

}
.el-container{
    display: inline-block;
    width:100%;
    height: 100%;
}
</style>