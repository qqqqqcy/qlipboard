<template>
    <h1>{{title}}</h1>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('QLIP BOARD');
</script>

<style scoped>
    h1 {
        text-align: center;
        color: #fff;
        font-weight: 100;
        text-shadow: 1px 1px 3px darkslategray;
    }
</style>
