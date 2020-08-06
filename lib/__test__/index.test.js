"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const index_1 = require("../index");
const originImg = path_1.join(__dirname, './images/origin.png');
const expectedImg = path_1.join(__dirname, './images/expected.png');
test('Find differences', async () => {
    const result = await index_1.default({ originImg, expectedImg });
    expect(result.isDifferent).toBe(true);
});
