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
declare const main: (option: DifferOption) => Promise<DifferResult>;
export = main;
