<template>
    <div class="history-list" v-if="list.length">
        <div v-for="(item,index) in list" :key="item.html + item.text">
            <component
              :is="componentIs(item)"
              :item="item"
              :active="currentIndex===index"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TextItem from './components/TextItem.vue';
import ImageItem from './components/ImageItem.vue';

const { onCopyListUpdate, onChangeActiveIdx, onSelectedItem } = window.electron;

const list = ref([]);
const currentIndex = ref(0);

onMounted(() => {
  onCopyListUpdate((_, copyList = []) => {
    list.value = copyList;
    currentIndex.value = 0;
  });

  onChangeActiveIdx((_, direction) => {
    if (direction === 0) {
      onSelectedItem(currentIndex.value);
      currentIndex.value = 0;
    } else {
      currentIndex.value = Math.min(Math.max(
        0,
        currentIndex.value + direction,
      ), list.value.length - 1);
    }
  });
});

function componentIs({ img }) {
  if (img) {
    return ImageItem;
  }
  return TextItem;
}

</script>

<style scoped>
  .active {
    box-shadow: 0 0 0 10px solid;
  }
</style>
