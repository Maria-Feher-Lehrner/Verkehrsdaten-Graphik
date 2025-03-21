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
      console.log('[DEBUG] Fetching chart data from IndexedDB...')

      try {
        const aggregatedData = await getAggregatedData(this.groupBy, this.activeFilters)
        console.log('[DEBUG] Active filters: ', this.activeFilters.value)
        console.log('[DEBUG] Received Aggregated Data:', aggregatedData.length, 'entries')

        if (!aggregatedData || aggregatedData.length === 0) {
          console.warn('[WARN] No aggregated data found.')
        }

        this.chartData = transformDataForChart(aggregatedData)
        console.log('[DEBUG] Transformed Chart Data:', this.chartData)
      } catch (error) {
        console.error('[ERROR] Failed to fetch chart data:', error)
      }
    },

    async loadAvailableFilters() {
      this.availableFilters = await getFilterValues();
      console.log('[DEBUG] Available filter values:', this.availableFilters);
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