import { basename, join } from 'path';
import { calDiff, drawOutput } from './util';

interface DifferOption {
  originImg: string;
  expectedImg: string;
  outputDir?: string;
}

interface DifferResult {
  isDifferent: boolean;
  originOutputImg?: string;
  expectedOutputImg?: string;
}

const main = async (option: DifferOption): Promise<DifferResult> => {
  const { originImg, expectedImg, outputDir = './' } = option;
  if (typeof originImg !== 'string' || !originImg) {
    throw new Error('Option originImg is required!');
  }

  if (typeof expectedImg !== 'string' || !expectedImg) {
    throw new Error('Option expectedImg is required!');
  }

  const differResults = await calDiff(originImg, expectedImg);

  if (!differResults) {
    return { isDifferent: false };
  }

  const originOutputImg = join(outputDir, basename(originImg));
  const expectedOutputImg = join(outputDir, basename(expectedImg));
  await Promise.all([
    drawOutput(originImg, originOutputImg, differResults, 0),
    drawOutput(expectedImg, expectedOutputImg, differResults, 1),
  ]);

  return {
    isDifferent: true,
    originOutputImg,
    expectedOutputImg,
  };
};

export = main;
