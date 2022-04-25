import { useCallback, useEffect, useState } from 'react';
import { Field, Options, UseFilter } from '../interfaces/Interfaces';

/**
 * @param values data 
 * @param options options
 * @param onChangeCallback 
 * @param setVisibleValue
 * @returns {onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter}
 */
export const useFilter = ({ data, options, onChangeCallback, setVisibleValue }: UseFilter) => {
  const [optionsFilter, setOptionsFilter] = useState<Array<Options>>([]);
  const [dataFields, setDataFields] = useState<Array<Field>>([]);
  const [initRender, setInitRender] = useState(true);

  const structureDataFields = useCallback((data, isStructureFieldsForce?: boolean) => {
    let fields: Array<Field> = [];
    let currentField = dataFields.map(f => ({ name: f.name, value: f.value, active: f.active }));
    if (initRender || !arraysEqual(currentField, data)) {
      let filterDisabled = currentField.filter(e => !e.active);
      let filterActive = data.filter((e: any) => e.active);
      let changeActive = false;

      if (filterActive.length > 0 && filterDisabled.length > 0) {
        filterActive.forEach((e: any) => {
          let find = filterDisabled.find(f => f.name === e.name);
          if (find) {
            changeActive = true;
            return;
          }
        })
      }

      if (isStructureFieldsForce || filterDisabled.length === 0 || changeActive) {
        data.forEach((d: Field) => {
          let index = options.findIndex(op => op.name === d.name);
          if (index !== -1) fields.push({ ...d, ...options[index] });
        });

        let copyOptions: Array<Options> = [...options];
        data.forEach((d: Field) => {
          let index = copyOptions.findIndex(op => op.name === d.name);
          if (index !== -1) copyOptions.splice(index, 1);
        });

        for (let index = 0; index < fields.length; index++) {
          if (setVisibleValue) {
            fields[index].tag = setVisibleValue(fields[index].name, fields[index].value);
          } else {
            break;
          }
        }
        setOptionsFilter(copyOptions);
        setDataFields(fields);
      }
      setInitRender(false);
    }
  }, [options, dataFields, setVisibleValue, dataFields, initRender]);

  useEffect(() => {
    let values = [];
    for (const key in data) values.push({ name: key, value: data[key], active: true });
    structureDataFields(values);
  }, [data]);

  const onChangeCallbackValues = useCallback((data) => {
    let dataFilter = {};
    data.forEach((d: Field) => {
      if (d.active) dataFilter = { ...dataFilter, [d.name]: d.value };
    });
    onChangeCallback(dataFilter);
  }, [onChangeCallback]);

  const onAdd = useCallback((key) => {
    let copyData: Array<Field> = [...dataFields];
    copyData.forEach(d => d.edit = false);
    copyData.push({ name: key, value: "", edit: true, active: true });
    structureDataFields(copyData, true);
  }, [dataFields, onChangeCallbackValues, structureDataFields]);

  const onRemove = useCallback((key) => {
    let copyData = [...dataFields];
    copyData.splice(key, 1);
    structureDataFields(copyData, true);
    onChangeCallbackValues(copyData);
  }, [dataFields, onChangeCallbackValues, structureDataFields]);

  const onEdit = useCallback((key) => {
    let copyData: Array<Field> = [...dataFields];
    if (copyData[key].active) {
      copyData.forEach((d: Field, index) => {
        if (index !== key) copyData[index].edit = false;
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

  const onChange = useCallback((value, key) => {
    let copyData: Array<Field> = [...dataFields];
    copyData[key].value = value;
    if (setVisibleValue) {
      copyData[key].tag = setVisibleValue(copyData[key].name, value);
    }
    setDataFields(copyData);
  }, [dataFields, setVisibleValue]);

  const onActivateFilter = useCallback((index) => {
    let copyData: Array<Field> = [...dataFields];
    copyData.forEach((d: Field, key) => {
      if (key === index) {
        copyData[index].active = !copyData[index].active;
        copyData[index].edit = false;
      }
    });
    setDataFields(copyData);
    onChangeCallbackValues(copyData);
  }, [dataFields, onChangeCallbackValues]);

  const getValue = useCallback((value:any) => {
    if(value !== ""){
      if(Array.isArray(value) || typeof value === 'object'){
        return JSON.stringify(value);
      }else{
        return value;
      }
    }
    return "";
  }, []);

  return ({ onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter, getValue })
}

//@ts-ignore
const objectsEqual = (o1: any, o2: any) => (
  typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length
    && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
    : o1 === o2
);

const arraysEqual = (a1: Array<object>, a2: Array<object>) =>
  a1.length === a2.length && a1.every((o: any, idx: any) => objectsEqual(o, a2[idx]));