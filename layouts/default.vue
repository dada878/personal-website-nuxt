<template>
  <div>
    <SpeedInsights />
    <PageNavbar />
    <slot />
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import PageNavbar from "@/components/layout/PageNavbar.vue";
import PageFooter from "@/components/layout/PageFooter.vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
</script>