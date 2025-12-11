<template>
  <div class="app">
    <header class="header">
      <h1>🛠️ Useful Tools</h1>
      <p>Your personal toolkit, accessible everywhere</p>
    </header>

    <main class="container">
      <div class="tools-grid">
        <div class="tool-card" @click="selectedTool = 'spin-wheel'">
          <h3>Spin Wheel</h3>
          <span class="tag">game</span>
          <p>Weighted random selector with URL sync</p>
        </div>
        
        <div class="tool-card" @click="selectedTool = 'currency'">
          <h3>Currency Converter</h3>
          <span class="tag">utility</span>
          <p>USD / SGD / CNY real-time rates</p>
        </div>
        
        <div class="tool-card" @click="selectedTool = 'hiking'">
          <h3>Hiking Safety Guide</h3>
          <span class="tag">guide</span>
          <p>Safety checklist & detailed guidelines</p>
        </div>
      </div>

      <div v-if="selectedTool" class="tool-viewer">
        <button @click="selectedTool = null" class="back-btn">← Back</button>
        <SpinWheel v-if="selectedTool === 'spin-wheel'" />
        <CurrencyConverter v-if="selectedTool === 'currency'" />
        <HikingGuide v-if="selectedTool === 'hiking'" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SpinWheel from '../../tools/spin-wheel/index.vue'
import CurrencyConverter from '../../tools/currency-converter/index.vue'
import HikingGuide from '../../tools/hiking-guide/index.vue'

const selectedTool = ref(null)
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.2);
}

.header h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
}

.header p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-left-color: #764ba2;
}

.tool-card h3 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 1.3rem;
}

.tool-card p {
  margin: 0.5rem 0 1rem 0;
  color: #666;
  font-size: 0.95rem;
}

.tag {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tool-viewer {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #764ba2;
  transform: translateX(-4px);
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
}
</style>
