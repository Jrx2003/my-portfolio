<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Typewriter effect state
const roles = ['CS Student', 'Data Scientist', 'Photographer']
const currentRoleIndex = ref(0)
const currentRole = ref(roles[0])
const isCardFlipped = ref(false)

// Function to animate the typewriter effect
onMounted(() => {
  // Set up role cycling
  let index = 0
  setInterval(() => {
    index = (index + 1) % roles.length
    currentRole.value = roles[index]
  }, 3000)
  
  // GSAP animations for scroll reveal
  gsap.from('.skills-section', {
    scrollTrigger: {
      trigger: '.skills-section',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8
  })
  
  gsap.from('.blog-preview', {
    scrollTrigger: {
      trigger: '.blog-preview',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.2
  })
  
  gsap.from('.cta-buttons', {
    scrollTrigger: {
      trigger: '.cta-buttons',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.4
  })
})

// Toggle card flip
const toggleCardFlip = () => {
  isCardFlipped.value = !isCardFlipped.value
}
</script>

<template>
  <div>
    <!-- Hero section with gradient mesh background -->
    <section class="h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <!-- Gradient mesh background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 opacity-20 dark:opacity-30"></div>
      <div class="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <!-- Floating circles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute h-64 w-64 rounded-full bg-primary-400/10 -top-12 -left-12 blur-xl animate-float"></div>
        <div class="absolute h-96 w-96 rounded-full bg-purple-400/10 top-1/3 -right-24 blur-xl animate-float" style="animation-delay: 1s"></div>
        <div class="absolute h-64 w-64 rounded-full bg-pink-400/10 -bottom-12 left-1/4 blur-xl animate-float" style="animation-delay: 2s"></div>
      </div>
      
      <!-- Content -->
      <div class="container mx-auto px-4 z-10 text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4">John Doe</h1>
        <div class="h-8 relative overflow-hidden">
          <div class="flex items-center justify-center h-full">
            <span class="text-xl md:text-2xl font-medium text-primary-600 dark:text-primary-400">
              {{ currentRole }}
            </span>
          </div>
        </div>
        
        <div class="mt-12">
          <a href="#about" class="inline-block rounded-full p-3 bg-white/10 hover:bg-white/20 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
    
    <!-- About Me section with flip card -->
    <section id="about" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">About Me</h2>
        
        <div class="flex justify-center">
          <div 
            class="w-full max-w-md h-64 md:h-80 cursor-pointer perspective-1000"
            @click="toggleCardFlip"
          >
            <div 
              class="relative w-full h-full transition-transform duration-500"
              :class="{'rotate-y-180': isCardFlipped}"
            >
              <!-- Front of card -->
              <div class="absolute inset-0 glass-card p-6 flex flex-col justify-center items-center backface-hidden">
                <img src="/placeholder-profile.jpg" alt="Profile" class="w-24 h-24 rounded-full mb-4">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">John Doe</h3>
                <p class="text-gray-600 dark:text-gray-300 text-center">Computer Science Student at University of Technology</p>
                <p class="mt-4 text-sm text-primary-600 dark:text-primary-400">Click to learn more</p>
              </div>
              
              <!-- Back of card -->
              <div class="absolute inset-0 glass-card p-6 flex flex-col justify-center rotate-y-180 backface-hidden">
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">My Journey</h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm">
                  I'm a passionate computer science student with a love for data science, web development, and photography. When I'm not coding, you can find me exploring the world through my camera lens.
                </p>
                <p class="mt-4 text-sm text-primary-600 dark:text-primary-400">Click to flip back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Preview Section -->
    <section class="py-16 skills-section">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">My Skills</h2>
        
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="skill in ['JavaScript', 'Vue', 'React', 'Python', 'TensorFlow']" :key="skill" 
            class="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {{ skill }}
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <router-link to="/skills" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
            See all my skills →
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Latest Blog Post Preview -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800 blog-preview">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Latest Blog Post</h2>
        
        <div class="max-w-2xl mx-auto glass-card p-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Getting Started with Vue 3 Composition API</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">April 15, 2025 • 5 min read</p>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            Learn how the Vue 3 Composition API helps organize your component logic and improve code reusability compared to the Options API...
          </p>
          <router-link to="/blog/getting-started-with-vue-3-composition-api" class="text-primary-600 dark:text-primary-400 font-medium">
            Read more →
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- CTA Buttons -->
    <section class="py-20 cta-buttons">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-10 text-gray-800 dark:text-white">Let's Connect</h2>
        
        <div class="flex flex-wrap justify-center gap-4">
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            GitHub Projects
          </a>
          <router-link 
            to="/resume" 
            class="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Resume
          </router-link>
          <a 
            href="mailto:your.email@example.com" 
            class="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.backface-hidden {
  backface-visibility: hidden;
}
</style> 