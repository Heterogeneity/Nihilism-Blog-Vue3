<script setup lang="ts">
import {useWebsiteStore} from "@/stores/website.ts";

const websiteStore = useWebsiteStore()
</script>

<template>
  <div class="profile-card">
    <div class="title">个人名片</div>
    <div style="display: flex;align-items: center;">
      <div class="content">
        <div class="item-content">
          <span class="text">昵称：</span>
          <span class="text-content">{{ websiteStore.state.websiteInfo.name }}</span>
        </div>
        <div class="item-content">
          <span class="text">职业：</span>
          <span class="text-content">{{ websiteStore.state.websiteInfo.job }}</span>
        </div>
        <div class="item-content">
          <span class="text">住址：</span>
          <span class="text-content">{{ websiteStore.state.websiteInfo.address }}</span>
        </div>
        <div class="item-content">
          <span class="text">邮箱：</span>
          <span class="text-content">{{ websiteStore.state.websiteInfo.email }}</span>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="card-front">
            <span class="text-content">我的QQ</span>
            <img :src="websiteStore.state.websiteInfo.qq_image" alt="">
          </div>
          <div class="card-back">
            <span class="text-content">我的微信</span>
            <img :src="websiteStore.state.websiteInfo.wechat_image" alt="">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.profile-card {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .title {
    font-size: 2rem;
    color: var(--text-color);
    font-weight: bold;
    text-align: center;
  }

  .item-content {
    margin-top: 10px;

    .text {
      font-weight: bold;
      color: var(--text-color);
    }

    .text-content {
      color: var(--default-color);
    }
  }

  .card-container {
    height: 180px;
    width: 160px;
    perspective: 1000px;
    margin: 10px auto 0;

    &:hover .card {
      transform: rotateY(180deg);
    }
  }

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s ease;
    font-weight: bold;
    font-size: 1.5rem;
    border-radius: 20px;
    box-shadow: 0 0 8px var(--main-color);
    color: var(--text-color);

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }

    .card-back {
      transform: rotateY(180deg);
    }

    img {
      margin-top: 10px;
      border-radius: 5px;
      height: 110px;
      width: 110px;
    }
  }


}
</style>