<template>
  <ItemBody type="image" :active="active">
    <div class="image-item">
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

</script>
<style scoped>
  .image-item {
    border-radius: var(--radius);
    overflow: scroll;
    max-height: 10em;
  }

  img {
    width: 100%;
  }
</style>
