import { defineStore } from 'pinia';

export const useChartStore = defineStore('chart', {
  state: () => ({
    data: [],
    chartType: 'stackedArea',
  }),
  actions: {
    setChartData(newData) {
      this.data = newData;
    },
    setChartType(type) {
      this.chartType = type;
    },
  },
});