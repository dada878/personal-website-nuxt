<template>
  <section class="skills">
    <h2>技能</h2>
    <div class="skill-cards">
      <div>
        <font-awesome-icon icon="fa-brands fa-python" />
        <p class="skill-name">Python 3 年</p>
        <button>查看相關作品</button>
      </div>
      <div>
        <font-awesome-icon icon="fa-brands fa-html5" />
        <p class="skill-name">網頁前端 3 年</p>
        <button>查看相關作品</button>
      </div>
      <div>
        <font-awesome-icon icon="fa-brands fa-unity" />
        <p class="skill-name">遊戲開發 1 年</p>
        <button>查看相關作品</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faDiscord,
  faHtml5,
  faUnity,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
library.add(faGithub, faDiscord, faHtml5, faUnity, faPython);
</script>

<style lang="scss" scoped>
.skills {
  .skill-cards {
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    align-items: stretch;
    gap: 1rem;

    .skill-name {
      margin: 0rem;
      font-size: 1.17rem;
      font-weight: bold;
    }

    div {
      flex: 1;
      background-color: #47525e;
      border-radius: 1rem;
      padding: 1rem;
      padding-top: 2rem;
      height: 100%;

      button {
        background-color: #626d79;
        border-radius: 0.3rem;
        border: none;
        padding: 0.5rem;
        margin-top: 1rem;
        width: 100%;
        color: inherit;
        transition: 200ms;

        &:hover {
          background-color: #6f7a86;
          cursor: pointer;
        }
      }

      svg {
        font-size: 5rem;
        margin-bottom: 1rem;
      }
    }
  }

  @media screen and (max-width: 630px) {
    .skill-cards {
      flex-direction: column;
      gap: 1rem;

      div {
        height: auto;
      }
    }
  }
}
</style>