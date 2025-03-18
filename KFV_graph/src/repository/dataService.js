import { mappings } from '../utils/mappings.js'
import { db } from './db.js'

export async function importData() {
  try {
    console.log('Fetching traffic accident data...')
    const response = await fetch('https://dashboards.kfv.at/api/udm_verkehrstote/json')
    const jsonData = await response.json()

    //transforms IDs from json into mapped data for local db
    const transformedData = jsonData.verkehrstote.map(entry => ({
      jahr: entry.Berichtsjahr,
      monat: mappings.Monat_ID[entry.Monat_ID] || 'Unbekannt',
      stunde: parseInt(entry.Stunde_ID, 10),
      wochentag: mappings.Wochentag_ID[entry.Wochentag_ID] || 'Unbekannt',
      bundesland: mappings.Bundesland_ID[entry.Bundesland_ID] || 'Unbekannt',
      gebiet: mappings.Gebiet_ID[entry.Gebiet_ID] || 'Unbekannt',
      verkehrsart: mappings.Verkehrsart_ID[entry.Verkehrsart_ID] || 'Unbekannt',
      alterGr: mappings.AlterGr_ID[entry.AlterGr_ID] || 'Unbekannt',
      geschlecht: mappings.Geschlecht_ID[entry.Geschlecht_ID] || 'Unbekannt',
      ursache: mappings.Ursache_ID[entry.Ursache_ID] || 'Unbekannt',
      getoetete: parseInt(entry.Getötete, 10) || 0
    }))

    //TODO: delete debug log statement
    if (transformedData.length > 0) {
      console.log('First transformed entry:', JSON.parse(JSON.stringify(transformedData[0])))
    } else {
      console.warn('No data transformed.')
    }


    await db.accidents.bulkPut(transformedData)
    console.log('Data imported successfully!')
  } catch (error) {
    console.error('Error importing data:', error)
  }

  export async function getAggregatedData(groupBy = 'bundesland', filters = {}) {
    try {
      // Fetches all accident records from local IndexedDB
      const allData = await db.accidents.toArray()

      const aggregationMap = {}

      allData.forEach(entry => {
        // Applies filters (if any)
        for (const [key, value] of Object.entries(filters)) {
          if (entry[key] !== value) return
        }

        const key = `${year}-${bundesland}`

        // Creates new entry if key not yet existent, adds data to map key if already present
        if (!aggregationMap[key]) {
          aggregationMap[key] = {
            jahr: entry.jahr,
            [groupBy]: entry[groupBy],
            totalFatalities: 0
          }
        }

        aggregationMap[key].totalFatalities += entry.getoetete
      })

      // Converts aggregation map into an array for expected data structure for canvasjs graph
      return Object.values(aggregationMap)
    } catch (error) {
      console.error('Error aggregating data:', error)
      return []
    }
  }

}
