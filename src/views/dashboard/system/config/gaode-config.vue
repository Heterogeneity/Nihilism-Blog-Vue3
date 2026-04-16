<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {type Gaode, getGaode, updateGaode} from "@/api/config.ts";
import {ElMessage} from "element-plus";

const gaodeInfo = ref<Gaode>({
  enable: false,
  key: ""
})

const shouldRefreshInfo = ref<boolean>(false)

const getGaodeInfo = async () => {
  const res = await getGaode()
  if (res.code === 0) {
    gaodeInfo.value = res.data
  }
}
const updateGaodeInfo = async () => {
  const res = await updateGaode(gaodeInfo.value)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    shouldRefreshInfo.value = true
  }
}

watch(() => shouldRefreshInfo.value, (newVal) => {
  if (newVal) {
    getGaodeInfo()
    shouldRefreshInfo.value = false
  }
})
onMounted(() => {
  getGaodeInfo()
})
</script>

<template>
  <div class="gaode-config">
    <div class="gaode-item">
      <div class="gaode-title">是否开启</div>
      <el-switch class="switch" size="large" v-model="gaodeInfo.enable" @click="updateGaodeInfo"/>
    </div>
    <div class="gaode-item">
      <div class="gaode-title">高德密钥</div>
      <input type="text" v-model="gaodeInfo.key" @change="updateGaodeInfo"/>
    </div>
  </div>
</template>

<style scoped>
.gaode-config {
  padding: 20px;
  margin: 10px 0;
  font-weight: bold;
  color: var(--main-color);
  font-size: 1.5rem;

  .gaode-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 10px;

    .switch {
      margin-left: 20px;
    }

    input {
      width: 500px;
      font-weight: bold;
      font-family: 'YSHST', fangsong;
      color: var(--default-color);
      outline: none;
      border: none;
      padding: 10px 5px;
      font-size: 1.3rem;
      border-radius: 10px;
      background-color: var(--bc-color);

      &:focus {
        box-shadow: 0 0 10px var(--main-color);
      }
    }
  }
}
</style>