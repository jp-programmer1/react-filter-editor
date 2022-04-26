"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterAdvanced = void 0;
const react_1 = __importStar(require("react"));
const FilterEditorWrapper_1 = require("../examples/FilterEditorWrapper");
exports.default = {
    title: "Filter Editor Advanced",
    component: FilterEditorWrapper_1.FilterEditorWrapper
};
const FilterAdvanced = () => {
    const [data, setData] = (0, react_1.useState)({ name: "emir" });
    const options = [
        { name: "name", label: "Nombre", fieldType: "text" },
        { name: "email", label: "Email", fieldType: "text" }
    ];
    return (react_1.default.createElement(FilterEditorWrapper_1.FilterEditorWrapper, { values: data, options: options, onChangeValues: (val) => setData(val) }));
};
exports.FilterAdvanced = FilterAdvanced;
