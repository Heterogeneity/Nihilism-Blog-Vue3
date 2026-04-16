<script setup lang="ts">
import {useLayoutStore} from "@/stores/layout.ts";
import ChangeColor from "@/components/layout/ChangeColor.vue";
import FixedMenu from "@/components/common/FixedMenu.vue";
import {onMounted, ref, watchEffect} from "vue";
import {Snow} from "jparticles";
import {sakura} from "@/utils/sakura.ts";

const layoutStore = useLayoutStore()
const sa: string = sakura()

watchEffect(()=>{
  if (layoutStore.state.isSnowShow) {
    new Snow('#snow', {
      num: 1,
      maxR: 8,
      minR: 10,
      maxSpeed: 0.2,
      minSpeed: 0.1,
      swing: true,
      swingProbability: 1,
      spin: true,
    })
  }
})
onMounted(()=>{
  if (layoutStore.state.isSnowShow) {
    new Snow('#snow', {
      num: 1,
      maxR: 8,
      minR: 10,
      maxSpeed: 0.2,
      minSpeed: 0.1,
      swing: true,
      swingProbability: 1,
      spin: true
    })
  }
})
</script>


<template>
  <FixedMenu/>
  <div class="snow" v-show="layoutStore.state.isSnowShow"
       style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none"
       id="snow"></div>
  <RouterView/>
</template>

<style scoped lang="scss">

</style>
