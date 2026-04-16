<script setup lang="ts">
const props = defineProps<{
  title: string,
}>()

const emit = defineEmits(['ToClick'])
const handleClick = (e: any) => {
  emit('ToClick', e)
}
</script>

<template>
  <div class="button-main">
    <button type="button" @click="handleClick" class="button" :title="props.title">
      <slot name="icon"/>
      <span>{{ props.title }}</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.button-main{
  margin-left: 10px;
}
.button {
  max-width: 120px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--main-color);
  color: var(--main-color);
  background-color: transparent;
  font-weight: bold;
  font-family: 'YSHST', fangsong;
  transition: all .5s ease;

  span {
    margin-left: 5px;
  }

  &:hover {
    color: var(--select-text-color);
    background-color: var(--main-color);
  }
}
</style>