<template>
    <div class="spotList">
        <dl>
            <dt>市场</dt>
            
            <!-- <dd v-for="item in spotList" :key="item.symbol">
                <span class="symbol">
                    {{item.symbol}}
                </span>
                <span class="lastprice">
                    <b >最新价</b>
                    <i>{{item.lastprice}}</i>
                </span>
                <span class="rf">
                    <b >涨跌幅</b>
                    <i>{{item.rf}}</i>
                </span>
            </dd> -->

            <dd>
                <span class="symbol">
                    {{symbolTick.symbol}}
                </span>
                <span class="lastprice">
                    <b >最新价</b>
                    <i>{{symbolTick.lastprice}}</i>
                </span>
                <span class="rf">
                    <b >涨跌幅</b>
                    <i :class="[symbolTick.rf>0?'uprfpre':symbolTick.rf<0?'downrfpre':'']">{{symbolTick.rfPre}}</i>
                </span>
            </dd>
        </dl>
    </div>
</template>
<script>


export default {
    data() {
        return {
           spotList:[
               {
                    lastprice:'0.00000000',
                    rf:'0.00%',
                    symbol:'KKC/ETH'
               }
           ],
        }
    },
    created() {

    },
    mounted(){
     
    },
    computed:{
        symbolTick(){
            return this.$store.state.coins.tick
        }
    },
    methods:{
        
    }


}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.spotList{
    display: inline-block;
    width: 100%;
    height: 180px;
    background:$backGroup;
    padding:30px 20px 0;
    border-radius: 3px;
    background: url('~@/assets/images/spotList_icon.png') no-repeat center center;
    background-size: 100% 100%;
    margin-top: 10px;
    .symbol{
        display: inline-block;
        width: 100%;
        text-align: right;
        color:$fontFFF;
        font-size: 16px;
        height: 35px;
        line-height: 35px;
    }
    .lastprice,.rf{
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        color:$fontFFF;
        font-size: 16px;
        i{
            float: right;
        }
        b{
            float: left;
        }

    }
    dl{
        display:inline-block;
        width: 100%;
        dt{
            font-size: 16px;
            color:$fontFFF;
        }
        dd{
            padding:0px;
            font-size: 16px;
            b,i,span{
                color:$fontFFF;
            }
        }
    }
    .uprfpre {
        color: $uprfpre;
    }

    .downrfpre {
        color: $downrfpre;
    }
}

</style>