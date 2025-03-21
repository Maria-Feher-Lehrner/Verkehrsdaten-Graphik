<script setup>
import { computed, watch, toRaw } from 'vue'
import { useDataStore } from '@/stores/dataStore.js'
import { useUIStore } from '@/stores/uiStore.js'
import StackedAreaChart from './StackedAreaChart.vue'
import StackedBarChart from './StackedBarChart.vue'

const dataStore = useDataStore()
const uiStore = useUIStore()
const chartType = computed(() => uiStore.chartType)
const chartData = computed(() => dataStore.chartData || { labels: [], datasets: [] })

console.log('[DEBUG] chartData in ChartContainer:', chartData.value)
console.log('[DEBUG] chartData type:', typeof chartData.value)
console.log('[DEBUG] chartData is an array?', Array.isArray(chartData.value.datasets))
console.log('Chart Data stringified:', JSON.stringify(chartData.value))

const isChartDataReady = computed(() => {
  console.log('[DEBUG] Checking isChartDataReady:', chartData.value)
  return chartData.value?.datasets?.length > 0
})

const toggleChartType = () => {
  uiStore.toggleChart()
}

//TODO: delete debug watchers
watch(chartData, (newVal, oldVal) => {
  console.log('[DEBUG] chartData updated in ChartContainer:', newVal)
  console.log('[DEBUG] Previous chartData:', oldVal)
}, { deep: true, immediate: true })

watch(isChartDataReady, (newVal) => {
  console.log('[DEBUG] isChartDataReady changed:', newVal)
})

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
.container{
  padding: 1rem;
}
</style>