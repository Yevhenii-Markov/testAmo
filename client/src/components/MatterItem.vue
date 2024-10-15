<template>
  <div class="matter">
    <div class="matter__line"><strong>Сущность: </strong> {{ matter.name }}</div>
    <div class="matter__line"><strong> ID: </strong>{{ matter.id }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Matter {
  id: number;
  name: string;
}

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Matter>,
      required: true,
    },
  },
  setup(props) {
    const matter = props.item;

    return {
      matter,
    };
  },
});
</script>

<style scoped>
.matter {
  padding: 15px;
  border: 2px solid #333;
  margin-top: 15px;
}

.matter__line {
  display: flex;
  justify-content: flex-start;
  text-align: start;
}
strong {
  padding-right: 5px;
}
</style>