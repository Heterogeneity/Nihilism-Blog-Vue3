<template>
  <div class="jwt-config">
    <div class="jwt-item">
      <div>访问令牌密钥</div>
      <input @change="updateJwtInfo" v-model="jwtInfo.access_token_secret" type="text"/>
    </div>
    <div class="jwt-item">
      <div>访问令牌过期时间</div>
      <input @change="updateJwtInfo" v-model="jwtInfo.access_token_expiry_time" type="text"/>
    </div>
    <div class="jwt-item">
      <div>刷新令牌密钥</div>
      <input @change="updateJwtInfo" v-model.number="jwtInfo.refresh_token_secret" type="text"/>
    </div>
    <div class="jwt-item">
      <div>刷新令牌过期时间</div>
      <input @change="updateJwtInfo" v-model="jwtInfo.refresh_token_expiry_time" type="text"/>
    </div>
    <div class="jwt-item">
      <div>签发者</div>
      <input @change="updateJwtInfo" v-model="jwtInfo.issuer" type="text"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {type Jwt, getJwt, updateJwt} from "@/api/config";
import {ElMessage} from "element-plus";

const jwtInfo = ref<Jwt>({
  access_token_secret: '',
  refresh_token_secret: '',
  access_token_expiry_time: '',
  refresh_token_expiry_time: '',
  issuer: '',
})

const getJwtInfo = async () => {
  const res = await getJwt()
  if (res.code === 0) {
    jwtInfo.value = res.data
  }
}

getJwtInfo()

const shouldRefreshInfo = ref(false)
watch(() => shouldRefreshInfo.value, (newVal) => {
  if (newVal) {
    getJwtInfo()
    shouldRefreshInfo.value = false
  }
})

const updateJwtInfo = async () => {
  const res = await updateJwt(jwtInfo.value)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    shouldRefreshInfo.value = true
  }
}
</script>

<style scoped lang="scss">
.jwt-config {
  padding: 20px;
  margin: 10px 0;
  font-weight: bold;
  color: var(--main-color);
  font-size: 1.5rem;

  .jwt-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 10px;

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
