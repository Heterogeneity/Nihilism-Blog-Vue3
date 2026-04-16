<script setup lang="ts">
import {ref, watch} from "vue";
import axios, {type AxiosResponse} from "axios";
import {type ApiResponse} from "@/utils/axios.ts";
import type {ImageUploadResponse} from "@/api/image.ts";
import {useLayoutStore} from "@/stores/layout.ts";
import Title from "@/components/common/Title.vue"
import {Delete, Plus} from "@element-plus/icons-vue";
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import ArticleCreateForm from "@/components/dashboard/ArticleCreateForm.vue";

const layoutStore = useLayoutStore()
const savedIsAutoSaveEnable = localStorage.getItem('isAutoSaveEnable')
const isAutoSaveEnable = savedIsAutoSaveEnable ? ref(savedIsAutoSaveEnable === 'true') : ref(true)

const artTitle = ref('')
const savedArticle = localStorage.getItem('article')
const text = savedArticle ? ref(savedArticle) : ref()
const articleCreateVisible = ref(layoutStore.state.articleCreateVisible)
const onUploadImg = async (files: File[], callback: (urls: string[]) => void): Promise<void> => {
  const res = await Promise.all(
      files.map((file) => {
        return new Promise<AxiosResponse<ApiResponse<ImageUploadResponse>>>((resolve, reject) => {
          const form = new FormData()
          form.append("image", file)
          axios.post('/api/image/upload', form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true
          })
              .then(response => {
                resolve(response)
              }).catch((error) => {
            reject(error)
          })
        })
      })
  )
  callback(res.map((item) => item.data.data.url))
}
const onSave = (v: string) => {
  localStorage.setItem('article', v)
}
const onChange = (v: string) => {
  if (isAutoSaveEnable.value) {
    onSave(v)
  }
}
const articleCreateVisibleChange = () => {
  layoutStore.state.articleCreateVisible = false
}
watch(() => isAutoSaveEnable.value, (newVal) => {
  localStorage.setItem('isAutoSaveEnable', String(newVal))
})

watch(() => layoutStore.state.articleCreateVisible, (newVal) => {
  articleCreateVisible.value = newVal
})

</script>

<template>
  <div class="article-publish">
    <Title title="文章发布"/>
    <div class="article-publish-main">
      <div class="left">
        <span>文章标题</span>
        <input type="text" v-model="artTitle" placeholder="请输入文章标题"/>
      </div>
      <div class="right">
        <span>自动保存</span>
        <el-switch v-model="isAutoSaveEnable"/>
        <Button title="清空文章" @ToClick="artTitle='';text=''">
          <template #icon>
            <el-icon>
              <Delete/>
            </el-icon>
          </template>
        </Button>
        <Button title="发布文章" @ToClick="layoutStore.state.articleCreateVisible=true">
          <template #icon>
            <el-icon>
              <Plus/>
            </el-icon>
          </template>
        </Button>
        <el-dialog
            v-model="articleCreateVisible"
            width="700"
            align-center
            destroy-on-close
            :before-close="articleCreateVisibleChange"
        >
          <template #header>
            <Title title="文章发布"/>
          </template>
          <article-create-form :title="artTitle" :content="text"/>
        </el-dialog>
      </div>
    </div>
    <MdEditor v-model="text" @onSave="onSave" @onChange="onChange" @onUploadImg="onUploadImg"/>
  </div>
</template>

<style scoped lang="scss">
.article-publish {
  padding: 20px;
  height: 85%;

  .article-publish-main {
    margin: 5px 0 20px 0;
    display: flex;

    .left {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--main-color);

      input {
        margin-left: 20px;
        outline: none;
        font-family: 'YSHST', fangsong;
        border: 1px solid var(--main-color);
        border-radius: 5px;
        width: 400px;
        padding: 10px;
        font-weight: bold;
        font-size: 1rem;
        background-color: transparent;
        color: var(--main-color);

        &:focus {
          box-shadow: 0 0 10px var(--main-color);
        }
      }
    }

    .right {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .el-switch {
        margin: 0 20px;
      }
    }
  }

  .md-editor {
    height: 95%;
    border-radius: 20px;
    background-color: var(--bc-color);
  }
}
</style>