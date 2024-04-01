<template>
  <div class="breadcrumb">
    <nuxt-link to="/">首頁</nuxt-link>
    <span v-for="(item, index) in breadcrumb" :key="index" :to="`${item.path}`">
      <span class="split-line"> / </span>
      <nuxt-link :to="`/${item.path}`">{{ item.name }}</nuxt-link>
    </span>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const breadcrumbs = ref(
  router.currentRoute.value.path.split("/").filter((item) => item !== "")
);
const breadcrumbNameMap: Map<string, string> = new Map<string, string>();
const breadcrumb = computed(() => {
  const sliced = breadcrumbs.value.slice(0, breadcrumbs.value.length - 1);
  const result = [];
  for (let i = 0; i < sliced.length; i++) {
    result.push({
      name: breadcrumbNameMap.get(sliced[i]) ?? sliced[i],
      path: sliced.slice(0, i + 1).join("/"),
    });
  }
  return result;
});

breadcrumbNameMap.set("blogs", "部落格");
</script>
<style lang="scss" scoped>
.breadcrumb {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  .split-line {
    color: rgba(180, 183, 194, 0.796);
  }
  a {
    color: rgba(224, 226, 233, 0.7960784314);
    text-decoration: none;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
