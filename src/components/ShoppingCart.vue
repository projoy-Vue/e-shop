<template>
  <div class="cart">
    <h2>Shopping Cart ({{ cartItemCount }})</h2>
    <div v-for="item in cartItems" :key="item.id" class="cart-item">
      <h3>{{ item.name }}</h3>
      <p>Price: ${{ item.price }}</p>
      <p>Quantity: {{ item.quantity }}</p>
      <button @click="removeFromCart(item.id)">Remove</button>
      <div class="cart">
        <!-- ... existing cart content -->
        <router-link v-if="cartItemCount > 0" to="/checkout" class="checkout-button">
          Proceed to Checkout
        </router-link>
      </div>
    </div>
    <p>Total: ${{ cartTotal }}</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from 'vuex'

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
.checkout-button {
  display: block;
  margin-top: 20px;
  padding: 12px;
  background: #35495e;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
}
</style>