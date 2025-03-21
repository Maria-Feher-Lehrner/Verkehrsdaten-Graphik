<script setup>
import { defineProps, watch } from 'vue'
import { defineChartComponent } from 'vue-chart-3'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale)

const LineChart = defineChartComponent('LineChart', 'line')

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
    default: () => ({ labels: [], datasets: [] }) // Ensures the StackedAreaChart Component always has a default
  }
})

// TODO: delete degbug watcher
watch(() => props.chartData, (newVal) => {
  console.log("[DEBUG] chartData received in StackedAreaChart:", newVal);
}, { deep: true });

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    x: {
      type: 'category'
    },
    y: {
      stacked: true
    }
  },
  elements: {
    line: {
      fill: true
    }
  }
}

</script>

<template>
  <LineChart :chart-data="chartData" :options="chartOptions" />
</template>

<style scoped>

</style>