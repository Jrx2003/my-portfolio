<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import BaseLayout from '../layouts/BaseLayout.vue'

// State
const posts = ref([])
const loading = ref(true)
const selectedTags = ref([])
const allTags = ref([])

// Filtered posts based on selected tags
const filteredPosts = computed(() => {
  if (selectedTags.value.length === 0) return posts.value
  
  return posts.value.filter(post => {
    return selectedTags.value.every(tag => post.tags.includes(tag))
  })
})

// Toggle tag selection
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// Load posts data
onMounted(async () => {
  // In a real implementation, we would load posts from markdown files
  // For this example, we'll use placeholder data
  setTimeout(() => {
    posts.value = [
      {
        slug: 'getting-started-with-vue-3-composition-api',
        title: 'Getting Started with Vue 3 Composition API',
        date: 'April 15, 2025',
        excerpt: 'Learn how the Vue 3 Composition API helps organize your component logic and improve code reusability compared to the Options API.',
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
        tags: ['vue', 'javascript', 'web-development'],
        readingTime: '5 min'
      },
      {
        slug: 'mastering-tailwind-css-for-rapid-ui-development',
        title: 'Mastering Tailwind CSS for Rapid UI Development',
        date: 'April 10, 2025',
        excerpt: 'Discover how Tailwind CSS can dramatically speed up your UI development workflow while maintaining design consistency.',
        coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200',
        tags: ['css', 'tailwind', 'web-development'],
        readingTime: '7 min'
      },
      {
        slug: 'exploring-tensorflow-js-for-browser-based-ml',
        title: 'Exploring TensorFlow.js for Browser-Based ML',
        date: 'April 2, 2025',
        excerpt: 'Explore how to use TensorFlow.js to run machine learning models directly in the browser for real-time applications.',
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200',
        tags: ['machine-learning', 'javascript', 'tensorflow'],
        readingTime: '10 min'
      },
      {
        slug: 'building-responsive-layouts-with-css-grid',
        title: 'Building Responsive Layouts with CSS Grid',
        date: 'March 25, 2025',
        excerpt: 'Master the power of CSS Grid to create complex, responsive layouts with clean, maintainable code.',
        coverImage: 'https://images.unsplash.com/photo-1561883088-039e53143d73?w=1200',
        tags: ['css', 'web-development', 'design'],
        readingTime: '6 min'
      },
      {
        slug: 'introduction-to-webassembly-for-javascript-developers',
        title: 'Introduction to WebAssembly for JavaScript Developers',
        date: 'March 18, 2025',
        excerpt: 'Learn how WebAssembly can supercharge your web applications with near-native performance.',
        coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
        tags: ['webassembly', 'javascript', 'performance'],
        readingTime: '8 min'
      }
    ]
    
    // Extract all unique tags
    const tags = new Set()
    posts.value.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    allTags.value = [...tags]
    
    loading.value = false
    
    // Animate post cards with GSAP
    gsap.from('.post-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out'
    })
  }, 1000)
})
</script>

<template>
  <BaseLayout title="Blog" subtitle="Thoughts, tutorials, and tech insights">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else>
      <!-- Tag filters -->
      <div class="mb-8">
        <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-3">Filter by tags:</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tag in allTags" 
            :key="tag"
            @click="toggleTag(tag)"
            class="px-3 py-1 rounded-full text-sm transition-colors duration-200"
            :class="selectedTags.includes(tag) 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'"
          >
            #{{ tag }}
          </button>
        </div>
      </div>
      
      <!-- Blog posts grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article 
          v-for="post in filteredPosts" 
          :key="post.slug"
          class="post-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <router-link :to="`/blog/${post.slug}`">
            <div class="h-48 overflow-hidden">
              <img 
                :src="post.coverImage" 
                :alt="post.title" 
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              >
            </div>
            
            <div class="p-5">
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{{ post.date }}</span>
                <span class="mx-2">•</span>
                <span>{{ post.readingTime }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ post.excerpt }}</p>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in post.tags" 
                  :key="`${post.slug}-${tag}`"
                  class="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </router-link>
        </article>
      </div>
      
      <!-- Empty state -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400">
          No posts found with the selected tags. Please try a different filter.
        </p>
        <button 
          @click="selectedTags = []" 
          class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
    
    <!-- TODO: Add your blog posts in src/data/posts/ -->
  </BaseLayout>
</template>

<style scoped>
/* Custom styles for blog */
</style> 