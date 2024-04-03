// https://nuxt.com/docs/api/configuration/nuxt-config
import blogs from "./content/blogs.json";
import { installNuxtSiteConfig } from "nuxt-site-config-kit";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      base_url:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : "https://dada878.com",
      production_url: "https://dada878.com",
      gtm: {
        id: "GTM-KLBPLFSQ",
        enabled: true,
        debug: true,
        devtools: true,
      },
    },
  },
  // @ts-ignore
  async setup(options) {
    await installNuxtSiteConfig()
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
  modules: [
    "nuxt-simple-robots",
    "nuxt-schema-org",
    "nuxt-seo-ui",
    "@zadigetvoltaire/nuxt-gtm",
    '@nuxtjs/sitemap'
  ],
  site: {
    name: "冰川的個人網站",
    url: "https://dada878.com",
    defaultLocale: "tw",
    trailingSlash: false,
    titleSeparator: "|",
    indexable: process.env.NODE_ENV === "production",
    description:
      "歡迎來到冰川的個人網站！你可以在這裡找到我的作品、部落格、以及聯絡方式～",
  },
  sitemap: {
    urls: async () => {
      return blogs.map((page) => ({
        loc: `/blogs/${page.id}`,
        lastmod: Date().toString(),
        changefreq: "daily",
        priority: 0.8,
      }));
    },
  },
  generate: {
    routes: [
      "/blogs",
      ...blogs.map((item) => `/blogs/${item.id}`),
    ],
  },
  robots: {
    allow: ["/blogs/*"],
    disallow: ["/blogs"],
  },
  imports: {
    dirs: ['types/*.ts'],
  },
});
