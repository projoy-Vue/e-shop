<template>
  <div v-if="product">
    <img :src="product.image" :alt="product.name">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
  </div>
</template>

<script>
export default {
  computed: {
    product() {
      return this.$store.state.products.products.find(
        p => p.id === parseInt(this.$route.params.id)
      )
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('cart/addToCart', product)
    }
  }
}
</script>