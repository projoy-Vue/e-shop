<template>
  <div class="home-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader"></div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-banner">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-if="!isLoading && !error">
      <HeroSection />
      <FeaturedCategories />
      <ShopbyCategory />
      <PromoBanner :slides="promoSlides" />
      <Testimonials />
      <BrandStory />
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeroSection from '@/components/HeroSection.vue'
import FeaturedCategories from '@/components/FeaturedCategories.vue'
import ShopbyCategory from '@/components/ShopbyCategory.vue'
import PromoBanner from '@/components/PromoBanner.vue'
import Testimonials from '@/components/Testimonials.vue'
//import BestSellers from '@/components/BestSellers.vue'
import BrandStory from '@/components/BrandStory.vue'

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    FeaturedCategories,
    ShopbyCategory,
    PromoBanner,
    Testimonials,
    //BestSellers,
    BrandStory
    
  },
  data() {
    return {
      isLoading: true,
      error: null,
      category: ''
    }
  },
  computed: {
    ...mapGetters('products', [
      'featuredProducts',
      'newArrivals',
      'categories'
    ]),
    
    promoSlides() {
      return [
        // Featured Products Slides
        ...this.featuredProducts.slice(0, 3).map(product => ({
          title: `Featured: ${product.name}`,
          subtitle: product.description,
          image: product.image,
          ctaText: 'View Product',
          ctaLink: `/product/${product.id}`,
          timer: true,
          timerText: 'Limited Stock!',
          duration: 8
          
        })),
        
        // Category Slides
        ...this.categories.slice(0, 2).map(category => ({
          title: `${category.name} Collection`,
          subtitle: 'Explore our curated selection',
          image: category.image,
          ctaText: 'Shop Now',
          ctaLink: `/category/${category.name}`,
          timer: true,
          timerText: 'Seasonal Offers!',
          duration: 7
        })),
        
        // New Arrivals Slide
        ...this.newArrivals.slice(0, 2).map(product => ({
          title: `New Arrival: ${product.name}`,
          subtitle: `Just in: ${product.category}`,
          image: product.image,
          ctaText: 'Shop New',
          ctaLink: '/new-arrivals',
          timer: false,
          duration: 6
        }))
      ]
    }
  },
  async created() {
    try {
      await Promise.all([
        this.fetchProducts(),
        this.fetchCategories()
      ])
      
      if (this.featuredProducts.length === 0) {
        throw new Error('No featured products found')
      }
      
    } catch (error) {
      this.error = 'Failed to load page content. Please refresh or try again later.'
      console.error('Page load error:', error)
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'fetchCategories'])
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-banner {
  padding: 1.5rem;
  background: #ffe3e6;
  color: #ff4757;
  text-align: center;
  margin: 2rem;
  border-radius: 8px;
  border: 1px solid #ff4757;
}
</style>