<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useTagStore} from "@/stores/tag.ts";
import {computed} from "vue";
import {Close} from "@element-plus/icons-vue";

const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()
const tags = computed(() => tagStore.state.tags)
const handleClose = (tagName: string) => {
  const tags = tagStore.state.tags
  // 如果要删除的 tag 不是当前路由，则直接删除
  if (tags.length === 1) {
    closeAllTags()
  }
  if (tagName !== route.name) {
    tagStore.removeTag(tagName)
    return
  }
  // 如果要删除的 tag 是当前路由，先找到要删除的 tag 的索引
  const index = tags.findIndex(tag => tag.name === tagName)
  // 如果找到了该 tag
  if (index !== -1) {
    // 先删除该 tag
    tagStore.removeTag(tagName)
    // 计算要跳转的上一个 tag 的名称
    const previousTag = index > 0 ? tags[index - 1].name : null;
    // 跳转到上一个 tag 或默认路由
    if (previousTag) {
      router.push({name: previousTag})
    }
  } else {
    closeAllTags()
  }
}
const handleTag = (tagName: string) => {
  router.push({name: tagName})
}
const closeAllTags = () => {
  tagStore.state.tags.forEach((tag) => {
    tagStore.removeTag(tag.name)
  })
  tagStore.state.tags.push({
    title: "主页",
    name: "home"
  })
  router.push({name: "home"})
}
</script>

<template>
  <div class="scroll-list">
    <div class="dashboard-tag">
      <div
          :class="{'tags-item':true,'select':route.path.includes(tag.name)}"
          v-for="tag in tags"
          :key="tag.name"
      >
        <span @click.prevent="handleTag(tag.name)">{{ tag.title }}</span>
        <el-icon @click="handleClose(tag.name)">
          <Close/>
        </el-icon>
      </div>
      <div class="tags-item" @click.prevent="closeAllTags">关闭全部</div>
    </div>
  </div>
</template>

<style scoped>
.scroll-list {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;

  .dashboard-tag {
    padding: 10px 30px;
    display: flex;
    align-items: center;
    color: var(--default-color);
    font-size: .9rem;

    .select {
      background-color: var(--main-color);
      color: var(--select-text-color);
    }

    .tags-item {
      cursor: pointer;
      width: 90px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 2px;
      margin-right: 5px;
      border: 1px solid var(--main-color);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 0 20px var(--main-color);
      }

    }
  }
}
</style>