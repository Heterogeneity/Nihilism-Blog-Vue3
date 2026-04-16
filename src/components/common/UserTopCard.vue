<template>
  <div class="avatar-main">
    <div class="avatar-item">
      <div class="avatar">
        <img :src="store.state.websiteInfo.full_logo" alt="">
        <span class="tip"></span>
      </div>
      <span ref="myName" class="avatar-name">{{ store.state.websiteInfo.title }}</span>
    </div>
    <p style=" color: var(--bc-color);font-weight: bold;font-size: 1.5rem;text-align: center;
  -webkit-filter: drop-shadow(0 0 5px var(--main-color));">{{ store.state.websiteInfo.slogan_en }}</p>
    <div class="typedText-item">
      <div class="typedText">{{ typeText }}</div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import {ref, onMounted, reactive} from 'vue'

import {useWebsiteStore} from "@/stores/website.ts";

let typeText = ref<string>('');
const speed: number = 200;
const store = useWebsiteStore();
const typeList: Array<string> = ['你好！欢迎来到我的个人博客。'];
const myName = ref();

onMounted(() => {
  start(typeList)
})
let timer: any
const start = (text: Array<string>) => {
  let i: number = 0;
  let j: number = 0;
  typeText.value = "";
  if (text.length <= 0) {
    console.error("typedList数据缺失");
    return;
  } else {
    let arr: Array<string> = text[j].split("");
    timer = setInterval(() => {
      if (i < arr.length) {
        typeText.value += arr[i++];
      } else {
        if (j < text.length - 1) {
          j++;
          i = 0;
          typeText.value = "";
          arr = text[j].split("");
        } else {
          clearInterval(timer);
          // if (loop) {
          //     start(text);
          // }
        }
      }
    }, speed)
  }
}
</script>
<style lang="scss" scoped>
.avatar-main {
  position: absolute;
  z-index: 10;
  top: 35%;
  width: 100%;
  min-width: 290px;
  border-radius: .5rem;
}

.typedText-item {
  max-width: 35rem;
  text-align: center;
  padding: 1rem;
  line-height: 2rem;
  margin: 2rem auto;
  font-weight: 600;
  font-size: 2rem;
  color: var(--main-color);
  background-color: var(--bc-color);
  border-radius: 1rem;
}

.typedText::after {
  content: "|";
  animation: blink 1s infinite;
}

.avatar {
  width: 150px;
  height: 150px;
  transition: all 1s linear;
  position: relative;

  &:hover {
    transform: scale(.9);
  }
}

.avatar-name {
  margin-top: 1rem;
  color: var(--bc-color);
  line-height: 2rem;
  font-weight: bold;
  font-size: 2.5rem;
  -webkit-filter: drop-shadow(0 0 4px var(--main-color));
}

.avatar img {
  height: 100%;
  width: 100%;
  animation: light 5s ease-in-out infinite;
  border-radius: 50%;
  border: 3px var(--main-color) solid;
  text-align: center;
}

.tip {
  border-radius: 50%;
  height: 20px;
  width: 20px;
  background-color: #01e084;
  border: 3px #FFFFFF solid;
  position: absolute;
  right: 0;
  bottom: 5%;
}

.avatar-item {
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
}

@keyframes light {
  0% {
    box-shadow: 0 0 4px #B9F3FC
  }

  25% {
    box-shadow: 0 0 16px #93C6E7
  }

  50% {
    box-shadow: 0 0 20px #FEDEFF
  }

  75% {
    box-shadow: 0 0 16px #93C6E7
  }

  100% {
    box-shadow: 0 0 4px #B9F3FC
  }
}

@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}</style>