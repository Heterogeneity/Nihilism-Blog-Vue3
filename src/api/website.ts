import type {ApiResponse} from "@/utils/axios.ts";
import type {Website} from "@/api/config.ts";
import Axios from "@/utils/axios.ts";


export interface WebsiteNewsRequest {
    source: string;
}

export interface HotItem {
    index: number;
    title: string;
    description: string;
    image: string;
    popularity: string;
    url: string;
}

export interface HotSearchData {
    source: string;
    update_time: string;
    hot_list: HotItem[];
}

export interface WebsiteCalendarResponse {
    date: string;
    lunar_date: string;
    ganzhi: string;
    zodiac: string;
    day_of_year: string;
    solar_term: string;
    auspicious: string;
    inauspicious: string;
}

export interface FooterLink {
    title: string;
    link: string;
}

export interface WebsiteCarouselOperation {
    url: string;
}

export const websiteTitle = (): Promise<ApiResponse<string>> => {
    return Axios.get('/website/title')
}

export const websiteInfo = (): Promise<ApiResponse<Website>> => {
    return Axios.get('/website/info')
}
export const websiteCarousel = (): Promise<ApiResponse<string[]>> => {
    return Axios.get('/website/carousel')
}

export const websiteNews = (data: WebsiteNewsRequest): Promise<ApiResponse<HotSearchData>> => {
    return Axios.get('/website/news', {params: data})
}

export const websiteCalendar = (): Promise<ApiResponse<WebsiteCalendarResponse>> => {
    return Axios.get('/website/calendar')
}

export const websiteFooterLink = (): Promise<ApiResponse<FooterLink[]>> => {
    return Axios.get('/website/footerLink')
}

export const websiteAddCarousel = (data: WebsiteCarouselOperation): Promise<ApiResponse<any>> => {
    return Axios.post('/website/addCarousel', data)
}

export const websiteCancelCarousel = (data: WebsiteCarouselOperation): Promise<ApiResponse<any>> => {
    return Axios.put('/website/cancelCarousel', data)
}

export const websiteCreateFooterLink = (data: FooterLink): Promise<ApiResponse<any>> => {
    return Axios.post('/website/createFooterLink', data)
}

export const websiteDeleteFooterLink = (data: FooterLink): Promise<ApiResponse<any>> => {
    return Axios.delete('/website/deleteFooterLink', {data: data})
}