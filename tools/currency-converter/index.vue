<template>
  <div class="tool">
    <h1>Multi-Currency Converter</h1>
    <div class="card">
      <div class="row">
        <button @click="refreshRates" id="refreshBtn">Refresh Rates</button>
      </div>

      <div class="row">
        <label for="baseCurrency">From:</label>
        <select v-model="baseCurrency" id="baseCurrency" @change="convert">
          <option v-for="code in availableCurrencies" :key="code" :value="code">
            {{ code }} - {{ currencyNames[code] }}
          </option>
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
      </div>

      <div class="row">
        <label>Convert to:</label>
        <div class="currency-checkboxes">
          <label v-for="code in availableCurrencies" :key="code" class="checkbox-label">
            <input 
              type="checkbox" 
              :value="code"
              v-model="selectedCurrencies"
              @change="convert"
            />
            {{ code }}
          </label>
        </div>
      </div>

      <div v-if="rates" class="result">
        <div v-for="code in selectedCurrencies" :key="code" class="result-row">
          <span class="currency-code">{{ code }}:</span>
          <strong>{{ convertedAmounts[code] }}</strong>
        </div>
      </div>

      <div v-if="statusText" id="status">{{ statusText }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const baseCurrency = ref('USD')
const amount = ref(1)
const rates = ref(null)
const statusText = ref('')
const selectedCurrencies = ref(['USD', 'SGD', 'CNY', 'EUR', 'GBP', 'JPY'])

const availableCurrencies = ref([
  'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'SGD', 
  'AUD', 'CAD', 'CHF', 'HKD', 'NZD', 'KRW',
  'INR', 'MYR', 'THB', 'PHP', 'IDR', 'VND'
])

const currencyNames = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CNY: 'Chinese Yuan',
  SGD: 'Singapore Dollar',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  HKD: 'Hong Kong Dollar',
  NZD: 'New Zealand Dollar',
  KRW: 'South Korean Won',
  INR: 'Indian Rupee',
  MYR: 'Malaysian Ringgit',
  THB: 'Thai Baht',
  PHP: 'Philippine Peso',
  IDR: 'Indonesian Rupiah',
  VND: 'Vietnamese Dong'
}

const convertedAmounts = computed(() => {
  if (!rates.value) return {}
  
  const result = {}
  
  selectedCurrencies.value.forEach(targetCurrency => {
    let amountInUsd
    
    // Convert input to USD first
    if (baseCurrency.value === 'USD') {
      amountInUsd = amount.value
    } else {
      const baseRate = rates.value[baseCurrency.value]
      if (!baseRate) {
        result[targetCurrency] = '-'
        return
      }
      amountInUsd = amount.value / baseRate
    }
    
    // Convert USD to target currency
    if (targetCurrency === 'USD') {
      result[targetCurrency] = amountInUsd.toFixed(2)
    } else {
      const targetRate = rates.value[targetCurrency]
      if (!targetRate) {
        result[targetCurrency] = '-'
        return
      }
      result[targetCurrency] = (amountInUsd * targetRate).toFixed(2)
    }
  })
  
  return result
})

async function refreshRates() {
  statusText.value = 'Loading rates...'
  const refreshBtn = document.getElementById('refreshBtn')
  if (refreshBtn) refreshBtn.disabled = true

  try {
    // Using frankfurter.app - fetch all supported currencies
    const symbols = availableCurrencies.value.filter(c => c !== 'USD').join(',')
    const response = await fetch(`https://api.frankfurter.app/latest?base=USD&symbols=${symbols}`)
    if (!response.ok) throw new Error('Failed to fetch rates')

    const data = await response.json()
    rates.value = data.rates

    statusText.value = 'Rates loaded (date: ' + data.date + ')'
    convert()
  } catch (err) {
    console.error(err)
    statusText.value = 'Error fetching rates. Using fallback rates.'
    // Set default rates as fallback
    rates.value = {
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.50,
      CNY: 7.24,
      SGD: 1.34,
      AUD: 1.54,
      CAD: 1.39,
      CHF: 0.88,
      HKD: 7.78,
      NZD: 1.70,
      KRW: 1310.00,
      INR: 83.25,
      MYR: 4.47,
      THB: 34.85,
      PHP: 56.50,
      IDR: 15650.00,
      VND: 24350.00
    }
  } finally {
    if (refreshBtn) refreshBtn.disabled = false
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
  max-width: 520px;
  margin: 40px auto;
  font-family: sans-serif;
}

h1 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
}

.row {
  margin: 12px 0;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  font-weight: 600;
}

select,
input[type="number"] {
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  margin-top: 8px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.currency-checkboxes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.checkbox-label:hover {
  background: #f0f0f0;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  cursor: pointer;
}

.result {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f5f5f5;
}

.result-row:last-child {
  border-bottom: none;
}

.currency-code {
  font-weight: 600;
  color: #333;
  min-width: 60px;
}

.result-row strong {
  color: #007bff;
}

#status {
  font-size: 0.85rem;
  color: #666;
  margin-top: 12px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}
</style>
