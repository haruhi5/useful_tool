<template>
  <div class="tool">
    <h1>USD / SGD / CNY Converter</h1>
    <div class="card">
      <div class="row">
        <button @click="refreshRates" id="refreshBtn">Refresh Rates</button>
      </div>

      <div class="row">
        <label for="baseCurrency">Input currency:</label>
        <select v-model="baseCurrency" id="baseCurrency" @change="convert">
          <option value="USD">USD</option>
          <option value="SGD">SGD</option>
          <option value="CNY">CNY</option>
        </select>
      </div>

      <div class="row">
        <label for="amount">Amount:</label>
        <input
          v-model.number="amount"
          id="amount"
          type="number"
          min="0"
          step="0.01"
          @keydown.enter="convert"
          @input="convert"
        />
        <button @click="convert" id="convertBtn">Convert</button>
      </div>

      <div class="result">
        <div>USD: <strong><span id="outUsd">{{ outUSD }}</span></strong></div>
        <div>SGD: <strong><span id="outSgd">{{ outSGD }}</span></strong></div>
        <div>CNY: <strong><span id="outCny">{{ outCNY }}</span></strong></div>
      </div>

      <div v-if="usdToSgd !== null && usdToCny !== null" class="result">
        <div class="rate-row">1 USD = <span id="rateUsdSgd">{{ usdToSgd.toFixed(4) }}</span> SGD</div>
        <div class="rate-row">1 USD = <span id="rateUsdCny">{{ usdToCny.toFixed(4) }}</span> CNY</div>
        <div class="rate-row">1 SGD = <span id="rateSgdCny">{{ sgdToCny.toFixed(4) }}</span> CNY</div>
      </div>

      <div v-if="statusText" id="status">{{ statusText }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const baseCurrency = ref('USD')
const amount = ref(1)
const usdToSgd = ref(null)
const usdToCny = ref(null)
const statusText = ref('')

const sgdToCny = computed(() => {
  if (usdToSgd.value === null || usdToCny.value === null) return 0
  return usdToCny.value / usdToSgd.value
})

const outUSD = computed(() => {
  if (usdToSgd.value === null || usdToCny.value === null) return '-'
  
  let amountInUsd
  if (baseCurrency.value === 'USD') {
    amountInUsd = amount.value
  } else if (baseCurrency.value === 'SGD') {
    amountInUsd = amount.value / usdToSgd.value
  } else { // CNY
    amountInUsd = amount.value / usdToCny.value
  }
  
  return amountInUsd.toFixed(2)
})

const outSGD = computed(() => {
  if (usdToSgd.value === null || usdToCny.value === null) return '-'
  
  let amountInUsd
  if (baseCurrency.value === 'USD') {
    amountInUsd = amount.value
  } else if (baseCurrency.value === 'SGD') {
    amountInUsd = amount.value / usdToSgd.value
  } else { // CNY
    amountInUsd = amount.value / usdToCny.value
  }
  
  return (amountInUsd * usdToSgd.value).toFixed(2)
})

const outCNY = computed(() => {
  if (usdToSgd.value === null || usdToCny.value === null) return '-'
  
  let amountInUsd
  if (baseCurrency.value === 'USD') {
    amountInUsd = amount.value
  } else if (baseCurrency.value === 'SGD') {
    amountInUsd = amount.value / usdToSgd.value
  } else { // CNY
    amountInUsd = amount.value / usdToCny.value
  }
  
  return (amountInUsd * usdToCny.value).toFixed(2)
})

async function refreshRates() {
  statusText.value = 'Loading rates...'
  const refreshBtn = document.getElementById('refreshBtn')
  const convertBtn = document.getElementById('convertBtn')
  if (refreshBtn) refreshBtn.disabled = true
  if (convertBtn) convertBtn.disabled = true

  try {
    // Using frankfurter.app (like original)
    const response = await fetch('https://api.frankfurter.app/latest?base=USD&symbols=SGD,CNY')
    if (!response.ok) throw new Error('Failed to fetch rates')

    const data = await response.json()
    usdToSgd.value = data.rates.SGD
    usdToCny.value = data.rates.CNY

    statusText.value = 'Rates loaded (date: ' + data.date + ')'
    convert()
  } catch (err) {
    console.error(err)
    statusText.value = 'Error fetching rates.'
    // Set default rates as fallback
    usdToSgd.value = 1.35
    usdToCny.value = 7.08
  } finally {
    if (refreshBtn) refreshBtn.disabled = false
    if (convertBtn) convertBtn.disabled = false
  }
}

function convert() {
  // Conversion happens automatically via computed properties
}

// Load rates on mount
refreshRates()
</script>

<style scoped>
.tool {
  max-width: 420px;
  margin: 40px auto;
  font-family: sans-serif;
}

h1 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.row {
  margin: 8px 0;
}

label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

select,
input[type="number"] {
  width: 100%;
  padding: 6px 8px;
  box-sizing: border-box;
}

button {
  padding: 6px 12px;
  margin-top: 8px;
  cursor: pointer;
}

.result {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #eee;
}

.rate-row {
  font-size: 0.9rem;
  color: #555;
}

#status {
  font-size: 0.85rem;
  color: #666;
  margin-top: 8px;
}
</style>
