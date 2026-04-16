<script setup lang="ts">

</script>

<template>
    <div class="waves" style="position: relative;z-index: -1;padding-top:810px;width: 100%;">
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 20 150 32" preserveAspectRatio="none" shape-rendering="auto"
           style="transform: translateZ(0); backface-visibility: hidden;">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v48h-352z"
          ></path>
        </defs>
        <g class="parallax" style="transform: translateZ(0);">
          <use xlink:href="#gentle-wave" x="48" y="0"
               style="animation-delay: -2s; animation-duration: 7s; will-change: transform;opacity: 0.25;fill: var(--bc-color)"
          ></use>
          <use xlink:href="#gentle-wave" x="48" y="3" class="opacity-50 fill-[var(--page-bg)]"
               style="animation-delay: -3s; animation-duration: 10s; will-change: transform;opacity: 0.5;fill: var(--bc-color)"
          ></use>
          <use xlink:href="#gentle-wave" x="48" y="5"
               style="animation-delay: -4s; animation-duration: 13s; will-change: transform;opacity: 0.75;fill: var(--bc-color);"
          ></use>
          <use xlink:href="#gentle-wave" x="48" y="7" class="fill-[var(--page-bg)]"
               style="animation-delay: -5s; animation-duration: 20s; will-change: transform;fill: var(--bc-color)"></use>
        </g>
      </svg>
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v48h-352z"></path>
      </defs>
      <g class="parallax" style="transform: translateZ(0);">
        <use xlink:href="#gentle-wave" x="48" y="0"
             style="animation-delay: -2s; animation-duration: 7s; will-change: transform;opacity: 0.25;fill: var(--bc-color);"
        ></use>
        <use xlink:href="#gentle-wave" x="48" y="3"
             style="animation-delay: -3s; animation-duration: 10s; will-change: transform;opacity: 0.5;fill: var(--bc-color);"
        ></use>
        <use xlink:href="#gentle-wave" x="48" y="5"
             style="animation-delay: -4s; animation-duration: 13s; will-change: transform;opacity: 0.75;fill: var(--bc-color);"
        ></use>
        <use xlink:href="#gentle-wave" x="48" y="7"
             style="animation-delay: -5s; animation-duration: 20s; will-change: transform;fill: var(--bc-color)"></use>
      </g>
    </div>

</template>

<style scoped lang="scss">
.waves {
  overflow: visible;
  transform: translateZ(0);
  will-change: transform;
  contain: none;
  max-height: 9.375rem;
  min-height: 3.125rem;
  height: 10vh;

  svg {
    height: 100%;
    width: 100%;
    display: block;
    transform: translateZ(0);
    backface-visibility: hidden;
  }
}

.parallax {
  use {
    animation: wave 25s cubic-bezier(0.5, 0.5, 0.45, 0.5) infinite;
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }
}

@keyframes wave {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

#header-waves {
  isolation: isolate;
  contain: none;
  margin-bottom: -1px;
}
</style>