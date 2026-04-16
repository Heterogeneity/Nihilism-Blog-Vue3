<script setup lang="ts">
import {type FriendLink, friendLinkInfo} from "@/api/friend_link.ts";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const link = ref<FriendLink[]>([])

const getLinkList = async () => {
  const res = await friendLinkInfo()
  if (res.code === 0) {
    link.value = res.data.list
  } else {
    ElMessage.warning(res.msg)
  }
}

onMounted(() => {
  getLinkList()
})
</script>

<template>
  <div class="link-main">
    <div class="link-title">
      <h1>我的友链</h1>
    </div>
    <div class="link-list">
      <a class="link-item" target="_blank" :href="item.link" v-for="item in link" :key="item.id">
        <div class="item-img">
          <img :src="item.logo" :alt="item.description">
        </div>
        <div style="padding: 20px">
          <div class="item-header">
            <span>{{ item.name }}</span>
          </div>
          <div class="item-bottom">
            <span>{{ item.description }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-main {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  max-width: 1440px;
  margin: 100px auto 20px;
  padding: 20px;
  box-shadow: 0 0 10px var(--main-color);
  border-radius: 20px;

  .link-title {
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    color: var(--default-color);
  }

  .link-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .link-item {
      width: 400px;
      height: 120px;
      padding: 10px;
      font-weight: bold;
      color: var(--default-color);
      text-decoration: none;
      margin: 20px;
      border-radius: 20px;
      background-color: var(--default-bc);
      box-shadow: 0 0 10px var(--main-color);
      display: flex;
      transition: all .3s ease-in-out;

      &:hover {
        scale: calc(1.05);
      }

      .item-img {
        padding: 10px;
        margin-right: 10px;
        width: 100px;
        height: 100px;

        img {
          border-radius: 50%;
          height: 100%;
          background-color: var(--default-color);
          box-shadow: 0 0 10px var(--main-color);
        }
      }

      .item-header {
        font-weight: bold;
        font-size: 1.5rem;
        color: var(--main-color);
      }

      .item-bottom {
        color: var(--default-color);
      }
    }
  }
}
</style>