import type {Model, PageInfo, PageResult} from "@/api/common.ts";
import type {User} from "@/api/user.ts";
import Axios, {type ApiResponse} from "@/utils/axios.ts";

export interface Comment extends Model {
    article_id: string;
    p_id: number | null;
    children: Comment[]|null;
    user_uid: string;
    user: User;
    content: string;
}

export interface CommentCreateRequest {
    article_id: string;
    p_id: number | null;
    content: string;
}

export interface CommentDeleteRequest {
    ids: number[];
}

export interface CommentListRequest extends PageInfo {
    article_id: string | null;
    user_uid: string | null;
    content: string | null;
}

export const commentCreate = (data: CommentCreateRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/comment/create', data)
}

export const commentDelete = (data: CommentDeleteRequest): Promise<ApiResponse<any>> => {
    return Axios.delete('/comment/delete', {data: data})
}

export const commentInfo = (): Promise<ApiResponse<Comment[]>> => {
    return Axios.get('/comment/info')
}

export const commentInfoByArticleID = (article_id: string): Promise<ApiResponse<Comment[]>> => {
    return Axios.get(`/comment/${article_id}`)
}

export const commentNew = (): Promise<ApiResponse<Comment[]>> => {
    return Axios.get('/comment/new')
}

export const commentList = (data: CommentListRequest): Promise<ApiResponse<PageResult<Comment>>> => {
    return Axios.get('/comment/list', {params: data})
}