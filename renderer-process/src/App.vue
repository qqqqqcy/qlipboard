<template>
  <TheTitle/>
  <!-- <SearchInput/> -->
  <HistoryList/>
</template>

<script setup>
import TheTitle from './components/TheTitle/index.vue';
// import SearchInput from './components/SearchInput/index.vue';
import HistoryList from './components/HistoryList/index.vue';

</script>

<style>
  body {
    --radius: 5px;
    background-color: rgba(255,255,255,.6);
    padding: 0 10px;
  }
</style>
