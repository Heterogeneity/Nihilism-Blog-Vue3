<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  title: string
  value: string
  type: string
  arr: any[]
}>()

const emit = defineEmits(['sendData'])
const handleClick = (val: any, type: any) => {
  emit('sendData', val, type)
}
</script>

<template>
  <div class="sort-main">
    <div class="sort-list">
      <span>{{ props.title }}</span>
      <div v-show="props.type!=='order'&&props.type!=='sort'" :class="{'sort-item':true,'active':props.value===''}"
           @click="handleClick('',props.type)">
        默认
      </div>
      <div v-if="props.type==='category' || props.type==='tag'"
           :class="{'sort-item':true,'active':props.value===Object.values(item)[0]}"
           @click="handleClick(Object.values(item)[0],props.type)" v-for="item in arr">
        {{ Object.values(item)[0] }}
      </div>
      <div v-else :class="{'sort-item':true,'active':props.value===Object.values(item)[1]}"
           @click="handleClick(Object.values(item)[1],props.type)" v-for="item in arr">
        {{ Object.values(item)[0] }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sort-list {
  margin-top: 10px;
  display: flex;
  align-items: center;

  span {
    color: var(--default-color);
  }

  .sort-item {
    color: var(--text-color);
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
    transition: all .5s ease-in-out;
    margin-left: 10px;

    &:hover {
      background-color: var(--main-color);
      color: var(--select-text-color);
    }
  }

  .active {
    background-color: var(--main-color);
    color: var(--select-text-color);
  }
}
</style>