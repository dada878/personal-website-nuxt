<template>
  <div>
    <PageNavbar></PageNavbar>
    <router-view :class="{ router: $route.path !== '/' }" />
    <PageFooter></PageFooter>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">

.page-container {
  padding: 2rem calc(20vw + 1rem);
  font-size: calc(0.8rem + 0.2vw);
  @media (max-width: 768px) {
    padding: 2rem 2rem;
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
