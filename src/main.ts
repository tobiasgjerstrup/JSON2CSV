import fs from "fs/promises";
import { Json2csv } from "./json2csv.js";

const json2csv = new Json2csv();

async function main() {
  let _JSON = await fs.readFile("./input/test.json", "utf8");
  _JSON = _JSON.replace(/;/g, ':');
  const _OBJECT = JSON.parse(_JSON);

  await json2csv.runAll(_OBJECT["data"]);

  console.log(json2csv.header)

  fs.writeFile('./output/test.csv', json2csv.csv)
}

main();

// below line is a dirty fix for tsup not working!!
process.stdin.resume();
