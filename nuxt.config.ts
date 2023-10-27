// https://nuxt.com/docs/api/configuration/nuxt-config
import blogs from "./content/blogs.json";
import projects from "./content/projects.json";
import { SitemapEntryInput } from "nuxt-simple-sitemap/dist/runtime/types";

export default defineNuxtConfig({
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
  modules: ["nuxt-simple-sitemap", "nuxt-simple-robots"],
  site: {
    url: "https://dada878.com",
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
  }
});
