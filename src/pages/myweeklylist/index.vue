<template>
  <div class="white-bg">
    <movable-area class="movable-area">
      <scroll-view scroll-y style="height: 100vh;" enable-back-to-top class="report-scroll">
      <week-date @backData="init"></week-date>
        <!-- <p class="report__no">本周你还没写周报哦</p> -->
      <div class="mui-cells" v-if="myWeek">
        <report-list :reportItem="myWeek" :date="date" :type="type" :hostId="myWeek.userId._id" :isMine="true"></report-list>
      </div>
      <div class="blankness-tips" v-if="!myWeek">{{ loadingText }}</div>
      </scroll-view>
      <move-btn @click="goEdit"></move-btn>
    </movable-area>
  </div>
</template>
<script>
import weekDate from '@/components/date'
import reportList from '@/components/report-list'
import moveBtn from '@/components/move-btn'
import { GET_REPORTDETAIL } from '@/api/index'
import { formatDate } from '@/utils'
export default {
  name: 'myWeeklyList',
  data() {
    return {
      headPortraitDefault: '/static/images/cat.png',
      myWeek: null,
      date: '',
      moreOperate: [{
        text: '周报',
        type: 'weekly'
      }],
      type: 'weekly',
      loadingText: '加载中...'
      // , {
      //   text: '总结',
      //   type: 'summary'
      // }
    }
  },
  components: {
    weekDate,
    reportList,
    moveBtn
  },
  onShow() {
    if (this.date) {
      this.getReport()
    }
  },
  mounted() {
    // this.init()
  },
  watch: {
    date(newDate) {
      this.getReport()
    }
  },
  methods: {
    init(d) {
      this.date = +new Date(d)
      // this.getReport(d)
    },
    getReport() {
      this.loadingText = '加载中...'
      this.myWeek = null

      let params = {
        beginDate: this.date,
        type: 'weekly'
      }
      this.$_get(GET_REPORTDETAIL, params, { loading: false }).then((res) => {
        // 有_id才是真的有周报，没有就是默认模板
        let detail = res.detail[0]
        let user = res.user
        let reprotId = detail._id
        if (!reprotId) {
          this.myWeek = null
          this.loadingText = '还没发现汇报的痕迹～'
          return
        }
        let updateTime = detail.updateTime ? formatDate(detail.updateTime, 'MM月DD日') : formatDate(detail.createTime, 'MM月DD日')
        let headPortrait = user.headPortrait || this.headPortraitDefault
        let data = {
          content: detail.content,
          _id: reprotId,
          updateTime,
          answerListLength: detail.commentLength,
          userId: {
            headPortrait,
            nickName: user.nickName,
            _id: detail.userId
          }
        }
        this.myWeek = data
        // if (detail._id) this.getCommentList()
      }, (res) => {
        this.loadingText = '出错啦'
        console.log(res)
      })
    },
    goEdit() {
      wx.navigateTo({
        url: `/pages/weeklyanswers/main?beginDate=${this.date}&type=${this.type}`
      })
    }
  }
}
</script>
<style lang="scss">
.white-bg {
  background-color: #fff;
}

.mui-cells {
  margin-top: 0;
}

.movable-area {
  height: 100vh;
  width: 100%;
}
.blankness-tips {
  margin-top: 100rpx;
  text-align: center;
  font-size: 28rpx;
  color: #ccc;
}
</style>
