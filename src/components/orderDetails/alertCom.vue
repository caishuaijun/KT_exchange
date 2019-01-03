<template>
    <!-- alertCom -->
    <div class="alertCom" v-if="alertShow">
       <div class="alertCom_warn">
            <img src="@/assets/images/icon/coins_warning.png">
            <p>合约部署到区块链是不可修改的，后期修改需要繁<br>琐的审核程序，请仔细检查提交的合约内容！ <br>倒计时（<span class="alertCom_time">{{time}}</span>）秒</p>
            <el-button type="primary" @click="showWarning" v-if="time == 0 ">确 定</el-button>
            <el-button type="info" v-if="time > 0">确 定</el-button>
        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {
            time:3,
            alertShow:true,
            setInterval:null,
        }
    },
    created() {

    },
    computed:{
        
    },
    mounted(){
        this.setInterval = setInterval(()=>{
            this.time--
            if(this.time==0){
                clearInterval(this.setInterval)
            }
        },1000)
    },
    methods:{
       showWarning(){
           this.alertShow = false;
       },
    },
    beforeDestroy(){

    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.alertCom{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index:9999;
    .alertCom_warn{
        padding: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -135px 0 0 -220px;
        width: 440px;
        height: 270px;
        background: $fontFFF;
        border-radius: 4px;
        box-shadow:0px 4px 12px 0px rgba(0,0,0,0.16);
        img{
            width: 40px;
            height: 35px;
            margin: 10px 160px;
        }
        p{
            color: $font3;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            font-weight: 500;
            span{
                color: $fontFAAD14;
            }
        }
        button{
            margin: 30px 0;
            width: 64px;
            height: 32px;
            margin-left: 151px;
        }
    }
}

</style>