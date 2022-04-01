<template>
  <div ref="itemBody" class="item-body" :class="{ active: active }">
    <ItemTitle :type="type" :index="index"/>
    <slot></slot>
  </div>
</template>

<script setup>
import {
  defineProps, toRefs, watch, ref,
} from 'vue';
import ItemTitle from './ItemTitle.vue';

const props = defineProps({
  type: {
    type: String,
  },
  active: {
    typeof: Boolean,
    default: false,
  },
  index: {
    typeof: Number,
  },
});

const { type, active, index } = toRefs(props);

const itemBody = ref(null);

watch(active, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    itemBody.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

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
  padding-left: 3em;
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
