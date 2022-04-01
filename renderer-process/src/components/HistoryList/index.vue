<template>
    <div class="history-list" v-if="list.length">
        <div v-for="(item,index) in list" :key="item" >
            <component
              v-if="item"
              :is="componentIs(item)"
              :item="item"
              :index="index+1"
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
  });

  onChangeActiveIdx((_, { type, val }) => {
    if (type === 'move') {
      const result = currentIndex.value + val;
      if (result < 0) {
        currentIndex.value = list.value.length - 1;
      } else if (result >= list.value.length) {
        currentIndex.value = 0;
      } else {
        currentIndex.value = result;
      }
    } else if (type === 'select') {
      onSelectedItem(currentIndex.value);
      currentIndex.value = 0;
    } else if (type === 'jump') {
      currentIndex.value = Math.min(val, list.value.length - 1);
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
