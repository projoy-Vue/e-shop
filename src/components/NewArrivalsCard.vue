
<template>
  <section class="products-container">
    <!-- Sidebar with filters -->
    <aside class="sidebar">
      <div class="filter-group">
        <h3>Filters</h3>
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="Search products..." 
          class="search-input"
        >
      </div>

      <div class="filter-group">
        <h4>Category</h4>
        <div 
          v-for="category in categories" 
          :key="category" 
          class="filter-option"
        >
          <input 
            type="checkbox" 
            :id="category" 
            :value="category" 
            v-model="selectedCategories"
          >
          <label :for="category">{{ category }}</label>
        </div>
      </div>

      <div class="filter-group">
        <h4>Price</h4>
        <select v-model="sortBy" class="sort-select">
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div class="filter-group">
        <label class="sale-filter">
          <input type="checkbox" v-model="showSaleOnly"> Show Sale Items Only
        </label>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <div class="section-heading">
        <h2 class="section-title">New Arrivals</h2>
        <p class="section-description">
          Showing {{ filteredProducts.length }} products
        </p>
      </div>

      <div class="product-grid">
        <div 
          v-for="product in paginatedProducts" 
          :key="product.id" 
          class="product-card"
        >
        <div class="image-container">
          <img
            :src="getImage(product.primaryImage)"
            :alt="product.name"
            class="primary-image"
          >
          <img 
            :src="getImage(product.secondaryImage)" 
            :alt="product.name"
            class="secondary-image"
          >
          <div class="sale-badge" v-if="product.isNew">New!</div>

          <!-- <div v-if="product.isOnSale" class="sale-badge">Sale!</div> -->
        </div>

        <div class="product-info">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <div class="price-container">
            <span 
              class="price" 
              :class="{ 'sale-price': product.isOnSale }"
            >
              ${{ product.price }}
            </span>
            <span v-if="product.originalPrice" class="original-price">
              ${{ product.originalPrice }}
            </span>
          </div>

          <div class="rating" :title="`${product.rating}/5 (${product.reviews} reviews)`">
            <span 
              v-for="star in 5" 
              :key="star"
              class="star"
              :class="{ filled: star <= Math.round(product.rating) }"
            >
              ★
            </span>
          </div>
        </div>

        <button @click="addToCart(product)" class="add-to-cart">Add to Cart</button>

          <!-- Product Card Content (Same as before) -->
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="page-button"
        >
          Previous
        </button>
        
        <span 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          class="page-number"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </span>
        
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="page-button"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      selectedCategories: [],
      showSaleOnly: false,
      sortBy: '',
      currentPage: 1,
      perPage: 12,
      categories: ['Electronics', 'Clothing', 'Home', 'Beauty'] // Add your actual categories
    }
  },
  computed: {
    filteredProducts() {
      return this.$store.getters['products/newArrivals'].filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        
        const matchesCategory = this.selectedCategories.length === 0 || 
          this.selectedCategories.includes(product.category)
        
        const matchesSale = !this.showSaleOnly || product.isOnSale
        
        return matchesSearch && matchesCategory && matchesSale
      })
    },
    sortedProducts() {
      if (!this.sortBy) return this.filteredProducts
      
      return [...this.filteredProducts].sort((a, b) => {
        switch(this.sortBy) {
          case 'price_asc': return a.price - b.price
          case 'price_desc': return b.price - a.price
          case 'rating': return b.rating - a.rating
          default: return 0
        }
      })
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.sortedProducts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.sortedProducts.length / this.perPage)
    }
  },
  watch: {
    searchTerm() { this.resetPagination() },
    selectedCategories() { this.resetPagination() },
    showSaleOnly() { this.resetPagination() },
    sortBy() { this.resetPagination() }
  },
  methods: {
    resetPagination() {
      this.currentPage = 1
    },
    getImage(image) {
      return new URL(image, import.meta.url).href
    },
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product)
    }
    // Keep existing methods
  }
}
</script>

<style scoped>
.original-price {
  text-decoration: line-through;
  color: #888;
}
.products-container {
  display: flex;
  gap: 2rem;
  padding: 1rem;
}

.sidebar {
  position: sticky;
  top: 2rem;
  height: calc(100vh - 4rem);

  flex: 0 0 250px;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}


.main-content {
  flex: 1;
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-option {
  margin: 0.5rem 0;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.sort-select {
  width: 100%;
  padding: 0.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.page-button, .page-number {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.page-number.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-container {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1/1;
  }
  
  .primary-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }
  
  .secondary-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .image-container:hover .primary-image {
    opacity: 0;
  }
  
  .image-container:hover .secondary-image {
    opacity: 1;
  }
  
  .sale-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ff4444;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
 
.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.product-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.product-card p {
  margin-bottom: 0.5rem;

}

.product-card button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-card button:hover {
  background-color: #0056b3;
}



/* Responsive Design */
@media (max-width: 768px) {
  .products-container {
    flex-direction: column;
  }
  
  .sidebar {
    flex: none;
    width: 100%;
  }
  
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>