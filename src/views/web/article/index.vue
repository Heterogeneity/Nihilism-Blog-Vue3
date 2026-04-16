<script setup lang="ts">

import WebFooter from "@/components/layout/WebFooter.vue";
import WebNavbar from "@/components/layout/WebNavbar.vue";
import {MdPreview, MdCatalog} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import 'md-editor-v3/lib/preview.css';
import {useRoute, useRouter} from "vue-router";
import {onMounted, onUnmounted, ref} from "vue";
import {type Article, articleInfoByID, articleIsLike, articleLike, type ArticleLikeRequest} from "@/api/article.ts";
import {useUserStore} from "@/stores/user";
import {ElMessage} from "element-plus";
import TagCom from "@/components/common/TagCom.vue";
import {ChatDotSquare, Promotion, Star, StarFilled, View} from "@element-plus/icons-vue";
import Button from "@/components/common/Button.vue";
import CommentItem from "@/components/common/CommentItem.vue";
import {useMyCommentStore} from "@/stores/my-comment.ts";
import Carousel from "@/components/pages/Carousel.vue";
import Wave from "@/components/common/Wave.vue";

const router = useRouter()
const userStore = useUserStore()
const myComment = useMyCommentStore()
const mdID = "md-id"
const articleInfo = ref<Article>({
  created_at: "",
  updated_at: "",
  cover: "",
  title: "",
  keyword: "",
  category: "",
  tags: [],
  abstract: "",
  content: "",
  views: 0,
  comments: 0,
  likes: 0
})
const isLike = ref<any>(false)
const scrollElement = document.documentElement

const getArticleInfo = async () => {
  const res = await articleInfoByID(String(myComment.articleID))
  if (res.code === 0) {
    articleInfo.value = res.data
  } else {
    await router.push({name: "404"})
  }
}

const getIsLikeInfo = async () => {
  const req: ArticleLikeRequest = {
    article_id: String(myComment.articleID)
  }
  const res = await articleIsLike(req)
  if (res.code === 0) {
    isLike.value = res.data
  }
}

const handleLike = async () => {
  const req: ArticleLikeRequest = {
    article_id: String(myComment.articleID)
  }
  const res = await articleLike(req)
  if (res.code === 0) {
    ElMessage.success(res.msg)
    articleInfo.value.likes += isLike.value ? -1 : 1
    isLike.value = !isLike.value
  }
}
const scroll = () => {
  let ele = document.querySelector(".right-content") as HTMLElement
  let bottom = document.querySelector(".article-bottom") as HTMLElement
  if (scrollElement.scrollTop >= 1000 && scrollElement.scrollTop <= bottom.offsetTop-800) {
    ele?.classList.add("stick");
  } else {
    ele?.classList.remove("stick");
  }
}
onUnmounted(()=>{
  document.removeEventListener("scroll", scroll)
})
onMounted(() => {
  getArticleInfo()
  if (userStore.state.userInfo.role_id !== 0) {
    getIsLikeInfo()
  }
  myComment.getArticleCommentsInfo()
  document.addEventListener("scroll", scroll)
})
</script>

<template>
  <div>
    <web-navbar/>
    <el-image style="z-index: -5;position: absolute;top: 0;width: 100%;height:900px;" :src="articleInfo.cover" alt=""/>
    <Wave/>
    <div class="article-main">
      <div class="article-header">
        <div class="article-title">{{ articleInfo.title }}</div>
        <div class="article-time">
          <div>创建时间:{{ articleInfo.created_at }}</div>
          <div>更新时间:{{ articleInfo.updated_at }}</div>
        </div>
        <div style="margin-top: 10px;display: flex;align-items: center;justify-content: center;">
          <div class="article-category">
            <span>类别:</span>
            {{ articleInfo.category }}
          </div>
          <div class="right-tag">
            <TagCom :tag="String(articleInfo.views)">
              <template #icon>
                <el-icon>
                  <View/>
                </el-icon>
              </template>
            </TagCom>
            <TagCom :tag="String(articleInfo.comments)">
              <template #icon>
                <el-icon>
                  <ChatDotSquare/>
                </el-icon>
              </template>
            </TagCom>
            <TagCom @to-click="handleLike" :tag="String(articleInfo.likes)">
              <template #icon>
                <el-icon>
                  <StarFilled v-if="isLike"/>
                  <Star v-else/>
                </el-icon>
              </template>
            </TagCom>
          </div>
          <div class="article-tags">
            <span>标签:</span>
            <div v-for="item in articleInfo.tags" :key="item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="article-abstract">
          <span>简介:</span>
          {{ articleInfo.abstract }}
        </div>
      </div>
      <div class="article-medium">
        <div class="article-medium-left">
          <MdPreview :id="mdID" :modelValue="articleInfo.content"/>
        </div>
        <div class="article-medium-right">
          <MdCatalog class="right-content" :editorId="mdID" :scrollElement="scrollElement" :offsetTop="300"
                     :scrollElementOffsetTop="80"/>
        </div>
      </div>
      <div class="article-bottom">
        <div class="comment-header">
          <h2>评论</h2>
          <span>{{ articleInfo.comments }}</span>
        </div>
        <div class="comment-medium">
          <div class="comment-medium-top">
            <el-image
                :src="userStore.state.userInfo.avatar!==''?userStore.state.userInfo.avatar:'/images/login.png'"/>
            <textarea v-model="myComment.bigContent" placeholder="请输入评论"/>
          </div>
          <div class="comment-send">
            <span>注意：请登录后再进行评论!</span>
            <Button title="发表" @to-click="myComment.submitComment">
              <template #icon>
                <el-icon>
                  <Promotion/>
                </el-icon>
              </template>
            </Button>
          </div>
        </div>
        <div class="comment-list">
          <comment-item :comments="myComment.comments"/>
        </div>
      </div>
    </div>
    <web-footer/>
  </div>
</template>

<style scoped>
.article-main {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  border-radius: 20px;
  padding: 20px;
  max-width: 1440px;
  width: 100%;
  margin: 20px auto 20px;

  .article-header {
    margin-top: 20px;

    .article-title {
      font-weight: bold;
      font-size: 2rem;
      color: var(--main-color);
      text-align: center;
    }

    .article-time {
      margin-top: 10px;
      font-size: 1rem;
      color: var(--default-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .article-category {
      font-size: 1.3rem;
      color: var(--default-color);

      span {
        font-weight: bold;
        color: var(--main-color);
      }
    }

    .right-tag {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      font-size: 1.5rem;
    }

    .article-tags {
      margin-left: 10px;
      display: flex;
      align-items: center;

      span {
        font-weight: bold;
        color: var(--main-color);
        font-size: 1.3rem;
      }

      div {
        margin-left: 5px;
        border: 1px solid var(--main-color);
        color: var(--main-color);
        padding: 5px;
        border-radius: 5px;
      }
    }

    .article-abstract {
      margin-top: 20px;
      margin-left: 20px;
      text-align: center;
      font-size: 1.3rem;
      color: var(--default-color);

      span {
        font-weight: bold;
        color: var(--main-color);
      }
    }
  }

  .article-medium {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .article-medium-left {
      z-index: 10;
      width: 1000px;
      padding: 20px;
    }

    .article-medium-right {
      width: 400px;

      .right-content {
        top: 15%;
        width: 350px;
        padding: 20px;
        overflow-y: auto;
        font-size: 1.1rem;
        z-index: 1000;
        border-radius: 20px;
        box-shadow: 0 0 10px var(--main-color);
        scrollbar-width: none;
        color: var(--default-color);
        transition: all .5s ease;
      }
    }

    .stick {
      position: fixed;
      animation: slide-in .6s .2s backwards;
      -webkit-animation: slide-in .6s .2s backwards;
    }
  }

  .article-bottom {
    width: 68%;
    padding: 0 20px;
    border-radius: 20px;
    font-weight: bold;

    .comment-header {
      display: flex;
      align-items: center;

      h2 {
        color: var(--main-color);
      }

      span {
        margin-left: 5px;
        color: var(--default-color);
      }
    }

    .comment-medium-top {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .el-image {
        background-color: var(--main-color);
        box-shadow: 0 0 10px var(--main-color);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 20px;
      }

      textarea {
        outline: none;
        border: none;
        border-radius: 10px;
        box-shadow: 0 0 10px var(--main-color);
        width: 90%;
        height: 50px;
        font-size: 1.1rem;
        color: var(--main-color);
        font-family: 'YSHST', fangsong;
        font-weight: bold;
        padding: 10px;
        background-color: var(--bc-color);
      }
    }

    .comment-send {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      span {
        color: var(--default-color);
      }
    }

    .comment-list {
      padding: 10px 0;
      width: 100%;
    }
  }
}
</style>