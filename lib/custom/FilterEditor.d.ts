/// <reference types="react" />
import { FilterEditor } from '../interfaces/Interfaces';
import '../../lib/styles/stylesTC.css';
/**
 *
 * @param options object Array [{label:"Person Name", value:"name", icon: "fas fa-user", fieldType?: "string", fieldComponent?:(data, onChange, onEditField) => FieldComponent}];
 * @param values object {person: "Juan", date: "12/12/2019"};
 * @param onChangeValues function  to return select value (data:values) => void;
 * @param setVisibleValue function options to return tag value (nameFilter, value) => return string;
 * @param getData function to query all data [{active: true, color: "red", edit: true, fieldType: "number", label: "Login Code", name: "loginCode", value: ""}];
 * @returns {JSX.Element}
 * @constructor
 */
declare const FilterEditor: ({ options, values, onChangeValues, getData, setVisibleValue, configButtons }: FilterEditor) => JSX.Element;
export default FilterEditor;
