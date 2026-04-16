<script setup lang="ts">

import {useNewsStore} from "@/stores/news.ts";
import {computed, onMounted, ref, watchEffect} from "vue";

const newsStore = useNewsStore()
const pane = computed(() => newsStore.newsTypeList)
const newData = computed(() => newsStore.newsData)
const show = computed(() => newsStore.select)
onMounted(() => {
  newsStore.getNewsData('baidu')
})
</script>

<template>
  <div class="news">
    <div class="news-title">
      <h1>每日新闻</h1>
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
        <div class="news-left">
          <div class="news-index">
            <div>{{ item.index }}</div>
            <div><img :src="item.image" :alt="item.description"></div>
          </div>
          <div>
            <div class="news-item-title">{{ item.title }}</div>
            <div class="news-item-description">{{ item.description }}</div>
          </div>
        </div>
        <div class="news-popularity">热度:{{ item.popularity }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  max-width: 1440px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 10px var(--main-color);
  margin: 100px auto 20px;


  .news-title {
    font-size: 1.5rem;
    text-align: center;
    color: var(--default-color);
  }

  .pane-list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    margin: 0 auto;


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
      font-size: 1.3rem;
      text-align: center;
      transition: all 0.5s ease-in-out;

      .pane-img {
        width: 50px;
        height: 50px;
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
      padding: 20px;
      box-shadow: 0 0 10px var(--main-color);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      transition: all .5s ease-in-out;
      color: var(--default-color);

      .news-left {
        display: flex;
        align-items: center;

        .news-index {
          font-weight: bold;
          display: flex;
          align-items: center;
          color: var(--main-color);
          font-size: 1.5rem;
        }

        .news-item-title {
          font-weight: bold;
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--main-color);
        }

        .news-item-description {
          width: 70%;
          color: var(--default-color);
        }

        img {
          border-radius: 10px;
          width: 300px;
          height: 200px;
          margin: 0 20px;
        }
      }

      .news-popularity {
        width: 25%;
        text-align: end;
        font-weight: bold;
        font-size: 1.5rem;
        color: var(--main-color);
      }

      &:hover {
        border: 1px solid var(--main-color);
        scale: calc(1.05);
        margin-top: 30px;
      }
    }
  }
}
</style>