<template>
  <div id="app">
    <router-view/>
    <div class="loading" v-if="loading"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(22, 29, 40, 0.1)">
    <div v-show = 'false'>
      {{loading}}
    </div>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  created() {
      //在页面加载时读取localStorage里的状态信息
      if(localStorage.getItem("KTstoreMsg")){
          this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("KTstoreMsg"))));
      }
      localStorage.setItem("KTstoreMsg",null)
      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{
          localStorage.setItem("KTstoreMsg",JSON.stringify(this.$store.state))
      })
      this.getModulesInfo()
  },
  computed:{
      loading(){
          return this.$store.state.coins.loading
      },
  },
  methods:{
    getModulesInfo(){
          buttonApi.scencelist({params:{user_id:8}}).then((res)=>{
              console.log('获取模版导航栏以及配置=',res.payload)
              this.$store.commit('contract/modulesInit',res.payload)
          })
      },
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/reset.scss';
@import '~@/assets/styles/common.scss';
@import '~@/assets/font/iconfont.css';
.loading{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: $backGroup;
}
.el-loading-mask{
  background: $backGroup !important;
  span{
    color: $fontBlue;
  }
  .el-loading-spinner i{
    color: $fontBlue;
  }
  .el-loading-spinner .el-loading-text{
    color: $fontBlue;
  }
  .el-loading-spinner .path{
    stroke:$fontBlue;
  }
}
</style>
