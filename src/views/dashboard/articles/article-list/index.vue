<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Check, Close, Delete, Document, DocumentAdd, FolderAdd, Search, Select} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useArticleListStore} from "@/stores/article.ts";
import {useUserStore} from "@/stores/user.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import ArticleUpdateForm from "@/components/dashboard/ArticleUpdateForm.vue";
import type {Article} from "@/api/article.ts";
import type {Hit} from "@/api/common.ts";

const articleStore = useArticleListStore()
const userStore = useUserStore()
const item = ref<Hit<Article>>()
const layoutStore = useLayoutStore()
const openArticle = (item1: Hit<Article>) => {
  item.value = item1;
  layoutStore.state.articleUpdateVisible = true
}
onMounted(() => {
  articleStore.getArticleList()
})
</script>

<template>
  <div class="article-list-main">
    <Title title="文章列表"/>
    <div class="article-list-header">
      <input name="name" class="article-list-header-input" type="text" v-model="articleStore.articleListRequest.title"
             placeholder="请输入文章名称">
      <input name="abstract" class="article-list-header-input" type="text"
             v-model="articleStore.articleListRequest.abstract"
             placeholder="请输入文章简介">
      <Button title="查询" @ToClick="articleStore.getArticleList">
        <template #icon>
          <el-icon>
            <Search/>
          </el-icon>
        </template>
      </Button>
      <Button title="批量删除" @ToClick="articleStore.selectIds">
        <template #icon>
          <el-icon>
            <Delete/>
          </el-icon>
        </template>
      </Button>
      <el-dialog
          v-model="articleStore.state.deleted"
          width="500"
          align-center
          destroy-on-close
      >
        <template #header>
          删除
        </template>
        <div>
          您已选中【{{ articleStore.ids.length }}】条文章，删除后将无法恢复，是否确认删除？
        </div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
          <Button title="确认" @ToClick="articleStore.deleteArticle">
            <template #icon>
              <el-icon>
                <Check/>
              </el-icon>
            </template>
          </Button>
          <Button title="取消" @ToClick="articleStore.state.deleted=false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-dialog>
      <el-dialog v-model="layoutStore.state.articleUpdateVisible">
        <template #header>
          编辑文章
        </template>
        <article-update-form :item="item"/>
      </el-dialog>

    </div>
    <div class="table">
      <table style="width: 100%;">
        <thead>
        <tr>
          <th style="width: 60px">选择</th>
          <th>文章图片</th>
          <th>文章名称</th>
          <th>文章链接</th>
          <th>文章简介</th>
          <th style="width: 15%">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in articleStore.articleData" :key="item.id">
          <tr>
            <td style="width: 10px">
              <input :value="item" @change="articleStore.isCheck(item,$event)" type="checkbox"/>
            </td>
            <td>
              <el-image style="height: 50px;border-radius: 10px;" :src="item._source.cover" alt=""/>
            </td>
            <td>{{ item._source.title }}</td>
            <td>{{ item._source.category }}</td>
            <td>{{ item._source.abstract }}</td>
            <td>
              <div style="display: flex;justify-content: center;">
                <Button title="编辑" @ToClick="openArticle(item)">
                  <template #icon>
                    <el-icon>
                      <DocumentAdd/>
                    </el-icon>
                  </template>
                </Button>
                <Button title="删除" @ToClick="articleStore.deleteSingle(item)">
                  <template #icon>
                    <el-icon>
                      <Close/>
                    </el-icon>
                  </template>
                </Button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <el-pagination
        popper-class="item-pagination"
        style="margin-left: 20px;display: flex;justify-content: center;"
        :current-page="articleStore.state.page"
        :page-size="articleStore.state.page_size"
        :page-sizes="[10, 30, 50, 100]"
        :total="articleStore.state.total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="articleStore.handleCurrentChange"
        @size-change="articleStore.handleSizeChange"
    />
  </div>
</template>
<style scoped lang="scss">
.article-list-main {
  padding: 20px;

  .el-image {
    height: 120px;
  }

  .upload-content {
    display: flex;
    height: 120px;

    .container {
      margin: auto;

      .upload-filled {
        height: 32px;
        width: 32px;
      }
    }
  }

  .article-list-header {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .article-list-header-input {
      outline: none;
      font-family: 'YSHST', fangsong;
      border: 1px solid var(--main-color);
      border-radius: 5px;
      width: 500px;
      margin-right: 20px;
      padding: 0 10px;
      font-weight: bold;
      font-size: 1rem;
      background-color: transparent;
      color: var(--main-color);

      &:focus {
        box-shadow: 0 0 10px var(--main-color);
      }
    }


  }

  .table {
    font-weight: bold;
    margin: 0 auto;
    font-size: .9rem;
    max-height: 600px;
    overflow-y: auto;
    scrollbar-width: none;

    table {
      border-spacing: 12px;
      text-align: center;
    }

    th {
      width: 120px;
      color: var(--main-color);
      padding: 5px 0;
      border-radius: 5px;
      border: 1px solid var(--main-color);
    }

    td {
      color: var(--default-color);
    }
  }

}
</style>