<template>
    <section class="product-list">
      <div class="container">
        <h2 class="section-title">Our Products</h2>
        <SearchFilter />
        <div class="product-grid">
          <ProductCard 
          v-for="product in paginatedProducts" 
            :key="product.id" 
            :product="product"
          />
        </div> 
        <PaginationControls />
      </div>
    </section>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import ProductCard from '../components/ProductCard.vue'
  import SearchFilter from '../components/SearchFilter.vue'
  import PaginationControls from '../components/PaginationControls.vue'
  
  export default {
    components: {
     ProductCard,
      SearchFilter,
      PaginationControls,
  
    },
    computed: {
      ...mapGetters('products', ['paginatedProducts', ])
    },
    created() {
      this.$store.dispatch('products/fetchProducts')
    }
  }
  </script>
  
  <style scoped>
  .product-list {
    padding: 2rem 0;
   
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
  }
  </style>