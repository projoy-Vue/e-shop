<template>
    <section class="brand-story">
      <div class="content">
        <!-- Left Side: Video/Animation -->
        <div class="video-container">
          <video 
            src="" 
            autoplay 
            loop 
            muted 
            playsinline 
            @mouseenter="handleMouseEnter" 
            @mouseleave="handleMouseLeave"
            ref="video"
          />
          <div class="overlay" v-if="!isPlaying">
            <button @click="playVideo" class="play-button">
              ▶
            </button>
          </div>
        </div>
  
        <!-- Right Side: Brand Story Content -->
        <div class="text-container">
          <h2>Our Story</h2>
          <p>
            At **EcoLuxe Haven**, we believe that gifts are more than just objects — 
            they’re a way to create memories and strengthen connections. 
            Every product is thoughtfully crafted to reflect love, care, and creativity.
          </p>
          <p>
            Our mission is to make meaningful gifting easy and inspiring. 
            We value quality, sustainability, and personalized experiences.
          </p>
          <router-link to="/about" class="cta-button">Discover More</router-link>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'BrandStory',
    data() {
      return {
        isPlaying: true
      };
    },
    methods: {
      playVideo() {
        const video = this.$refs.video;
        if (video.paused) {
          video.play();
          this.isPlaying = true;
        } else {
          video.pause();
          this.isPlaying = false;
        }
      },
      handleMouseEnter() {
        const video = this.$refs.video;
        if (!this.isPlaying) {
          video.play();
          this.isPlaying = true;
        }
      },
      handleMouseLeave() {
        const video = this.$refs.video;
        if (this.isPlaying) {
          video.pause();
          this.isPlaying = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .brand-story {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    background: linear-gradient(135deg, #fafafa, #f4f4f4);
  }
  
  .content {
    display: flex;
    gap: 40px;
    max-width: 1200px;
  }
  
  .video-container {
    position: relative;
    flex: 1;
    max-width: 500px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .video-container video {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .video-container:hover {
    transform: scale(1.03);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play-button {
    background-color: rgba(255, 255, 255, 0.8);
    color: #333;
    font-size: 2rem;
    border: none;
    padding: 12px 20px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .play-button:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  
  /* Right Side Styling */
  .text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  /* CTA Button Styling */
  .cta-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #e3b23c;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .cta-button:hover {
    background-color: #c89e35;
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .content {
      flex-direction: column;
      text-align: center;
    }
  
    .video-container {
      max-width: 100%;
    }
  }
  </style>
  
