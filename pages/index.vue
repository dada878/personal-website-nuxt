<template>
  <section>
    <HomeBanner />
    <AboutMe></AboutMe>
  </section>
</template>

<script lang="ts" setup>
import AboutMe from '@/components/AboutMe.vue';
import HomeBanner from '@/components/HomeBanner.vue';

useHead({
  title: "冰川的個人網站",
  htmlAttrs: { lang: 'zh-tw' },
  meta: [
    {
      hid: "description",
      name: "description",
      content: "歡迎來到我的網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
    },
    {
      property: "og:title",
      content: "冰川的個人網站",
    },
    {
      property: "og:description",
      content: "歡迎來到我的網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
    },
    {
      property: "og:url",
      content: "https://dada878.tk",
    },
    {
      property: "og:image",
      content: "https://dada878.tk/logo.png",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});

</script>

<style lang="scss">

</style>