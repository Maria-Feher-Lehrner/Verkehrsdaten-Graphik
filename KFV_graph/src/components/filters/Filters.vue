<script setup>
import { useDataStore } from '@/stores/dataStore.js'
import { ref, computed, onMounted } from 'vue'
import { keyLabels } from '@/utils/mappings.js'

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
  stunde: keyLabels.stunde
}

const availableValues = computed(() => {
  return selectedFilterTopic.value ? dataStore.availableFilters[selectedFilterTopic.value] || [] : []
})

onMounted(() => {
  dataStore.loadAvailableFilters()
})

const applyFilters = () => {
  if (selectedFilterTopic.value && selectedFilterValue.value) {
    dataStore.setFilters(selectedFilterTopic.value, selectedFilterValue.value)
  }
}

const setGroupBy = () => {
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
  margin: 1rem auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #E7E773;
  color: #00489a;

  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 60%;
  width: 50%;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.filters {
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
}

.groupings{
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
}
h3 {
  margin-bottom: 5px;
}

label {
  display: block;
}

select {
  margin-bottom: 0.75rem;
  min-width: 12em;
  position: relative;
  display: inline-block;
  margin-right: 1em;
  min-height: 2em;
  max-height: 2em;
  overflow: hidden;
  top: .5em;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  color: #444;

  outline: none;
  border: .06em solid transparent;
  border-radius: 0.25em;
}
</style>