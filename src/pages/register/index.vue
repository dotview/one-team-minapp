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
            <label class="mui-label">用户昵称</label>
          </div>
          <div class="mui-cell__bd">
            <input placeholder="请输入用户昵称" @input="inputNickName" />
          </div>
        </div>
        <div class="mui-cell">
          <div class="mui-cell__hd">
            <label class="mui-label">密码</label>
          </div>
          <div class="mui-cell__bd">
            <input password placeholder="请输入6-12位字母数字密码" @input="inputPwd" />
          </div>
        </div>
        <div class="mui-cell">
          <div class="mui-cell__hd">
            <label class="mui-label">确认密码</label>
          </div>
          <div class="mui-cell__bd">
            <input password placeholder="请再次输入密码" @input="inputConfirmPwd" />
          </div>
        </div>
        <div class="mui-cell">
          <div class="mui-cell__bd">
            <radio-group class="radio-group" @change="radioChange">
              <label class="radio" style="margin-right: 40rpx;">
                <radio value="join" checked="true" /> 加入团队
              </label>
              <label class="radio">
                <radio value="create" /> 创建团队
              </label>
            </radio-group>
          </div>
        </div>
        <div class="mui-cell">
          <div class="mui-cell__hd">
            <label password class="mui-label">团队</label>
          </div>
          <div class="mui-cell__bd">
            <input :placeholder="teamPlaceholder" @input="inputTeamId" />
          </div>
        </div>
      </div>
    </div>
    <div class="login-btn">
      <button type="button" class="mui-btn mui-btn_primary mui-btn_large button-hover" @click="submit">注 册</button>
    </div>
    <p class="login__ft">已经注册过了？<a href="/pages/login/main" open-type="redirect" class="counter">直接登录</a></p>
  </div>
</template>
<script>
import mToast from 'aym-ui/components/toast/index.js'
import { checkName, checkEmail, checkPwd, encrypt } from '@/utils/index'
import { USERINFO } from '@/api/index'
export default {
  name: 'register',
  mixins: [mToast],
  data() {
    return {
      login: '/static/images/logo.jpg',
      form: {
        eMail: '',
        nickName: '',
        userPassword: '',
        confirmPassword: '',
        teamId: ''
      },
      teamType: {
        cur: 'join'
      }
    }
  },
  computed: {
    teamPlaceholder() {
      return this.teamType.cur === 'join' ? '请输入团队邀请码' : '请输入团队名称'
    }
  },
  mounted() {},
  methods: {
    inputEmail(e) {
      this.form.eMail = e.target.value
    },
    inputNickName(e) {
      this.form.nickName = e.target.value
    },
    inputPwd(e) {
      this.form.userPassword = e.target.value
    },
    inputConfirmPwd(e) {
      this.form.confirmPassword = e.target.value
    },
    inputTeamId(e) {
      this.form.teamId = e.target.value
    },
    /**
     * [getData description] 创建 or 加入团队
     * @return {[type]} [description]
     */
    radioChange(e) {
      this.teamType.cur = e.mp.detail.value
    },
    /**
     * [getData description] 注册
     * @return {[type]} [description]
     */
    submit() {
      let toastText = this.check()
      if (toastText) {
        this.$_toast(toastText)
        return false
      }
      let params = {
        eMail: this.form.eMail,
        nickName: this.form.nickName,
        userPassword: encrypt(this.form.userPassword),
        confirmPassword: encrypt(this.form.confirmPassword)
      }
      let teamIdOrName = this.form.teamId
      if (this.teamType.cur === 'join') {
        params.teamId = teamIdOrName
      } else {
        params.teamName = teamIdOrName
      }

      this.$_post(USERINFO, params).then((res) => {
        wx.setStorageSync('token', res.token)
        wx.switchTab({
          url: '/pages/weeklylist/main'
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    /**
     * [getData description] 检索数据
     * @return {[type]} [description]
     */
    check() {
      let toastText
      if (!checkEmail(this.form.eMail)) {
        toastText = this.form.eMail ? '邮箱格式错误，请重新输入' : '请输入邮箱'
      } else if (!checkName(this.form.nickName)) {
        toastText = this.form.nickName ? '昵称格式错误' : '请输入昵称'
      } else if (!checkPwd(this.form.userPassword)) {
        toastText = this.form.userPassword ? '请输入至少6位数字字母组合密码' : '请输入密码'
      } else if (this.form.confirmPassword !== this.form.userPassword) {
        toastText = this.form.confirmPassword ? '两次密码不一致，请重新输入' : '请输入确认密码'
      } else if (!this.form.teamId) {
        toastText = (this.teamType === 'join') ? '请输入团队邀请码' : '请输入团队名称'
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
</style>
