<template>
    <!-- 底部 -->
    <div class="footer">
         <!-- 数据 -->
        <div class="content">
            <div class="left">
                <!-- <div class="left_hang">
                    <span class="left_title">
                        友情链接:
                    </span>
                    <span class="left_item">
                        喵喵拼
                    </span>
                    <span class="left_item">
                        搜股XFOF
                    </span>
                    <span class="left_item">
                        搜股XPE
                    </span>
                    <span class="left_item">
                        证券日报
                    </span>
                </div> -->
                <div class="left_hang">
                    <span>
                        客服电话:
                    </span>
                    <span style="margin-left: 30px;">
                        021-80125603
                    </span>
                </div>
            </div>
            <div class="right">
                <img src="@/assets/images/weibo.png" alt="">
                <img src="@/assets/images/weixin.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {
            
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
@import '../assets/styles/mixin';

.footer{
    display:inline-block;
    height: 114px;
    width: 100%;
    min-width: 1310px;
    background: $backGroup;
    border-top: 1px solid #141627;
    .content{
        display:inline-block;
        height: 114px;
        width: 100%;
        padding: 26px 300px;
        .left{
            line-height: 64px;
            font-size: 16px;
            .left_item{
                margin-left: 30px;
                cursor: pointer;
                &:hover{
                    color:$fontFFF;
                }
            }
        }
        .right{
            line-height: 64px;
            img{
                vertical-align: middle;
                margin-left: 30px;
            }
        }
    }
}

</style>