const state = {
    modulesInfo: {},
    txHsah: null,
};



// getters
const getters = {

};


// actions
const actions = {

};

// mutations
const mutations = {
    modulesInit(context, msg) {
        context.modulesInfo = msg
    },
    txHash(context, msg) {
        context.txHsah = msg
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}