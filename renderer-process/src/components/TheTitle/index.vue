<template>
    <h1>{{ title }}</h1>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('QLIP BOARD');
</script>

<style scoped>
h1 {
    margin: 0;
    text-align: center;
    color: var(--mainColor);
    font-weight: 900;
    font-size: 45px;
    text-shadow: -2px -2px 4px #ffffff, 2px 2px 4px #aeaec0;
}
</style>
