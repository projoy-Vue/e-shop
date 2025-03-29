<template>
  <div class="cart">
    <h2>Shopping Cart ({{ cartItemCount }})</h2>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <img :src="item.image" :alt="item.name" class="product-image" />
      <h3>{{ item.name }}</h3>
      <p>Price: ${{ item.price }}</p>
      <p>Quantity: {{ item.quantity }}</p>
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
    <div v-if="cartItemCount > 0" class="cart-footer">
      <p>Total: ${{ cartTotal }}</p>
      <router-link to="/checkout" class="checkout-button">Proceed to Checkout</router-link>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('cart', {
        cartItems: 'cartItems',
        cartTotal: 'cartTotal',
        cartItemCount: 'cartItemCount'
      })
    },
    methods: {
      ...mapActions('cart', ['removeFromCart'])
    }
  }
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.cart-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkout-button {
  padding: 12px;
  background: #35495e;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  width: 100%;
  max-width: 200px;
}

button {
  padding: 8px 15px;
  background: #ff4c4c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #e04343;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .checkout-button {
    width: 100%;
  }
}
</style>
