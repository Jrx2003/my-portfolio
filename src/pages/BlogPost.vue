<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BlogLayout from '../layouts/BlogLayout.vue'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const { slug } = route.params
  
  if (!slug) {
    router.push('/blog')
    return
  }
  
  try {
    // In a real implementation, you would load the markdown file and parse it
    // For this example, we'll use placeholder data
    setTimeout(() => {
      // Simulate loading a markdown post based on slug
      if (slug === 'getting-started-with-vue-3-composition-api') {
        post.value = {
          title: 'Getting Started with Vue 3 Composition API',
          date: 'April 15, 2025',
          tags: ['vue', 'javascript', 'web-development'],
          coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
          content: `
          <h2 id="introduction">Introduction</h2>
          <p>Vue 3's Composition API represents a major shift in how we structure component logic. Unlike the Options API where code is organized by option type (data, methods, computed, etc.), the Composition API lets us group code by logical concern.</p>
          
          <h2 id="why-use-composition-api">Why Use the Composition API?</h2>
          <p>The Composition API offers several advantages:</p>
          <ul>
            <li>Better organization of complex component logic</li>
            <li>More intuitive reuse of code across components</li>
            <li>Better TypeScript support</li>
            <li>More readable code for large components</li>
          </ul>
          
          <h3 id="code-reusability">Code Reusability</h3>
          <p>One of the biggest advantages is the ability to extract and reuse logic in "composition functions":</p>
          
          <pre><code>// useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  return {
    count,
    increment
  }
}</code></pre>
          
          <h2 id="getting-started">Getting Started</h2>
          <p>Let's create a simple component using the Composition API:</p>
          
          <pre><code>&lt;script setup&gt;
import { ref, computed } from 'vue'

// State
const firstName = ref('John')
const lastName = ref('Doe')

// Computed property
const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

// Method
function updateName(newFirstName) {
  firstName.value = newFirstName
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Hello, {{ fullName }}&lt;/h1&gt;
    &lt;input v-model="firstName" placeholder="First name"&gt;
    &lt;input v-model="lastName" placeholder="Last name"&gt;
    &lt;button @click="updateName('Jane')"&gt;Change to Jane&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          
          <h2 id="lifecycle-hooks">Lifecycle Hooks</h2>
          <p>Lifecycle hooks are also available as functions:</p>
          
          <pre><code>import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  console.log('Component mounted!')
  // Setup event listeners, initialize libraries, etc.
})

onBeforeUnmount(() => {
  console.log('Component will unmount!')
  // Clean up resources
})</code></pre>
          
          <h2 id="conclusion">Conclusion</h2>
          <p>The Composition API offers a more flexible way to organize and reuse component logic in Vue 3. While it takes some getting used to, especially if you're familiar with the Options API, the benefits in maintainability and code organization make it worth exploring for your next Vue project.</p>
          `
        }
      } else {
        error.value = 'Post not found.'
      }
      
      loading.value = false
    }, 1000)
  } catch (err) {
    error.value = 'Failed to load post. Please try again later.'
    loading.value = false
  }
})
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading" class="container mx-auto px-4 py-12 flex justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
  
  <!-- Error state -->
  <div v-else-if="error" class="container mx-auto px-4 py-12">
    <div class="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
      {{ error }}
    </div>
    <div class="mt-6 text-center">
      <router-link to="/blog" class="text-primary-600 dark:text-primary-400 hover:underline">
        ¡û Back to Blog
      </router-link>
    </div>
  </div>
  
  <!-- Post content -->
  <BlogLayout 
    v-else-if="post"
    :title="post.title"
    :date="post.date"
    :tags="post.tags"
    :coverImage="post.coverImage"
  >
    <div v-html="post.content"></div>
  </BlogLayout>
  
  <!-- TODO: Implement actual Markdown parsing from src/data/posts/ -->
</template>

<style>
/* Add specific blog post styling here if needed beyond BlogLayout styles */
</style> 