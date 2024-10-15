<template>
  <select class="select" :value="modelValue" @change="changeOption">
    <option disabled value="">Не выбрано</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const changeOption = (event) => {
      emit("update:modelValue", event.target.value);
    };

    return {
      changeOption,
    };
  },
});
</script>

<style scoped>
.select {
  height: 40px;
  border-radius: 4px;
}
</style>
