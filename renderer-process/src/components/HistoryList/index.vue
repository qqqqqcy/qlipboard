<template>
    <div class="history-list">
        <div v-for="item in list" :key="item">
            <component :is="componentIs(item)" :item="item"></component>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TextItem from './components/TextItem.vue';
import ImageItem from './components/ImageItem.vue';

const { onCopyListUpdate } = window.electron;

const list = ref([]);

onMounted(() => {
  onCopyListUpdate((_, copyList = []) => {
    list.value = copyList.reverse();
  });
});

function componentIs({ image }) {
  if (image) {
    return ImageItem;
  }
  return TextItem;
}
</script>

<style scoped>
</style>
