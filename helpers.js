import fs from "fs";

function getFileContents(fileName) {
  return fs.readFileSync(fileName, "utf8");
}

function getLines(fileName) {
  return getFileContents(fileName).split("\n");
}

export { getFileContents, getLines };
