<template>
  <div class="blog">
    <div class="posts">
      <article
        @click="goBlogPost(post.id)"
        class="post"
        v-for="post in blogList"
        :key="post.id"
      >
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
      </article>
    </div>
  </div>
</template>
<style lang="scss">
.blog {
  margin-top: 3rem;
  padding: 2rem calc(20vw + 1rem);
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
      h1 {
        margin: 0rem;
      }

      p {
        margin: 0rem;
        color: #c6cad6b6;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &:hover {
        cursor: pointer;
        background-color: #364049b0;
        outline: 1px solid #c6cad657;
      }
    }
  }
}
</style>
<script lang="ts" setup>
interface Post {
  id: string;
  title: string;
  content: string;
}

const blogList: Ref<Array<Post>> = ref([]);

onMounted(() => {
  useBlogList().then((res) => {
    blogList.value = res;
  });
});

const router = useRouter();

const goBlogPost = (id: string) => {
  router.push(`/blogs/${id}`);
};
</script>
