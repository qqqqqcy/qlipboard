<template>
    <label for="searchInput">
        <input name="searchInput" type="Text" v-model="searchValue" placeholder="Search">
    </label>
    {{searchValue}}
</template>

<script setup>
import { ref } from 'vue';

const searchValue = ref('');
</script>

<style scoped>
    input {
        margin-bottom: 1em;
        box-sizing: border-box;
        width: 100%;
        height: 2.4em;
        padding-left: 1em;
        border-radius: var(--radius);
        border: .5px solid #ddd;
        color: #333;
    }
    input:focus {
        outline: none;
    }
</style>
