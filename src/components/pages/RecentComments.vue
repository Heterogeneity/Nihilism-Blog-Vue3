<script setup lang="ts">
import {useMyCommentStore} from "@/stores/my-comment.ts";
import {computed, onMounted} from "vue";
import CommentItem from "@/components/common/CommentItem.vue";

const myCommentStore = useMyCommentStore()
onMounted(() => {
  myCommentStore.getNewComment()
})
</script>

<template>
  <div class="comment-main">
    <div class="comment-title">最新评论</div>
    <div class="comment-list">
      <comment-item :comments="myCommentStore.newComments"/>
    </div>
  </div>
</template>

<style scoped>
.comment-main {
  margin-top: 20px;
  padding: 5px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .comment-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--main-color);
  }
}
.comment-list {
  font-weight: bold;
  width: 94%;
}
</style>