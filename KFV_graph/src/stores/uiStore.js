import { defineStore } from "pinia";

export const useUIStore = defineStore("uiStore", {
  state: () => ({
    chartType: "stackedArea", // Default chart type
  }),
  actions: {
    toggleChart() {
      this.chartType = this.chartType === "stackedArea" ? "bar" : "stackedArea";
    }
  }
});