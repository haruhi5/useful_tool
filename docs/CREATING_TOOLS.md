# Creating Tools and Documentation

## 🚀 Quick Tool Creation

### Command
```bash
npm run create -- tool my-tool-name
```

### What Gets Created
```
tools/my-tool-name/
├── index.vue              # Vue component
├── README.md              # Documentation
└── my-tool-name.spec.js   # Tests
```

### Example: Create a Calculator Tool
```bash
npm run create -- tool calculator
```

Result:
```
tools/calculator/
├── index.vue
├── README.md
└── calculator.spec.js
```

---

## 📝 Building Your Tool (Vue Component)

### Basic Structure
```vue
<template>
  <div class="tool-container">
    <h2>My Calculator</h2>
    <input v-model="input" type="text" placeholder="Enter...">
    <button @click="calculate">Calculate</button>
    <p>Result: {{ result }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const result = ref(0)

const calculate = () => {
  // Your calculation logic here
  result.value = eval(input.value)
}
</script>

<style scoped>
.tool-container {
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
```

### Vue 3 Composition API Basics
```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const count = ref(0)

// Computed property
const doubled = computed(() => count.value * 2)

// Methods
const increment = () => {
  count.value++
}

// Lifecycle
onMounted(() => {
  console.log('Component mounted')
})
</script>
```

---

## 📚 Creating Documentation

### Command
```bash
npm run create -- doc my-doc-name
```

### What Gets Created
```
docs/my-doc-name.md
```

### Example
```bash
npm run create -- doc getting-started
```

Creates: `docs/getting-started.md`

### Markdown Format
```markdown
# Getting Started

## Overview
Brief description.

## Installation
Steps here.

## Usage
How to use.

## Examples
Code examples.

## Troubleshooting
Common issues.
```

---

## 🔗 Register Your Tool

After creating a tool, register it in your frontend:

### Edit `frontend/src/App.vue`
```vue
<script setup>
import { ref, onMounted } from 'vue'

const tools = ref([
  { id: 'calculator', name: 'Calculator', category: 'utility' },
  { id: 'my-tool', name: 'My Tool', category: 'custom' }
])
</script>
```

### Backend Route (if needed)
Edit `backend/routes/tools.js`:
```javascript
router.get('/', (req, res) => {
  res.json({
    tools: [
      { id: 'calculator', name: 'Calculator', category: 'utility' },
      // Add your tool here
    ]
  });
});
```

---

## 🧪 Testing Your Tool

### Test File Structure
```javascript
import { describe, it, expect } from 'vitest'

describe('My Tool', () => {
  it('should do something', () => {
    expect(true).toBe(true)
  })
})
```

### Run Tests
```bash
cd frontend
npm test
```

---

## 📁 Tool File Organization

### Simple Tool
```
tools/my-tool/
├── index.vue
├── README.md
└── my-tool.spec.js
```

### Complex Tool
```
tools/my-tool/
├── index.vue           # Main component
├── components/
│   ├── Subtool1.vue
│   └── Subtool2.vue
├── utils/
│   └── helpers.js
├── styles/
│   └── my-tool.css
├── README.md
└── my-tool.spec.js
```

---

## 🎨 Tool Component Template

### Full Example
```vue
<template>
  <div class="tool">
    <div class="tool-header">
      <h2>{{ title }}</h2>
      <p class="description">{{ description }}</p>
    </div>

    <div class="tool-content">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <!-- Your tool UI here -->
        <input v-model="input" type="text" placeholder="Enter input">
        <button @click="process">Process</button>
        <div v-if="result" class="result">
          {{ result }}
        </div>
      </div>
    </div>

    <div class="tool-footer">
      <p class="info">Made with Vue 3</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const title = 'My Tool'
const description = 'Do something useful'
const input = ref('')
const result = ref('')
const loading = ref(false)

const process = async () => {
  loading.value = true
  try {
    // Your logic here
    result.value = input.value.toUpperCase()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.tool {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background: var(--card);
  border: 1px solid var(--border);
}

.tool-header {
  margin-bottom: 2rem;
}

.tool-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--brand);
}

.description {
  margin: 0;
  color: var(--muted);
}

.tool-content {
  margin: 2rem 0;
}

.tool-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  text-align: center;
  color: var(--muted);
  font-size: 0.85rem;
}

button {
  background: var(--brand);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background: var(--brand2);
}

input {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--fg);
  width: 100%;
  max-width: 400px;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(122, 162, 255, 0.1);
  border-left: 4px solid var(--brand);
  border-radius: 4px;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--muted);
}
</style>
```

---

## 🔌 API Integration in Tools

### Fetching Data
```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/api/tools/my-tool')
    const json = await response.json()
    data.value = json
  } catch (err) {
    error.value = err.message
  }
})
</script>
```

### Posting Data
```vue
<script setup>
const submitData = async (formData) => {
  try {
    const response = await fetch('/api/tools/my-tool/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const result = await response.json()
    console.log('Success:', result)
  } catch (err) {
    console.error('Error:', err)
  }
}
</script>
```

---

## 📋 Documentation Template

```markdown
# [Tool Name]

## Overview
What this tool does.

## Features
- Feature 1
- Feature 2
- Feature 3

## How to Use
Step-by-step instructions.

### Step 1
First step.

### Step 2
Second step.

### Step 3
Third step.

## Examples
Real-world examples.

## API Endpoints (if applicable)
- `GET /api/tools/my-tool` - Get data
- `POST /api/tools/my-tool/data` - Submit data

## Keyboard Shortcuts (if applicable)
- `Ctrl+Enter` - Submit
- `Esc` - Cancel

## Troubleshooting
Common issues and solutions.

## Related Tools
Links to similar tools.
```

---

## 💡 Best Practices

### Do's
✅ Keep tools focused and single-purpose  
✅ Write tests for your tool  
✅ Document all features  
✅ Use consistent naming (kebab-case)  
✅ Test on mobile  

### Don'ts
❌ Create overly complex tools  
❌ Skip documentation  
❌ Ignore errors  
❌ Hardcode values  
❌ Forget to test  

---

## 🚀 From Creation to Deploy

1. **Create tool**: `npm run create -- tool my-tool`
2. **Build component**: Edit `tools/my-tool/index.vue`
3. **Write tests**: Edit `tools/my-tool/my-tool.spec.js`
4. **Register tool**: Add to `frontend/src/App.vue` and `backend/routes/tools.js`
5. **Test locally**: `npm run dev` and navigate to tool
6. **Run tests**: `npm test`
7. **Commit**: `git add . && git commit -m "Add my-tool"`
8. **Push**: `git push origin main`
9. **Deploy**: Automatic via GitHub Actions!

---

## 📞 Examples

### Example 1: Color Converter
```bash
npm run create -- tool color-converter
```

### Example 2: Todo List
```bash
npm run create -- tool todo-list
```

### Example 3: Password Generator
```bash
npm run create -- tool password-generator
```

Just run the command and start building!

---

**Happy tool building!** 🎨✨
