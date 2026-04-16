<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import {useRoute} from "vue-router";
import {computed, onMounted, reactive, ref, watch} from "vue";
import router from "@/router";
import {useLayoutStore} from "@/stores/layout.ts";
import {useRegisterStore} from "@/stores/register.ts";
import {captcha, type EmailRequest, qqLoginURL, sendEmailVerificationCode} from "@/api/base.ts";
import {forgotPassword, type ForgotPasswordRequest, type LoginRequest} from "@/api/user.ts";
import {ElMessage} from "element-plus";
import Button from "@/components/common/Button.vue";
import {Close} from "@element-plus/icons-vue";
import {useForgetPasswordStore} from "@/stores/forget-password.ts";

const route = useRoute()
const userStore = useUserStore()
const register = useRegisterStore()
const forget = useForgetPasswordStore()
const layoutStore = useLayoutStore()
const isInDashboard = route.matched.some(record => record.name === 'dashboard')
const label = isInDashboard ? '返回首页' : '进入后台'
const popoverVisible = ref(layoutStore.state.popoverVisible)
const mainPanel = ref(layoutStore.state.mainPanel)
const captchaPath = ref("")
const captchaCode = ref('')
const captcha_id = ref('')

const loginFormData = reactive<LoginRequest>({
  email: "",
  password: "",
  captcha: "",
  captcha_id: "",
})

const sendCode = async () => {
  if (forget.forgetPasswordForm.email === '' && register.registerFormData.email === '') {
    ElMessage.error("请填写好邮箱！")
    return
  }
  if (captchaCode.value === '') {
    ElMessage.error("请填写好验证码！")
    return
  }
  const req: EmailRequest = {
    email: forget.forgetPasswordForm.email || register.registerFormData.email,
    captcha: captchaCode.value,
    captcha_id: captcha_id.value
  }
  const res = await sendEmailVerificationCode(req)
  if (res.code === 0) {
    ElMessage.success(res.msg)
  } else {
    ElMessage.error(res.msg)
  }
}

const goIndexOrToDashboard = (() => {
  if (isInDashboard) {
    router.push({name: 'index'})
  } else {
    router.push({name: 'home'})
  }
  layoutStore.state.popoverVisible = false
})

const qqLogin = async () => {
  const res = await qqLoginURL()
  if (res.code === 0) {
    window.location.href = res.data
  }
}

const getCaptcha = async () => {
  captcha().then(async (res: any) => {
    captchaPath.value = res.data.pic_path
    captcha_id.value = res.data.captcha_id
  })
}

const loginOut = async () => {
  await userStore.loginOut()
  ElMessage({message: "退出成功！", type: "success", duration: 2000})
  changePanel('main')
  await getCaptcha()
}

const login = async () => {
  loginFormData.captcha_id = captcha_id.value
  if (Object.values(loginFormData).some((item) => item === '')) {
    ElMessage({message: "登录字段缺失！请填写完整！", type: "error", duration: 2000})
    return
  }
  const flag = await userStore.loginIn(loginFormData)
  if (flag) {
    Object.assign(loginFormData, {
      email: "",
      password: "",
      captcha: "",
      captcha_id: ""
    })
    ElMessage({message: "登录成功！", type: "success", duration: 2000})
    changePanel('个人中心')
  } else {
    ElMessage({message: "登录失败！", type: "error", duration: 2000})
  }
  await getCaptcha()
}

const changePanel = (type: string) => {
  layoutStore.state.mainPanel = type
}

watch(() => layoutStore.state.mainPanel, (newValue) => {
  mainPanel.value = newValue
})
watch(() => layoutStore.state.popoverVisible, (newValue) => {
  popoverVisible.value = newValue
})

onMounted(() => {
  getCaptcha()
})
</script>

<template>
  <div class="auth-popover">
    <!-- 相对定位容器，作为下拉面板的定位基准 -->
    <div class="relative-wrapper">
      <div style="display: flex;align-items: center;">
        <div class="user-avatar"
             @mouseleave="layoutStore.state.popoverVisible = false"
             @mousemove="layoutStore.state.popoverVisible = true">
          <img class="user"
               :src="userStore.state.userInfo.avatar!==''?userStore.state.userInfo.avatar:'/images/login.png'"
               alt=""/>
        </div>
      </div>

      <Transition name="fade">
        <div class="dropdown-panel"
             v-show="popoverVisible"
             @mousemove="layoutStore.state.popoverVisible = true">
          <div v-if="mainPanel === 'main'">
            <div class="header">
              <span>请登录以获取完整的功能体验。 </span>
              <div class="back" @click.prevent="layoutStore.state.popoverVisible = false">
                <el-icon>
                  <Close/>
                </el-icon>
              </div>
            </div>
            <div class="auth-button">
              <button type="button" class="to-button" @click="changePanel('登录')">登录</button>
              <button type="button" class="to-button" @click="changePanel('注册')">注册</button>
              <button type="button" class="to-button" @click="changePanel('找回密码')">找回密码</button>
              <button type="button" class="to-button" @click="qqLogin">QQ登录</button>
            </div>
          </div>
          <div class="other-panel" v-else>
            <div class="other-header">
              <div v-show="mainPanel!=='个人中心'" @click="changePanel('main')">
                <svg t="1773507511221" class="icon back" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="3227" width="128" height="128">
                  <path
                      d="M381.44 225.28L138.24 476.672c-18.944 19.456-18.944 51.2 0 71.168l243.2 250.88a47.616 47.616 0 0 0 68.608 0c18.944-19.456 18.944-51.2 0-71.168l-160.256-165.376h561.152c27.136 0 48.64-22.528 48.64-50.176s-22.016-50.176-48.64-50.176H290.304L450.56 296.448c9.728-9.728 14.336-22.528 14.336-35.328s-4.608-25.6-14.336-35.328c-18.944-19.968-49.664-19.968-69.12-0.512z"
                      fill="#ffffff" p-id="3228"></path>
                </svg>
              </div>
              <div style="width: 400px;text-align: center;font-size: 1.3rem;">
                {{ mainPanel !== '个人中心' ? mainPanel : `欢迎回来，` + userStore.state.userInfo.username + `!` }}
              </div>
              <div class="back" @click="layoutStore.state.popoverVisible = false">
                <el-icon>
                  <Close/>
                </el-icon>
              </div>
            </div>
            <div class="personal-center" v-show="mainPanel === '个人中心'">
              <div class="uid">UID:{{ userStore.state.userInfo.uid }}</div>
              <div>地址:{{ userStore.state.userInfo.address }}</div>
              <div>个性签名:{{ userStore.state.userInfo.signature }}</div>
              <div class="auth-button">
                <button class="to-button" @click="goIndexOrToDashboard">{{ label }}</button>
                <button class="to-button" @click="loginOut">退出登录</button>
              </div>
            </div>
            <div class="login-box" v-show="mainPanel === '登录'">
              <div class="input-item">
                <span>邮箱:</span>
                <input v-model="loginFormData.email" type="email" name="邮箱" placeholder="邮箱"/>
              </div>
              <div class="input-item">
                <span>密码:</span>
                <input v-model="loginFormData.password" type="password" placeholder="密码"/>
              </div>
              <div class="input-item">
                <span>验证码:</span>
                <input v-model="loginFormData.captcha" class="captcha" type="text" placeholder="验证码"/>
                <img @click="getCaptcha" class="captcha-img" :src="captchaPath" alt=""/>
              </div>
              <button type="submit" @click="login" class="type-button" title="">登录</button>
              <div class="login-bottom">
                <a href="#" @click="changePanel('注册')">去注册</a>
                <span>|</span>
                <a href="#" @click="changePanel('找回密码')">忘记密码？</a>
              </div>
            </div>

            <div class="login-box" v-show="mainPanel === '注册'">
              <div class="input-item">
                <span>用户名:</span>
                <input v-model="register.registerFormData.username" type="text" name="用户名" placeholder="用户名"/>
              </div>
              <div class="input-item">
                <span>密码:</span>
                <input v-model="register.registerFormData.password" type="password" placeholder="密码"/>
              </div>
              <div class="input-item">
                <span>邮箱:</span>
                <input v-model="register.registerFormData.email" type="email" name="邮箱" placeholder="邮箱"/>
              </div>
              <div class="input-item">
                <span style="font-size: .9rem">邮箱验证码:</span>
                <input v-model="register.registerFormData.verification_code" type="text" name="邮箱验证码"
                       placeholder="邮箱验证码"/>
              </div>
              <div class="input-item">
                <span>验证码:</span>
                <input v-model="captchaCode" class="captcha" type="text" placeholder="验证码"/>
                <img @click="getCaptcha" class="captcha-img" :src="captchaPath" alt=""/>
              </div>
              <div style="display: flex;justify-content: center;align-items: center;">
                <Button title="注册" @to-click="register.registerData;getCaptcha()">
                </Button>
                <Button title="发送邮箱验证码" @to-click="sendCode">
                </Button>
              </div>
            </div>

            <div class="login-box" v-show="mainPanel === '找回密码'">
              <div class="input-item">
                <span>邮箱:</span>
                <input v-model="forget.forgetPasswordForm.email" type="email" name="邮箱" placeholder="邮箱"/>
              </div>
              <div class="input-item">
                <span>验证码:</span>
                <input v-model="captchaCode" class="captcha" type="text" placeholder="验证码"/>
                <img @click="getCaptcha" class="captcha-img" :src="captchaPath" alt=""/>
              </div>
              <div class="input-item">
                <span style="font-size: .9rem">邮箱验证码:</span>
                <input v-model="forget.forgetPasswordForm.verification_code" type="text"
                       placeholder="邮箱验证码"/>
              </div>
              <div class="input-item">
                <span>新密码:</span>
                <input v-model="forget.forgetPasswordForm.new_password" type="password" placeholder="密码"/>
              </div>
              <div class="input-item">
                <span>确认密码:</span>
                <input v-model="forget.twice_password" type="password" placeholder="确认密码"/>
              </div>
              <div style="display: flex;justify-content: center;align-items: center;">
                <Button title="确认修改" @to-click="forget.resetPassword;getCaptcha()"></Button>
                <Button title="发送邮箱验证码" @to-click="sendCode"></Button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-popover {
  padding-right: 5px;
  display: inline-block;
  transition: all .2s ease;
}

.relative-wrapper {
  position: relative;
  display: inline-block;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.user-avatar {
  position: relative;
  display: inline-block;

  img {
    background-color: var(--main-color);
  }

  .user {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-shadow: 0 0 10px var(--main-color);

    &:hover {
      transform: scale(1.1);
    }
  }
}

.dropdown-panel {
  position: absolute;
  top: calc(100% + 20px);
  transform: translateX(-78%);
  width: 350px;
  border-radius: 20px;
  padding: 20px;
  z-index: 1000;
  background-color: var(--bc-color);
  box-shadow: 0 0 10px var(--main-color);


  .header {
    color: var(--default-color);
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid var(--main-color);
  }

  .auth-button {
    font-family: 'YSHST', fangsong;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px 0;

    .to-button {
      font-family: 'YSHST', fangsong;
      cursor: pointer;
      font-weight: bold;
      border-radius: 10px;
      padding: 10px 0;
      color: var(--text-color);
      border: 1px solid var(--main-color);
      background-color: var(--bc-color);
      transition: all .5s ease;

      &:hover {
        background-color: var(--main-color);
        color: var(--bc-color);
      }
    }
  }

  .other-panel {
    font-weight: bold;
    color: var(--default-color);

    .personal-center {
      div {
        margin-top: 10px;
      }

    }

    .login-box {
      max-width: 350px;
      width: 100%;

      span {
        width: 20%;
      }
    }

    .login-bottom {
      font-size: .9rem;
      text-align: center;
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;

      a {
        color: var(--default-color);
        text-decoration: none;
      }
    }

    .type-button {
      font-family: 'YSHST', fangsong;
      cursor: pointer;
      background-color: var(--bc-color);
      border: 1px solid var(--main-color);
      width: 100%;
      padding: 5px;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: bold;
      color: var(--main-color);

      &:hover {
        background-color: var(--main-color);
        color: var(--bc-color);
      }
    }

    .input-item {
      display: flex;
      font-size: 1rem;
      align-items: center;
      justify-content: space-around;

      .captcha {
        width: 46%;
        margin-right: 10px;
      }

      .captcha-img {
        width: 35%;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid var(--main-color);
        background-color: var(--bc-color);
      }

      input {
        font-family: 'YSHST', fangsong;
        outline: none; /* 移除轮廓（但注意焦点可访问性，见下文） */
        width: 100%;
        font-weight: bold;
        border-radius: 5px;
        background-color: var(--bc-color);
        margin: 10px auto;
        padding: 10px;
        color: var(--default-color);
        border: 1px solid var(--main-color);

        &:focus {
          box-shadow: 0 0 10px var(--main-color);
        }
      }

      span {
        width: 30%;
      }
    }

    .other-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      border-bottom: 2px solid var(--main-color);
    }


  }

  .back {
    cursor: pointer;
    background-color: var(--main-color);
    color: var(--select-text-color);
    border-radius: 5px;
    padding: 5px;
    height: 15px;
    width: 15px;
  }
}
</style>