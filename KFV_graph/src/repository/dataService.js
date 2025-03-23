import { dataMappings, colorPalette } from '../utils/mappings.js'
import { db } from './db.js'

export async function importData() {
  try {
    console.log('Fetching traffic accident data...')
    const response = await fetch('https://dashboards.kfv.at/api/udm_verkehrstote/json')
    const jsonData = await response.json()

    //transforms IDs from API-json into mapped data for local db
    const mappedData = jsonData.verkehrstote.map(entry => ({
      jahr: entry.Berichtsjahr,
      monat: dataMappings.Monat_ID[entry.Monat_ID] || 'Unbekannt',
      stunde: parseInt(entry.Stunde_ID, 10),
      wochentag: dataMappings.Wochentag_ID[entry.Wochentag_ID] || 'Unbekannt',
      bundesland: dataMappings.Bundesland_ID[entry.Bundesland_ID] || 'Unbekannt',
      gebiet: dataMappings.Gebiet_ID[entry.Gebiet_ID] || 'Unbekannt',
      verkehrsart: dataMappings.Verkehrsart_ID[entry.Verkehrsart_ID] || 'Unbekannt',
      alterGr: dataMappings.AlterGr_ID[entry.AlterGr_ID] || 'Unbekannt',
      geschlecht: dataMappings.Geschlecht_ID[entry.Geschlecht_ID] || 'Unbekannt',
      ursache: dataMappings.Ursache_ID[entry.Ursache_ID] || 'Unbekannt',
      getoetete: parseInt(entry.Getötete, 10) || 0
    }))

    // Clears the previous data in IndexedDB before inserting new data
    await db.accidents.clear()
    await db.accidents.bulkPut(mappedData)
  } catch (error) {
    console.error('Error importing data:', error)
  }
}

async function fetchAllLocalData() {
  return await db.accidents.toArray()
}

function applyFilters(data, filters) {
  if (!filters.topic || !filters.value) return data // No filtering if empty
  return data.filter(entry => entry[filters.topic] === filters.value)
}

function aggregateDataByGroup(filteredData, groupBy) {
  const aggregationMap = {}

  filteredData.forEach(entry => {
    const key = `${entry.jahr}-${entry[groupBy]}`

    if (!aggregationMap[key]) {
      aggregationMap[key] = {
        jahr: entry.jahr,
        [groupBy]: entry[groupBy],
        totalFatalities: 0
      }
    }

    aggregationMap[key].totalFatalities += entry.getoetete
  })

  const result = Object.values(aggregationMap)
  return result
}

export async function getAggregatedData(groupBy = 'bundesland', filters = {}) {
  try {

    const allData = await fetchAllLocalData()

    const filteredData = applyFilters(allData, filters)

    return aggregateDataByGroup(filteredData, groupBy)
  } catch (error) {
    console.error('Error aggregating data:', error);
    return [];
  }
}

function createDataset(groupKey, labels, index) {
  return {
    label: groupKey,
    backgroundColor: colorPalette[index % colorPalette.length],
    data: Array(labels.length).fill(0)
  }
}

function sortDatasetsByLabel(datasets) {
  return datasets.sort((a, b) => {
    const entryA = a.label
    const entryB = b.label

    if (typeof entryA === 'number' && typeof entryB === 'number') {
      return entryA - entryB; // Sorting numerically
    }

    return String(entryA).localeCompare(String(entryB)); // Sorting alphabetically
  });
}

export function transformDataForChart(aggregatedData, groupByCategory) {
  if (!aggregatedData || aggregatedData.length === 0) {
    console.warn('[WARN] No aggregated data available for chart transformation.')
    return { labels: [], datasets: [] }
  }

  const labels = [...new Set(aggregatedData.map(entry => entry.jahr))].sort()

  const datasetsMap = new Map()
  let colorIndex = 0 // index for color palette

  aggregatedData.forEach(entry => {
    const { jahr, totalFatalities } = entry
    const groupKey = entry[groupByCategory]

    if (!datasetsMap.has(groupKey)) {
      datasetsMap.set(groupKey, createDataset(groupKey, labels, colorIndex))
      colorIndex++
    }

    const dataset = datasetsMap.get(groupKey)
    const index = labels.indexOf(jahr)
    dataset.data[index] = totalFatalities
  })

  const sortedDatasets = sortDatasetsByLabel(Array.from(datasetsMap.values()))

  return {
    labels,
    datasets: sortedDatasets
  }
}

export async function getFilterValues() {
  const allData = await fetchAllLocalData()

  const uniqueValues = {
    gebiet: new Set(),
    verkehrsart: new Set(),
    alterGr: new Set(),
    geschlecht: new Set(),
    ursache: new Set()
  }

  allData.forEach(entry => {
    Object.keys(uniqueValues).forEach(key => {
      if (entry[key]) {
        uniqueValues[key].add(entry[key])
      }
    })
  })

  // Custom order for alterGr
  const alterGrCustomOrder = [
    "0-14 J.", "15-24 J.", "25-34 J.", "35-44 J.",
    "45-54 J.", "55-64 J.", "65-74 J.", "75+ J."
  ]

  return Object.fromEntries(
    Object.entries(uniqueValues).map(([key, valueSet]) => {
      let sortedValues = [...valueSet]

      if (key === "alterGr") {
        sortedValues.sort((a, b) => alterGrCustomOrder.indexOf(a) - alterGrCustomOrder.indexOf(b))
      }

      return [key, sortedValues]
    })
  )
}


