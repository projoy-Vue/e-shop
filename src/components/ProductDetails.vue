<template>
  <div v-if="product" class="product-details">
    <!-- Product Images Gallery -->
    <div class="product-gallery">
      <div class="main-image">
        <img :src="getImage(product.primaryImage)" :alt="product.name" class="product-main-img">
      </div>
      <div class="thumbnail-images">
        <img v-for="(image, index) in product.images" :key="index" :src="getImage(image)" :alt="product.name"
          class="thumbnail-img" @click="changeImage(image)">
      </div>
    </div>

    <!-- Product Info Section -->
    <div class="product-info">
      <h1 class="product-title">{{ product.name }}</h1>
      <p class="product-category">{{ product.category }}</p>

      <div class="product-rating">
        <span class="rating-stars">{{ ratingStars }}</span>
        <span class="product-review-count">{{ product.rating }} ({{ reviewCount }} reviews)</span>
      </div>

      <div v-if="product.isOnSale" class="sale-badge">
        <span>Sale</span>
      </div>

      <div class="product-price">
        <span class="current-price">${{ product.price }}</span>
        <span v-if="product.isOnSale" class="original-price">${{ product.originalPrice }}</span>
      </div>

      <p class="product-description">{{ product.description }}</p>

      <div class="product-actions">
        <button class="add-to-cart-btn" @click="addToCart(product)">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="wishlist-btn">
          <i class="fas fa-heart"></i> Add to Wishlist
        </button>
      </div>
    </div>

    <!-- Related Products Section -->
    <div class="related-products">
      <h3>Related Products</h3>
      <div class="related-products-grid">
        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="related-product-card">
          <img :src="getImage(relatedProduct.primaryImage)" :alt="relatedProduct.name" class="related-product-img">
          <h4>{{ relatedProduct.name }}</h4>
          <p class="price">${{ relatedProduct.price }}</p>
          <button @click="addToCart(relatedProduct)" class="add-to-cart-btn">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      product() {
        return this.$store.state.products.products.find(
          p => p.id === parseInt(this.$route.params.id)
        );
      },
      ratingStars() {
        return '★'.repeat(Math.round(this.product.rating)) + '☆'.repeat(5 - Math.round(this.product.rating));
      },
      reviewCount() {
        return this.product.rating * 10; // Dummy value, adjust as needed
      },
      relatedProducts() {
        return this.$store.state.products.products.filter(
          p => p.category === this.product.category && p.id !== this.product.id
        ).slice(0, 4); // Show only 4 related products
      }
    },
    methods: {
      addToCart(product) {
        this.$store.dispatch('cart/addToCart', product);
      },
      changeImage(image) {
        this.product.primaryImage = image; // Update the main product image
      },
      getImage(imageUrl) {
        return new URL(imageUrl, import.meta.url).href;
      }
    }
  };
</script>

<style scoped>
.product-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.product-gallery {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-main-img {
  width: 100%;
  max-width: 400px;
  height: auto;
}

.thumbnail-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.thumbnail-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #ddd;
  transition: transform 0.2s;
}

.thumbnail-img:hover {
  transform: scale(1.1);
}

.product-info {
  flex: 2;
}

.product-title {
  font-size: 2rem;
  margin-bottom: 10px;
}

.product-category {
  color: #777;
  font-size: 1rem;
  margin-bottom: 10px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.rating-stars {
  color: #f5a623;
}

.product-review-count {
  font-size: 0.9rem;
  color: #555;
}

.sale-badge {
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline-block;
}

.product-price {
  font-size: 1.5rem;
  margin: 20px 0;
}

.current-price {
  color: #e74c3c;
}

.original-price {
  text-decoration: line-through;
  color: #aaa;
  margin-left: 10px;
}

.product-description {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.product-actions {
  display: flex;
  gap: 15px;
}

.add-to-cart-btn,
.wishlist-btn {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.add-to-cart-btn {
  background-color: #3498db;
  color: white;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

.wishlist-btn {
  background-color: #e74c3c;
  color: white;
}

.wishlist-btn:hover {
  background-color: #c0392b;
}

.related-products {
  width: 100%;
  margin-top: 50px;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.related-product-card {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.related-product-card:hover {
  transform: scale(1.05);
}

.related-product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.price {
  font-size: 1.2rem;
  margin: 10px 0;
}
</style>