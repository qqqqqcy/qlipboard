<template>
    <div class="item-title">
        {{TITLE_TYPE[type]}}
    </div>
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
        border-bottom:.5px solid #ddd;
        margin-bottom: 6px;
        line-height: 1.6;
        color: #aaa;
        font-size: 12px;
    }
</style>
