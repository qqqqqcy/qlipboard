<template>
  <div class="item-title">
    <span class="iconfont" :class="`icon-${type}`"></span>
    {{ index }}
  </div>
</template>
<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'Text',
  },
  index: {
    type: Number,
    default: 0,
  },
});

const { type } = toRefs(props);
</script>
<style scoped>
.item-title {
  position: absolute;
  left: 4px;
  top: 4px;
  border-radius: 0 var(--radius);
  color: #aeaec0;
  font-size: 12px;
  padding: 0 4px;
  z-index: 1;
}
</style>
