<script setup lang="ts">
import {onMounted, ref} from "vue";

let theme = ref("")
const setTheme = (val: string) => {
  theme.value = val
  document.documentElement.setAttribute('data-theme', val)
  localStorage.setItem("theme", val)
}

const loadTheme = () => {
  if (localStorage.getItem("theme") !== '') {
    setTheme(String(localStorage.getItem("theme")))
  } else {
    setTheme("")
  }
}
onMounted(() => {
  loadTheme()
})
</script>

<template>
  <div>
    <div class="change" v-if="theme==='dark'" @click="setTheme('')">
      <svg t="1773891258161" class="icon " viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="7850" width="64" height="64">
        <path
            d="M757.5 721.2c-192.3 0-348.2-155.9-348.2-348.2 0-77 25-148.1 67.3-205.7-159.2 32-279.1 172.7-279.1 341.3 0 192.3 155.9 348.2 348.2 348.2 115.3 0 217.6-56.1 280.9-142.5-22.4 4.5-45.4 6.9-69.1 6.9z"
            p-id="7851" fill="#ffffff"></path>
        <path
            d="M598 376.5c4.3 4.2 6.2 10.2 5.2 16.1l-6 34.8c-2.5 14.8 13 26.1 26.3 19.1l31.3-16.4c5.3-2.8 11.6-2.8 16.9 0l31.3 16.4c13.3 7 28.9-4.3 26.3-19.1l-6-34.8c-1-5.9 0.9-11.9 5.2-16.1l25.3-24.7c10.8-10.5 4.8-28.8-10-30.9l-35-5.1c-5.9-0.9-11-4.6-13.7-9.9l-15.6-31.7c-6.7-13.5-25.9-13.5-32.5 0L631.4 306c-2.6 5.4-7.7 9.1-13.7 9.9l-35 5.1c-14.9 2.2-20.8 20.4-10 30.9l25.3 24.6zM740.3 491.1l-7.5 15.1c-1.3 2.6-3.7 4.3-6.5 4.7l-16.7 2.4c-7.1 1-10 9.8-4.8 14.8l12.1 11.8c2 2 3 4.9 2.5 7.7l-2.9 16.6c-1.2 7.1 6.2 12.5 12.6 9.1l15-7.9c2.5-1.3 5.5-1.3 8.1 0l15 7.9c6.4 3.3 13.8-2.1 12.6-9.1l-2.9-16.6c-0.5-2.8 0.5-5.7 2.5-7.7l12.1-11.8c5.1-5 2.3-13.8-4.8-14.8l-16.7-2.4c-2.8-0.4-5.3-2.2-6.5-4.7l-7.5-15.1c-3.3-6.4-12.5-6.4-15.7 0z"
            p-id="7852" fill="#ffffff"></path>
      </svg>
    </div>
    <div class="change" v-else @click="setTheme('dark')">
      <svg t="1773891063966" class="icon " viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg" p-id="6672" width="64" height="64">
        <path
            d="M876.544 502.784l-100.352-99.84V260.608c0-7.168-5.632-12.8-12.8-12.8h-142.848l-100.352-99.84c-5.12-5.12-13.312-5.12-18.432 0L401.92 247.808H260.608c-7.168 0-12.8 5.632-12.8 12.8v141.312L147.456 502.784c-5.12 5.12-5.12 13.312 0 18.432l100.352 99.84v142.336c0 7.168 5.632 12.8 12.8 12.8h141.312l100.864 100.864c5.12 5.12 13.312 5.12 18.432 0l100.864-100.864h142.336c7.168 0 12.8-5.632 12.8-12.8v-142.336l99.84-99.84c4.608-5.12 4.608-13.312-0.512-18.432zM511.488 742.4c-127.488 0-230.4-102.912-230.4-230.4 0-126.976 103.424-230.4 230.4-230.4 127.488 0 230.4 102.912 230.4 230.4 0 126.976-102.912 230.4-230.4 230.4z m0-414.72c-101.888 0-184.32 82.432-184.32 184.32s82.432 184.32 184.32 184.32 184.32-82.432 184.32-184.32-82.432-184.32-184.32-184.32z"
            fill="#ffffff" p-id="6673"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.change {
  cursor: pointer;
  width: 32px;
  height: 32px;
  transition: all .5s ease;
  background-color: var(--main-color);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    scale: calc(1.1);
    box-shadow: 0 0 20px var(--main-color);
  }
}
</style>