import {defineStore} from "pinia";
import {type HotItem, websiteNews, type WebsiteNewsRequest} from "@/api/website.ts";
import {ref} from "vue";

interface newsTypeItem {
    name: string;
    label: string;
    src: string;
}

export const useNewsStore = defineStore('news', () => {
    const newsTypeList: newsTypeItem[] = [
        {
            name: "baidu",
            src: "/images/baidu.png",
            label: "百度热搜"
        },
        {
            name: "kuaishou",
            src: "/images/kuaishou.png",
            label: "快手热榜"
        },
        {
            name: "toutiao",
            src: "/images/toutiao.png",
            label: "头条热榜"
        }
    ]
    const select = ref("")
    const newsData = ref<HotItem[]>()
    const newsMap = new Map<string, HotItem[]>
    const getNewsData = async (source: string) => {
        if (!newsMap.has(source)) {
            const newsRequest: WebsiteNewsRequest = {
                source: source
            }
            const res = await websiteNews(newsRequest)
            if (res.code === 0) {
                newsMap.set(source, res.data.hot_list)
            }
        }
        select.value = source
        newsData.value = newsMap.get(source)
    }

    const openNews = (item: HotItem) => {
        window.open(item.url, "_blank")
    }
    return {
        newsTypeList,
        newsData,
        select,
        getNewsData,
        openNews
    }
})