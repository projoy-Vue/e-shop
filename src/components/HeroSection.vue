<template>
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="headline" :class="{ fadeIn: isVisible }">
          Discover Unique Gifts for Every Occasion
        </h1>
        <p class="subheadline" :class="{ fadeIn: isVisible }">
          Personalize your gifts and make them unforgettable.
        </p>
        <button class="cta-button" @click="goToShop" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  // State
  const isVisible = ref(false)
  const buttonText = ref('Shop Now')
  const router = useRouter()
  
  // Handle Parallax Scroll
  const handleScroll = () => {
    const hero = document.querySelector('.hero-section')
    if (hero) {
      let scrollPosition = window.scrollY
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`
    }
  }
  
  // Button Hover Effects
  const handleMouseOver = () => {
    buttonText.value = 'Let’s Go!'
  }
  
  const handleMouseLeave = () => {
    buttonText.value = 'Shop Now'
  }
  
  // Navigate to Shop Page
  const goToShop = () => {
    router.push('/products')
  }
  
  // Lifecycle Hooks
  onMounted(() => {
    setTimeout(() => {
      isVisible.value = true
    }, 300)
    window.addEventListener('scroll', handleScroll)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  /* Hero Section Container */
  .hero-section {
    width: 100%;
    height: 100vh;
    background-image: url('@/assets/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Parallax effect */
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
    padding: 20px;
  }
  
  /* Content Styling */
  .hero-content {
    max-width: 800px;
    padding: 20px;
    backdrop-filter: blur(12px); /* Stronger glass effect */
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    opacity: 1;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  /* Fade-In Effect */
  .fadeIn {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Headline Styling */
  .headline {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
    color: #fff;
  }
  
  /* Subheadline Styling */
  .subheadline {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 24px;
    color: #f1f1f1;
  }
  
  /* CTA Button */
  .cta-button {
    background-color: #ff6b6b;
    color: #ffffff;
    padding: 14px 36px;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }
  
  .cta-button:hover {
    background-color: #ff4b4b;
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(255, 107, 107, 0.5);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .headline {
      font-size: 2.2rem;
    }
  
    .subheadline {
      font-size: 1rem;
    }
  
    .cta-button {
      padding: 12px 28px;
      font-size: 0.9rem;
    }
  }
  </style>
  