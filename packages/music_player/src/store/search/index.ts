import { defineStore } from 'pinia'
import { useSearchSuggest } from '@/api/module/search'
import type { SearchSuggest } from '@/types/search'

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      showSearchView: false,
      searchKeyword: '',
      suggestData: {} as SearchSuggest,
    }
  },
  getters: {
    showHot: (state) => !state.searchKeyword,
  },
  actions: {
    /* 搜索 */
    async suggest () {
      this.suggestData = await useSearchSuggest(this.searchKeyword)
    },
  },
})
