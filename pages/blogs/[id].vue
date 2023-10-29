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
import md from "markdown-it";
import mathjax from "markdown-it-mathjax3";
import highlight from "markdown-it-highlightjs";

const router = useRouter();
const title = ref("");
const content = ref("");
const date = ref("");

const blog = useBlogList().find(
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
      property: "og:url",
      content: "https://dada878.com/blogs/" + blog!.id,
    },
    {
      property: "og:image",
      content: "https://dada878.com/logo.png",
    },
    {
      property: "og:type",
      content: "article",
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
  .hljs-comment {
    color: #9eb8da8c;
  }
}

.blog-post {
  text-align: left;
  margin-left: 20%;
  margin-right: 20%;
  background-color: #364049b0;
  color: #e0e2e9e7;
  min-height: 100vh;
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
      code:not(pre code){
        background-color: #62687a9f;
        border-radius: 0.5rem;
        padding: 0.2rem;
        margin: 0rem;
      }
      blockquote {
        background-color: #62687a9f;
        border-radius: 0.5rem;
        padding: 1rem;
        margin: 0rem;
        position: relative;
        border-top: 0.5rem solid #e0e2e949;
        p {
          margin: 0rem;
        }
      }
      a {
        color: rgb(125, 205, 211);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      h1 {
        border-bottom: 2px solid #e0e2e967;
        padding-bottom: 1rem;
      }
      h2 {
        border-left: 0.4rem solid #e0e2e967;
        padding-left: 0.5rem;
        padding-top: 0.4rem;
        margin-top: 2rem;
      }
      table, th, td {
        border: 1px solid #a3b4be8e;
        border-collapse: collapse;
        padding: 0.5rem;
      }
    }
  }
}
</style>
