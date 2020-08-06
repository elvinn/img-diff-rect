declare module 'x-img-diff-js' {
  import { PNGWithMetadata } from 'pngjs';

  type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  type MatchingRegions = {
    bounding: Rect;
    center: Rect;
    diffMarkers: Rect[];
  }[];

  type DetectDiffResult = {
    matches: MatchingRegions[];
    strayingRects: Rect[][];
  };

  function detectDiff(image1: PNGWithMetadata, image2: PNGWithMetadata): DetectDiffResult;

  export = detectDiff;
}
