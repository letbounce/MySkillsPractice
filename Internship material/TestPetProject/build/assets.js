const texturepackerify = require("texturepackerify");
const fs = require("fs");

let url = "./resources/origin.assets/atlases/";
let finalUrl = "./resources/assets/atlases/";
fs.mkdir(finalUrl, () => {
    texturepackerify.pack({inputDir: url, outputDir: finalUrl, hashPath: "./assets/", force: false}, () => {
        console.log("assets built");
    });
});
