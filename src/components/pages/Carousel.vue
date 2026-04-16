<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {websiteCarousel} from "@/api/website.ts";
import {ElMessage} from "element-plus";
import Wave from "@/components/common/Wave.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {EffectFade, Autoplay, EffectCreative} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import UserTopCard from "@/components/common/UserTopCard.vue";

const imgList = ref<string[]>([])
const modules = [EffectFade, Autoplay, EffectCreative];
const getWebsiteCarousel = async () => {
  const res = await websiteCarousel()
  if (res.code === 0) {
    if (res.data.length > 0) {
      imgList.value = res.data
    }
  } else {
    ElMessage.error(res.msg)
  }
}
// const creativeEffect = {
//   next: {
//     scale: 1,
//     opacity: 0.7,
//     // 可选：同时添加一些位移效果，使动画更生动
//     // translate: ['0%', '0%', '0px'], // X, Y, Z 轴的位移
//     // rotate: [0, 0, 0], // X, Y, Z 轴的旋转角度
//   },
//   pre: {
//     scale: 1,
//     opacity: 0,
//   },
//   // 可选：开启阴影效果，增强立体感
//   shadowPerProgress: false,
//   // 限制变换生效的 slide 数量
//   limitProgress: 1,
//   // 启用透视效果，让 3D 变换更真实
//   perspective: true,
//   // 变换值乘数
//   progressMultiplier: 1,
// }
onMounted(()=>{
  getWebsiteCarousel()
})
watchEffect(()=>{

})
</script>

<template>
  <UserTopCard/>
  <div class="carousel">
    <swiper
        :modules="modules"
        :effect="'fade'"
        :fade-effect="{crossFade:true}"
        :autoplay="{delay: 3000}"
        :speed="1500"
    >
      <swiper-slide v-for="item in imgList" :key="item">
          <el-image :src="item" alt=""/>
      </swiper-slide>
    </swiper>
  </div>
  <Wave/>
</template>

<style scoped lang="scss">
.carousel {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -20;
  overflow: hidden;
  .el-image {
    z-index: -20;
    width: 100%;
    height: 1000px;
    transition: all 4s ease-in-out;
  }
}

.swiper-slide-active {
  .el-image {
    transform: scale(1.05);
  }
}


</style>