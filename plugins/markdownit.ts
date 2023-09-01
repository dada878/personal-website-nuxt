import md from "markdown-it";

export default defineNuxtPlugin(() => {
  const renderer = md({
    html: true,
    linkify: true,
    typographer: true
  });
  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});