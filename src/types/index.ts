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

export { Rect, MatchingRegions, DetectDiffResult };
