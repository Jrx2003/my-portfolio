<script setup>
import { ref, onMounted } from 'vue'
import BaseLayout from '../layouts/BaseLayout.vue'
import resumeData from '../data/resume.yaml'

const sections = ref([])

onMounted(() => {
  // In a real implementation, resume data would be loaded from the YAML file
  // For this example, we'll use placeholder data
  sections.value = [
    {
      title: 'Education',
      items: [
        {
          title: 'Master of Computer Science',
          organization: 'University of Technology',
          location: 'San Francisco, CA',
          date: '2023 - Present',
          description: 'Specializing in artificial intelligence and machine learning. Current GPA: 3.9/4.0.'
        },
        {
          title: 'Bachelor of Science in Computer Science',
          organization: 'State University',
          location: 'Los Angeles, CA',
          date: '2019 - 2023',
          description: 'Graduated with honors. Thesis on deep learning applications in computer vision. GPA: 3.8/4.0.'
        }
      ]
    },
    {
      title: 'Experience',
      items: [
        {
          title: 'Software Engineering Intern',
          organization: 'Tech Solutions Inc.',
          location: 'Remote',
          date: 'Summer 2022',
          description: 'Developed a web application using Vue.js and Node.js. Implemented RESTful APIs and optimized database queries.'
        },
        {
          title: 'Research Assistant',
          organization: 'AI Research Lab - State University',
          location: 'Los Angeles, CA',
          date: '2021 - 2023',
          description: 'Assisted in developing machine learning models for image classification. Published two papers in international conferences.'
        }
      ]
    },
    {
      title: 'Projects',
      items: [
        {
          title: 'Neural Network Visualization Tool',
          date: '2022',
          description: 'A web-based tool that visualizes neural network architectures and training processes in real-time.'
        },
        {
          title: 'Smart Campus Navigation App',
          date: '2021',
          description: 'A mobile application that helps students navigate campus efficiently using indoor positioning systems.'
        }
      ]
    },
    {
      title: 'Awards',
      items: [
        {
          title: 'Dean\'s List',
          organization: 'State University',
          date: '2020 - 2023',
          description: 'Recognized for academic excellence for 6 consecutive semesters.'
        },
        {
          title: 'Hackathon Winner',
          organization: 'Tech Innovators Conference',
          date: '2022',
          description: 'First place in the annual hackathon with a project on sustainable energy management.'
        }
      ]
    }
  ]
})
</script>

<template>
  <BaseLayout title="Resume" subtitle="My professional journey">
    <div class="mb-6 flex justify-between items-center">
      <div>
        <p class="text-gray-600 dark:text-gray-400">
          Last updated: April 2025
        </p>
      </div>
      <a 
        href="/Resume.pdf" 
        target="_blank" 
        class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors duration-300 inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download PDF
      </a>
    </div>
    
    <!-- Resume Timeline -->
    <div class="space-y-16">
      <section v-for="(section, index) in sections" :key="index">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          {{ section.title }}
        </h2>
        
        <div class="space-y-8">
          <div 
            v-for="(item, i) in section.items" 
            :key="i"
            class="relative pl-8 pb-6"
          >
            <!-- Timeline dot and line -->
            <div class="absolute top-0 left-0 h-full">
              <div class="w-4 h-4 rounded-full bg-primary-500 absolute top-1 -left-2"></div>
              <div class="w-0.5 h-full bg-gray-200 dark:bg-gray-700 absolute left-0"></div>
            </div>
            
            <!-- Content -->
            <div>
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ item.title }}</h3>
                <span class="text-primary-600 dark:text-primary-400 text-sm sm:text-base mt-1 sm:mt-0">{{ item.date }}</span>
              </div>
              
              <div v-if="item.organization" class="mb-2">
                <div class="flex items-center text-gray-700 dark:text-gray-300">
                  <span>{{ item.organization }}</span>
                  <span v-if="item.location" class="mx-2">•</span>
                  <span v-if="item.location">{{ item.location }}</span>
                </div>
              </div>
              
              <p class="text-gray-600 dark:text-gray-400 mt-2">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- TODO: Add your resume data in src/data/resume.yaml -->
  </BaseLayout>
</template>

<style scoped>
@media print {
  .bg-primary-500 {
    background-color: #0ea5e9 !important;
    color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  @page {
    size: letter portrait;
    margin: 1cm;
  }
  
  body {
    color: black;
  }
  
  a[href]:after {
    content: none !important;
  }
}
</style> 