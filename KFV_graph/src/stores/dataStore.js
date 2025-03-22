import { defineStore } from 'pinia'
import { getAggregatedData, getFilterValues, transformDataForChart } from '../repository/dataService'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    chartData: { labels: [], datasets: [] },
    activeFilters: { topic: '', value: '' },
    groupBy: "bundesland",
    availableFilters: {}
  }),

  actions: {
    async fetchData() {

      try {
        const aggregatedData = await getAggregatedData(this.groupBy, this.activeFilters)

        if (!aggregatedData || aggregatedData.length === 0) {
          console.warn('[WARN] No aggregated data found.')
        }

        this.chartData = transformDataForChart(aggregatedData)
      } catch (error) {
      }
    },

    async loadAvailableFilters() {
      this.availableFilters = await getFilterValues();
    },

    setFilters(topic, value) {
      this.activeFilters = { topic, value };
      this.fetchData();
    },

    setGroupBy(group) {
      this.groupBy = group
      this.fetchData()
    }
  }
})