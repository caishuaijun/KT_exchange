<template>
    <!-- 公告 -->
    <div class="notice">
        <!-- 公告 -->
        <div class="head">
            <span style="font-size:16px">
                公告
            </span>
        </div>
        <!-- 过渡线条 -->
        <div class="gradient">

        </div>
         <!-- 数据 -->
        <div class="content">
            <dl>
                <dd v-for="(item,index) in noticeList" :key="index">
                    <span class="title">
                        {{item.title}}
                    </span>
                    <span class="date">
                        {{item.date}}
                    </span>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {
            noticeList:[
                {
                    title:'关于原始派发KT的交易规则',
                    date:'2018-11-30 13:23:00'
                },
                {
                    title:'关于原始派发KT的交易规则',
                    date:'2018-11-30 13:23:00'
                },
                {
                    title:'关于原始派发KT的交易规则',
                    date:'2018-11-30 13:23:00'
                }
            ]
        }
    },
    created() {

    },
    computed:{
        
    },
    mounted(){
     
    },
    methods:{
       
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.notice{
    display:inline-block;
    height: 182px;
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
        height: 120px;
        width: 100%;
        float: left;
        overflow: scroll;
        dl{
            display:inline-block;
            width: 100%;
            height: 100%;
            dd{
                display:inline-block;
                margin: 0 20px 5px;
                &:not(:first-child){
                    border-top: 2px solid $border;
                }
                .title{
                    display:inline-block;
                    width: 100%;
                    font-size:14px;
                    padding: 5px 0;
                }
                .date{
                    display:inline-block;
                    width: 100%;
                    font-size:12px;
                    padding: 5px 0;
                }
            }
        }
    }
}

</style>