<script setup lang="ts">
import {ref, watch} from "vue";
import {type Email, getEmail, updateEmail} from "@/api/config";
import {ElMessage} from "element-plus"

const emailInfo = ref<Email>({
  host: '',
  port: 0,
  from: '',
  nickname: '',
  secret: '',
  is_ssl: false,
})

const getEmailInfo = async () => {
  const res = await getEmail()
  if (res.code === 0) {
    emailInfo.value = res.data
  }
}

getEmailInfo()

const shouldRefreshInfo = ref(false)
watch(() => shouldRefreshInfo.value, (newVal) => {
  if (newVal) {
    getEmailInfo()
    shouldRefreshInfo.value = false
  }
})

const updateEmailInfo = async () => {
  const res = await updateEmail(emailInfo.value)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    shouldRefreshInfo.value = true
  }
}
</script>

<template>
  <div class="email-config">
    <div class="email-item">
      <div>服务器地址</div>
      <div><input type="text" @change="updateEmailInfo" v-model="emailInfo.host"/></div>
    </div>
    <div class="email-item">
      <div>服务器端口</div>
      <div><input type="text" @change="updateEmailInfo" v-model="emailInfo.port"/></div>
    </div>
    <div class="email-item">
      <div>发件人邮箱</div>
      <div><input type="text" @change="updateEmailInfo" v-model="emailInfo.from"/></div>
    </div>
    <div class="email-item">
      <div>发件人昵称</div>
      <div><input type="text" @change="updateEmailInfo" v-model="emailInfo.nickname"/></div>
    </div>
    <div class="email-item">
      <div>邮箱密钥</div>
      <div><input type="text" @change="updateEmailInfo" v-model="emailInfo.secret"/></div>
    </div>
    <div class="email-item">
      <div>使用SSL</div>
      <div>
        <el-switch size="large" class="switch" @click="updateEmailInfo" v-model="emailInfo.is_ssl"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.email-config {
  padding: 20px;
  margin: 10px 0;
  font-weight: bold;
  color: var(--main-color);
  font-size: 1.5rem;

  .email-item {
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