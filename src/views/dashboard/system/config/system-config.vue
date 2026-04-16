<template>
  <div class="system-config">
    <div class="system-item">
      <div>多地点登录拦截</div>
      <el-switch size="large" class="switch" v-model="systemInfo.use_multipoint" @click="updateSystemInfo"/>
    </div>
    <div class="system-item">
      <div>会话密钥</div>
      <input @change="updateSystemInfo" v-model="systemInfo.sessions_secret" type="text"/>
    </div>
    <div class="system-item">
      <div>图片存储类型</div>
      <el-select
          style="margin-left: 20px;width: 100px;background-color: var(--default-bc)"
          size="large"
          @change="updateSystemInfo"
          v-model="systemInfo.oss_type"
          placeholder="Select"
      >
        <el-option
            style="color: var(--main-color);background-color: var(--default-bc)"
            v-for="item in ossTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {type System, getSystem, updateSystem} from "@/api/config";
import {ElMessage} from "element-plus"

const systemInfo = ref<System>({
  use_multipoint: false,
  sessions_secret: '',
  oss_type: '',
})

const ossTypeOptions = [
  {
    value: 'local',
    label: '本地',
  },
  {
    value: 'qiniu',
    label: '七牛',
  },
]

const getSystemInfo = async () => {
  const res = await getSystem()
  if (res.code === 0) {
    systemInfo.value = res.data
  }
}

const shouldRefreshInfo = ref(false)
watch(() => shouldRefreshInfo.value, (newVal) => {
  if (newVal) {
    getSystemInfo()
    shouldRefreshInfo.value = false
  }
})

const updateSystemInfo = async () => {
  const res = await updateSystem(systemInfo.value)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    shouldRefreshInfo.value = true
  }
}

onMounted(() => {
  getSystemInfo()
})
</script>

<style scoped lang="scss">
.system-config {
  padding: 20px;
  margin: 10px 0;
  font-weight: bold;
  color: var(--main-color);
  font-size: 1.5rem;

  .system-item {
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
