<template>
  <section class="featured-products">
    <div class="section-heading">
      <h2>Featured Products</h2>
    </div>

    <div class="product-grid">
      <div 
        v-for="product in featuredProducts" 
        :key="product.id" 
        class="product-card"
      >
        <div class="image-container">
          <img 
            :src="product.primaryImage" 
            :alt="product.name"
            class="primary-image"
          >
          <img 
            :src="product.secondaryImage" 
            :alt="product.name"
            class="secondary-image"
          >
        </div>
        
        <div class="product-info">
          <h3 class="product-title">{{ product.name }}</h3>
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
      </div>
    </div>

    <router-link to="/products" class="shop-more">
      Shop More Products
    </router-link>
  </section>
</template>

<script>
export default {
  computed: {
    featuredProducts() {
      return this.$store.getters['products/featuredProducts']
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product)
    }
  }
}
</script>

<style scoped>
.featured-products {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.section-heading {
  text-align: center;
  margin-bottom: 3rem;
}

.section-heading h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  margin: 0 auto 1rem;
}

.section-heading h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #3498db;
  transition: width 0.3s ease;
}

.section-heading h2:hover::after {
  width: 100px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding-top: 100%;
}

.primary-image,
.secondary-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.secondary-image {
  opacity: 0;
}

.product-card:hover .primary-image {
  opacity: 0;
}

.product-card:hover .secondary-image {
  opacity: 1;
}

.product-info {
  padding: 1.5rem 0;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #27ae60;
}

.sale-price {
  color: #e74c3c;
  z-index: 1;
}

.original-price {
  font-size: 0.9rem;
  color: #95a5a6;
  text-decoration: line-through;
}

.rating {
  display: flex;
  gap: 0.1rem;
  color: #f1c40f;
}

.star {
  font-size: 1rem;
  opacity: 0.3;
}

.star.filled {
  opacity: 1;
}

.add-to-cart {
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover .add-to-cart {
  bottom: 0;
}

.shop-more {
  display: block;
  width: max-content;
  margin: 2rem auto 0;
  padding: 1rem 2.5rem;
  background: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.shop-more:hover {
  background: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
  }

  .add-to-cart {
    bottom: 0;
    opacity: 1;
    position: relative;
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .featured-products {
    padding: 2rem 1rem;
  }

  .section-heading h2 {
    font-size: 2rem;
  }

  .shop-more {
    width: 100%;
    text-align: center;
    padding: 1rem;
  }
}
</style>