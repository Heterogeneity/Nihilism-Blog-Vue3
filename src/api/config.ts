import Axios, {type ApiResponse} from "@/utils/axios.ts";

export interface Website {
    logo: string;
    full_logo: string;
    title: string;
    slogan: string;
    slogan_en: string;
    description: string;
    version: string;
    created_at: string;
    icp_filing: string;
    public_security_filing: string;
    bilibili_url: string;
    gitee_url: string;
    github_url: string;
    name: string;
    job: string;
    address: string;
    email: string;
    qq_image: string;
    wechat_image: string;
    skill:string;
}

export interface System {
    use_multipoint: boolean;
    sessions_secret: string;
    oss_type: string;
}

export interface Email {
    host: string;
    port: number;
    from: string;
    nickname: string;
    secret: string;
    is_ssl: boolean;
}

export interface QQ {
    enable: boolean;
    app_id: string;
    app_key: string;
    redirect_uri: string;
}

export interface Qiniu {
    zone: string;
    bucket: string;
    img_path: string;
    access_key: string;
    secret_key: string;
    use_https: boolean;
    use_cdn_domains: boolean;
}

export interface Jwt {
    access_token_secret: string;
    refresh_token_secret: string;
    access_token_expiry_time: string;
    refresh_token_expiry_time: string;
    issuer: string;
}

export interface Gaode {
    enable: boolean;
    key: string;
}

export const getWebsite = (): Promise<ApiResponse<Website>> => {
    return Axios.get('/config/website')
}

export const updateWebsite = (data: Website): Promise<ApiResponse<any>> => {
    return Axios.put('/config/website', data)
}

export const getSystem = (): Promise<ApiResponse<System>> => {
    return Axios.get('/config/system')
}

export const updateSystem = (data: System): Promise<ApiResponse<any>> => {
    return Axios.put('/config/system', data)
}

export const getEmail = (): Promise<ApiResponse<Email>> => {
    return Axios.get('/config/email')
}

export const updateEmail = (data: Email): Promise<ApiResponse<any>> => {
    return Axios.put('/config/email', data)
}

export const getQQ = (): Promise<ApiResponse<QQ>> => {
    return Axios.get('config/qq')
}

export const updateQQ = (data: QQ): Promise<ApiResponse<any>> => {
    return Axios.put('/config/qq', data)
}

export const getQiniu = (): Promise<ApiResponse<Qiniu>> => {
    return Axios.get('/config/qiniu')
}

export const updateQiniu = (data: Qiniu): Promise<ApiResponse<any>> => {
    return Axios.put('/config/qiniu', data)
}

export const getJwt = (): Promise<ApiResponse<Jwt>> => {
    return Axios.get('/config/jwt')
}

export const updateJwt = (data: Jwt): Promise<ApiResponse<any>> => {
    return Axios.put('/config/jwt', data)
}

export const getGaode = (): Promise<ApiResponse<Gaode>> => {
    return Axios.get('/config/gaode')
}

export const updateGaode = (data: Gaode): Promise<ApiResponse<any>> => {
    return Axios.put('/config/gaode', data)
}