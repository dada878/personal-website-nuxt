<template>
  <div class="blog-post">
    <div class="content">
      <p>最後更新日期 {{ date.replaceAll("/", " / ") }}</p>
      <div class="markdown" v-html="renderedContent"></div>
      <h2>推薦文章</h2>
      <div class="posts">
        <nuxt-link
          @click="clickRecommendation(post.id)"
          v-for="post in recommendation"
          :key="post.id"
          :to="`/blogs/${post.id}`"
          class="post"
        >
          <h2 class="title">{{ post.title }}</h2>
          <p class="description">{{ removeMarkdown(post.content) }}</p>
        </nuxt-link>
      </div>
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
const runtimeConfig = useRuntimeConfig();
const theme = ref(runtimeConfig.public.production_url + "/css/giscus-theme.css");

const blog = useBlogList().find(
  (item) => item.id === router.currentRoute.value.params.id
);

title.value = blog!.title;
content.value = blog!.content;
date.value = blog!.date;

useHead({
  title: title.value,
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
          {
            "@type": "ListItem",
            position: 2,
            name: title.value,
            item: `https://dada878.com/blogs/${blog!.id}`,
          },
        ],
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title.value,
        image: "https://dada878.com/logo.png",
        datePublished: new Date(date.value).toISOString(),
        dateModified: new Date(date.value).toISOString(),
        author: {
          "@type": "Person",
          name: "冰川",
          url: "https://dada878.com",
        },
      }),
    },
  ],
});

function removeMarkdown(str: string) {
  // remove links
  str = str.replace(/https?:\/\/\S+/g, "");
  str = str.replace(/http?:\/\/\S+/g, "");
  // remove titles
  str = str.replace(/#+.+/g, "");
  // remove symbols
  const symbols = ["#", "*", "_", "`", "!", "[", "]", "(", ")", "<", ">", "&", "/", "\\", "\n", "$"];
  for (const symbol of symbols) {
    str = str.replaceAll(symbol, "");
  }
  return str;
}

useSeoMeta({
  description: removeMarkdown(content.value).slice(0, 150),
  ogTitle: title.value + " - 冰川的個人網站",
  ogDescription: removeMarkdown(content.value).slice(0, 150),
  ogImage: "https://dada878.com/logo.png",
  ogUrl: () => `https://dada878.com/blogs/${blog!.id}`,
});

const renderer = md({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(mathjax)
  .use(highlight);

const recommendation = useSearch().query(title.value, 4, false).slice(1, 4);

const renderedContent = ref(renderer.render(content.value));

const gtm = useGtm() // auto-imported by the module

function clickRecommendation(id: string) {
  // console.log("triggered")
  gtm?.trackEvent({
    event: 'click-recommendation',
    category: 'recommendation',
    action: 'click',
    label: `Clicked recommendation post ${id}`,
    value: id,
    noninteraction: false,
  })
}

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
    .markdown > h2, h2 {
      border-left: 0.4rem solid #e0e2e967;
      padding-left: 0.5rem;
      margin-top: 2rem;
    }
    .markdown {
      img {
        max-width: 100%;
      }
      code:not(pre code) {
        background-color: #62687a9f;
        border-radius: 0.5rem;
        padding: 0.2rem;
        margin: 0rem;
      }
      blockquote {
        overflow-x: scroll;
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
      table,
      th,
      td {
        border: 1px solid #a3b4be8e;
        border-collapse: collapse;
        padding: 0.5rem;
      }
    }
  }
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .post {
    text-align: left;
    padding: 2rem;
    background-color: #47525e;
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
      border: none;
      padding: 0;
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
      background-color: #47525ea8;
      outline: 1px solid #c6cad657;
    }
  }
}
</style>
