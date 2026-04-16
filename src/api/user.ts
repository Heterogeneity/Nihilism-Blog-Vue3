import type {Model, PageInfo, PageResult} from "@/api/common.ts";
import Axios, {type ApiResponse} from "@/utils/axios.ts";
import type {Api} from "@vitejs/plugin-vue";

export interface User extends Model {
    uid: string;
    username: string;
    email: string;
    openid: string;
    avatar: string;
    address: string;
    signature: string;
    role_id: number;
    register: string;
    freeze: boolean;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    verification_code: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    captcha: string;
    captcha_id: string;
}

export interface LoginResponse {
    user: User;
    access_token: string;
    access_token_expires_at: number;
}

export interface ForgotPasswordRequest {
    email: string;
    verification_code: string;
    new_password: string;
}

export interface UserCardRequest {
    uid: string;
}

export interface UserCardResponse {
    uid: string;
    username: string;
    avatar: string;
    address: string;
    signature: string;
}

export interface UserResetPasswordRequest {
    password: string;
    new_password: string;
}

export interface UserChangeInfoRequest {
    username: string;
    address: string;
    signature: string;
}

export interface UserChartRequest {
    date: number
}

export interface UserChartResponse {
    date_list: string[];
    login_data: number[];
    register_data: number[];
}

export interface UserListRequest extends PageInfo {
    uid: string | null;
    register: string | null;
}

export interface UserOperation {
    id: number;
}

export interface UserLoginListRequest extends PageInfo {
    uid: string | null;
}

export interface Login extends Model {
    user_id: string;
    user: User;
    login_method: string;
    ip: string;
    address: string;
    os: string;
    device_info: string;
    browser_info: string;
    status: string;
}

export const register = (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
    return Axios.post('/user/register', data)
}

export const login = (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return Axios.post('/user/login', data)
}

export const forgotPassword = (data: ForgotPasswordRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/user/forgetPassword', data)
}

export const userCard = (data: UserCardRequest): Promise<ApiResponse<UserCardResponse>> => {
    return Axios.get('/user/card', {params: data})
}

export const logout = (): Promise<ApiResponse<any>> => {
    return Axios.post('/user/logout')
}

export const userResetPassword = (data: UserResetPasswordRequest): Promise<ApiResponse<UserResetPasswordRequest>> => {
    return Axios.put('/user/resetPassword', data)
}

export const userInfo = (): Promise<ApiResponse<User>> => {
    return Axios.get('/user/info')
}


export const userChangeInfo = (data: UserChangeInfoRequest): Promise<ApiResponse<User>> => {
    return Axios.put('/user/changeInfo', data)
}

export const userWeather = (): Promise<ApiResponse<string>> => {
    return Axios.get('/user/weather')
}

export const userChart = (data: UserChartRequest): Promise<ApiResponse<UserChartResponse>> => {
    return Axios.get('/user/chart', {params: data})
}

export const userList = (data: UserListRequest): Promise<ApiResponse<PageResult<User>>> => {
    return Axios.get('/user/list', {params: data})
}
export const userFreeze = (data: UserOperation): Promise<ApiResponse<any>> => {
    return Axios.put('/user/freeze', data)
}
export const userUnFreeze = (data: UserOperation): Promise<ApiResponse<any>> => {
    return Axios.put('/user/unfreeze', data)
}
export const getLoginList = (data: UserLoginListRequest): Promise<ApiResponse<PageResult<Login>>> => {
    return Axios.get('/user/loginList', {params: data})
}