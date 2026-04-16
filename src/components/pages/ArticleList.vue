<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import {type Article, articleCategory, articleSearch, type ArticleSearchRequest, articleTags} from "@/api/article.ts";
import type {Hit} from "@/api/common.ts";
import {useRouter} from "vue-router";
import TagCom from "@/components/common/TagCom.vue";
import {ChatDotSquare, Document, Star, StarFilled, View} from "@element-plus/icons-vue";
import SortList from "@/components/common/SortList.vue";
import ArticleItem from "@/components/common/ArticleItem.vue";

const articleSearchRequest = reactive<ArticleSearchRequest>({
  query: "",
  category: "",
  tag: "",
  sort: "time",
  order: "desc",
  page: 1,
  page_size: 10
})
const categoryList = ref<string[]>([])
const tagList = ref<string[]>([])
const page = ref(1)
const page_size = ref(10)
const total = ref(0)
const articleTable = ref<Hit<Article>[]>()
const sortArr = [
  {label: "时间", value: "time"},
  {label: "评论", value: "comment"},
  {label: "浏览", value: "view"},
  {label: "点赞", value: "like"},
]
const orderArr = [
  {label: "升序", value: "asc"},
  {label: "降序", value: "desc"},
]


const getArticleCategory = async () => {
  const res = await articleCategory()
  if (res.code === 0) {
    res.data.forEach((item: any) => {
      categoryList.value.push(item)
    })
  }
}

const getArticleTags = async () => {
  const res = await articleTags()
  if (res.code === 0) {
    res.data.forEach((item: any) => {
      tagList.value.push(item)
    })
  }
}

const getArticleSearchTableData = async () => {
  articleSearchRequest.page = page.value
  articleSearchRequest.page_size = page_size.value
  const table = await articleSearch(articleSearchRequest)
  if (table.code === 0) {
    articleTable.value = table.data.list
    total.value = table.data.total
  }
}
const changeArticleSearchItem = (val: any, type: any) => {
  Object.defineProperty(articleSearchRequest, type, {
    value: val,
    writable: true
  })
  getArticleSearchTableData()
}


const handleCurrentChange = (val: number) => {
  page.value = val
  getArticleSearchTableData()
}

const handleSizeChange = (val: number) => {
  page_size.value = val
  getArticleSearchTableData()
}

onMounted(() => {
  getArticleCategory()
  getArticleTags()
  getArticleSearchTableData()
})
</script>

<template>
  <div class="article-main">
    <div class="article-title">文章列表</div>
    <div class="article-search">
      <!--todo:搜索样式-->
      <div>

      </div>
      <sort-list title="类别" type="category" :arr="categoryList" :value="articleSearchRequest.category"
                 @send-data="changeArticleSearchItem"/>
      <sort-list title="标签" type="tag" :arr="tagList" :value="articleSearchRequest.tag"
                 @send-data="changeArticleSearchItem"/>
      <sort-list title="排序" type="sort" :arr="sortArr" :value="articleSearchRequest.sort"
                 @send-data="changeArticleSearchItem"/>
      <sort-list title="顺序" type="order" :arr="orderArr" :value="articleSearchRequest.order"
                 @send-data="changeArticleSearchItem"/>
    </div>
    <div class="article-list">
      <ArticleItem :article-table="articleTable"/>
    </div>
    <el-pagination
        style="margin-top: 10px;display: flex; justify-content: center;"
        size="small"
        :current-page="page"
        :page-size="page_size"
        :total="total"
        layout="prev,pager,next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
  </div>
</template>

<style scoped lang="scss">
.article-main {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px var(--main-color);

  .article-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--main-color);
  }

  .article-search {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .article-list {
    margin-top: 10px;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }


}
</style>