<template>
    <div>
        <ItemBody type="image">
          <div class="text-item">
            <!-- <div v-html="item.html"></div> -->
            <img :src="item.img" alt="">
          </div>
        </ItemBody>
    </div>
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
});

const { item } = toRefs(props);

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
