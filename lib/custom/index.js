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
const react_1 = __importStar(require("react"));
const useFilter_1 = require("../hooks/useFilter");
require("../../lib/styles/stylesTC.css");
const RenderFields_1 = require("../render-fields/RenderFields");
/**
 * @param options object Array [{label:"Person Name", value:"name", icon: "fas fa-user", fieldType?: "string", fieldComponent?:(data, onChange, onEditField) => FieldComponent}];
 * @param values object {person: "Juan", date: "12/12/2019"};
 * @param onChangeValues function  to return select value (data:values) => void;
 * @param setVisibleValue function options to return tag value (nameFilter, value) => return string;
 * @param getData function to query all data [{active: true, color: "red", edit: true, fieldType: "number", label: "Login Code", name: "loginCode", value: ""}];
 * @param configButtons object {add: {icon, text, addComponent}, remove: {icon, text, removeComponent}, filterActive: {icon, filterActiveComponent}, filterDisabled: {icon, filterDisabledComponent}}
 * @param className container className
 * @returns {JSX.Element}
 * @constructor
 */
const FilterEditor = ({ options = [], values = {}, onChangeValues, getData, setVisibleValue, configButtons, className }) => {
    const [viewFilter, setViewFilter] = (0, react_1.useState)();
    const [fieldEditMode, setFieldEditMode] = (0, react_1.useState)(false);
    const [openOptions, setOpenOptions] = (0, react_1.useState)(false);
    const { dataFields, optionsFilter, onAdd, onEdit, onRemove, onChange, onActivateFilter } = (0, useFilter_1.useFilter)({ data: values, options, onChangeCallback: onChangeValues, setVisibleValue });
    (0, react_1.useEffect)(() => {
        getData && getData(dataFields);
    }, [getData, dataFields]);
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement("div", { className: 'filter-TC-editor-container' },
            dataFields.length > 0 && dataFields.map((d, key) => (react_1.default.createElement(react_1.default.Fragment, { key: key },
                react_1.default.createElement("div", { className: "filter-TC-editor-container-tags", onClick: () => !fieldEditMode && onEdit(key) },
                    react_1.default.createElement("button", { type: 'button', className: `filter-TC-editor-btn filter-TC-editor-dropdown-container`, onMouseEnter: () => setViewFilter(key), onMouseLeave: () => setViewFilter(-1), style: Object.assign(Object.assign({}, d.styles), { opacity: d.active ? 1 : 0.5 }) },
                        d.icon && react_1.default.createElement("i", { className: `${d.icon} filter-TC-editor-tag-icon` }),
                        react_1.default.createElement("div", { className: 'filter-TC-editor-tag' }, d.tag || d.value !== "" && JSON.stringify(d.value) || d.label),
                        react_1.default.createElement("div", { className: 'filter-TC-editor-action-active' }, (key === viewFilter || d.edit) &&
                            react_1.default.createElement("div", { onClick: () => onActivateFilter(key), style: { opacity: d.active ? 1 : 0.5 } },
                                d.active && configButtons &&
                                    react_1.default.createElement(react_1.default.Fragment, null, configButtons.filterActive.icon && !configButtons.filterActive.filterActiveComponent ? react_1.default.createElement("i", { className: configButtons.filterActive.icon })
                                        : configButtons.filterActive.filterActiveComponent),
                                !d.active && configButtons &&
                                    react_1.default.createElement(react_1.default.Fragment, null, configButtons.filterDisabled.icon && !configButtons.filterDisabled.filterDisabledComponent ? react_1.default.createElement("i", { className: configButtons.filterDisabled.icon })
                                        : configButtons.filterDisabled.filterDisabledComponent),
                                !configButtons &&
                                    react_1.default.createElement("div", { className: `filter-TC-editor-circle ${d.active ? 'circle-active' : ''}` })))),
                    react_1.default.createElement("div", { className: `filter-TC-editor-dropdown-menu filter-TC-${d.edit ? 'show' : 'hide'}`, onMouseEnter: () => setFieldEditMode(true), "x-placement": "bottom-start", onMouseLeave: () => setFieldEditMode(false) },
                        react_1.default.createElement("div", { className: 'filter-TC-editor-container-field' },
                            react_1.default.createElement("div", { className: "filter-TC-editor-field" },
                                react_1.default.createElement(RenderFields_1.FieldComponent, { onChange: (value) => onChange(value, key), data: dataFields[key], onEditField: setFieldEditMode, className: "filter-TC-editor-input" })),
                            react_1.default.createElement("button", { type: 'button', className: 'filter-TC-editor-btn filter-TC-editor-btn-remove', onClick: () => { onRemove(key); setFieldEditMode(false); } },
                                configButtons &&
                                    react_1.default.createElement(react_1.default.Fragment, null,
                                        configButtons.remove.icon && !configButtons.remove.removeComponent && react_1.default.createElement(react_1.default.Fragment, null,
                                            react_1.default.createElement("i", { className: configButtons.remove.icon }),
                                            configButtons.remove.text),
                                        configButtons.remove.removeComponent && configButtons.remove.removeComponent),
                                !configButtons && "Remove"))))))),
            optionsFilter.length > 0 &&
                react_1.default.createElement("div", { className: "filter-TC-editor-container-options", onClick: () => setOpenOptions(!openOptions) },
                    react_1.default.createElement("button", { className: "filter-TC-editor-btn", type: 'button', "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                        configButtons &&
                            react_1.default.createElement(react_1.default.Fragment, null,
                                configButtons.add.icon && !configButtons.add.addComponent && react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement("i", { className: configButtons.add.icon }),
                                    " ",
                                    configButtons.add.text),
                                configButtons.add.addComponent && configButtons.add.addComponent),
                        !configButtons && "Add Filter"),
                    react_1.default.createElement("ul", { className: `filter-TC-editor-options-dropdown-menu filter-TC-${openOptions ? 'show' : "hide"}` }, optionsFilter.map((op, key) => (react_1.default.createElement("li", { onClick: () => onAdd(op.name), key: key, className: "filter-TC-editor-dropdown-item", "data-rr-ui-dropdown-item": true },
                        react_1.default.createElement("a", null,
                            op.optionComponent && op.optionComponent,
                            !op.optionComponent && op.icon && react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("i", { className: `filter-TC-editor-option-icon ${op.icon}` }),
                                " ",
                                op.label),
                            !op.optionComponent && !op.icon && op.label)))))))));
};
exports.default = FilterEditor;
