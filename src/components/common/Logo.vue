<script setup lang="ts">
import {useWebsiteStore} from "@/stores/website.ts";

const websiteStore = useWebsiteStore()
</script>

<template>
  <div class="logo">
    <img :src="websiteStore.state.websiteInfo.full_logo" alt=""/>
    <div class="brand-info">
      <div>{{ websiteStore.state.websiteInfo.slogan }}</div>
      <div><span>{{ websiteStore.state.websiteInfo.slogan_en }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-weight: bold;
  color: var(--text-color);
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    transition: all .2s ease-in-out;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px var(--main-color);
    }
  }

  .brand-info {
    width: 190px;
    padding-left: 10px;

    div > span {
      font-size: .8rem;
      text-align: start;
    }
  }
}
</style>