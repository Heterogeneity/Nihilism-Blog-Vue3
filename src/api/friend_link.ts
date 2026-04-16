import type {Model, PageInfo, PageResult} from "@/api/common.ts";
import Axios, {type ApiResponse} from "@/utils/axios.ts";

export interface FriendLink extends Model {
    logo: string;
    link: string;
    name: string;
    description: string;
}

export interface FriendLinkInfoResponse {
    list: FriendLink[];
    total: number;
}

export interface FriendLinkCreateRequest {
    logo: string;
    link: string;
    name: string;
    description: string;
}

export interface FriendLinkDeleteRequest {
    ids: number[];
}

export interface FriendLinkUpdateRequest {
    id: number;
    link: string;
    name: string;
    description: string;
}

export interface FriendLinkListRequest extends PageInfo {
    name: string | null;
    description: string | null;
}

export const friendLinkInfo = (): Promise<ApiResponse<FriendLinkInfoResponse>> => {
    return Axios.get('/friendLink/info')
}

export const friendLinkCreate = (data: FriendLinkCreateRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/friendLink/create', data)
}

export const friendLinkDelete = (data: FriendLinkDeleteRequest): Promise<ApiResponse<any>> => {
    return Axios.delete('/friendLink/delete', {data: data})
}

export const friendLinkUpdate = (data: FriendLinkUpdateRequest): Promise<ApiResponse<any>> => {
    return Axios.put('/friendLink/update', data)
}

export const friendLinkList = (data: FriendLinkListRequest): Promise<ApiResponse<PageResult<FriendLink>>> => {
    return Axios.get('/friendLink/list', {params: data})
}