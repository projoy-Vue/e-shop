<template>
    <div class="category-page">
      <div class="container">
        <h1 class="category-title">{{ categoryName }}</h1>
         <div class="category-controls">
          <router-link to="/" class="back-link">
            ← Back to All Categories
          </router-link>
          <div class="product-count">
            {{ filteredProducts.length }} products found
          </div>
        </div>
        <ProductList :show-filters="false" />
      </div>
    </div>
  </template>
  
  <script>
  import ProductList from '@/components/ProductList.vue'
  import { mapMutations, mapGetters } from 'vuex'
  
  export default {
    components: {
      ProductList
    },
    computed: {
      ...mapGetters('products', ['filteredProducts']),
      categoryName() {
        return this.$route.params.name.replace(/-/g, ' ')
      }
    },
    created() {
      this.SET_FILTER_CATEGORY(this.categoryName)
      this.SET_SEARCH_QUERY('')
    },
    beforeDestroy() {
      this.SET_FILTER_CATEGORY('all')
    },
    methods: {
      ...mapMutations('products', ['SET_FILTER_CATEGORY', 'SET_SEARCH_QUERY'])
    }
  }
  </script>
  
  <style scoped>
  .category-page {
    padding: 2rem 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .category-title {
    text-transform: capitalize;
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
  
  .category-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
  
  .back-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .product-count {
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .category-controls {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }
  }
  </style>