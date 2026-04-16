import type {Hit, PageInfo, PageResult} from "@/api/common.ts";
import Axios, {type ApiResponse} from "@/utils/axios.ts";


export interface Article {
    created_at: string;
    updated_at: string;
    cover: string;
    title: string;
    keyword: string;
    category: string;
    tags: string[];
    abstract: string;
    content: string;
    views: number;
    comments: number;
    likes: number;
}

export interface ArticleLikeRequest {
    article_id: string;
}

export interface ArticleCreateRequest {
    cover: string;
    title: string;
    category: string;
    tags: string[];
    abstract: string;
    content: string;
}

export interface ArticleUpdateRequest {
    id: string;
    cover: string;
    title: string;
    category: string;
    tags: string[];
    abstract: string;
    content: string;
}

export interface ArticleDeleteRequest {
    ids: string[];
}

export interface ArticleListRequest extends PageInfo {
    title: string | null;
    category: string | null;
    abstract: string | null;
}

export interface ArticleSearchRequest extends PageInfo {
    query: string;
    category: string;
    tag: string;
    sort: string;
    order: string;
}

export interface ArticleCategory {
    category: string;
    number: number;
}

export interface ArticleTag {
    tag: string;
    number: number;
}

export const articleLike = (data: ArticleLikeRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/article/like', data)
}

export const articleIsLike = (data: ArticleLikeRequest): Promise<ApiResponse<PageResult<Hit<Article>>>> => {
    return Axios.get('/article/isLike', {params: data})
}

export const articleLikesList = (data: PageInfo): Promise<ApiResponse<PageResult<Hit<Article>>>> => {
    return Axios.get('/article/likesList', {params: data})
}

export const articleCreate = (data: ArticleCreateRequest): Promise<ApiResponse<any>> => {
    return Axios.post('/article/create', data)
}

export const articleDelete = (data: ArticleDeleteRequest): Promise<ApiResponse<any>> => {
    return Axios.delete('/article/delete', {data: data})
}

export const articleUpdate = (data: ArticleUpdateRequest): Promise<ApiResponse<any>> => {
    return Axios.put('/article/update', data)
}

export const articleList = (data: ArticleListRequest): Promise<ApiResponse<PageResult<Hit<Article>>>> => {
    return Axios.get('/article/list', {params: data})
}

export const articleInfoByID = (id: string): Promise<ApiResponse<Article>> => {
    return Axios.get(`/article/${id}`)
}

export const articleSearch = (data: ArticleSearchRequest): Promise<ApiResponse<PageResult<Hit<Article>>>> => {
    return Axios.get('/article/search', {params: data})
}

export const articleCategory = (): Promise<ApiResponse<ArticleCategory[]>> => {
    return Axios.get('/article/category')
}

export const articleTags = (): Promise<ApiResponse<ArticleTag[]>> => {
    return Axios.get('/article/tags')
}