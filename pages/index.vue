<template>
  <section>
    <HomeBanner />
    <AboutMe></AboutMe>
  </section>
</template>

<script lang="ts" setup>
import AboutMe from "@/components/home/AboutMe.vue";
import HomeBanner from "@/components/home/HomeBanner.vue";

useHead({
  title: "冰川的個人網站",
  htmlAttrs: { lang: "zh-tw" },
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "歡迎來到我的網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
    },
    {
      property: "og:title",
      content: "冰川的個人網站",
    },
    {
      property: "og:description",
      content:
        "歡迎來到我的網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
    },
    {
      property: "og:url",
      content: "https://dada878.com",
    },
    {
      property: "og:image",
      content: "https://dada878.com/logo.png",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "keywords",
      content: "冰川, dada878, Dada878, 冰川的個人網站, 冰川網站",
    },
  ],
});
</script>