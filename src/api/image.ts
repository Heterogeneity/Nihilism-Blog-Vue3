import type {Model, PageInfo, PageResult} from "@/api/common.ts";
import type {ApiResponse} from "@/utils/axios.ts";
import Axios from "@/utils/axios.ts";

export interface Image extends Model {
    name: string;
    url: string;
    category: string;
    storage: string;
}

export interface ImageUploadResponse {
    url: string;
    ossType: string;
}

export interface ImageDeleteRequest {
    ids: number[];
}

export interface ImageListRequest extends PageInfo {
    name: string | null;
    category: string | null;
    storage: string | null;
}

export const imageDelete = (data: ImageDeleteRequest): Promise<ApiResponse<any>> => {
    return Axios.delete('/image/delete', {data: data})
}

export const imageList = (data: ImageListRequest): Promise<ApiResponse<PageResult<Image>>> => {
    return Axios.get('/image/list', {params: data})
}