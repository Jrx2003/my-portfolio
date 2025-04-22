<script setup>
import { ref, onMounted } from 'vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import skillsData from '../data/skills.json'

const categories = ['编程语言', '框架', '工具']
const activeCategory = ref('编程语言')
const filteredSkills = ref([])

const setActiveCategory = (category) => {
  activeCategory.value = category
  filterSkills()
}

const filterSkills = () => {
  // 将英文类别映射为中文
  const categoryMap = {
    '编程语言': 'Languages',
    '框架': 'Frameworks',
    '工具': 'Tools'
  }
  
  filteredSkills.value = skillsData.filter(skill => 
    skill.category === categoryMap[activeCategory.value]
  )
}

// Initialize with first category
onMounted(() => {
  filterSkills()
})
</script>

<template>
  <BaseLayout title="技能" subtitle="我使用的技术栈">
    <!-- Category tabs -->
    <div class="flex flex-wrap justify-center mb-12 border-b dark:border-gray-700">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="setActiveCategory(category)"
        class="px-6 py-3 text-lg transition-colors duration-200 focus:outline-none"
        :class="activeCategory === category 
          ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'"
      >
        {{ category }}
      </button>
    </div>
    
    <!-- Skills grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      <div 
        v-for="skill in filteredSkills" 
        :key="skill.name"
        class="skill-badge group"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
          <div class="w-12 h-12 mb-3 flex items-center justify-center">
            <img v-if="skill.icon" :src="skill.icon" :alt="skill.name" class="max-w-full max-h-full">
            <div v-else class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-500 dark:text-gray-300">
              {{ skill.name.charAt(0) }}
            </div>
          </div>
          <h3 class="font-medium text-gray-800 dark:text-white text-center">{{ skill.name }}</h3>
          <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div class="bg-primary-500 h-1.5 rounded-full" :style="`width: ${skill.level}%`"></div>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">{{ skill.level }}%</p>
        </div>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-if="filteredSkills.length === 0" class="text-center py-12">
      <p class="text-gray-600 dark:text-gray-400">该分类下暂无技能。是时候学习新东西了！</p>
    </div>
    
    <!-- TODO: 在 src/data/skills.json 中添加你的技能 -->
  </BaseLayout>
</template>

<style scoped>
.skill-badge {
  perspective: 500px;
}

.skill-badge:hover > div {
  transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
}
</style> 