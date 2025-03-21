import { defineStore } from 'pinia'
import { getAggregatedData, transformDataForChart } from '../repository/dataService'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    chartData: { labels: [], datasets: [] },
    filters: {},
    groupBy: "bundesland",
  }),

  actions: {
    async fetchData() {
      console.log('[DEBUG] Fetching chart data from IndexedDB...')

      try {
        const aggregatedData = await getAggregatedData(this.groupBy, this.filters)
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
    setFilters(newFilters) {
      this.filters = newFilters
      this.fetchData()
    },
    setGroupBy(group) {
      this.groupBy = group
      this.fetchData()
    }
  }
})