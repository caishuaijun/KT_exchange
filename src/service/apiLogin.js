import API from "./api";
import configParams from "./config";

const addUser = params => API.$post(configParams.addUser, params, {});
const userList = params => API.$get(configParams.userList, params, {});

const loginApi = {
    addUser,
    userList
}
export default loginApi;