import {computed, ref, watch} from "vue";
import {login, type LoginRequest, logout, register, type RegisterRequest, type User, userInfo} from "@/api/user.ts";
import {defineStore} from "pinia";
import router from "@/router";

function initState() {
    const userInfo = ref<User>({
        id: 0,
        created_at: new Date(),
        updated_at: new Date(),
        uid: "",
        username: "",
        email: "",
        openid: "",
        avatar: "",
        address: "",
        signature: "",
        role_id: 0,
        register: "",
        freeze: false
    })
    const savedIsUserLoggedInBefore = localStorage.getItem('isUserLoggedInBefore')
    return {
        userInfo,
        accessToken: '',
        userInfoInitialized: false,
        isUserLoggedInBefore: savedIsUserLoggedInBefore === 'true'
    }
}

export const useUserStore = defineStore('user', () => {
    const state = ref(initState())

    // 重置信息
    const reset = () => {
        state.value.userInfo = {
            id: 0,
            created_at: new Date(),
            updated_at: new Date(),
            uid: "",
            username: "",
            email: "",
            openid: "",
            avatar: "",
            address: "",
            signature: "",
            role_id: 0,
            register: "",
            freeze: false
        }
        state.value.accessToken = ''
        state.value.userInfoInitialized = false
        state.value.isUserLoggedInBefore = false
    }

    /* 登录*/
    const loginIn = async (loginInfo: LoginRequest) => {
        const res = await login(loginInfo)
        if (res.code === 0) {
            state.value.userInfo = res.data.user
            state.value.accessToken = res.data.access_token
            state.value.isUserLoggedInBefore = true
            return true
        } else {
            return false
        }
    }

    /* 注册*/
    const registerIn = async (registerInfo: RegisterRequest) => {
        const res = await register(registerInfo)
        if (res.code === 0) {
            state.value.userInfo = res.data.user
            state.value.accessToken = res.data.access_token
            state.value.isUserLoggedInBefore = true
            return true
        } else {
            return false
        }
    }

    /* 登出*/
    const loginOut = async () => {
        await logout()
        const userStore = useUserStore()
        userStore.reset()
        localStorage.clear()
        await router.push('/')
    }

    // 初始化个人资历
    const initializeUserInfo = async () => {
        if (state.value.isUserLoggedInBefore && !state.value.userInfoInitialized) {
            const res = await userInfo()
            if (res.code === 0) {
                state.value.userInfo = res.data
            }
        }
        state.value.userInfoInitialized = true
    }

    // 添加验证方法：验证是否已登录
    const isLoggedIn = computed(() => {
        return state.value.userInfo.role_id !== 0
    })

    // 添加验证方法：验证是否是管理员
    const isAdmin = computed(() => {
        return state.value.userInfo.role_id === 2
    })

    watch(() => state.value.isUserLoggedInBefore, (newIsUserLoggedInBefore) => {
        localStorage.setItem('isUserLoggedInBefore', String(newIsUserLoggedInBefore))
    })

    return {
        state,
        reset,
        loginIn,
        registerIn,
        loginOut,
        initializeUserInfo,
        isLoggedIn,
        isAdmin
    }
})