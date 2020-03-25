<template>
  <div>
    <div class="comment-mask" @click="closeWriteBox"></div>
    <div :class="['comment-item-write',{'comment-item-return':returnName}]">
      <span v-if="returnName">@{{returnName}}</span>
      <input type="text" placeholder="我想说..." v-model="commentVal" focus cursor-spacing="20"/>
      <span @click="doComment">评论</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['returnName'],
  data() {
    return {
      commentVal: ''
    }
  },
  methods: {
    doComment() {
      this.$emit('doComment', this.commentVal)
    },
    closeWriteBox() {
      this.$emit('closeWriteBox')
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-mask {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.2);
  width: 100%;
  height: 100%;
  z-index: 99;
}
.comment-item {
  &-write{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 20rpx;
    z-index: 999;
    input {
      width: 580rpx;
      padding: 0 10rpx;
    }
  }
  &-return{
    input {
      width: 400rpx;
    }
  }
}
</style>

