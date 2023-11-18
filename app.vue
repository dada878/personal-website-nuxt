<template>
  <NuxtLoadingIndicator color="#6ba2db" :throttle="0" :height="3" />
  <div>
    <PageNavbar />
    <NuxtPage />
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "首頁",
  titleTemplate: (title: string) => (title ? `${title} - 冰川的個人網站` : '冰川的個人網站'),
  htmlAttrs: { lang: "zh-TW" },
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    }
  ]
});

useSeoMeta({
  description: "歡迎來到冰川的個人網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
  ogTitle: "冰川的個人網站",
  ogDescription: "歡迎來到冰川的個人網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
  ogUrl: "https://dada878.com",
  ogImage: "https://dada878.com/logo.png",
});

useSchemaOrg([
  definePerson({
    name: '冰川'
  }),
  defineWebSite({
    name: '冰川的個人網站',
  }),
  defineWebPage(),
]);
</script>

<style lang="scss">

.page-container {
  padding: 2rem calc(20vw + 1rem);
  font-size: calc(0.8rem + 0.2vw);
  @media (max-width: 768px) {
    padding: 2rem 2rem;
  }
}

.markdown {
  letter-spacing: 0.07em;
  p {
    line-height: 1.6rem;
  }
  pre > code {
    letter-spacing: normal;
    line-height: 1.3rem
  }
}

* {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #47525e;
  overflow-y: overlay;
  font-family: Tahoma, Helvetica, Arial, "Microsoft Yahei", STXihei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e0e2e9;
  min-height: 100vh;
  position: relative;
  padding-bottom: 3rem;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #a8a8a818;
}

::-webkit-scrollbar-thumb {
  background: rgba(214, 214, 214, 0.377);
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(214, 214, 214, 0.541);
}
</style>