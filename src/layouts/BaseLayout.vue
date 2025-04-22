<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="py-8">
    <div :class="fullWidth ? 'container-fluid mx-4' : 'container mx-auto px-4'">
      <header v-if="title" class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">{{ title }}</h1>
        <p v-if="subtitle" class="text-xl text-gray-600 dark:text-gray-300">{{ subtitle }}</p>
      </header>
      
      <slot></slot>
    </div>
  </div>
</template> 