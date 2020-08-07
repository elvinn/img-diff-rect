import { join } from 'path';
import imgDiffRect = require('../index');

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

test('Wrong file path', async () => {
  await expect(
    imgDiffRect({
      originImg,
      expectedImg: join(__dirname, './images/none'),
    }),
  ).rejects.toThrow('ENOENT: no such file or directory');
});

test('No Params', async () => {
  await expect(
    imgDiffRect({
      originImg: '',
      expectedImg: '',
    }),
  ).rejects.toThrow('Option originImg is required!');

  await expect(
    imgDiffRect({
      originImg,
      expectedImg: '',
    }),
  ).rejects.toThrow('Option expectedImg is required!');
});
