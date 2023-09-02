import md from "markdown-it";
import mathjax from "markdown-it-mathjax3";

export default defineNuxtPlugin(() => {
  const renderer = md({
    html: true,
    linkify: true,
    typographer: true
  }).use(mathjax);
  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});