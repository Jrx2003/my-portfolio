<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  coverImage: {
    type: String,
    default: ''
  }
})

const readingTime = ref('0 min read')
const postContent = ref(null)
const toc = ref([])

onMounted(() => {
  if (postContent.value) {
    // Calculate reading time
    const textContent = postContent.value.textContent || ''
    const wordCount = textContent.split(/\s+/).length
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200))
    readingTime.value = `${readingTimeMinutes} min read`
    
    // Generate table of contents
    const headings = postContent.value.querySelectorAll('h2, h3')
    toc.value = Array.from(headings).map((heading) => ({
      id: heading.id || heading.textContent.toLowerCase().replace(/\W+/g, '-'),
      text: heading.textContent,
      level: parseInt(heading.tagName.substring(1))
    }))
    
    // Add IDs to headings if they don't have one
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase().replace(/\W+/g, '-')
      }
    })
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Cover image -->
    <div v-if="coverImage" class="mb-8 rounded-lg overflow-hidden h-64 md:h-80">
      <img :src="coverImage" :alt="title" class="w-full h-full object-cover">
    </div>
    
    <!-- Post header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">{{ title }}</h1>
      <div class="flex flex-wrap items-center text-gray-600 dark:text-gray-300 gap-4">
        <div>{{ date }}</div>
        <div>•</div>
        <div>{{ readingTime }}</div>
      </div>
      
      <div class="mt-4 flex flex-wrap gap-2">
        <span 
          v-for="tag in tags" 
          :key="tag" 
          class="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Table of contents -->
      <aside v-if="toc.length > 0" class="md:w-64 lg:w-80 shrink-0 order-2 md:order-1">
        <div class="sticky top-24 p-4 glass-card">
          <h3 class="font-medium text-lg mb-4 text-gray-800 dark:text-white">Table of Contents</h3>
          <nav>
            <ul class="space-y-2">
              <li v-for="item in toc" :key="item.id">
                <a 
                  :href="`#${item.id}`" 
                  :class="{
                    'ml-4': item.level === 3,
                    'hover:text-primary-500 dark:hover:text-primary-400': true,
                    'text-gray-700 dark:text-gray-300': true
                  }"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      
      <!-- Post content -->
      <div class="flex-1 order-1 md:order-2 prose prose-lg dark:prose-invert max-w-full" ref="postContent">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
/* Add custom styles for blog content */
.prose a {
  @apply text-primary-600 dark:text-primary-400 no-underline hover:underline;
}

.prose img {
  @apply rounded-lg shadow-md;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded;
}

.prose pre {
  @apply bg-gray-900 dark:bg-gray-800 rounded-lg shadow-md;
}
</style> 