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
<style src="./assets/iconfont.css"></style>
<style>
  body {
    --radius: 5px;
    --mainColor: #f0f0f3;
    background-color: var(--mainColor);
    padding: 0 10px;
  }
</style>
