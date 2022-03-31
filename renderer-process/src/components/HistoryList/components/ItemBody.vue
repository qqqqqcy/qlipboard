<template>
  <div class="item-body" :class="{ active: active }">
    <ItemTitle :type="type" />
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from 'vue';
import ItemTitle from './ItemTitle.vue';

const props = defineProps({
  type: {
    type: String,
  },
  active: {
    typeof: Boolean,
    default: false,
  },
});

const { type, active } = toRefs(props);
console.log(ItemTitle, type);

</script>
<style>
.item-body * {
  font-size: 14px !important;
}
</style>
<style scoped>
.item-body {
  color: #666;
  margin-bottom: 8px;
  overflow: hidden;
  padding: 5px;
  border-radius: var(--radius);
  background-color: var(--mainColor);
  box-shadow: -4px -4px 10px #ffffff, 4px 4px 10px #aeaec0;
  position: relative;
}

.active {
  box-shadow: inset -4px -4px 4px #ffffff70, inset 4px 4px 4px #aeaec070;
  left: 2px;
  top: 2px;
}
</style>
