<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type ArticleTag, articleTags} from "@/api/article.ts";

interface TagCloudItem {
  tag: string;
  number: number;
}

const tagCloudArray = ref<TagCloudItem[]>([])

const getTagCloudArray = async () => {
  let tagsArray: ArticleTag[]
  const res = await articleTags()
  if (res.code === 0) {
    tagsArray = res.data
    tagsArray.forEach((v, i) => {
      const tagCloud: TagCloudItem = {
        tag: v.tag,
        number: v.number
      }
      tagCloudArray.value.push(tagCloud)
    })
  }
}
onMounted(() => {
  getTagCloudArray()
})
</script>

<template>
  <div class="tag-cloud">
    <div class="title">标签云</div>
    <div style="display: flex;flex-wrap: wrap;">
      <div class="tag-item" v-for="item in tagCloudArray" :key="item.tag"
      >
        <div class="box">
          <div>{{ item.tag }}</div>
          <div>【{{ item.number }}】</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.tag-cloud {
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--text-color);
    margin-bottom: 20px;
  }

  .tag-item {
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    border: 2px solid var(--main-color);
    color: var(--text-color);
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 0 20px var(--main-color);
      background-color: var(--main-color);
      color: var(--select-text-color);
    }
  }

  .box {
    display: flex;
    justify-content: space-between;
  }
}
</style>