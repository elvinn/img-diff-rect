import { PNGWithMetadata } from 'pngjs';
import { DetectDiffResult } from './types/index';
declare const decodePng: (filename: string) => Promise<PNGWithMetadata>;
declare const calDiff: (imgPath1: string, imgPath2: string) => Promise<DetectDiffResult | null>;
declare const drawOutput: (originPath: string, outputPath: string, diffResult: DetectDiffResult, index: number) => Promise<void>;
export { decodePng, calDiff, drawOutput };
