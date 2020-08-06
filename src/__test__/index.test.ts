import { join } from 'path';
import imgDiffRect from '../index';

const originImg = join(__dirname, './images/origin.png');
const expectedImg = join(__dirname, './images/expected.png');

test('Find difference', async () => {
  const result = await imgDiffRect({
    originImg,
    expectedImg,
    outputDir: join(__dirname, './output'),
  });

  expect(result.isDifferent).toBe(true);
});

test('No difference', async () => {
  const result = await imgDiffRect({
    originImg,
    expectedImg: originImg,
  });

  expect(result.isDifferent).toBe(false);
});
