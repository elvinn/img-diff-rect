declare type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare type MatchingRegions = {
    bounding: Rect;
    center: Rect;
    diffMarkers: Rect[];
}[];
declare type DetectDiffResult = {
    matches: MatchingRegions[];
    strayingRects: Rect[][];
};
export { Rect, MatchingRegions, DetectDiffResult };
