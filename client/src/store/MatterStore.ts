import { defineStore } from 'pinia';

interface Matter {
  id: number;
  name: string;
}

interface StoreState {
  matter: Matter[];
  isLoading: boolean;
}

export const useMatterStore = defineStore('matterStore', {
  state: () => ({
    matter: [] as Matter[],
    isLoading: false,
  }) as StoreState,

  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    addMatter(newMatter: Matter) {
      this.matter.push(newMatter);
    },
  },
});
