<template>
  <div class="item-title">{{ TITLE_TYPE[type] }}</div>
</template>
<script setup>
import { defineProps, toRefs } from 'vue';

const TITLE_TYPE = {
  text: 'Text',
  image: 'Image',
};

const props = defineProps({
  type: {
    type: String,
    default: 'Text',
  },
});

const { type } = toRefs(props);
</script>
<style scoped>
.item-title {
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 0 var(--radius);
  color: #aeaec0;
  font-size: 12px;
  padding: 0 4px;
  background-color: var(--mainColor);
  z-index: 1;
}
</style>
