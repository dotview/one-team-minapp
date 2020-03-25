<template>
  <movable-view class="move-btn" friction=100000 damping=100000 :x="btnPosition.x" :y="btnPosition.y" direction="all" @click="handleEvent" @touchstart="touchStartEvent" @touchend="touchEndEvent">+</movable-view>
</template>
<script>
  export default {
    name: 'move-btn',
    data() {
      return {
        stack: {
          oldX: 0, // 拖动开始点击鼠标x
          oldY: 0 // 拖动开始点击鼠标y
        },
        btnPosition: { // 写周报按钮位置
          x: 300,
          y: 450
        }
      }
    },
    mounted() {
      // 定位新增按钮
      let { windowWidth, windowHeight } = wx.getSystemInfoSync()
      this.btnPosition.x = windowWidth - (100 / 750 * windowWidth)
      this.btnPosition.y = windowHeight - (200 / 750 * windowWidth)
      // this.$nextTick(() => {
      //   this.isShow = true
      // })
    },
    methods: {
      touchStartEvent(e) {
        let point = e.mp.changedTouches[0]
        this.stack.oldX = point.pageX
        this.stack.oldY = point.pageY
      },
      touchEndEvent(e) {
        let point = e.mp.changedTouches[0]
        this.btnPosition.x += point.pageX - this.stack.oldX
        this.btnPosition.y += point.pageY - this.stack.oldY
      },
      handleEvent() {
        this.$emit('click')
      }
    }
  }
</script>
<style lang="scss" scoped>
.move-btn {
  height: 80rpx;
  width: 80rpx;
  background: #4682E9;
  z-index: 50;
  border-radius: 100%;
  font-size: 80rpx;
  color: #fff;
  text-align: center;
  line-height: 70rpx;
  box-shadow:0px 7px 9px rgba(100, 156, 254, 0.3);
}
</style>
