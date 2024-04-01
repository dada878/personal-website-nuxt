<template>
  <nuxt-link :to="'/blogs/' + props.post.id" class="post">
    <h2 class="title">{{ props.post.title }}</h2>
    <p class="description">{{ removeMarkdown(props.post.content) }}</p>
    <span v-if="post.category" class="tag"
      ><font-awesome-icon icon="fa-tag" /> {{ props.post.category }}</span
    >
  </nuxt-link>
</template>

<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag } from "@fortawesome/free-solid-svg-icons";
library.add(faTag);

const props = defineProps<{
  post: Post;
}>();
</script>

<style lang="scss" scoped>
.post {
  text-align: left;
  padding: 2rem;
  background-color: #364049;
  color: inherit;
  text-decoration: none;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: 200ms;
  outline: 1px solid #c6cad600;
  .title {
    margin: 0rem;
  }

  .description {
    margin: 0rem;
    color: #c6cad6b6;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .tag {
    color: #c6cad6b6;
  }

  &:hover {
    cursor: pointer;
    background-color: #364049b0;
    outline: 1px solid #c6cad657;
  }
}
</style>
