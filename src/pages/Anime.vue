<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseLayout from '../layouts/BaseLayout.vue'

// State
const animeList = ref([])
const loading = ref(true)
const error = ref(null)
const lastUpdated = ref(null)

// Day of week mapping
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const currentDay = ref(new Date().getDay())

// Group anime by weekday
const animeByDay = computed(() => {
  const result = {}
  
  dayNames.forEach(day => {
    result[day] = animeList.value.filter(anime => 
      anime.nextAiringEpisode && 
      getLocalDay(new Date(anime.nextAiringEpisode.airingAt * 1000)) === day
    )
  })
  
  return result
})

// Convert UNIX timestamp to local day name
function getLocalDay(date) {
  return dayNames[date.getDay()]
}

// Format airing time to readable local time
function formatAiringTime(timestamp) {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Calculate time until airing
function timeUntilAiring(timestamp) {
  const now = Math.floor(Date.now() / 1000)
  const secondsUntil = timestamp - now
  
  if (secondsUntil <= 0) return 'Airing now'
  
  const days = Math.floor(secondsUntil / 86400)
  const hours = Math.floor((secondsUntil % 86400) / 3600)
  const minutes = Math.floor((secondsUntil % 3600) / 60)
  
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

// Fetch anime data from AniList GraphQL API
async function fetchAnimeData() {
  loading.value = true
  error.value = null
  
  try {
    const query = `
      query {
        Page {
          mediaList(userName: "YourAniListUsername", status: CURRENT, type: ANIME) {
            media {
              id
              title {
                english
                romaji
              }
              coverImage {
                large
              }
              nextAiringEpisode {
                airingAt
                episode
              }
            }
          }
        }
      }
    `
    
    // In a real implementation, you would make a fetch request to the AniList API
    // For this example, we'll simulate with placeholder data
    setTimeout(() => {
      animeList.value = [
        {
          id: 1,
          title: {
            english: 'My Hero Academia',
            romaji: 'Boku no Hero Academia'
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21856-BIORD3CZXyZk.jpg'
          },
          nextAiringEpisode: {
            airingAt: Math.floor(Date.now() / 1000) + 86400, // Tomorrow
            episode: 5
          }
        },
        {
          id: 2,
          title: {
            english: 'Demon Slayer',
            romaji: 'Kimetsu no Yaiba'
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx101922-PEn1CTc93blC.jpg'
          },
          nextAiringEpisode: {
            airingAt: Math.floor(Date.now() / 1000) + 86400 * 2, // 2 days later
            episode: 8
          }
        },
        {
          id: 3,
          title: {
            english: 'Spy x Family',
            romaji: 'Spy x Family'
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx140960-vN5mHk7IpUQV.jpg'
          },
          nextAiringEpisode: {
            airingAt: Math.floor(Date.now() / 1000) + 86400 * 5, // 5 days later
            episode: 3
          }
        },
        {
          id: 4,
          title: {
            english: 'Chainsaw Man',
            romaji: 'Chainsaw Man'
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx127230-FlochcFsyoF4.png'
          },
          nextAiringEpisode: {
            airingAt: Math.floor(Date.now() / 1000) + 86400 * 3, // 3 days later
            episode: 6
          }
        }
      ]
      
      loading.value = false
      lastUpdated.value = new Date()
    }, 1000)
  } catch (err) {
    error.value = 'Failed to load anime data. Please try again later.'
    loading.value = false
  }
}

// Set up polling
onMounted(() => {
  fetchAnimeData()
  
  // Poll every 6 hours
  const pollInterval = 6 * 60 * 60 * 1000 // 6 hours in milliseconds
  setInterval(fetchAnimeData, pollInterval)
})
</script>

<template>
  <BaseLayout title="Anime Tracker" subtitle="Keep track of your watching list">
    <!-- Loading state -->
    <div v-if="loading && !animeList.length" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <!-- Error state -->
    <div v-if="error" class="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
      {{ error }}
    </div>
    
    <!-- Last updated info -->
    <div v-if="lastUpdated" class="text-sm text-gray-600 dark:text-gray-400 mb-6 flex items-center">
      <span>Last updated: {{ lastUpdated.toLocaleString() }}</span>
      <button 
        @click="fetchAnimeData" 
        class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        :disabled="loading"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
    
    <!-- Weekly calendar grid -->
    <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div 
        v-for="day in dayNames" 
        :key="day"
        :class="[
          'bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4 transform transition-all duration-500',
          'animate-slide-in-bottom',
          day === dayNames[currentDay] ? 'ring-2 ring-primary-500' : ''
        ]"
        :style="`animation-delay: ${dayNames.indexOf(day) * 0.1}s`"
      >
        <h3 class="font-bold text-center border-b pb-2 mb-3 text-gray-800 dark:text-white">{{ day }}</h3>
        
        <!-- Anime cards for this day -->
        <div v-if="animeByDay[day] && animeByDay[day].length" class="space-y-4">
          <div 
            v-for="anime in animeByDay[day]" 
            :key="anime.id"
            class="flex rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="w-16 h-20 shrink-0">
              <img :src="anime.coverImage.large" :alt="anime.title.english || anime.title.romaji" class="w-full h-full object-cover">
            </div>
            
            <div class="p-2 flex-1 min-w-0">
              <h4 class="font-medium text-gray-800 dark:text-white text-sm truncate">
                {{ anime.title.english || anime.title.romaji }}
              </h4>
              <p class="text-xs text-gray-600 dark:text-gray-300">Ep {{ anime.nextAiringEpisode.episode }}</p>
              <div class="flex justify-between text-xs mt-1">
                <span class="text-primary-600 dark:text-primary-400">
                  {{ timeUntilAiring(anime.nextAiringEpisode.airingAt) }}
                </span>
                <span class="text-gray-500 dark:text-gray-400">
                  {{ new Date(anime.nextAiringEpisode.airingAt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty state for this day -->
        <div v-else class="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
          No episodes airing
        </div>
      </div>
    </div>
    
    <!-- TODO: Update with your AniList username in the GraphQL query -->
  </BaseLayout>
</template>

<style scoped>
/* Custom styles for anime tracker */
</style> 