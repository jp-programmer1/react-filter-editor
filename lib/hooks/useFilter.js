"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilter = void 0;
const react_1 = require("react");
/**
 * @param values data
 * @param options options
 * @param onChangeCallback
 * @param setVisibleValue
 * @returns {onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter}
 */
const useFilter = ({ data, options, onChangeCallback, setVisibleValue }) => {
    const [optionsFilter, setOptionsFilter] = (0, react_1.useState)([]);
    const [dataFields, setDataFields] = (0, react_1.useState)([]);
    const structureDataFields = (0, react_1.useCallback)((data, isStructureFieldsForce) => {
        let fields = [];
        let currentField = dataFields.map(f => ({ name: f.name, value: f.value, active: f.active }));
        if (!arraysEqual(currentField, data)) {
            let filterDisabled = currentField.filter(e => !e.active);
            let filterActive = data.filter((e) => e.active);
            let changeActive = false;
            if (filterActive.length > 0 && filterDisabled.length > 0) {
                filterActive.forEach((e) => {
                    let find = filterDisabled.find(f => f.name === e.name);
                    if (find) {
                        changeActive = true;
                        return;
                    }
                });
            }
            if (isStructureFieldsForce || filterDisabled.length === 0 || changeActive) {
                data.forEach((d) => {
                    let index = options.findIndex(op => op.name === d.name);
                    if (index !== -1)
                        fields.push(Object.assign(Object.assign({}, d), options[index]));
                });
                let copyOptions = [...options];
                data.forEach((d) => {
                    let index = copyOptions.findIndex(op => op.name === d.name);
                    if (index !== -1)
                        copyOptions.splice(index, 1);
                });
                for (let index = 0; index < fields.length; index++) {
                    if (setVisibleValue) {
                        fields[index].tag = setVisibleValue(fields[index].name, fields[index].value);
                    }
                    else {
                        break;
                    }
                }
                setOptionsFilter(copyOptions);
                setDataFields(fields);
            }
        }
    }, [options, dataFields, setVisibleValue, dataFields]);
    (0, react_1.useEffect)(() => {
        if (data) {
            let values = [];
            for (const key in data) {
                values.push({ name: key, value: data[key], active: true });
            }
            structureDataFields(values);
        }
    }, [data]);
    const onChangeCallbackValues = (0, react_1.useCallback)((data) => {
        let dataFilter = {};
        data.forEach((d) => {
            if (d.active)
                dataFilter = Object.assign(Object.assign({}, dataFilter), { [d.name]: d.value });
        });
        onChangeCallback(dataFilter);
    }, [onChangeCallback]);
    const onAdd = (0, react_1.useCallback)((key) => {
        let copyData = [...dataFields];
        copyData.forEach(d => d.edit = false);
        copyData.push({ name: key, value: "", edit: true, active: true });
        structureDataFields(copyData, true);
    }, [dataFields, onChangeCallbackValues, structureDataFields]);
    const onRemove = (0, react_1.useCallback)((key) => {
        let copyData = [...dataFields];
        copyData.splice(key, 1);
        structureDataFields(copyData, true);
        onChangeCallbackValues(copyData);
    }, [dataFields, onChangeCallbackValues, structureDataFields]);
    const onEdit = (0, react_1.useCallback)((key) => {
        let copyData = [...dataFields];
        if (copyData[key].active) {
            copyData.forEach((d, index) => {
                if (index !== key)
                    copyData[index].edit = false;
                else {
                    copyData[index].edit = !copyData[index].edit;
                    if (!copyData[index].edit) {
                        onChangeCallbackValues(copyData);
                    }
                    return;
                }
            });
            setDataFields(copyData);
        }
    }, [dataFields, onChangeCallbackValues]);
    const onChange = (0, react_1.useCallback)((value, key) => {
        let copyData = [...dataFields];
        copyData[key].value = value;
        if (setVisibleValue) {
            copyData[key].tag = setVisibleValue(copyData[key].name, value);
        }
        setDataFields(copyData);
    }, [dataFields, setVisibleValue]);
    const onActivateFilter = (0, react_1.useCallback)((index) => {
        let copyData = [...dataFields];
        copyData.forEach((d, key) => {
            if (key === index) {
                copyData[index].active = !copyData[index].active;
                copyData[index].edit = false;
            }
        });
        setDataFields(copyData);
        onChangeCallbackValues(copyData);
    }, [dataFields, onChangeCallbackValues]);
    return ({ onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter });
};
exports.useFilter = useFilter;
//@ts-ignore
const objectsEqual = (o1, o2) => (typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
    : o1 === o2);
const arraysEqual = (a1, a2) => a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
