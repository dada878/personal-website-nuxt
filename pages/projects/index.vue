<template>
  <div class="page-container">
    <div class="projects">
      <article
        @click="goBlogPost(project.id)"
        class="project"
        v-for="project in projectList"
        :key="project.id"
      >
        <h1>{{ project.title }}</h1>
        <p>{{ project.content }}</p>

        <span v-if="project.category" class="tag"
          ><font-awesome-icon icon="fa-tag" /> {{ project.category }}</span
        >
      </article>
    </div>
  </div>
</template>
<style lang="scss">
.projects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .project {
    text-align: left;
    padding: 2rem;
    background-color: #364049;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: 200ms;
    outline: 1px solid #c6cad600;
    h1 {
      margin: 0rem;
    }

    p {
      margin: 0rem;
      color: #c6cad6b6;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .tag {
      color: #c6cad6b6;
    }

    &:hover {
      cursor: pointer;
      background-color: #364049b0;
      outline: 1px solid #c6cad657;
    }
  }
}
</style>
<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTag } from "@fortawesome/free-solid-svg-icons";
library.add(faTag);
interface Post {
  id: string;
  title: string;
  content: string;
  category: string | null;
}

const projectList: Ref<Array<Post>> = ref([]);

useProjectList().then((res) => {
  projectList.value = res;
});

const router = useRouter();

const goBlogPost = (id: string) => {
  router.push(`/projects/${id}`);
};
</script>
