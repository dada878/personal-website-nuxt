<template>
  <div class="banner">
    <div>
      <h1 class="title">冰川的網站</h1>
      <h2 class="subtitle">從零親手打造的小網站</h2>
    </div>
    <div class="links">
      <a
        target="_blank"
        href="https://github.com/dada878"
        aria-label="github link"
      >
        <font-awesome-icon icon="fa-brands fa-github" />
      </a>
      <a
        target="_blank"
        href="https://discordapp.com/users/611118369474740244/"
        aria-label="discord link"
      >
        <font-awesome-icon icon="fa-brands fa-discord" />
      </a>
      <a
        target="_blank"
        href="mailto:xx0932399@gmail.com"
        aria-label="gmail link"
      >
      <font-awesome-icon icon="fa-solid fa-envelope" />
    </a>
      <a
        target="_blank"
        href="https://www.youtube.com/channel/UCoIyvDVUbE-9g6A7AtL7aBQ"
        aria-label="youtube link"
      >
        <font-awesome-icon icon="fa-brands fa-youtube" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord, faYoutube } from "@fortawesome/free-brands-svg-icons";
library.add(faGithub, faDiscord, faEnvelope, faYoutube);
</script>

<style scoped lang="scss">
.banner {
  background-image: linear-gradient(60deg, #29323c 0%, #415366 100%);
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .title {
    opacity: 0;
    animation: fade-in 700ms 0s forwards;
    font-weight: bold;
    font-size: calc(2.5rem + 2vw);
    margin: 0rem;
  }

  .subtitle {
    font-weight: 400;
    animation: fade-in 700ms 0.5s forwards;
    font-size: calc(1rem + 1vw);
    margin: 0rem;
    opacity: 0;
  }

  .links {
    animation: fade-in 700ms 1s forwards;
    background-color: #ffffff10;
    border-radius: 1rem;
    backdrop-filter: blur(1rem);
    padding: 1rem;
    display: flex;
    gap: 2rem;
    opacity: 0;
    margin-bottom: 3rem;
    a {
      &:nth-child(1) {
        animation: fade-in 700ms 1.2s forwards;
      }
      &:nth-child(2) {
        animation: fade-in 700ms 1.4s forwards;
      }
      &:nth-child(3) {
        animation: fade-in 700ms 1.6s forwards;
      }
      &:nth-child(4) {
        animation: fade-in 700ms 1.8s forwards;
      }
      color: #dfe1e8;
      opacity: 0;
    }
    svg {
      opacity: 0.5;
      font-size: 3rem;
      transition: 300ms;
      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
  }
}
</style>
