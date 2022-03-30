<template>
  <ItemBody type="image" :active="active">
    <div class="text-item">
      <!-- <div v-html="item.html"></div> -->
      <img :src="item.img" alt="">
    </div>
  </ItemBody>
</template>
<script setup>
import { defineProps, toRefs } from 'vue';
import ItemBody from './ItemBody.vue';

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
  active: {
    typeof: Boolean,
    default: false,
  },
});

const { item, active } = toRefs(props);

// const data = await fetch(item.image);
// const blob = await data.blob();
// const img = ref(window.URL.createObjectURL(blob));

</script>
<style scoped>
  .text-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  img {
    width: 100%;
  }
</style>
