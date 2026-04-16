import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {
    type Feedback,
    type FeedbackDeleteRequest, feedbackReply,
    type FeedbackReplyRequest
} from "@/api/feedback.ts";
import {feedbackDelete, feedbackList} from "@/api/feedback.ts";
import type {PageInfo} from "@/api/common.ts";

export const useFeedbackStore = defineStore('feedback', () => {
    const state = ref(
        {
            page: 1,
            page_size: 10,
            total: 0,
            deleted: false,
            is_reply: false,
        }
    )
    const feedbackData = ref<Feedback[]>()
    const tableRef = ref()
    const feedbackListRequest = reactive<PageInfo>({
        page: 1,
        page_size: 10
    })
    const feedbackRelyData = reactive<FeedbackReplyRequest>({
        id: 0,
        reply: ""
    })

    let ids: any[] = []
    const path = ref(import.meta.env.VITE_BASE_API)

    //selectIds 选中删除
    const selectIds = () => {
        state.value.deleted = true
    }

    //isCheck 是否选中
    const isCheck = (item: Feedback, e: any) => {
        if (e.target.checked) {
            ids.push(item.id)
        } else {
            ids.splice(ids.indexOf(item.id), 1)
        }
    }

    const getSingle = (item: Feedback) => {
        state.value.is_reply = true
        feedbackRelyData.id = item.id
        feedbackRelyData.reply = item.reply
    }

    // replyFeedback 回复反馈
    const replyFeedback = async () => {
        const res = await feedbackReply(feedbackRelyData)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            state.value.is_reply = false
            await getFeedbackList()
        } else {
            ElMessage.error(res.msg)
        }
    }

    //deleteSingle 删除单个
    const deleteSingle = async (item: Feedback) => {
        ids.push(item.id)
        await deleteFeedback()
        await getFeedbackList()
    }

    //deleteFeedback 删除
    const deleteFeedback = async () => {
        const request: FeedbackDeleteRequest = {
            ids: ids
        }
        const res = await feedbackDelete(request)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            ids = []
        }
        state.value.deleted = false
        await getFeedbackList()
    }

    //getFeedbackList 获取列表
    const getFeedbackList = async () => {
        feedbackListRequest.page = state.value.page
        feedbackListRequest.page_size = state.value.page_size
        const table = await feedbackList(feedbackListRequest)
        if (table.code === 0) {
            state.value.total = table.data.total
            feedbackData.value = table.data.list
        } else {
            ElMessage.error(table.msg)
        }
    }


    //handleCurrentChange 翻页
    const handleCurrentChange = (val: number) => {
        state.value.page = val
        getFeedbackList().then()
    }

    //handleSizeChange 增加页数
    const handleSizeChange = (val: number) => {
        state.value.page_size = val
        getFeedbackList().then()
    }
    return {
        ids,
        path,
        state,
        feedbackData,
        feedbackRelyData,
        tableRef,
        feedbackListRequest,
        isCheck,
        selectIds,
        getSingle,
        deleteSingle,
        replyFeedback,
        deleteFeedback,
        getFeedbackList,
        handleSizeChange,
        handleCurrentChange
    }
})