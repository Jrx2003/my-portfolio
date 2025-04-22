<script setup>
import { ref, computed, onMounted } from 'vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import photosData from '../data/photos.json'

const photos = ref([])
const loading = ref(true)
const selectedPhoto = ref(null)
const lightboxOpen = ref(false)
const captionVisible = ref(false)

// Separate photos into columns for masonry layout
const columns = computed(() => {
  const result = [[], [], []]
  photos.value.forEach((photo, i) => {
    result[i % 3].push(photo)
  })
  return result
})

onMounted(async () => {
  // In a real implementation, we would load from the JSON file
  // For this example, we'll simulate loading with placeholder data
  setTimeout(() => {
    photos.value = [
      {
        id: 1,
        src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
        thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500',
        alt: 'Forest landscape with mountain view',
        caption: 'Forest landscape with mountain view, Summer 2023',
        width: 1200,
        height: 800
      },
      {
        id: 2,
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
        thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500',
        alt: 'Mountain range at sunset',
        caption: 'Mountain range at sunset, Autumn 2022',
        width: 1200,
        height: 1600
      },
      {
        id: 3,
        src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
        thumbnail: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500',
        alt: 'Coastal waves at sunset',
        caption: 'Coastal waves at sunset, Winter 2023',
        width: 1200,
        height: 900
      },
      {
        id: 4,
        src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
        thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500',
        alt: 'Starry night in the mountains',
        caption: 'Starry night in the mountains, Winter 2022',
        width: 1200,
        height: 800
      },
      {
        id: 5,
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500',
        alt: 'Valley with river',
        caption: 'Valley with river, Summer 2022',
        width: 1200,
        height: 1400
      },
      {
        id: 6,
        src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6',
        thumbnail: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=500',
        alt: 'Aerial view of forest',
        caption: 'Aerial view of forest, Spring 2023',
        width: 1200,
        height: 1000
      }
    ]
    loading.value = false
  }, 1000)
})

const openLightbox = (photo) => {
  selectedPhoto.value = photo
  lightboxOpen.value = true
  setTimeout(() => {
    captionVisible.value = true
  }, 500)
}

const closeLightbox = () => {
  captionVisible.value = false
  setTimeout(() => {
    lightboxOpen.value = false
    selectedPhoto.value = null
  }, 300)
}

const navigatePhoto = (direction) => {
  if (!selectedPhoto.value) return
  
  const currentIndex = photos.value.findIndex(p => p.id === selectedPhoto.value.id)
  let newIndex = currentIndex + direction
  
  // Loop around if at the end or beginning
  if (newIndex < 0) newIndex = photos.value.length - 1
  if (newIndex >= photos.value.length) newIndex = 0
  
  captionVisible.value = false
  setTimeout(() => {
    selectedPhoto.value = photos.value[newIndex]
    setTimeout(() => {
      captionVisible.value = true
    }, 300)
  }, 300)
}

// Handle keyboard navigation
const handleKeyDown = (e) => {
  if (!lightboxOpen.value) return
  
  switch (e.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      navigatePhoto(-1)
      break
    case 'ArrowRight':
      navigatePhoto(1)
      break
  }
}
</script>

<template>
  <BaseLayout title="Photography" subtitle="Capturing moments through my lens">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <!-- Masonry grid gallery -->
    <div v-else class="flex gap-4">
      <div v-for="(column, colIndex) in columns" :key="colIndex" class="flex-1 space-y-4">
        <div 
          v-for="photo in column" 
          :key="photo.id"
          class="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          @click="openLightbox(photo)"
        >
          <img 
            :src="photo.thumbnail" 
            :alt="photo.alt" 
            class="w-full h-auto transform hover:scale-105 transition-transform duration-500"
            loading="lazy"
          >
        </div>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-if="!loading && photos.length === 0" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">No photos to display yet. Check back soon!</p>
    </div>
    
    <!-- Lightbox modal -->
    <div 
      v-if="lightboxOpen" 
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      @click="closeLightbox"
      @keydown="handleKeyDown"
      tabindex="0"
    >
      <!-- Close button -->
      <button 
        class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        @click="closeLightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Navigation buttons -->
      <button 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
        @click.stop="navigatePhoto(-1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
        @click.stop="navigatePhoto(1)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Photo -->
      <div class="relative max-w-4xl max-h-[80vh] overflow-hidden" @click.stop>
        <img 
          v-if="selectedPhoto" 
          :src="selectedPhoto.src" 
          :alt="selectedPhoto.alt" 
          class="max-w-full max-h-[80vh] object-contain"
        >
        
        <!-- Caption overlay -->
        <div 
          v-if="selectedPhoto && captionVisible" 
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 transform transition-transform duration-300"
          :class="{ 'translate-y-0': captionVisible, 'translate-y-full': !captionVisible }"
        >
          <p>{{ selectedPhoto.caption }}</p>
        </div>
      </div>
    </div>
    
    <!-- TODO: Add your photo data in src/data/photos.json -->
  </BaseLayout>
</template>

<style scoped>
/* Custom styles for photos */
</style> 