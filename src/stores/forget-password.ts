import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {forgotPassword, type ForgotPasswordRequest} from "@/api/user.ts";
import {ElMessage} from "element-plus";

export const useForgetPasswordStore = defineStore("forget", () => {
    const forgetPasswordForm = reactive<ForgotPasswordRequest>({
        email: "",
        new_password: "",
        verification_code: ""
    })
    const twice_password = ref('')

    const resetPassword = async () => {
        if (forgetPasswordForm.email === '') {
            ElMessage.error("请填写好邮箱！")
            return
        }
        if (forgetPasswordForm.verification_code === '') {
            ElMessage.error("请填写好验证码！")
            return
        }
        if (forgetPasswordForm.new_password === '') {
            ElMessage.error("请填写好密码！")
            return
        }
        if (twice_password.value === '') {
            ElMessage.error("请填写好确认密码！")
            return
        }
        if (twice_password.value !== forgetPasswordForm.new_password) {
            ElMessage.error("两次密码不一致！")
            return
        }
        const req: ForgotPasswordRequest = {
            email: forgetPasswordForm.email,
            new_password: forgetPasswordForm.new_password,
            verification_code: forgetPasswordForm.verification_code
        }
        const res = await forgotPassword(req)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            Object.assign(forgetPasswordForm, {
                email: "",
                new_password: "",
                verification_code: ""
            })
        } else {
            ElMessage.error(res.msg)
        }
    }

    return {
        forgetPasswordForm,
        twice_password,
        resetPassword
    }
})