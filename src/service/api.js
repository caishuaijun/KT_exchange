//axios封装
import axios from 'axios'
import qs from 'qs'
import appConfig from '../config/env'
axios.defaults.baseURL = appConfig.apiurl_one //连接的基本url
axios.interceptors.request.use(
    config => {
        config.timeout = 300000
        if (config.headers['Content-Type'] != 'multipart/form-data') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => error
)
const baseConfig = {
    headers: {
        'content-Type': 'application/x-www-form-urlencoded'
    }
}

function handlerReponse(response) {
    let data = response.data
        // console.log('2222', data, response)
    if (data.code = '10000') { //正确的处理
        return Promise.resolve(data)
    }
    //可以进行错误的处理
}


const api = {
    axios: axios,
    $get: (url, data, config) => axios.get(url, data, config)
        .then(handlerReponse)
        .catch((error) => {
            return Promise.reject(error);
        }),

    $post: (url, data, config) =>
        axios
        .post(url, data, Object.assign({}, baseConfig, config))
        .then(handlerReponse).catch((error) => {
            return Promise.reject(error);
        }),

    $put: (url, data, config) =>
        axios
        .put(url, data, Object.assign({}, baseConfig, config))
        .then(handlerReponse).catch((error) => {
            return Promise.reject(error);
        }),
}
export default api