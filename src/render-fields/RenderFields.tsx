import React from "react";
import { fieldType, RenderFieldsProps} from "../interfaces/Interfaces";

const SelectCustom = ({data, onChange, className, onEnter}:RenderFieldsProps) => (
  //@ts-ignore
  <select name={data.name} id={data.name} className={className} value={data.value} onChange={(e) => onChange(e.target.value)} onKeyUp={onEnter}>
    {data.options && data.options.map(op => (
      //@ts-ignore
      <option value={op.value}>{op.label}</option>
    ))}
  </select>
);
const InputCustom = ({data, onChange, className, onEnter}:RenderFieldsProps) => (
  <input autoComplete='off' className={className}
         //@ts-ignore
         type={data.fieldType} placeholder={data.label}
         name={data.name} 
         value={data.value?.toString()}
         onChange={(e) => onChange(e.target.value)}
         onKeyUp={onEnter}
  />
);

const types:fieldType = {
  "select": SelectCustom,
  "text": InputCustom,
  "number": InputCustom,
  "date": InputCustom
}

export const FieldComponent = ({ onChange, data, onEditField, className, onEnter }:RenderFieldsProps) => {
  //@ts-ignore
  const Field = data.fieldType && types[data.fieldType];
  const Component:any = data.fieldComponent && data.fieldComponent;

  return (
    <React.Fragment>
      {Field && !Component && 
        <Field 
          onChange={onChange}
          data={data} 
          onEditField={onEditField} 
          className={className} 
          onEnter={(e:any) => {
            e.preventDefault();
            e.stopPropagation();
            if(e.key === "Enter"){
              onEnter && onEnter(e);
            }
          }}
        />  
      }
      {Component && <Component onChange={onChange} data={data} onEditField={onEditField} />}
    </React.Fragment>
    
  );
}