<template>
  <span class="category-item">{{ item }}</span>
</template>

<script lang="ts" setup>
defineProps<{
  item: string;
}>();

</script>
<style lang="scss" scoped>
.category-item {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #364049;
  color: #c6cad6;
  outline: 1px solid transparent;
  transition: 200ms;

  &:hover {
    cursor: pointer;
    outline: 1px solid rgba(198, 202, 214, 0.3411764706);
    background-color: #364049b0;
  }
}
</style>
