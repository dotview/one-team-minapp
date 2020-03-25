<template>
  <div>
    <div class="my-header">
      <img class="user-img" :src="userInfo.headPortrait" alt="">
      <navigator v-if="!token" hover-class="none" url="/pages/login/main">
        <button type="button" class="mui-btn mui-btn_primary mui-btn_small button-hover">登录</button>
      </navigator>
      <p v-else>{{userInfo.nickName}}</p>
    </div>
    <div class="mui-cells">
      <div class="mui-cell mui-cell_access select" @click="goUrl('/pages/myweeklylist/main')">
        <div class="mui-cell__bd ">我的周报</div>
        <div class="class mui-cell__ft"></div>
      </div>
    </div>
    <div class="mui-cells" v-if="token">
      <div class="mui-cell" @click="unLogin">
        <div class="mui-cell__bd text-cent">退出登录</div>
      </div>
    </div>
  </div>
</template>
<script>
// import mCell from 'aym-ui/components/cell/cell.vue'
// import mCellGroup from 'aym-ui/components/cell/cell-group.vue'
// import mButton from 'aym-ui/components/button/button.vue'
import { USERINFO } from '@/api/index'
export default {
  name: 'myList',
  data() {
    let defaultUserInfo = {
      headPortrait: '/static/images/leader.png',
      eMail: '',
      nickName: '',
      phoneNumber: '',
      userDesc: ''
    }
    return {
      token: '',
      defaultUserInfo: defaultUserInfo,
      realUserInfo: defaultUserInfo
    }
  },
  computed: {
    userInfo() {
      return this.token ? this.realUserInfo : this.defaultUserInfo
    }
  },
  onShareAppMessage() {
    return {
      title: '爱oneTeam',
      path: 'pages/index/main'
    }
  },
  onShow() {
    if (this.token) {
      return
    }
    this.token = wx.getStorageSync('token')
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$_get(USERINFO, null, {handleError: false}).then((res) => {
        // this.realUserInfo = res
        Object.assign(this.realUserInfo, res)
      }).catch((e) => {
        console.log(e)
      })
    },
    unLogin() {
      let me = this
      wx.removeStorage({
        key: 'token',
        success(res) {
          me.token = ''
          wx.reLaunch({
            url: '/pages/index/main'
          })
        }
      })
      // wx.removeStorageSync('token')
      // this.$_delete(USERINFO, null).then((res) => {
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    goUrl(url) {
      if (!this.token) {
        wx.reLaunch({
          url: '/pages/login/main'
        })
        return
      }
      wx.navigateTo({
        url
      })
    }
  }
}
</script>
<style lang="scss">
.text-cent {
  text-align: center;
}
.my-header {
  background-color: #fff;
  padding: 40rpx 0;
  text-align: center;
  font-size: 36rpx;
  .user-img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
    margin: 0 auto 20rpx;
  }
}
</style>
