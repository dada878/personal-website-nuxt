<template>
  <div class="project-container">
    <div v-for="project in projects" class="project-card" :key="project.id">
      <a target="_blank" :href="project.url">
        <img :src="project.image" alt="project image" />
        <p>{{ project.name }}</p>
        <div class="tech-stack">
          <font-awesome-icon
            v-for="item in project.techs"
            :icon="`fa-brands fa-${item}`"
            class="icon"
          />
        </div>
      </a>
    </div>
  </div>
</template>
<script setup>
import projects from "@/projects.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faDiscord,
  faYoutube,
  faReact,
  faVuejs,
  faHtml5,
  faCss3,
  faUnity,
  faJs,
} from "@fortawesome/free-brands-svg-icons";
library.add(
  faGithub,
  faDiscord,
  faYoutube,
  faReact,
  faVuejs,
  faHtml5,
  faCss3,
  faUnity,
  faJs
);
</script>
<style scoped lang="scss">
.project-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  margin-left: 2rem;
  margin-right: 2rem;

  .project-card {
    width: 300px;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #364049;
    color: #c6cad6;
    transition: 200ms;

    .tech-stack {
      display: flex;
      justify-content: center;
      gap: 0.7rem;
      
      .icon {
        padding: 0.5rem;
        border-radius: 1rem;
        color: #c6cad6;
        text-decoration: none;
        background-color: #46535e;
        aspect-ratio: 1 / 1;
      }
    }

    a {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    p {
      text-decoration: none;
      color: #c6cad6;
      margin: 0;
    }

    img {
      width: 100%;
      height: 170px;
      border-radius: 0.5rem;
      object-fit: cover;
    }

    &:hover {
      cursor: pointer;
      background-color: #364049b0;
    }
  }
}
</style>
