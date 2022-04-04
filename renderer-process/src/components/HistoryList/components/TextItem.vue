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
  max-height: 10em;
  background-color: none;
  border-radius: var(--radius);
  min-height: 1.2em;
  /* 防止子元素出现 position: fixed */
  transform: translate(0, 0);
}
</style>
