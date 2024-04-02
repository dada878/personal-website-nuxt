<template>
  <div class="blog-post">
    <div class="content markdown">
      <p>最後更新日期 {{ date.replaceAll("/", " / ") }}</p>
      <div class="markdown" v-html="renderedContent"></div>
      <h2>推薦文章</h2>
      <div class="recommendation-posts">
        <BlogPost
          @click="clickRecommendation(post.id)"
          v-for="post in recommendation"
          :key="post.id"
          :post="post"
          class="recommendation"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import md from "markdown-it";
import mathjax from "markdown-it-mathjax3";
import highlight from "markdown-it-highlightjs";
import BlogPost from "~/components/blogs/BlogPost.vue";
import "@/styles/markdown.scss";
import "highlight.js/styles/nord.css";

const router = useRouter();
const title = ref("");
const content = ref("");
const date = ref("");

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

const gtm = useGtm()

function clickRecommendation(id: string) {
  gtm?.trackEvent({
    event: `click-recommendation`,
    category: 'recommendation',
    action: 'click',
    label: `Clicked recommendation post ${id}`,
    value: id,
  })
}

</script>

<style lang="scss" scoped>
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
  }
}

.recommendation-posts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>