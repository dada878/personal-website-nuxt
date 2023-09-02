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
  
  const router = useRouter();
  const title = ref("");
  const content = ref("");
  
  const blogData = useProjectList().find(
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
      },
    ],
  });
  
  onMounted(() => {
    const blog = useProjectList().find(
      (item) => item.id === router.currentRoute.value.params.id
    );
    title.value = blog!.title;
    content.value = blog!.content;
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
      padding-top: 4rem;
      padding-bottom: 3rem;
      @media (max-width: 768px) {
        padding: 1.5rem;
        padding-top: 0.5rem;

      }
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
  