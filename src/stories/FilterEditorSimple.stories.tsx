import React, { useState } from 'react';
import { FilterEditorWrapper } from '../examples/FilterEditorWrapper';

export default {
  title: "Filter Editor / Filter Editor Simple",
  component: FilterEditorWrapper
}

export const FilterSimple = () => {
  const [data, setData] = useState({name: "emir"});
  const options = [
    {name: "name", label: "Nombre", fieldType: "text" as const}, 
    {name: "email", label: "Email",  fieldType: "text" as const}
  ];

  return (
    <FilterEditorWrapper values={data} options={options} onChangeValues={setData}/>
  );
}