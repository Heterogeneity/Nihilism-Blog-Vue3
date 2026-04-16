<script setup lang="ts">

import Button from "@/components/common/Button.vue";
import {Promotion} from "@element-plus/icons-vue";
import {useMyFeedbackStore} from "@/stores/my-feedback.ts";
import {onMounted} from "vue";

const useFeedbackStore = useMyFeedbackStore()
onMounted(() => {
  useFeedbackStore.getNewFeedbackList()
})
</script>

<template>
  <div class="feedback-main">
    <div class="feedback-title">最新反馈</div>
    <div class="feedback-create">
      <input v-model="useFeedbackStore.feedbackRequest.content" type="text" placeholder="请输入反馈意见"/>
      <Button title="发送" @to-click="useFeedbackStore.createFeedback">
        <template #icon>
          <el-icon>
            <Promotion/>
          </el-icon>
        </template>
      </Button>
    </div>
    <div style="margin: 5px 0;color: var(--default-color)">注意：请登录后再进行反馈!</div>
    <div style="width:100%;">
      <span class="feedback-title" style="font-size: 1.3rem;">反馈列表</span>
      <div class="feedback-item" v-for="item in useFeedbackStore.myFeedbackNewData">
        <div>
          {{ item.content }}
        </div>
        <div>{{ useFeedbackStore.getTime(item.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-main {
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .feedback-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--main-color);
  }

  .feedback-item {
    color: var(--default-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px var(--main-color);
    border-radius: 10px;
    padding: 20px;
    margin-top: 10px;
    transition: all .5s ease-in-out;
    font-weight: bold;
    font-size: .9rem;

    &:hover {
      transform: scale(1.05);
      border: 1px solid var(--main-color);
    }
  }

  .feedback-create {
    display: flex;
    align-items: center;
    margin: 10px 0;

    input {
      width: 77%;
      font-weight: bold;
      font-family: 'YSHST', fangsong;
      color: var(--default-color);
      outline: none;
      font-size: .9rem;
      padding: 5px;
      border-radius: 5px;
      background-color: var(--bc-color);
      border: 1px solid var(--main-color);

      &:focus {
        box-shadow: 0 0 10px var(--main-color);
      }
    }
  }
}
</style>