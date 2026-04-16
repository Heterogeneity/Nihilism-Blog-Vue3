<script setup lang="ts">
import {onMounted} from "vue";
import Title from "@/components/common/Title.vue";
import {useMyCommentStore} from "@/stores/my-comment.ts";
import CommentItem from "@/components/common/CommentItem.vue";


const myComment = useMyCommentStore()

onMounted(() => {
  myComment.getCommentInfo()
})
</script>

<template>
  <div class="comment-main">
    <Title title="我的评论"/>
    <div class="comment-list">
      <comment-item :comments="myComment.myComments"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.comment-main {
  padding: 20px;

  .comment-list {
    max-height: 670px;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    scroll-behavior: smooth; /* 平滑滚动 (适用于点击锚点或JS) */
  }
}
</style>