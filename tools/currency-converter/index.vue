<template>
  <div class="tool">
    <div class="tool-header">
      <h2>Currency Converter</h2>
      <p class="description">USD / SGD / CNY Real-time Exchange Rates</p>
    </div>

    <div class="tool-content">
      <div class="card">
        <div class="action-row">
          <button @click="refreshRates" class="btn-primary">
            {{ loading ? 'Loading...' : 'Refresh Rates' }}
          </button>
          <span v-if="lastUpdate" class="last-update">
            Updated: {{ lastUpdate }}
          </span>
        </div>

        <div class="form-group">
          <label for="baseCurrency">Input Currency:</label>
          <select v-model="baseCurrency" id="baseCurrency" @change="convert">
            <option value="USD">USD (Dollar)</option>
            <option value="SGD">SGD (Singapore Dollar)</option>
            <option value="CNY">CNY (Chinese Yuan)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="amount">Amount:</label>
          <div class="input-group">
            <input
              v-model.number="amount"
              id="amount"
              type="number"
              min="0"
              step="0.01"
              @input="convert"
            />
            <button @click="convert" class="btn-convert">Convert</button>
          </div>
        </div>

        <div v-if="rates" class="results">
          <div class="result-row">
            <span class="currency">USD</span>
            <strong>{{ formatCurrency(convertedUSD) }}</strong>
          </div>
          <div class="result-row">
            <span class="currency">SGD</span>
            <strong>{{ formatCurrency(convertedSGD) }}</strong>
          </div>
          <div class="result-row">
            <span class="currency">CNY</span>
            <strong>{{ formatCurrency(convertedCNY) }}</strong>
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="rates" class="rates-info">
          <h4>Current Rates (to USD)</h4>
          <div class="rate-row">
            1 SGD = {{ rates.SGD }} USD
          </div>
          <div class="rate-row">
            1 CNY = {{ rates.CNY }} USD
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const baseCurrency = ref('USD')
const amount = ref(1)
const rates = ref(null)
const loading = ref(false)
const error = ref('')
const lastUpdate = ref('')

const convertedUSD = computed(() => {
  if (!rates.value) return 0
  const baseToUSD = {
    USD: 1,
    SGD: rates.value.SGD,
    CNY: rates.value.CNY,
  }[baseCurrency.value]

  return amount.value * baseToUSD
})

const convertedSGD = computed(() => {
  if (!rates.value || !rates.value.SGD) return 0
  return convertedUSD.value / rates.value.SGD
})

const convertedCNY = computed(() => {
  if (!rates.value || !rates.value.CNY) return 0
  return convertedUSD.value / rates.value.CNY
})

async function refreshRates() {
  loading.value = true
  error.value = ''

  try {
    // Using exchangerate-api.com free tier (no auth required)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    if (!response.ok) throw new Error('Failed to fetch rates')

    const data = await response.json()
    rates.value = {
      SGD: data.rates.SGD,
      CNY: data.rates.CNY,
    }

    lastUpdate.value = new Date().toLocaleTimeString()
    convert()
  } catch (err) {
    error.value = 'Failed to load exchange rates. Using cached rates.'
    // Set default rates as fallback
    rates.value = {
      SGD: 1.35,
      CNY: 7.08,
    }
  } finally {
    loading.value = false
  }
}

function convert() {
  // Conversion happens automatically via computed properties
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

// Load rates on mount
refreshRates()
</script>

<style scoped>
.tool {
  max-width: 600px;
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

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-primary {
  padding: 8px 16px;
  background: #7aa2ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
}

.btn-primary:hover {
  background: #6691ff;
}

.last-update {
  font-size: 0.85rem;
  color: #999;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

select,
input[type="number"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

select:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #7aa2ff;
  box-shadow: 0 0 0 3px rgba(122, 162, 255, 0.1);
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-group input {
  flex: 1;
}

.btn-convert {
  padding: 10px 16px;
  background: #7aa2ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
}

.btn-convert:hover {
  background: #6691ff;
}

.results {
  background: #f5f7fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.result-row:last-child {
  border-bottom: none;
}

.currency {
  font-weight: 600;
  color: #666;
}

.result-row strong {
  font-size: 1.1rem;
  color: #7aa2ff;
}

.error-message {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 8px;
  padding: 1rem;
  color: #b45309;
  font-size: 0.95rem;
  margin: 1rem 0;
}

.rates-info {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.rates-info h4 {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  color: #666;
}

.rate-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
}
</style>
