"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawOutput = exports.calDiff = exports.decodePng = void 0;
const fs = require("fs");
const canvas_1 = require("canvas");
const pngjs_1 = require("pngjs");
const detectDiff = require("x-img-diff-js");
const decodePng = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, buffer) => {
            if (err) {
                return reject(err);
            }
            return resolve(pngjs_1.PNG.sync.read(buffer));
        });
    });
};
exports.decodePng = decodePng;
const calDiff = async (imgPath1, imgPath2) => {
    const [image1, image2] = await Promise.all([decodePng(imgPath1), decodePng(imgPath2)]);
    const diffResult = await detectDiff(image1, image2);
    const { diffMarkers } = diffResult.matches[0][0];
    return diffMarkers;
};
exports.calDiff = calDiff;
const drawOutput = async (originPath, outputPath, diffMarkers = []) => {
    const image = await canvas_1.loadImage(originPath);
    const canvas = canvas_1.createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    diffMarkers.forEach(({ x, y, width, height }) => {
        context.beginPath();
        context.rect(x, y, width, height);
        context.strokeStyle = 'red';
        context.stroke();
    });
    fs.writeFileSync('./image.png', canvas.toBuffer('image/png'));
};
exports.drawOutput = drawOutput;
