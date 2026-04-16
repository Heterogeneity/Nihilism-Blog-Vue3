import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {LoginRequest, RegisterRequest} from "@/api/user.ts";
import {register} from "@/api/user.ts";
import {ElMessage, ElMessageBox} from "element-plus";

export const useRegisterStore = defineStore("register", () => {
    const registerFormData = reactive<RegisterRequest>({
        email: "",
        password: "",
        username: "",
        verification_code: "",
    })

    // registerData 注册
    const registerData = async () => {
        if (registerFormData.email === '') {
            ElMessage.error("请填写好邮箱！")
            return
        }
        if (registerFormData.password === '') {
            ElMessage.error("请填写好密码！")
            return
        }
        if (registerFormData.username === '') {
            ElMessage.error("请填写好用户名！")
            return
        }
        if (registerFormData.verification_code === '') {
            ElMessage.error("请填写好邮箱验证码！")
            return
        }
        const req: RegisterRequest = {
            email: registerFormData.email,
            password: registerFormData.password,
            username: registerFormData.username,
            verification_code: registerFormData.verification_code,
        }
        const res = await register(req)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            Object.assign(registerFormData, {
                email: "",
                password: "",
                username: "",
                verification_code: "",
            })
        } else {
            ElMessage.error(res.msg)
        }
    }

    return {
        registerFormData,
        registerData,
    }
})