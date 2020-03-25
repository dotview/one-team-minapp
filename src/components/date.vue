<template>
  <div class="date">
    <div class="date__t">
      <div class="date-btn date-btn__l" @click="addDate(-7)">
        <div class="icon"></div>
      </div>
      <div class="date__c">
        <p>{{year}}年 第{{weeks}}周</p>
        <p>{{beginDate}} - {{endDate}}</p>
      </div>
      <div class="date-btn date-btn__r" @click="addDate(7)">
        <div class="icon"></div>
      </div>
    </div>
    <!-- <div class="date__b"></div> -->
  </div>
</template>
<script>
import {getWeeks, padStartFun} from '@/utils/index'
export default {
  name: 'date',
  data() {
    return {
      today: new Date(),
      beginDateMins: 0, // 周一的毫秒
      weeks: '', // 多少周
      year: '', // 年
      beginDate: '', // 开始月/日
      endDate: '', // 结束月/日
      difdayMins: 24 * 60 * 60 * 1000 // 1天毫秒
    }
  },
  computed: {},
  created() {
    this.getBeginDate()
  },
  methods: {
    // 计算出当前周的周一
    getBeginDate() {
      let week = this.today.getDay()
      let difDay = week - 1
      let mins = difDay * this.difdayMins
      let beginDateMins = +this.today - mins
      this.beginDateMins = beginDateMins
      this.getDateData(beginDateMins)
    },
    // 加减时间，纬度周
    addDate(t) {
      if (!this.beginDateMins) {
        return
      }
      let difweekMins = t * this.difdayMins
      let nextweekMIns = this.beginDateMins + difweekMins
      if (nextweekMIns > this.today) {
        return
      }
      this.beginDateMins = nextweekMIns
      this.getDateData(nextweekMIns)
    },
    // 获取周一 月/日，周日 月/日
    getDateData(d) {
      let endWeekMins = d + 6 * this.difdayMins
      let beginWeek = this.handleMonthDay(d)
      let endWeek = this.handleMonthDay(endWeekMins)
      this.weeks = getWeeks(d)
      this.year = beginWeek.year
      this.beginDate = `${beginWeek.month}/${beginWeek.day}`
      this.endDate = `${endWeek.month}/${endWeek.day}`
      this.$emit('backData', `${beginWeek.year}/${this.beginDate}`)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.date {
  background: url('data:image/png;base64,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') no-repeat 0 0;
  text-align: center;
  height: 168rpx;
  background-size: cover;
  &__t {
    height: 120rpx;
    padding-top: 20rpx;
  }
  &__c {
    display: inline-block;
    vertical-align: middle;
    margin: 0 70rpx;
    p:first-child {
      color: #fff;
      font-size: 38rpx;
      font-weight: 700;
    }
    p:last-child {
      color: #BAD0F9;
      font-size: 28rpx;
    }
  }
  &-btn {
    display: inline-block;
    vertical-align: middle;
    width: 56rpx;
    height: 56rpx;
    background-color: #76A6FA;
    border: 1px solid #fff;
    border-radius: 100%;
    position: relative;
    & .icon::before {
      color: #fff;
      content: '';
      position: absolute;
      -webkit-transform: rotate(-45deg);
              transform: rotate(-45deg);
      width: 20rpx;
      height: 20rpx;
      top: 18rpx;
    }
    &__l .icon::before {
      left: 23rpx;
      border-left: solid 1px currentColor;
      border-top: solid 1px currentColor;
    }
    &__r .icon::before {
      right: 23rpx;
      border-bottom: solid 1px currentColor;
      border-right: solid 1px currentColor;
    }
  }
}
</style>
