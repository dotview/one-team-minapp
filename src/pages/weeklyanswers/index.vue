<template>
  <div>
    <p class="answers-date">{{beginDate}} - {{endDate}} 汇报</p>
    <div class="answers-text">
      <textarea placeholder="写点什么呢..." maxlength="-1" v-model="form.content" />
    </div>
    <button type="button" class="mui-btn mui-btn_primary mui-btn_large button-hover" @click="saveWeekly">保 存</button>
  </div>
</template>
<script>
import { GET_REPORTDETAIL } from '@/api/index'
import mToast from 'aym-ui/components/toast/index.js'
import {padStartFun} from '@/utils/index'
export default {
  name: 'weeklyAnswers',
  mixins: [mToast],
  data() {
    return {
      beginDate: '',
      endDate: '',
      difdayMins: 24 * 60 * 60 * 1000, // 1天毫秒
      form: {
        beginDate: '',
        content: '',
        // createTime: '',
        type: '',
        _id: ''
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let query = this.$root.$mp.query
      let beginDate = query.beginDate
      let type = query.type
      this.getDateData(beginDate)
      this.getReport(beginDate, type)
    },
    // 获取周一的月/日，周日的月/日
    getDateData(d) {
      d = d * 1
      let endWeekMins = d + 6 * this.difdayMins
      let beginWeek = this.handleMonthDay(d)
      let endWeek = this.handleMonthDay(endWeekMins)
      this.beginDate = `${beginWeek.month}/${beginWeek.day}`
      this.endDate = `${endWeek.month}/${endWeek.day}`
    },
    // 处理年月日
    handleMonthDay(d) {
      let date = new Date(d)
      let year = date.getFullYear()
      let month = padStartFun(date.getMonth() + 1)
      let day = padStartFun(date.getDate())
      return {
        year,
        month,
        day
      }
    },
    // 获取周报内容
    getReport(date, type) {
      this.$_get(GET_REPORTDETAIL, {beginDate: date, type}).then((res) => {
        let detail = res.detail[0]
        Object.assign(this.form, {
          beginDate: detail.beginDate || detail.createTime,
          content: detail.content,
          _id: detail._id,
          type
        })
        // if (res.detail && res.detail.content) {
        // }
      }, (res) => {
      })
    },
    saveWeekly() {
      this.$_post(GET_REPORTDETAIL, this.form).then((res) => {
        console.log('=====save success')
        this.$_toast('保存成功', () => {
          wx.navigateBack()
        })
      }, (res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
.answers-date {
  padding: 10rpx 32rpx;
  color: #999;
  font-size: 32rpx;
}

.answers-text {
  background-color: #fff;
  height: 800rpx;
  padding: 32rpx;
  margin-bottom: 60rpx;
  textarea {
    width: 100%;
    height: 100%;
  }
}
</style>
