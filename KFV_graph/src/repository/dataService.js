import { mappings } from "../utils/mappings.js";
import { db } from "./db.js";

export async function importData() {
  try {
    console.log("Fetching traffic accident data...");
    const response = await fetch("https://dashboards.kfv.at/api/udm_verkehrstote/json");
    const jsonData = await response.json();

    //transforms IDs from json into mapped data for local db
    const transformedData = jsonData.verkehrstote.map(entry => ({
      jahr: entry.Berichtsjahr,
      monat: mappings.Monat_ID[entry.Monat_ID] || "Unbekannt",
      stunde: parseInt(entry.Stunde_ID, 10),
      wochentag: mappings.Wochentag_ID[entry.Wochentag_ID] || "Unbekannt",
      bundesland: mappings.Bundesland_ID[entry.Bundesland_ID] || "Unbekannt",
      gebiet: mappings.Gebiet_ID[entry.Gebiet_ID] || "Unbekannt",
      verkehrsart: mappings.Verkehrsart_ID[entry.Verkehrsart_ID] || "Unbekannt",
      alterGr: mappings.AlterGr_ID[entry.AlterGr_ID] || "Unbekannt",
      geschlecht: mappings.Geschlecht_ID[entry.Geschlecht_ID] || "Unbekannt",
      ursache: mappings.Ursache_ID[entry.Ursache_ID] || "Unbekannt",
      getoetete: parseInt(entry.Getötete, 10),
    }));


    await db.accidents.bulkPut(transformedData);
    console.log("Data imported successfully!");
  } catch (error) {
    console.error("Error importing data:", error);
  }
}
