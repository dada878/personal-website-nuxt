// https://nuxt.com/docs/api/configuration/nuxt-config
import blogs from "./content/blogs.json";
import projects from "./content/projects.json";
import { installNuxtSiteConfig, updateSiteConfig } from 'nuxt-site-config-kit'
import { SitemapEntryInput } from "nuxt-simple-sitemap/dist/runtime/types";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      base_url: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://dada878.com',
      production_url: 'https://dada878.com',
    }
  },
  async setup(options) {
    await installNuxtSiteConfig()
  },
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => ['giscus-widget'].includes(tag),
    },
  },
  devtools: { enabled: true },
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  build: {
    transpile: [
      "@fortawesome/vue-fontawesome",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/pro-solid-svg-icons",
      "@fortawesome/pro-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
  modules: ["nuxt-simple-sitemap", "nuxt-simple-robots", "nuxt-schema-org", "nuxt-seo-ui"],
  site: {
    name: "冰川的個人網站",
    url: "https://dada878.com",
    defaultLocale: 'tw',
    trailingSlash: false,
    titleSeparator: '|',
    indexable: process.env.NODE_ENV === 'production',
    description: "歡迎來到冰川的個人網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
  },
  sitemap: {
    urls: async () => {
      return blogs.map((page) => ({
        loc: `/blogs/${page.id}`,
        lastmod: Date().toString(),
        changefreq: "daily",
        priority: 0.8,
      })).concat(projects.map((page) => ({
        loc: `/projects/${page.id}`,
        lastmod: Date().toString(),
        changefreq: "daily",
        priority: 0.8,
      }))) as SitemapEntryInput[];
    },
  },
  generate: {
    routes: [
      "/blogs",
      "/projects",
      ...blogs.map((item) => `/blogs/${item.id}`),
      ...projects.map((item) => `/projects/${item.id}`),
    ],
  },
  robots: {
    allow: "/",
    disallow: ['/blogs', '/projects'],
  },
});