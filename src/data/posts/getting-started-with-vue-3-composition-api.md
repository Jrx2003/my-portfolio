---
title: Getting Started with Vue 3 Composition API
date: 2025-04-15
tags: [vue, javascript, web-development]
coverImage: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200
---

# Getting Started with Vue 3 Composition API

Vue 3's Composition API represents a major shift in how we structure component logic. Unlike the Options API where code is organized by option type (data, methods, computed, etc.), the Composition API lets us group code by logical concern.

## Why Use the Composition API?

The Composition API offers several advantages:

- Better organization of complex component logic
- More intuitive reuse of code across components
- Better TypeScript support
- More readable code for large components

### Code Reusability

One of the biggest advantages is the ability to extract and reuse logic in "composition functions":

```js
// useCounter.js
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
}
```

You can then import and use this function in any component:

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, increment } = useCounter()
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

## Getting Started

Let's create a simple component using the Composition API:

```vue
<script setup>
import { ref, computed } from 'vue'

// State
const firstName = ref('John')
const lastName = ref('Doe')

// Computed property
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// Method
function updateName(newFirstName) {
  firstName.value = newFirstName
}
</script>

<template>
  <div>
    <h1>Hello, {{ fullName }}</h1>
    <input v-model="firstName" placeholder="First name">
    <input v-model="lastName" placeholder="Last name">
    <button @click="updateName('Jane')">Change to Jane</button>
  </div>
</template>
```

## Lifecycle Hooks

Lifecycle hooks are also available as functions:

```js
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  console.log('Component mounted!')
  // Setup event listeners, initialize libraries, etc.
})

onBeforeUnmount(() => {
  console.log('Component will unmount!')
  // Clean up resources
})
```

## Reactive References vs Reactive Objects

Vue 3 provides two main ways to create reactive state:

### 1. Ref

```js
import { ref } from 'vue'

const count = ref(0) // Wrap primitive value
console.log(count.value) // You need to use .value to access or modify
```

### 2. Reactive

```js
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  name: 'John'
}) 
console.log(state.count) // Direct access, no .value needed
```

The main difference is that `ref` can wrap any value (including primitives), while `reactive` works with objects.

## Working with Props and Emit

Props are defined using `defineProps`, and custom events are emitted using `defineEmits`:

```vue
<script setup>
// Define props
const props = defineProps({
  message: {
    type: String,
    required: true
  }
})

// Define emits
const emit = defineEmits(['update', 'delete'])

function handleUpdate() {
  emit('update', 'New data')
}
</script>
```

## Accessing Template Refs

In the Composition API, template refs work a bit differently:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// Create a ref to hold the element reference
const inputRef = ref(null)

onMounted(() => {
  // Access the DOM element
  inputRef.value.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
```

## Conclusion

The Composition API offers a more flexible way to organize and reuse component logic in Vue 3. While it takes some getting used to, especially if you're familiar with the Options API, the benefits in maintainability and code organization make it worth exploring for your next Vue project.

Remember that you can still use the Options API in Vue 3 - both APIs are fully supported, and you can even mix them in the same project. However, for new projects, the Composition API is often the recommended approach, especially for larger applications.

For more information, check out the [Vue.js documentation](https://v3.vuejs.org/guide/composition-api-introduction.html). 