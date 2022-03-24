<template>
    <div class="item-body">
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
});

const { type } = toRefs(props);
// setup code
</script>
<style scoped>
  .item-body {
    color: #666;
    margin-bottom: 10px;
    padding: 10px;
    padding-top: 0;
    overflow: hidden;
    border-radius: var(--radius);
    border: .5px solid #ddd;
  }
</style>
