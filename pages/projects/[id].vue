<template>
  <div class="blog-post">
    <div class="content">
      <p>最後更新日期 {{ date.replaceAll("/", " / ") }}</p>
      <div class="markdown" v-html="renderedContent"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "highlight.js/styles/nord.css";

const router = useRouter();
const title = ref("");
const content = ref("");
const date = ref("");

const blog = useProjectList().find(
  (item) => item.id === router.currentRoute.value.params.id
);

useHead({
  title: blog!.title + " | 冰川的個人網站",
  htmlAttrs: { lang: 'zh-tw' },
  meta: [
    {
      hid: "description",
      name: "description",
      content: blog!.content.replaceAll("/n", " "),
    },
    {
      property: "og:title",
      content: blog!.title + " | 冰川的個人網站",
    },
    {
      property: "og:description",
      content: blog!.content.replaceAll("/n", " "),
    },
    {
      property: "og:image",
      content: "https://dada878.com/logo.png",
    },
    {
      property: "og:url",
      content: "https://dada878.com/projects/" + blog!.id,
    },
    {
      property: "article:author",
      content: "冰川",
    },
    {
      property: "article:section",
      content: blog!.category ?? "未分類",
    },
    {
      property: "article:tag",
      content: blog!.category ?? "未分類",
    },
    {
      name: "keywords",
      content: blog!.category ?? "未分類",
    },
  ],
});

title.value = blog!.title;
content.value = blog!.content;
date.value = blog!.date;

import md from "markdown-it";
import mathjax from "markdown-it-mathjax3";
import highlight from "markdown-it-highlightjs";

const renderer = md({
  html: true,
  linkify: true,
  typographer: true
}).use(mathjax).use(highlight);

const renderedContent = ref(renderer.render(content.value));

</script>
<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/cascadia-code");

pre > code {
  border-radius: 0.5rem;
  font-family: "Cascadia Code", sans-serif;
  tab-size: 4;
}

.blog-post {
  text-align: left;
  margin-left: 20%;
  margin-right: 20%;
  background-color: #364049b0;
  min-height: 100vh;
  color: #e0e2e9cb;
  @media (max-width: 768px) {
    margin-left: 0%;
    margin-right: 0%;
  }
  .content {
    padding: 3rem;
    padding-top: 1rem;
    padding-bottom: 3rem;
    @media (max-width: 768px) {
      padding: 1.5rem;
      padding-top: 0.5rem;
    }
    .markdown {
      img {
        max-width: 100%;
      }
      a {
        color: rgb(125, 205, 211);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
