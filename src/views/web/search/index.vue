<script setup lang="ts">

import SortList from "@/components/common/SortList.vue";
import ArticleItem from "@/components/common/ArticleItem.vue";
import {computed, onMounted, reactive, ref} from "vue";
import type {Hit} from "@/api/common.ts";
import {type Article, articleCategory, articleSearch, type ArticleSearchRequest, articleTags} from "@/api/article.ts";
import Button from "@/components/common/Button.vue";
import {Search} from "@element-plus/icons-vue";

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
  <div class="search-main">
    <div class="search-title">
      <h1>搜索文章</h1>
    </div>
    <div class="article-search">
      <!--todo:搜索样式-->
      <sort-list title="类别" type="category" :arr="categoryList" :value="articleSearchRequest.category"
                 @send-data="changeArticleSearchItem"/>
      <sort-list title="标签" type="tag" :arr="tagList" :value="articleSearchRequest.tag"
                 @send-data="changeArticleSearchItem"/>
      <sort-list title="排序" type="sort" :arr="sortArr" :value="articleSearchRequest.sort"
                 @send-data="changeArticleSearchItem"/>
      <sort-list title="顺序" type="order" :arr="orderArr" :value="articleSearchRequest.order"
                 @send-data="changeArticleSearchItem"/>
      <div style="display: flex; align-items: center;">
        <div class="search-keyword">
          <div style="display: flex;justify-content: center;">
            <span>搜索</span>
            <input type="text" v-model="articleSearchRequest.query" placeholder="请输入关键词">
          </div>
          <Button title="搜索" @ToClick="changeArticleSearchItem">
            <template #icon>
              <el-icon>
                <Search/>
              </el-icon>
            </template>
          </Button>
        </div>
        <el-pagination
            style="margin-top: 20px;margin-left: 20px"
            size="small"
            :current-page="page"
            :page-size="page_size"
            :total="total"
            layout="prev,pager,next"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"/>
      </div>

    </div>
    <div class="article-list">
      <ArticleItem :article-table="articleTable"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-main {
  animation: slide-in .6s .2s backwards;
  -webkit-animation: slide-in .6s .2s backwards;
  max-width: 1480px;
  margin: 100px auto 20px;
  box-shadow: 0 0 10px var(--main-color);
  border-radius: 20px;
  padding-bottom: 20px;

  .search-title {
    padding-top: 20px;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    color: var(--default-color);
  }

  .article-search {
    padding: 0 20px;
    font-size: 1.3rem;

    .search-keyword {
      font-size: 1.3rem;
      margin-top: 20px;
      display: flex;
      align-items: center;

      span {
        color: var(--default-color);

      }

      input {
        font-family: 'YSHST', fangsong;
        margin-left: 10px;
        outline: none;
        color: var(--default-color);
        background-color: transparent;
        border: 1px solid var(--main-color);
        padding: 5px 10px;
        border-radius: 5px;

        &:focus {
          box-shadow: 0 0 10px var(--main-color);
        }
      }
    }
  }

  .article-list {
    margin-top: 10px;
    display: flex;
    padding: 5px 20px;
    gap: 5px;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>