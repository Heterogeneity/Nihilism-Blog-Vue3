<script setup lang="ts">
import WebFooter from "@/components/layout/WebFooter.vue";
import WebNavbar from "@/components/layout/WebNavbar.vue";
import {ref, onMounted} from 'vue';
import Logo from "@/components/common/Logo.vue";
import {useLayoutStore} from "@/stores/layout.ts";
import ChangeColor from "@/components/layout/ChangeColor.vue";
import ChangeTheme from "@/components/layout/ChangeTheme.vue";
import FixedMenu from "@/components/common/FixedMenu.vue";
import Wave from "@/components/common/Wave.vue";
import Carousel from "@/components/pages/Carousel.vue";

const showIntro = ref(true);
const layoutStore = useLayoutStore()
onMounted(() => {
  // 监听动画结束事件，移除遮罩
  const overlay = document.querySelector('.intro-overlay');
  if (overlay) {
    overlay.addEventListener('animationend', () => {
      showIntro.value = false;
    });
  }
})
</script>

<template>
  <div class="web">
    <div v-if="showIntro" class="intro-overlay">
      <img style="border-radius: 50%;width: 400px;height: 400px;" src="/images/avatar.jpg" alt=""/>
      <h1 style="font-size: 5rem;color: #FFFFFF">Nihilism Blog</h1>
    </div>
    <web-navbar/>
    <router-view/>
    <web-footer/>
  </div>
</template>

<style scoped lang="scss">
.web {

  .intro-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--main-color);
    z-index: 9999;
    animation: fadeOut 1.5s ease-out forwards;
  }

  @keyframes fadeOut {
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>