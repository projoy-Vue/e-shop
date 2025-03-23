<template>
    <div class="special-offers">
      <!-- Hero Banner -->
      <div class="hero-banner">
        <h1>🔥 Limited Time Offers!</h1>
        <p>Grab the best deals before they're gone!</p>
      </div>

  <!-- Sorting Controls -->
  
      <!-- Product Grid -->
      <div v-if="specialOffers.length" class="product-grid">
        <ProductCard
          v-for="product in specialOffers"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
      <div v-else class="no-deals">
        <p>No special offers available right now! Check back soon.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  import ProductCard from './ProductCard.vue'
  
  export default {
    name: 'SpecialOffers',
    data() {
      return {
        sortBy: 'discount'
      }
    },
    components: {
      ProductCard
    },
    computed: {
      ...mapGetters('products', ['specialOffers'])
    },
    created() {
      this.fetchProducts()
    },
    methods: {
      ...mapActions('products', ['fetchProducts']),
      addToCart(product) {
        console.log('Adding to cart:', product.name)
        // Add to cart logic here (if using a cart store/module)
      },
       // Method to handle sorting of products based on selected criteria
    }
  }
  </script>
  
  <style scoped>
  .special-offers {
    padding: 20px;
  }
  
  .hero-banner {
    background-color: #ff6b6b;
    color: #fff;
    padding: 40px;
    text-align: center;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .no-deals {
    text-align: center;
    color: #888;
  }
  </style>
  