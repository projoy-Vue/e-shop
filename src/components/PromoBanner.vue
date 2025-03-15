<template>
    <section class="promo-banner">
  <div class="banner-content">
    <h3>Limited Time Offer!</h3>
    <p>Free Shipping on Orders Over $99</p>
  </div>
</section>
</template>
<script>
export default {
  name: 'PromoBanner',
  data() {
    return {
      banners: [
        {
          title: 'Free Shipping',
          subtitle: 'On orders over $99',
          theme: 'orange'
        },
        {
          title: 'New Collection',
          subtitle: 'Spring 2024 Arrivals',
          theme: 'green'
        }
      ],
      activeBanner: 0
    }
  },
  methods: {
    nextBanner() {
      this.activeBanner = (this.activeBanner + 1) % this.banners.length
    },
    prevBanner() {
      this.activeBanner = (this.activeBanner - 1 + this.banners.length) % this.banners.length
    }
  }
}
</script>