export const dataMappings = {
  Monat_ID: {
    "1": "Januar", "2": "Februar", "3": "März", "4": "April", "5": "Mai", "6": "Juni",
    "7": "Juli", "8": "August", "9": "September", "10": "Oktober", "11": "November", "12": "Dezember"
  },
  Wochentag_ID: {
    "1": "Montag", "2": "Dienstag", "3": "Mittwoch", "4": "Donnerstag",
    "5": "Freitag", "6": "Samstag", "7": "Sonntag"
  },
  Bundesland_ID: {
    "1": "Burgenland", "2": "Kärnten", "3": "Niederösterreich", "4": "Oberösterreich", "5": "Salzburg", "6": "Steiermark",
    "7": "Tirol", "8": "Vorarlberg", "9": "Wien"
  },
  Gebiet_ID: {
    "0": "Freiland", "1": "Ortsgebiet", "2": "Autobahn"
  },
  Verkehrsart_ID: {
    "1": "Fußgänger", "2": "Fahrrad", "3": "Einspurige Kfz", "4": "Pkw", "5": "Lkw", "99": "Sonstige"
  },
  AlterGr_ID: {
    "1": "0-14 J.", "2": "0-14 J.", "3": "0-14 J.",
    "4": "15-24 J.", "5": "15-24 J.",
    "6": "25-34 J.", "7": "25-34 J.",
    "8": "35-44 J.", "9": "35-44 J.",
    "10": "45-54 J.", "11": "45-54 J.",
    "12": "55-64 J.", "13": "55-64 J.",
    "14": "65-74 J.", "15": "65-74 J.",
    "16": "75+ J.", "17": "75+ J.", "18": "75+ J."
  },
  Geschlecht_ID: {
    "1": "männlich", "2": "weiblich"
  },
  Ursache_ID: {
    "-1": "ohne Angabe", "1": "Nichtangepasste Geschw.", "2": "Rotlichtmissachtung", "3": "Überholen", "4": "Ablenkung", "5": "Drogen", "6": "Übermüdung",
    "7": "Fehlverh. Fußg.", "8": "Sonstige", "9": "Sonstige", "10": "Sonstige", "11": "Sonstige", "12": "Sonstige"
  },
};

export const keyLabels = {
  jahr: "Jahr",
  monat: "Monat",
  stunde: "Uhrzeit",
  wochentag: "Wochentag",
  bundesland: "Bundesland",
  gebiet: "Gebiet",
  verkehrsart: "Verkehrsart",
  alterGr: "Altersgruppe",
  geschlecht: "Geschlecht",
  ursache: "Ursache"
}

export const colorPalette = [
  "#B91015", "#1F3E9D", "#99C001", "#6C67BC", "#70B3F4", "#D78A33",
  "#E946B0", "#1F7F26", "#F8DD2B", "#E85E5B", "#8A2BE2", "#FF7F50",
  "#4682B4", "#32CD32", "#FFD700", "#DC143C", "#8B0000", "#00CED1",
  "#FF69B4", "#556B2F", "#7FFFD4", "#FF4500", "#6495ED", "#ADFF2F"
]