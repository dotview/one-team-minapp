<script>
import Raven from 'raven-weapp/raven'
// var Raven = require('./bower_components/raven-weapp/build/raven')
export default {
  onLaunch() {
    // sentry 监控
    Raven.config('https://5998a5ac18354841a54d844e3b49817e@sentry.oneteam.vip/38', {
      release: '1.2.1',
      environment: 'production',
      allowDuplicates: true, // 允许相同错误重复上报
      sampleRate: 0.5 // 采样率
    }).install()

    // 冷更新
    this.updateManager()
    // wx.setEnableDebug({
    //   enableDebug: true
    // })
  },
  onError(msg) {
    // Raven.captureException(msg)
    Raven.captureException(msg, {
      level: 'error'
    })
  },
  onPageNotFound() {
    wx.switchTab({
      url: 'pages/index/main'
    })
  },
  created() {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // console.log('app created and cache logs by setStorageSync')
  },
  methods: {
    updateManager() {
      // 判断当前基础库是否支持 getUpdateManager
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate((res) => {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(() => {
              wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: (res) => {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                  }
                }
              })
            })
            updateManager.onUpdateFailed(() => {
              // 新的版本下载失败
              wx.showModal({
                title: '已经有新版本了哟~',
                content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
              })
            })
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import './assets/css/theme.scss';
button::after{
  border: none;
}
page  {
  background-color: #f7f7f7;
}
.mui-cell {
  word-break: break-all;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}


/* this rule will be remove */

* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
