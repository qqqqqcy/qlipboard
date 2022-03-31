<template>
  <ItemBody type="text" :active="active">
    <div class="text-item">
      <!-- {{item.text}} -->
      <div v-html="item.html"></div>
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
.text-item {
  overflow: scroll;
  /* text-overflow: ellipsis;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6; */
  max-height: 10em;
  background-color: none;
  border-radius: var(--radius);
}
</style>
