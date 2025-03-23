<template>
  <section class="testimonials-section">
    <div class="section-header">
      <h2 class="section-title">What Our Customers Say</h2>
      <p class="section-subtitle">Rated 4.8/5 from thousands of reviews</p>
    </div>

    <div class="testimonials-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
      @mouseenter="pauseAutoSlide" @mouseleave="resumeAutoSlide">
      <div class="testimonial-track" :style="trackStyle">
        <article v-for="(review, index) in reviews" :key="review.id" class="testimonial-card"
          :class="{ active: currentIndex === index }" :aria-hidden="currentIndex !== index">
          <div class="testimonial-content">
            <div class="user-meta">
              <img :src="getImage(review.avatar)" :alt="review.name" class="user-avatar" loading="lazy">
              <div class="user-info">
                <h3 class="user-name">{{ review.name }}</h3>
                <div class="review-rating">
                  <span v-for="star in 5" :key="star" class="star">
                    {{ star <= review.rating ? '★' : '☆' }}
                  </span>
                </div>
              </div>
            </div>
            <p class="testimonial-text">"{{ review.message }}"</p>
            <time class="review-date">{{ formatDate(review.date) }}</time>
          </div>
        </article>
      </div>

      <button class="carousel-control prev" @click="prevSlide" aria-label="Previous review">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
        </svg>
      </button>
      <button class="carousel-control next" @click="nextSlide" aria-label="Next review">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </div>

    <div class="carousel-pagination">
      <button v-for="(_, index) in reviews" :key="index" :class="{ active: currentIndex === index }"
        @click="goToSlide(index)" :aria-label="'Go to review ' + (index + 1)" class="pagination-dot"></button>
    </div>
  </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        currentIndex: 0,
        autoSlideInterval: null,
        touchStartX: 0,
        isAutoPlaying: true,
        windowWidth: window.innerWidth
      }
    },
    computed: {
      ...mapGetters('reviews', ['allReviews']),
      reviews() {
        return this.allReviews
      },
      trackStyle() {
        return {
          transform: `translateX(-${this.currentIndex * 100}%)`
        }
      }
    },
    methods: {
      ...mapActions('reviews', ['loadReviews']),
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.reviews.length
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length
      },
      goToSlide(index) {
        this.currentIndex = index
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX
        this.pauseAutoSlide()
      },
      handleTouchEnd(e) {
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchEndX - this.touchStartX

        if (Math.abs(diff) > 50) {
          diff > 0 ? this.prevSlide() : this.nextSlide()
        }
        this.resumeAutoSlide()
      },
      startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
          if (this.isAutoPlaying) this.nextSlide()
        }, 6000)
      },
      pauseAutoSlide() {
        this.isAutoPlaying = false
      },
      resumeAutoSlide() {
        this.isAutoPlaying = true
      },
      handleResize() {
        this.windowWidth = window.innerWidth
      },
      getImage(url) {
        return new URL(url, import.meta.url).href
      }
    },
    mounted() {
      this.loadReviews()
      this.startAutoSlide()
      window.addEventListener('resize', this.handleResize)
    },
    beforeUnmount() {
      clearInterval(this.autoSlideInterval)
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>

<style scoped>
.testimonials-section {
  padding: 4rem 1rem;
  background: #f9fafb;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #6b7280;
  font-size: 1.125rem;
}

.testimonials-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-card {
  flex: 0 0 100%;
  padding: 1rem;
  opacity: 0.5;
  transform: scale(0.95);
  transition: all 0.3s ease;
}

.testimonial-card.active {
  opacity: 1;
  transform: scale(1);
}

.testimonial-content {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.user-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.user-name {
  font-size: 1.125rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.review-rating {
  color: #f59e0b;
  font-size: 1.25rem;
}

.testimonial-text {
  color: #4b5563;
  line-height: 1.625;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.review-date {
  display: block;
  color: #6b7280;
  font-size: 0.875rem;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.carousel-control.prev {
  left: 1rem;
}

.carousel-control.next {
  right: 1rem;
}

.icon {
  width: 24px;
  height: 24px;
  fill: #1f2937;
}

.carousel-pagination {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-dot.active {
  background: #3b82f6;
  transform: scale(1.2);
}

@media (min-width: 768px) {
  .testimonial-card {
    flex: 0 0 50%;
    padding: 1.5rem;
  }

  .testimonial-text {
    -webkit-line-clamp: 3;
  }
}

@media (min-width: 1024px) {
  .testimonial-card {
    flex: 0 0 33.3333%;
  }

  .testimonials-container {
    padding: 0 2rem;
  }

  .carousel-control {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 640px) {
  .testimonial-card {
    padding: 0.5rem;
  }

  .testimonial-content {
    padding: 1.5rem;
  }

  .carousel-control {
    width: 40px;
    height: 40px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>