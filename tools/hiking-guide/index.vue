<template>
  <div class="tool">
    <div class="tool-header">
      <h2>Hiking Safety Guide</h2>
      <p class="description">徒步安全事项指南 • Quick checklist & detailed tips</p>
    </div>

    <div class="tool-content">
      <button @click="printGuide" class="print-btn">🖨️ Print / 打印</button>

      <section class="section">
        <h3>Quick Checklist (Before/During Hike)</h3>
        <div class="grid">
          <div class="card ok">
            <h4>Weather & Environment</h4>
            <ul>
              <li>Check weather alerts; avoid <strong>thunderstorms</strong> on high ground</li>
              <li>Watch for flash floods and falling rocks; careful on steep slopes</li>
            </ul>
            <h4>Vegetation & Terrain</h4>
            <ul>
              <li>Beware of <strong>falling branches</strong> (dead wood, wind-blown)</li>
              <li>Slippery paths, loose rocks → slow down</li>
            </ul>
          </div>

          <div class="card ok">
            <h4>Health & Supplies</h4>
            <ul>
              <li><strong>Bring enough water</strong> and electrolytes; eat regularly</li>
              <li>Prevent <strong>heat stroke</strong>, <strong>sunburn</strong> (hat, sunglasses, sunscreen)</li>
            </ul>
            <h4>Navigation & Time</h4>
            <ul>
              <li>Offline maps/compass; inform someone of your itinerary</li>
              <li>Descend before dark; set a "turnaround time"</li>
            </ul>
          </div>

          <div class="card">
            <h4>Gear</h4>
            <ul>
              <li>Proper footwear, rain gear, headlamp, warm layers, first aid kit</li>
              <li>Whistle, emergency blanket, trekking poles, power bank</li>
            </ul>
            <h4>Wildlife & Insects</h4>
            <ul>
              <li>Don't feed animals; keep distance; prevent tick/leech bites</li>
            </ul>
          </div>

          <div class="card">
            <h4>Water Crossings</h4>
            <ul>
              <li>Avoid rapidly rising water; choose wide, shallow, slow sections</li>
              <li>Unbuckle before crossing; face upstream, side-step slowly</li>
            </ul>
            <h4>Communication & Emergency</h4>
            <ul>
              <li>Full phone battery + power bank; backup important info on paper</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h3>Detailed Safety Guidelines</h3>

        <div class="subsection">
          <h4>1. Pre-Hike Preparation</h4>
          <ul>
            <li><strong>Weather:</strong> Check forecasts 3 days ahead; be extra cautious with severe weather warnings</li>
            <li><strong>Physical condition:</strong> Don't hike if injured or unwell</li>
            <li><strong>Share itinerary:</strong> Tell someone your planned route and expected return time</li>
            <li><strong>Physical fitness:</strong> Know your limits; choose appropriate difficulty level</li>
          </ul>
        </div>

        <div class="subsection">
          <h4>2. Essential Gear Checklist</h4>
          <ul>
            <li>✓ Water (2-3L minimum)</li>
            <li>✓ Food and snacks</li>
            <li>✓ Comfortable, broken-in hiking boots</li>
            <li>✓ Weather-appropriate clothing (layers)</li>
            <li>✓ Rain jacket/poncho</li>
            <li>✓ Sun hat and sunglasses</li>
            <li>✓ Sunscreen (SPF 30+)</li>
            <li>✓ Insect repellent</li>
            <li>✓ Basic first aid kit</li>
            <li>✓ Emergency whistle</li>
            <li>✓ Headlamp/flashlight + extra batteries</li>
            <li>✓ Map and compass (offline navigation)</li>
            <li>✓ Phone (fully charged) + power bank</li>
            <li>✓ Emergency contact info (written)</li>
          </ul>
        </div>

        <div class="subsection">
          <h4>3. During the Hike</h4>
          <ul>
            <li><strong>Pace:</strong> Go slow, especially on unfamiliar terrain</li>
            <li><strong>Breaks:</strong> Rest regularly; stay hydrated and fueled</li>
            <li><strong>Turnaround time:</strong> Set a "must-leave-by" time; don't push too hard</li>
            <li><strong>Noise:</strong> Make noise to avoid surprising wildlife</li>
            <li><strong>Staying on trail:</strong> Don't venture off marked paths</li>
            <li><strong>Group communication:</strong> Stay together; use buddy system</li>
          </ul>
        </div>

        <div class="subsection">
          <h4>4. Weather Hazards</h4>
          <ul>
            <li><strong>Lightning:</strong> Avoid exposed ridges and lone trees during thunderstorms</li>
            <li><strong>Extreme heat:</strong> Hike early morning; increase water intake; watch for heat exhaustion</li>
            <li><strong>Cold/hypothermia:</strong> Wear layers; stay dry; seek shelter if needed</li>
            <li><strong>Flash floods:</strong> Never cross swollen streams; wait or find alternate route</li>
          </ul>
        </div>

        <div class="subsection">
          <h4>5. Injury Prevention</h4>
          <ul>
            <li><strong>Ankle sprains:</strong> Watch footing; use trekking poles for stability</li>
            <li><strong>Blisters:</strong> Proper footwear is key; bring blister treatment</li>
            <li><strong>Dehydration:</strong> Drink regularly, not just when thirsty</li>
            <li><strong>Muscle strain:</strong> Warm up; cool down; use trekking poles downhill</li>
          </ul>
        </div>

        <div class="subsection">
          <h4>6. Wildlife Encounters</h4>
          <ul>
            <li><strong>Large animals (bears, big cats):</strong> Make noise; don't run; back away slowly</li>
            <li><strong>Snakes:</strong> Watch your step; most are not aggressive; give them space</li>
            <li><strong>Ticks/leeches:</strong> Check body before/after hike; use repellent; remove carefully with tweezers</li>
            <li><strong>Insects:</strong> Cover skin; use insect repellent</li>
          </ul>
        </div>

        <div class="subsection">
          <h4>7. If Something Goes Wrong</h4>
          <ul>
            <li>✓ <strong>Stay calm</strong> – panic clouds judgment</li>
            <li>✓ <strong>Stop and assess</strong> – evaluate injury/situation</li>
            <li>✓ <strong>Call for help</strong> – use phone/whistle; provide clear location</li>
            <li>✓ <strong>Stay in place</strong> – don't wander off trail</li>
            <li>✓ <strong>First aid</strong> – apply basic treatment; prevent infection</li>
            <li>✓ <strong>Stay warm</strong> – use emergency blanket if available</li>
          </ul>
        </div>
      </section>

      <div class="footer">
        <p><strong>Remember:</strong> Life safety is the #1 priority. If in doubt, turn back or call for help.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
function printGuide() {
  window.print()
}
</script>

<style scoped>
.tool {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
}

.tool-header {
  margin-bottom: 2rem;
  text-align: center;
}

.tool-header h2 {
  margin: 0 0 0.5rem 0;
  color: #0b6cff;
  font-size: 2rem;
}

.description {
  margin: 0;
  color: #555;
  font-size: 0.95rem;
}

.print-btn {
  margin: 1rem auto 2rem;
  display: block;
  padding: 10px 20px;
  background: #0b6cff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
}

.print-btn:hover {
  background: #0a5de1;
}

.section {
  margin-bottom: 3rem;
}

.section > h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #111;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.75rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.card.ok {
  background: #ecfeff;
  border-color: #a5f3fc;
}

.card h4 {
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  color: #111;
}

.card ul {
  margin: 0 0 1rem 1.25em;
  padding: 0;
  font-size: 0.9rem;
  color: #555;
}

.card li {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.card li strong {
  color: #0b6cff;
}

.subsection {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.subsection:last-child {
  border-bottom: none;
}

.subsection h4 {
  font-size: 1.1rem;
  margin: 0 0 0.75rem 0;
  color: #111;
}

.subsection ul {
  margin: 0 0 1rem 1.25em;
  padding: 0;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
}

.subsection li {
  margin: 0.5rem 0;
}

.subsection strong {
  color: #0b6cff;
}

.footer {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  color: #b45309;
}

.footer p {
  margin: 0;
  font-size: 0.95rem;
}

@media print {
  .print-btn {
    display: none;
  }

  .tool {
    padding: 0;
    margin: 0;
  }

  .card {
    page-break-inside: avoid;
  }
}
</style>
