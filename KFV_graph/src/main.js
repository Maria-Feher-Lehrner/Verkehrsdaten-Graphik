import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { importData } from "./repository/dataService.js"

const app = createApp(App)

importData().then(() => {
  console.log("Data import complete. App is ready.");
});

app.use(createPinia())

app.mount('#app')
