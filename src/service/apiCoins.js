import API from "./api";
import configParams from "./config";

const getAssets = params => API.$get(configParams.getAssets, params, {});
const archivesMouths = params => API.$get(configParams.archivesMouths, params, {});
const dishMath = params => API.$get(configParams.dishMath, params, {});
const sendOrder = params => API.$post(configParams.sendOrder, params, {});
const currentEntrust = params => API.$get(configParams.currentEntrust, params, {});
const getDealOrder = params => API.$get(configParams.getDealOrder, params, {});
const historyEntrust = params => API.$get(configParams.historyEntrust, params, {});
const cancelOrder = params => API.$put(configParams.cancelOrder, params, {});
const cancelAllOrders = params => API.$put(configParams.cancelOrders, params, {});
const subOrders = params => API.$get(configParams.subOrders, params, {});
const allhistoryEntrust = params => API.$get(configParams.allhistoryEntrust, params, {});



const coinsApi = {
    getAssets,
    archivesMouths,
    dishMath,
    sendOrder,
    currentEntrust,
    getDealOrder,
    historyEntrust,
    cancelOrder,
    cancelAllOrders,
    subOrders,
    allhistoryEntrust
}
export default coinsApi;