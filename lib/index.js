"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const util_1 = require("./util");
const main = async (option) => {
    const { originImg, expectedImg, outputDir = './' } = option;
    if (typeof originImg !== 'string') {
        throw new Error('Option originImg is required!');
    }
    if (typeof expectedImg !== 'string') {
        throw new Error('Option expectedImg is required!');
    }
    const diffMarkers = await util_1.calDiff(originImg, expectedImg);
    if (!(diffMarkers === null || diffMarkers === void 0 ? void 0 : diffMarkers.length)) {
        return { isDifferent: false };
    }
    const originOutputImg = path_1.join(outputDir, path_1.basename(originImg));
    const expectedOutputImg = path_1.join(outputDir, path_1.basename(expectedImg));
    await Promise.all([
        util_1.drawOutput(originImg, originOutputImg, diffMarkers),
        util_1.drawOutput(expectedImg, expectedOutputImg, diffMarkers),
    ]);
    return {
        isDifferent: true,
        originOutputImg,
        expectedOutputImg,
    };
};
exports.default = main;
