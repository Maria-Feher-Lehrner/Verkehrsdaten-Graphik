import Dexie from "dexie";

export const db = new Dexie("TrafficAccidentDB");

db.version(1).stores({
  accidents: "++id, jahr, monat, stunde, wochentag, bundesland, gebiet, verkehrsart, alterGr, geschlecht, ursache, getoetete"
});

//DB QUERIES
export async function getAllAccidents() {
  return await db.accidents.toArray();
}

export async function getAccidentsByYear(year) {
  return await db.accidents.where("jahr").equals(year).toArray();
}

export async function getAccidentsByBundesland(bundesland) {
  return await db.accidents.where("bundesland").equals(bundesland).toArray();
}

export async function getAccidentsByVerkehrsart(verkehrsart) {
  return await db.accidents.where("verkehrsart").equals(verkehrsart).toArray();
}

export async function getAccidentsByGebiet(gebiet) {
  return await db.accidents.where("gebiet").equals(gebiet).toArray();
}