<template>
    <PageNavbar></PageNavbar>
    <div class="page">
        <div class="content">
            <h1>404 找不到這個頁面</h1>
            <h2>但你應該來玩玩看這個超酷的小遊戲</h2>
            <button @click="click" class="start-game">開始遊戲</button>
        </div>
    </div>
    
</template>
<script lang="ts" setup>
function click() {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", '_blank');
}
useHead({
    title: `找不到這個頁面 | 冰川的個人網站`,
    htmlAttrs: { lang: 'zh-tw' },
    meta: [
        {
            hid: "description",
            name: "description",
            content: `404 - 找不到這個頁面`,
        },
        {
            property: "og:title",
            content: `找不到這個頁面 | 冰川的個人網站`,
        },
        {
            property: "og:description",
            content: `404 - 找不到這個頁面`,
        },
        {
            property: "og:image",
            content: "https://dada878.com/logo.png",
        },
    ],
});
</script>
<style lang="scss" scoped>
.page {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.start-game {
    background-color: #687480;
    color: #e0e2e9;
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 200ms;
    &:hover {
        background-color: #78838d;
    }
}
</style>