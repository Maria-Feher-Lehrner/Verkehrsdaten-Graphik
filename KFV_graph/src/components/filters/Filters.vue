<script setup>
import { useDataStore } from '@/stores/dataStore.js'
import { ref, computed, onMounted } from 'vue'
import { keyLabels} from '@/utils/mappings.js'

const dataStore = useDataStore()
const selectedFilterTopic = ref('')
const selectedFilterValue = ref('')
const selectedGroupByValue = ref('')

const categoryLabels = {
  gebiet: 'Gebiet',
  verkehrsart: 'Verkehrsart',
  alterGr: 'Altersgruppe',
  geschlecht: 'Geschlecht',
  ursache: 'Unfallursache'
}

const groupByLabels = {
  bundesland: keyLabels.bundesland,
  gebiet: keyLabels.gebiet,
  verkehrsart: keyLabels.verkehrsart,
  alterGr: keyLabels.alterGr,
  geschlecht: keyLabels.geschlecht,
  monat: keyLabels.monat,
  wochentag: keyLabels.wochentag,
  stunde: keyLabels.stunde,
}

const availableValues = computed(() => {
  return selectedFilterTopic.value ? dataStore.availableFilters[selectedFilterTopic.value] || [] : []
})

onMounted(() => {
  dataStore.loadAvailableFilters()
})

const applyFilters = () => {
  console.log('[DEBUG] selectedFilters:', selectedFilterTopic.value, selectedFilterValue.value)
  if (selectedFilterTopic.value && selectedFilterValue.value) {
    dataStore.setFilters(selectedFilterTopic.value, selectedFilterValue.value)
  }
}

const setGroupBy = () => {
  console.log('[DEBUG] groupBy:', selectedGroupByValue.value)
  if (selectedGroupByValue.value) {
    dataStore.setGroupBy(selectedGroupByValue.value)
  }
}

const updateValues = () => {
  selectedFilterValue.value = ''
}


</script>

<template>

  <div class="wrapper">
    <div class="filters">
      <h3>Weitere Filteroptionen</h3>
      <label for="topic">Filter-Kategorie:</label>
      <select id="topic" v-model="selectedFilterTopic" @change="updateValues">
        <option disabled value="">Bitte wählen</option>
        <option v-for="(label, key) in categoryLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>

      <label for="value">Auswahl:</label>
      <select id="value" v-model="selectedFilterValue" :disabled="!selectedFilterTopic" @change="applyFilters">
        <option disabled value="">Bitte wählen</option>
        <option v-for="value in availableValues" :key="value" :value="value">
          {{ value }}
        </option>
      </select>
    </div>

    <div class="groupings">
      <label for="groupBy">Sortieren nach:</label>
      <select id="groupBy" v-model="selectedGroupByValue" @change="setGroupBy">
        <option disabled value="">Bitte wählen</option>
        <option v-for="(label, key) in groupByLabels" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.wrapper {

  padding-left: 2rem;
  padding-right: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #E7E773;
  color: #00489a;

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
}

h3 {
  margin-bottom: 5px;
}

label {
  display: block;
}
</style>