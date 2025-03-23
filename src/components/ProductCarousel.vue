<template>
    <section class="popular-products">
  <h2>Best Sellers</h2>
  <div class="product-grid">
    <ProductCard 
      v-for="product in popularProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  
</section>
</template>


<script>
import ProductCard from '@/components/ProductCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductCarousel',
  components: { ProductCard },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['popular', 'new-arrivals'].includes(value)
    }
  },
  computed: {
    ...mapGetters('products', ['featuredProducts', 'newArrivals']),
    products() {
      return this.type === 'popular' 
        ? this.featuredProducts 
        : this.newArrivals
    },
    sectionTitle() {
      return this.type === 'popular' 
        ? 'Best Sellers' 
        : 'New Arrivals'
    }
  }
}
</script>