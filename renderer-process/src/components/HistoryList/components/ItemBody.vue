<template>
    <div class="item-body" :class="{active: active}">
        <ItemTitle :type="type"/>
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

const { type } = toRefs(props);
</script>
<style scoped>
  .item-body {
    color: #666;
    margin-bottom: 6px;
    padding: 6px;
    padding-top: 0;
    overflow: hidden;
    border-radius: var(--radius);
    border: .5px solid #ddd;
  }

  .active {
    box-shadow: 0 0 6px 1px darkslategrey;
  }
</style>
