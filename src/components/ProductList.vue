<template>
  <div>
    <SearchFilter />
    <div class="product-list">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
        <router-link :to="`/product/${product.id}`">View Details</router-link>
      </div>
    </div>
    <PaginationControls />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchFilter from './SearchFilter.vue'
import PaginationControls from './PaginationControls.vue';

export default {
  components: { SearchFilter, PaginationControls },
  computed: {
    ...mapGetters('products', ['paginatedProducts'])
  },
  methods: {
    ...mapActions('cart', ['addToCart'])
  },
  created() {
    this.$store.dispatch('products/fetchProducts');
  }
}
</script>

<style scoped>
/* General Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

body {
  background-color: #f4f7fb;
  padding: 20px;
}

/* Product List Styles */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
}

.product-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.product-card img {
  max-width: 100%;
  border-radius: 8px;
  object-fit: cover;
  height: 200px;
  transition: opacity 0.3s ease;
}

.product-card img:hover {
  opacity: 0.8;
}

.product-card h3 {
  font-size: 18px;
  color: #333;
  margin: 15px 0;
}

.product-card p {
  font-size: 16px;
  color: #5a5a5a;
  margin-bottom: 15px;
}

.product-card button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-card button:hover {
  background-color: #45a049;
}

.product-card a {
  display: inline-block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.product-card a:hover {
  text-decoration: underline;
}

/* Search Filter Styles */
.search-filter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.search-filter input {
  width: 250px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
}

.search-filter button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.search-filter button:hover {
  background-color: #0056b3;
}

/* Media Queries for Responsiveness */

/* Small screens (tablets, mobile) */
@media (max-width: 768px) {
  .product-list {
    grid-template-columns: 1fr 1fr;
  }

  .product-card h3 {
    font-size: 16px;
  }

  .product-card p {
    font-size: 14px;
  }

  .product-card button {
    font-size: 14px;
  }

  .search-filter input {
    width: 200px;
  }

  .search-filter button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

/* Extra small screens (mobile phones) */
@media (max-width: 480px) {
  .product-list {
    grid-template-columns: 1fr;
  }

  .search-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .search-filter input {
    width: 100%;
    margin-bottom: 10px;
  }

  .search-filter button {
    width: 100%;
  }
}

</style>