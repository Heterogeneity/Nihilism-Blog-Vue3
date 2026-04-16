import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {
    type Article, type ArticleDeleteRequest, type ArticleListRequest
} from "@/api/article.ts";
import {articleDelete, articleList} from "@/api/article.ts";
import type {Hit, PageInfo} from "@/api/common.ts";

export const useArticleListStore = defineStore('article-list', () => {
    const state = ref(
        {
            page: 1,
            page_size: 10,
            total: 0,
            deleted: false,
        }
    )
    const articleData = ref<Hit<Article>[]>()
    const tableRef = ref()
    const articleListRequest = reactive<ArticleListRequest>({
        title: "",
        category: "",
        abstract: "",
        page: 1,
        page_size: 10
    })

    let ids: any[] = []
    const path = ref(import.meta.env.VITE_BASE_API)

    //selectIds 选中删除
    const selectIds = () => {
        state.value.deleted = true
    }

    //isCheck 是否选中
    const isCheck = (item: Hit<Article>, e: any) => {
        if (e.target.checked) {
            ids.push(item._id)
        } else {
            ids.splice(ids.indexOf(item._id), 1)
        }
    }

    //deleteSingle 删除单个
    const deleteSingle = async (item: Hit<Article>) => {
        ids.push(item._id)
        await deleteArticle()
        await getArticleList()
    }

    //deleteArticle删除
    const deleteArticle = async () => {
        const request: ArticleDeleteRequest = {
            ids: ids
        }
        const res = await articleDelete(request)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            ids = []
        }
        state.value.deleted = false
        await getArticleList()
    }

    //getArticleList 获取列表
    const getArticleList = async () => {
        if (articleListRequest.title === "") {
            articleListRequest.title = null
        }
        if (articleListRequest.abstract === "") {
            articleListRequest.abstract = null
        }
        if (articleListRequest.category === "") {
            articleListRequest.category = null
        }
        articleListRequest.page = state.value.page
        articleListRequest.page_size = state.value.page_size
        const table = await articleList(articleListRequest)
        if (table.code === 0) {
            state.value.total = table.data.total
            articleData.value = table.data.list
        } else {
            ElMessage.error(table.msg)
        }
    }


    //handleCurrentChange 翻页
    const handleCurrentChange = (val: number) => {
        state.value.page = val
        getArticleList().then()
    }

    //handleSizeChange 增加页数
    const handleSizeChange = (val: number) => {
        state.value.page_size = val
        getArticleList().then()
    }
    return {
        ids,
        path,
        state,
        articleData,
        tableRef,
        articleListRequest,
        isCheck,
        selectIds,
        deleteSingle,
        deleteArticle,
        getArticleList,
        handleSizeChange,
        handleCurrentChange
    }
})