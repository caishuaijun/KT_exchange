import API from './api';
import configParams from './config';

const buttonCoins = params => API.$post(configParams.buttonCoins, params, {});
const ethAddress = params => API.$get(configParams.ethAddress, params, {});
const ethBalance = params => API.$get(configParams.ethBalance, params, {});


const getCompanyInfo = params => API.$get(configParams.getcompanyinfo, params, {});
const scencelist = params => API.$get(configParams.scencelist, params, {});
const behavioradd = params => API.$post(configParams.behavioradd, params, {});
const behaviorlist = params => API.$get(configParams.behaviorlist, params, {});
const behavioredit = params => API.$post(configParams.behavioredit, params, {});
const searchbehavior = params => API.$get(configParams.searchbehavior, params, {});
const importbehavior = params => API.$post(configParams.importbehavior, params, {});
const delbehavior = params => API.$get(configParams.delbehavior, params, {});
const generate = params => API.$post(configParams.generate, params, {});
const getkkcinfo = params => API.$get(configParams.getkkcinfo, params, {});
const release = params => API.$get(configParams.release, params, {});
const linedUp = params => API.$get(configParams.linedUp, params, {});
const deployhistory = params => API.$get(configParams.deployhistory, params, {});
const enterpriceinfo = params => API.$get(configParams.enterpriceinfo, params, {});
const querysign = params => API.$get(configParams.querysign, params, {});
const deleteAll = params => API.$get(configParams.deleteAll, params, {});
const tokensdetails = params => API.$get(configParams.tokensdetails, params, {});
const querytransactionstatus = params => API.$get(configParams.querytransactionstatus, params, {});


const addFinancing = params => API.$post(configParams.addFinancing, params, {});
const submitFinancing = params => API.$post(configParams.submitFinancing, params, {});
const delempty = params => API.$get(configParams.delempty, params, {});

const buttonApi = {
    getCompanyInfo,
    scencelist,
    behavioradd,
    behaviorlist,
    behavioredit,
    searchbehavior,
    importbehavior,
    delbehavior,
    generate,
    getkkcinfo,
    release,
    addFinancing,
    submitFinancing,
    linedUp,
    deployhistory,
    enterpriceinfo,
    querysign,
    deleteAll,
    tokensdetails,
    delempty,
    querytransactionstatus
};
export default buttonApi;