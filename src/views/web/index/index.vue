<script setup lang="ts">

import WebNavbar from "@/components/layout/WebNavbar.vue";
import DailyNews from "@/components/pages/DailyNews.vue";
import Calendar from "@/components/pages/Calendar.vue";
import ProfileCard from "@/components/pages/ProfileCard.vue";
import TagCloud from "@/components/pages/TagCloud.vue";
import Carousel from "@/components/pages/Carousel.vue";
import RecentComments from "@/components/pages/RecentComments.vue";
import ArticleList from "@/components/pages/ArticleList.vue";
import Feedback from "@/components/pages/Feedback.vue";
import Advertisement from "@/components/pages/Advertisement.vue";
import BannerGroup from "@/components/pages/BannerGroup.vue";
import Wave from "@/components/common/Wave.vue";
import {useLayoutStore} from "@/stores/layout.ts";
</script>

<template>
  <div class="index">
    <Carousel v-if="useLayoutStore().state.swiper"/>
    <el-container class="main-content">
      <div class="container">
        <div class="left">
          <BannerGroup/>
          <ArticleList/>
          <Advertisement/>
        </div>
        <div class="right">
          <Calendar/>
          <DailyNews/>
          <ProfileCard/>
          <TagCloud/>
          <RecentComments/>
          <Feedback/>
        </div>
      </div>
    </el-container>
  </div>
</template>

<style scoped>
.index {
  margin-top: 80px;
  transition: all .5s ease-in-out;
  .main-content {
    max-width: 1480px;
    margin: 0 auto;

    .container {
      display: flex;
      padding: 20px 0;
      width: 100%;

      .right {
        width: 30%;
      }

      .left {
        width: 70%;
        padding-right: 20px;

      }
    }
  }
}
</style>