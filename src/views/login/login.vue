<template>
    <div class="login_container">
        <!-- 手机号登录 -->
        <div class="login_box" v-if="step==0">
            <div class="login_title">
                <!-- <img class="" src="@/assets/images/logo.png" alt=""> -->
            </div>
                <div class="login_phone_box">
                    <span class="login_phone_pre">+86</span>
                    <div class="login_input_box">
                        <input placeholder="输入手机号" type="tel" maxlength="11" name="" @input="checkNumber" v-model="phone">
                        <span class="error" v-if="!isPhone">*请输入正确的手机号</span>
                    </div>
                </div>
                <div class="login_code_box">
                    <div class="login_input_box">
                        <input placeholder="输入6位验证码" type="tel" maxlength="6" name="" v-model="code">
                        <span class="error" v-if="!isCode">*验证码错误</span>
                    </div>
                    <div class="login_btn login_btn_min" :class="{ login_btn_disabled: !isPhone }" @click="sendMeaasgeClick">
                        获取验证码
                    </div>
                </div>
                <div class="login_btn login_btn_max" @click="checkMeaasgeClick">
                    登 录
                </div>
                <div class="login_btn_link">二维码登录</div>
            </div>
            <!-- 二维码登录 -->
            <div class="login_box" v-if="step==1">
                <div class="login_title">
                    <!-- <img class="" src="@/assets/images/logo.png" alt=""> -->
            </div>
                    <div class="login_qrcode_box">
                        <img class="login_qrcode" src="" alt="">
                        <div class="login_qrcode_result">
                            <!-- <img src="@/assets/images/icon/icon_login_success.png"> -->
                            <div>扫描成功，请确认</div>
                        </div>
                    </div>
                    <div class="login_info_box">
                        打开微信App<br />在首页页面右上角打开扫一扫
                    </div>
                    <div class="login_btn_link">使用密码登录</div>
                </div>
                <!-- 输入邀请码 -->
                <div class="login_box" v-if="step==2">
                    <div class="login_title">
                        请输入邀请码
                    </div>
                    <div class="login_invitecode_box">
                        <div class="login_input_box">
                            <input placeholder="输入邀请码" type="" name="">
                            <span class="error">*请输入正确的手机号</span>
                        </div>
                    </div>
                    <div class="login_btn login_btn_max">
                        确 定
                    </div>
                    <div class="login_btn_link">返回上一步</div>
                </div>
                <!-- 绑定微信号 -->
                <div class="login_box" v-if="step==3">
                    <div class="login_title">
                        绑定微信号
                    </div>
                    <div class="login_qrcode_box">
                        <img class="login_qrcode" src="" alt="">
                        <div class="login_qrcode_result">
                            <!-- <img src="@/assets/images/icon/icon_login_success.png"> -->
                            <div>扫描成功，请确认</div>
                        </div>
                    </div>
                    <div class="login_info_box">
                        打开微信App<br />在首页页面右上角打开扫一扫
                    </div>
                    <div class="login_btn_link">返回上一步</div>
                </div>
                <!-- 绑定成功 -->
                <div class="login_box" v-if="step==4">
                    <div class="login_title">
                        <!-- <img class="" src="@/assets/images/logo.png" alt=""> -->
                    </div>
                        <div class="login_success_box">
                            <div class="login_qrcode_result">
                                <!-- <img src="@/assets/images/icon/icon_login_success.png"> -->
                                <div>绑定成功</div>
                                <div>立即体验智能法律系统Kindle Law</div>
                            </div>
                        </div>
                        <div class="login_btn login_btn_max">
                            立即进入系统
                        </div>
                    </div>
                </div>
</template>
<script>
import loginApi from "@/service/apiLogin";
import { checkPhoneNum } from '@/config/mUtils'
export default {
    data() {
        return {
            step: 0, //0=>手机号登录1=>二维码登录2=>输入邀请码3=>绑定微信号4=>登录成功
            isPhone: false,
            phone: '17858964980',
            isCode: true,
            code: ''
        }
    },
    components: {},
    mounted () {
        this.isPhone = checkPhoneNum(this.phone)
    },
    methods: {
        sendMeaasgeClick() {
            if (!this.isPhone) return
            loginApi.sendMsg({
                mobile: this.phone
            }).then(res => {
                console.log(res)
            })
        },
        checkMeaasgeClick() {
            this.isCode = false
            loginApi.checkMsg({
                mobile: this.phone,
                code: this.code
            }).then(res => {
                console.log(res)
            })
        },
        //验证手机号格式
        checkNumber(e) {
            let phone_num = e.target.value
            this.isPhone = checkPhoneNum(phone_num)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/styles/mixin';

.login_container {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    // background: url('~@/assets/images/login_bg.png') no-repeat center center;
}

.login_title {
    text-align: center;
    font-size: 22px;
    font-weight: 500;
}

.login_box {
    width: 430px;
    height: 450px;
    background: #fff;
    box-shadow: 0px 0px 40px 0px rgba(29, 45, 76, 1);
    border-radius: 4px;
    padding: 50px 30px 0px;
    box-sizing: border-box;
    @include center;
}

.login_phone_box {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $backGroup;
    margin-top: 78px;
    margin-bottom: 24px;

    .login_phone_pre {
        color: $backGroup;
        padding-right: 10px;
        font-size: 16px;
    }
}

.login_code_box {
    display: flex;
    align-items: center;
    margin-bottom: 63px;

    .login_btn_min {
        height: 40px;
        width: 130px;
        margin-left: 20px;
    }
}

.login_invitecode_box {
    display: flex;
    align-items: center;
    margin-bottom: 87px;
    margin-top: 84px;
}

.login_btn {
    background: $backGroup;
    color: $fontFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
}

.login_btn_max {
    height: 50px;
    width: 100%;
    font-size: 16px;
}

.login_input_box {
    position: relative;
    display: flex;
    flex-grow: 1;

    &>input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid $backGroup;
        font-size: 14px;
        color: $backGroup;
    }

    &>span {
        position: absolute;
        right: 0px;
        font-size: 12px;
        line-height: 40px;
    }
}

.login_btn_link {
    width: 100%;
    text-align: center;
    color: $backGroup;
    cursor: pointer;
    font-size: 14px;
    margin-top: 28px;
    line-height: 1em;
    position: absolute;
    bottom: 20px;
    left: 0px;
}

.login_btn_disabled {
    background: #BDBDBD;
}

.login_qrcode_box {
    width: 220px;
    height: 220px;
    background: #eee;
    margin: 40px auto 0px;
    margin-top: 40px;
    position: relative;
}

.login_qrcode_result {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.4);

    &>img {
        margin-bottom: 12px;
    }

    &>div {
        font-size: 14px;
        line-height: 24px;
    }
}

.login_info_box {
    color: #A9A9A9;
    text-align: center;
    margin-top: 10px;
}

.login_success_box {
    padding: 50px 0px 40px;

    .login_qrcode_result {
        position: relative;
    }
}
</style>