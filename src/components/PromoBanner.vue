<template>
  <section class="promo-carousel" @mouseenter="pauseAutoPlay" @mouseleave="resumeAutoPlay">
    <div class="carousel-track" :style="trackStyle">
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="carousel-slide"
        :class="{ active: index === activeIndex }"
      >
        <div class="slide-content">
          <div class="text-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
            <div class="timer" v-if="slide.timer">
              <span class="timer-text">{{ slide.timerText }}</span>
              <div class="progress-bar">
                <div class="progress" :style="progressStyle"></div>
              </div>
            </div>
            <button 
              class="cta-button"
              @click="handleCTAClick(slide.ctaLink)"
            >
              {{ slide.ctaText }}
            </button>
          </div>
          <img :src="getImage(slide.image)" 
           :alt="slide.title" class="slide-image">
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="control prev" @click="prevSlide">‹</button>
      <button class="control next" @click="nextSlide">›</button>
    </div>

    <div class="pagination-dots">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: index === activeIndex }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => [
        {
          title: "Summer Sale!",
          subtitle: "Up to 50% off selected items",
          //image: require('@/assets/summer-sale.jpg'),
          ctaText: "Shop Now",
          ctaLink: "/summer-sale",
          timer: true,
          timerText: "Offer ends in 3:00:00",
          duration: 5 // seconds
        }
      ]
    }
  },
  data() {
    return {
      activeIndex: 0,
      interval: null,
      isPaused: false
    }
  },
  computed: {
    progressStyle() {
      return {
        animationDuration: `${this.currentSlide.duration}s`
      }
    },
    currentSlide() {
      return this.slides[this.activeIndex]
    },
    trackStyle() {
      return {
        transform: `translateX(-${this.activeIndex * 100}%)`
      }
    }
  },
  mounted() {
    this.startAutoPlay()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    startAutoPlay() {
      this.interval = setInterval(() => {
        if (!this.isPaused) this.nextSlide()
      }, this.currentSlide.duration * 1000)
    },
    pauseAutoPlay() {
      this.isPaused = true
      clearInterval(this.interval)
    },
    resumeAutoPlay() {
      this.isPaused = false
      this.startAutoPlay()
    },
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.slides.length
    },
    prevSlide() {
      this.activeIndex = (this.activeIndex - 1 + this.slides.length) % this.slides.length
    },
    goToSlide(index) {
      this.activeIndex = index
    },
    handleCTAClick(link) {
      this.$router.push(link)
    },
    getImage(image) {
      return new URL(image, import.meta.url).href
    }
  }
}
</script>

<style scoped>
.promo-carousel {
  position: relative;
  width: 100%;
  height: 80vh;
  max-height: 800px;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
  position: relative;
}

.slide-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
}

.text-content {
  color: white;
  z-index: 2;
  max-width: 600px;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.slide-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slide-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.timer {
  background: rgba(255,255,255,0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
}

.progress-bar {
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #ff4757;
  width: 100%;
  animation: progressBar linear forwards;
}

@keyframes progressBar {
  from { width: 100%; }
  to { width: 0; }
}

.cta-button {
  background: #ff4757;
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
  background: #ff6b81;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

.control {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.control:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.1);
}

.pagination-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.pagination-dots button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dots button.active {
  background: #ff4757;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .slide-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 1rem;
  }

  .slide-title {
    font-size: 2rem;
  }

  .slide-subtitle {
    font-size: 1.2rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .control {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}
</style>