<script setup>
import { lightenColor } from '@/utils/colors.js'
import { computed, defineProps, watch } from 'vue'
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
  CategoryScale,
  Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler)

const LineChart = defineChartComponent('LineChart', 'line')

// Using chartKey to force rerender on update of chartData
const chartKey = computed(() => JSON.stringify(props.chartData))

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
    default: () => ({ labels: [], datasets: [] }) // Ensures the StackedAreaChart Component always has a default
  }
})

const updatedChartData = computed(() => ({
  labels: props.chartData.labels,
  datasets: props.chartData.datasets.map(dataset => {
    const lightenedColor = lightenColor(dataset.backgroundColor, 30); // Lighten by 30%

    return {
      ...dataset,
      backgroundColor: lightenedColor,
      borderColor: dataset.backgroundColor,
      borderWidth: 2
    };
  })
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' }
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
      fill: true,
      borderWidth: 2
    },
    point: {
      radius: 1
    }
  }
}
</script>

<template>
  <LineChart :key="chartKey" :chart-data="updatedChartData" :options="chartOptions" />
</template>

<style scoped>

</style>