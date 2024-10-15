<template>
  <div class="app">
    <h1>Генезис тестовое задание</h1>
    <br />
    <form class="form" @submit.prevent>
      <SelectDefault v-model="selectedValue" :options="selectOptions" />
      <ButtonDefault
        :class="{ active: selectedValue }"
        @click="handleCreateMatter(selectedValue)"
        :disabled="!selectedValue"
      >
        <template v-if="isLoading">
          <img src="./assets/loadingSpinner.svg" alt="Loading" width="20" height="20" />
        </template>
        <template v-else>
          Создать
        </template>
      </ButtonDefault>
    </form>
    <MatterList :listItems="matterList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useMatterStore } from './store/MatterStore';
import { useCreateMatter } from './hooks/useCreateMatter';

import SelectDefault from "./components/SelectDefault.vue";
import ButtonDefault from "./components/ButtonDefault.vue";
import MatterList from './components/MatterList.vue';

interface SelectOption {
  value: string;
  name: string;
}

export default defineComponent({
  components: {
    SelectDefault,
    ButtonDefault,
    MatterList,
  },
  setup() {
    const matterStore = useMatterStore();
    const selectedValue = ref('');
    const selectOptions: SelectOption[] = [
      { value: 'leads', name: 'Сделка' },
      { value: 'contacts', name: 'Контакт' },
      { value: 'companies', name: 'Компания' },
    ];

    const handleCreateMatter = async (createdMatter: string) => {
      await useCreateMatter(createdMatter);
    };

    const matterList = computed(() => matterStore.matter);
    const isLoading = computed(() => matterStore.isLoading);

    return {
      selectedValue,
      selectOptions,
      matterStore,
      handleCreateMatter,
      matterList,
      isLoading,
    };
  },
});
</script>

<style lang="scss">
:focus,
:active {
  outline: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 280px;
}
</style>
