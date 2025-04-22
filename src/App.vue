<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDarkMode = ref(false)
const isMenuOpen = ref(false)
const isNavVisible = ref(false)

// Check for saved theme preference or use device preference
onBeforeMount(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

// Show nav with animation after a delay
onMounted(() => {
  setTimeout(() => {
    isNavVisible.value = true
  }, 500)
})

// Toggle theme function
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 菜单项中英文映射
const menuItems = [
  { path: '', label: '首页' },
  { path: 'skills', label: '技能' },
  { path: 'resume', label: '简历' },
  { path: 'photos', label: '摄影' },
  { path: 'anime', label: '动漫' },
  { path: 'blog', label: '博客' }
]
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50">
    <!-- Navigation -->
    <nav 
      :class="{'translate-y-0': isNavVisible, '-translate-y-full': !isNavVisible}"
      class="glass-nav fixed top-0 left-0 right-0 z-50 transition-transform duration-500 dark:bg-gray-800/20 px-6 py-4"
    >
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="font-bold text-2xl text-primary-500">个人主页</router-link>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8">
          <router-link v-for="item in menuItems" 
            :key="item.path" 
            :to="`/${item.path}`" 
            class="py-2 relative"
            :class="{'text-primary-500 font-medium': $route.path === `/${item.path}`}"
          >
            {{ item.label }}
            <span v-if="$route.path === `/${item.path}`" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500"></span>
          </router-link>
        </div>
        
        <!-- Theme Toggle -->
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <div class="w-6 h-5 relative flex flex-col justify-between">
            <span :class="{'rotate-45 translate-y-2': isMenuOpen}" class="w-full h-0.5 bg-current transform transition-transform"></span>
            <span :class="{'opacity-0': isMenuOpen}" class="w-full h-0.5 bg-current transition-opacity"></span>
            <span :class="{'-rotate-45 -translate-y-2': isMenuOpen}" class="w-full h-0.5 bg-current transform transition-transform"></span>
          </div>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="isMenuOpen" 
        class="md:hidden pt-4 pb-2 animate-slide-in-top"
      >
        <div class="container mx-auto space-y-2">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path" 
            :to="`/${item.path}`" 
            class="block py-2 px-4 rounded-lg"
            :class="{'bg-primary-500/10 text-primary-500': $route.path === `/${item.path}`}"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </nav>
    
    <!-- Page Content -->
    <main class="pt-24 pb-20">
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-800 py-10 mt-auto">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <p class="text-gray-700 dark:text-gray-300">© 2025 个人作品集</p>
          </div>
          <div class="flex space-x-6">
            <!-- GitHub -->
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:-translate-y-2 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <!-- LinkedIn -->
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-400 hover:-translate-y-2 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <!-- Email -->
            <a href="mailto:your.email@example.com" class="text-gray-600 dark:text-gray-400 hover:-translate-y-2 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
