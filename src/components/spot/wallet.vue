<template>
    <div class="wallet">
        {{prz_new}}
        <dl>
            <dt>净资产折合：</dt>
            <dd v-for="(item,key) in walletList" :key="key">
                <b v-if="showbalance">{{item.vol}}</b>
                <b v-else>****</b>
                <i>{{key}}</i>
                <span class="rmbstyle" v-if="showbalance">
                    ≈ {{item.RMB}} CNY
                </span>
                <span class="rmbstyle" v-else>
                    ≈ **** CNY
                </span>
            </dd>
        </dl>
        <i v-if="showbalance" @click="change" class="showbalance">隐藏</i>
        <i v-else @click="change" class="showbalance">显示</i>
    </div>
</template>
<script>

// import coinsApi from "@/service/apiCoins";
import utils from "@/util/util";
export default {
    data() {
        return {
           walletList:{
               'KT': {
                    vol:'0.00',
                    RMB:'0.00',
               },
               'ETH':{
                    vol:'0.00000000',
                    RMB:'0.00'
               },
           },
           showbalance:true,
           setInterval:null,
        }
    },
    created() {

    },
    mounted(){
        this.walletGet()
        this.setInterval = setInterval(() => {
            this.walletGet()
        }, 5000);
    },
    computed:{
        // ETH  KKC实时行情
        prz_new(){
            let prz = this.$store.state.coins.prz
            if(prz['ETH']){
                this.walletList['ETH'].RMB = (prz['ETH']*this.walletList['ETH'].vol*prz['USDT']).toFixed(2)
            }
            // return prz
        },
        userInfo(){
            let userInfo = this.$store.state.login.userInfo
            return userInfo
        },
    },
    methods:{
        walletGet(){
            coinsApi.getAssets({params:{user_id:this.userInfo.user_id}}).then((res)=>{
                // console.log('钱包资金===',res.payload)
                let prz = this.$store.state.coins.prz;
                let msg = res.payload;
                let wallet = {};
                msg.forEach(elem => {
                    if(elem.name=="KT"||elem.name=="ETH"){
                        this.walletList[elem.name] = {
                            vol:'0.00',
                            RMB:'0.00',
                        }
                        let name = this.walletList[elem.name]
                        if(name){
                            let assetsAll = utils.fix(Number(elem.assets) + Number(elem.freeze_assets),4)
                            name.vol = assetsAll
                            name.RMB = (prz[elem.name]*name.vol*prz['USDT']).toFixed(2)
                            let item = {
                                coin:elem.name,
                                assetsAll:assetsAll,
                                assets:elem.assets,
                                freeze_assets:elem.freeze_assets,
                                user_id:this.userInfo.user_id
                            };
                            wallet[elem.name] = item
                        }
                    }
                });
                this.$store.commit('login/walletInfo',wallet)
            })
        },
        change(){
            this.showbalance = !this.showbalance
        }
    },
    beforeDestroy(){
        clearInterval(this.setInterval);
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.wallet{
    display: inline-block;
    width: 100%;
    height: 150px;
    background:$backGroup;
    padding:30px 20px 0;
    border-radius: 3px;
    background: url('~@/assets/images/wallet_icon.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    dl{
        display:inline-block;
        dt{
            padding-bottom: 10px;
            font-size: 16px;
            color:$fontFFF;
        }
        dd{
            padding:10px 0px;
            font-size: 16px;
            b,i,span{
                color:$fontFFF;
            }
        }
        .rmbstyle{
            // opacity: 0.5;
        }
    }
    .showbalance{
        cursor: pointer;
        top: 30px;
        right: 20px;
        margin-top: 5px;
        position: absolute;
    }
}

</style>