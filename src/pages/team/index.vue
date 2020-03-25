<template>
  <div>
    <div class="item-info">
      <div class="item-info__bd">
        <div class="item-name">{{teamName}}</div>
        <view class="item-section" v-if="secondTeamGroup.length">
          <picker @change="selectTeam" :value="teamIndex" :range="secondTeamGroup" range-key="teamName">
            <view class="picker">
              {{secondTeamGroup[teamIndex].teamName}}
            </view>
          </picker>
        </view>
      </div>
      <div class="item-code">邀请码：{{inCode}}</div>

    </div>
    <member-list v-if="secondMemberList" :list="secondMemberList" :administrator="administrator"></member-list>
  </div>
</template>
<script>
import memberList from './list'
import { GET_ITEMLIST } from '@/api/index'
export default {
  name: 'itemList',
  data() {
    return {
      teamIndex: 0,
      inCode: '',
      teamName: '',
      administrator: '',
      secondTeamGroup: [],
      secondMemberList: null
    }
  },
  components: {
    memberList
  },
  mounted() {
    this.getItemList()
  },
  methods: {
    getItemList(params = {}, level = 1) {
      this.secondMemberList = []
      this.$_get(GET_ITEMLIST, params).then((res) => {
        this.secondMemberList = res.memberList
        if (level !== 1) {
          return
        }
        this.inCode = res._id
        this.teamName = res.teamName
        this.administrator = res.administrator
        this.secondTeamGroup = [{teamName: '全部成员', _id: ''}, ...res.teamGroup]
      }).catch((e) => {
        console.log(e)
      })
    },
    selectTeam(e) {
      let i = e.mp.detail.value
      let level = (i === 0) ? 1 : 2
      this.teamIndex = i

      let teamId = this.secondTeamGroup[i]._id
      let params = (i === 0) ? {} : { teamId }
      this.getItemList(params, level)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-info {
  padding: 32rpx 32rpx 0;
  &__bd {
    display: flex;
    align-items: center;
  }
  .item-name {
    color: #619bff;
    font-size: 60rpx;
    font-weight: 700;
  }
  .item-code {
    font-size: 28rpx;
    color: #999;
  }
}
.item-section {
  font-size: 24rpx;
  margin-left: 40rpx;
  width: 210rpx;
  height: 50rpx;
  line-height: 50rpx;
  border: 1px solid #ccc;
  color: #666;
  text-align: center;
  border-radius: 30rpx;

}
</style>
