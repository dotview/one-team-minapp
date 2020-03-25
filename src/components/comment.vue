<template>
  <div class="comment-item">
    <!-- <p @click="showComment" v-if="!isMine"><span class="comment-item-icon"></span>{{itemVal}}</p> -->
    <div v-if="showMore">
      <ol v-if="commentList.length">
        <li v-for="(item,index) in commentList" :key="item._id">
          <span>{{item.userId.nickName}}：</span>
          <span v-if="item.fUser" class="comment-item-returnname">@{{item.fUser.nickName}}</span>{{item.content}}
          <span v-if="userId===item.userId._id" @click="delAnswer(item._id)">删除</span>
          <template v-else>
            <span v-if="activeIndex===index" @click="cancelAnswer()">取消回复</span>
            <span v-else @click="doAnswer(item,index)">回复</span>
          </template>
        </li>
      </ol>
      <div :class="['comment-item-write',{'comment-item-return':returnName}]" v-if="!isMine">
        <span v-if="returnName">@{{returnName}}</span>
        <input type="text" placeholder="我想说..." v-model="commentVal" @click="writeBox" disabled/>
        <span @click="doComment">评论</span>
      </div>
    </div>
    <write-comment :returnName="returnName" @closeWriteBox="writeBox" v-if="showWriteBox" @doComment="doComment"></write-comment>
  </div>
</template>
<script>
import mDialog from 'aym-ui/components/dialog/index.js'
import writeComment from './write-comment.vue'
import { GET_COMMENT } from '@/api/index'
export default {
  mixins: [mDialog],
  data() {
    return {
      commentList: [],
      commentVal: '',
      returnName: '',
      activeIndex: -1,
      returnUser: {},
      userId: '',
      showWriteBox: false
    }
  },
  components: {
    writeComment
  },
  props: {
    config: Object,
    showWrite: Boolean,
    showMore: Boolean
  },
  watch: {
    showWrite(newVal) {
      if (newVal) this.writeBox()
    },
    showMore: {
      handler(newVal) {
        if (newVal) this.showComment()
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    itemVal() {
      if (this.showMore) {
        return '收起评论'
      } else {
        return this.hasComment ? this.config.answerListLength + '条评论' : '评论'
      }
    },
    hasComment() {
      return !!this.config.answerListLength
    }
  },
  methods: {
    showComment() {
      // this.showMore = !this.showMore
      if (!this.showMore) return
      if (this.hasComment) {
        this.getCommentList()
      }
    },
    getCommentList() {
      this.$_get(GET_COMMENT, {reportId: this.config._id}, {loading: false})
        .then((res) => {
          this.commentList = res.list
          this.hasComment = true
          this.userId = res.userId
          this.$emit('updateCommentLength', res.list.length)
          // console.log(this.commentList)
        })
    },
    doComment(val) {
      if (val) this.commentVal = val
      let param = {
        content: this.commentVal,
        fId: '',
        fUser: '',
        reportId: this.config._id
      }
      if (this.returnName) {
        param.fId = this.returnUser._id
        param.fUser = this.returnUser.userId._id
      }
      this.submitComment(param)
      this.writeBox()
    },
    doAnswer(item, index) {
      this.returnName = item.userId.nickName
      this.activeIndex = index
      this.returnUser = item
      this.writeBox()
    },
    cancelAnswer() {
      this.activeIndex = -1
      this.returnName = ''
    },
    submitComment(param) {
      if (!this.commentVal) {
        // this.$_toast('评论不能为空呢~')
        return
      }
      this.$_post(GET_COMMENT, param, {loading: false})
        .then((res) => {
          this.commentVal = ''
          this.getCommentList()
        })
    },
    delAnswer(answerId) {
      this.$createDialog({
        type: 'confirm',
        title: '',
        content: '陛下，确认要删除吗？',
        onConfirm: () => {
          this.$_delete(GET_COMMENT, {answerId}, {loading: false})
            .then((res) => {
              this.getCommentList()
            })
        }
      }).show()
    },
    writeBox() {
      this.showWriteBox = !this.showWriteBox
      !this.showWriteBox && this.cancelAnswer()
    }
  }
}
</script>
<style lang="scss">
.comment-item {
  line-height: 36rpx;
  &-icon {
    float: left;
    width: 30rpx;
    height: 34rpx;
    background: url(../../static/images/icon-answer.png) no-repeat center center ;
    background-size: 100%;
    margin-right: 10rpx;
  }
  &-write {
    overflow: hidden;
    padding: 10rpx 0;
    input,span {
      float: left;
    }
    input {
      width: 420rpx;
      line-height: 50rpx;
      border: 1rpx solid #ddd;
      border-radius: 5rpx;
      margin-right: 10rpx;
      padding: 4rpx 10rpx;
    }
    span:last-child {
      width: 100rpx;
      height: 54rpx;
      line-height: 54rpx;
      text-align: center;
      color: #ffffff;
      background-color: #409eff;
      border-radius: 5rpx;
    }
  }
  &-return {
    span:first-child {
      height: 52rpx;
      line-height: 52rpx;
      margin-right: 20rpx;
    }
    input {
      width: 300rpx;
    }
  }
  &-returnname {
    color: #409eff;
    margin-right: 10rpx;
  }
  ol {
    padding: 10rpx 0;
    background-color: #f6f6f6;
    padding: 10rpx 20rpx;
    li {
      text-align:justify;
      line-height: 40rpx;
      span:first-child {
        color: #409eff;
      }
      span:last-child {
        margin-left: 20rpx;
        color: #999;
      }
    }
  }
}
</style>

