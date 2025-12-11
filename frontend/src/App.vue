<template>
  <div class="app">
    <aside class="side" :class="{ open: sidebarOpen }" id="side">
      <div class="navTitle">Categories</div>
      <div id="catContainer">
        <details v-for="tag in sortedTags" :key="tag">
          <summary>
            # {{ tag }}
            <span class="count">{{ TAGS[tag]?.length || 0 }}</span>
          </summary>
          <div class="tagLinks">
            <a 
              v-for="post in TAGS[tag]" 
              :key="post.url" 
              href="#"
              @click.prevent="openTool(post)"
            >
              {{ post.title }}
            </a>
          </div>
        </details>
      </div>
    </aside>

    <div style="flex: 1">
      <div class="top">
        <button class="btn" @click="sidebarOpen = !sidebarOpen" id="menuBtn">☰</button>
        <div class="brand">
          <div class="logo"></div>
          <div>
            <div style="font-size: 15px; opacity: 0.9">{{ siteTitle }}</div>
            <div style="font-size: 12px; color: var(--muted)">{{ siteSubtitle }}</div>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="search">
          🔎 <input v-model="searchQuery" id="search" placeholder="Search..." />
        </div>
        <a id="adminLink" href="admin_psk.html" class="btn" style="display: none" title="Admin">Admin</a>
        <button @click="toggleTheme" class="btn" id="themeBtn" title="Toggle theme">☀️ / 🌙</button>
      </div>

      <main class="main">
        <div v-if="!selectedTool" class="grid" id="grid">
          <section v-for="post in filteredPosts" :key="post.url" class="card third">
            <div class="tags">
              <span v-for="tag in post.tags" :key="tag" class="pill">#{{ tag }}</span>
            </div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.desc || '' }}</p>
            <div class="actions">
              <a href="#" @click.prevent="openTool(post)" class="btn">Open</a>
              <a
                v-for="download in post.downloads"
                :key="download.url"
                :href="download.url"
                class="btn"
              >
                ⬇️ {{ download.label }}
              </a>
            </div>
          </section>
          <div v-if="filteredPosts.length === 0" class="card">
            <p style="margin: 0; color: var(--muted)">No posts match your filter.</p>
          </div>
        </div>

        <div v-else class="tool-viewer">
          <button @click="selectedTool = null" class="back-btn">← Back to Tools</button>
          <SpinWheel v-if="selectedTool === 'spin-wheel'" />
          <CurrencyConverter v-if="selectedTool === 'currency'" />
          <HikingGuide v-if="selectedTool === 'hiking'" />
        </div>

        <footer>© <span id="year"></span> · Minimal template · Built with Vue 3</footer>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SpinWheel from '@tools/spin-wheel/index.vue'
import CurrencyConverter from '@tools/currency-converter/index.vue'
import HikingGuide from '@tools/hiking-guide/index.vue'

const siteTitle = ref('My Workspace')
const siteSubtitle = ref('Minimal personal toolkit')
const POSTS = ref([])
const TAGS = ref({})
const sidebarOpen = ref(false)
const searchQuery = ref('')
const theme = ref('dark')
const selectedTool = ref(null)

const sortedTags = computed(() => {
  return Object.keys(TAGS.value).sort((a, b) => a.localeCompare(b))
})

const filteredPosts = computed(() => {
  let posts = POSTS.value.slice()
  
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    posts = posts.filter(p => 
      (p.title || '').toLowerCase().includes(q) ||
      (p.desc || '').toLowerCase().includes(q) ||
      (p.tags || []).join(' ').toLowerCase().includes(q)
    )
  }
  
  posts.sort((a, b) => 
    (b.date || '').localeCompare(a.date || '') || 
    (a.title || '').localeCompare(b.title || '')
  )
  
  return posts
})

function openTool(post) {
  // Map posts to tool components
  const title = post.title.toLowerCase()
  
  if (title.includes('spin wheel')) {
    selectedTool.value = 'spin-wheel'
  } else if (title.includes('currency')) {
    selectedTool.value = 'currency'
  } else if (title.includes('hiking')) {
    selectedTool.value = 'hiking'
  } else {
    // Fallback: try to open the original URL if it's not a tool
    if (post.url) {
      window.location.href = post.url
    }
  }
}

function toggleTheme() {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}

onMounted(async () => {
  // Set initial theme
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
  
  // Set year
  document.getElementById('year').textContent = new Date().getFullYear()
  
  // Load content.json
  try {
    const response = await fetch('./data/content.json')
    const data = await response.json()
    
    siteTitle.value = data.site?.title || 'My Workspace'
    siteSubtitle.value = data.site?.subtitle || 'Minimal personal toolkit'
    
    POSTS.value = (data.posts || []).filter(p => !p.draft)
    
    // Build tag map
    const tagMap = {}
    POSTS.value.forEach(p => {
      (p.tags || []).forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = []
        tagMap[tag].push(p)
      })
    })
    TAGS.value = tagMap
  } catch (err) {
    console.error('Error loading content.json:', err)
  }
})
</script>

<style scoped>
:root {
  --bg: #0b1020;
  --fg: #e6ebff;
  --muted: #9fb0d3;
  --card: #0f172a;
  --border: rgba(255, 255, 255, 0.08);
  --brand: #7aa2ff;
  --brand2: #7c3aed;
  --pill: #a5b4fc;
  --hover: rgba(122, 162, 255, 0.18);
  --link: #c7d2fe;
}

:global(html[data-theme='light']) {
  --bg: #f7f8fb;
  --fg: #0f172a;
  --muted: #475569;
  --card: #ffffff;
  --border: #e5e7eb;
  --brand: #2563eb;
  --brand2: #7c3aed;
  --pill: #6366f1;
  --hover: #eef2ff;
  --link: #1e40af;
}

.app {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100dvh;
  background: var(--bg);
  color: var(--fg);
}

@media (max-width: 1000px) {
  .app {
    grid-template-columns: 1fr;
  }
  
  .side {
    position: fixed;
    inset: 64px 0 0 0;
    transform: translateX(-100%);
    transition: 0.25s transform ease;
    z-index: 30;
    background: var(--card);
    border-right: 1px solid var(--border);
    overflow-y: auto;
  }
  
  .side.open {
    transform: none;
  }
}

.top {
  position: sticky;
  top: 0;
  z-index: 40;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), var(--bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: saturate(1.1) blur(6px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.logo {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--brand), var(--brand2));
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
}

.spacer {
  flex: 1;
}

.btn {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--fg);
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.btn:hover {
  background: var(--hover);
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: transparent;
}

.search input {
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--fg);
  width: 120px;
}

/* Sidebar */
.side {
  border-right: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0));
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.navTitle {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  padding: 6px 10px;
}

details {
  border-radius: 12px;
  margin: 2px 6px;
}

summary {
  list-style: none;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  gap: 8px;
}

summary:hover {
  background: var(--hover);
  border-color: var(--border);
}

details[open] summary {
  background: linear-gradient(135deg, rgba(122, 162, 255, 0.18), rgba(124, 58, 237, 0.18));
  border-color: var(--border);
}

.count {
  margin-left: auto;
  font-size: 12px;
  color: var(--pill);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 2px 8px;
}

.tagLinks {
  padding: 6px 10px 10px 22px;
}

.tagLinks a {
  display: block;
  color: var(--link);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 8px;
}

.tagLinks a:hover {
  background: var(--hover);
}

/* Main Grid */
.main {
  padding: 22px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 18px;
}

.card {
  grid-column: span 12;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  position: relative;
  overflow: hidden;
}

@media (min-width: 820px) {
  .third {
    grid-column: span 4;
  }
}

.card h2 {
  margin: 6px 0 6px;
  font-size: 18px;
}

.card p {
  margin: 6px 0 10px;
  color: var(--muted);
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.pill {
  display: inline-block;
  font-size: 12px;
  color: var(--pill);
  border: 1px solid var(--border);
  padding: 4px 8px;
  border-radius: 999px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tool-viewer {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 18px;
}

.back-btn {
  padding: 10px 16px;
  background: var(--brand);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  margin-bottom: 1rem;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--brand2);
  transform: translateX(-4px);
}

footer {
  margin-top: 32px;
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}

.hidden {
  display: none !important;
}
</style>
