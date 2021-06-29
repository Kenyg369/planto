import fs from "fs";
import path from "path";

import en from "../src/plugins/i18n/en.json";

interface Dictionary {
  [key: string]: string | Dictionary;
}
const fr: Dictionary = {};

function sync(obj: Dictionary, fr: Dictionary): void {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      fr[key] = `FR ${value}`;
    }
    else {
      fr[key] = {};
      sync(value, fr[key] as Dictionary);
    }
  }
}

console.log(`Syncing...`);
sync(en, fr);

const frPath = path.resolve("./src/plugins/i18n/fr.json");

console.log(`Writing to ${frPath}`);
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
console.log(`Done Sync!`);
