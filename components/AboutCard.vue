<template>
    <section class="about">
        <h1>關於</h1>
        <p>{{greeting}}我是一個人類</p>
        <p>目前年齡 {{currentAge}} 歲</p>
        <p>擅長網頁前端開發與 Python 網路爬蟲</p>
        <p>近期正在學習各種演算法與資料結構</p>
        <p>這是使用 Vue 建立的網站</p>
        <p>未來希望可以在這裡放更多文章和作品</p>
    </section>
</template>
<script lang="ts" setup>

import { Ref, ref } from "vue";

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

setInterval(() => {
  currentAge.value = calculateAge();
}, 1);

if (currentHour > 4 && currentHour < 12) {
    greeting.value = "早安";
} else if (currentHour >= 12 && currentHour < 16) {
    greeting.value = "午安";
} else {
    greeting.value = "晚上好";
}

</script>
<style lang="scss" scoped>
.about {
    padding-bottom: 2rem;
}
</style>