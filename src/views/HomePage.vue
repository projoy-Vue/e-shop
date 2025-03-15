

<template>
  <div>
    <HeroSection></HeroSection>
    <FeaturedCategories></FeaturedCategories>
    <ShopbyCategory/>
    <PromoBanner></PromoBanner>
    <ProductCarousel type="new-arrivals"></ProductCarousel>
  </div>
</template>
<script>
import HeroSection from '@/components/HeroSection.vue'
import FeaturedCategories from '@/components/FeaturedCategories.vue'
import ShopbyCategory from '@/components/ShopbyCategory.vue'
import PromoBanner from '@/components/PromoBanner.vue'
import { mapActions } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    FeaturedCategories,
    ShopbyCategory,
    PromoBanner
  },
  created() {
    this.loadInitialData()
  },
  methods: {
    ...mapActions('products', {
      fetchProducts: 'fetchProducts',
      fetchCategories: 'fetchCategories'
    }),
    async loadInitialData() {
      try {
        await Promise.all([
          this.fetchProducts(),
          this.fetchCategories()
        ])
      } catch (error) {
        console.error('Error loading initial data:', error)
        // Show error notification to user
      }
    }
  }
}
</script>