import React from 'react';
import FilterEd from '../custom/index';
import { FilterEditor } from '../interfaces/Interfaces';

export const FilterEditorWrapper = ({options, values, onChangeValues}:FilterEditor) => {
  return (
    <FilterEd values={values} options={options} onChangeValues={onChangeValues}/>
  )
}
