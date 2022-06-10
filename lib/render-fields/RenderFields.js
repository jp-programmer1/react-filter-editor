"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusFilter = exports.GetComponentOptions = exports.GetComponentCustom = exports.FieldComponent = void 0;
const react_1 = __importDefault(require("react"));
const SelectCustom = ({ data, onChange, className, onEnter }) => (
//@ts-ignore
react_1.default.createElement("select", { name: data.name, id: data.name, className: className, value: data.value, onChange: (e) => onChange(e.target.value), onKeyUp: onEnter }, data.options && data.options.map(op => (
//@ts-ignore
react_1.default.createElement("option", { value: op.value }, op.label)))));
const InputCustom = ({ data, onChange, className, onEnter }) => {
    var _a;
    return (react_1.default.createElement("input", { autoComplete: 'off', className: className, 
        //@ts-ignore
        type: data.fieldType, placeholder: data.label, name: data.name, value: (_a = data.value) === null || _a === void 0 ? void 0 : _a.toString(), onChange: (e) => onChange(e.target.value), onKeyUp: onEnter }));
};
const types = {
    "select": SelectCustom,
    "text": InputCustom,
    "number": InputCustom,
    "date": InputCustom
};
const FieldComponent = ({ onChange, data, onEditField, className, onDisableEditMode }) => {
    //@ts-ignore
    const Field = data.fieldType && types[data.fieldType];
    const Component = data.fieldComponent && data.fieldComponent;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        Field && !Component &&
            react_1.default.createElement(Field, { onChange: onChange, data: data, onEditField: onEditField, className: className, onEnter: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.key === "Enter") {
                        onDisableEditMode && onDisableEditMode();
                    }
                } }),
        Component && react_1.default.createElement(Component, { onChange: onChange, data: data, onEditField: onEditField, onDisableEditMode: onDisableEditMode })));
};
exports.FieldComponent = FieldComponent;
const GetComponentCustom = ({ component, onAction }) => {
    const GetComponentStatus = component;
    return (react_1.default.createElement(GetComponentStatus, { onAction: onAction }));
};
exports.GetComponentCustom = GetComponentCustom;
const GetComponentOptions = ({ component, onAddFilter, options }) => {
    const GetComponentStatus = component;
    return (react_1.default.createElement(GetComponentStatus, { onAddFilter: onAddFilter, options: options }));
};
exports.GetComponentOptions = GetComponentOptions;
const StatusFilter = ({ configButtons, onAction, active = false }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        configButtons.filterActive.icon && !configButtons.filterActive.filterActiveComponent &&
            react_1.default.createElement("div", { onClick: onAction, style: { opacity: active ? 1 : 0.5 } },
                active && react_1.default.createElement("i", { className: configButtons.filterActive.icon }),
                !active && react_1.default.createElement("i", { className: configButtons.filterDisabled.icon })),
        configButtons.filterActive.filterActiveComponent && !configButtons.filterActive.icon &&
            react_1.default.createElement("div", null,
                active && configButtons.filterActive.filterActiveComponent &&
                    react_1.default.createElement(exports.GetComponentCustom, { component: configButtons.filterActive.filterActiveComponent, onAction: onAction }),
                !active && configButtons.filterDisabled.filterDisabledComponent &&
                    react_1.default.createElement(exports.GetComponentCustom, { component: configButtons.filterDisabled.filterDisabledComponent, onAction: onAction }))));
};
exports.StatusFilter = StatusFilter;
