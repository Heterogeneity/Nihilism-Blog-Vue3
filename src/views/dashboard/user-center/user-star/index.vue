<script setup lang="ts">
import {onMounted} from "vue";
import Title from "@/components/common/Title.vue";
import Button from "@/components/common/Button.vue";
import {Close, Promotion} from "@element-plus/icons-vue";
import {useCollectionStore} from "@/stores/collection.ts";

const collectionStore = useCollectionStore()

onMounted(() => {
  collectionStore.getCollectionList()
})
</script>

<template>
  <div class="collection-main">
    <Title title="我的收藏"/>
    <div class="collection-header">
      <el-pagination
          popper-class="item-pagination"
          style="margin-left: 20px;display: flex;justify-content: center;"
          :current-page="collectionStore.state.page"
          :page-size="collectionStore.state.page_size"
          :page-sizes="[10, 30, 50, 100]"
          :total="collectionStore.state.total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="collectionStore.handleCurrentChange"
          @size-change="collectionStore.handleSizeChange"
      />
    </div>
    <div class="table">
      <table style="width: 100%;">
        <thead>
        <tr>
          <th style="width: 50px;">封面</th>
          <th>标题</th>
          <th>类别</th>
          <th>标签</th>
          <th>简介</th>
          <th>发布时间</th>
          <th>更新时间</th>
          <th style="width: 160px;">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="item in collectionStore.collectionList" :key="item._id">
          <tr>
            <td>
              <el-image style="height: 50px;border-radius: 10px;" :src="item._source.cover" alt=""/>
            </td>
            <td>{{ item._source.title }}</td>
            <td>{{ item._source.category }}</td>
            <td>
              <div style="display: flex;flex-wrap: wrap;justify-content: center;">
                <div class="article-tag" v-for="tag in item._source.tags">{{ tag }}</div>
              </div>
            </td>
            <td>{{ item._source.abstract }}</td>
            <td>{{ item._source.created_at }}</td>
            <td>{{ item._source.updated_at }}</td>
            <td>
              <div style="display: flex;justify-content: center;">
                <Button title="前往文章" @ToClick="collectionStore.openUrl(item._id)">
                  <template #icon>
                    <el-icon>
                      <Promotion/>
                    </el-icon>
                  </template>
                </Button>
                <Button title="取消收藏" @ToClick="collectionStore.cancelCollect(item._id)">
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

  </div>
</template>
<style scoped lang="scss">
.collection-main {
  padding: 20px;

  .article-tag {
    font-size: .7rem;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--main-color);
  }

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

  .collection-header {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;

    .collection-header-input {
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