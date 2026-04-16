import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {
    type Comment,
    commentDelete,
    type CommentDeleteRequest,
    commentList,
    type CommentListRequest

} from "@/api/comment.ts";
import {ElMessage} from "element-plus";

export const useCommentStore = defineStore('comment', () => {
    const state = ref(
        {
            page: 1,
            page_size: 10,
            total: 0,
            deleted: false,
        }
    )
    const commentData = ref<Comment[]>()
    const tableRef = ref()
    const commentListRequest = reactive<CommentListRequest>({
        article_id: "",
        user_uid: "",
        content: "",
        page: 1,
        page_size: 10
    })
    let ids: any[] = []

    //selectIds 选中删除
    const selectIds = () => {
        state.value.deleted = true
    }

    //isCheck 是否选中
    const isCheck = (item: Comment, e: any) => {
        if (e.target.checked) {
            ids.push(item.id)
        } else {
            ids.splice(ids.indexOf(item.id), 1)
        }
    }

    //deleteSingle 删除单个
    const deleteSingle = async (item: Comment) => {
        ids.push(item.id)
        await deleteComment()
        await getCommentList()
    }

    //deleteComment 删除
    const deleteComment = async () => {
        const request: CommentDeleteRequest = {
            ids: ids
        }
        const res = await commentDelete(request)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            ids = []
        }
        state.value.deleted = false
        await getCommentList()
    }

    //getCommentList 获取列表
    const getCommentList = async () => {
        if (commentListRequest.article_id === "") {
            commentListRequest.article_id = null
        }
        if (commentListRequest.user_uid === "") {
            commentListRequest.user_uid = null
        }
        if (commentListRequest.content === "") {
            commentListRequest.content = null
        }
        commentListRequest.page = state.value.page
        commentListRequest.page_size = state.value.page_size
        const table = await commentList(commentListRequest)
        if (table.code === 0) {
            state.value.total = table.data.total
            commentData.value = table.data.list
        } else {
            ElMessage.error(table.msg)
        }
    }


    //handleCurrentChange 翻页
    const handleCurrentChange = (val: number) => {
        state.value.page = val
        getCommentList().then()
    }

    //handleSizeChange 增加页数
    const handleSizeChange = (val: number) => {
        state.value.page_size = val
        getCommentList().then()
    }
    return {
        ids,
        state,
        commentData,
        tableRef,
        commentListRequest,
        isCheck,
        selectIds,
        deleteSingle,
        deleteComment,
        getCommentList,
        handleSizeChange,
        handleCurrentChange
    }
})