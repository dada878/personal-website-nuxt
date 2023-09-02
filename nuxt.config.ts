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
  generate: {
    routes: blogs.map((item) => `/blogs/${item.id}`),
  },
});