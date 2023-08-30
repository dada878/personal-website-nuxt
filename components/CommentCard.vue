<template>
    <div class="comment">
        <h4>{{ username }}</h4>
        <p>{{ message }}</p>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps(["message", "username"]);
</script>
<style lang="scss" scoped>
.comment {
    background-color: #47525e;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;
    justify-content: center;
    p {
        flex: 1;
        margin: 1rem;
    }
    h4 {
        margin: 1rem;
    }
}
</style>