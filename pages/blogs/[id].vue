<template>
  <div class="blog-post">
    <div class="content">
      <div id="markdown" v-html="renderedContent"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";

const router = useRouter();
const title = ref("");
const content = ref("");

const blog = useBlogList().find(
  (item) => item.id === router.currentRoute.value.params.id
);

useHead({
  title: blog!.title + " - 冰川的個人網站",
  htmlAttrs: { lang: 'zh-tw' },
  meta: [
    {
      hid: "description",
      name: "description",
      content: blog!.content.replaceAll("/n", " "),
    },
    {
      property: "og:title",
      content: blog!.title + " - 冰川的個人網站",
    },
    {
      property: "og:description",
      content: blog!.content.replaceAll("/n", " "),
    },
    {
      property: "og:url",
      content: "https://dada878.tk/blogs/" + blog!.id,
    },
    {
      property: "og:image",
      content: "https://dada878.tk/logo.png",
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
    }
  ],
});

title.value = blog!.title;
content.value = blog!.content;

import md from "markdown-it";
import mathjax from "markdown-it-mathjax3";

const renderer = md({
  html: true,
  linkify: true,
  typographer: true
}).use(mathjax);

const renderedContent = ref(renderer.render(content.value));

onMounted(() => {
  hljs.configure({ ignoreUnescapedHTML: true });
  for (const block of document.querySelectorAll("code")) {
    hljs.highlightElement(block);
  }
});

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
  color: #e0e2e9cb;
  min-height: 100vh;
  .content {
    padding: 3rem;
    padding-top: 4rem;
    padding-bottom: 3rem;
    #markdown {
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
