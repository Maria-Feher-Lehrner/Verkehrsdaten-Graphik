<script setup>
import { ref, onMounted } from 'vue'
import CanvasJS from 'canvasjs'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartContainer = ref(null)

const createChart = () => {
  const chart = new CanvasJS.Chart(chartContainer.value, {
    theme: 'light2',
    animationEnabled: true,
    title: {
      text: 'Verkehrstote in Österreich'
    },
    axisX: {
      title: 'Jahr'
    },
    axisY: {
      title: 'Anzahl der Toten',
      includeZero: true
    },
    data: props.data.map(bundeslandData => ({
      type: 'area',
      name: bundeslandData.bundesland,
      showInLegend: true,
      dataPoints: bundeslandData.dataPoints
    }))
  })

  chart.render()
}

onMounted(() => {
  createChart()
})

</script>

<template>
  <div ref="chartContainer" style="height: 400px; width: 100%;"></div>
</template>

<style scoped>

</style>