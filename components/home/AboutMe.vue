<template>
  <div class="about-me">
    <HistoryCard class="about-card history"></HistoryCard>
    <AboutCard class="about-card about"></AboutCard>
    <SkillCard class="about-card skills"></SkillCard>
  </div>
</template>

<script lang="ts" setup>
import HistoryCard from "./HistoryCard.vue";
import AboutCard from "./AboutCard.vue";
import SkillCard from "./SkillCard.vue";
</script>

<style scoped lang="scss">
.about-card {
  animation: fade-up 700ms forwards;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0rem);
  }
}

.about-me {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 7rem;
  padding-right: 7rem;
}

.about-me > * {
  background-color: #364049;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow: hidden;
}

.about-me > h1 {
  font-weight: 400;
  font-size: calc(1rem + 1vw);
}

.history {
  grid-area: 1 / 1 / 5 / 3;
}

.about {
  grid-area: 1 / 3 / 3 / 6;
}

.skills {
  grid-area: 3 / 3 / 5 / 6;
}

@media screen and (max-width: 1165px) {
  .about-me {
    padding: 2rem;
  }
}

/* 手機 RWD */
@media screen and (max-width: 986px) {
  .about-me {
    display: block;
    padding: 2rem;
  }

  .about-me > * {
    margin-bottom: 2rem;
  }
}
</style>
