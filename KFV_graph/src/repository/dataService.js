import { dataMappings, bundeslandColors } from '../utils/mappings.js'
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
    await db.accidents.clear();

    await db.accidents.bulkPut(mappedData)
  } catch (error) {
    console.error('Error importing data:', error)
  }
}

async function fetchAllLocalData() {
  return await db.accidents.toArray();
}

function applyFilters(data, filters) {
  if (!filters.topic || !filters.value) return data; // No filtering if empty
  return data.filter(entry => entry[filters.topic] === filters.value);
}

function aggregateDataByGroup(filteredData, groupBy) {
  const aggregationMap = {};

  filteredData.forEach(entry => {
    const key = `${entry.jahr}-${entry[groupBy]}`;

    if (!aggregationMap[key]) {
      aggregationMap[key] = {
        jahr: entry.jahr,
        [groupBy]: entry[groupBy],
        totalFatalities: 0
      };
    }

    aggregationMap[key].totalFatalities += entry.getoetete;
  });

  const result = Object.values(aggregationMap)
  return result
}

export async function getAggregatedData(groupBy = 'bundesland', filters = {}) {
  try {
    const allData = await fetchAllLocalData();
    const filteredData = applyFilters(allData, filters);

    return aggregateDataByGroup(filteredData, groupBy);
  } catch (error) {
    console.error('Error aggregating data:', error);
    return [];
  }
}


function createDataset(bundesland, labels) {
  return {
    label: bundesland,
    backgroundColor: bundeslandColors[bundesland.toLowerCase()] || "#CCCCCC",
    data: Array(labels.length).fill(0),
  };
}

function sortDatasetsByLabel(datasets) {
  return datasets.sort((a, b) => {
    const bundeslandA = a.label;
    const bundeslandB = b.label;
    return bundeslandA.localeCompare(bundeslandB); // Sorting alphabetically
  });
}

export function transformDataForChart(aggregatedData) {

  const labels = [...new Set(aggregatedData.map(entry => entry.jahr))].sort();

  const datasetsMap = new Map();

  aggregatedData.forEach(entry => {
    const { jahr, bundesland, totalFatalities } = entry;

    if (!datasetsMap.has(bundesland)) {
      datasetsMap.set(bundesland, createDataset(bundesland, labels));
    }

    const dataset = datasetsMap.get(bundesland);
    const index = labels.indexOf(jahr);
    dataset.data[index] = totalFatalities;
  });

  const sortedDatasets = sortDatasetsByLabel(Array.from(datasetsMap.values()));

  return {
    labels,
    datasets: sortedDatasets,
  };
}

export async function getFilterValues() {
  const allData = await fetchAllLocalData();

  const uniqueValues = {
    gebiet: new Set(),
    verkehrsart: new Set(),
    alterGr: new Set(),
    geschlecht: new Set(),
    ursache: new Set()
  };

  allData.forEach(entry => {
    Object.keys(uniqueValues).forEach(key => {
      if (entry[key]) {
        uniqueValues[key].add(entry[key]);
      }
    });
  });

  return Object.fromEntries(
    Object.entries(uniqueValues).map(([key, valueSet]) => [key, [...valueSet]])
  );
}


