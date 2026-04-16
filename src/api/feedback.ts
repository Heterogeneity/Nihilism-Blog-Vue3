import type {Model, PageInfo, PageResult} from "@/api/common.ts";
import type {ApiResponse} from "@/utils/axios.ts";
import Axios from "@/utils/axios.ts";


export interface Feedback extends Model {
    user_uid: string;
    content: string;
    reply: string;
}

export interface FeedbackCreateRequest {
    content: string;
}

export interface FeedbackDeleteRequest {
    ids: number[];
}

export interface FeedbackReplyRequest {
    id: number;
    reply: string;
}

export const feedbackCreate = (data: FeedbackCreateRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/feedback/create', data)
}

export const feedbackInfo = (): Promise<ApiResponse<Feedback[]>> => {
    return Axios.get('/feedback/info')
}

export const feedbackDelete = (data: FeedbackDeleteRequest): Promise<ApiResponse<any>> => {
    return Axios.delete('/feedback/delete', {data: data})
}

export const feedbackReply = (data: FeedbackReplyRequest): Promise<ApiResponse<any>> => {
    return Axios.put('/feedback/reply', data)
}

export const feedbackList = (data: PageInfo): Promise<ApiResponse<PageResult<Feedback>>> => {
    return Axios.get('/feedback/list', {params: data})
}

export const feedbackNew = (): Promise<ApiResponse<Feedback[]>> => {
    return Axios.get('/feedback/new')
}