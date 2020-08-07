"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawOutput = exports.calDiff = exports.decodePng = void 0;
var fs = require("fs-extra");
var path = require("path");
var canvas_1 = require("canvas");
var pngjs_1 = require("pngjs");
var detectDiff = require("x-img-diff-js");
var decodePng = function (filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, buffer) {
            if (err) {
                return reject(err);
            }
            return resolve(pngjs_1.PNG.sync.read(buffer));
        });
    });
};
exports.decodePng = decodePng;
var calDiff = function (imgPath1, imgPath2) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, image1, image2, diffResult, hasDiffMarkers, hasStrayingRects;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([decodePng(imgPath1), decodePng(imgPath2)])];
            case 1:
                _a = _b.sent(), image1 = _a[0], image2 = _a[1];
                return [4 /*yield*/, detectDiff(image1, image2)];
            case 2:
                diffResult = _b.sent();
                hasDiffMarkers = !!diffResult.matches.find(function (m) {
                    return m.find(function (_a) {
                        var diffMarkers = _a.diffMarkers;
                        return diffMarkers && diffMarkers.length;
                    });
                });
                hasStrayingRects = !!diffResult.strayingRects.find(function (rectList) { return rectList && rectList.length; });
                if (!hasDiffMarkers && !hasStrayingRects) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, diffResult];
        }
    });
}); };
exports.calDiff = calDiff;
var drawOutput = function (originPath, outputPath, diffResult, index) { return __awaiter(void 0, void 0, void 0, function () {
    var image, canvas, context;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, canvas_1.loadImage(originPath)];
            case 1:
                image = _a.sent();
                canvas = canvas_1.createCanvas(image.width, image.height);
                context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                diffResult.matches.forEach(function (m) {
                    m[index].diffMarkers.forEach(function (_a) {
                        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                        context.beginPath();
                        context.rect(x, y, width, height);
                        context.strokeStyle = 'red';
                        context.stroke();
                    });
                });
                diffResult.strayingRects[index].forEach(function (_a) {
                    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                    context.beginPath();
                    context.rect(x, y, width, height);
                    context.strokeStyle = 'red';
                    context.stroke();
                });
                fs.ensureDirSync(path.dirname(outputPath));
                fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
                return [2 /*return*/];
        }
    });
}); };
exports.drawOutput = drawOutput;
