<template>
  <div class="search-section">
    <a class="logo" href="/">
      <img alt="logo" class="logo-img" src="/logo-circle.png" />
    </a>
    <div class="search-block">
      <input
        @keydown.enter="goSearchPage"
        @focus="updateSearchResult"
        @input="updateSearchResult"
        class="search-input"
        type="text"
        placeholder="搜尋文章..."
      />
      <font-awesome-icon @click="toggleSearchBar" class="search-icon" icon="fa-solid fa-search" />
      <div class="suggestion-box">
        <a
          class="suggestion-item"
          v-for="page in searchResult"
          :href="page.url"
          :key="page.title"
        >
          {{ page.title }}
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

let isSearchBarOpened = false;
let searchBarOpacity = ref(0);
let searchBarPointerEvent = ref("none");

function toggleSearchBar() {
  isSearchBarOpened = !isSearchBarOpened;
  searchBarOpacity.value = isSearchBarOpened == true ? 1 : 0;
  searchBarPointerEvent.value = isSearchBarOpened == true ? "all" : "none";
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string | null;
  url: string;
  date: string;
}

const searchResult: Ref<Array<Post>> = ref([]);

function goSearchPage(event: KeyboardEvent) {
  const keyword = (event.target as HTMLInputElement).value;
  if (keyword.length > 0) {
    window.location.href = `/search?q=${keyword}`;
  }
}

function updateSearchResult(event: Event) {
  const keyword = (event.target as HTMLInputElement).value;
  searchResult.value = useSearch().query(keyword);
}
</script>
<style lang="scss" scoped>
.logo {
  margin-right: 0.2rem;
  vertical-align: middle;
}
.logo-img {
  @media (max-width: 800px) {
    display: none;
  }
  padding: 0.2rem;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  vertical-align: middle;
  opacity: 0.8;
  filter: grayscale(10%);
  transition: 200ms;
  &:hover {
    opacity: 1;
    filter: grayscale(0%);
  }
}
.suggestion-box {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #707a85;
  border-radius: 0.5rem;
  padding: 0rem 0.5rem;
  opacity: 0;
  pointer-events: none;
  transition: 200ms;
  a {
    text-decoration: none;
    display: block;
    margin: 0.5rem 0rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: rgb(95, 103, 113);
    color: #dfe1e8;
    transition: 200ms;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 800px) {
    position: fixed;
    top: 6.33rem;
  }
}
.search-block:focus-within .suggestion-box {
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  opacity: 1;
  pointer-events: all;
}
.search-block:focus-within .search-input {
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  @media (max-width: 800px) {
    border-radius: 0;
  }
}
.search-section {
  display: flex;
  justify-content: left;
  align-items: center;
}
.search-block {
  position: relative;
}
.search-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(1rem);
  right: 1rem;
  color: #dfe1e8;
  opacity: 0;
  transition: 200ms;
  @media (max-width: 800px) {
    transform: translateY(-50%) translateX(300%);
    display: block;
    opacity: 1;
  }
}
.search-block:focus-within .search-icon,
.search-block:hover .search-icon {
  transform: translateY(-50%) translateX(0rem);
  cursor: pointer;
  opacity: 1;
  @media (max-width: 800px) {
    transform: translateY(-50%) translateX(300%);
    display: block;
    opacity: 1;
  }
}
.search-input {
  background-color: #707a85;
  opacity: 0.7;
  border-radius: 1rem;
  border: none;
  padding: 0.8rem;
  margin: auto;
  outline: none;
  color: #dfe1e8;
  transition: 300ms;
  width: 15rem;
  &::placeholder {
    color: #dfe1e8;
  }
  &:hover,
  &:focus {
    opacity: 1;
    @media (max-width: 800px) {
      opacity: v-bind(searchBarOpacity);
    }
  }
  @media (max-width: 800px) {
    opacity: v-bind(searchBarOpacity);
    pointer-events: v-bind(searchBarPointerEvent);
    position: fixed;
    border-radius: 0;
    top: 3.33rem;
    height: 3rem;
    width: 100%;
    left: 0rem;
    right: 0;
  }
}
</style>
