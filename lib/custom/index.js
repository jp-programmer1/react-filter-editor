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
 * @param options object Array [{label:"Person Name", styles, value:"name", icon: "fas fa-user", fieldType?: "string", fieldComponent?:({data, onChange, onEditField, onDisableEditMode}) => FieldComponent}];
 * @param values object {person: "Juan", date: "12/12/2019"}
 * @param onChangeValues function  to return select value (data:values) => void;
 * @param setVisibleValue function options to return tag value ({label, name, value, fieldType}) => return string;
 * @param getData function to query all data [{active: true, color: "red", edit: true, fieldType: "number", label: "Login Code", name: "loginCode", value: ""}];
 * @param configButtons object {add: {icon, text}, remove: {icon, text, removeComponent}, filterActive: {icon, filterActiveComponent}, filterDisabled: {icon, filterDisabledComponent}}
 * @param optionsComponent render options in dropdown
 * @param className container className
 * @returns {JSX.Element}
 * @constructor
 */
const FilterEditor = ({ options = [], values = {}, onChangeValues, getData, setVisibleValue, configButtons, className, optionsComponent }) => {
    const [viewFilter, setViewFilter] = (0, react_1.useState)();
    const [fieldEditMode, setFieldEditMode] = (0, react_1.useState)(false);
    const [openOptions, setOpenOptions] = (0, react_1.useState)(false);
    const { dataFields, optionsFilter, onAdd, onEdit, getValue, onRemove, onChange, onActivateFilter } = (0, useFilter_1.useFilter)({ data: values, options, onChangeCallback: onChangeValues, setVisibleValue });
    (0, react_1.useEffect)(() => {
        getData && getData(dataFields);
    }, [getData, dataFields]);
    return (react_1.default.createElement("div", { className: className },
        react_1.default.createElement("div", { className: 'filter-TC-editor-container' },
            dataFields.length > 0 && dataFields.map((d, key) => (react_1.default.createElement(react_1.default.Fragment, { key: key },
                react_1.default.createElement("div", { className: "filter-TC-editor-container-tags", onClick: () => !fieldEditMode && onEdit(key) },
                    react_1.default.createElement("button", { type: 'button', className: `filter-TC-editor-btn filter-TC-editor-dropdown-container`, onMouseEnter: () => setViewFilter(key), onMouseLeave: () => setViewFilter(-1), style: Object.assign(Object.assign({}, d.styles), { opacity: d.active ? 1 : 0.5 }) },
                        d.icon && react_1.default.createElement("i", { className: `${d.icon} filter-TC-editor-tag-icon` }),
                        react_1.default.createElement("div", { className: 'filter-TC-editor-tag' }, d.tag || getValue(d.value) || d.label),
                        react_1.default.createElement("div", { className: 'filter-TC-editor-action-active' }, (key === viewFilter || d.edit) &&
                            react_1.default.createElement(react_1.default.Fragment, null,
                                configButtons && configButtons.filterActive && configButtons.filterDisabled &&
                                    react_1.default.createElement(RenderFields_1.StatusFilter, { onAction: () => onActivateFilter(key), configButtons: configButtons, active: d.active }),
                                !configButtons || (!configButtons.filterActive && !configButtons.filterDisabled) &&
                                    react_1.default.createElement("div", { className: `filter-TC-editor-circle ${d.active ? 'circle-active' : ''}`, onClick: () => onActivateFilter(key) })))),
                    react_1.default.createElement("div", { className: `filter-TC-editor-dropdown-menu filter-TC-${d.edit ? 'show' : 'hide'}`, onMouseEnter: () => setFieldEditMode(true), "x-placement": "bottom-start", onMouseLeave: () => setFieldEditMode(false) },
                        react_1.default.createElement("div", { className: 'filter-TC-editor-container-field' },
                            react_1.default.createElement("div", { className: "filter-TC-editor-field" },
                                react_1.default.createElement(RenderFields_1.FieldComponent, { onChange: (value) => onChange(value, key), data: dataFields[key], onEditField: setFieldEditMode, className: "filter-TC-editor-input", onDisableEditMode: () => {
                                        setFieldEditMode(false);
                                        onEdit(key);
                                    } })),
                            configButtons && configButtons.remove &&
                                react_1.default.createElement(react_1.default.Fragment, null,
                                    configButtons.remove.icon && !configButtons.remove.removeComponent &&
                                        react_1.default.createElement("button", { type: 'button', className: 'filter-TC-editor-btn filter-TC-editor-btn-remove', onClick: () => { onRemove(key); setFieldEditMode(false); } }, react_1.default.createElement(react_1.default.Fragment, null,
                                            react_1.default.createElement("i", { className: configButtons.remove.icon }),
                                            configButtons.remove.text)),
                                    configButtons.remove.removeComponent && !configButtons.remove.icon &&
                                        react_1.default.createElement(RenderFields_1.GetComponentCustom, { component: configButtons.remove.removeComponent, onAction: () => { onRemove(key); setFieldEditMode(false); } })),
                            (!configButtons || !configButtons.remove) &&
                                react_1.default.createElement("button", { type: 'button', className: 'filter-TC-editor-btn filter-TC-editor-btn-remove', onClick: () => { onRemove(key); setFieldEditMode(false); } }, "Remove"))))))),
            optionsFilter.length > 0 &&
                react_1.default.createElement("div", { className: "filter-TC-editor-container-options", onClick: () => setOpenOptions(!openOptions) },
                    react_1.default.createElement("button", { className: "filter-TC-editor-btn", type: 'button', "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                        configButtons && configButtons.add && configButtons.add.icon && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement("i", { className: configButtons.add.icon }),
                            " ",
                            configButtons.add.text),
                        !configButtons && "Add Filter"),
                    optionsComponent &&
                        react_1.default.createElement("div", { className: `filter-TC-editor-options-dropdown-menu filter-TC-${openOptions ? 'show' : "hide"}` },
                            react_1.default.createElement(RenderFields_1.GetComponentOptions, { component: optionsComponent, options: optionsFilter, onAddFilter: onAdd })),
                    !optionsComponent &&
                        react_1.default.createElement("ul", { className: `filter-TC-editor-options-dropdown-menu filter-TC-${openOptions ? 'show' : "hide"}` }, optionsFilter.map((op, key) => (react_1.default.createElement("li", { onClick: () => onAdd(op.name), key: key, className: "filter-TC-editor-dropdown-item", "data-rr-ui-dropdown-item": true },
                            react_1.default.createElement("a", null,
                                react_1.default.createElement("i", { className: `filter-TC-editor-option-icon ${op.icon}` }),
                                " ",
                                op.label)))))))));
};
exports.default = FilterEditor;
