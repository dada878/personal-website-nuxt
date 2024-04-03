<template>
  <section class="about">
    <h2>關於</h2>
    <p>
      {{ greeting }}我是一個
      <ClientOnly placeholder="00.0000000000"> {{ currentAge }} </ClientOnly>
      歲的人類
    </p>
    <p>近期正在學習各種演算法與資料結構</p>
    <p>這是使用 Vue / Nuxt 建立的個人網站</p>
    <p>未來希望可以在這裡放更多文章和作品</p>
    <p>目前 Codeforces Rating: {{ rating }}</p>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

function calculateAge() {
  const birthday: Date = new Date(2007, 0, 22);
  const today: Date = new Date();
  const ageInMilliseconds: number = today.getTime() - birthday.getTime();
  const age = (ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)).toFixed(10);
  return age;
}

const greeting = ref("");
const currentHour = new Date().getHours();
const currentAge: Ref<string> = ref(calculateAge());
const rating = ref(0);

onMounted(() => {
  setInterval(() => {
    currentAge.value = calculateAge();
  }, 1);
});

if (currentHour > 4 && currentHour < 12) {
  greeting.value = "早安";
} else if (currentHour >= 12 && currentHour < 16) {
  greeting.value = "午安";
} else {
  greeting.value = "晚上好";
}

fetch("https://codeforces.com/api/user.info?handles=dada878")
  .then((res) => res.json())
  .then((res) => {
    rating.value = res.result[0].rating;
  });
</script>

<style lang="scss" scoped>
.about {
  padding-bottom: 2rem;
}
</style>
