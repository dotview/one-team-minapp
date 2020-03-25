<template>
  <div>
    <div class="logo-main">
      <img class="logo-img" :src="login" alt="">
      <div class="mui-cells">
        <div class="mui-cell">
          <div class="mui-cell__hd">
            <label class="mui-label">邮箱</label>
          </div>
          <div class="mui-cell__bd">
            <input placeholder="请输入邮箱" @input="inputEmail" />
          </div>
        </div>
        <div class="mui-cell">
          <div class="mui-cell__hd">
            <label class="mui-label">密码</label>
          </div>
          <div class="mui-cell__bd">
            <input password placeholder="请输入密码" @input="inputPwd" />
          </div>
        </div>
      </div>
    </div>
    <!-- <a href="#" class="forget-text">忘记密码</a> -->
    <div class="login-btn">
      <button type="button" class="mui-btn mui-btn_primary mui-btn_large button-hover" @click="submit">登 录</button>
    </div>
    <p class="login__ft">还没有加入One Team? <a href="/pages/register/main" open-type="redirect" class="counter">点击这里</a>加入吧！</p>
  </div>
</template>
<script>
import mToast from 'aym-ui/components/toast/index.js'
import { checkEmail, checkPwd, encrypt } from '@/utils/index'
import { LOGIN } from '@/api/index'
export default {
  name: 'login',
  mixins: [mToast],
  data() {
    return {
      login: '/static/images/logo.jpg',
      email: '',
      pwd: ''
    }
  },
  mounted() {},
  methods: {
    inputEmail(e) {
      this.email = e.target.value
    },
    inputPwd(e) {
      this.pwd = e.target.value
    },
    submit() {
      let toastText = this.check()
      if (toastText) {
        this.$_toast(toastText)
        // this.$invoke('toast', 'show', {
        //     title: toastText
        // })
        return false
      }
      let params = {
        eMail: this.email,
        userPassword: encrypt(this.pwd)
      }
      this.$_post(LOGIN, params).then((res) => {
        let token = res.token
        wx.setStorage({
          key: 'token',
          data: token,
          success() {
            wx.switchTab({
              url: '/pages/weeklylist/main'
            })
          }
        })
        // let queryUrl = this.$root.$mp.query.url || ''
        // console.log(queryUrl)
        // if (queryUrl) {
        //   queryUrl = decodeURIComponent(queryUrl)
        //   wx.redirectTo({
        //     url: queryUrl
        //   })
        // } else {
        //   wx.switchTab({
        //     url: '/pages/index/main'
        //   })
        // }
      }).catch((res) => {
        console.log(res)
        this.$_toast(res.error)
      })
    },
    check() {
      let toastText
      if (!checkEmail(this.email)) {
        toastText = this.email ? '邮箱错误，请重新输入' : '请输入邮箱'
      } else if (!checkPwd(this.pwd)) {
        toastText = this.pwd ? '请输入至少6位数字字母组合密码' : '请输入密码'
      }
      return toastText
    }
  }
}
</script>
<style lang="scss">
.logo-main {
  background-color: #fff;
  padding-top: 120rpx;
  .logo-img {
    width: 168rpx;
    height: 168rpx;
    display: block;
    margin: 0 auto 60rpx;
  }
}

.login-btn {
  margin-top: 60rpx;
}

.login__ft {
  font-size: 24rpx;
  padding: 16rpx 32rpx;
  a {
    display: inline-block;
    color: #0099FF;
  }
}

.forget-text {
  font-size: 24rpx;
  padding: 16rpx 32rpx 0;
  color: #0099FF;
}
</style>
