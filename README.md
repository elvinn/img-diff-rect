# img-diff-rect

[![NPM version](https://img.shields.io/npm/v/img-diff-rect.svg?style=flat-square)](https://npmjs.org/package/img-diff-rect)
[![node version](https://img.shields.io/badge/node.js-%3E=8-green.svg?style=flat-square)](http://nodejs.org/download/)
[![Test coverage](https://codecov.io/gh/elvinn/img-diff-rect/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/elvinn/img-diff-rect)
[![License](https://img.shields.io/npm/l/img-diff-rect.svg?style=flat-square)](https://www.npmjs.com/package/img-diff-rect)


Mark differences of two images in rectangles based on [x-img-diff-js](https://github.com/reg-viz/x-img-diff-js).

## Demo

![output 1](./src/__test__/output/origin.png)

![output 1](./src/__test__/output/expected.png)


## Usage

You need Node.js >= v8.0.0

``` js
const imgDiffRect = require('img-diff-rect');

imgDiffRect({
  originImg: './origin.png',
  expectedImg: './expected.png',
  outputDir: './output',
}).then((result) => {
  console.log(result);
  // {
  //   isDifferent: true,
  //   originOutputImg: './output/origin.png',
  //   expectedOutputImg: './output/expected.png',
  // }
});
```

## Type

### DifferOption

``` ts
interface DifferOption {
  originImg: string;
  expectedImg: string;
  outputDir?: string;
}
```

### DifferResult

``` ts
interface DifferResult {
  isDifferent: boolean;
  originOutputImg?: string;
  expectedOutputImg?: string;
}
```