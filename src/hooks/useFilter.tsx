import {useCallback, useEffect, useState} from 'react';
import { Field, Options, UseFilter } from '../interfaces/Interfaces';

/**
 * @param values data 
 * @param options options
 * @param onChangeCallback 
 * @param setVisibleValue
 * @returns {onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter}
 */
export const useFilter = ({data, options, onChangeCallback, setVisibleValue}:UseFilter) => {
  const [optionsFilter, setOptionsFilter] = useState<Array<Options>>([]);
  const [dataFields, setDataFields] = useState<Array<Field>>([]);

  const structureDataFields = useCallback((data) => {
    let fields:Array<Field> = [];
    data.forEach((d:Field) => {
      let index = options.findIndex(op => op.name === d.name);
      if (index !== -1) fields.push({...d, ...options[index]});
    });
  
    let copyOptions:Array<Options> = [...options];
    data.forEach((d:Field) => {
      let index = copyOptions.findIndex(op => op.name === d.name);
      if (index !== -1) copyOptions.splice(index, 1);
    });

    setOptionsFilter(copyOptions);
    setDataFields(fields);
  }, [options]);

  useEffect(() => {
    if(data){
      let values = [];
      for (const key in data) {
        values.push({ name: key, value: data[key], active: true});
      }
      structureDataFields(values);
    }
  }, []);

  const onChangeCallbackValues = useCallback((data) => {
    let dataFilter = {};
    data.forEach((d:Field) => { 
      if(d.active) dataFilter = {...dataFilter, [d.name]: d.value };
    });
    onChangeCallback(dataFilter);
  }, [onChangeCallback]);

  const onAdd = useCallback((key) => {
    let copyData:Array<Field> = [...dataFields];
    copyData.forEach(d => d.edit = false);
    copyData.push({ name:key, value: "" , edit: true, active: true });
    structureDataFields(copyData);
  }, [dataFields, onChangeCallbackValues, structureDataFields]);

  const onRemove = useCallback((key) => {
    let copyData = [...dataFields];
    copyData.splice(key, 1);
    structureDataFields(copyData);
    onChangeCallbackValues(copyData);
  }, [dataFields, onChangeCallbackValues, structureDataFields]);

  const onEdit = useCallback((key) => {
    let copyData:Array<Field> = [...dataFields];
    if (copyData[key].active) {
      copyData.forEach((d:Field, index) => {
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
    let copyData:Array<Field> = [...dataFields];
    copyData[key].value = value;
    if (setVisibleValue) {
      copyData[key].tag = setVisibleValue(copyData[key].name, value);
    }
    setDataFields(copyData);
  }, [dataFields, setVisibleValue]);

  const onActivateFilter = useCallback((index) => {
    let copyData:Array<Field> = [...dataFields];
    copyData.forEach((d:Field, key) => {
      if (key === index) {
        copyData[index].active = !copyData[index].active;
        copyData[index].edit = false;
      }
    });
    setDataFields(copyData);
    onChangeCallbackValues(copyData);
  }, [dataFields, onChangeCallbackValues]);

  return ({onAdd, onEdit, onRemove, onChange, dataFields, optionsFilter, onActivateFilter})
}
