<template>
  <div class="app">
    <header class="header">
      <h1>🛠️ Useful Tools</h1>
      <p>Your personal toolkit, accessible everywhere</p>
    </header>

    <main class="container">
      <div v-if="loading" class="loading">Loading tools...</div>
      <div v-if="error" class="error">Error: {{ error }}</div>
      
      <div v-if="!loading && !error" class="tools-grid">
        <div v-for="tool in tools" :key="tool.id" class="tool-card">
          <h3>{{ tool.name }}</h3>
          <span class="tag">{{ tool.category }}</span>
          <button @click="openTool(tool.name)">
            Open Tool
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tools = ref([])
const loading = ref(true)
const error = ref(null)

const fetchTools = async () => {
  try {
    const response = await fetch('/api/tools')
    if (!response.ok) throw new Error('Failed to fetch tools')
    const data = await response.json()
    tools.value = data.tools
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const openTool = (toolName) => {
  alert(`Opening ${toolName}`)
}

onMounted(() => {
  fetchTools()
})
</script>

<style scoped>
/* Component styles are in index.css */
</style>
