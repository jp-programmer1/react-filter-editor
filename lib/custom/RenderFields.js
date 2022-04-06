"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldComponent = void 0;
const react_1 = __importDefault(require("react"));
const SelectCustom = ({ data, onChange }) => {
    var _a;
    return (react_1.default.createElement("input", { type: "select", name: data.name, id: data.name, value: (_a = data.value) === null || _a === void 0 ? void 0 : _a.toString(), onChange: (e) => onChange(e.target.value) }, data.options && data.options.map(op => (react_1.default.createElement("option", { value: op.value.toString() }, op.label)))));
};
const InputCustom = ({ data, onChange }) => {
    var _a;
    return (react_1.default.createElement("input", { autoComplete: 'off', 
        //@ts-ignore
        type: data.fieldType, placeholder: data.label, name: data.name, value: (_a = data.value) === null || _a === void 0 ? void 0 : _a.toString(), onChange: (e) => onChange(e.target.value) }));
};
const types = {
    "select": SelectCustom,
    "text": InputCustom,
    "number": InputCustom,
    "date": InputCustom,
    "datetime": InputCustom
};
const FieldComponent = ({ onChange, data, onEditField }) => {
    //@ts-ignore
    const Field = data.fieldType && types[data.fieldType];
    const Component = data.fieldComponent && data.fieldComponent;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        Field && !Component && react_1.default.createElement(Field, { onChange: onChange, data: data, onEditField: onEditField }),
        Component && react_1.default.createElement(Component, { onChange: onChange, data: data, onEditField: onEditField })));
};
exports.FieldComponent = FieldComponent;
