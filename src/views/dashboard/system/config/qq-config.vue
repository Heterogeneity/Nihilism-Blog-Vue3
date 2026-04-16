<template>
  <div class="qq-config">
    <div class="qq-item">
      <div class="qq-title">启用QQ登录</div>
      <el-switch class="switch" size="large" v-model="qqInfo.enable" @click="updateQQInfo"/>
    </div>
    <div class="qq-item">
      <div>应用ID</div>
      <input type="text" @change="updateQQInfo" v-model="qqInfo.app_id"/>
    </div>
    <div class="qq-item">
      <div>应用密钥</div>
      <input type="text" @change="updateQQInfo" v-model="qqInfo.app_key"/>
    </div>
    <div class="qq-item">
      <div>网站回调域</div>
      <input type="text" @change="updateQQInfo" v-model="qqInfo.redirect_uri"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {getQQ, type QQ, updateQQ} from "@/api/config";
import {ElMessage} from "element-plus";

const qqInfo = ref<QQ>({
  enable: false,
  app_id: '',
  app_key: '',
  redirect_uri: '',
})

const getQQInfo = async () => {
  const res = await getQQ()
  if (res.code === 0) {
    qqInfo.value = res.data
  }
}

getQQInfo()

const shouldRefreshInfo = ref(false)
watch(() => shouldRefreshInfo.value, (newVal) => {
  if (newVal) {
    getQQInfo()
    shouldRefreshInfo.value = false
  }
})

const updateQQInfo = async () => {
  const res = await updateQQ(qqInfo.value)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    shouldRefreshInfo.value = true
  }
}
</script>

<style scoped lang="scss">
.qq-config {
  padding: 20px;
  margin: 10px 0;
  font-weight: bold;
  color: var(--main-color);
  font-size: 1.5rem;

  .qq-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 10px;

    .switch {
      margin-left: 20px;
    }

    input {
      margin-left: 20px;
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
