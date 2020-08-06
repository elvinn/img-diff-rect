import { PNGWithMetadata } from 'pngjs';
import { Rect } from './types/index';
declare const decodePng: (filename: string) => Promise<PNGWithMetadata>;
declare const calDiff: (imgPath1: string, imgPath2: string) => Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
}[]>;
declare const drawOutput: (originPath: string, outputPath: string, diffMarkers?: Rect[]) => Promise<void>;
export { decodePng, calDiff, drawOutput };
