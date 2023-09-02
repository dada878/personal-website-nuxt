<template>
  <div class="blog-post">
    <div class="content">
      <div id="markdown" v-html="$mdRenderer.render(content)"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";
import blogs from "@/blogs.json";

const router = useRouter();
const title = ref("");
const content = ref("");

const blogData = blogs.find(
  (item) => item.id === router.currentRoute.value.params.id
);

useHead({
  title: blogData!.title,
  meta: [
    {
      hid: "description",
      name: "description",
      content: blogData!.content.replaceAll("/n", " "),
    },
    {
      property: "og:title",
      content: blogData!.title,
    },
    {
      property: "og:description",
      content: blogData!.content.replaceAll("/n", " "),
    }
  ],
});

onMounted(() => {
  useBlogList().then((res) => {
    const blog = res.find(
      (item) => item.id === router.currentRoute.value.params.id
    );
    title.value = blog!.title;
    content.value = blog!.content;
  });
});

onUpdated(() => {
  hljs.configure({ ignoreUnescapedHTML: true });
  setTimeout(() => {
    for (const block of document.querySelectorAll("code")) {
      hljs.highlightElement(block);
    }
  }, 100);
});
</script>
<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/cascadia-code");
pre > code {
  border-radius: 0.5rem;
  * {
    font-family: "Cascadia Code", sans-serif;
    tab-size: 4;
  }
}
.blog-post {
  text-align: left;
  margin-left: 20%;
  margin-right: 20%;
  background-color: #364049b0;
  color: #e0e2e9cb;
  .content {
    padding: 3rem;
    padding-top: 3rem;
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
