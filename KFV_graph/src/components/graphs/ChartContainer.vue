<script setup>
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore.js'
import { useUIStore } from '@/stores/uiStore.js'
import StackedAreaChart from './StackedAreaChart.vue'
import StackedBarChart from './StackedBarChart.vue'

const dataStore = useDataStore()
const uiStore = useUIStore()
const chartType = computed(() => uiStore.chartType)
const chartData = computed(() => dataStore.chartData || { labels: [], datasets: [] })

const isChartDataReady = computed(() => {
  return chartData.value?.datasets?.length > 0
})

const toggleChartType = () => {
  uiStore.toggleChart()
}
</script>

<template>
  <div class="container">
    <button v-if="chartType==='stackedArea'" @click="toggleChartType">Zu Balkendiagramm wechseln</button>
    <button v-if="chartType==='stackedBar'" @click="toggleChartType">Zu Flächendiagramm wechseln</button>

    <div v-if="isChartDataReady && chartData?.datasets?.length">
      <StackedAreaChart v-if="chartType==='stackedArea'" :chartData="chartData || { labels: [], datasets: [] }" />
      <StackedBarChart v-if="chartType==='stackedBar'" :chartData="chartData || { labels: [], datasets: [] }" />
    </div>
    <div v-else>
      <p>Fehler beim Importieren der Daten</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}

button {
  background: #E7E773;
  color: #00489a;
  border-radius: 4px;
  border: #8B8797;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-weight: bold;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

</style>