import service, {type ApiResponse} from "@/utils/axios.ts";

export interface CaptchaResponse {
    captcha_id: string;
    pic_path: string;
}

export const captcha = (): Promise<ApiResponse<CaptchaResponse>> => {
    return service.post('/base/captcha')
}

export interface EmailRequest {
    email: string;
    captcha: string;
    captcha_id: string;
}

export const sendEmailVerificationCode = (data: EmailRequest): Promise<ApiResponse<any>> => {
    return service.post('/base/send_email_code', data)
}

export const qqLoginURL = (): Promise<ApiResponse<string>> => {
    return service.get('/base/QQ_login')
}