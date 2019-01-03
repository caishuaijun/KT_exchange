import Vue from 'vue';
import qs from "qs";
import md5 from 'js-md5';
import sha1 from 'sha1'; //引用url.js
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return
    window.localStorage.removeItem(name)
}

/**
 * md5加密参数
 */
export const addSignature = params => {
        // /*export const addSignature = params => {
        if (!params) return {
            signature: md5('')
        };
        if (typeof params !== 'object') return;
        // console.log(params);
        let tmp = {};
        Object.keys(params).sort().forEach(function(k) {
            tmp[k] = params[k]
        });
        tmp = qs.stringify(tmp);
        tmp = decodeURIComponent(tmp);
        params.signature = sha1(tmp);
        return params
    }
    /*验证手机号格式*/
export const checkPhoneNum = (phone) => {
    let valid_rule = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/gi.test(phone); // 手机号码校验规则
    return valid_rule;
}

/*验证邮箱格式*/
export const checkEmail = (email) => {
    let valid_rule = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(phone); // 邮箱校验规则
    return valid_rule;
}