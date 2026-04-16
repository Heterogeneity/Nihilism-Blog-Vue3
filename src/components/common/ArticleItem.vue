<script setup lang="ts">

import TagCom from "@/components/common/TagCom.vue";
import {ChatDotSquare, Star, View} from "@element-plus/icons-vue";
import router from "@/router";
import type {Hit} from "@/api/common.ts";
import type {Article} from "@/api/article.ts";

const props = defineProps<{
  articleTable: Hit<Article>[] | undefined
}>()
const handleArticleJumps = (id: string) => {
  router.push(`/article/${id}`)
}
</script>

<template>
  <div class="article-item" @click="handleArticleJumps(item._id)" v-for="item in props.articleTable" :key="item._id">
    <div class="article-left">
      <img :src="item._source.cover" alt="">
    </div>
    <div class="article-right">
      <div class="article-top">
        <div class="article-top-title">{{ item._source.title }}</div>
        <div class="article-time">{{ item._source.created_at }}</div>
      </div>
      <div class="article-icons">
        <div class="article-category">{{ item._source.category }}</div>
        <div style="display: flex;align-items: center;justify-content: flex-end">
          <TagCom :tag="String(item._source.views)">
            <template #icon>
              <el-icon>
                <View/>
              </el-icon>
            </template>
          </TagCom>
          <TagCom :tag="String(item._source.comments)">
            <template #icon>
              <el-icon>
                <ChatDotSquare/>
              </el-icon>
            </template>
          </TagCom>
          <TagCom :tag="String(item._source.likes)">
            <template #icon>
              <el-icon>
                <Star/>
              </el-icon>
            </template>
          </TagCom>
        </div>
      </div>
    </div>
    <div style="display: flex;align-items: center;margin-bottom: 10px;justify-content: space-between;">
      <div class="article-content">{{ item._source.abstract }}</div>
      <div style="display: flex;flex-wrap: wrap;width: 150px;justify-content: flex-end;">
        <div class="article-tag" v-for="tag in item._source.tags">{{ tag }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-item {
  cursor: pointer;
  border-radius: 20px;
  background-color: var(--default-bc);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: var(--default-color);
  width: 475px;
  border: 1px solid var(--main-color);
  transition: all .5s ease-in-out;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 10px var(--main-color);
    color: var(--main-color);
  }

  .article-top {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .article-right {
    padding: 10px;
    font-weight: 600;
    transition: all .6s;
  }

  .article-view {
    display: flex;
    align-items: center;
  }

  .article-left {
    width: 100%;
    position: relative;
    background-size: cover;
    overflow: hidden;
    background-repeat: no-repeat;

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: all .6s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .article-time {
    position: absolute;
    right: 0;
    font-size: 16px;
  }

  .article-top-title {
    margin-left: 5px;
    font-size: 1.2rem;
    width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .article-icons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .article-category {
      margin-left: 5px;
      color: var(--main-color);
      font-size: .9rem;
    }

  }

  .article-tag {
    font-size: .7rem;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--main-color);
  }

  .article-content {
    width: 300px;
    display: none;
    text-indent: 1rem;
    overflow: hidden;
    white-space: nowrap;
    -webkit-line-clamp: 5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>