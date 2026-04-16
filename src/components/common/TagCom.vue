<script setup lang="ts">
const props = defineProps<{
  tag: string
}>()
const emit = defineEmits(['toClick'])
const handleClick = (e: any) => {
  emit('toClick', e)
}
</script>

<template>
  <div @click="handleClick" class="tag-main">
    <slot name="icon"/>
    <span>{{ props.tag }}</span>
  </div>
</template>

<style scoped lang="scss">
.tag-main {
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: var(--default-color);
  span {
    margin-left: 5px;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>