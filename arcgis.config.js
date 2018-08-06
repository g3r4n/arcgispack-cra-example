const path = require("path");
const libFolder = path.join(process.cwd(), "src");

module.exports = {
  outputPath: path.join(process.cwd(), "public"),
  dojoModules: ["esri/Map", "esri/views/SceneView", "esri/layers/SceneLayer"]
};
