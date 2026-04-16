import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {type Feedback, feedbackCreate, type FeedbackCreateRequest, feedbackInfo, feedbackNew} from "@/api/feedback.ts";

export const useMyFeedbackStore = defineStore('my-feedback', () => {
    const myFeedbackData = ref<Feedback[]>()
    const myFeedbackNewData = ref<Feedback[]>()
    const feedbackRequest = reactive<FeedbackCreateRequest>({
        content: ""
    })

    //createFeedback 创建反馈
    const createFeedback = async () => {
        const res = await feedbackCreate(feedbackRequest)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            feedbackRequest.content = ""
            await getNewFeedbackList()
        } else {
            ElMessage.error(res.msg)
        }
    }
    //getTime 格式化时间
    const getTime = (date: Date): string => {
        const time = new Date(date)
        return time.toLocaleString()
    }
    //getNewFeedbackList 获得最新的列表
    const getNewFeedbackList = async () => {
        const res = await feedbackNew()
        if (res.code === 0) {
            myFeedbackNewData.value = res.data
        } else {
            ElMessage.error(res.msg)
        }
    }

    //getMyFeedbackList 获取自己的列表
    const getMyFeedbackList = async () => {
        const table = await feedbackInfo()
        if (table.code === 0) {
            myFeedbackData.value = table.data
        } else {
            ElMessage.error(table.msg)
        }
    }
    return {
        myFeedbackData,
        feedbackRequest,
        myFeedbackNewData,
        getTime,
        createFeedback,
        getMyFeedbackList,
        getNewFeedbackList
    }
})