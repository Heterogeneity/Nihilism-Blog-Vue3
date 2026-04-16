<script setup lang="ts">
import {computed, onMounted} from "vue";
import router from "@/router";
import {useNewsStore} from "@/stores/news.ts";

const newsStore = useNewsStore()
const pane = computed(() => newsStore.newsTypeList)
const newData = computed(() => newsStore.newsData?.slice(0, 5))
const show = computed(() => newsStore.select)
onMounted(() => {
  newsStore.getNewsData('baidu')
})
</script>

<template>
  <div class="news">
    <div class="news-title">
      每日新闻
    </div>
    <div class="pane-list">
      <div v-for="item in pane" :class="{'pane-item':true,'select':show===item.name}" :key="item.name">
        <div @click="newsStore.getNewsData(item.name)">
          <img class="pane-img" :src="item.src" :alt="item.label"/>
          <div>{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="news-list">
      <div @click="newsStore.openNews(item)" v-for="item in newData" class="news-item" :key="item.index">
        <div style="display: flex;">
          <div class="news-index">{{ item.index }}</div>
          <div class="news-item-title">{{ item.title }}</div>
        </div>
        <div class="news-popularity">热度:{{ item.popularity }}</div>
      </div>
    </div>
    <div class="tip">
      <span>以上仅显示前5条数据，详细数据请跳转</span>
      <el-link underline="never" @click="router.push('/news')">新闻</el-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);
  padding: 20px 10px;

  .news-title {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    color: var(--main-color);
  }

  .pane-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 20px auto 0;


    .select {
      -webkit-filter: drop-shadow(0 0 20px var(--main-color));

      div {
        font-weight: bold;
        color: var(--main-color);
      }
    }

    .pane-item {
      cursor: pointer;
      color: var(--default-color);
      font-size: 1rem;
      text-align: center;
      transition: all 0.5s ease-in-out;

      .pane-img {
        width: 30px;
        height: 30px;
        padding: 5px;
        border-radius: 10px;
        background-color: var(--main-color);
      }
    }

  }

  .news-list {
    margin: 20px auto 0;
    width: 95%;

    .news-item {
      cursor: pointer;
      padding: 10px;
      box-shadow: 0 0 10px var(--main-color);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      transition: all .5s ease-in-out;
      color: var(--default-color);

      .news-index {
        margin-right: 10px;
        font-weight: bold;
        color: var(--main-color);
      }

      .news-item-title {
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        color: var(--default-color);
      }

      .news-popularity {
        flex-wrap: nowrap;
        font-weight: bold;
        color: var(--main-color);
      }

      &:hover {
        border: 1px solid var(--main-color);
        scale: calc(1.05);
        margin-top: 10px;
      }
    }
  }
}

.tip {
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  color: var(--default-color);
  font-weight: bold;

  .el-link {
    font-size: 1rem;
    text-align: center;

    &:hover {
      color: var(--text-color);
    }
  }
}
</style>
