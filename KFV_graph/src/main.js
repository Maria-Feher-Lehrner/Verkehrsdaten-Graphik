import './assets/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { importData } from "./repository/dataService.js"
import { useUIStore } from "./stores/uiStore.js"
import { useDataStore } from "./stores/dataStore.js"

const app = createApp(App)
app.use(createPinia())

app.mount('#app')

const initApp = async () => {
  const uiStore = useUIStore()
  const dataStore = useDataStore()

  await importData()
  uiStore.setImportComplete(true)
  await dataStore.fetchData()
}

initApp()
