<script setup lang="ts">
import {onMounted, ref} from "vue";
import {type Advertisement, advertisementInfo} from "@/api/advertisement";
import {ElMessage} from "element-plus";

const advertisementList = ref<Advertisement[]>([])
const getAdvertisementList = async () => {
  const res = await advertisementInfo()
  if (res.code === 0) {
    if (res.data.list.length > 0) {
      res.data.list.forEach(v => {
        advertisementList.value.push(v)
      })
    }
  } else {
    ElMessage.error(res.msg)
  }
}

const handleAdvertisementClick = (advertisement: Advertisement) => {
  if (advertisement.link === '待定') {
    ElMessage.warning("网站制作中，等待作者上传!")
  } else {
    window.open(advertisement.link)
  }
}
onMounted(() => {
  getAdvertisementList()
})
</script>

<template>
  <div class="advertisement-main">
    <div class="advertisement-title">个人项目中转站</div>
    <el-carousel :interval="5000" type="card" height="345px">
      <el-carousel-item style="border-radius:20px;background-color: var(--default-bc)"
                        v-for="advertisement in advertisementList" :key="advertisement">
        <div class="advertisement-img">
          <img :src=advertisement.ad_image alt=""
               @click="handleAdvertisementClick(advertisement)"/>
        </div>
        <div class="advertisement-item-title">{{ advertisement.title }}</div>
        <div class="advertisement-desc">{{ advertisement.content }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.advertisement-main {
  margin-top: 20px;
  padding: 20px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .advertisement-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--main-color);
  }

  .advertisement-img {
    width: 500px;
    height: 280px;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      background-size: cover;
    }
  }

  .advertisement-item-title {
    margin-top: 5px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--main-color);
  }

  .advertisement-desc {
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 5px;
    color: var(--default-color);
  }
}
</style>