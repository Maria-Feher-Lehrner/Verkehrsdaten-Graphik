import { defineStore } from "pinia";

export const useUIStore = defineStore("uiStore", {
  state: () => ({
    importComplete: false,
    chartType: "stackedArea", // Default chart type
  }),
  actions: {
    toggleChart() {
      this.chartType = this.chartType === "stackedArea" ? "bar" : "stackedArea";
    },
    setImportComplete(value) {
      this.importComplete = value;
    }
  }
});