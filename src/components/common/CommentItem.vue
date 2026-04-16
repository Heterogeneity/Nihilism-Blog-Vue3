<script setup lang="ts">

import Button from "@/components/common/Button.vue";
import {ArrowDownBold, ArrowUpBold, ChatDotSquare, Close, Files, Plus, Promotion} from "@element-plus/icons-vue";
import {commentCreate, type CommentCreateRequest, type Comment} from "@/api/comment.ts";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {useUserStore} from "@/stores/user.ts";
import {useCommentStore} from "@/stores/comment.ts";
import {useMyCommentStore} from "@/stores/my-comment.ts";

const userStore = useUserStore()
const commentStore = useCommentStore()
const myComment = useMyCommentStore()
const props = defineProps<{
  comments: Comment[] | null
}>()

const open = ref(0)
const child = ref(0)

const deleteToComment = async (item: Comment) => {
  await commentStore.deleteSingle(item)
  await myComment.getArticleCommentsInfo()
}

const getTime = (date: Date) => {
  const time = new Date(date)
  return time.toLocaleString()
}
</script>

<template>
  <div v-for="item in props.comments" :key="item.id">
    <div class="comment-item">
      <div style="height: 60px;width: 60px;margin-right: 20px;">
        <el-image :src="item.user.avatar" alt=""></el-image>
      </div>
      <div style="width: 95%">
        <div class="item-top">
          <div style="color: var(--main-color);font-size: 1.2rem;">
            {{ item.user.username }}
          </div>
          <span> {{ getTime(item.created_at) }}</span>
        </div>
        <div class="item-bottom">
          <span style="font-size: 1.1rem"> {{ item.content }}</span>
          <div style="display: flex; align-items: center;">
            <Button title="回复" @to-click="open=item.id">
              <template #icon>
                <el-icon>
                  <ChatDotSquare/>
                </el-icon>
              </template>
            </Button>
            <Button v-show="item.user_uid===userStore.state.userInfo.uid" title="删除评论"
                    @to-click="deleteToComment(item)">
              <template #icon>
                <el-icon>
                  <Close/>
                </el-icon>
              </template>
            </Button>
            <Button v-show="item.children!==null&&item.children.length!==0&&child!==item.id"
                    :title="`展开回复`" @to-click="child=item.id">
              <template #icon>
                <el-icon>
                  <ArrowDownBold/>
                </el-icon>
              </template>
            </Button>
            <Button v-show="item.children!==null&&item.children.length!==0&&child===item.id"
                    :title="`关闭回复`" @to-click="child=0">
              <template #icon>
                <el-icon>
                  <ArrowUpBold/>
                </el-icon>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="child===item.id"
         style="border-bottom: 5px solid var(--main-color);border-top:5px solid var(--main-color);border-radius: 10px;margin-bottom: 20px;">
      <span style="color: var(--main-color)">@{{ item.user.username }} : "{{ item.content }}"相关评论回复</span>
      <comment-item :comments="item.children?item.children:null"/>
      <span style="color: var(--main-color);">@{{ item.user.username }} : "{{
          item.content
        }}"相关评论回复到此</span>
    </div>
    <div v-show="open===item.id" class="comment-medium">
      <div class="comment-medium-top">
        <div style="width: 50px;height: 50px;">
          <el-image :src="userStore.state.userInfo.avatar" alt=""/>
        </div>
        <div style="margin-left: 20px;max-width: 830px; width: 100%;">
          <textarea v-model="myComment.content" placeholder="请输入评论"/>
        </div>
      </div>
      <div class="comment-send">
        <Button title="发表" @to-click="myComment.replyComment(item)">
          <template #icon>
            <el-icon>
              <Plus/>
            </el-icon>
          </template>
        </Button>
        <Button title="取消" @to-click="open=0">
          <template #icon>
            <el-icon>
              <Close/>
            </el-icon>
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-item {
  margin: 10px 0;
  width: 96%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  border-bottom: 2px solid var(--main-color);
  border-top: 2px solid var(--main-color);
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;

  .el-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
    box-shadow: 0 0 10px var(--main-color);
  }

  .item-top {
    color: var(--default-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item-bottom {
    color: var(--default-color);
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.comment-medium-top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;

  .el-image {
    background-color: var(--main-color);
    box-shadow: 0 0 10px var(--main-color);
    width: 100%;
    height: auto;
    border-radius: 50%;
  }

  textarea {
    width: 100%;
    outline: none;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px var(--main-color);
    height: 40px;
    font-size: 1.1rem;
    color: var(--main-color);
    font-family: 'YSHST', fangsong;
    font-weight: bold;
    padding: 10px;
    background-color: var(--bc-color);
  }
}

.comment-send {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;

  span {
    color: var(--default-color);
  }
}
</style>