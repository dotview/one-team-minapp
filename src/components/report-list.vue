<template>
  <div class="mui-cell">
    <div class="mui-cell__hd">
      <img :src="reportItem.userId.headPortrait" class="user-img">
    </div>
    <div class="mui-cell__bd">
      <div class="user-info">
        <p>{{reportItem.userId.nickName}}</p>
        {{reportItem.updateTime}}
      </div>
      <wemark :md="reportItem.content" link highlight type="wemark"></wemark>
      <div class="btn-cells">
        <!-- <div class="btn-cell" ><i class="report-icon reply">回复</div> -->
        <div class="btn-cell" @click="doComment"><i class="report-icon comment"></i>{{commentBtn}}</div>
        <div class="btn-cell" @click="goEdit" v-if="reportItem.userId._id===hostId"><i class="report-icon edit"></i>编辑</div>
        <div class="btn-cell" @click="delReport(reportItem._id)" v-if="reportItem.userId._id===hostId"><i class="report-icon delete"></i>删除</div>
      </div>
      <comment :config="reportItem" :showWrite="showWriteBox" :showMore="showMore" @updateCommentLength="updateCommentLength"/>
    </div>
  </div>
</template>
<script>
import comment from './comment'
import { GET_REPOERLIST } from '@/api/index'
export default {
  name: 'list',
  components: {
    comment
  },
  props: {
    reportItem: Object,
    date: String,
    type: String,
    hostId: String,
    isMine: Boolean
  },
  data() {
    return {
      showWriteBox: false,
      showMore: true // 默认展示评论
    }
  },
  computed: {
    commentBtn() {
      if (this.showMore) {
        return '收起评论'
      } else {
        return this.hasComment ? this.reportItem.answerListLength + '条评论' : '评论'
      }
    },
    hasComment() {
      return !!this.reportItem.answerListLength
    }
  },
  mounted() {
    if (!this.hasComment) this.showMore = false
  },
  methods: {
    goEdit() {
      wx.navigateTo({
        url: `/pages/weeklyanswers/main?beginDate=${this.date}&type=${this.type}`
      })
    },
    // 删除汇报
    delReport(reportId) {
      let that = this
      wx.showModal({
        title: '陛下',
        content: '确定删除这篇汇报吗?',
        success(res) {
          if (res.confirm) {
            that.$_delete(GET_REPOERLIST, {reportId: reportId}).then((res) => {
              that.$emit('delReport')
              // that.getReport()
            }).catch(error => {
              console.log(error.error)
            })
          }
        }
      })
    },
    doComment() {
      this.showMore = !this.showMore
    },
    updateCommentLength(val) {
      this.reportItem.answerListLength = val
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info {
  line-height: 40rpx;
  color: #BEC0CD;
  p {
    color: #343441;
    font-size: 30rpx;
  }
}
.user-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 100%;
  margin-right: 20rpx;
}

.mui-cell__bd {
  color: #333;
}

.mui-cell {
  align-items: flex-start;
}

.btn-cells {
  display: flex;

}

.btn-cell {
  width: 200rpx;
  color: #888EA0;
  padding-top: 20rpx;
}
.report-icon {
  display: inline-block;
  width: 44rpx;
  height: 44rpx;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-size: cover;
  &.edit {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAkVJREFUWAntmLFP20AUxnHVJo7UYILCkEiQ/glUzRKpAwyoWxkQE0M7dWLs2LFL1Y78A0RlilIpXUgUISaUAdZWjBESIQNqkjpK4iLV5UM56WT57HfkrgM6Lzm/y/vez5+e7TvPzZnDOGAcMA48KAcsmavxfd/a3n7zYTKZ7PZ6v7Oe5z0Kyz87O5bSDdMQxcjCGxuv86nU01anc7UiEmNxGeC1tbd2Nut/Gg7dr/X6t1OmIfp9LJrg43B2c3PnDtZx0n8ymYX3g0G/2mx+7/D/kx0D1nG883a7WygUll/c5r+M0yABow3gLGBHIy93dFT+FSccN89gLy+7hXQ6fTMajd/F5WA+tAeDiehZxOBsq9VQDptIPHl+eFj5Gawbdk4Cxg2GZLRBmIhMLOgsYBuN6g+qBgmYPQ1U9SxrA1lYXBQJmHr1Uf+b1Vmm/V+AVcECWjuwSljtwKphtQLrgNUGrAtWG/DSkv95lkcXwESHlpvOdd3y7drgxLaTqzIvBREkHyetJfgEyni66opdyPBaxeK6j/O4lZ4Wh3kQ1WMDrNrRoJ5xOOiI6nOSw8lk8i8KY1+nGoDXZXWiapCAM5n5a4g4zsJWlNh955guqxOlQwK2bXsPIr1e/0up9GoxSlB2DnrQRR6rE6VB2uZPd81tthFVsWtGe8FZwA4GbiKfz13UagfPLMu6e4GIoEnASJb5LiEqJooDdjwelihbMDIwilG//IjA+DhuMPQs2qBS2f8Y5yyfa8bGAeOAccA4YBx4uA78A0V8HnL1S35CAAAAAElFTkSuQmCC');
  }
  &.delete {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAAfBJREFUWAljYBgFoyEwGgKjIYAvBBjxSRKSCw0NZXvw4G3T////44BqJQmof87IyLhIQUG4bvXq1b8IqMUpzYxThggJbm6JVqBjy4FKeYlQDlJj8/Hjd7Znz+7vIUI9ViUsWEWJFISGLAMzM4P3yZP7t+HTZmbm4v3v398tUD0V+NTik2PCJ0mEHDgZEHIsyJxTp/ZshZpHKOngtZaoNBwQEH3ryZNnqnhNolBSRkbq9oYNS9UIGUNpCBMynwT5//9JUEy8UhMTx/8gTLwO7CrJNWcQhTB2j6GLjlwHgzImCKOHCC5xdHXE8ikqh5EtwVWK4BJH1ksKe+QmCVJCiRK1oyFMSegRo3c0hIkJJUrUjIYwJaFHjN7RECYmlChRMyJC+DkohGxt3VG6OqAeg4yMJEbjB5s4kl6wWaSEOMmNH2BX/QywI+n78+dvUNe+E2YZru4NNnGoXgaQWTD9xNIkd/NlZJSeADsz8UBsLyOj+FtJSe3eo0d3vxBjIShkJSTks//9Y2hiADqXiYkx7enT+4+I0QtTQ1QnFKYYRpuZOVVDLP1PZh5g/Ad0cO2ZM3vbYGYSS5McwiCDgaFyGBjS+4FMESDmA2JiBlKAyhhAoz8HQCF7+vTepSCBUTAaAqMhMBoCoyEwGgKjITCkQwAAPdiKZevojBgAAAAASUVORK5CYII=');
  }
  &.comment{
    background-image: url(../../static/images/icon-answer.png);
    background-size: 30rpx;
    background-position: center center;
  }
}
</style>
