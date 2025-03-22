<script setup>
import { computed } from 'vue'
import { useUIStore } from '@/stores/uiStore.js'
import { useDataStore } from '@/stores/dataStore.js'
import { keyLabels } from '@/utils/mappings.js'
import Footer from './components/Footer.vue'
import ChartContainer from '@/components/graphs/ChartContainer.vue'
import Filters from '@/components/filters/Filters.vue'

const uiStore = useUIStore()
const dataStore = useDataStore()
const importComplete = computed(() => uiStore.importComplete)

const groupBy = keyLabels[dataStore.groupBy]

</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="KFV logo" class="logo" src="./assets/KFV_Logo.jpg" width="203" height="93" />
      <div class="title">
        <h1>Verkehrstote in Österreich</h1>
        <h2>Nach {{ groupBy }} und Berichtsjahr</h2>
      </div>
    </div>
  </header>

  <main>
    <div v-if="!importComplete" class="spinner-container">
      <div class="spinner"></div>
      <p>Daten werden geladen, bitte warten...</p>
    </div>
    <div v-else>
      <ChartContainer/>
      <Filters/>
    </div>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

header {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

h1, h2 {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
  color: #00489A;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo {
    margin-bottom: 1rem;
  }
}

.title {
  display: flex;
  flex-direction: column;
}

.logo {
  height: auto;
  max-width: 100%;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
