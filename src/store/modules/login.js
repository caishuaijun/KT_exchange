const state = {
    userInfo: { //用户信息
        ETH: "0.00000000",
        KT: "0.00000000",
        nickname: null,
        user_id: 8
    },
    walletInfo: { //钱包信息

    },
    login: true, //用户是否登录
};



// getters
const getters = {

};


// actions
const actions = {

};

// mutations
const mutations = {
    userInfo(context, msg) {
        context.userInfo = msg
    },
    walletInfo(context, msg) {
        if (!context.login) return
        context.walletInfo = msg
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}