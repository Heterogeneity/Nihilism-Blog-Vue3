import type {Model, PageInfo, PageResult} from "@/api/common.ts";
import Axios, {type ApiResponse} from "@/utils/axios.ts";

export interface Advertisement extends Model {
    ad_image: string;
    link: string;
    title: string;
    content: string;
}

export interface AdvertisementInfoResponse {
    list: Advertisement[];
    total: number;
}

export interface AdvertisementCreateRequest {
    ad_image: string;
    link: string;
    title: string;
    content: string;
}

export interface AdvertisementDeleteRequest {
    ids: number[];
}

export interface AdvertisementUpdateRequest {
    id: number;
    link: string;
    title: string;
    content: string;
}

export interface AdvertisementListRequest extends PageInfo {
    title: string | null;
    content: string | null;
}

export const advertisementInfo = (): Promise<ApiResponse<AdvertisementInfoResponse>> => {
    return Axios.get('/advertisement/info')
}

export const advertisementCreate = (data: AdvertisementCreateRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/advertisement/create', data)
}

export const advertisementDelete = (data: AdvertisementDeleteRequest): Promise<ApiResponse<any>> => {
    return Axios.delete('/advertisement/delete', {data: data})
}

export const advertisementUpdate = (data: AdvertisementUpdateRequest): Promise<ApiResponse<any>> => {
    return Axios.put('/advertisement/update', data)
}

export const advertisementList = (data: AdvertisementListRequest): Promise<ApiResponse<PageResult<Advertisement>>> => {
    return Axios.get('/advertisement/list', {params: data})
}