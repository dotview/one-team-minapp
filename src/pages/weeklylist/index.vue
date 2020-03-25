<template>
  <div>
    <movable-area class="movable-area">
      <!-- tab -->
      <report-tab :config="config" :groupIndex="groupIndex" :reportIndex="reportIndex" @charge="bindPickerChange"></report-tab>
      <scroll-view scroll-y style="height: 100vh;" enable-back-to-top @scrolltolower="listToLower" class="report-scroll">
        <!-- 日期 -->
        <div class="assist-pad" :class="{'white-bg': isWeekLen}">
          <week-date @backData="init"></week-date>
        </div>
          <!-- list   -->
          <template v-if="weeklyList.length">
            <div class="mui-cells" v-for="(item, index) in weeklyList" :key="index">
              <report-list :reportItem="item" :date="date" :type="type" :hostId="hostId" :isMine="false" @delReport="getReport"></report-list>
            </div>
          </template>
          <div class="blankness-tips" v-if="!weeklyList.length">{{ loadingText }}</div>
      </scroll-view>
      <move-btn v-if="isWrite" @click="goEdit"></move-btn>
    </movable-area>
  </div>
</template>
<script>
import weekDate from '@/components/date'
import reportTab from './tab'
import reportList from '@/components/report-list'
import moveBtn from '@/components/move-btn'
import { GET_REPOERLIST, GET_GROUPLIST } from '@/api/index'
import { formatDate } from '@/utils'

export default {
  name: 'weeklyList',
  data() {
    return {
      hostId: '',
      isAdmin: false,
      weeklyList: [],
      loadingText: '加载中...',
      date: '',
      config: {
        headPortraitDefault: '/static/images/leader.png', // 默认头像
        groupType: [{
          id: '',
          name: '所有人'
        }],
        reportType: [{
          id: 'weekly',
          name: '个人周报'
        }, {
          id: 'summary',
          name: '小组总结'
        }]
      },
      groupIndex: 0, // 选择的组名-数组索引
      reportIndex: 0, // 选择的汇报类型-数组索引
      curpage: 0, // 分页-当前页数
      size: 10, // 分页-每页条数
      isloaded: false // 是否加载完成
    }
  },
  computed: {
    type() {
      return this.config.reportType[this.reportIndex].id
    },
    isWrite() {
      return (this.type === 'weekly') || this.isAdmin
    },
    isWeekLen() {
      return !!(this.weeklyList.length)
    }
  },
  components: {
    reportTab,
    weekDate,
    reportList,
    moveBtn
  },
  // watch: {
  //   date(newDate) {
  //     this.getReport()
  //   }
  // },
  onShareAppMessage() {
    return {
      title: '爱oneTeam',
      path: 'pages/index/main'
    }
  },
  onShow() {
    if (this.date) {
      this.getReport()
    }
  },
  mounted() {
  },
  methods: {
    init(d) {
      this.date = +new Date(d)
      this.getReport()
    },
    // 重新获取列表数据
    getReport() {
      this.isloaded = false
      this.curpage = 0
      this.weeklyList = []
      this.getReportAjax()
    },
    // 公共方法-获取列表数据
    getReportAjax() {
      let params = {
        beginDate: this.date,
        type: this.type
        // start: this.curpage * this.size,
        // size: this.size
      }
      let url = GET_REPOERLIST
      // 分组时重新赋值
      if (this.groupIndex > 0) {
        params.groupId = this.config.groupType[this.groupIndex].id
        url = GET_GROUPLIST
      }

      // wx.showLoading({ title: '加载中' })
      this.loadingText = '加载中...'
      this.$_get(url, params, {loading: false}).then((res) => {
        // wx.hideLoading()
        // 获取登录用户ID（赋值一次）
        if (this.hostId === '') {
          this.hostId = res.hostId
          this.isAdmin = res.isAdmin
        }
        // 获取组分类（赋值一次）
        if (this.config.groupType.length < 2 && res.teamGroup && res.teamGroup.length) {
          res.teamGroup.forEach((item) => {
            this.config.groupType.push({
              id: item._id,
              name: item.teamName
            })
          })
        }

        // 获取list
        if (res.list && res.list.length) {
          for (let list of res.list) {
            list.updateTime = formatDate(list.updateTime, 'MM月DD日')
            list.userId.headPortrait = list.userId.headPortrait || this.config.headPortraitDefault
          }
          this.weeklyList = this.weeklyList.concat(res.list)
          // 默认加载1页埋点，服务端分页功能实现后去掉
          this.isloaded = true
        } else {
          // 加载到末页，关闭加载开关
          this.isloaded = true
        }
        this.loadingText = '还没发现汇报的痕迹～'
      }, (res) => {
        this.loadingText = '出错啦'
        console.log(res)
      })
    },
    goEdit() {
      wx.navigateTo({
        url: `/pages/weeklyanswers/main?beginDate=${this.date}&type=${this.type}`
      })
    },
    // 下拉菜单change
    bindPickerChange(i, type) {
      this[type] = i
      this.getReport()
    },
    // 滚动到底部加载下页
    listToLower() {
      if (this.isloaded) { return }
      this.curpage += 1
      this.getReportAjax()
    }
  }
}
</script>
<style lang="scss" scoped>
.blankness-tips {
  margin-top: 100rpx;
  text-align: center;
  font-size: 28rpx;
  color: #ccc;
}
.marT0 {
  margin-top: 0;
}

.white-bg {
  background-color: #fff;
}

.assist-pad {
  padding-top: 80rpx;
}
.mui-cells {
  margin-top: 0;
  border-bottom: 10rpx solid #F7F7F7;
}

.movable-area {
  height: 100vh;
  width: 100%;
}
</style>
