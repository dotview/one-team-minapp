<template>
  <div class="report-tab">
    <view class="tab-item">
      <picker @change="bindPickerChange($event, 'groupIndex')" :value="groupIndex" :range="config.groupType" range-key="name">
        <view class="picker">
          {{config.groupType[groupIndex].name}}<view class="icon"></view>
        </view>
      </picker>
    </view>
    <view class="tab-item">
      <picker @change="bindPickerChange($event, 'reportIndex')" :value="reportIndex" :range="config.reportType" range-key="name">
        <view class="picker">
          {{config.reportType[reportIndex].name}}<view class="icon"></view>
        </view>
      </picker>
    </view>
  </div>
</template>
<script>
export default {
  name: 'report-tab',
  props: {
    config: Object,
    groupIndex: Number,
    reportIndex: Number
  },
  methods: {
    bindPickerChange(e, type) {
      let i = ~~e.target.value
      this.$emit('charge', i, type)
    }
  }
}
</script>
<style lang="scss" scoped>
.report-tab {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  background-color: #fff;
}
.tab-item {
  display: inline-block;
  width: 50%;
  height: 80rpx;
  line-height: 80rpx;
  color: #343441;
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
  .icon {
    margin-left: 12rpx;
    display: inline-block;
    width:0;
    height:0;
    border-right:10rpx solid transparent;
    border-left:10rpx solid transparent;
    border-top:15rpx solid #BCC1CD;
  }
}
</style>
