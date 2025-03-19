import { defineStore } from 'pinia'
import { getAggregatedData } from '../repository/dataService'
import { transformDataForChart } from '../repository/dataService'


export const useDataStore = defineStore('dataStore', {
  state: () => ({
    chartData: { labels: [], datasets: [] },
    filters: {},
    groupBy: "bundesland",
  }),
  actions: {
    async fetchData() {
      const aggregatedData = await getAggregatedData(this.filters, this.groupBy)
      this.chartData = transformDataForChart(aggregatedData)
    },
    setFilters(newFilters) {
      this.filters = newFilters
      this.fetchData()
    },
    setGroupBy(group) {
      this.groupBy = group
      this.fetchData()
    },
  }
})