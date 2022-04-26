"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterEditorWrapper = void 0;
const react_1 = __importDefault(require("react"));
const index_1 = __importDefault(require("../custom/index"));
const FilterEditorWrapper = ({ options, values, onChangeValues }) => {
    return (react_1.default.createElement(index_1.default, { values: values, options: options, onChangeValues: onChangeValues }));
};
exports.FilterEditorWrapper = FilterEditorWrapper;
