<template>
    <div class="product-card">
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
        <div class="product-badge" v-if="product.isOnSale" >Sale!</div>
        <div class="product-badge" v-if="product.isNew">New!</div>
      </div>
      <div class="product-details">
        <h3 class="product-title">{{ product.name }}</h3>
        <p class="product-price">${{ product.price }}</p>
        <div class="product-actions">
          <button @click="addToCart(product)">Add to Cart</button>
          <router-link :to="`/product/${product.id}`" class="view-details">
            Details
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
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
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  .product-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #e74c3c;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  .product-details {
    padding: 1rem;
  }
  
  .product-title {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  
  .product-price {
    color: #2c3e50;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .product-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    flex-grow: 1;
  }
  
  .view-details {
    background: #95a5a6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
  }
  </style>