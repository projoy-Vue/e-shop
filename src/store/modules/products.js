export default {
  namespaced: true,
  state: {
    products: [],
    searchQuery: '',
    sortBy: 'name',
    filterCategory: 'all',
    currentPage: 1,
    itemsPerPage: 12,
    categories: [],

  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    SET_SORT_BY(state, sort) {
      state.sortBy = sort
    },
    SET_FILTER_CATEGORY(state, category) {
      state.filterCategory = category
    },
    // Pagination
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
    SET_ITEMS_PER_PAGE(state, count) {
      state.itemsPerPage = count
    }

  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await fetch('/products.json')
      const data = await response.json()
      commit('SET_PRODUCTS', data.products)
    },
    async fetchCategories({ commit }) {
      const response = await fetch('/products.json')
      const data = await response.json()
      commit('SET_CATEGORIES', data.categories)
    }

  },
  getters: {
    filteredProducts(state) {
      let filtered = state.products.filter(product => {
        return product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      })

      if (state.filterCategory !== 'all') {
        filtered = filtered.filter(product => product.category === state.filterCategory)
      }

      return filtered.sort((a, b) => {
        if (state.sortBy === 'price') return a.price - b.price
        if (state.sortBy === 'name') return a.name.localeCompare(b.name)
        return 0
      })
    },
    categories(state) {
      return [...new Set(state.products.map(product => product.category))]
      //return [...new Set(state.products.map(product => product.category))]
    },
    paginatedProducts: (state, getters) => {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return getters.filteredProducts.slice(start, end)
    },
    totalPages: (state, getters) => {
      return Math.ceil(getters.filteredProducts.length / state.itemsPerPage)
    },
    currentPage: state => state.currentPage,
    itemsPerPage: state => state.itemsPerPage,
    //categories: state => state.categories,
    featuredProducts: state => state.products.filter(p => p.isFeatured),
    newArrivals: state => state.products.filter(p => p.isNew)
  }
}