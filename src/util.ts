import * as fs from 'fs-extra';
import * as path from 'path';
import { createCanvas, loadImage } from 'canvas';
import { PNG, PNGWithMetadata } from 'pngjs';
import detectDiff = require('x-img-diff-js');

// eslint-disable-next-line import/first
import { DetectDiffResult } from './types/index';

const decodePng = (filename: string): Promise<PNGWithMetadata> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(PNG.sync.read(buffer));
    });
  });
};

const calDiff = async (imgPath1: string, imgPath2: string): Promise<DetectDiffResult | null> => {
  const [image1, image2] = await Promise.all([decodePng(imgPath1), decodePng(imgPath2)]);
  const diffResult = await detectDiff(image1, image2);

  const hasDiffMarkers = !!diffResult.matches.find((m) => {
    return m.find(({ diffMarkers }) => diffMarkers?.length);
  });

  const hasStrayingRects = !!diffResult.strayingRects.find((rectList) => rectList?.length);

  if (!hasDiffMarkers && !hasStrayingRects) {
    return null;
  }

  return diffResult;
};

const drawOutput = async (originPath: string, outputPath: string, diffResult: DetectDiffResult, index: number) => {
  const image = await loadImage(originPath);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  diffResult.matches.forEach((m) => {
    m[index].diffMarkers.forEach(({ x, y, width, height }) => {
      context.beginPath();
      context.rect(x, y, width, height);
      context.strokeStyle = 'red';
      context.stroke();
    });
  });

  diffResult.strayingRects[index].forEach(({ x, y, width, height }) => {
    context.beginPath();
    context.rect(x, y, width, height);
    context.strokeStyle = 'red';
    context.stroke();
  });

  fs.ensureDirSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
};

export { decodePng, calDiff, drawOutput };
