// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入elementUI创建
import ElementUI from 'element-ui'
import './assets/styles/element-variables.scss'
import App from './App'
import store from './store' // 引入store
import Clipboard from 'clipboard';
import coinsApi from "@/service/apiCoins";
import buttonApi from "@/service/apiButton";

window.Clipboard = Clipboard;
window.coinsApi = coinsApi;
window.buttonApi = buttonApi;


import router from './router'
//import axios from './config/fetch'
Vue.config.productionTip = false;
//Vue.prototype.$axios = axios
// 使用elementui插件
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

store.dispatch('coins/init');

router.beforeEach((to, from, next) => {
    store.state.coins.loading = true
    next();
});
router.afterEach((to, from) => {
    store.state.coins.loading = false
});

// console.log = () => {};
// console.info = () => {};
// console.error = () => {}

//消息弹窗
//错误类型
//icontype=>
//1.success成功
//2.info提示
//3.fail失败
//text=>提示文字
Vue.prototype.$confim = (icontype, text) => {
    Vue.prototype.$message({
        message: text,
        type: icontype,
        // iconClass: 'icon_message_' + icontype,
        customClass: 'modal_' + icontype,
        showClose: true,
        duration: 3000
    })
}