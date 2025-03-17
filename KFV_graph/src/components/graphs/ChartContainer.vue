<script setup>
import { ref, computed } from 'vue';
import { useChartStore } from '@/stores/chart.js'
import StackedAreaChart from './StackedAreaChart.vue';
import StackedBarChart from './StackedBarChart.vue';

const chartStore = useChartStore();
const chartType = ref(chartStore.chartType); // 'stackedArea' or 'stackedBar'

const toggleChartType = () => {
  chartType.value = chartType.value === 'stackedArea' ? 'stackedBar' : 'stackedArea';
  chartStore.setChartType(chartType.value);
};

const formattedData = computed(() => {
  return chartStore.data.map(bundeslandData => ({
    bundesland: bundeslandData.bundesland,
    dataPoints: bundeslandData.dataPoints,
  }));
});
</script>

<template>
  <div>
    <div>
      <button @click="toggleChartType">Toggle Chart Type</button>
    </div>
    <div v-if="chartType === 'stackedArea'">
      <StackedAreaChart :data="formattedData" />
    </div>
    <div v-else>
      <StackedBarChart :data="formattedData" />
    </div>
  </div>
</template>

<style scoped>

</style>