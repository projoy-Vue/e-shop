<template>
    <div class="search-filter">
      <input type="text" v-model="searchQuery" placeholder="Search products...">
      <select v-model="selectedCategory">
        <option value="all">All Categories</option>
        <option v-for="category in categories" :value="category">{{ category }}</option>
      </select>
      <select v-model="sortBy">
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      searchQuery: {
        get() { return this.$store.state.products.searchQuery },
        set(value) { this.$store.commit('products/SET_SEARCH_QUERY', value) }
      },
      selectedCategory: {
        get() { return this.$store.state.products.filterCategory },
        set(value) { this.$store.commit('products/SET_FILTER_CATEGORY', value) }
      },
      sortBy: {
        get() { return this.$store.state.products.sortBy },
        set(value) { this.$store.commit('products/SET_SORT_BY', value) }
      },
      categories() {
        return [...new Set(this.$store.state.products.products.map(p => p.category))]
      }
    }
  }
  </script>
  <style scoped>
  /* Search Filter Container */
.search-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 15px;
}

/* Input field for search query */
.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}

/* Dropdown for category selection */
.category-select, .sort-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
}

.category-select:focus, .sort-select:focus {
  border-color: #007bff;
  outline: none;
}

/* Responsiveness */
@media (max-width: 768px) {
  .search-filter {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input {
    width: 100%;
    margin-bottom: 10px;
  }

  .category-select, .sort-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .search-filter {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .search-input {
    width: 100%;
  }

  .category-select, .sort-select {
    width: 100%;
  }
}

</style>