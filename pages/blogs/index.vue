<template>
  <div class="page-container">
    <div class="posts">
      <article
        @click="goBlogPost(post.id)"
        class="post"
        v-for="post in blogList"
        :key="post.id"
      >
        <h2 class="title">{{ post.title }}</h2>
        <p class="description">{{ post.content }}</p>

        <span v-if="post.category" class="tag"
          ><font-awesome-icon icon="fa-tag" /> {{ post.category }}</span
        >
      </article>
    </div>
  </div>
</template>
<style lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .post {
    text-align: left;
    padding: 2rem;
    background-color: #364049;
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
}
</style>
<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag } from "@fortawesome/free-solid-svg-icons";
library.add(faTag);
interface Post {
  id: string;
  title: string;
  content: string;
  category: string | null;
}

const blogList: Ref<Array<Post>> = ref([]);

blogList.value = useBlogList();

const router = useRouter();

const goBlogPost = (id: string) => {
  router.push(`/blogs/${id}`);
};
</script>
