<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {websiteCalendar, type WebsiteCalendarResponse} from "@/api/website.ts";

const calendarInfo = ref<WebsiteCalendarResponse>({
  date: '',
  lunar_date: '',
  ganzhi: '',
  zodiac: '',
  day_of_year: '',
  solar_term: '',
  auspicious: '',
  inauspicious: ''
})

let timerId: any;
const currentTime = ref('')

const updateCurrentTime = () => {
  currentTime.value = new Date().toLocaleTimeString()
}

const initializeTimer = () => {
  updateCurrentTime()
  timerId = setInterval(updateCurrentTime, 1000)
}

const getCalendarInfo = async () => {
  const res = await websiteCalendar()
  if (res.code === 0) {
    calendarInfo.value = res.data
  }
}

onMounted(() => {
  initializeTimer()
  getCalendarInfo()
})

onUnmounted(() => {
  clearInterval(timerId as number)
})
</script>

<template>
    <div class="calendar">
      <div class="title">今日日历</div>
      <el-row><span class="topic">时间：</span><span style="color: var(--text-color);font-weight: bold">{{ calendarInfo.date }}{{ currentTime }}</span></el-row>
      <el-row><span class="topic">农历：</span><span  class="span-color">{{ calendarInfo.lunar_date }}</span></el-row>
      <el-row><span class="topic">干支：</span><span class="span-color">{{ calendarInfo.ganzhi }}</span></el-row>
      <el-row><span class="topic">星座：</span><span class="span-color">{{ calendarInfo.zodiac }}</span></el-row>
      <el-row><span class="topic">天次：</span><span class="span-color">{{ calendarInfo.day_of_year }}</span></el-row>
      <el-row><span class="topic">节气：</span><span class="span-color">{{ calendarInfo.solar_term }}</span></el-row>
      <el-row><span class="topic">宜项：</span><span class="span-color" style="width: 350px">{{ calendarInfo.auspicious }}</span></el-row>
      <el-row><span class="topic">禁忌：</span><span class="span-color" style="width: 350px">{{ calendarInfo.inauspicious }}</span></el-row>
    </div>
</template>

<style scoped>
.calendar {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  padding: 20px 0 20px 20px;
  border-radius: 20px;
  height: 270px;
  box-shadow: 0 0 10px var(--main-color);
  background: transparent;
  .title {
    text-align: center;
    font-size: 2rem;
    color: var(--text-color);
    margin: 0 auto 10px;
    font-weight: bold;
  }

  .el-row {
    margin-top: 5px;
  }

  .topic {
    width: 50px;
    font-weight: bold;
    color: var(--text-color);
  }
  .span-color{
    color: var(--calendar-color);
  }
}
</style>