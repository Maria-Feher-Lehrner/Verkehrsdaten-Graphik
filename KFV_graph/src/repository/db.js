import Dexie from "dexie"

export const db = new Dexie("TrafficAccidentDB");

db.version(1).stores({
  accidents: "++id, jahr, monat, stunde, wochentag, bundesland, gebiet, verkehrsart, alterGr, geschlecht, ursache, getoetete"
});