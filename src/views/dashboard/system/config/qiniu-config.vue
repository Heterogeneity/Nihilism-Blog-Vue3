<template>
  <div class="qiniu-config">
    <div class="qiniu-item">
      <div>存储区域</div>
      <input @change="updateQiniuInfo" v-model="qiniuInfo.zone"/>
    </div>
    <div class="qiniu-item">
      <div>空间名称</div>
      <input @change="updateQiniuInfo" v-model.number="qiniuInfo.bucket"/>
    </div>
    <div class="qiniu-item">
      <div>密钥 AK</div>
      <input @change="updateQiniuInfo" v-model="qiniuInfo.access_key" type="text" />
    </div>
    <div class="qiniu-item">
      <div>密钥 SK</div>
      <input @change="updateQiniuInfo" v-model="qiniuInfo.secret_key" type="text"/>
    </div>
    <div class="qiniu-item">
      <div>CDN加速域名</div>
      <input @change="updateQiniuInfo" v-model="qiniuInfo.img_path"/>
    </div>
    <div class="qiniu-item">
      <div>使用CDN上传加速</div>
      <el-switch size="large" class="switch" v-model="qiniuInfo.use_cdn_domains" @click="updateQiniuInfo"/>
    </div>
    <div class="qiniu-item">
      <div>使用Https</div>
      <el-switch size="large" class="switch" v-model="qiniuInfo.use_https" @click="updateQiniuInfo"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {type Qiniu, getQiniu, updateQiniu} from "@/api/config";
import {ElMessage} from "element-plus";

const qiniuInfo = ref<Qiniu>({
  zone: '',
  bucket: '',
  img_path: '',
  access_key: '',
  secret_key: '',
  use_https: false,
  use_cdn_domains: false,
})

const getQiniuInfo = async () => {
  const res = await getQiniu()
  if (res.code === 0) {
    qiniuInfo.value = res.data
  }
}

getQiniuInfo()

const shouldRefreshInfo = ref(false)
watch(() => shouldRefreshInfo.value, (newVal) => {
  if (newVal) {
    getQiniuInfo()
    shouldRefreshInfo.value = false
  }
})

const updateQiniuInfo = async () => {
  const res = await updateQiniu(qiniuInfo.value)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    shouldRefreshInfo.value = true
  }
}
</script>

<style scoped lang="scss">
.qiniu-config {
  padding: 20px;
  margin: 10px 0;
  font-weight: bold;
  color: var(--main-color);
  font-size: 1.5rem;

  .qiniu-item {
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
