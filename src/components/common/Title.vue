<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="title">{{ props.title }}</div>
</template>

<style scoped lang="scss">
.title {
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: var(--main-color);
}
</style>