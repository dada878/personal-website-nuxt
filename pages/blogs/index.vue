<template>
  <div class="page-container">
    <div class="categories">
      <span @click="goCategory(item)" class="category-item" v-for="item in categories">{{ item }}</span>
    </div>
    <div class="posts">
        <nuxt-link
          :to="'/blogs/' + post.id"
          class="post"
          v-for="post in blogList"
          :key="post.id"
        >
          <h2 class="title">{{ post.title }}</h2>
          <p class="description">{{ removeMarkdown(post.content) }}</p>
          <span v-if="post.category" class="tag"
            ><font-awesome-icon icon="fa-tag" /> {{ post.category }}</span
          >
        </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag } from "@fortawesome/free-solid-svg-icons";
// import { Post } from"@/types/post";
library.add(faTag);

useHead({
  title: "部落格",
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "部落格",
            item: "https://dada878.com/blogs",
          },
        ],
      }),
    },
  ],
});

useSeoMeta({
  description: "你可以在這裡找到我的部落格文章 ><",
  ogTitle: "部落格 - 冰川的個人網站",
  ogDescription: "你可以在這裡找到我的部落格文章 ><",
  ogImage: "https://dada878.com/logo.png",
  ogUrl: () => `https://dada878.com/blogs`,
});

const blogList: Ref<Array<Post>> = ref([]);
const router = useRouter();

function goCategory(category: string) {
  if (category === "All") {
    router.push(`/blogs`);
  } else {
    router.push(`/blogs?category=${category}`);
  }
  updateRenderResult(category);
}

function updateRenderResult(category: string) {
  if (category === "All") {
    category = "";
  }
  blogList.value = useBlogList().filter((post) => {
    if (category) {
      return post.category === category;
    } else {
      return true;
    }
  }).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

updateRenderResult(useRoute().query.category as string);

const categories = ref(["All", ...new Set(useBlogList().map((post) => post.category))]);

</script>
<style lang="scss" scoped>
.categories {
  overflow-x: scroll;
  display: flex;
  margin-top: -1rem;
  margin-bottom: 1rem;
  padding: 0.1rem;
  gap: 1rem;
  scrollbar-width: none;
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
  &::-webkit-scrollbar {
    display: none;
  }
}
.posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
}
</style>