<script setup lang="ts">
import {onMounted} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Check, Close, Delete, DocumentAdd, Search} from "@element-plus/icons-vue";
import {useCommentStore} from "@/stores/comment.ts";

const commentStore = useCommentStore()

onMounted(() => {
  commentStore.getCommentList()
})
</script>

<template>
  <div class="comment-main">
    <Title title="评论列表"/>
    <div class="comment-header">
      <input name="article_id" class="comment-header-input" type="text" v-model="commentStore.commentListRequest.article_id"
             placeholder="请输入文章ID">
      <input name="user_uid" class="comment-header-input" type="text" v-model="commentStore.commentListRequest.user_uid"
             placeholder="请输入用户ID">
      <input name="content" class="comment-header-input" type="text" v-model="commentStore.commentListRequest.content"
             placeholder="请输入内容">
      <Button title="查询" @ToClick="commentStore.getCommentList">
        <template #icon>
          <el-icon>
            <Search/>
          </el-icon>
        </template>
      </Button>
      <Button title="批量删除" @ToClick="commentStore.selectIds">
        <template #icon>
          <el-icon>
            <Delete/>
          </el-icon>
        </template>
      </Button>

      <el-dialog
          v-model="commentStore.state.deleted"
          width="500"
          align-center
          destroy-on-close
      >
        <template #header>
          删除
        </template>
        <div>
          您已选中【{{ commentStore.ids.length }}】条评论，删除后将无法恢复，是否确认删除？
        </div>
        <div style="margin-top: 10px;display: flex;justify-content: center;">
          <Button title="确认" @ToClick="commentStore.deleteComment">
            <template #icon>
              <el-icon>
                <Check/>
              </el-icon>
            </template>
          </Button>
          <Button title="取消" @ToClick="commentStore.state.deleted=false">
            <template #icon>
              <el-icon>
                <Close/>
              </el-icon>
            </template>
          </Button>
        </div>
      </el-dialog>
    </div>
    <div class="table">
      <table style="width: 100%;">
        <thead>
        <tr>
          <th style="width: 60px">选择</th>
          <th>文章ID</th>
          <th>用户ID</th>
          <th style="width: 300px">内容</th>
          <th style="width: 8%">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in commentStore.commentData" :key="item.id">
          <tr>
            <td style="width: 10px">
              <input :value="item" @change="commentStore.isCheck(item,$event)" type="checkbox"/>
            </td>
            <td>{{ item.article_id }}</td>
            <td>{{ item.user_uid }}</td>
            <td>{{ item.content }}</td>
            <td>
              <div style="display: flex;justify-content: center;">
                <Button title="删除" @ToClick="commentStore.deleteSingle(item)">
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
        :current-page="commentStore.state.page"
        :page-size="commentStore.state.page_size"
        :page-sizes="[10, 30, 50, 100]"
        :total="commentStore.state.total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="commentStore.handleCurrentChange"
        @size-change="commentStore.handleSizeChange"
    />
  </div>
</template>
<style scoped lang="scss">
.comment-main {
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

  .comment-header {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .comment-header-input {
      outline: none;
      font-family: 'YSHST', fangsong;
      border: 1px solid var(--main-color);
      border-radius: 5px;
      width: 340px;
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