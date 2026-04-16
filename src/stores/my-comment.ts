import {defineStore} from "pinia";
import type {Comment, CommentCreateRequest} from "@/api/comment.ts";
import {commentCreate, commentInfo, commentInfoByArticleID, commentNew} from "@/api/comment.ts";
import {ElMessage} from "element-plus";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

export const useMyCommentStore = defineStore("my-comment", () => {
    const route = useRoute()
    const content = ref('')
    const bigContent = ref('')
    const comments = ref<Comment[]>([])
    const articleID = computed(() => route.params.id)
    const newComments = ref<Comment[]>([])
    const myComments = ref<Comment[]>([])

    //replyComment 回复评论
    const replyComment = async (item: Comment) => {
        const commentCreateRequest: CommentCreateRequest = {
            article_id: String(articleID.value),
            p_id: item.id,
            content: content.value
        }
        const res = await commentCreate(commentCreateRequest)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            content.value = ''
            await getArticleCommentsInfo()
        }
    }

    //submitComment 创建评论
    const submitComment = async () => {
        const commentCreateRequest: CommentCreateRequest = {
            article_id: String(articleID.value),
            p_id: null,
            content: bigContent.value
        }
        const res = await commentCreate(commentCreateRequest)
        if (res.code === 0) {
            ElMessage.success(res.msg)
            bigContent.value = ''
            await getArticleCommentsInfo()
        }
    }

    // getNewComment 获取最新评论
    const getNewComment = async () => {
        const res = await commentNew()
        if (res.code === 0) {
            newComments.value = res.data
        } else {
            ElMessage.error(res.msg)
        }
    }

    // getCommentInfo 获取我自己的评论
    const getCommentInfo = async () => {
        const res = await commentInfo()
        if (res.code === 0) {
            myComments.value = res.data
        } else {
            ElMessage.error(res.msg)
        }
    }

    //getArticleCommentsInfo 获取文章评论
    const getArticleCommentsInfo = async () => {
        comments.value = []
        const res = await commentInfoByArticleID(String(articleID.value))
        if (res.code === 0) {
            comments.value = res.data.reverse() as any
        }
    }

    return {
        myComments,
        newComments,
        comments,
        content,
        bigContent,
        articleID,
        submitComment,
        replyComment,
        getNewComment,
        getCommentInfo,
        getArticleCommentsInfo
    }
})