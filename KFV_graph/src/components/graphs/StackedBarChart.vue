<script setup>
import { computed, defineProps } from 'vue'
import { defineChartComponent } from 'vue-chart-3'
import { Chart as ChartJS, Title, Tooltip, Legend, BarController, BarElement, LinearScale, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarController, BarElement, LinearScale, CategoryScale)

const BarChart = defineChartComponent('BarChart', 'bar')

// Using chartKey to force rerender on update of chartData
const chartKey = computed(() => JSON.stringify(props.chartData))

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
    default: () => ({ labels: [], datasets: [] }) // Ensures the BarChart Component always has a default
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    x: {
      type: 'category',
    },
    y: {
      stacked: true,
    },
  },
}
</script>

<template>
  <BarChart :key="chartKey" :chart-data="chartData" :options="chartOptions" />
</template>

<style scoped>

</style>