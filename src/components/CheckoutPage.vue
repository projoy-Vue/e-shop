<template>
    <div class="checkout-page">
      <div class="checkout-container">
        <!-- Shipping Information -->
        <div class="shipping-form">
          <h2>Shipping Information</h2>
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model="shippingInfo.name" required>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="shippingInfo.email" type="email" required>
            </div>
            <div class="form-group">
              <label>Address</label>
              <input v-model="shippingInfo.address" required>
            </div>
            <div class="form-group">
              <label>City</label>
              <input v-model="shippingInfo.city" required>
            </div>
            <div class="form-group">
              <label>Payment Card Number</label>
              <input v-model="paymentInfo.cardNumber" placeholder="4111 1111 1111 1111" required>
            </div>
            
            <!-- Order Summary -->
            <div class="order-summary">
              <h3>Order Summary ({{ cartItemCount }} items)</h3>
              <div v-for="item in cartItems" :key="item.id" class="order-item">
                <span>{{ item.name }} x{{ item.quantity }}</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              <div class="total">
                <strong>Total:</strong>
                <strong>${{ cartTotal.toFixed(2) }}</strong>
              </div>
            </div>
  
            <button type="submit" class="submit-order">Complete Order</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        shippingInfo: {
          name: '',
          email: '',
          address: '',
          city: ''
        },
        paymentInfo: {
          cardNumber: ''
        }
      }
    },
    computed: {
      ...mapGetters('cart', ['cartItems', 'cartTotal', 'cartItemCount'])
    },
    methods: {
      ...mapActions('cart', ['checkout']),
      async submitOrder() {
        const orderData = {
          shipping: this.shippingInfo,
          payment: this.paymentInfo,
          items: this.cartItems,
          total: this.cartTotal
        }
  
        try {
          await this.checkout(orderData)
          this.$router.push('/order-confirmed')
        } catch (error) {
          alert('Checkout failed: ' + error.message)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .checkout-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
  }
  
  .order-summary {
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #eee;
  }
  
  .order-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  
  .total {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }
  
  .submit-order {
    background: #41b883;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
  }
  </style>