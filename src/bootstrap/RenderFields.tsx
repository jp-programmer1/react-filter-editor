import React, { useCallback } from "react";
import { fieldType, RenderFieldsProps} from "../interfaces/Interfaces";

const SelectCustom = ({data, onChange}:RenderFieldsProps) => (
  <input type="select" name={data.name} id={data.name} className="form-group" value={data.value?.toString()} onChange={(e) => onChange(e.target.value)}>
    {data.options && data.options.map(op => (
      <option value={op.value.toString()}>{op.label}</option>
    ))}
  </input>
);
const InputCustom = ({data, onChange}:RenderFieldsProps) => (
  <input autoComplete='off'
         //@ts-ignore
         type={data.fieldType} placeholder={data.label}
         name={data.name} 
         value={data.value?.toString()}
         onChange={(e) => onChange(e.target.value)} 
  />
);

const types:fieldType = {
  "select": SelectCustom,
  "text": InputCustom,
  "number": InputCustom,
  "date": InputCustom,
  "datetime": InputCustom
}

export const FieldComponent = ({ onChange, data, onEditField }:RenderFieldsProps) => {
  //@ts-ignore
  const Field = data.fieldType && types[data.fieldType];
  const Component:any = data.fieldComponent && data.fieldComponent;
  return (
    <React.Fragment>
      {Field && !Component && <Field onChange={onChange} data={data} onEditField={onEditField}/>  }
      {Component && <Component onChange={onChange} data={data} onEditField={onEditField} />}
    </React.Fragment>
    
  );
}