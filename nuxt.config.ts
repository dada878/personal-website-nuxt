// https://nuxt.com/docs/api/configuration/nuxt-config
import blogs from './blogs.json';

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
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
    'nuxt-simple-sitemap'
  ],
  site: {
    url: 'https://dada878.tk',
  },
  sitemap: {
    urls: async () => {
      return blogs.map(page => ({
        loc: `/blog/${page.id}`,
        lastmod: Date().toString(),
        changefreq: 'daily',
        priority: 0.8,
      }))
    },
  },
  generate: {
    routes: blogs.map((item) => `/blogs/${item.id}`),
  }
});