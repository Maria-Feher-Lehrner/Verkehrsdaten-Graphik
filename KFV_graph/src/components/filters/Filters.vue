<script setup>
import { useDataStore } from '@/stores/dataStore.js'
import { ref, computed, onMounted } from 'vue'

const dataStore = useDataStore()
const selectedTopic = ref('')
const selectedValue = ref('')


const categoryLabels = {
  gebiet: 'Gebiet',
  verkehrsart: 'Verkehrsart',
  alterGr: 'Altersgruppe',
  geschlecht: 'Geschlecht',
  ursache: 'Unfallursache'
}

const availableValues = computed(() => {
  return selectedTopic.value ? dataStore.availableFilters[selectedTopic.value] || [] : []
})

onMounted(() => {
  dataStore.loadAvailableFilters()
})

const applyFilters = () => {
  if (selectedTopic.value && selectedValue.value) {
    dataStore.setFilters(selectedTopic.value, selectedValue.value)
  }
}

const updateValues = () => {
  selectedValue.value = ''
}


</script>

<template>
  <div class="filters">
    <h3>Weitere Filteroptionen</h3>

    <label for="topic">Kategorie:</label>
    <select id="topic" v-model="selectedTopic" @change="updateValues">
      <option disabled value="">Bitte wählen</option>
      <option v-for="(label, key) in categoryLabels" :key="key" :value="key">
        {{ label }}
      </option>
    </select>

    <label for="value">Auswahl:</label>
    <select id="value" v-model="selectedValue" :disabled="!selectedTopic" @change="applyFilters">
      <option disabled value="">Bitte wählen</option>
      <option v-for="value in availableValues" :key="value" :value="value">
        {{ value }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filters {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #E7E773;
  color: #00489a;
}

h3 {
  margin-bottom: 5px;
}

label {
  display: block;
}
</style>