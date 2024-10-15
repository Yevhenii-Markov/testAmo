<template>
  <transition-group name="matter-list">
    <MatterItem
      v-for="item in listItems"
      :item="item"
      :key="item.id"
    />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MatterItem from './MatterItem.vue';

interface Matter {
  id: number;
  name: string;
}

export default defineComponent({
  components: {
    MatterItem,
  },
  props: {
    listItems: {
      type: Array as PropType<Matter[]>,
      default: () => [],
      required: true,
    },
  },
});
</script>

<style scoped>
ul li{
  list-style: none;
}

.matter-list-item {
    display: inline-block;
    margin-right: 10px;
}

.matter-list-enter-active,
.matter-list-leave-active {
    transition: all 0.35s ease;
}

.matter-list-enter-from,
.matter-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}

.matter-list-move {
    transition: transform 0.8s ease;
}
</style>