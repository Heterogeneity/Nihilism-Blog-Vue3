import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {
    type Article,
    articleLike,
    type ArticleLikeRequest, articleLikesList,

} from "@/api/article.ts";
import {ElMessage} from "element-plus";
import type {Hit, PageInfo} from "@/api/common.ts";
import router from "@/router";

export const useCollectionStore = defineStore('collection', () => {
    const state = ref(
        {
            page: 1,
            page_size: 10,
            total: 0,
        }
    )
    const collectionList = ref<Hit<Article>[]>([])
    const collectionListRequest = reactive<PageInfo>({
        page: 1,
        page_size: 10
    })

    // openUrl 前往文章
    const openUrl = (id: string) => {
        router.push(`/article/${id}`).then()
    }

    //cancelCollect 取消收藏
    const cancelCollect = async (id: string) => {
        const request: ArticleLikeRequest = {
            article_id: id
        }
        const res = await articleLike(request)
        if (res.code === 0) {
            ElMessage.success(res.msg)
        }
        await getCollectionList()
    }

    //getCollectionList 获取列表
    const getCollectionList = async () => {
        collectionListRequest.page = state.value.page
        collectionListRequest.page_size = state.value.page_size
        const table = await articleLikesList(collectionListRequest)
        if (table.code === 0) {
            state.value.total = table.data.total
            collectionList.value = table.data.list
        } else {
            ElMessage.error(table.msg)
        }
    }

    //handleCurrentChange 翻页
    const handleCurrentChange = (val: number) => {
        state.value.page = val
        getCollectionList().then()
    }

    //handleSizeChange 增加页数
    const handleSizeChange = (val: number) => {
        state.value.page_size = val
        getCollectionList().then()
    }
    return {
        state,
        collectionList,
        collectionListRequest,
        openUrl,
        cancelCollect,
        getCollectionList,
        handleSizeChange,
        handleCurrentChange
    }
})