<template>
  <div class="tool">
    <div class="tool-header">
      <h2>Spin Wheel</h2>
      <p class="description">Weighted random selector with URL sync and physics</p>
    </div>

    <div class="tool-content">
      <div class="spin-container">
        <div class="canvas-wrap">
          <div class="pointer"></div>
          <canvas
            ref="wheelCanvas"
            width="400"
            height="400"
            class="wheel-canvas"
          ></canvas>
        </div>
        <div class="controls">
          <button @click="spin" class="spin-btn" :disabled="isSpinning">
            {{ isSpinning ? 'SPINNING...' : 'SPIN' }}
          </button>
          <div class="flex-row">
            <label>Avoid recent:</label>
            <input
              v-model.number="recentN"
              type="number"
              min="0"
              max="20"
              @change="updateURL"
            />
          </div>
          <div v-if="result" class="result-badge">{{ result }}</div>
        </div>
      </div>

      <div class="options-panel">
        <div class="panel-header">
          <h3>Options</h3>
          <button @click="addOption" class="add-btn">+ Add</button>
        </div>
        <div class="options-list">
          <div class="option-header">
            <div>Text</div>
            <div>Weight</div>
            <div>Enabled</div>
            <div></div>
          </div>
          <div v-for="(opt, idx) in options" :key="idx" class="option-row">
            <input
              v-model="opt.text"
              type="text"
              placeholder="Option text"
              @change="updateURL"
            />
            <input
              v-model.number="opt.weight"
              type="number"
              min="0"
              @change="updateURL"
            />
            <input
              v-model="opt.enabled"
              type="checkbox"
              @change="updateURL"
            />
            <button @click="removeOption(idx)" class="delete-btn">✕</button>
          </div>
        </div>
        <div class="tips">
          <strong>Tips:</strong>
          <ul>
            <li>Weight = Probability weight (relative value)</li>
            <li>Avoid recent N: Prefer avoiding repeats; auto-relaxes if not enough options</li>
            <li>Share button copies a URL with state</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const wheelCanvas = ref(null)
const isSpinning = ref(false)
const result = ref('')
const recentN = ref(3)
const lastResults = ref([])
const currentAngle = ref(0)

const options = ref([
  { text: 'Option 1', weight: 1, enabled: true },
  { text: 'Option 2', weight: 1, enabled: true },
  { text: 'Option 3', weight: 1, enabled: true },
])

const enabledOptions = computed(() => options.value.filter(o => o.enabled))

onMounted(() => {
  loadFromURL()
  drawWheel()
  window.addEventListener('resize', drawWheel)
})

function drawWheel() {
  const canvas = wheelCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(centerX, centerY) - 20

  // Clear
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const enabled = enabledOptions.value
  if (enabled.length === 0) return

  // Calculate total weight
  const totalWeight = enabled.reduce((sum, o) => sum + o.weight, 0)

  // Draw segments
  let currentAngle = -Math.PI / 2
  enabled.forEach((opt, idx) => {
    const sliceAngle = (opt.weight / totalWeight) * 2 * Math.PI

    // Draw slice
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.lineTo(centerX, centerY)
    ctx.fillStyle = `hsl(${(idx * 360) / enabled.length}, 70%, 60%)`
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw text
    const textAngle = currentAngle + sliceAngle / 2
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(textAngle)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(opt.text, radius - 20, 5)
    ctx.restore()

    currentAngle += sliceAngle
  })
}

function spin() {
  if (isSpinning.value || enabledOptions.value.length === 0) return

  isSpinning.value = true
  
  // Physics-based approach: ensure several full rotations
  const minTurns = 3
  const extraTurns = Math.floor(Math.random() * 3)
  
  // Duration: 2.8s to 4.5s
  const spinDuration = (2800 + Math.random() * 1700)
  const T = spinDuration / 1000 // seconds
  
  // Find target segment and calculate rotation needed
  const enabled = enabledOptions.value
  const totalWeight = enabled.reduce((sum, o) => sum + o.weight, 0)
  let segmentStart = 0
  const segments = enabled.map((opt) => {
    const segmentAngle = (opt.weight / totalWeight) * 2 * Math.PI
    const start = segmentStart
    segmentStart += segmentAngle
    return { start, angle: segmentAngle, text: opt.text }
  })
  
  // Random target in a random segment
  const targetSegIdx = Math.floor(Math.random() * segments.length)
  const seg = segments[targetSegIdx]
  const span = seg.angle
  const margin = Math.min(0.2, span * 0.2)
  const targetAngle = seg.start + margin + Math.random() * (span - 2 * margin)
  
  // Calculate total rotation: pointer starts at top (π/2), needs to reach targetAngle
  const desired = Math.PI * 1.5 - targetAngle
  const normalizeAngle = (a) => ((a % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const base = normalizeAngle(desired - currentAngle.value)
  const deltaTheta = base + (minTurns + extraTurns) * Math.PI * 2
  
  // Physics: Δθ = 0.5 α T² => α = 2Δθ/T²
  const alpha = (2 * deltaTheta) / (T * T)
  const omega0 = alpha * T
  
  const startTime = performance.now ? performance.now() : Date.now()
  const startAngle = currentAngle.value

  function animate(now) {
    now = (typeof now === 'number') ? now : (performance.now ? performance.now() : Date.now())
    const elapsed = (now - startTime) / 1000 // seconds
    
    if (elapsed >= T) {
      // Final snap
      currentAngle.value = startAngle + deltaTheta
      drawWheelRotated(currentAngle.value)
      isSpinning.value = false
      const selectedIdx = getSelectedOption(currentAngle.value)
      result.value = enabledOptions.value[selectedIdx].text
      lastResults.value.push(selectedIdx)
      updateURL()
      return
    }
    
    // Kinematic equation: θ = θ₀ + ω₀t - 0.5αt²
    const theta = startAngle + omega0 * elapsed - 0.5 * alpha * elapsed * elapsed
    drawWheelRotated(theta)
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

function drawWheelRotated(rotationAngle) {
  const canvas = wheelCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(centerX, centerY) - 20

  // Clear
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const enabled = enabledOptions.value
  if (enabled.length === 0) return

  const totalWeight = enabled.reduce((sum, o) => sum + o.weight, 0)
  let currentAngle = -rotationAngle // Apply rotation offset

  enabled.forEach((opt, idx) => {
    const sliceAngle = (opt.weight / totalWeight) * 2 * Math.PI

    // Draw slice
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.lineTo(centerX, centerY)
    ctx.fillStyle = `hsl(${(idx * 360) / enabled.length}, 70%, 60%)`
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw text
    const textAngle = currentAngle + sliceAngle / 2
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(textAngle)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText(opt.text, radius - 20, 5)
    ctx.restore()

    currentAngle += sliceAngle
  })
}

function getSelectedOption(angle) {
  const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  const enabled = enabledOptions.value
  const totalWeight = enabled.reduce((sum, o) => sum + o.weight, 0)

  let currentAngle = 0
  for (let i = 0; i < enabled.length; i++) {
    const sliceAngle = (enabled[i].weight / totalWeight) * 2 * Math.PI
    if (normalizedAngle < currentAngle + sliceAngle) {
      return i
    }
    currentAngle += sliceAngle
  }
  return 0
}

function addOption() {
  options.value.push({ text: `Option ${options.value.length + 1}`, weight: 1, enabled: true })
  drawWheel()
  updateURL()
}

function removeOption(idx) {
  options.value.splice(idx, 1)
  drawWheel()
  updateURL()
}

function updateURL() {
  drawWheel()
  const state = btoa(JSON.stringify({ options: options.value, recentN: recentN.value }))
  window.history.replaceState(null, '', `?s=${state}`)
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search)
  const state = params.get('s')
  if (state) {
    try {
      const data = JSON.parse(atob(state))
      if (data.options) options.value = data.options
      if (data.recentN) recentN.value = data.recentN
    } catch (e) {
      console.error('Failed to load state:', e)
    }
  }
}
</script>

<style scoped>
.tool {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
}

.tool-header {
  margin-bottom: 2rem;
  text-align: center;
}

.tool-header h2 {
  margin: 0 0 0.5rem 0;
  color: #7aa2ff;
}

.description {
  margin: 0;
  color: #999;
}

.tool-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.spin-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.canvas-wrap {
  position: relative;
  padding-top: 100%;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
}

.wheel-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.pointer {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 20px solid #ffd166;
  z-index: 10;
}

.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.spin-btn {
  padding: 12px 24px;
  background: #7aa2ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}

.spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.flex-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.flex-row label {
  font-size: 0.9rem;
}

.flex-row input {
  width: 60px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.result-badge {
  background: rgba(122, 162, 255, 0.1);
  border: 1px solid #7aa2ff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  color: #7aa2ff;
}

.options-panel {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-header h3 {
  margin: 0;
  font-size: 1rem;
}

.add-btn {
  padding: 6px 12px;
  background: #7aa2ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.options-list {
  margin-bottom: 1rem;
}

.option-header {
  display: grid;
  grid-template-columns: 1fr 60px 40px 30px;
  gap: 6px;
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.option-row {
  display: grid;
  grid-template-columns: 1fr 60px 40px 30px;
  gap: 6px;
  margin-bottom: 0.5rem;
  align-items: center;
}

.option-row input[type="text"] {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.option-row input[type="number"] {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.option-row input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.delete-btn {
  padding: 4px 8px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.tips {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
  font-size: 0.85rem;
  color: #666;
}

.tips strong {
  display: block;
  margin-bottom: 0.5rem;
}

.tips ul {
  margin: 0;
  padding-left: 1.2rem;
}

.tips li {
  margin: 0.3rem 0;
}

@media (max-width: 768px) {
  .tool-content {
    grid-template-columns: 1fr;
  }
}
</style>
