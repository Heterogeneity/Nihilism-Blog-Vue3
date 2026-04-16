<script setup lang="ts">
import {userCard, type UserCardResponse} from "@/api/user.ts";
import {onMounted, ref} from "vue";

const props = defineProps<{
  uid: string,
  userCardInfo: UserCardResponse | null
}>();
const userCardInfo = ref<UserCardResponse>({
  uid: "",
  username: "",
  avatar: "",
  address: "",
  signature: ""
})

const getUserCard = async () => {
  if (props.userCardInfo) {
    userCardInfo.value = props.userCardInfo
  } else {
    const userCardRequest = {
      uid: props.uid
    }
    const res = await userCard(userCardRequest)
    if (res.code === 0) {
      userCardInfo.value = res.data
      sendDataToParent(res.data)
    }
  }
}
const emit = defineEmits<{
  (event: 'userCardInfo', message: UserCardResponse): void;
}>()
const sendDataToParent = (userCardInfo: UserCardResponse) => {
  emit('userCardInfo', userCardInfo)
}

onMounted(() => {
  getUserCard()
})
</script>

<template>
  <div class="user-card">
    <div class="title">预览状态</div>
    <div class="user-card-item">
      <img class="card-avatar" :src="userCardInfo.avatar" alt="">
    </div>
    <div class="user-card-item">
      <span>UID: {{ userCardInfo.uid }}</span>
    </div>
    <div class="user-card-item">
      <span>用户名: {{ userCardInfo.username }}</span>
    </div>
    <div class="user-card-item">
      <span>地址: {{ userCardInfo.address }}</span>
    </div>
    <div class="user-card-item">
      <span>签名: {{ userCardInfo.signature }}</span>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  width: 30%;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);
  padding: 20px;
  font-weight: bold;
  color: var(--default-color);

  .title {
    font-size: 1.5rem;
  }

  .user-card-item {
    padding: 20px;

    .card-avatar {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      box-shadow: 0 0 10px var(--main-color);
    }
  }
}
</style>