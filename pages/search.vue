<template>
  <div class="page-container">
    <h1 v-if="searchResult.length" class="search-result-title">總共找到 {{ searchResult.length }} 筆 {{query}} 的搜尋結果 ヽ( ° ▽°)ノ</h1>
    <h1 v-else class="search-result-title">找不到任何結果 ٩(ŏ﹏ŏ、)۶</h1>
    <div class="posts">
      <article class="post" v-for="post in searchResult" :key="post.id" @click="goBlogPost(post.id)">
        <h2 class="title">{{ post.title }}</h2>
        <p class="description">{{ post.content }}</p>
        <span v-if="post.category" class="tag"
          ><font-awesome-icon icon="fa-tag" /> {{ post.category }}</span
        >
      </article>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag } from "@fortawesome/free-solid-svg-icons";
library.add(faTag);
const query = useRoute().query.q as string;
const searchResult = useSearch().query(query, 10, true);
const router = useRouter();
const goBlogPost = (id: string) => {
  router.push(`/blogs/${id}`);
};
useHead({
  title: `${query} 的搜尋結果 | 冰川的個人網站`,
  htmlAttrs: { lang: 'zh-tw' },
  meta: [
    {
      hid: "description",
      name: "description",
      content: `發現了 ${searchResult.length} 筆關於 ${query} 的搜尋結果`,
    },
    {
      property: "og:title",
      content: `${query} 的搜尋結果 | 冰川的個人網站`,
    },
    {
      property: "og:description",
      content: `發現了 ${searchResult.length} 筆關於 ${query} 的搜尋結果`,
    },
    {
      property: "og:url",
      content: "https://dada878.com/search?q=" + query,
    },
    {
      property: "og:image",
      content: "https://dada878.com/logo.png",
    },
  ],
});
</script>
<style lang="scss" scoped>
.search-result-title {
  margin-top: 0rem;
  margin-bottom: 2rem;
}
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
