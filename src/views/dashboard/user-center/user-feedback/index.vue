<script setup lang="ts">
import {onMounted} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Close, Promotion} from "@element-plus/icons-vue";
import {useCollectionStore} from "@/stores/collection.ts";
import {useMyFeedbackStore} from "@/stores/my-feedback.ts";

const myFeedbackStore = useMyFeedbackStore()

onMounted(() => {
  myFeedbackStore.getMyFeedbackList()
})
</script>

<template>
  <div class="my-feedback-main">
    <Title title="我的反馈"/>
    <div class="table">
      <table style="width: 100%;">
        <thead>
        <tr>
          <th style="width: 15%">时间</th>
          <th>内容</th>
          <th>回复</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in myFeedbackStore.myFeedbackData">
          <tr>
            <td>{{ myFeedbackStore.getTime(item.updated_at) }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.reply }}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>

  </div>
</template>
<style scoped lang="scss">
.my-feedback-main {
  padding: 20px;

  .table {
    font-weight: bold;
    margin: 0 auto;
    font-size: .9rem;
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: none;

    table {
      border-spacing: 12px;
      text-align: center;
    }

    th {
      width: 120px;
      color: var(--main-color);
      padding: 5px 0;
      border-radius: 5px;
      border: 1px solid var(--main-color);
    }

    td {
      color: var(--default-color);
    }
  }

}
</style>