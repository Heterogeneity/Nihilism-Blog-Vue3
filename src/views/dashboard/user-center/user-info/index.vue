<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import {computed, reactive, ref} from "vue";
import {ElMessage, type FormInstance} from "element-plus";
import {userChangeInfo, type UserChangeInfoRequest} from "@/api/user.ts";
import UserCard from "@/components/dashboard/UserCard.vue";
import ChangePassword from "@/components/dashboard/ChangePassword.vue";
import Title from "@/components/common/Title.vue";

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const userInfo = ref(userStore.state.userInfo)
const userChangeInfoForm = ref<FormInstance>()
const userChangeInfoData = reactive<UserChangeInfoRequest>({
  username: userInfo.value.username,
  address: userInfo.value.address,
  signature: userInfo.value.signature
})
const passwordResetVisible = computed(() => layoutStore.state.passwordResetVisible)

const passwordResetVisibleSynchronization = () => {
  layoutStore.state.passwordResetVisible = false
}
const cardKey = ref(0)
const updateUserInfo = async () => {
  const res = await userChangeInfo(userChangeInfoData)
  if (res.code === 0) {
    ElMessage.success(res.msg)
    cardKey.value += 1
  } else {
    ElMessage.error(res.msg)
  }
}
</script>

<template>
  <div class="user-info">
    <Title title="用户信息"/>
    <div class="user-info-main">
      <div class="content">
        <div class="content-item">
          <img class="card-avatar" :src="userInfo.avatar" alt="">
          <button v-show="userInfo.register==='邮箱'" class="user-info-button"
                  @click="layoutStore.state.passwordResetVisible=true">修改密码
          </button>
        </div>
        <div class="content-item">
          <span>UID:</span>
          <p>{{ userInfo.uid }}</p>
        </div>
        <div class="content-item">
          <span>Email:</span>
          <p>{{ userInfo.email }}</p>
        </div>
        <div class="content-item">
          <span>角色:</span>
          <p>{{ userInfo.role_id === 1 ? "用户" : "管理员" }}</p>
        </div>
        <div class="content-item">
          <span>注册途径:</span>
          <p>{{ userInfo.register }}</p>
        </div>
        <div class="content-item">
          <span>用户名:</span>
          <input @change="updateUserInfo" v-model="userChangeInfoData.username" type="text">
        </div>
        <div class="content-item">
          <span>地址:</span>
          <input @change="updateUserInfo" v-model="userChangeInfoData.address" type="text">
        </div>
        <div class="content-item">
          <span>签名:</span>
          <input style="width: 300px;" @change="updateUserInfo" v-model="userChangeInfoData.signature" type="text">
        </div>
      </div>
      <user-card :key="cardKey" :user-card-info="null" :uid="userInfo.uid"/>
      <el-dialog
          center
          class="user-reset"
          v-model="passwordResetVisible"
          width="500"
          :align-center="true"
          destroy-on-close
          :before-close="passwordResetVisibleSynchronization"
      >
        <template #header>
          修改密码
        </template>
        <change-password/>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-info {
  padding: 20px;

  .user-info-main {
    margin-top: 20px;
    display: flex;
    justify-content: center;

  }

  :deep(.user-reset) {
    background-color: var(--default-bc);
    border-radius: 10px;
    color: var(--main-color);
    font-size: 1.3rem;
    font-weight: bold;
    div{
      color: var(--main-color);
    }
  }

  .title {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
    color: var(--default-color);
  }

  .card-avatar {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    box-shadow: 0 0 10px var(--main-color);
  }

  .user-info-button {
    font-family: 'YSHST', fangsong;
    margin-left: 20px;
    border-radius: 20px;
    height: 50px;
    width: 200px;
    cursor: pointer;
    border: none;
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--default-bc);
    background-color: var(--main-color);
    transition: all .5s ease-in-out;

    &:hover {
      box-shadow: 0 0 10px var(--main-color);

    }
  }

  .content {
    width: 50%;

    .content-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      p {
        color: var(--default-color);
        font-weight: bold;
        font-size: 1.4rem;
        line-height: .1rem;
      }

      input {
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

    span {
      width: 120px;
      font-weight: bold;
      font-size: 1.5rem;
      padding-right: 10px;
      color: var(--text-color);
    }
  }
}
</style>