<template>
<div class="mui-cells">
  <div class="mui-cell" v-for="(item, index) in list" :key="index" >
    <div class="mui-cell__hd">
      <img :src="item.headPortrait ? item.headPortrait : '/static/images/leader.png'" class="user-img">
    </div>
    <div class="mui-cell__bd">
      <p>{{item.nickName}} <text v-if="item._id == administrator" class="tags--yellow">管理员</text></p>
      <p class="cc9">{{item.phoneNumber}}</p>
    </div>
    <div class="mui-cell__ft">{{item.eMail}}</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'list',
  props: {
    list: Array,
    administrator: String
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.cc9 {
  color: #999;
  // margin-top: 10rpx;
}

.tags--yellow {
  margin-left: 5rpx;
  padding: 2rpx 10rpx;
  border-radius: 20rpx;
  background-color: #fcf1a5;
  font-size: 22rpx;
}
.user-img {
  width: 60rpx;
  height: 60rpx;
  margin-right:18rpx;
  border-radius: 50%;
}
</style>
